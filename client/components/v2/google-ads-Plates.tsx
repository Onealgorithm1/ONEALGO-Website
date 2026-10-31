import * as React from "react";
import { SourcesDialog } from "../sf";
import type { SfSource } from "../sf";

/* Google Ads group, revision round 2 (2026-10-31): the visuals under the kept heroes of /services/google-ads and
 * /services/google-ads-philadelphia. Staged SVG plates in the sf frame (sf-stage), a hover-lift card grid and a
 * comparison table. Everything is SAMPLE or SCHEMATIC and says so in the stamp; no client data, no prices.
 * Motion: CSS scroll-driven animation only (bars grow, two depth layers drift), inside prefers-reduced-motion:
 * no-preference and @supports; without it the plates are their finished static selves. */

const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace", display: "Bricolage Grotesque, Arial, sans-serif" };

const CSS = `
.ga-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap,24px);list-style:none;padding:0;margin:0}
@media(max-width:1023px){.ga-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:639px){.ga-cards{grid-template-columns:minmax(0,1fr)}}
.ga-card{position:relative;height:100%;padding:26px 24px 24px;background:#fff;border:1px solid var(--hair-s);transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
.ga-card::before{content:"";position:absolute;left:-1px;right:-1px;top:-1px;height:4px;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .4s ease}
.ga-card:hover,.ga-card:focus-within{border-color:var(--navy);box-shadow:0 20px 38px -18px rgba(0,54,107,.4)}
.ga-card:hover::before,.ga-card:focus-within::before{transform:none}
.ga-card .ga-num{display:block;margin-bottom:10px}
@media(hover:hover) and (prefers-reduced-motion:no-preference){.ga-card:hover{transform:translateY(-6px)}}
.ga-table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--hair-s)}
.ga-table th,.ga-table td{padding:16px 18px;text-align:left;vertical-align:top;border-bottom:1px solid var(--hair-s)}
.ga-table thead th{font:600 12px/1.2 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);border-bottom:2px solid var(--navy)}
.ga-table tbody th{font-weight:600;color:var(--ink)}
.ga-table tbody tr{transition:background .2s ease}
.ga-table tbody tr:hover{background:var(--tint)}
.ga-table tbody tr:last-child>*{border-bottom:0}
@media(max-width:639px){
 .ga-table,.ga-table tbody,.ga-table tr,.ga-table th,.ga-table td{display:block}
 .ga-table thead{position:absolute;left:-9999px}
 .ga-table td{border-bottom:0;padding:6px 16px 12px}
 .ga-table td::before{content:attr(data-l);display:block;font:600 11px/1.2 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);margin-bottom:4px}
 .ga-table tbody th{padding:14px 16px 4px;border-bottom:0}
 .ga-table tbody tr{border-bottom:1px solid var(--hair-s)}
}
.ga-quote{position:relative;height:100%;padding:36px 32px;background:var(--navy);color:#fff;transition:transform .25s ease,box-shadow .25s ease}
.ga-quote::before{content:"";display:block;width:56px;height:4px;background:var(--orange);margin-bottom:22px;transform-origin:left;transition:transform .4s ease}
.ga-quote p.ga-q{font:800 clamp(30px,3.4vw,52px)/1.06 var(--display);letter-spacing:-.02em;color:#fff}
.ga-quote p.ga-s{margin-top:18px;color:#d6e2f0;max-width:44ch}
.ga-quote:hover::before{transform:scaleX(2.1)}
@media(hover:hover) and (prefers-reduced-motion:no-preference){.ga-quote:hover{transform:translateY(-4px);box-shadow:0 22px 40px -20px rgba(0,30,70,.6)}}
.ga-trio{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap,24px);margin-top:40px}
@media(max-width:759px){.ga-trio{grid-template-columns:minmax(0,1fr)}}
.ga-step{position:relative;padding:28px 0 8px;border-top:2px solid var(--orange);transition:transform .25s ease}
.ga-step .ga-big{display:block;font:800 clamp(44px,5.2vw,76px)/1 var(--display);letter-spacing:-.03em;color:#fff}
.ga-step .sf-mono{display:block;margin-bottom:12px}
@media(hover:hover) and (prefers-reduced-motion:no-preference){.ga-step:hover{transform:translateY(-6px)}}
.ga-rowlink{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:14px;list-style:none;padding:0}
@media(prefers-reduced-motion:no-preference){@supports(animation-timeline:view()){
 .ga-bar{transform-box:fill-box;transform-origin:left center;animation:ga-grow linear both;animation-timeline:view();animation-range:entry 5% cover 45%}
 .ga-par-a{animation:ga-pa linear both;animation-timeline:view();animation-range:cover 0% cover 100%}
 .ga-par-b{animation:ga-pb linear both;animation-timeline:view();animation-range:cover 0% cover 100%}
 @keyframes ga-grow{from{transform:scaleX(.15)}to{transform:none}}
 @keyframes ga-pa{from{transform:translateY(26px)}to{transform:translateY(-26px)}}
 @keyframes ga-pb{from{transform:translateY(-18px)}to{transform:translateY(18px)}}
}}
`;

