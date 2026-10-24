import * as React from "react";
import { GoDeeper } from "./GoDeeper";
import { LedgerRule } from "./SmartSection";

/*
 * FIG. rail: "how an implementation runs". A framed, stamped stage (signature 1) with a four-station rail that the
 * scroll draws (GSAP ScrollTrigger, scrub .6, loaded lazily by sfMotion.ts; fully drawn without JS and under reduced
 * motion), an optional reconciliation ledger under station 03 (records slide in, totals count, the tick draws), and
 * the wire sweep as it enters (CSS view() timeline). Ships a desktop drawing (1200x300) and a phone drawing
 * (400x600); only one is displayed at any width. Hovering or focusing a <StageUnits> item highlights its station.
 */

/** `short` is the phone drawing's label when `title` is too long for the 400-unit-wide SVG (about 30 characters). */
export type Station = { k: "s1" | "s2" | "s3" | "s4"; num: string; title: string; sub: string; short?: string };
export type Stage = Station & { line: string; details: string[] };

const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace", display: "Bricolage Grotesque, Arial, sans-serif" };
const DX = [110, 400, 760, 1090];
const MY = [30, 130, 230, 330];

/**
 *   <StageRail fig={3} stations={HUB_STAGES} ledger title="Staged diagram of a four-stage Salesforce implementation with a reconciliation ledger"
 *     desc="A rail runs through four stations…" stamp="How an implementation runs" caption="The four stages in the order they usually run…" />
 * `ledger` adds the sample reconciliation (12,480 → 12,480, totals match) under station 03; without it the rail stands alone.
 */
