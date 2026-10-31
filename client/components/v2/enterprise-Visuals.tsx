import * as React from "react";
import { Link } from "react-router-dom";
import { SmartSection, LedgerRule, Verify, StageRail, type Tone, type Station } from "../sf";

/* Visual building blocks for the four enterprise service pages (revision round 2, 2026-10-31): a staged hand-off
 * plate with layered parallax, hover-lift cards, a step list for the rail, a pull-statement, a ring chart and the
 * one consolidated Sources line. Everything composes the sf kit and its tokens; nothing here changes the kit.
 * Motion is CSS only (scroll-driven view() timelines inside `prefers-reduced-motion: no-preference`), so reduced
 * motion and no-JS get the finished, static drawing. Diagrams carry no invented data. */

const CSS = `
.sfv2 .ev-plate { margin-top: 40px; }
.sfv2 .ev-plate .ev-hit { transition: transform 0.28s var(--arrive); }
.sfv2 .ev-plate .ev-box { transition: stroke 0.2s, fill 0.2s; }
@media (hover: hover) {
  .sfv2 .ev-plate .ev-node:hover .ev-hit { transform: translateY(-5px); }
  .sfv2 .ev-plate .ev-node:hover .ev-box { stroke: #FFAD33; }
}
@media (prefers-reduced-motion: reduce) { .sfv2 .ev-plate .ev-node:hover .ev-hit { transform: none; } }
@keyframes ev-in { from { opacity: 0.25; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes ev-drift-a { from { transform: translateY(14px); } to { transform: translateY(-14px); } }
@keyframes ev-drift-b { from { transform: translateY(-22px); } to { transform: translateY(22px); } }
@keyframes ev-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes ev-ring { from { stroke-dashoffset: var(--len); } to { stroke-dashoffset: var(--off); } }
@supports (animation-timeline: view()) { @media (prefers-reduced-motion: no-preference) {
  .sfv2 .ev-l1 { animation: ev-drift-a linear both; animation-timeline: view(); }
  .sfv2 .ev-l3 { animation: ev-drift-b linear both; animation-timeline: view(); }
  .sfv2 .ev-in { animation: ev-in linear both; animation-timeline: view(); animation-range: entry 0% entry 55%; }
  .sfv2 .ev-in:nth-child(2) { animation-range: entry 6% entry 61%; }
  .sfv2 .ev-in:nth-child(3) { animation-range: entry 12% entry 67%; }
  .sfv2 .ev-in:nth-child(4) { animation-range: entry 18% entry 73%; }
  .sfv2 .ev-wire { stroke-dasharray: 1; animation: ev-draw linear both; animation-timeline: view(); animation-range: entry 10% cover 35%; }
  .sfv2 .ev-ring-fg { animation: ev-ring linear both; animation-timeline: view(); animation-range: entry 20% cover 40%; }
} }
.sfv2 .ev-cards { display: grid; grid-template-columns: repeat(var(--n, 3), minmax(0, 1fr)); gap: var(--gap, 24px); margin: 40px 0 0; padding: 0; list-style: none; }
@media (max-width: 1023px) { .sfv2 .ev-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) { .sfv2 .ev-cards { grid-template-columns: 1fr; } }
.sfv2 .ev-card { position: relative; display: flex; flex-direction: column; gap: 10px; height: 100%; padding: 28px 24px 22px; overflow: clip; background: #fff; color: #3A4B5E; border: 1px solid var(--hair-s); text-decoration: none; transition: transform 0.3s var(--arrive), box-shadow 0.3s, border-color 0.2s; }
.sfv2 .ev-card::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: var(--orange); transform: scaleX(0); transform-origin: left; transition: transform 0.45s var(--draw); }
.sfv2 .ev-card h3 { font: 700 22px/1.2 var(--display); color: #0F1E2E; }
.sfv2 .ev-card p { margin: 0; color: #3A4B5E; }
.sfv2 .ev-card .ev-k { font: 500 12px/1.4 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--orange-text); }
.sfv2 .ev-card .ev-glyph { width: 44px; height: 44px; color: var(--navy); transition: transform 0.35s var(--arrive); }
.sfv2 .ev-card .sf-arrow { margin-top: auto; padding-top: 6px; display: inline-flex; align-items: center; gap: 8px; font: 600 15px/1 var(--body); color: var(--navy); }
@media (hover: hover) {
  .sfv2 .ev-card:hover { transform: translateY(-8px); box-shadow: 0 20px 38px -16px rgba(0, 30, 70, 0.4); border-color: var(--navy); }
  .sfv2 .ev-card:hover::before { transform: none; }
  .sfv2 .ev-card:hover .ev-glyph { transform: scale(1.1) rotate(-4deg); }
}
.sfv2 .ev-card:focus-visible { box-shadow: 0 0 0 3px var(--orange); }
.sfv2 .ev-card:focus-visible::before { transform: none; }
@media (prefers-reduced-motion: reduce) { .sfv2 .ev-card, .sfv2 .ev-card:hover, .sfv2 .ev-card:hover .ev-glyph { transform: none; } }
.sfv2 .ev-quote { margin: 0; padding-top: 20px; border-top: 4px solid var(--orange); font: 800 clamp(28px, 3.4vw, 46px)/1.12 var(--display); letter-spacing: -0.02em; color: var(--ink); }
.sfv2 .sf-night .ev-quote { color: #fff; }
.sfv2 .ev-rail { margin-top: 40px; }
.sfv2 .ev-steps { margin-top: 32px; }
.sfv2 .ev-steps .sf-num { font: 500 13px/1 var(--mono); color: var(--orange-text); letter-spacing: 0.1em; }
.sfv2 .ev-steps .sf-h3 { margin-top: 10px; }
@media (hover: hover) { .sfv2 .ev-steps .sf-unit:hover { background: var(--tint); } }
.sfv2 .sf-readouts.ev-r2 { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0; }
@media (max-width: 639px) { .sfv2 .sf-readouts.ev-r2 { grid-template-columns: 1fr; } }
.sfv2 .ev-ring { display: block; width: 100%; max-width: 320px; margin: 0 auto; }
.sfv2 .ev-src { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; }
`;

