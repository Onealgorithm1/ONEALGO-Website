/*
 * Data shape for the website-development SERVICE pages (/services/website-cost, /services/small-business-website-design,
 * /services/website-redesign), rendered by ONE template: client/data/wd-service/ServicePage.tsx (integrate: move the
 * template to client/components/wd/ServicePage.tsx; it lives here only because this folder is the build-wave12 service
 * agent's ownership). One data file per page; a page component is two lines.
 *
 * Rules a service file must keep (structure-spec.md §1-§3, §12.1; owner bar 2026-10-24 14:05):
 *   - H1 <= 9 words; every H2 <= 8 words; ledes ONE sentence <= 25 words; lead <= 25 words; <= 3 points of <= 15 words;
 *     each Go deeper (`deeper`) <= 220 words; >= 10 units; >= 1,200 words in <main>; >= 60% sentences unique vs the
 *     siblings and the hub; >= 8 FAQ from the question banks, answers 40-60 words, first sentence answers.
 *   - No prices, ranges, turnaround times, years, WOSB, "affordable", "fast", WordPress delivery claims, client names
 *     beyond work.ts. Every figure names its source and date (Semrush / Google Trends rows carry theirs).
 *   - Copy is plain text; "[label](/path)" renders an in-site link.
 */
import type { LeadIn } from "../../components/sf/SmartSection";
import type { WdFaqItem } from "../wd-faq";

/** A smart-brevity unit: H2, one-sentence lede, one lead-in, <= 3 points, Go deeper paragraphs. */
export type ServiceUnitCopy = {
  id: string;
  h2: string;
  lede: string;
  leadIn?: LeadIn;
  lead?: string;
  points?: string[];
  deeper?: { label: string; paras: string[] };
  /** In-site links printed under the unit (sf-links row). */
  links?: { to: string; label: string }[];
  /** A Verify chip under the lead-in that opens one of the page's `dialogs` (e.g. the gated redesign figures). */
  verify?: { id: string; label: string; line: string };
};

export type ServiceCard = { h3: string; line: string };

/** A staged picture from the wd kit (every one carries a title/desc or a figcaption; nothing is client work). */
export type PlateKind = "sheet" | "build-restaurant" | "build-roofer" | "build-dentist" | "handover" | "a11y" | "redirect";

/** One search-demand readout. `volume` prints large; `cpc` (USD per click) and `src` print in the mono line. */
export type DemandRow = { phrase: string; volume: number; cpc: number | null; label?: string; src?: string };

export type ServiceTable = { caption: string; cols: [string, string, string]; rows: [string, string, string][] };

export type ServiceSection =
  /** Unit (left) + cards, a table or a plate (right); `cta` adds the mid-page button row under the pair. */
  | ({ kind: "text"; cards?: ServiceCard[]; table?: ServiceTable; figure?: PlateKind; figureCaption?: string; cta?: boolean } & ServiceUnitCopy)
  /** Unit + live-site windows (work.ts slugs). */
  | ({ kind: "windows"; slugs: string[]; screen?: "card" | "second" } & ServiceUnitCopy)
  /** The five build stages on the rail under a page-specific unit. */
  | ({ kind: "process" } & ServiceUnitCopy)
  /** Unit + the Semrush / Trends readouts + the "where these figures come from" pop-up. */
  | ({ kind: "demand"; rows: DemandRow[] } & ServiceUnitCopy)
  /** NAP band + region plate + one inline question. */
  | ({ kind: "office"; question: { q: string; a: string } } & ServiceUnitCopy)
  /** APG accordion FAQ (FAQPage JSON-LD only when `schema` is true: structure-spec.md §3 says add none for its own sake). */
  | { kind: "faq"; id: string; h2: string; items: WdFaqItem[]; schema?: boolean }
  /** Route board: ledger link rows to the hub units, the sibling service pages and the local pages. */
  | { kind: "routes"; id: string; h2: string; lede: string; items: { to: string; title: string; tag: string }[] };

export type ServiceDialog = {
  id: string;
  title: string;
  intro: string;
  rows: { th: string; td: string }[];
  /** In-site primary action (a blog post); never an off-site href. */
  primary?: { href: string; label: string };
};

export type ServicePageData = {
  path: string;
  /** Breadcrumb label and the CTA topic chip. */
  name: string;
  seo: { title: string; description: string; dateModified: string; ogAlt: string };
  hero: { kicker: string; h1: string; lede: string; figure?: PlateKind; figureCaption?: string };
  service: { name: string; description: string };
  sections: ServiceSection[];
  dialogs?: ServiceDialog[];
  desk: { h2: string; lede: string; covers: string[]; prompt: string; topic: string };
};
