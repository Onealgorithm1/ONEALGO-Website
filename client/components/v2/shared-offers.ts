/* ONE config: route (or route prefix) -> the page's offer. Used by the header CTA, StickyCallBar, OfferBand.
 * Every href is /contact?need=<slug>. No prices. First match wins, so list specific prefixes before general ones. */
export type Offer = { label: string; need: string; sub: string; href: string };

const o = (label: string, need: string, sub: string): Offer => ({ label, need, sub, href: `/contact?need=${need}` });

const REVIEW = "We look at your site and tell you what is holding it back.";
const CONSULT = "A short call to see whether we fit.";
const MKT = "Tell us the goal; we say what we would do first.";

// ponytail: owner decision pending on "free audit". When Louis approves, add "free" to the labels below (e.g. "Get a free website & SEO review"); this file is the only place.
const OFFERS: [string, Offer][] = [
  ["/services/salesforce", o("Free health check", "salesforce", "A person at OneAlgorithm reads your note and replies.")],
  ["/services/seo", o("Get a website & SEO review", "seo", REVIEW)],
  ["/services/web", o("Get a website & SEO review", "website", REVIEW)],
  ["/services/website", o("Get a website & SEO review", "website", REVIEW)],
  ["/services/small-business-website", o("Get a website & SEO review", "website", REVIEW)],
  ["/services/google-ads", o("Get a Google Ads review", "google-ads", "We read your account and tell you where the spend leaks.")],
  ["/services/application-development", o("Talk about your app", "app", "Tell us what it must do; we say how we would build it.")],
  ["/services/marketing", o("Talk to a marketing specialist", "marketing", MKT)],
  ["/services/martech", o("Talk to a marketing specialist", "marketing", MKT)],
  ["/industries/marketing", o("Talk to a marketing specialist", "marketing", MKT)],
  ["/services/zendesk", o("Talk to a consultant", "enterprise", CONSULT)],
  ["/services/it-consulting", o("Talk to a consultant", "enterprise", CONSULT)],
  ["/services/staff-augmentation", o("Talk to a consultant", "enterprise", CONSULT)],
  ["/services/operational-transformation", o("Talk to a consultant", "enterprise", CONSULT)],
  ["/industries", o("Talk to a consultant", "enterprise", CONSULT)],
];
const DEFAULT = o("Talk to us", "general", "Tell us what you need; a person replies.");

export function isSalesforcePath(pathname: string) {
  return pathname.startsWith("/services/salesforce");
}

export function offerFor(pathname: string): Offer {
  const p = pathname.replace(/\/+$/, "") || "/";
  return OFFERS.find(([prefix]) => p.startsWith(prefix))?.[1] ?? DEFAULT;
}
