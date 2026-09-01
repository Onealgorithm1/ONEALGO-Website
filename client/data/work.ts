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
  /** Show the LIVE site in an iframe. Only true once the client site's
   *  headers allow onealgorithm.com to frame it (CSP frame-ancestors) —
   *  checked with curl, not assumed. False falls back to the screenshot. */
  embed: boolean;
  /** Text that proves the LIVE site rendered inside the frame (the check
   *  script looks for it in the child document — a blank refusal page or a
   *  browser error page would pass a mere "frame exists" test). */
  marker: string;
  /** THIS CLIENT'S OWN 5-star review of US, on OneAlgorithm's Google listing.
   *  Optional: not every client has written one, and we never invent one.
   *
   *  ⛔ `url` must deep-link to THAT REVIEW, not to our listing. A visitor who
   *  cannot get from the stars to the actual words in one click is being asked
   *  to take our word for it, which is the opposite of the point.
   *
   *  ⛔ `disclosure` is REQUIRED whenever the reviewer has a family, financial
   *  or employment connection to us — FTC 16 CFR 255.5 calls that a material
   *  connection and it has to be disclosed next to the endorsement, not in a
   *  footer. It renders under the stars, in the visitor's line of sight. */
  review?: {
    /** The person, as we would introduce them — NOT their Google display name.
     *  Sean posts as "Shiggity", which proves nothing to a stranger. */
    author: string;
    url: string;
    disclosure?: string;
  };
};

export const WORK: WorkItem[] = [
  {
    slug: "phantom-arcades",
    name: "Phantom Arcades",
    sector: "Custom home arcade cabinets",
    note: "A configurator that prices the cabinet as you build it, and a page for every machine he has made.",
    url: "https://phantomarcades.com/",
    shot: "2026-09-01",
    // Sends no X-Frame-Options and no CSP at all (curl, 2026-09-01), so
    // onealgorithm.com may frame it.
    embed: true,
    marker: "Phantom Arcades",
    // Dennis's site went live 2026-09-01. No review yet — do not add one until
    // he writes it himself.
  },
  {
    slug: "inspect-this-home",
    name: "Inspect This Home Inspections",
    sector: "Home inspection",
    note: "Service pages by area, online scheduling, and reports the owner updates himself.",
    url: "https://inspectthishomeinspections.com/",
    shot: "2026-09-01",
    // Its production sends `Content-Security-Policy: frame-ancestors 'self'
    // https://onealgorithm.com https://www.onealgorithm.com` since 2026-08-25
    // (Louis: "Push"); curl-verified before this flipped.
    embed: true,
    marker: "Inspect This Home",
    review: {
      author: "Lou",
      // Posted 2026-08-25 as "Louis Rubino" — his real name, and the same name
      // as our own Louis, which is exactly why the disclosure below exists.
      url: "https://maps.app.goo.gl/vvpRdMq7cGVZD9mg6",
      disclosure: "Lou is Louis's father",
    },
  },
  {
    slug: "boards-professor",
    name: "The Boards Professor",
    sector: "Medical exam tutoring",
    note: "Booking, tutor profiles and reviews pulled from two platforms into one page.",
    url: "https://theboardsprofessor.com/",
    shot: "2026-09-01",
    embed: true, // sends no X-Frame-Options and no CSP (curl, 2026-08-25)
    marker: "Boards Professor",
    review: {
      author: "Sean",
      // Posted 2026-08-28 under the display name "Shiggity".
      url: "https://maps.app.goo.gl/ssMbAsPBu5wBcgNu6",
    },
  },
];
