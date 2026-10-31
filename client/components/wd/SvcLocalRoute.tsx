import * as React from "react";
import { LocalPage } from "./LocalPage";
import type { LocalPlace } from "../../data/wd-local/types";

/*
 * Route component for the nationwide service place pages (scripts/svc-local-gen.mjs: /services/<seo|marketing|app-development|
 * google-ads>-<place>), the same lazy-per-page pattern as LocalRoute.tsx: one data chunk per visit.
 */
const FILES = import.meta.glob<{ PLACE: LocalPlace }>(["../../data/svc-local/*.ts", "!../../data/svc-local/index.ts"]);

const pages = new Map<string, React.LazyExoticComponent<() => JSX.Element>>();
const pageFor = (id: string) => {
  let C = pages.get(id);
  if (!C) {
    const load = FILES[`../../data/svc-local/${id}.ts`];
    if (!load) throw new Error(`No service place data for ${id}`);
    C = React.lazy(() => load().then((m) => ({ default: () => <LocalPage place={m.PLACE} /> })));
    pages.set(id, C);
  }
  return C;
};

export default function SvcLocalRoute({ id }: { id: string }) {
  const Page = pageFor(id);
  return <Page />;
}
