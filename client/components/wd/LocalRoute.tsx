import * as React from "react";
import { LocalPage } from "./LocalPage";
import type { LocalPlace } from "../../data/wd-local/types";

/*
 * One route component for the generated place pages (64) (scripts/wd-local-gen.mjs): each data file is its own lazy
 * chunk, loaded by slug, so a visitor downloads one place, not all 64. React.lazy (not an effect) so App's <Suspense>
 * keeps a prerendered page on screen while the chunk loads, the same as every other lazy route (hydration-safe).
 *   const WebDesignPlace = lazy(() => import("./components/wd/LocalRoute"));
 *   <Route path="/services/web-design-chicago" element={<WebDesignPlace slug="chicago" />} />
 * Paths, titles and lastmod for App.tsx / prerender / sitemap: build-wave12/routes-manifest.json.
 */
const FILES = import.meta.glob<{ PLACE: LocalPlace }>([
  "../../data/wd-local/*.ts",
  "!../../data/wd-local/{types,shared,photos,places,philadelphia,chester-county}.ts",
]);

const pages = new Map<string, React.LazyExoticComponent<() => JSX.Element>>();
const pageFor = (slug: string) => {
  let C = pages.get(slug);
  if (!C) {
    const load = FILES[`../../data/wd-local/${slug}.ts`];
    if (!load) throw new Error(`No place data for ${slug}`);
    C = React.lazy(() => load().then((m) => ({ default: () => <LocalPage place={m.PLACE} /> })));
    pages.set(slug, C);
  }
  return C;
};

export default function LocalRoute({ slug }: { slug: string }) {
  const Page = pageFor(slug);
  return <Page />;
}
