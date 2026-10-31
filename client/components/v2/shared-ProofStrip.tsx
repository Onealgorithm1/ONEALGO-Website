import * as React from "react";
import { Link } from "react-router-dom";
import { EvidenceDialog, Verify, AppExchangeEvidence } from "../sf/EvidenceDialog";

/* Proof strip. Place inside <SfPage> (the evidence pop-ups are wired on the .sfv2 root). One strip per page.
 *   <ProofStrip variant="seo" />
 * variant: "all" (default) | "seo" (Phantom, reviews, team) | "salesforce" (partner, reviews, team) | "local" (reviews, team) */
type Item = "phantom" | "reviews" | "partner" | "team";
const SETS: Record<string, Item[]> = {
  all: ["phantom", "reviews", "partner", "team"],
  seo: ["phantom", "reviews", "team"],
  salesforce: ["partner", "reviews", "team"],
  local: ["reviews", "team"],
};
const CSS = `
.sfv2 .ps{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px;margin:0;padding:0;list-style:none}
.sfv2 .ps>li{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:20px;background:var(--surface);border:1px solid var(--hair-s);transition:transform .25s var(--arrive),box-shadow .25s var(--arrive),border-color .25s}
.sfv2 .ps-big{font-weight:600;font-size:24px;line-height:1.15;color:var(--navy)}
.sfv2 .ps p{margin:0}
.sfv2 .ps-bars{display:grid;gap:6px;margin-top:6px;width:100%}
.sfv2 .ps-bar{display:grid;grid-template-columns:minmax(0,1fr) 48px;align-items:center;gap:8px;font:500 12px/1 var(--mono)}
.sfv2 .ps-bar i{display:block;height:10px;background:var(--navy)}
.sfv2 .ps-bar:nth-child(2) i{background:var(--orange-text)}
.sfv2 .ps a.ps-link{min-height:44px;display:inline-flex;align-items:center}
@media (hover:hover){.sfv2 .ps>li:hover{transform:translateY(-4px);box-shadow:0 14px 30px -18px rgba(0,54,107,.4);border-color:var(--navy)}}
@media (prefers-reduced-motion:reduce){.sfv2 .ps>li{transition:none}.sfv2 .ps>li:hover{transform:none}}
`;

export function ProofStrip({ variant = "all", className = "" }: { variant?: "all" | "seo" | "salesforce" | "local"; className?: string }) {
  const items = SETS[variant] ?? SETS.all;
  const has = (i: Item) => items.includes(i);
  return (
    <div className={className}>
      <style>{CSS}</style>
      <ul className="ps" aria-label="Proof">
        {has("phantom") && (
          <li>
            <p className="sf-kicker">Phantom Arcades, Search Console</p>
            <p className="ps-big">+92% clicks</p>
            <div className="ps-bars" role="img" aria-label="Bar chart: clicks up 92 percent, non-brand clicks up 231 percent">
              <div className="ps-bar"><i style={{ width: `${(92 / 231) * 100}%` }} /><span>+92%</span></div>
              <div className="ps-bar"><i style={{ width: "100%" }} /><span>+231%</span></div>
            </div>
            <p className="sf-mono">Clicks / non-brand clicks</p>
            <Link className="sf-link ps-link" to="/blog/seo-case-study-phantom-arcades">Read the case study</Link>
          </li>
        )}
        {has("reviews") && (
          <li>
            <p className="ps-big">5.0 from 6 Google reviews</p>
            <p>Our Google Business Profile.</p>
            <Verify id="reviews">Verify</Verify>
          </li>
        )}
        {has("partner") && (
          <li>
            <p className="ps-big">Select Salesforce Consulting Partner</p>
            <p>Listed on the Salesforce AppExchange.</p>
            <Verify id="appexchange">Verify</Verify>
          </li>
        )}
        {has("team") && (
          <li>
            <p className="ps-big">Four of us, Malvern PA</p>
            <p>The people you talk to are the people who do the work.</p>
          </li>
        )}
      </ul>
      {has("reviews") && (
        <EvidenceDialog
          id="reviews"
          title="Our Google reviews"
          intro="What our Google Business Profile showed when a person at OneAlgorithm read it."
          rows={[
            { th: "Business", td: "OneAlgorithm Consulting, Chester County" },
            { th: "Rating", td: "5.0" },
            { th: "Reviews", td: "6" },
            { th: "Read", td: "October 31, 2026" },
          ]}
        />
      )}
      {has("partner") && <AppExchangeEvidence />}
    </div>
  );
}