export function StageRail({ fig, stations, ledger, title, desc, stamp, caption, className = "", sample = !!ledger }: {
  fig: number; stations: Station[]; ledger?: boolean; title: string; desc: string; stamp: string; caption: React.ReactNode; className?: string;
  /** Print "Sample data, not a client build" in the stamp. Defaults to true only when the sample ledger is shown. */
  sample?: boolean;
}) {
  const id = `fig${fig}`;
  return (
    <figure className={`sf-stage sf-sweep sf-rail-fig ${className}`} aria-labelledby={`${id}-cap`} data-scene="rail">
      <div className="sf-stage-in">
        <svg className="sf-fig-m" viewBox={`0 0 400 ${ledger ? 600 : 380}`} role="img" aria-labelledby={`${id}m-title`} style={{ aspectRatio: ledger ? "400/600" : "400/380" }}>
          <title id={`${id}m-title`}>{title}, stacked for phones</title>
          <path className="rail" d={`M40 30 V${ledger ? 400 : MY[3]}`} fill="none" stroke="#00366B" strokeWidth="2" pathLength="1" />
          {stations.map((s, i) => (
            <g className={`sta ${s.k}`} fontFamily={F.body} key={s.k}>
              <circle className="node" cx="40" cy={MY[i]} r="11" fill="#fff" stroke="#00366B" strokeWidth="2" />
              <text x="64" y={MY[i] - 6} fontFamily={F.mono} fontSize="11" fill="#8A4600" letterSpacing=".1em">{s.num}</text>
              <text x="64" y={MY[i] + 12} fontSize="15" fontWeight="600" fill="#0F1E2E">{s.short ?? s.title}</text>
              <text x="64" y={MY[i] + 30} fontSize="12" fill="#5B6B7C">{s.sub}</text>
            </g>
          ))}
          {ledger && (
            <g className="ledger-g" fontFamily={F.body}>
              <rect x="40" y="424" width="150" height="76" fill="#F6F7F9" stroke="#C9D3DF" />
              <text x="50" y="444" fontFamily={F.mono} fontSize="10.5" fill="#5B6B7C" letterSpacing=".06em">LEGACY CRM</text>
              <text x="50" y="476" fontFamily={F.display} fontSize="26" fontWeight="800" fill="#0F1E2E" letterSpacing="-.02em"><tspan className="cnt" data-count="12480">12,480</tspan></text>
              <text x="50" y="492" fontSize="11" fill="#5B6B7C">profiled, deduped</text>
              <path d="M190 462 H206" stroke="#00366B" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />
              <rect x="210" y="424" width="150" height="76" fill="#F6F7F9" stroke="#C9D3DF" />
              <text x="220" y="444" fontFamily={F.mono} fontSize="10.5" fill="#5B6B7C" letterSpacing=".06em">SALESFORCE</text>
              <text x="220" y="476" fontFamily={F.display} fontSize="26" fontWeight="800" fill="#0F1E2E" letterSpacing="-.02em"><tspan className="cnt" data-count="12480">12,480</tspan></text>
              <text x="220" y="492" fontSize="11" fill="#5B6B7C">counts reconciled</text>
              <g className="ok"><path className="okpath" d="M42 534 l7 7 l14 -14" fill="none" stroke="#00366B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength="30" /><text x="72" y="542" fontSize="14" fontWeight="600" fill="#0F1E2E">Totals match</text><text x="72" y="560" fontSize="12" fill="#5B6B7C">signed off before go-live</text></g>
              <text x="40" y="590" fontFamily={F.body} fontSize="12" fill="#3A4B5E">Any stage can be taken on its own.</text>
            </g>
          )}
        </svg>
        <svg className="sf-fig-d" viewBox={`0 0 1200 ${ledger ? 300 : 180}`} role="img" aria-labelledby={`${id}-title ${id}-desc`} style={{ aspectRatio: ledger ? "1200/300" : "1200/180" }}>
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-desc`}>{desc}</desc>
          <defs><marker id={`${id}-arr`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="#00366B" /></marker></defs>
          <path className="rail" d="M110 90 H1090" fill="none" stroke="#00366B" strokeWidth="2" pathLength="1" />
          {stations.map((s, i) => (
            <g className={`sta ${s.k}`} fontFamily={F.body} key={s.k}>
              <circle className="node" cx={DX[i]} cy="90" r="11" fill="#fff" stroke="#00366B" strokeWidth="2" />
              <text x={DX[i]} y="60" textAnchor="middle" fontFamily={F.mono} fontSize="12" fill="#8A4600" letterSpacing=".1em">{s.num}</text>
              <text x={DX[i]} y="128" textAnchor="middle" fontSize="15" fontWeight="600" fill="#0F1E2E">{s.title}</text>
              <text x={DX[i]} y="148" textAnchor="middle" fontSize="12" fill="#5B6B7C">{s.sub}</text>
            </g>
          ))}
          {ledger && (
            <g className="ledger-g" fontFamily={F.body}>
              <rect x="560" y="186" width="150" height="86" fill="#F6F7F9" stroke="#C9D3DF" />
              <text x="572" y="208" fontFamily={F.mono} fontSize="10" fill="#5B6B7C" letterSpacing=".06em">LEGACY CRM · EXPORT</text>
              <text x="572" y="246" fontFamily={F.display} fontSize="30" fontWeight="800" fill="#0F1E2E" letterSpacing="-.02em"><tspan className="cnt" data-count="12480">12,480</tspan></text>
              <text x="572" y="264" fontSize="11" fill="#5B6B7C">records profiled, deduped</text>
              <rect x="810" y="186" width="150" height="86" fill="#F6F7F9" stroke="#C9D3DF" />
              <text x="822" y="208" fontFamily={F.mono} fontSize="10" fill="#5B6B7C" letterSpacing=".06em">SALESFORCE · LOADED</text>
              <text x="822" y="246" fontFamily={F.display} fontSize="30" fontWeight="800" fill="#0F1E2E" letterSpacing="-.02em"><tspan className="cnt" data-count="12480">12,480</tspan></text>
              <text x="822" y="264" fontSize="11" fill="#5B6B7C">loaded, counts reconciled</text>
              <path d="M716 229 H800" stroke="#00366B" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />
              <g className="recs">
                <rect className="rec" x="724" y="214" width="14" height="6" fill="#00366B" /><rect className="rec" x="744" y="214" width="14" height="6" fill="#00366B" /><rect className="rec" x="764" y="214" width="14" height="6" fill="#00366B" />
                <rect className="rec" x="724" y="236" width="14" height="6" fill="#FFAD33" /><rect className="rec" x="744" y="236" width="14" height="6" fill="#FFAD33" /><rect className="rec" x="764" y="236" width="14" height="6" fill="#FFAD33" />
              </g>
              <g className="ok"><path className="okpath" d="M982 224 l7 7 l14 -14" fill="none" stroke="#00366B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength="30" /><text x="1010" y="233" fontSize="14" fontWeight="600" fill="#0F1E2E">Totals match</text><text x="1010" y="252" fontSize="11" fill="#5B6B7C">signed off before go-live</text></g>
              <text fontFamily={F.body} fontSize="13" fill="#3A4B5E"><tspan x="80" y="212">Any stage can be taken on its own.</tspan><tspan x="80" y="232">A company with an admin in place often</tspan><tspan x="80" y="252">brings us in for stage 03 alone.</tspan></text>
            </g>
          )}
        </svg>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {sample ? "Staged scene" : "Diagram"} · {stamp}{sample ? " · Sample data, not a client build" : ""}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}

/**
 * The four stage units under the rail: number, H3, one line, Go deeper checklist. Each is wired to its station
 * (data-station) so hover/focus highlights it on the figure.
 *   <StageUnits items={HUB_STAGES} />
 */
export function StageUnits({ items, className = "" }: { items: Stage[]; className?: string }) {
  return (
    <ol className={`sf-grid sf-stages ${className}`}>
      {items.map((s) => (
        <LedgerRule as="li" key={s.k} className="sf-c3" data-station={s.k}>
          <span className="sf-num" aria-hidden="true">{s.num}</span>
          <h3 className="sf-h3">{s.title}</h3>
          <p data-lede="">{s.line}</p>
          <GoDeeper label={`what stage ${s.num} covers`}>
            <ul className="sf-points" style={{ marginTop: 0 }}>
              {s.details.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </GoDeeper>
        </LedgerRule>
      ))}
    </ol>
  );
}

/** The hub's four stages (facts: the current hub page at ef1a8f0; stage 02 is named per structure-spec.md §4 row 5). */
export const HUB_STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Before you buy licenses", sub: "edition · seats · owner", line: "Which edition you actually need, and whether Salesforce is the right answer at all.",
    details: ["Your current process, workarounds included", "Which clouds and edition you need, and which you don't", "A license count and a rough cost before anyone signs", "Who owns and administers the org after we leave"] },
  { k: "s2", num: "02", title: "Salesforce configuration and customization", short: "Configuration and customization", sub: "Sales Cloud · Service Cloud · Flow", line: "Org setup, Sales Cloud and Service Cloud, and Flow for the steps done by hand today.",
    details: ["Profiles, permission sets, page layouts", "Custom objects and fields where standard ones don't fit", "Flow automation for the manual steps; Apex where clicks can't", "Marketing Cloud support for accounts already running"] },
  { k: "s3", num: "03", title: "Data migration and integration", sub: "reconciled before go-live · ERP sync", line: "Records out of the old system, cleaned, loaded and reconciled until the totals match.",
    details: ["Profile the legacy data before moving any of it", "Dedupe and map fields; agree in writing what gets dropped", "Load, then reconcile record counts and totals", "ERP-to-Salesforce syncs, SAP included; moves off QuickBase and Kissflow"] },
  { k: "s4", num: "04", title: "After go-live", sub: "training · weekly admin · releases", line: "We stay on while the people who use it daily find what nobody thought of.",
    details: ["Training for admins and for everyday users", "Reports and dashboards changed as the questions change", "Release-window testing before every Salesforce upgrade", "Weekly administration and development, hours reported every week"] },
];
