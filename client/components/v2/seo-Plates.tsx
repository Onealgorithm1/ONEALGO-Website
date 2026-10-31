import * as React from "react";

/* SEO group visuals (round 2, 2026-10-31): plates, a real chart, a comparison table, hover-lift cards and
 * CSS scroll-driven parallax. Every motion rule is wrapped in prefers-reduced-motion: no-preference and
 * @supports (animation-timeline), transform only (no opacity), so the prerendered HTML and the calm version
 * are the finished static state. Sample plates are labelled "Sample". Figures are the page's sourced ones. */

const CSS = `
.sfv2 .seo-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap,24px);margin-top:40px}
@media (max-width:1023px){.sfv2 .seo-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:639px){.sfv2 .seo-grid{grid-template-columns:1fr}}
.sfv2 .seo-lift{position:relative;display:flex;flex-direction:column;gap:10px;padding:24px;background:var(--surface);border:1px solid var(--hair-s);transition:transform .25s var(--arrive),box-shadow .25s var(--arrive),border-color .25s var(--arrive)}
.sfv2 .seo-lift::before{content:"";position:absolute;left:20px;right:20px;top:-1px;height:3px;background:var(--navy);transform:scaleX(0);transform-origin:left;transition:transform .45s var(--draw)}
.sfv2 .seo-lift .sf-h3{font-size:20px}
.sfv2 .seo-lift p{margin:0}
.sfv2 .seo-ico{width:44px;height:44px;display:grid;place-items:center;background:var(--navy);color:#fff;transition:transform .25s var(--arrive),background-color .25s}
.sfv2 .seo-ico svg{width:24px;height:24px}
@media (hover:hover){
 .sfv2 .seo-lift:hover{transform:translateY(-6px);box-shadow:0 18px 36px -18px rgba(0,54,107,.4);border-color:var(--navy)}
 .sfv2 .seo-lift:hover::before{transform:none}
 .sfv2 .seo-lift:hover .seo-ico{transform:rotate(-6deg) scale(1.06);background:#8A4600}
}
.sfv2 .seo-lift:focus-within{border-color:var(--navy)}
.sfv2 .seo-lift:focus-within::before{transform:none}
.sfv2 .seo-wlead{font-weight:600;color:var(--ink)}
.sfv2 .sf-night .seo-wlead{color:#fff}
.sfv2 .seo-plate{position:relative;margin-top:36px;padding:30px 0;overflow:clip}
.sfv2 .seo-card{position:relative;background:#fff;border:1px solid #C9D3DF;box-shadow:0 24px 48px -28px rgba(15,30,46,.35);color:#0F1E2E}
.sfv2 .seo-card header,.sfv2 .seo-card footer{display:flex;flex-wrap:wrap;gap:8px 16px;justify-content:space-between;align-items:center;padding:14px 18px;background:#F6F7F9}
.sfv2 .seo-card header{border-bottom:1px solid #C9D3DF}
.sfv2 .seo-card footer{border-top:1px solid #C9D3DF;font-weight:600}
.sfv2 .seo-card p{margin:0}
.sfv2 .seo-k{font:500 11px/1.4 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:#5B6B7C}
.sfv2 .seo-sample{font:600 11px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;padding:6px 8px;border:1px solid #8A4600;color:#8A4600}
.sfv2 .seo-row{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:14px;align-items:center;padding:14px 18px;border-top:1px solid #E3E9F0;transition:background-color .2s}
.sfv2 .seo-row:first-of-type{border-top:0}
@media (hover:hover){.sfv2 .seo-row:hover{background:#F0F5FB}}
.sfv2 .seo-rank{font:700 14px/1 var(--mono);color:#8A4600}
.sfv2 .seo-find{font-weight:600}
.sfv2 .seo-fix{font-size:14px;color:#3A4B5E}
.sfv2 .seo-chip{font:600 11px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;padding:6px 9px;background:#00366B;color:#fff;white-space:nowrap}
.sfv2 .seo-chip.hi{background:#fff;color:#00366B;border:1px solid #00366B}
.sfv2 .seo-chip.lo{background:#F0F5FB;color:#3A4B5E;border:1px solid #C9D3DF}
.sfv2 .seo-par{position:absolute;pointer-events:none;z-index:0}
.sfv2 .seo-plate .seo-card{z-index:1}
.sfv2 .seo-flow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin:0;padding:0;list-style:none;counter-reset:s}
.sfv2 .seo-flow li{position:relative;padding:18px 18px 20px;border:1px solid #C9D3DF;margin-left:-1px;background:#fff;color:#0F1E2E;transition:background-color .2s,transform .25s var(--arrive)}
.sfv2 .seo-flow li b{display:block;font:700 12px/1 var(--mono);letter-spacing:.08em;color:#8A4600;margin-bottom:8px}
.sfv2 .seo-flow li span{display:block;font-size:15px;color:#3A4B5E;margin-top:4px}
@media (hover:hover){.sfv2 .seo-flow li:hover{background:#F0F5FB;transform:translateY(-3px)}}
@media (max-width:639px){.sfv2 .seo-flow{grid-template-columns:1fr}.sfv2 .seo-flow li{margin-left:0;margin-top:-1px}}
.sfv2 .seo-tablewrap{margin-top:36px;overflow-x:auto;border:1px solid var(--hair-s);background:var(--surface)}
.sfv2 .seo-table{width:100%;border-collapse:collapse;min-width:640px}
.sfv2 .seo-table caption{text-align:left;padding:14px 18px;font:500 12px/1.4 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink3)}
.sfv2 .seo-table th,.sfv2 .seo-table td{text-align:left;vertical-align:top;padding:16px 18px;border-top:1px solid var(--hair-s)}
.sfv2 .seo-table thead th{font:600 12px/1.3 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);background:var(--tint)}
.sfv2 .seo-table tbody th{font-weight:600;color:var(--ink)}
.sfv2 .seo-table td:last-child{color:#8A1F11}
.sfv2 .seo-table tbody tr{transition:background-color .2s}
@media (hover:hover){.sfv2 .seo-table tbody tr:hover{background:var(--tint)}}
.sfv2 .seo-quote{margin:0;max-width:22ch;font:800 clamp(34px,5vw,64px)/1.05 var(--display);letter-spacing:-.025em;color:#fff}
.sfv2 .seo-chips{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0 0;padding:0;list-style:none}
.sfv2 .seo-chips li{padding:12px 16px;min-height:44px;border:1px solid var(--n-ink3,#9fb0c4);color:#fff;transition:transform .25s var(--arrive),border-color .2s,background-color .2s}
@media (hover:hover){.sfv2 .seo-chips li:hover{transform:translateY(-4px);border-color:var(--orange);background:rgba(255,173,51,.1)}}
.sfv2 .seo-bars{display:grid;gap:14px;margin:0;padding:18px;list-style:none}
.sfv2 .seo-bars li{display:grid;gap:6px}
.sfv2 .seo-track{height:22px;background:#E3E9F0}
.sfv2 .seo-fill{height:100%;background:#00366B;transform-origin:left}
.sfv2 .seo-fill.warm{background:#FFAD33}
@media (prefers-reduced-motion:no-preference){@supports (animation-timeline:view()){
 .sfv2 .seo-par-a{animation:seo-pa linear both;animation-timeline:view()}
 .sfv2 .seo-par-b{animation:seo-pb linear both;animation-timeline:view()}
 .sfv2 .seo-plate .seo-card{animation:seo-pc linear both;animation-timeline:view()}
 .sfv2 .seo-bar,.sfv2 .seo-fill{animation:seo-grow linear both;animation-timeline:view();animation-range:entry 5% entry 85%}
 .sfv2 .seo-bar{transform-box:fill-box;transform-origin:50% 100%}
 @keyframes seo-pa{from{transform:translateY(70px)}to{transform:translateY(-70px)}}
 @keyframes seo-pb{from{transform:translateY(-40px) rotate(-4deg)}to{transform:translateY(60px) rotate(4deg)}}
 @keyframes seo-pc{from{transform:translateY(18px)}to{transform:translateY(-18px)}}
 @keyframes seo-grow{from{transform:scale(.02)}to{transform:none}}
 .sfv2 .seo-bar{--k:y}
 .sfv2 .seo-fill{animation-name:seo-growx}
 @keyframes seo-growx{from{transform:scaleX(.02)}to{transform:none}}
 @keyframes seo-growy{from{transform:scaleY(.02)}to{transform:none}}
 .sfv2 .seo-bar{animation-name:seo-growy}
}}
`;

