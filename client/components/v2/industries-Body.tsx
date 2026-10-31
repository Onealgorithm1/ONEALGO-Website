import * as React from "react";
import {
  SfPage, SmartSection, SmartUnit, GoDeeper, SourcesDialog, Verify, FAQ, DeskCTA, StageRail, type SfFaqItem, type SfSource, type Tone,
} from "../sf";
import { IndStyles, GhostNum, LiftCards, FigBand, PairBars, SystemsPlate, type Fig, type BarRow } from "./industries-Visuals";
import { OfferBand } from "./shared-OfferBand";
import { ProofStrip } from "./shared-ProofStrip";
import { CaseCard } from "./shared-CaseCard";

/* Shared body for the industries group (hub + five industry pages), everything below the existing hero.
   Round 2 (critic.md): hero hand-off plate, then units laid out four different ways in rotation (split text + lift cards,
   night band, reversed split, pull-quote), a stage rail, a figure band or paired bars, FAQ, ONE sources line, desk CTA last. */

export type IndUnit = {
  id: string; title: string; lede: string; lead: string; points?: string[];
  deepLabel: string; deep: React.ReactNode; kicker?: string;
};
export type IndFacts = {
  heading: string; lede: string; rows: { label: string; value: string }[]; read: string;
  sources: SfSource[]; note?: string;
  /** Big-figure band (default: the first four rows split into number + label). */
  band?: Fig[];
  /** Paired bars instead of the band (goal vs actual). */
  bars?: { rows: BarRow[]; aLabel: string; bLabel: string };
};
export type IndDesk = { topicLabel: string; need: string; heading: string; lede: string; covers: string[]; next?: string[] };
export type IndOffer = { heading?: string; line?: string; label?: string };
export type IndCase = { title: string; built: string; result?: string; to?: string; linkLabel?: string };
export type IndProof = "all" | "seo" | "salesforce" | "local";
export const UPDATED = "Updated October 31, 2026";
export type IndPlate = { title: string; left: string[]; hub: [string, string]; right: string[]; caption: string; stamp: string };

const STATIONS = [
  { k: "s1", num: "01", title: "Map", sub: "what talks to what" },
  { k: "s2", num: "02", title: "Agree", sub: "who owns each record" },
  { k: "s3", num: "03", title: "Build", sub: "sync, report, test" },
  { k: "s4", num: "04", title: "Support", sub: "hypercare, then 24/7" },
];

const autoBand = (rows: { label: string; value: string }[]): Fig[] =>
  rows.slice(0, 4).map((r) => {
    const m = r.value.match(/^(\S+)\s*(.*)$/);
    return { num: m ? m[1] : r.value, label: [m?.[2], r.label].filter(Boolean).join(" · ") };
  });

type Lay = "split" | "split-r" | "band" | "quote" | "plain";
const cycle: Lay[] = ["split", "band", "split-r", "quote"];

/** A row of CaseCards under its own H2. Pass `result` only when sourced. */
export function CaseBand({ id, heading, lede, cases, tone = "paper" }: { id: string; heading: string; lede: string; cases: IndCase[]; tone?: Tone }) {
  return (
    <SmartSection id={id} tone={tone} heading={{ id: `h-${id}`, title: heading, lede }}>
      <div style={{ marginTop: 32, display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))" }}>
        {cases.map((c) => <CaseCard key={c.title} {...c} />)}
      </div>
    </SmartSection>
  );
}

