import * as React from "react";

/* Shared visuals for the revision-round-2 pages (Marketing, MarTech, Application development): the staged "plate"
 * wrapper in the sf-stage frame, the hover-lift card grid, a stat band, a bar chart and two diagrams. Everything is
 * static SVG/HTML, drawn in the final state without JS; motion is CSS only and sits inside prefers-reduced-motion:
 * no-preference. The [data-reveal] hook is the sf runtime's (adds .in as the figure enters). */

export const C = { navy: "#00366B", orange: "#FFAD33", ink: "#0F1E2E", ink3: "#5B6B7C", hair: "#C9D3DF", paper: "#F6F7F9", amber: "#8A4600" };
export const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace", display: "Bricolage Grotesque, Arial, sans-serif" };
const CSS_VAR = (d: number) => ({ "--d": `${d}s` } as React.CSSProperties);

/** Render once per page, inside <SfPage>. */
export function VisualStyles() {
  return (
    <style>{`
.mkp .node rect.bx, .mkp .node circle.bx { transition: stroke .2s, fill .2s; }
.mkp .node { cursor: default; }
@media (hover: hover) { .mkp .node:hover rect.bx, .mkp .node:hover circle.bx { stroke: ${C.navy}; fill: #fff; } }
@media (prefers-reduced-motion: no-preference) {
  .mkp .node { transition: transform .25s cubic-bezier(.2,.7,.2,1); }
  @media (hover: hover) { .mkp .node:hover { transform: translateY(-4px); } }
  .sfv2.js .mkp .rise { transition: opacity .55s cubic-bezier(.2,.7,.2,1) var(--d,0s), transform .55s cubic-bezier(.2,.7,.2,1) var(--d,0s); }
  .sfv2.js .mkp:not(.in) .rise { opacity: 0; transform: translateY(12px); }
  .sfv2.js .mkp .bar { transform-box: fill-box; transform-origin: left center; transition: transform .8s cubic-bezier(.2,.7,.2,1) var(--d,0s); }
  .sfv2.js .mkp:not(.in) .bar { transform: scaleX(0); }
  @supports (animation-timeline: view()) {
    .mkp .par-b { animation: mkp-b linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
    .mkp .par-f { animation: mkp-f linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
    @keyframes mkp-b { from { transform: translateY(18px); } to { transform: translateY(-18px); } }
    @keyframes mkp-f { from { transform: translateY(-6px); } to { transform: translateY(6px); } }
  }
}
.mkc-grid { list-style: none; padding: 0; margin: 40px 0 0; display: grid; gap: var(--gap, 24px); grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr)); }
@media (max-width: 1023px) { .mkc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) { .mkc-grid { grid-template-columns: 1fr; } }
.mkc { position: relative; height: 100%; padding: 26px 24px 22px; background: var(--surface, #fff); border: 1px solid var(--hair-s, ${C.hair}); transition: transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .25s, border-color .2s; }
.mkc::before { content: ""; position: absolute; left: -1px; right: -1px; top: -1px; height: 3px; background: ${C.orange}; transform: scaleX(0); transform-origin: left; transition: transform .45s cubic-bezier(.2,.7,.2,1); }
.mkc .mkc-n { font: 500 12px/1 ${F.mono}; letter-spacing: .1em; color: ${C.amber}; display: block; margin-bottom: 10px; }
.mkc .sf-h3 { font-size: 20px; margin: 0 0 8px; }
.mkc p { margin: 0; }
@media (hover: hover) { .mkc:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0, 54, 107, .14); border-color: ${C.navy}; } .mkc:hover::before { transform: none; } }
.mkc:focus-within { border-color: ${C.navy}; box-shadow: 0 16px 32px rgba(0, 54, 107, .14); } .mkc:focus-within::before { transform: none; }
@media (prefers-reduced-motion: reduce) { .mkc, .mkc::before { transition: none; } .mkc:hover { transform: none; } }
.sf-night .mkc { background: var(--n-stage, #10294a); border-color: rgba(255,255,255,.2); }
.sf-night .mkc p { color: var(--n-ink2, #dce3ec); }
.mk-table { width: 100%; border-collapse: collapse; font-size: 15px; }
.mk-table th { text-align: left; font: 500 12px/1.3 ${F.mono}; letter-spacing: .08em; text-transform: uppercase; color: ${C.ink3}; padding: 10px 14px; border-bottom: 2px solid ${C.navy}; }
.mk-table td { padding: 14px; border-bottom: 1px solid var(--hair-s, ${C.hair}); vertical-align: top; transition: background-color .15s; }
.mk-table td:first-child { font-weight: 600; color: ${C.ink}; }
@media (hover: hover) { .mk-table tbody tr:hover td { background: var(--tint, #EEF3F9); } }
.mk-table-wrap { overflow-x: auto; }
@media (max-width: 639px) { .mk-table thead { position: absolute; left: -9999px; } .mk-table, .mk-table tbody, .mk-table tr, .mk-table td { display: block; } .mk-table tr { padding: 10px 0; border-bottom: 1px solid var(--hair-s, ${C.hair}); } .mk-table td { border: 0; padding: 4px 14px; } .mk-table td[data-th]::before { content: attr(data-th) ": "; font: 500 11px/1 ${F.mono}; letter-spacing: .08em; text-transform: uppercase; color: ${C.ink3}; } }
.mk-sample { display: inline-block; font: 500 11px/1 ${F.mono}; letter-spacing: .08em; text-transform: uppercase; padding: 5px 8px; border: 1px solid ${C.hair}; color: ${C.ink3}; }
`}</style>
  );
}

