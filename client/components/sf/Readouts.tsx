import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Verify, AppExchangeEvidence } from "./EvidenceDialog";
import {
  SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_DELIVERED, SF_LISTING_ID, SF_PLATFORM_CERTS, SF_VERIFIED_ON,
} from "../../data/salesforceProof";

export type Readout = {
  /** The figure. In the HTML as the final value; counts up once from zero below the fold (GSAP, motion allowed). */
  value: number;
  label: React.ReactNode;
  /** Source line (mono). Put a <Verify id="…"/> in it for the pop-up. */
  source: React.ReactNode;
};

const shortDate = new Date(`${SF_VERIFIED_ON}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }); // "23 Oct 2026"

/** The AppExchange trio: 16 people / 53 certifications / 38 Platform, with the as-of date and Verify. */
export const APPEXCHANGE_READOUTS: Readout[] = [
  { value: SF_CERTIFIED_PEOPLE, label: "Salesforce-certified people", source: <>AppExchange listing {SF_LISTING_ID} · read {shortDate}</> },
  { value: SF_CERTIFICATIONS, label: "Salesforce certifications", source: <>Salesforce's figure, not ours · <Verify id="appexchange" /></> },
  { value: SF_PLATFORM_CERTS, label: "On the Platform competency", source: <>Flow, permissions, integration work</> },
];

/**
 * Registry readouts (signature 3): display numerals with tabular spacing, a label, a source line and Verify.
 *   <Readouts />                                  // the AppExchange trio + its evidence dialog
 *   <Readouts items={[…]} withEvidence={false} />  // custom figures (city market readouts + a SourcesDialog of your own)
 * Figures are in the HTML as their final value (SEO, no-JS, reduced motion); below the fold they count up once.
 */
export function Readouts({ items = APPEXCHANGE_READOUTS, withEvidence = true, className = "" }: { items?: Readout[]; withEvidence?: boolean; className?: string }) {
  return (
    <>
      <div className={`sf-readouts ${className}`}>
        {items.map((r, i) => (
          <div className="sf-readout" key={i}>
            <span className="sf-readout-num" data-count={r.value}>{r.value.toLocaleString("en-US")}</span>
            <p className="sf-readout-lab">{r.label}</p>
            <p className="sf-readout-src sf-mono">{r.source}</p>
          </div>
        ))}
      </div>
      {withEvidence && <AppExchangeEvidence />}
    </>
  );
}

/**
 * Delivered work as ledger rows (H3 each; the approved patterns only, clients unnamed). Each row links to the
 * service page that owns the pattern; hover draws the top hairline and tints the row.
 *   <DeliveredLedger />
 */
const sentenceCase = (tag: string) => tag.toLowerCase().replace(/^\w|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/g, (c) => c[0].toUpperCase() + c.slice(1));

export function DeliveredLedger({ className = "" }: { className?: string }) {
  const { pathname } = useLocation(); // the row owned by this page is not a link to itself
  return (
    <div className={`sf-ledger ${className}`}>
      {SF_DELIVERED.map((d) => {
        const inner = <><h3 className="sf-h4">{d.text}</h3><span className="sf-mono">{sentenceCase(d.tag)}</span></>;
        return d.to === pathname.replace(/\/$/, "")
          ? <div key={d.id} className="sf-lrow" aria-current="page">{inner}</div>
          : <Link key={d.id} className="sf-lrow" to={d.to}>{inner}</Link>;
      })}
    </div>
  );
}
