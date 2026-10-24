/* Blocks every local web-design page shares (page-map-webdev.md §4 template rule: shared modules are allowed as
 * identical, clearly reusable blocks; doorway rule D4 keeps them to one line each + a link to the hub). */
import type { Stage } from "../../components/sf/StageRail";

/** One NAP everywhere (structure-spec.md §8.1). Hours: Mon-Fri 9-5 (StructuredData.tsx, GBP). */
export const NAP = {
  name: "OneAlgorithm",
  l1: "625 Swedesford Rd, Unit B",
  l2: "Malvern, PA 19355",
  phone: { display: "(610) 890-9711", href: "tel:+16108909711" },
  hours: "Mon–Fri 9–5",
  map: "https://maps.app.goo.gl/kVEeTz9dCyB64CGk6",
} as const;

/** The Business Profile service area, as Google has it (StructuredData.tsx areaServed; claims-and-assets.md C2). */
export const COUNTIES = ["Chester County, PA", "Delaware County, PA", "Montgomery County, PA", "Bucks County, PA", "Philadelphia County, PA", "New Castle County, DE"];

/** Google Business Profile figures (Places API read 2026-10-23 21:33 UTC; claims-and-assets.md B5). Text only,
 *  never AggregateRating markup (g-review-snippet.txt:292). Re-read on release day (WD-REV-03). */
export const LISTING = { name: "OneAlgorithm Consulting", placeId: "ChIJnQw01SfzxokRJhcvpzCljCE", rating: "5.0", reviews: 6, read: "23 October 2026", readShort: "23 Oct 2026" } as const;

/** The five build stages: the same names as the hub's unit 6 (WD-PRO-01), one line each here. */
export const STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Agree what the site is for", short: "Agree the purpose", sub: "audience · job · connections", line: "Who the site talks to, what it must get them to do, and what it connects to.", details: [] },
  { k: "s2", num: "02", title: "Scope, price and schedule in writing", short: "Scope in writing", sub: "pages · price · dates", line: "Pages, integrations, price and dates on paper before any design starts.", details: [] },
  { k: "s3", num: "03", title: "Design in the browser", short: "Design in the browser", sub: "real content · real widths", line: "Real content at real widths, reviewed on your own phone as it takes shape.", details: [] },
  { k: "s4", num: "04", title: "Build and wire it up", short: "Build and wire it up", sub: "code · forms · CRM · analytics", line: "Code, forms, CRM, analytics and accessibility checks, in one pass.", details: [] },
  { k: "s5", num: "05", title: "Launch, hand over, stay on", short: "Launch and hand over", sub: "your repo · domain · hosting", line: "The site goes live in your accounts, and we stay on for support.", details: [] },
];

/** Census sources for the "Where these figures come from" pop-up: program pages only, never an API URL (OD:47). */
export const CENSUS_SOURCES = {
  cbp: { name: "U.S. Census Bureau, County Business Patterns", page: "https://www.census.gov/programs-surveys/cbp.html" },
  acs: { name: "U.S. Census Bureau, American Community Survey (1-year)", page: "https://www.census.gov/programs-surveys/acs" },
} as const;