/** Render once per page, first thing inside <SfPage>. */
export function EVStyles() {
  return <style>{CSS}</style>;
}

const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace", display: "Bricolage Grotesque, Arial, sans-serif" };

export type PlateNode = { num: string; title: string; sub: string; hl?: boolean };

/**
 * The visual band that bridges the image-led hero into the body: the section's H2 + lede, then a framed, stamped
 * diagram of 3-4 nodes in three depth layers (a dotted ground, the nodes, orange markers) that drift at different
 * speeds on scroll. Hover lifts a node. `children` (a Go deeper) sits under the figure.
 */
export function BridgePlate({ id, fig, tone = "paper", heading, nodes, title, desc, stamp, caption, children }: {
  id: string; fig: number; tone?: Tone; heading: { id: string; title: string; lede: string };
  nodes: PlateNode[]; title: string; desc: string; stamp: string; caption: string; children?: React.ReactNode;
}) {
  const n = nodes.length;
  const k = `ev${fig}`;
  const gap = 84, W = (1120 - (n - 1) * gap) / n, X = (i: number) => 40 + i * (W + gap);
  const mH = n * 92 + (n - 1) * 34 + 40;
  const lines = (s: string, max: number) => (s.length <= max ? [s] : [s.slice(0, s.lastIndexOf(" ", max)), s.slice(s.lastIndexOf(" ", max) + 1)]);
  return (
    <SmartSection id={id} tone={tone} heading={heading}>
      <figure className="sf-stage ev-plate" aria-labelledby={`${k}-cap`}>
        <div className="sf-stage-in">
          <svg className="sf-fig-d" viewBox="0 0 1200 230" role="img" aria-labelledby={`${k}-t ${k}-d`} style={{ aspectRatio: "1200/230" }}>
            <title id={`${k}-t`}>{title}</title>
            <desc id={`${k}-d`}>{desc}</desc>
            <defs>
              <pattern id={`${k}-dots`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#C9D3DF" /></pattern>
              <marker id={`${k}-arr`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="#00366B" /></marker>
            </defs>
            <g className="ev-l1"><rect x="0" y="-20" width="1200" height="270" fill={`url(#${k}-dots)`} /></g>
            <g className="ev-l3" aria-hidden="true">
              {nodes.map((_, i) => <rect key={i} x={X(i) + W - 26} y={36} width="12" height="12" fill="#FFAD33" />)}
            </g>
            <g>
              {nodes.slice(1).map((_, i) => <path key={i} className="ev-wire" pathLength={1} d={`M${X(i) + W + 6} 115 H${X(i + 1) - 8}`} stroke="#00366B" strokeWidth="2" fill="none" markerEnd={`url(#${k}-arr)`} />)}
            </g>
            <g className="ev-nodes" fontFamily={F.body}>
              {nodes.map((nd, i) => (
                <g className="ev-in" key={nd.title}>
                  <g className="ev-node">
                    <g className="ev-hit">
                      <rect className="ev-box" x={X(i)} y={50} width={W} height={130} fill={nd.hl ? "#00366B" : "#fff"} stroke={nd.hl ? "#00366B" : "#C9D3DF"} strokeWidth="1.5" />
                      <text x={X(i) + 18} y={78} fontFamily={F.mono} fontSize="12" letterSpacing=".1em" fill={nd.hl ? "#FFAD33" : "#8A4600"}>{nd.num}</text>
                      <text x={X(i) + 18} y={112} fontFamily={F.display} fontSize="21" fontWeight="800" fill={nd.hl ? "#fff" : "#0F1E2E"}>{nd.title}</text>
                      {lines(nd.sub, Math.floor((W - 36) / 6.6)).map((l, j) => <text key={j} x={X(i) + 18} y={140 + j * 17} fontSize="13" fill={nd.hl ? "#DCE8F5" : "#5B6B7C"}>{l}</text>)}
                    </g>
                  </g>
                </g>
              ))}
            </g>
          </svg>
          <svg className="sf-fig-m" viewBox={`0 0 400 ${mH}`} role="img" aria-labelledby={`${k}m-t`} style={{ aspectRatio: `400/${mH}` }}>
            <title id={`${k}m-t`}>{title}, stacked for phones</title>
            <defs>
              <pattern id={`${k}m-dots`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#C9D3DF" /></pattern>
              <marker id={`${k}m-arr`} markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto"><path d="M0 0 L8 0 L4 8z" fill="#00366B" /></marker>
            </defs>
            <g className="ev-l1"><rect x="0" y="-20" width="400" height={mH + 40} fill={`url(#${k}m-dots)`} /></g>
            {nodes.slice(1).map((_, i) => <path key={i} className="ev-wire" pathLength={1} d={`M200 ${20 + i * 126 + 92 + 3} V${20 + (i + 1) * 126 - 6}`} stroke="#00366B" strokeWidth="2" fill="none" markerEnd={`url(#${k}m-arr)`} />)}
            <g fontFamily={F.body}>
              {nodes.map((nd, i) => {
                const y = 20 + i * 126;
                return (
                  <g className="ev-in" key={nd.title}>
                    <rect x="24" y={y} width="352" height="92" fill={nd.hl ? "#00366B" : "#fff"} stroke={nd.hl ? "#00366B" : "#C9D3DF"} strokeWidth="1.5" />
                    <rect x="24" y={y} width="5" height="92" fill="#FFAD33" />
                    <text x="46" y={y + 26} fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill={nd.hl ? "#FFAD33" : "#8A4600"}>{nd.num}</text>
                    <text x="46" y={y + 52} fontFamily={F.display} fontSize="19" fontWeight="800" fill={nd.hl ? "#fff" : "#0F1E2E"}>{nd.title}</text>
                    <text x="46" y={y + 74} fontSize="13" fill={nd.hl ? "#DCE8F5" : "#5B6B7C"}>{nd.sub}</text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
        <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
        <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Diagram · {stamp}</span><span>OneAlgorithm</span></div>
        <figcaption id={`${k}-cap`}>{caption}</figcaption>
      </figure>
      {children && <div style={{ marginTop: 24 }}>{children}</div>}
    </SmartSection>
  );
}

const GLYPHS: Record<string, React.ReactNode> = {
  shield: <><path d="M22 5 L37 10 V22 C37 31 30 37 22 40 C14 37 7 31 7 22 V10 Z" /><path d="M15 22 l5 5 l9 -10" /></>,
  cloud: <path d="M13 33 a8 8 0 0 1 1 -16 a10 10 0 0 1 19 3 a6.5 6.5 0 0 1 -1 13 Z" />,
  list: <><rect x="8" y="9" width="6" height="6" /><rect x="8" y="19" width="6" height="6" /><rect x="8" y="29" width="6" height="6" /><path d="M19 12 H37 M19 22 H37 M19 32 H37" /></>,
  team: <><circle cx="15" cy="15" r="5" /><circle cx="29" cy="15" r="5" /><path d="M5 36 c0 -9 20 -9 20 0 M19 36 c0 -9 20 -9 20 0" /></>,
  flag: <path d="M12 6 V38 M12 8 H34 L29 16 L34 24 H12" />,
  clock: <><circle cx="22" cy="22" r="15" /><path d="M22 12 V22 L29 26" /></>,
  link: <><path d="M19 25 a6 6 0 0 0 8 0 l7 -7 a6 6 0 0 0 -8 -8 l-3 3" /><path d="M25 19 a6 6 0 0 0 -8 0 l-7 7 a6 6 0 0 0 8 8 l3 -3" /></>,
  mail: <><rect x="6" y="11" width="32" height="22" /><path d="M6 12 L22 25 L38 12" /></>,
  ticket: <path d="M6 13 H38 V19 a3 3 0 0 0 0 6 V31 H6 V25 a3 3 0 0 0 0 -6 Z" />,
  gear: <><circle cx="22" cy="22" r="6" /><path d="M22 6 V12 M22 32 V38 M6 22 H12 M32 22 H38 M11 11 L15 15 M29 29 L33 33 M33 11 L29 15 M15 29 L11 33" /></>,
  map: <path d="M7 11 L17 7 L27 11 L37 7 V33 L27 37 L17 33 L7 37 Z M17 7 V33 M27 11 V37" />,
  bars: <path d="M9 36 V24 M18 36 V16 M27 36 V26 M36 36 V9" />,
};

export type HoverCard = { title: string; body: string; kicker?: string; glyph?: keyof typeof GLYPHS; to?: string; cta?: string };

/** Cards that lift, throw a shadow, draw an orange top rule and turn their glyph on hover. Linked when `to` is set. */
export function HoverCards({ items, cols = 3 }: { items: HoverCard[]; cols?: 2 | 3 | 4 }) {
  return (
    <ul className="ev-cards" style={{ ["--n" as string]: cols }}>
      {items.map((c) => {
        const inner = (
          <>
            {c.glyph && <svg className="ev-glyph" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{GLYPHS[c.glyph]}</svg>}
            {c.kicker && <p className="ev-k">{c.kicker}</p>}
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            {c.to && <span className="sf-arrow">{c.cta ?? "Read more"} <span aria-hidden="true">→</span></span>}
          </>
        );
        return <li key={c.title}>{c.to ? <Link className="ev-card" to={c.to}>{inner}</Link> : <div className="ev-card">{inner}</div>}</li>;
      })}
    </ul>
  );
}

export type Step = { k: string; num: string; title: string; line: string };

/** The four numbered steps under a rail; hover or focus highlights the matching station (the kit's data-station). */
export function StepRail({ id, tone = "surface", heading, fig, stations, steps, title, desc, stamp, caption }: {
  id: string; tone?: Tone; heading: { id: string; title: string; lede: string }; fig: number; stations: Station[]; steps: Step[];
  title: string; desc: string; stamp: string; caption: string;
}) {
  return (
    <SmartSection id={id} tone={tone} heading={heading}>
      <StageRail className="ev-rail" fig={fig} stations={stations} title={title} desc={desc} stamp={stamp} caption={caption} />
      <ol className="sf-grid sf-stages ev-steps">
        {steps.map((s) => (
          <LedgerRule as="li" key={s.k} className="sf-c3" data-station={s.k}>
            <span className="sf-num" aria-hidden="true">{s.num}</span>
            <h3 className="sf-h3">{s.title}</h3>
            <p data-lede="">{s.line}</p>
          </LedgerRule>
        ))}
      </ol>
    </SmartSection>
  );
}

/** A big display statement, drawn from the page's own copy (not a customer quote). */
export function Statement({ children, className = "sf-c7" }: { children: React.ReactNode; className?: string }) {
  return <p className={`ev-quote ${className}`}>{children}</p>;
}

/** A ring chart for one published percentage; the arc draws in on scroll and is final without motion. */
export function RingFigure({ fig, pct, label, sub, stamp, caption, className = "sf-c4" }: { fig: number; pct: number; label: string; sub: string; stamp: string; caption: string; className?: string }) {
  const r = 84, len = Math.round(2 * Math.PI * r), off = Math.round(len * (1 - pct / 100));
  const k = `evr${fig}`;
  return (
    <figure className={`sf-stage ${className}`} aria-labelledby={`${k}-cap`}>
      <div className="sf-stage-in" style={{ padding: 20 }}>
        <svg className="ev-ring" viewBox="0 0 220 220" role="img" aria-labelledby={`${k}-t`}>
          <title id={`${k}-t`}>{`Ring chart: ${pct} percent. ${label}`}</title>
          <circle cx="110" cy="110" r={r} fill="none" stroke="#DCE3EC" strokeWidth="18" />
          <circle className="ev-ring-fg" cx="110" cy="110" r={r} fill="none" stroke="#00366B" strokeWidth="18" strokeDasharray={len} strokeDashoffset={off} transform="rotate(-90 110 110)" style={{ ["--len" as string]: len, ["--off" as string]: off }} />
          <circle cx="110" cy="26" r="5" fill="#FFAD33" />
          <text x="110" y="120" textAnchor="middle" fontFamily={F.display} fontSize="52" fontWeight="800" fill="#0F1E2E">{pct}%</text>
          <text x="110" y="146" textAnchor="middle" fontFamily={F.body} fontSize="12" fill="#5B6B7C">{sub}</text>
        </svg>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${k}-cap`}>{caption}</figcaption>
    </figure>
  );
}

/** The ONE Sources line per page: opens the page's single SourcesDialog. Sits after the FAQ, before the CTA. */
export function EnterpriseSources({ id, text }: { id: string; text: string }) {
  return (
    <SmartSection id="sources" compact tone="paper" labelledBy="sources-l">
      <p className="sf-mono ev-src"><span id="sources-l">Sources</span> <span aria-hidden="true">·</span> {text} <Verify id={id}>Open the sources</Verify></p>
    </SmartSection>
  );
}
