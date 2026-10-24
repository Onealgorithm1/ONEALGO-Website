import "../../global.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LocalPage } from "./LocalPage";
import type { LocalPlace } from "../../data/wd-local/types";

/*
 * DEV-ONLY harness (never imported by the app): renders one local page — or the hub — on the Vite dev server before
 * its route exists in App.tsx, so scripts/wd-local-check.mjs can measure the rendered page and take screenshots.
 * The check writes client/wd-local-preview.html (a copy of index.html whose module entry is this file), opens
 *   /client/wd-local-preview.html?slug=chicago        (a generated place, client/data/wd-local/chicago.ts)
 *   /client/wd-local-preview.html?slug=philadelphia    (the wave-0 pages: philadelphia, chester-county)
 *   /client/wd-local-preview.html?slug=hub             (the showcase, for the hub side of the uniqueness measure)
 * and deletes the HTML file when it is done.
 */
const FILES = import.meta.glob<{ PLACE?: LocalPlace; PHILADELPHIA?: LocalPlace; CHESTER_COUNTY?: LocalPlace }>("../../data/wd-local/*.ts");

function Preview() {
  const slug = new URLSearchParams(window.location.search).get("slug") ?? "";
  const [node, setNode] = React.useState<React.ReactNode>(null);
  React.useEffect(() => {
    if (slug === "hub") {
      import("../../pages/services/WebsiteDevelopment").then((m) => setNode(<m.default />));
      return;
    }
    const load = FILES[`../../data/wd-local/${slug}.ts`];
    if (!load) { setNode(<p>No data file for “{slug}”.</p>); return; }
    load().then((m) => {
      const place = m.PLACE ?? m.PHILADELPHIA ?? (Object.values(m).find((v) => v && typeof v === "object" && "path" in (v as object)) as LocalPlace);
      setNode(<LocalPage place={place} />);
    });
  }, [slug]);
  return <>{node}</>;
}

createRoot(document.getElementById("root")!).render(<BrowserRouter><Preview /></BrowserRouter>);
