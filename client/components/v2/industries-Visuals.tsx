import * as React from "react";

/* Visual pieces for the industries group and the home body (round 2, critic.md): a systems plate (diagram),
   a numeral band, paired bars, lift cards and a CSS-only parallax layer. All motion is CSS scroll-driven
   (animation-timeline: view()) inside prefers-reduced-motion: no-preference, so reduced motion gets the finished,
   static picture. Colours come from the sf tokens. */

export function IndStyles() {
  return (
    <style>{`
.sfv2 .ind-lift{background:var(--surface,#fff);border:1px solid var(--hair-s);padding:22px 24px;position:relative;transition:transform .28s var(--arrive,ease),box-shadow .28s,border-color .28s}
.sfv2 .ind-lift::before{content:"";position:absolute;left:-1px;top:-1px;height:3px;width:100%;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .35s var(--arrive,ease)}
.sfv2 .ind-lift .ind-n{font:500 12px/1 var(--mono);letter-spacing:.12em;color:var(--orange-text)}
.sfv2 .ind-lift p{margin-top:8px;font-weight:600;color:var(--ink);font-size:18px;line-height:1.35}
.sfv2 .sf-night .ind-lift{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.2)}
.sfv2 .sf-night .ind-lift .ind-n{color:var(--orange)}
.sfv2 .sf-night .ind-lift p{color:#fff}
@media (hover:hover){.sfv2 .ind-lift:hover{transform:translateY(-6px);box-shadow:0 16px 32px rgba(0,30,60,.16);border-color:var(--navy)}.sfv2 .ind-lift:hover::before{transform:scaleX(1)}.sfv2 .sf-night .ind-lift:hover{border-color:var(--orange)}}
.sfv2 .ind-stack{display:grid;gap:14px;align-content:start}
.sfv2 .ind-row3{display:grid;gap:var(--gap,24px);grid-template-columns:repeat(auto-fit,minmax(240px,1fr));margin-top:36px}
.sfv2 .ind-sec{position:relative;overflow:clip}
.sfv2 .ind-sec>.sf-wrap{position:relative;z-index:1}
.sfv2 .ind-ghost{position:absolute;right:2%;top:50%;translate:0 -50%;font:800 clamp(160px,24vw,360px)/1 var(--display);letter-spacing:-.05em;color:transparent;-webkit-text-stroke:2px var(--hair-s);pointer-events:none;user-select:none;z-index:0}
.sfv2 .sf-night .ind-ghost{-webkit-text-stroke-color:rgba(255,255,255,.14)}
.sfv2 .ind-quote [data-lede]{font:700 clamp(26px,3vw,42px)/1.18 var(--display);letter-spacing:-.02em;max-width:26ch;color:var(--ink)}
.sfv2 .ind-quote .sf-lead{margin-top:20px}
.sfv2 .ind-band{display:grid;gap:var(--gap,24px);grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-top:36px}
.sfv2 .ind-fig{border-top:2px solid var(--navy);padding-top:14px;transition:transform .28s var(--arrive,ease)}
.sfv2 .sf-night .ind-fig{border-top-color:var(--orange)}
.sfv2 .ind-fig b{display:block;font:800 clamp(34px,3.8vw,56px)/1 var(--display);letter-spacing:-.03em;color:var(--ink);font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
.sfv2 .sf-night .ind-fig b{color:#fff}
.sfv2 .ind-fig span{display:block;margin-top:8px;font-weight:600;color:var(--ink)}
.sfv2 .sf-night .ind-fig span{color:#fff}
@media (hover:hover){.sfv2 .ind-fig:hover{transform:translateY(-4px)}}
.sfv2 .ind-bars{display:grid;gap:22px;margin-top:36px}
.sfv2 .ind-bars h3{font:600 17px/1.3 var(--body)}
.sfv2 .ind-bar{display:grid;grid-template-columns:minmax(0,1fr) 72px;align-items:center;gap:12px;margin-top:6px}
.sfv2 .ind-track{height:16px;background:var(--tint,#e8f0f8);position:relative}
.sfv2 .ind-fill{position:absolute;inset:0 auto 0 0;background:var(--navy);transform-origin:left;transition:filter .2s}
.sfv2 .ind-fill.b{background:var(--orange)}
.sfv2 .ind-bar:hover .ind-fill{filter:brightness(1.15)}
.sfv2 .ind-bar span{font:500 14px/1 var(--mono);color:var(--ink2)}
.sfv2 .ind-leg{display:flex;flex-wrap:wrap;gap:6px 22px;font:500 12px/1.4 var(--mono);color:var(--ink2);text-transform:uppercase;letter-spacing:.08em}
.sfv2 .ind-leg i{display:inline-block;width:12px;height:12px;margin-right:6px;vertical-align:-1px;background:var(--navy)}
.sfv2 .ind-leg i.b{background:var(--orange)}
.sfv2 .ind-plate-link{stroke-dasharray:6 6}
@media (prefers-reduced-motion:no-preference){
.sfv2 .ind-lift{--ind-r:0}
@supports (animation-timeline:view()){
.sfv2 .ind-par{animation:ind-par linear both;animation-timeline:view()}
.sfv2 .ind-par-2{animation-name:ind-par2}
@keyframes ind-par{from{transform:translateY(60px)}to{transform:translateY(-60px)}}
@keyframes ind-par2{from{transform:translateY(-30px)}to{transform:translateY(30px)}}
.sfv2 .ind-fill{animation:ind-grow linear both;animation-timeline:view();animation-range:entry 10% entry 90%}
@keyframes ind-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.sfv2 .ind-plate-link{animation:ind-dash linear both;animation-timeline:view();animation-range:entry 0% cover 50%}
@keyframes ind-dash{from{stroke-dashoffset:120}to{stroke-dashoffset:0}}
.sfv2 .ind-lift,.sfv2 .ind-fig{animation:ind-rise linear both;animation-timeline:view();animation-range:entry 0% entry 45%}
@keyframes ind-rise{from{opacity:.25;translate:0 24px}to{opacity:1;translate:0 0}}
}}
`}</style>
  );
}

