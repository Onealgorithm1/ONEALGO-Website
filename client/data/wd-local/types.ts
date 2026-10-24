/*
 * Data shape for the website-development LOCAL pages (/services/web-design-<place>), rendered by ONE template:
 * client/components/wd/LocalPage.tsx. A new place page (wave 1: Malvern, West Chester, Pennsylvania, New Jersey,
 * Bucks, Delaware County, Wilmington) is a new file in this folder plus a two-line page component; no template edit.
 *
 * Rules a place file must keep (structure-spec.md §1, §2, §7-§8.1; checked by build-wave0/local-pages-check.mjs):
 *   - H1 <= 9 words; every H2 <= 8 words; ledes ONE sentence <= 25 words; lead <= 25 words; <= 3 points of <= 15 words;
 *     each Go deeper (`deeper`) <= 220 words. Copy is plain text; "[label](/path)" renders an in-site link.
 *   - Facts (`facts.rows`) copy a row of facts/economy/facts.json exactly (geo + fact + period + value); >= 3 per page.
 *   - No place lists (<= 8 names in a run), place-name density <= 1.5% of <main> words, >= 50% sentences unique vs
 *     every sibling and the hub. No prices, turnaround times, years, WOSB, "affordable", WordPress delivery claims.
 *   - No client named as local proof except where claims-and-assets.md §A/§F allows it (Starzi: Chester, Delaware,
 *     Montgomery county pages only).
 */
import type { LeadIn } from "../../components/sf/SmartSection";

/** A smart-brevity unit: H2, one-sentence lede, one lead-in, <= 3 points, Go deeper paragraphs. */
export type LocalUnitCopy = {
  /** Anchor id of the section (also the H2 id prefix). */
  id: string;
  h2: string;
  lede: string;
  leadIn?: LeadIn;
  lead?: string;
  points?: string[];
  /** Go deeper: topic label (completes "Go deeper: …") + paragraphs (first one gets the rule). */
  deeper?: { label: string; paras: string[] };
};

/** An H3 card beside a unit: title + one line (rendered as its own ledger-ruled unit). */
export type LocalCard = { h3: string; line: string };

/** One sourced area figure. `geo`, `fact`, `period` and `value` must match a facts.json row exactly. */
export type LocalFact = {
  geo: string;
  fact: string;
  period: string;
  value: number;
  /** What the readout says under the number. */
  label: string;
  /** Mono source line under the readout, e.g. "Census CBP 2023 · +3.4% since 2018". */
  source: string;
};

export type LocalFaqItem = { q: string; a: string; link?: { to: string; label: string } };

/** The page body, top to bottom. `kind` picks the block; order is the H2 order of the spec. */
export type LocalSection =
  /** Unit (left) + three H3 cards (right). */
  | ({ kind: "intro"; cards: LocalCard[] } & LocalUnitCopy)
  /** Unit + the six live-site windows. `first` = slugs to put first (CHE: Starzi). */
  | ({ kind: "work"; first?: string[] } & LocalUnitCopy)
  /** Unit + optional H3 cards + optional visible comparison table + optional link row. */
  | ({
      kind: "text";
      cards?: LocalCard[];
      table?: { caption: string; cols: [string, string, string]; rows: [string, string, string][] };
      links?: { to: string; label: string }[];
    } & LocalUnitCopy)
  /** The five build stages (shared lines, doorway rule D4) under a page-specific H2/lede. */
  | ({ kind: "process" } & LocalUnitCopy)
  /** Three readouts from `facts.rows` + the "Where these figures come from" pop-up. */
  | ({ kind: "facts"; readouts: [number, number, number] } & LocalUnitCopy)
  /** NAP band + region plate + one inline question (H3). */
  | ({ kind: "office"; question: { q: string; a: string }; plateNote?: string } & LocalUnitCopy)
  /** APG accordion FAQ; `schema` adds FAQPage JSON-LD (verbatim pairs). */
  | { kind: "faq"; id: string; h2: string; items: LocalFaqItem[]; schema?: boolean }
  /** Route board: ledger link rows to related pages. */
  | { kind: "routes"; id: string; h2: string; lede: string; items: { to: string; title: string; tag: string }[] };

export type LocalPlace = {
  /** URL path, e.g. "/services/web-design-philadelphia". */
  path: string;
  /** Short place name for the breadcrumb and the CTA topic chip. */
  name: string;
  seo: { title: string; description: string; dateModified: string };
  hero: { kicker: string; h1: string; lede: string };
  /** Service.areaServed (JSON-LD), e.g. { "@type": "City", name: "Philadelphia", containedInPlace: {...} }. */
  areaServed: Record<string, unknown>;
  facts: {
    rows: LocalFact[];
    /** Census names for the pop-up, e.g. "Philadelphia-Camden-Wilmington, PA-NJ-DE-MD metro area". */
    geoName: string;
    /** facts.json `pulled` date of these rows (ISO), shown as the read date in the pop-up. */
    pulled: string;
  };
  sections: LocalSection[];
  desk: { h2: string; lede: string; covers: string[]; prompt: string };
};