/** Scoped styles for the SEO visuals; render once per page, inside <SfPage>. */
export function SeoStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace", display: "Bricolage Grotesque, Arial, sans-serif" };

function Plate({ children, stamp, caption, id, className = "" }: { children: React.ReactNode; stamp: string; caption: React.ReactNode; id: string; className?: string }) {
  return (
    <figure className={`sf-stage sf-sweep ${className}`} data-reveal="" aria-labelledby={`${id}-cap`} style={{ margin: 0 }}>
      <div className="sf-stage-in">{children}</div>
      <div className="stamp" aria-hidden="true"><span>{stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}

/** Hand-off band for /services/seo: a sample audit report over two parallax layers. */
export function SeoAuditPlate() {
  const rows: [string, string, string, string, string][] = [
    ["1", "A redirect chain instead of a clean 200", "Point the old address straight at the final page.", "Critical", ""],
    ["2", "A stray noindex on a service page", "Remove it so Google may index the page.", "Critical", ""],
    ["3", "Duplicate titles across service pages", "One plain title per page.", "High", "hi"],
    ["4", "A slow Largest Contentful Paint", "Fix the slowest element first.", "High", "hi"],
    ["5", "No service area on the Business Profile", "Set one instead of a street address.", "Medium", "lo"],
  ];
  return (
    <div className="seo-plate">
      <svg className="seo-par seo-par-a" aria-hidden="true" viewBox="0 0 400 400" width="360" height="360" style={{ left: "-60px", top: "-20px" }}>
        <circle cx="200" cy="200" r="180" fill="none" stroke="#00366B" strokeOpacity=".16" strokeWidth="2" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#00366B" strokeOpacity=".12" strokeWidth="2" />
        <circle cx="200" cy="200" r="60" fill="#FFAD33" fillOpacity=".25" />
      </svg>
      <svg className="seo-par seo-par-b" aria-hidden="true" viewBox="0 0 240 240" width="220" height="220" style={{ right: "-30px", bottom: "-30px" }}>
        {Array.from({ length: 36 }, (_, i) => <circle key={i} cx={20 + (i % 6) * 40} cy={20 + Math.floor(i / 6) * 40} r="4" fill="#00366B" fillOpacity=".25" />)}
      </svg>
      <figure className="seo-card" data-reveal="" aria-labelledby="seo-audit-cap" style={{ margin: "0 auto", maxWidth: 920 }}>
        <header>
          <div><p className="seo-k">Audit report · example site</p><p style={{ fontWeight: 600 }}>Five findings, ranked by what to fix first</p></div>
          <span className="seo-sample">Sample</span>
        </header>
        <ol style={{ listStyle: "none", margin: 0, padding: 0 }} aria-label="Findings, ranked">
          {rows.map(([n, find, fix, chip, cls]) => (
            <li className="seo-row" key={n}>
              <span className="seo-rank" aria-hidden="true">{n}</span>
              <div><p className="seo-find">{find}</p><p className="seo-fix">{fix}</p></div>
              <span className={`seo-chip ${cls}`}>{chip}</span>
            </li>
          ))}
        </ol>
        <footer><span>The first few are usually things your own developer can do.</span><span className="seo-k">Sample data, not a client audit</span></footer>
        <figcaption id="seo-audit-cap" className="sf-mono" style={{ padding: "10px 18px" }}>A written audit ranks fixes by what to do first. The items above are examples.</figcaption>
      </figure>
    </div>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  technical: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  content: <path d="M6 3h9l4 4v14H6zM9 12h7M9 16h7M9 8h3" />,
  links: <path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1" />,
  local: <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  reporting: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  ai: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />,
};

export type SeoCard = { id: string; k?: string; t: string; lede: string; lead: string };

/** Hover-lift card grid (lift + shadow + accent hairline + icon turn). */
export function SeoCards({ items, cardId }: { items: SeoCard[]; cardId: string }) {
  return (
    <div className="seo-grid">
      {items.map((j) => (
        <article className="seo-lift" key={j.id} data-reveal="">
          <span className="seo-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONS[j.id] ?? ICONS.technical}</svg>
          </span>
          {j.k && <p className="sf-kicker">{j.k}</p>}
          <h3 className="sf-h3" id={`${cardId}-${j.id}`}>{j.t}</h3>
          <p>{j.lede}</p>
          <p className="seo-wlead"><span className="sf-lead-in">Why it matters:</span> {j.lead}</p>
        </article>
      ))}
    </div>
  );
}

type Pair = { label: string; a: number; b: number; delta: string };

/** Phantom Arcades, Google Search Console, 13 Aug to 19 Oct 2026 against the same dates in 2025. Bars are scaled within each pair. */
export function PhantomChart() {
  const pairs: Pair[] = [
    { label: "Google clicks", a: 1112, b: 2130, delta: "+92%" },
    { label: "Non-brand clicks", a: 95, b: 314, delta: "+231%" },
    { label: "Impressions", a: 31978, b: 52226, delta: "+63%" },
  ];
  const H = 210, base = 270;
  return (
    <Plate id="seo-phantom" stamp="FIG. · Chart · Phantom Arcades, Google Search Console" caption="Same 68-day window, 2025 against 2026. Each pair is scaled to its own 2026 figure. Revenue is not claimed.">
      <svg viewBox="0 0 600 340" width="100%" role="img" aria-labelledby="seo-ph-t" style={{ display: "block", background: "#fff" }}>
        <title id="seo-ph-t">Bar chart: Phantom Arcades Google clicks rose from 1,112 to 2,130 (+92%), non-brand clicks from 95 to 314 (+231%), impressions from 31,978 to 52,226 (+63%), comparing 13 August to 19 October 2026 with the same dates in 2025.</title>
        <line x1="20" x2="580" y1={base} y2={base} stroke="#C9D3DF" />
        {pairs.map((p, i) => {
          const x = 30 + i * 190, hb = H, ha = Math.max(6, (p.a / p.b) * H);
          return (
            <g key={p.label} fontFamily={F.body}>
              <text x={x + 75} y="34" textAnchor="middle" fontFamily={F.display} fontWeight="800" fontSize="30" fill="#00366B">{p.delta}</text>
              <rect className="seo-bar" x={x} y={base - ha} width="62" height={ha} fill="#9FB0C4" />
              <rect className="seo-bar" x={x + 76} y={base - hb} width="62" height={hb} fill="#00366B" />
              <text x={x + 31} y={base - ha - 8} textAnchor="middle" fontFamily={F.mono} fontSize="15" fill="#3A4B5E">{p.a.toLocaleString("en-US")}</text>
              <text x={x + 107} y={base - hb - 8} textAnchor="middle" fontFamily={F.mono} fontSize="15" fontWeight="700" fill="#0F1E2E">{p.b.toLocaleString("en-US")}</text>
              <text x={x + 69} y="296" textAnchor="middle" fontSize="16" fontWeight="600" fill="#0F1E2E">{p.label}</text>
              <text x={x + 31} y="318" textAnchor="middle" fontFamily={F.mono} fontSize="13" fill="#5B6B7C">2025</text>
              <text x={x + 107} y="318" textAnchor="middle" fontFamily={F.mono} fontSize="13" fill="#5B6B7C">2026</text>
            </g>
          );
        })}
      </svg>
    </Plate>
  );
}

/** The three hard requirements, and the three reasons a page is missing from Google. */
export function GooglePipeline() {
  return (
    <Plate id="seo-pipe" stamp="FIG. · Diagram · Why a page is missing" caption="URL Inspection in Search Console tells you which reason applies in about a minute.">
      <div style={{ padding: 18 }}>
        <p className="seo-k" style={{ color: "#5B6B7C", marginTop: 0 }}>Three reasons a page is missing</p>
        <ol className="seo-flow" style={{ marginTop: 10 }}>
          <li><b>A</b>Never crawled<span>Google has not seen it.</span></li>
          <li><b>B</b>Crawled, not indexed<span>Seen, and left out.</span></li>
          <li><b>C</b>Indexed, ranking too low<span>In Google, but too far down to see.</span></li>
        </ol>
      </div>
    </Plate>
  );
}

/** Ask / good answer / walk away: the red flags as a comparison table. */
export function ProviderTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="seo-tablewrap" data-reveal="">
      <table className="seo-table">
        <caption>Choosing an SEO provider</caption>
        <thead><tr><th scope="col">Ask about</th><th scope="col">A good answer</th><th scope="col">Walk away if</th></tr></thead>
        <tbody>{rows.map(([a, g, w]) => <tr key={a}><th scope="row">{a}</th><td>{g}</td><td>{w}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

/** Pull-quote band: one big statement and the drivers as chips. Place inside an sf-night section. */
export function SeoPullQuote({ statement, chips }: { statement: string; chips: string[] }) {
  return (
    <div className="sf-c12" style={{ gridColumn: "1 / -1" }}>
      <p className="seo-quote" data-reveal="">{statement}</p>
      <ul className="seo-chips" aria-label="What sets the scope">{chips.map((c) => <li key={c}>{c}</li>)}</ul>
    </div>
  );
}

/** Hand-off band for /services/seo-chester-county: a sample Business Profile and Google's three local factors. */
export function ProfilePlate() {
  const checks = ["Primary category: the one that names the core business", "Service area shown, street address hidden", "Hours, services, photos and a plain description", "Reviews asked for and answered by name"];
  return (
    <div className="seo-plate">
      <svg className="seo-par seo-par-a" aria-hidden="true" viewBox="0 0 400 400" width="340" height="340" style={{ right: "-40px", top: "-30px" }}>
        <path d="M200 380s150-130 150-230a150 150 0 0 0-300 0c0 100 150 230 150 230z" fill="none" stroke="#00366B" strokeOpacity=".16" strokeWidth="2" />
        <circle cx="200" cy="150" r="48" fill="#FFAD33" fillOpacity=".25" />
      </svg>
      <svg className="seo-par seo-par-b" aria-hidden="true" viewBox="0 0 240 240" width="200" height="200" style={{ left: "-20px", bottom: "-30px" }}>
        {Array.from({ length: 36 }, (_, i) => <circle key={i} cx={20 + (i % 6) * 40} cy={20 + Math.floor(i / 6) * 40} r="4" fill="#00366B" fillOpacity=".25" />)}
      </svg>
      <figure className="seo-card" data-reveal="" aria-labelledby="seo-prof-cap" style={{ margin: "0 auto", maxWidth: 920 }}>
        <header>
          <div><p className="seo-k">Business Profile · example service-area business</p><p style={{ fontWeight: 600 }}>The map results come from this, not from the website</p></div>
          <span className="seo-sample">Sample</span>
        </header>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {checks.map((c) => (
            <li className="seo-row" key={c} style={{ gridTemplateColumns: "28px minmax(0,1fr)" }}>
              <svg viewBox="0 0 18 18" width="20" height="20" aria-hidden="true"><path d="M3 9.5l4.5 4.5L15 5" fill="none" stroke="#00366B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <p className="seo-find">{c}</p>
            </li>
          ))}
        </ul>
        <footer><span>Google ranks local results on</span><span style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><span className="seo-chip">Relevance</span><span className="seo-chip">Distance</span><span className="seo-chip">Prominence</span></span></footer>
        <figcaption id="seo-prof-cap" className="sf-mono" style={{ padding: "10px 18px" }}>An example profile, not a client's. Google says there is no way to request or pay for a better local ranking.</figcaption>
      </figure>
    </div>
  );
}

/** Chester County, Census County Business Patterns 2023: all establishments against those with fewer than 20 employees. */
export function CountyBars() {
  const total = 15102, small = 12796;
  return (
    <Plate id="seo-county" className="sf-c7" stamp="FIG. · Chart · Chester County, PA, all sectors" caption="U.S. Census Bureau, County Business Patterns 2023, read 31 October 2026.">
      <ul className="seo-bars" style={{ background: "#fff", color: "#0F1E2E" }}>
        <li><span style={{ fontWeight: 600 }}>All establishments <span className="sf-mono">{total.toLocaleString("en-US")}</span></span><div className="seo-track"><div className="seo-fill" style={{ width: "100%" }} /></div></li>
        <li><span style={{ fontWeight: 600 }}>Fewer than 20 employees <span className="sf-mono">{small.toLocaleString("en-US")} (84.7%)</span></span><div className="seo-track"><div className="seo-fill warm" style={{ width: `${(small / total) * 100}%` }} /></div></li>
      </ul>
    </Plate>
  );
}