/* A layer that drifts with the scroll. Decorative, aria-hidden. */
export function GhostNum({ children, slow }: { children: React.ReactNode; slow?: boolean }) {
  return <span className={`ind-ghost ind-par${slow ? " ind-par-2" : ""}`} aria-hidden="true">{children}</span>;
}

export function LiftCards({ items, className = "", start = 1 }: { items: React.ReactNode[]; className?: string; start?: number }) {
  return (
    <ol className={`ind-stack ${className}`} style={{ listStyle: "none", padding: 0 }}>
      {items.map((p, i) => (
        <li key={i} className="ind-lift" data-tilt="">
          <span className="ind-n">{String(i + start).padStart(2, "0")}</span>
          <p>{p}</p>
        </li>
      ))}
    </ol>
  );
}

export type Fig = { num: string; label: React.ReactNode };
export function FigBand({ items }: { items: Fig[] }) {
  return (
    <div className="ind-band">
      {items.map((f) => (
        <div className="ind-fig" key={f.num + String(f.label)}><b>{f.num}</b><span>{f.label}</span></div>
      ))}
    </div>
  );
}

export type BarRow = { label: string; a: number; b: number; max?: number };
/** Paired horizontal bars (a vs b, same percent scale). */
export function PairBars({ rows, aLabel, bLabel, max = 30, unit = "%" }: { rows: BarRow[]; aLabel: string; bLabel: string; max?: number; unit?: string }) {
  return (
    <figure style={{ margin: 0 }}>
      <p className="ind-leg" style={{ marginTop: 28 }}><span><i />{aLabel}</span><span><i className="b" />{bLabel}</span></p>
      <div className="ind-bars">
        {rows.map((r) => (
          <div key={r.label}>
            <h3>{r.label}</h3>
            <div className="ind-bar"><div className="ind-track"><div className="ind-fill" style={{ width: `${(r.a / (r.max ?? max)) * 100}%` }} /></div><span>{r.a.toLocaleString("en-US")}{unit}</span></div>
            <div className="ind-bar"><div className="ind-track"><div className="ind-fill b" style={{ width: `${(r.b / (r.max ?? max)) * 100}%` }} /></div><span>{r.b.toLocaleString("en-US")}{unit}</span></div>
          </div>
        ))}
      </div>
    </figure>
  );
}

const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace", display: "Bricolage Grotesque, Arial, sans-serif" };

/**
 * Systems plate: what you own on the left, what we do in the middle, what you get on the right.
 * A labelled diagram (not a client screenshot). Desktop drawing 1200x300, phone drawing 400x470.
 */
