import * as React from "react";
import {
  SfPage, SmartSection, SmartUnit, GoDeeper, SourcesDialog, Verify, FAQ, DeskCTA, type SfFaqItem, type SfSource,
} from "../sf";

/* Shared body for the industries group (hub + five industry pages). Everything below the existing hero.
   One data-driven shape so the six pages stay the same rhythm: Smart Brevity units, an optional facts table
   with a source pop-up, FAQ (FAQPage schema), and the desk CTA (button to /contact, no form). */

export type IndUnit = {
  id: string; title: string; lede: string; lead: string; points?: string[];
  deepLabel: string; deep: React.ReactNode; kicker?: string;
};
export type IndFacts = {
  heading: string; lede: string; rows: { label: string; value: string }[]; read: string;
  sources: SfSource[]; note?: string;
};
export type IndDesk = { topicLabel: string; need: string; heading: string; lede: string; covers: string[]; next?: string[] };

const cell: React.CSSProperties = { textAlign: "left", verticalAlign: "top", padding: "14px 16px 14px 0", borderTop: "1px solid var(--hair-s)" };

export function IndBody({ crumbs, base, units, facts, faqHeading, faqs, desk, children, faqTone }: {
  crumbs: { label: string; to?: string }[];
  base?: { label: string; to: string }[];
  faqTone?: "paper" | "surface";
  units: IndUnit[]; facts?: IndFacts; faqHeading: string; faqs: SfFaqItem[]; desk: IndDesk;
  /** Extra sections placed after the units (cards, a registry block). */
  children?: React.ReactNode;
}) {
  return (
    <SfPage crumbs={crumbs} base={base}>
      {units.map((u, i) => (
        <SmartSection key={u.id} id={u.id} tone={i % 2 ? "surface" : "paper"} grid labelledBy={`h-${u.id}`}>
          <SmartUnit
            className="sf-c8" headingId={`h-${u.id}`} kicker={u.kicker}
            title={u.title} lede={u.lede} lead={u.lead} points={u.points}
          >
            <GoDeeper label={u.deepLabel}>{u.deep}</GoDeeper>
          </SmartUnit>
        </SmartSection>
      ))}

      {facts && (
        <SmartSection id="facts" tone={units.length % 2 ? "surface" : "paper"} grid heading={{ id: "h-facts", title: facts.heading, lede: facts.lede }}>
          <div className="sf-c8">
            <table style={{ width: "100%", borderCollapse: "collapse", borderBottom: "1px solid var(--hair-s)", fontSize: 16, lineHeight: 1.45 }}>
              <caption className="sr-only">{facts.heading}</caption>
              <tbody>
                {facts.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" style={{ ...cell, fontWeight: 400, color: "var(--ink2)", width: "52%" }}>{r.label}</th>
                    <td style={{ ...cell, color: "var(--ink)", fontWeight: 600 }}>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="sf-mono" style={{ marginTop: 14, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              {facts.read} · <Verify id="facts">Where these figures come from</Verify>
            </p>
            {facts.note && <p className="sf-measure" style={{ marginTop: 14 }}>{facts.note}</p>}
          </div>
        </SmartSection>
      )}

      {children}

      <SmartSection id="faq" tone={faqTone ?? ((units.length + (facts ? 1 : 0) + (children ? 1 : 0)) % 2 ? "surface" : "paper")} grid labelledBy="h-faq">
        <div className="sf-c4">
          <h2 className="sf-h2" id="h-faq">{faqHeading}</h2>
        </div>
        <div className="sf-c7 sf-faq-col"><FAQ items={faqs} /></div>
      </SmartSection>

      <DeskCTA
        form={{ topic: desk.need, topicLabel: desk.topicLabel, heading: "Tell us what you need", prompt: "What is the system or page that is not working?", submitLabel: "Talk to an expert", need: desk.need }}
        heading={desk.heading} lede={desk.lede} covers={desk.covers} coversLabel="What to have ready"
        next={desk.next ?? ["Send the form on the contact page; the topic is filled in.", "A person at OneAlgorithm reads it and replies.", "If it fits, we scope it in writing before any work starts."]}
        hcLink={false}
      />
      {facts && <SourcesDialog id="facts" sources={facts.sources} />}
    </SfPage>
  );
}

export const CBP = "https://www.census.gov/programs-surveys/cbp.html";
