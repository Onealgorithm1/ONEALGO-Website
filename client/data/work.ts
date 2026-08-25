/**
 * Sites we built, for the carousel under the hero.
 *
 * ADDING ONE: capture it, then add an entry here. Nothing else to touch.
 *
 *   1. add the site to SITES in scripts/work-shots.mjs
 *   2. node scripts/work-shots.mjs
 *   3. add the object below, with `shot` set to today
 *
 * ⚠️ `shot` is the date the screenshot was taken, and it is shown to nobody —
 * it exists so anyone can see at a glance how stale these are. A client
 * redesign silently turns this section into a museum of work that no longer
 * looks like that. Re-run the script and update the date together.
 *
 * ⛔ These are other people's businesses and their names appear on our site.
 * Every entry here needs the client's permission before it ships to production.
 */
export type WorkItem = {
  slug: string;
  name: string;
  /** What they do, in their words not ours — one line, no marketing. */
  sector: string;
  /** The one true thing worth saying about the build. No superlatives. */
  note: string;
  url: string;
  shot: string;
};

export const WORK: WorkItem[] = [
  {
    slug: "boards-professor",
    name: "The Boards Professor",
    sector: "Medical exam tutoring",
    note: "Booking, tutor profiles and reviews pulled from two platforms into one page.",
    url: "https://theboardsprofessor.com/",
    shot: "2026-08-25",
  },
  {
    slug: "inspect-this-home",
    name: "Inspect This Home Inspections",
    sector: "Home inspection",
    note: "Service pages by area, online scheduling, and reports the owner updates himself.",
    url: "https://inspectthishomeinspections.com/",
    shot: "2026-08-25",
  },
];