export function SystemsPlate({ fig, title, left, hub, right, caption, stamp }: {
  fig: number; title: string; left: string[]; hub: [string, string]; right: string[]; caption: React.ReactNode; stamp: string;
}) {
  const id = `ind-fig${fig}`;
  const rowD = (i: number) => 42 + i * 82;
  const rowM = (i: number) => 14 + i * 58;
  const rowM2 = (i: number) => 330 + i * 46;
  return (
    <figure className="sf-stage sf-sweep" aria-labelledby={`${id}-cap`}>
      <div className="sf-stage-in">
        <svg className="sf-fig-d" viewBox="0 0 1200 300" role="img" aria-labelledby={`${id}-t`} style={{ aspectRatio: "1200/300" }}>
          <title id={`${id}-t`}>{title}</title>
          <g className="ind-par ind-par-2" aria-hidden="true"><circle cx="600" cy="150" r="220" fill="none" stroke="#C9D3DF" strokeWidth="1" /><circle cx="600" cy="150" r="150" fill="none" stroke="#DCE3EC" strokeWidth="1" /></g>
          {left.map((t, i) => (
            <g key={t} fontFamily={F.body}>
              <rect x="50" y={rowD(i)} width="330" height="62" fill="#F6F7F9" stroke="#C9D3DF" />
              <text x="72" y={rowD(i) + 38} fontSize="19" fontWeight="600" fill="#0F1E2E">{t}</text>
              <path className="ind-plate-link" d={`M380 ${rowD(i) + 31} L470 150`} stroke="#00366B" strokeWidth="1.5" fill="none" />
            </g>
          ))}
          <g fontFamily={F.body}>
            <rect x="470" y="86" width="260" height="128" fill="#00366B" />
            <text x="600" y="132" textAnchor="middle" fontFamily={F.mono} fontSize="12" letterSpacing=".1em" fill="#FFAD33">{hub[0].toUpperCase()}</text>
            <text x="600" y="166" textAnchor="middle" fontFamily={F.display} fontSize="24" fontWeight="800" fill="#fff">{hub[1]}</text>
          </g>
          {right.map((t, i) => (
            <g key={t} fontFamily={F.body}>
              <path className="ind-plate-link" d={`M730 150 L820 ${rowD(i) + 31}`} stroke="#FFAD33" strokeWidth="1.5" fill="none" />
              <rect x="820" y={rowD(i)} width="330" height="62" fill="#fff" stroke="#00366B" strokeWidth="1.5" />
              <text x="842" y={rowD(i) + 38} fontSize="19" fontWeight="600" fill="#0F1E2E">{t}</text>
            </g>
          ))}
          <text x="50" y="30" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill="#5B6B7C">WHAT YOU ALREADY OWN</text>
          <text x="820" y="30" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill="#8A4600">WHAT IT BECOMES</text>
        </svg>
        <svg className="sf-fig-m" viewBox="0 0 400 470" role="img" aria-labelledby={`${id}-tm`} style={{ aspectRatio: "400/470" }}>
          <title id={`${id}-tm`}>{title}, stacked for phones</title>
          {left.map((t, i) => (
            <g key={t} fontFamily={F.body}>
              <rect x="20" y={rowM(i)} width="360" height="46" fill="#F6F7F9" stroke="#C9D3DF" />
              <text x="36" y={rowM(i) + 29} fontSize="15" fontWeight="600" fill="#0F1E2E">{t}</text>
            </g>
          ))}
          <path className="ind-plate-link" d="M200 190 V226" stroke="#00366B" strokeWidth="1.5" />
          <g fontFamily={F.body}>
            <rect x="20" y="228" width="360" height="86" fill="#00366B" />
            <text x="200" y="264" textAnchor="middle" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill="#FFAD33">{hub[0].toUpperCase()}</text>
            <text x="200" y="294" textAnchor="middle" fontFamily={F.display} fontSize="21" fontWeight="800" fill="#fff">{hub[1]}</text>
          </g>
          <path className="ind-plate-link" d="M200 314 V342" stroke="#FFAD33" strokeWidth="1.5" />
          {right.map((t, i) => (
            <g key={t} fontFamily={F.body}>
              <rect x="20" y={rowM2(i) + 14} width="360" height="38" fill="#fff" stroke="#00366B" strokeWidth="1.5" />
              <text x="36" y={rowM2(i) + 39} fontSize="14" fontWeight="600" fill="#0F1E2E">{t}</text>
            </g>
          ))}
        </svg>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Diagram · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`} className="sf-measure" style={{ padding: "10px 12px", color: "var(--ink2)", fontSize: 15 }}>{caption}</figcaption>
    </figure>
  );
}

/** The four-stage project rail used by the home and services hub bodies. */
export const PROCESS_STATIONS = [
  { k: "s1", num: "01", title: "Discover", sub: "where the work breaks" },
  { k: "s2", num: "02", title: "Design", sub: "a plan agreed in writing" },
  { k: "s3", num: "03", title: "Deliver", sub: "short cycles, working software" },
  { k: "s4", num: "04", title: "Support", sub: "hypercare, then 24/7" },
];
