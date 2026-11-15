import * as React from "react";
import { useLocation } from "react-router-dom";
import { SfButton } from "../sf/SfPage";
import { SF_PHONE } from "../../data/salesforceShared";
import { offerFor } from "./shared-offers";

/* Mid-page CTA band (sf night look). Place inside <SfPage>. Defaults come from shared-offers for the current route.
 *   <OfferBand />   or   <OfferBand heading="Not sure what is wrong?" line="One sentence." label="Button text" /> */
const CSS = `
.sfv2 .ob{padding:44px 0}
.sfv2 .ob-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 40px}
.sfv2 .ob-copy{flex:1 1 360px;min-width:0}
.sfv2 .ob-copy .sf-h3{margin:0}
.sfv2 .ob-copy p{margin:8px 0 0}
.sfv2 .ob-act{display:flex;flex-wrap:wrap;align-items:center;gap:14px 24px}
.sfv2 .ob-tel{font:500 18px/1 var(--mono);color:#fff;min-height:44px;display:inline-flex;align-items:center;text-decoration:underline;text-decoration-color:rgba(255,255,255,.3);text-underline-offset:.25em;transition:text-decoration-color .2s,color .2s}
@media (hover:hover){.sfv2 .ob-tel:hover{color:var(--orange);text-decoration-color:var(--orange)}.sfv2 .ob .sf-btn{transition:transform .2s,box-shadow .2s}.sfv2 .ob .sf-btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px -10px rgba(0,0,0,.6)}}
@media (prefers-reduced-motion:reduce){.sfv2 .ob .sf-btn,.sfv2 .ob-tel{transition:none}.sfv2 .ob .sf-btn:hover{transform:none}}
`;

export function OfferBand({ heading, line, label, className = "" }: { heading?: string; line?: string; label?: string; className?: string }) {
  const { pathname } = useLocation();
  const offer = offerFor(pathname);
  return (
    <section className={`sf-section sf-night ob ${className}`} aria-label="Contact us">
      <style>{CSS}</style>
      <div className="sf-wrap ob-in">
        <div className="ob-copy">
          <h2 className="sf-h3">{heading ?? offer.label}</h2>
          <p className="sf-measure">{line ?? offer.sub}</p>
        </div>
        <div className="ob-act">
          <SfButton to={offer.href} cta="band" magnet>{label ?? offer.label}</SfButton>
          <a className="ob-tel" href={SF_PHONE.href} data-cta="band">{SF_PHONE.display}</a>
        </div>
      </div>
    </section>
  );
}