/** Once per page, inside <SfPage>. */
export function GaStyle() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

/** Hover-lift card grid (lift, shadow, accent bar draws). Not links: the cards are content. */
export function GaCards({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="ga-cards">
      {items.map((c, i) => (
        <li key={c.title}>
          <article className="ga-card">
            <span className="sf-mono ga-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="sf-h3">{c.title}</h3>
            <p style={{ marginTop: 10 }}>{c.body}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

/** Comparison table; stacks to labelled blocks on phones. */
export function GaTable({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <table className="ga-table">
      <caption className="sf-visually-hidden" style={{ position: "absolute", left: -9999 }}>{caption}</caption>
      <thead><tr>{head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]}>
            <th scope="row">{r[0]}</th>
            {r.slice(1).map((c, i) => <td key={i} data-l={head[i + 1]}>{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Three-column "stages in time" band for the night tone. */
export function GaTrio({ items }: { items: { label: string; big: string; body: string }[] }) {
  return (
    <div className="ga-trio">
      {items.map((s) => (
        <div className="ga-step" key={s.big}>
          <span className="sf-mono">{s.label}</span>
          <span className="ga-big">{s.big}</span>
          <p style={{ marginTop: 14 }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

/** The ledger rows (H3 left, sentence right), reusing the kit's sf-ledger styles. */
export function GaLedger({ items }: { items: { title: string; body: React.ReactNode }[] }) {
  return (
    <div className="sf-ledger" style={{ marginTop: 0 }}>
      {items.map((it) => (
        <div className="sf-lrow" key={it.title}>
          <h3 className="sf-h4">{it.title}</h3>
          <p>{it.body}</p>
        </div>
      ))}
    </div>
  );
}

function Frame({ fig, kind, stamp, caption, children, className = "" }: {
  fig: number; kind: string; stamp: string; caption: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <figure className={`sf-stage sf-sweep ${className}`} aria-labelledby={`ga-fig${fig}-cap`}>
      <div className="sf-stage-in">{children}</div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {kind} · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`ga-fig${fig}-cap`}>{caption}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------------------------------------------------- */

const TERMS: { t: string; pct: number; cut: boolean }[] = [
  { t: "plumber jobs hiring", pct: 31, cut: true },
  { t: "emergency plumber near me", pct: 24, cut: false },
  { t: "free plumbing course", pct: 19, cut: true },
  { t: "drain cleaning service", pct: 14, cut: false },
  { t: "plumber salary", pct: 12, cut: true },
];

/** FIG: a sample search-terms report. Sample account, sample shares of spend; no money figures. */
export function AuditPlate({ fig }: { fig: number }) {
  return (
    <Frame fig={fig} kind="Sample report" stamp="Sample data, not a client account"
      caption="A search terms report, sorted by share of spend. The terms that cost the most and bring nothing become the first negatives.">
      <svg viewBox="0 0 480 400" role="img" aria-labelledby={`ga${fig}-t ga${fig}-d`}>
        <title id={`ga${fig}-t`}>Sample search terms report</title>
        <desc id={`ga${fig}-d`}>Five search terms with their share of ad spend. Three are marked add negative and two are marked keep.</desc>
        <rect width="480" height="400" fill="#F6F7F9" />
        <g className="ga-par-b" aria-hidden="true">
          <circle cx="430" cy="360" r="90" fill="none" stroke="#C9D3DF" strokeWidth="1.5" />
          <circle cx="430" cy="360" r="130" fill="none" stroke="#C9D3DF" strokeWidth="1.5" />
        </g>
        <text x="20" y="30" fontFamily={F.mono} fontSize="12" fill="#5B6B7C" letterSpacing=".08em">SEARCH TERMS · LAST 30 DAYS</text>
        <rect x="360" y="14" width="100" height="22" fill="#fff" stroke="#C9D3DF" />
        <text x="410" y="29" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#3A4B5E" letterSpacing=".06em">SAMPLE DATA</text>
        <path d="M20 48 H460" stroke="#00366B" strokeWidth="2" />
        {TERMS.map((r, i) => {
          const y = 80 + i * 56;
          return (
            <g key={r.t} fontFamily={F.body}>
              <text x="20" y={y} fontSize="16" fontWeight="600" fill="#0F1E2E">{r.t}</text>
              <rect x="20" y={y + 10} width="300" height="12" fill="#E6EBF1" />
              <rect className="ga-bar" x="20" y={y + 10} width={r.pct * 9.3} height="12" fill={r.cut ? "#FFAD33" : "#00366B"} />
              <text x={26 + r.pct * 9.3} y={y + 21} fontFamily={F.mono} fontSize="12" fill="#3A4B5E">{r.pct}%</text>
              <rect x="350" y={y - 16} width="110" height="30" fill={r.cut ? "#FFAD33" : "#00366B"} />
              <text x="405" y={y + 4} textAnchor="middle" fontSize="14" fontWeight="600" fill={r.cut ? "#0F1E2E" : "#fff"}>{r.cut ? "Add negative" : "Keep"}</text>
            </g>
          );
        })}
        <path d="M20 352 H460" stroke="#C9D3DF" />
        <text x="20" y="380" fontFamily={F.body} fontSize="14" fill="#3A4B5E">Cut first, add keywords later.</text>
      </svg>
    </Frame>
  );
}

/** FIG: one lead counted three times, then once. Generic touchpoints are passed in. */
export function CountOncePlate({ fig, inputs, caption }: { fig: number; inputs: [string, string, string]; caption: React.ReactNode }) {
  const panel = (y0: number, after: boolean) => {
    const cy = y0 + 70;
    return (
      <g fontFamily={F.body} key={String(after)}>
        <text x="20" y={y0 + 16} fontFamily={F.mono} fontSize="12" fill={after ? "#00366B" : "#8A4600"} letterSpacing=".08em">
          {after ? "AFTER · ONE LEAD, COUNTED ONCE" : "BEFORE · ONE LEAD, COUNTED THREE TIMES"}
        </text>
        {inputs.map((s, i) => {
          const by = y0 + 32 + i * 36;
          return (
            <g key={s}>
              <rect x="20" y={by} width="170" height="28" fill="#fff" stroke="#C9D3DF" />
              <text x="32" y={by + 19} fontSize="13.5" fill="#0F1E2E">{s}</text>
              <path d={`M190 ${by + 14} C 250 ${by + 14}, 250 ${cy}, 300 ${cy}`} fill="none" stroke={after && i > 0 ? "#C9D3DF" : "#00366B"} strokeWidth="1.6" strokeDasharray={after && i > 0 ? "4 4" : undefined} />
            </g>
          );
        })}
        <rect x="300" y={cy - 40} width="160" height="80" fill="#fff" stroke={after ? "#00366B" : "#FFAD33"} strokeWidth="2" />
        <text x="320" y={cy + 14} fontFamily={F.display} fontSize="52" fontWeight="800" fill={after ? "#0F1E2E" : "#8A4600"} letterSpacing="-.02em">{after ? "1" : "3"}</text>
        <text x="362" y={cy - 4} fontSize="13" fill="#3A4B5E">conversion{after ? "" : "s"}</text>
        <text x="362" y={cy + 14} fontSize="13" fill="#3A4B5E">{after ? "counted once" : "reported"}</text>
        {after && <path d={`M432 ${cy + 30} l7 7 l14 -14`} fill="none" stroke="#00366B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />}
      </g>
    );
  };
  return (
    <Frame fig={fig} kind="Diagram" stamp="Sample, not a client account" caption={caption}>
      <svg viewBox="0 0 480 340" role="img" aria-labelledby={`ga${fig}-t`}>
        <title id={`ga${fig}-t`}>One lead reported three times before tracking is fixed, and once after</title>
        <rect width="480" height="340" fill="#F6F7F9" />
        {panel(10, false)}
        <path d="M20 170 H460" stroke="#C9D3DF" />
        {panel(180, true)}
      </svg>
    </Frame>
  );
}

const RANK = ["Your bid", "Quality of your ads and landing page", "Ad Rank thresholds", "Competitiveness of the auction", "Context of the search", "Expected impact of ad assets, formats"];

/** FIG (night): the six factors Google lists for Ad Rank, feeding whether and where an ad shows. */
export function AdRankPlate({ fig }: { fig: number }) {
  return (
    <Frame fig={fig} kind="Diagram" stamp="Google's published factors"
      caption="The six factors Google Ads Help lists for Ad Rank. Quality Score is a diagnostic, and Google says it is not an auction input.">
      <svg viewBox="0 0 480 420" role="img" aria-labelledby={`ga${fig}-t ga${fig}-d`}>
        <title id={`ga${fig}-t`}>The six Ad Rank factors</title>
        <desc id={`ga${fig}-d`}>Six factors feed Ad Rank, which decides whether your ad shows and where.</desc>
        <g className="ga-par-a" aria-hidden="true">
          <circle cx="400" cy="185" r="84" fill="none" stroke="#fff" strokeOpacity=".1" strokeWidth="1.5" />
          <circle cx="400" cy="185" r="124" fill="none" stroke="#fff" strokeOpacity=".07" strokeWidth="1.5" />
        </g>
        <g className="ga-par-b" aria-hidden="true">
          <circle cx="330" cy="30" r="3" fill="#FFAD33" /><circle cx="460" cy="110" r="2" fill="#FFAD33" /><circle cx="360" cy="260" r="2" fill="#FFAD33" />
        </g>
        {RANK.map((r, i) => {
          const y = 20 + i * 54;
          return (
            <g key={r} fontFamily={F.body}>
              <rect x="16" y={y} width="292" height="40" fill="none" stroke="#fff" strokeOpacity=".3" />
              <text x="28" y={y + 25} fontFamily={F.mono} fontSize="12" fill="#FFAD33">{String(i + 1).padStart(2, "0")}</text>
              <text x="56" y={y + 25} fontSize="13" fill="#fff">{r}</text>
              <path d={`M308 ${y + 20} H336 L ${i < 3 ? 352 : 352} 185`} fill="none" stroke="#FFAD33" strokeOpacity=".7" strokeWidth="1.4" />
            </g>
          );
        })}
        <circle cx="400" cy="185" r="50" fill="#FFAD33" />
        <text x="400" y="181" textAnchor="middle" fontFamily={F.display} fontSize="20" fontWeight="800" fill="#0F1E2E">Ad</text>
        <text x="400" y="203" textAnchor="middle" fontFamily={F.display} fontSize="20" fontWeight="800" fill="#0F1E2E">Rank</text>
        <path d="M400 240 V326" stroke="#fff" strokeWidth="1.6" />
        <path d="M393 320 l7 8 l7 -8" fill="none" stroke="#fff" strokeWidth="1.6" />
        <text x="396" y="352" textAnchor="middle" fontFamily={F.body} fontSize="13" fontWeight="600" fill="#fff">Whether your ad shows</text>
        <text x="396" y="372" textAnchor="middle" fontFamily={F.body} fontSize="13" fontWeight="600" fill="#fff">and where it shows</text>
        <text x="16" y="408" fontFamily={F.body} fontSize="13" fill="#d6e2f0">Relevant keywords and ads can win a higher position at a lower price.</text>
      </svg>
    </Frame>
  );
}

/** FIG: schematic of the service area (the Google Business Profile service areas) and a default radius ring that spills across state lines. */
export function AreaPlate({ fig }: { fig: number }) {
  const box = (x: number, y: number, w: number, label: string, key: string) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height="52" fill="#fff" stroke="#00366B" strokeWidth="2" />
      <text x={x + w / 2} y={y + 32} textAnchor="middle" fontFamily={F.body} fontSize="17" fontWeight="600" fill="#0F1E2E">{label}</text>
    </g>
  );
  return (
    <Frame fig={fig} kind="Schematic" stamp="Not to scale"
      caption="Our service area as listed on OneAlgorithm's Google Business Profile. The dashed ring is a default 25-mile radius from Center City: it pays for clicks in New Jersey.">
      <svg viewBox="0 0 560 420" role="img" aria-labelledby={`ga${fig}-t ga${fig}-d`}>
        <title id={`ga${fig}-t`}>Schematic of the Philadelphia service area</title>
        <desc id={`ga${fig}-d`}>Five Pennsylvania counties and New Castle County, Delaware, inside the service area. A default radius ring crosses the state line into New Jersey.</desc>
        <defs>
          <pattern id={`ga${fig}-h`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" stroke="#C9D3DF" strokeWidth="2" /></pattern>
        </defs>
        <rect width="560" height="420" fill="#F6F7F9" />
        <g className="ga-par-a" aria-hidden="true"><rect x="440" y="0" width="120" height="420" fill={`url(#ga${fig}-h)`} /></g>
        <text x="500" y="26" textAnchor="middle" fontFamily={F.mono} fontSize="12" fill="#3A4B5E" letterSpacing=".08em">NEW JERSEY</text>
        <g className="ga-par-b" aria-hidden="true"><circle cx="330" cy="200" r="196" fill="none" stroke="#C9D3DF" strokeWidth="1.5" /></g>
        <circle cx="330" cy="200" r="170" fill="none" stroke="#FFAD33" strokeWidth="2.5" strokeDasharray="8 7" />
        {box(150, 70, 130, "Montgomery", "m")}
        {box(300, 56, 110, "Bucks", "b")}
        {box(290, 150, 130, "Philadelphia", "p")}
        {box(20, 170, 120, "Chester", "c")}
        {box(160, 240, 120, "Delaware", "d")}
        {box(270, 316, 150, "New Castle, DE", "n")}
        <circle cx="62" cy="248" r="8" fill="#FFAD33" stroke="#0F1E2E" strokeWidth="2" />
        <text x="24" y="284" fontFamily={F.body} fontSize="15" fontWeight="600" fill="#0F1E2E">Malvern office</text>
        <rect x="440" y="180" width="116" height="62" fill="#fff" stroke="#C9D3DF" />
        <text x="448" y="202" fontFamily={F.body} fontSize="13" fill="#0F1E2E">Default ring:</text>
        <text x="448" y="220" fontFamily={F.body} fontSize="13" fill="#0F1E2E">pays for clicks</text>
        <text x="448" y="236" fontFamily={F.body} fontSize="13" fill="#0F1E2E">across the line</text>
      </svg>
    </Frame>
  );
}

/* ---------------------------------------------------------------------------------------------------------- */

/** FIG: a sample monthly report layout. Labels only, no figures: it shows the order of the page, not results. */
export function ReportPlate({ fig }: { fig: number }) {
  const rows = [
    { h: "Spend", s: "What was spent, and where", w: 250 },
    { h: "Leads counted once", s: "Calls and forms, no double counting", w: 190 },
    { h: "What we changed", s: "Each change, with the reason", w: 300 },
    { h: "What is next", s: "The one change we test next", w: 150 },
  ];
  return (
    <Frame fig={fig} kind="Sample report" stamp="Layout only, no client data"
      caption="The order of a monthly report: spend, leads counted once, what changed, what is next. This is a layout, not a result.">
      <svg viewBox="0 0 480 400" role="img" aria-labelledby={`ga${fig}-t ga${fig}-d`}>
        <title id={`ga${fig}-t`}>Sample monthly report layout</title>
        <desc id={`ga${fig}-d`}>Four labelled blocks in order: spend, leads counted once, what we changed, what is next. No figures are shown.</desc>
        <rect width="480" height="400" fill="#F6F7F9" />
        <g className="ga-par-b" aria-hidden="true"><circle cx="440" cy="40" r="80" fill="none" stroke="#C9D3DF" strokeWidth="1.5" /></g>
        <text x="20" y="30" fontFamily={F.mono} fontSize="12" fill="#5B6B7C" letterSpacing=".08em">MONTHLY REPORT</text>
        <rect x="360" y="14" width="100" height="22" fill="#fff" stroke="#C9D3DF" />
        <text x="410" y="29" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#3A4B5E" letterSpacing=".06em">SAMPLE</text>
        <path d="M20 48 H460" stroke="#00366B" strokeWidth="2" />
        {rows.map((r, i) => {
          const y = 66 + i * 80;
          return (
            <g key={r.h} fontFamily={F.body}>
              <text x="20" y={y + 18} fontSize="17" fontWeight="600" fill="#0F1E2E">{i + 1}. {r.h}</text>
              <text x="20" y={y + 38} fontSize="13" fill="#3A4B5E">{r.s}</text>
              <rect x="20" y={y + 50} width="420" height="10" fill="#E6EBF1" />
              <rect className="ga-bar" x="20" y={y + 50} width={r.w} height="10" fill={i === 1 ? "#FFAD33" : "#00366B"} />
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

const READ = "read 31 October 2026";
const HELP = "Google Ads Help";
export const GOOGLE_SOURCES: SfSource[] = [
  { name: `${HELP}: Ad Rank`, what: "The six factors that decide whether an ad shows", read: READ, page: "https://support.google.com/google-ads/answer/1722122" },
  { name: `${HELP}: Quality Score`, what: "A 1 to 10 diagnostic at keyword level; not an input in the ad auction", read: READ, page: "https://support.google.com/google-ads/answer/6167118" },
  { name: `${HELP}: how the auction works`, what: "Relevant keywords and ads can win a higher position at a lower price", read: READ, page: "https://support.google.com/google-ads/answer/142918" },
  { name: `${HELP}: Performance Max`, what: "A goal-based campaign across YouTube, Display, Search, Discover, Gmail and Maps", read: READ, page: "https://support.google.com/google-ads/answer/10724817" },
  { name: `${HELP}: Partner and Premier Partner`, what: "Requirements for the badges; OneAlgorithm holds neither and does not claim them", read: READ, page: "https://support.google.com/google-ads/answer/9702452" },
  { name: `${HELP}: conversion types`, what: "Website, app, phone call and offline conversions", read: READ, page: "https://support.google.com/google-ads/answer/1722022" },
];
export const PHILLY_SOURCES: SfSource[] = [
  { name: "U.S. Census Bureau, County Business Patterns 2023", what: "Philadelphia County: 29,460 establishments; 24,751 (84.0%) have fewer than 20 employees", read: READ, page: "https://www2.census.gov/programs-surveys/cbp/datasets/2023/cbp23co.zip" },
  { name: `${HELP}: conversion types`, what: "Calls from ads, calls to a number on your site, taps on a mobile number", read: READ, page: "https://support.google.com/google-ads/answer/1722022" },
  { name: "OneAlgorithm's Google Business Profile", what: "Service areas: Philadelphia, Bucks, Chester, Delaware and Montgomery counties, PA; New Castle County, DE", read: "read 9 October 2026 through Google's Business Profile API" },
];

/** The ONE consolidated sources dialog of a page. Open it with <Verify id="sources">Sources</Verify>. */
export function GaSources({ sources }: { sources: SfSource[] }) {
  return (
    <SourcesDialog
      id="sources"
      title="Sources for this page"
      intro="Google's Help pages show no last-updated date, only a 2026 footer, so the date a person at OneAlgorithm read each one is the only date we can give."
      sources={sources}
    />
  );
}
