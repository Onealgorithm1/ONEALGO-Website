import { EvidenceDialog } from "../sf";

/* Google Ads Help facts, from google-ads/facts.json (accessed 2026-10-31). The Help pages carry no update date,
   only the (c) 2026 Google footer, so the read date is the only date there is. Each page renders only the ids it
   opens with <Verify id=…/>, so an id is never duplicated on a page. */
const READ = "31 October 2026";
const NOTE = "The page shows no last-updated date, only a 2026 Google footer, so the date we read it is the only date we can give.";

type Fact = { title: string; intro: string; rows: { th: string; td: string }[]; href: string };

const FACTS: Record<string, Fact> = {
  "ad-rank": {
    title: "Google's definition of Ad Rank",
    intro: "Google Ads Help describes Ad Rank as “a set of values that are used to determine whether your ads are eligible to show.”",
    rows: [
      { th: "Factor 1", td: "Your bid" },
      { th: "Factor 2", td: "Quality of your ads and landing page" },
      { th: "Factor 3", td: "Ad Rank thresholds" },
      { th: "Factor 4", td: "Competitiveness of the auction" },
      { th: "Factor 5", td: "Context of the search: terms, location, device, time" },
      { th: "Factor 6", td: "Expected impact of ad assets and other formats" },
      { th: "Publisher", td: "Google Ads Help" },
      { th: "Read", td: READ },
      { th: "Note", td: NOTE },
    ],
    href: "https://support.google.com/google-ads/answer/1722122",
  },
  "quality-score": {
    title: "Google's definition of Quality Score",
    intro: "Google Ads Help calls Quality Score “a diagnostic tool” and states: “Quality Score is not an input in the ad auction.”",
    rows: [
      { th: "Scale", td: "1 to 10, at keyword level" },
      { th: "Components", td: "Expected click-through rate, ad relevance, landing page experience (each Above average, Average or Below average)" },
      { th: "Publisher", td: "Google Ads Help" },
      { th: "Read", td: READ },
      { th: "Note", td: NOTE },
    ],
    href: "https://support.google.com/google-ads/answer/6167118",
  },
  auction: {
    title: "How the Google Ads auction works",
    intro: "Google Ads Help says ads that are ineligible are dropped, and only ads with “a sufficiently high Ad Rank” show.",
    rows: [
      { th: "Quote", td: "“You can still win a higher position – at a lower price – with highly relevant keywords and ads.”" },
      { th: "Publisher", td: "Google Ads Help" },
      { th: "Read", td: READ },
      { th: "Note", td: "The page gives no price figures. " + NOTE },
    ],
    href: "https://support.google.com/google-ads/answer/142918",
  },
  pmax: {
    title: "What Google says Performance Max is",
    intro: "Google Ads Help calls Performance Max “a goal-based campaign type.”",
    rows: [
      { th: "Reach", td: "YouTube, Display, Search, Discover, Gmail and Maps, from one campaign" },
      { th: "Inputs", td: "Conversion goals, creative assets (text, images, video), audience signals, daily budget, brand-safety settings" },
      { th: "Publisher", td: "Google Ads Help" },
      { th: "Read", td: READ },
      { th: "Note", td: NOTE },
    ],
    href: "https://support.google.com/google-ads/answer/10724817",
  },
  partner: {
    title: "What Google requires of a Partner",
    intro: "Google Ads Help lists the requirements for the Google Partner badge and for Premier Partner. OneAlgorithm does not hold either and does not claim them.",
    rows: [
      { th: "Optimization score", td: "At least 70 percent" },
      { th: "Ad spend", td: "$10,000 USD over 90 days, across managed accounts" },
      { th: "Certification", td: "At least 50 percent of account strategists certified in Google Ads (capped at 100 users), and at least one certification per product area with campaign spend of $500 USD or more in 90 days" },
      { th: "Premier Partner", td: "Top 3 percent of participating companies in a country, determined annually, plus the Partner requirements" },
      { th: "Checked", td: "Daily, per Google" },
      { th: "Publisher", td: "Google Ads Help, “How to become a Google Partner or Premier Partner”" },
      { th: "Read", td: READ },
      { th: "Note", td: NOTE },
    ],
    href: "https://support.google.com/google-ads/answer/9702452",
  },
  "conversion-tracking": {
    title: "What Google can count as a conversion",
    intro: "Google Ads Help lists the conversion types an account can track.",
    rows: [
      { th: "Website", td: "Actions on your site" },
      { th: "App", td: "Actions in an app" },
      { th: "Phone call", td: "Calls from ads, calls to a number on your site, and taps on a mobile number" },
      { th: "Offline", td: "Sales data uploaded from files or APIs" },
      { th: "Publisher", td: "Google Ads Help" },
      { th: "Read", td: READ },
      { th: "Note", td: NOTE },
    ],
    href: "https://support.google.com/google-ads/answer/1722022",
  },
};

/** One pop-up for one Google Ads Help page. Open it with <Verify id={id}>. */
export function GoogleHelpDialog({ id }: { id: keyof typeof FACTS }) {
  const f = FACTS[id];
  return <EvidenceDialog id={id} title={f.title} intro={f.intro} rows={f.rows} external={{ href: f.href, label: "Open on Google Ads Help (new tab)" }} />;
}