/** A small comparison table under its own H2 (scrolls inside its box on a phone, never the page). */
export function PatternTable({ id, heading, lede, head, rows, tone = "surface" }: { id: string; heading: string; lede: string; head: string[]; rows: string[][]; tone?: Tone }) {
  const cell: React.CSSProperties = { textAlign: "left", verticalAlign: "top", padding: "12px 16px 12px 0", borderTop: "1px solid var(--hair-s)" };
  return (
    <SmartSection id={id} tone={tone} heading={{ id: `h-${id}`, title: heading, lede }}>
      <div style={{ marginTop: 32, overflowX: "auto", maxWidth: "100%" }}>
        <table style={{ width: "100%", minWidth: 560, borderCollapse: "collapse" }}>
          <caption className="sr-only">{heading}</caption>
          <thead><tr>{head.map((h) => <th key={h} scope="col" className="sf-mono" style={{ ...cell, borderTop: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink3)" }}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => i === 0 ? <th key={i} scope="row" style={{ ...cell, fontWeight: 600 }}>{c}</th> : <td key={i} style={{ ...cell, color: "var(--ink2)" }}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </SmartSection>
  );
}

export function IndBody({ crumbs, base, units, facts, faqHeading, faqs, desk, children, faqTone, plate, sources, railFig = 2, childrenFirst, proof, offer1, offer2, after }: {
  crumbs: { label: string; to?: string }[];
  base?: { label: string; to: string }[];
  faqTone?: Tone;
  units: IndUnit[]; facts?: IndFacts; faqHeading: string; faqs: SfFaqItem[]; desk: IndDesk;
  /** Extra sections placed after the facts band (registry blocks). */
  children?: React.ReactNode;
  /** The visual band that bridges the hero into the body. */
  plate: IndPlate;
  /** Sources for pages without a facts block. */
  sources?: SfSource[];
  railFig?: number;
  /** Place `children` right after the plate (hub cards). */
  childrenFirst?: boolean;
  /** ProofStrip variant, placed right under the hand-off plate (top third of the page). */
  proof?: IndProof;
  /** OfferBand after the first section, and again before "How the work runs". */
  offer1?: IndOffer;
  offer2?: IndOffer;
  /** Extra sections placed straight after the unit with that id; a function receives the page's tone alternator. */
  after?: Record<string, React.ReactNode | ((tone: () => Tone) => React.ReactNode)>;
}) {
  let n = 0;
  const tone = (): Tone => (n++ % 2 ? "surface" : "paper");
  const allSources = facts?.sources ?? sources;
  let prev: Lay | null = null;
  const pick = (u: IndUnit, i: number): Lay => {
    let l: Lay = u.points?.length ? cycle[i % cycle.length] : "quote";
    if (l === prev) l = l === "quote" ? (u.points?.length ? "split" : "plain") : "quote";
    prev = l;
    return l;
  };

  const renderUnit = (u: IndUnit, i: number) => {
        const l = pick(u, i);
        const hid = `h-${u.id}`;
        const text = (cls: string, withPoints: boolean) => (
          <SmartUnit className={cls} headingId={hid} kicker={u.kicker} title={u.title} lede={u.lede} lead={u.lead} points={withPoints ? u.points : undefined}>
            <GoDeeper label={u.deepLabel}>{u.deep}</GoDeeper>
          </SmartUnit>
        );
        const num = String(i + 1).padStart(2, "0");
        if (l === "band") {
          const k = Math.min(u.points!.length, 3);
          return (
            <SmartSection key={u.id} id={u.id} tone="night" className="ind-sec" labelledBy={hid}>
              <GhostNum slow>{num}</GhostNum>
              <div className="sf-grid">{text("sf-c8", false)}</div>
              <ul className="ind-row3" style={{ listStyle: "none", padding: 0, gridTemplateColumns: `repeat(${k}, minmax(0,1fr))` }}>
                {u.points!.map((p, j) => (
                  <li key={j} className="ind-lift" data-tilt=""><span className="ind-n">{String(j + 1).padStart(2, "0")}</span><p>{p}</p></li>
                ))}
              </ul>
              <style>{`@media(max-width:900px){#${u.id} .ind-row3{grid-template-columns:1fr!important}}`}</style>
            </SmartSection>
          );
        }
        if (l === "quote") {
          return (
            <SmartSection key={u.id} id={u.id} tone={tone()} className="ind-sec" labelledBy={hid}>
              <GhostNum>{num}</GhostNum>
              <div className="sf-grid ind-quote">{text("sf-c8", true)}</div>
            </SmartSection>
          );
        }
        if (l === "plain") {
          return (
            <SmartSection key={u.id} id={u.id} tone={tone()} className="ind-sec" labelledBy={hid}>
              <GhostNum slow>{num}</GhostNum>
              <div className="sf-grid">{text("sf-c8", false)}</div>
            </SmartSection>
          );
        }
        const cards = <LiftCards className="sf-c5" items={u.points!} />;
        return (
          <SmartSection key={u.id} id={u.id} tone={tone()} className="ind-sec" labelledBy={hid}>
            <GhostNum slow={l === "split-r"}>{num}</GhostNum>
            <div className="sf-grid" style={{ alignItems: "start" }}>
              {l === "split" ? <>{text("sf-c7", false)}{cards}</> : <>{cards}{text("sf-c7", false)}</>}
            </div>
          </SmartSection>
        );
  };

  return (
    <SfPage crumbs={crumbs} base={base}>
      <IndStyles />
      <SmartSection id="plate" tone={tone()} compact>
        <SystemsPlate fig={1} title={plate.title} left={plate.left} hub={plate.hub} right={plate.right} caption={plate.caption} stamp={plate.stamp} />
      </SmartSection>

      {proof && (
        <SmartSection id="proof-strip" tone={tone()} compact>
          <ProofStrip variant={proof} />
        </SmartSection>
      )}

      {childrenFirst && children}
      {childrenFirst && <OfferBand {...offer1} />}

      {units.map((u, i) => {
        const node = renderUnit(u, i);
        const extra = after?.[u.id];
        return (
          <React.Fragment key={u.id}>
            {node}
            {typeof extra === "function" ? extra(tone) : extra}
            {i === 0 && !childrenFirst && <OfferBand {...offer1} />}
          </React.Fragment>
        );
      })}

      <OfferBand {...offer2} />

      <SmartSection id="how" tone={tone()} heading={{ id: "h-how", title: "How the work runs", lede: "Four stages, and the same people in each." }}>
        <StageRail className="sf-mt" fig={railFig} stations={STATIONS} sample={false}
          title="Four stages: map, agree, build, support"
          desc="A rail runs through four stations: map what talks to what, agree who owns each record, build and test the sync and the report, then support it."
          stamp="How the work runs"
          caption="Map the systems, agree who owns each record, build and test it, then stay on: hypercare first, then 24/7 support." />
      </SmartSection>

      {facts && (
        <SmartSection id="facts" tone="night" className="ind-sec" heading={{ id: "h-facts", title: facts.heading, lede: facts.lede }}>
          <GhostNum>{facts.bars ? "%" : "#"}</GhostNum>
          {facts.bars ? <PairBars {...facts.bars} /> : <FigBand items={facts.band ?? autoBand(facts.rows)} />}
          <p className="sf-mono" style={{ marginTop: 22 }}>{facts.read}</p>
          {facts.note && <p className="sf-measure" style={{ marginTop: 14 }}>{facts.note}</p>}
        </SmartSection>
      )}

      {!childrenFirst && children}

      <SmartSection id="faq" tone={faqTone ?? tone()} grid labelledBy="h-faq">
        <div className="sf-c4">
          <h2 className="sf-h2" id="h-faq">{faqHeading}</h2>
        </div>
        <div className="sf-c7 sf-faq-col"><FAQ items={faqs} /></div>
      </SmartSection>

      {allSources && (
        <SmartSection id="sources" tone="paper" compact>
          <p className="sf-mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 12px" }}>
            Sources for this page: <Verify id="facts">Open the list</Verify> <span>{UPDATED}</span>
          </p>
        </SmartSection>
      )}

      <DeskCTA
        form={{ topic: desk.need, topicLabel: desk.topicLabel, heading: "Tell us what you need", prompt: "What is the system or page that is not working?", submitLabel: "Talk to an expert", need: desk.need }}
        heading={desk.heading} lede={desk.lede} covers={desk.covers} coversLabel="What to have ready"
        next={desk.next ?? ["Send the form on the contact page; the topic is filled in.", "A person at OneAlgorithm reads it and replies.", "If it fits, we scope it in writing before any work starts."]}
        hcLink={false}
      />
      {allSources && <SourcesDialog id="facts" sources={allSources} />}
    </SfPage>
  );
}

export const CBP = "https://www.census.gov/programs-surveys/cbp.html";
