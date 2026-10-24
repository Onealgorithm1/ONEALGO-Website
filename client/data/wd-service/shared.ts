/* Blocks the three website-development service pages share. Sources are stated once here and quoted by the pages. */

export const SITE = "https://onealgorithm.com";

/** Semrush figures on the service pages: demand/semrush-volumes.json (Keyword Overview > Bulk Analysis, US, exported
 *  2026-10-24 13:05-13:15 ET). Volume = average monthly US searches; CPC = USD advertisers pay per click. Printed as
 *  "x.xx USD" (never "$x"): gate 8 greps "$" + digit as a price. */
export const SEMRUSH = {
  name: "Semrush Keyword Overview, Bulk Analysis, US database",
  what: "Average monthly US searches (volume) and the price advertisers pay per click (CPC, USD) for each phrase as written; a phrase Semrush holds no data for is absent",
  read: "read 24 October 2026",
  page: "https://www.semrush.com/analytics/keywordoverview/",
  line: "Semrush · US · read 24 Oct 2026",
} as const;

/** Google Trends 5-year series (demand5y/trends/trends-findings.md): yearly means of the weekly 0-100 index, each term
 *  scaled to its own peak; 2026 = January to September. */
export const TRENDS = {
  name: "Google Trends, 5-year weekly series, United States",
  what: "Relative interest 0-100, each term scaled to its own five-year peak; yearly means, 2026 covering January to September",
  read: "read 24 October 2026",
  page: "https://trends.google.com/trends/",
  line: "Google Trends · US · read 24 Oct 2026",
} as const;

/** The remote-delivery sentence (owner rule 2026-10-24): the default on every page; in-person only where true. */
export const REMOTE = "We take on website work for businesses across the United States remotely from Malvern, PA; in-person sessions are easiest across the Philadelphia region when a project calls for them.";

export const LINKS = {
  hub: "/services/website-development",
  cost: "/services/website-cost",
  small: "/services/small-business-website-design",
  redesign: "/services/website-redesign",
  phl: "/services/web-design-philadelphia",
  che: "/services/web-design-chester-county",
} as const;
