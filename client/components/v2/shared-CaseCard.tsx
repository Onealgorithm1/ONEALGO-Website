import * as React from "react";
import { Link } from "react-router-dom";

/* Project / case card. Pass `result` only when sourced.
 *   <CaseCard title="Phantom Arcades" built="New site and local SEO" result="+92% clicks (Search Console)" to="/blog/seo-case-study-phantom-arcades" /> */
const CSS = `
.sfv2 .cc{position:relative;display:flex;flex-direction:column;gap:10px;padding:24px;background:var(--surface);color:var(--ink);border:1px solid var(--hair-s);transition:transform .25s var(--arrive),box-shadow .25s var(--arrive),border-color .25s}
.sfv2 .cc::before{content:"";position:absolute;left:20px;right:20px;top:-1px;height:3px;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .4s var(--draw)}
.sfv2 .cc h3{margin:0;font-size:20px}.sfv2 .cc p{margin:0}
/* 2026-11-01: a white card inside a night band kept the band's light text (axe 1.29:1); the card sets its own ink. */
.sfv2 .sf-night .cc p,.sfv2 .sf-night .cc .sf-h3{color:var(--ink)}.sfv2 .sf-night .cc .sf-link{color:var(--navy)}
.sfv2 .cc-res{font-weight:600;color:var(--ink)}
.sfv2 .cc-go{margin-top:auto;min-height:44px;display:inline-flex;align-items:center}
@media (hover:hover){.sfv2 .cc:hover{transform:translateY(-6px);box-shadow:0 18px 36px -18px rgba(0,54,107,.4);border-color:var(--navy)}.sfv2 .cc:hover::before{transform:none}}
.sfv2 .cc:focus-within{border-color:var(--navy)}.sfv2 .cc:focus-within::before{transform:none}
@media (prefers-reduced-motion:reduce){.sfv2 .cc,.sfv2 .cc::before{transition:none}.sfv2 .cc:hover{transform:none}}
`;

export function CaseCard({ title, built, result, to, linkLabel = "Read the case" }: { title: string; built: string; result?: string; to?: string; linkLabel?: string }) {
  return (
    <article className="cc">
      <style>{CSS}</style>
      <h3 className="sf-h3">{title}</h3>
      <p>{built}</p>
      {result && <p className="cc-res">{result}</p>}
      {to && <Link className="sf-link cc-go" to={to}>{linkLabel}</Link>}
    </article>
  );
}
