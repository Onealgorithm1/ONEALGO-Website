/**
 * The road after launch — "how we get you found" (Louis's phrase), as five
 * stops, each pointing at the page that does that work.
 *
 * ⛔ LINKS: one per service the stop actually names, never a grid. Round one
 * said "one link per stop" to keep this from becoming a service directory;
 * round two found that stop 3's copy promised social while its only link went
 * to Google Ads, and stop 4 promised email automation while linking only to
 * Salesforce — a label that misdirects is worse than a second link. So: a stop
 * that names two services links to both, and no stop links to more than two.
 * Seven links in a five-stop road is still a road. The check enforces it.
 *
 * ⛔ Stop 1 has no link on purpose. "You are here" is only literally true on
 * the website page, and it is the one place the marker is honest; linking it
 * backwards up the page was rejected on keyboard-order grounds. It is a
 * marker, not a card.
 *
 * Copy was attacked by three reviewers, twice. Cut or rewritten: "fast" (this
 * page's mobile LCP is 5.9s — an unevidenced claim), "the demand you want
 * this month" (an outcome-and-timing promise), "the honest answer"
 * (self-praise), "a CRM that knows who replied" (a promise about the tool,
 * reframed as the setup we do), "a Google Business Profile that is claimed,
 * complete and answered" (same), and "A website is only useful if people
 * arrive at it" (a false absolute — a client portal is useful with no new
 * visitors at all). "And yours" survived because ownership IS evidenced — the
 * FAQ and the handover list both say code, domain and hosting go to the
 * client — so it was made specific rather than cut.
 */
export type Stop = {
  id: string;
  title: string;
  text: string;
  /** Empty on the "you are here" stop; one entry per service the copy names. */
  links: { label: string; to: string }[];
};

export const ROADMAP: Stop[] = [
  {
    id: "stop-website",
    title: "Your website",
    text: "Built, launched, and owned by you — the code, the domain and the hosting.",
    links: [],
  },
  {
    id: "stop-found",
    title: "Be found in search",
    text: "Pages written for the questions people actually type, and a Google Business Profile audit — claimed, complete, reviews answered.",
    links: [{ label: "SEO services", to: "/services/seo" }],
  },
  {
    id: "stop-reach",
    title: "Reach people who are ready, and people who are not yet",
    text: "Google Ads for the searches happening today. Social for the people who have not started looking.",
    links: [
      { label: "Google Ads management", to: "/services/google-ads" },
      { label: "Social media management", to: "/services/marketing" },
    ],
  },
  {
    id: "stop-followup",
    title: "Follow up without dropping anyone",
    text: "Email that goes out on its own, and a CRM set up to show who replied and who went quiet.",
    links: [
      { label: "Salesforce consulting", to: "/services/salesforce" },
      { label: "Email automation", to: "/services/martech" },
    ],
  },
  {
    id: "stop-tools",
    title: "Fit the tools to the business",
    text: "An audit of what you already pay for, then one of three answers: integrate it, replace it, or build what is missing.",
    links: [{ label: "IT consulting and tool audits", to: "/services/it-consulting" }],
  },
];

/**
 * Where the road enters each stop, as a percentage of the lane width, and
 * where it leaves the last one. Entry k is the pin position of stop k; the
 * segment for stop k runs from ROAD_X[k] to ROAD_X[k+1]. The pin leans toward
 * the side the copy sits on at desktop widths (odd stops left, even right), and
 * the road ends at centre where the closing copy and button sit.
 *
 * Length is ROADMAP.length + 1 by construction; the check script asserts it.
 */
export const ROAD_X = [50, 76, 24, 76, 24, 50];
