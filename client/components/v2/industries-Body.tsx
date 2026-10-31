import * as React from "react";
import {
  SfPage, SmartSection, SmartUnit, GoDeeper, SourcesDialog, Verify, FAQ, DeskCTA, StageRail, type SfFaqItem, type SfSource, type Tone,
} from "../sf";
import { IndStyles, GhostNum, LiftCards, FigBand, PairBars, SystemsPlate, type Fig, type BarRow } from "./industries-Visuals";

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

export function IndBody({ crumbs, base, units, facts, faqHeading, faqs, desk, children, faqTone, plate, sources, railFig = 2, childrenFirst }: {
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

  return (
    <SfPage crumbs={crumbs} base={base}>
      <IndStyles />
      <SmartSection id="plate" tone={tone()} compact>
        <SystemsPlate fig={1} title={plate.title} left={plate.left} hub={plate.hub} right={plate.right} caption={plate.caption} stamp={plate.stamp} />
      </SmartSection>

      {childrenFirst && children}

      {units.map((u, i) => {
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
      })}

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
            Sources for this page: <Verify id="facts">Open the list</Verify>
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
