import * as React from "react";
import { SmartSection, SmartUnit, GoDeeper, FAQ, Verify, type LeadIn, type Tone, type SfFaqItem } from "../sf";
import { SF_PHONE } from "../../data/salesforceShared";

/* Shared body pieces for the four enterprise service pages (IT consulting, staff augmentation, Zendesk,
 * operational transformation). They only compose the sf kit: one Smart Brevity unit per EUnit, one section per
 * row of one or two units, so the pages stay data and the kit stays untouched. */

export type EUnit = {
  id: string;
  title: string;
  lede: string;
  lead?: string;
  leadIn?: LeadIn;
  points?: string[];
  /** Completes "Go deeper: ..." */
  label: string;
  deep: React.ReactNode;
};

export function EnterpriseRow({ id, tone = "paper", units, heading, cols }: { id: string; tone?: Tone; units: EUnit[]; heading?: { id: string; title: string; lede: string }; cols?: "sf-c3" | "sf-c4" | "sf-c6" | "sf-c8" }) {
  const two = units.length > 1;
  const level = heading ? 3 : 2;
  return (
    <SmartSection id={id} tone={tone} grid heading={heading} labelledBy={heading ? undefined : units[0].id}>
      {units.map((u, i) => (
        <SmartUnit
          key={u.id}
          level={level}
          headingId={u.id}
          className={cols ?? (two ? "sf-c6" : "sf-c8")}
          delay={i ? 0.08 : undefined}
          measure={!two}
          title={u.title}
          lede={u.lede}
          lead={u.lead}
          leadIn={u.leadIn}
          points={u.points}
        >
          <GoDeeper label={u.label}>{u.deep}</GoDeeper>
        </SmartUnit>
      ))}
    </SmartSection>
  );
}

/** Big display numerals with a source line and a Verify chip that opens the page's SourcesDialog. */
export function EnterpriseFacts({ id, tone = "night", title, lede, items, sourceLine, verifyId }: {
  id: string;
  tone?: Tone;
  title: string;
  lede: string;
  items: { n: string; t: string }[];
  sourceLine: string;
  verifyId: string;
}) {
  return (
    <SmartSection id={id} tone={tone} grid heading={{ id: `${id}-h`, title, lede }}>
      {items.map((it, i) => (
        <div key={it.t} className="sf-unit sf-c4" data-unit="" style={{ ["--d" as string]: `${i * 0.08}s` }}>
          <p style={{ font: "800 clamp(40px, 5vw, 64px)/1 var(--display)", letterSpacing: "-0.02em" }}>{it.n}</p>
          <p style={{ marginTop: 10 }}>{it.t}</p>
        </div>
      ))}
      <p className="sf-mono sf-c12" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
        {sourceLine} · <Verify id={verifyId}>Where these figures come from</Verify>
      </p>
    </SmartSection>
  );
}

const cell: React.CSSProperties = { textAlign: "left", verticalAlign: "top", padding: "14px 16px 14px 0", borderTop: "1px solid var(--hair-s)" };
const headCell: React.CSSProperties = { ...cell, borderTop: 0, padding: "0 16px 10px 0", font: "500 12px/1.4 var(--mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink3)" };

/** Visible comparison table: first column is the row header; every cell is short so 390px stays readable. */
export function EnterpriseTable({ id, tone = "surface", title, lede, caption, head, rows }: {
  id: string;
  tone?: Tone;
  title: string;
  lede: string;
  caption: string;
  head: string[];
  rows: string[][];
}) {
  return (
    <SmartSection id={id} tone={tone} heading={{ id: `${id}-h`, title, lede }}>
      <div style={{ marginTop: 40, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", borderBottom: "1px solid var(--hair-s)", fontSize: 16, lineHeight: 1.45 }}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>{head.map((h) => <th key={h} scope="col" style={headCell}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                <th scope="row" style={{ ...cell, fontWeight: 700, fontFamily: "var(--display)", color: "var(--ink)" }}>{r[0]}</th>
                {r.slice(1).map((c, i) => <td key={i} style={{ ...cell, color: "var(--ink2)" }}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SmartSection>
  );
}

export function EnterpriseFaq({ title, items }: { title: string; items: SfFaqItem[] }) {
  return (
    <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
      <div className="sf-c4">
        <h2 className="sf-h2" id="h-faq">{title}</h2>
        <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
      </div>
      <div className="sf-c7 sf-faq-col">
        <FAQ items={items} />
      </div>
    </SmartSection>
  );
}