export type PlateView = { vb: [number, number]; node: React.ReactNode };

/** The sf-stage frame around a desktop drawing and a phone drawing (only one shows at a time: sf-fig-d / sf-fig-m). */
export function Plate({ fig, title, desc, stamp, caption, d, m, kind = "Diagram" }: {
  fig: number; title: string; desc: string; stamp: string; caption: React.ReactNode; d: PlateView; m: PlateView; kind?: string;
}) {
  const id = `mkfig${fig}`;
  return (
    <figure className="sf-stage sf-sweep mkp" data-reveal="" aria-labelledby={`${id}-cap`}>
      <div className="sf-stage-in">
        <svg className="sf-fig-m" viewBox={`0 0 ${m.vb[0]} ${m.vb[1]}`} role="img" aria-labelledby={`${id}m-t`} style={{ aspectRatio: `${m.vb[0]}/${m.vb[1]}` }}>
          <title id={`${id}m-t`}>{title}, stacked for phones</title>
          {m.node}
        </svg>
        <svg className="sf-fig-d" viewBox={`0 0 ${d.vb[0]} ${d.vb[1]}`} role="img" aria-labelledby={`${id}-t ${id}-d`} style={{ aspectRatio: `${d.vb[0]}/${d.vb[1]}` }}>
          <title id={`${id}-t`}>{title}</title>
          <desc id={`${id}-d`}>{desc}</desc>
          {d.node}
        </svg>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {kind} · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}

/** Cards that lift, throw a soft shadow and draw an orange hairline on hover / focus. */
export function HoverCards({ items, cols = 3, numbered }: { items: { title: string; body: React.ReactNode }[]; cols?: 2 | 3 | 4; numbered?: boolean }) {
  return (
    <ul className="mkc-grid" style={{ "--cols": cols } as React.CSSProperties}>
      {items.map((it, i) => (
        <li key={it.title}>
          <article className="mkc">
            {numbered && <span className="mkc-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>}
            <h3 className="sf-h3">{it.title}</h3>
            <p>{it.body}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

/** A band of static figures (no count-up, so decimals stay exact). Uses the sf readout styles. */
export function StatBand({ items }: { items: { num: string; label: React.ReactNode; src: React.ReactNode }[] }) {
  return (
    <div className="sf-readouts">
      {items.map((r, i) => (
        <div className="sf-readout" key={i}>
          <span className="sf-readout-num">{r.num}</span>
          <p className="sf-readout-lab">{r.label}</p>
          <p className="sf-readout-src sf-mono">{r.src}</p>
        </div>
      ))}
    </div>
  );
}

/* Bars scale to the largest value. Rows: label, value, caption. */
type Row = { label: string; value: number; text: string; accent?: boolean };
export function BarPlate({ fig, title, desc, stamp, caption, rows }: { fig: number; title: string; desc: string; stamp: string; caption: React.ReactNode; rows: Row[] }) {
  const max = Math.max(...rows.map((r) => r.value));
  const dRow = 62, mRow = 78;
  const d = (
    <g fontFamily={F.body}>
      <g className="par-b" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <line key={i} x1={330 + i * 190} x2={330 + i * 190} y1="14" y2={rows.length * dRow + 20} stroke={C.hair} strokeDasharray="3 6" />)}</g>
      {rows.map((r, i) => {
        const w = Math.round((r.value / max) * 720), y = 24 + i * dRow;
        return (
          <g key={r.label} className="rise" style={CSS_VAR(i * 0.08)}>
            <text x="0" y={y + 24} fontSize="16" fontWeight="600" fill={C.ink}>{r.label}</text>
            <rect className="bar" x="330" y={y} width={w} height="34" fill={r.accent ? C.orange : C.navy} style={CSS_VAR(i * 0.08)} />
            <text x={330 + w + 12} y={y + 24} fontFamily={F.display} fontSize="22" fontWeight="800" fill={C.ink}>{r.text}</text>
          </g>
        );
      })}
    </g>
  );
  const m = (
    <g fontFamily={F.body}>
      {rows.map((r, i) => {
        const w = Math.round((r.value / max) * 300), y = 12 + i * mRow;
        return (
          <g key={r.label} className="rise" style={CSS_VAR(i * 0.08)}>
            <text x="0" y={y + 14} fontSize="14" fontWeight="600" fill={C.ink}>{r.label}</text>
            <rect className="bar" x="0" y={y + 24} width={w} height="26" fill={r.accent ? C.orange : C.navy} style={CSS_VAR(i * 0.08)} />
            <text x={w + 10} y={y + 44} fontFamily={F.display} fontSize="18" fontWeight="800" fill={C.ink}>{r.text}</text>
          </g>
        );
      })}
    </g>
  );
  return <Plate fig={fig} title={title} desc={desc} stamp={stamp} caption={caption} d={{ vb: [1200, rows.length * dRow + 30], node: d }} m={{ vb: [400, rows.length * mRow + 20], node: m }} kind="Chart" />;
}

/** Sample-data panel for the tool boxes. */
function Tool({ x, y, w = 150, h = 54, label, sub, fill = "#fff", stroke = C.hair, dash, d = 0 }: { x: number; y: number; w?: number; h?: number; label: string; sub?: string; fill?: string; stroke?: string; dash?: string; d?: number }) {
  return (
    <g className="node rise" style={CSS_VAR(d)}>
      <rect className="bx" x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 5)} textAnchor="middle" fontFamily={F.body} fontSize="15" fontWeight="600" fill={C.ink}>{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontFamily={F.mono} fontSize="10" fill={C.ink3}>{sub}</text>}
    </g>
  );
}

/** MarTech: five separate tools exported by hand, versus the same five on one customer record. */
export function StackPlate({ fig }: { fig: number }) {
  const tools: [string, string][] = [["CRM", "leads, deals"], ["Email", "campaigns"], ["Ads", "Google · Meta · LinkedIn"], ["Analytics", "web traffic"], ["Website", "forms"]];
  const d = (
    <g fontFamily={F.body}>
      <g className="par-b" aria-hidden="true"><path d="M0 40 H1200 M0 120 H1200 M0 200 H1200 M0 280 H1200" stroke={C.hair} strokeDasharray="2 8" /></g>
      <text x="40" y="34" fontFamily={F.mono} fontSize="12" letterSpacing=".1em" fill={C.amber}>BEFORE · FIVE LISTS</text>
      {tools.map(([l, s], i) => <Tool key={l} x={40 + (i % 2) * 190} y={56 + Math.floor(i / 2) * 70} w={170} label={l} sub={s} stroke={C.ink3} dash="5 4" d={i * 0.06} />)}
      <text x="40" y="276" fontSize="13" fill={C.ink3}>One person exports spreadsheets between them.</text>
      <g className="rise" style={CSS_VAR(0.4)}><path d="M470 160 H640" stroke={C.navy} strokeWidth="2" /><path d="M632 152 L644 160 L632 168z" fill={C.navy} /><text x="556" y="146" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill={C.amber} letterSpacing=".08em">WIRED</text></g>
      <text x="680" y="34" fontFamily={F.mono} fontSize="12" letterSpacing=".1em" fill={C.amber}>AFTER · ONE RECORD</text>
      <g className="par-f">
        {[[775, 114, 830, 118], [1025, 114, 970, 118], [775, 232, 830, 202], [1025, 232, 970, 202]].map(([x1, y1, x2, y2], i) => (<path key={i} className="rise" style={CSS_VAR(0.5 + i * 0.06)} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={C.navy} strokeWidth="1.5" fill="none" />))}
        <g className="node rise" style={CSS_VAR(0.45)}><rect className="bx" x="760" y="118" width="280" height="84" fill={C.navy} stroke={C.navy} /><text x="900" y="152" textAnchor="middle" fontFamily={F.display} fontSize="20" fontWeight="800" fill="#fff">One customer record</text><text x="900" y="176" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#9fb3c8">duplicates resolved · history follows the lead</text></g>
      </g>
      <Tool x={690} y={60} w={170} label="CRM" sub="owns the record" stroke={C.navy} d={0.5} /><Tool x={940} y={60} w={170} label="Email" sub="reads the record" stroke={C.navy} d={0.56} />
      <Tool x={690} y={232} w={170} label="Ads" sub="reports what the CRM reports" stroke={C.navy} d={0.62} /><Tool x={940} y={232} w={170} label="Analytics + site" sub="forms land in the record" stroke={C.navy} d={0.68} />
    </g>
  );
  const m = (
    <g fontFamily={F.body}>
      <text x="20" y="28" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill={C.amber}>BEFORE · FIVE LISTS</text>
      {tools.map(([l], i) => <Tool key={l} x={20 + (i % 3) * 124} y={44 + Math.floor(i / 3) * 56} w={112} h={44} label={l} stroke={C.ink3} dash="5 4" d={i * 0.06} />)}
      <text x="20" y="168" fontSize="12" fill={C.ink3}>One person exports spreadsheets between them.</text>
      <path d="M200 184 V224" stroke={C.navy} strokeWidth="2" /><path d="M192 218 L200 230 L208 218z" fill={C.navy} />
      <text x="20" y="262" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill={C.amber}>AFTER · ONE RECORD</text>
      <g className="node rise" style={CSS_VAR(0.3)}><rect className="bx" x="20" y="278" width="360" height="70" fill={C.navy} stroke={C.navy} /><text x="200" y="308" textAnchor="middle" fontFamily={F.display} fontSize="18" fontWeight="800" fill="#fff">One customer record</text><text x="200" y="330" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#9fb3c8">duplicates resolved · history follows the lead</text></g>
      <path d="M200 348 V364" stroke={C.navy} strokeWidth="1.5" />
      {["CRM", "Email", "Ads", "Analytics + site"].map((l, i) => <Tool key={l} x={20 + (i % 2) * 184} y={364 + Math.floor(i / 2) * 54} w={176} h={44} label={l} stroke={C.navy} d={0.4 + i * 0.06} />)}
    </g>
  );
  return (
    <Plate fig={fig} title="Diagram: five separate marketing tools on the left, the same tools connected through one customer record on the right"
      desc="On the left, CRM, email, ads, analytics and website each hold their own list and a person exports spreadsheets between them. On the right the same tools read and write one customer record, with duplicates resolved."
      stamp="From five lists to one record" caption="What a MarTech engagement changes: the tools stay, the wiring between them is built and written down." d={{ vb: [1200, 320], node: d }} m={{ vb: [400, 430], node: m }} />
  );
}

/** Marketing: client-owned accounts, partner access, one report. The bars are sample data and say so. */
export function AccessPlate({ fig }: { fig: number }) {
  const bars = [46, 62, 54, 78, 70];
  const d = (
    <g fontFamily={F.body}>
      <g className="par-b" aria-hidden="true"><path d="M0 70 H1200 M0 170 H1200 M0 270 H1200" stroke={C.hair} strokeDasharray="2 8" /></g>
      <text x="40" y="38" fontFamily={F.mono} fontSize="12" letterSpacing=".1em" fill={C.amber}>YOUR ACCOUNTS</text>
      <Tool x={40} y={58} w={230} label="Facebook Page" sub="owned by you" stroke={C.navy} d={0} />
      <Tool x={40} y={128} w={230} label="Instagram business account" sub="owned by you" stroke={C.navy} d={0.07} />
      <Tool x={40} y={198} w={230} label="CRM or email tool" sub="leads land here" stroke={C.navy} d={0.14} />
      <g className="rise" style={CSS_VAR(0.3)}>
        <path d="M280 160 H430" stroke={C.navy} strokeWidth="2" strokeDasharray="6 5" /><path d="M424 152 L436 160 L424 168z" fill={C.navy} />
        <rect x="330" y="132" width="86" height="26" fill="#fff" stroke={C.navy} /><text x="373" y="150" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill={C.navy}>partner</text>
      </g>
      <g className="par-f">
        <g className="node rise" style={CSS_VAR(0.35)}><rect className="bx" x="440" y="100" width="240" height="120" fill={C.navy} stroke={C.navy} /><text x="560" y="146" textAnchor="middle" fontFamily={F.display} fontSize="22" fontWeight="800" fill="#fff">OneAlgorithm</text><text x="560" y="172" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#9fb3c8">plans · publishes · measures</text><text x="560" y="192" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#9fb3c8">you can withdraw access any time</text></g>
      </g>
      <g className="rise" style={CSS_VAR(0.5)}><path d="M690 160 H770" stroke={C.navy} strokeWidth="2" /><path d="M764 152 L776 160 L764 168z" fill={C.navy} /></g>
      <g className="node rise" style={CSS_VAR(0.55)}>
        <rect className="bx" x="790" y="46" width="370" height="228" fill="#fff" stroke={C.hair} strokeWidth="1.5" />
        <text x="810" y="74" fontFamily={F.mono} fontSize="11" letterSpacing=".08em" fill={C.ink3}>ONE REPORT · ALL CHANNELS</text>
        <text x="1140" y="74" textAnchor="end" fontFamily={F.mono} fontSize="10" fill={C.amber}>SAMPLE DATA</text>
        {bars.map((h, i) => <rect key={i} className="bar" x={820 + i * 62} y={246 - h * 2} width="40" height={h * 2} fill={i === 3 ? C.orange : C.navy} style={CSS_VAR(0.6 + i * 0.07)} />)}
        <line x1="810" x2="1140" y1="246" y2="246" stroke={C.hair} />
        <text x="810" y="266" fontSize="12" fill={C.ink3}>Reach, leads and spend in plain numbers</text>
      </g>
    </g>
  );
  const m = (
    <g fontFamily={F.body}>
      <text x="20" y="26" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill={C.amber}>YOUR ACCOUNTS</text>
      <Tool x={20} y={40} w={360} h={44} label="Facebook Page" sub="owned by you" stroke={C.navy} d={0} />
      <Tool x={20} y={92} w={360} h={44} label="Instagram business account" sub="owned by you" stroke={C.navy} d={0.07} />
      <Tool x={20} y={144} w={360} h={44} label="CRM or email tool" sub="leads land here" stroke={C.navy} d={0.14} />
      <path d="M200 192 V222" stroke={C.navy} strokeWidth="2" strokeDasharray="5 4" /><path d="M192 216 L200 228 L208 216z" fill={C.navy} />
      <text x="214" y="212" fontFamily={F.mono} fontSize="11" fill={C.navy}>partner access</text>
      <g className="node rise" style={CSS_VAR(0.3)}><rect className="bx" x="20" y="236" width="360" height="84" fill={C.navy} stroke={C.navy} /><text x="200" y="272" textAnchor="middle" fontFamily={F.display} fontSize="20" fontWeight="800" fill="#fff">OneAlgorithm</text><text x="200" y="296" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#9fb3c8">plans · publishes · measures · withdraw any time</text></g>
      <path d="M200 320 V344" stroke={C.navy} strokeWidth="2" /><path d="M192 338 L200 350 L208 338z" fill={C.navy} />
      <g className="node rise" style={CSS_VAR(0.45)}>
        <rect className="bx" x="20" y="358" width="360" height="150" fill="#fff" stroke={C.hair} strokeWidth="1.5" />
        <text x="34" y="382" fontFamily={F.mono} fontSize="10" letterSpacing=".08em" fill={C.ink3}>ONE REPORT · ALL CHANNELS</text><text x="366" y="382" textAnchor="end" fontFamily={F.mono} fontSize="10" fill={C.amber}>SAMPLE</text>
        {bars.map((h, i) => <rect key={i} className="bar" x={44 + i * 64} y={488 - h * 1.3} width="40" height={h * 1.3} fill={i === 3 ? C.orange : C.navy} style={CSS_VAR(0.5 + i * 0.07)} />)}
        <line x1="34" x2="366" y1="488" y2="488" stroke={C.hair} />
      </g>
    </g>
  );
  return (
    <Plate fig={fig} title="Diagram: the client's own Facebook, Instagram and CRM accounts connect to OneAlgorithm as a partner, and one report comes back"
      desc="Three client-owned accounts feed OneAlgorithm through partner access that the client can withdraw. OneAlgorithm plans, publishes and measures, then returns one report covering every channel. The bars in the report are sample data."
      stamp="Your accounts, our hands · Sample report" caption="Access runs one way and can be withdrawn. The report shown is a sample layout, not a client result." d={{ vb: [1200, 300], node: d }} m={{ vb: [400, 520], node: m }} />
  );
}
