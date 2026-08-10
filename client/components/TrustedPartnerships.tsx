import React from "react";

/**
 * Footer platform marquee.
 *
 * The previous version scrolled 18 chunky filled chips - rounded boxes on a
 * blue ground, each with its own hover-scale. At that weight a row of boxed
 * company names reads as a client logo wall, which is why a disclaimer sits
 * further down the footer. This version keeps the motion and drops the weight:
 * plain type on the footer ground, hairline diamond separators, edge fade
 * rather than a hard cut, and it pauses on hover so a name can be read.
 *
 * These are platforms we work across, not clients - hence the label.
 *
 * Note for anyone tempted by public/media/logos/: those 19 SVGs are
 * PLACEHOLDERS, not real brand assets - their own README.txt says so. Shipping
 * them would put fake Salesforce, Oracle and Microsoft marks on the site.
 */
const PLATFORMS = [
  "Salesforce",
  "Oracle",
  "ServiceNow",
  "Microsoft",
  "MS Dynamics",
  "MuleSoft",
  "Zendesk",
  "HubSpot",
  "Zoho",
  "Zapier",
  "Monday",
  "Twilio",
  "Aircall",
  "QuickBooks",
  "DocuSign",
  "OneFlow",
  "Hootsuite",
  "Metricool",
];

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={ariaHidden || undefined}
    >
      {PLATFORMS.map((platform) => (
        <li
          key={platform}
          className="flex shrink-0 items-center gap-8 whitespace-nowrap text-sm text-oa-nightInk2"
        >
          {platform}
          <span className="text-oa-nightInk3/50" aria-hidden="true">
            &#9670;
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function TrustedPartnerships() {
  return (
    <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:gap-8">
      <p className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-oa-nightInk3">
        Experts across leading platforms
      </p>

      <div className="marquee relative min-w-0 flex-1 overflow-hidden">
        <div className="marquee-track flex w-max">
          <Row />
          {/* Duplicate set so the -50% translate loops seamlessly. Hidden from
              assistive tech so the list is not announced twice. */}
          <Row ariaHidden />
        </div>
      </div>
    </div>
  );
}
