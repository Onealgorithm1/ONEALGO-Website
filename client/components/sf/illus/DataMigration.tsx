import * as React from "react";
import type { IllusProps } from "./types";

/**
 * Field mapping and reconciliation (redesign-v2/illustrations.md, "data-migration"). Staged scene with SAMPLE data for the fictional
 * Example Manufacturing Co.: never a screenshot of any org. Markup, CSS and choreography are the approved source
 * (illustrations/src/data-migration) converted to JSX; behaviour lives in ./runtime.ts, styles in client/styles/sf.css.
 * Without JS, or with reduced motion, the figure is its finished static self.
 *   <DataMigration fig={1} />                      // below the fold: plays once on entry
 *   <DataMigration fig={1} hero className="sf-hero-fig" />  // hero: dealt by CSS 250ms after first paint, counters off
 */
export function DataMigration({ fig, hero, className = "" }: IllusProps) {
  return (
    <figure className={`illus dm${hero ? " js in" : ""} ${className}`} style={hero ? ({ "--t0": ".25s" } as React.CSSProperties) : undefined} data-illus="data-migration" data-duration="2700" data-w="720" aria-labelledby="dm-cap" data-counters={hero ? "off" : undefined}>

      <div className="scene">
        <header className="scene-head">
          <div>
            <p className="scene-kicker">Data migration · Legacy CRM → Salesforce</p>
            <p className="scene-org">Example Manufacturing Co. · Account object · <b>5 fields</b> mapped, loaded, reconciled</p>
          </div>
          <span className="sample">Sample data</span>
        </header>
        <div className="dm-cols" aria-hidden="true"><span>Legacy field</span><span></span><span>Salesforce field</span><span>Rule</span></div>
        <ol className="dm-rows" aria-label="Field mapping">
          <li className="dm-row rise" style={{ "--d": ".1s" } as React.CSSProperties}>
            <code className="dm-src">cust_no</code>
            <svg className="dm-link wipe" style={{ "--d": ".35s" } as React.CSSProperties} viewBox="0 0 60 16" preserveAspectRatio="none" aria-hidden="true"><path className="dm-path" d="M2 8H52"/><path className="dm-path dm-hot" d="M2 8H52"/><path className="dm-head stamp-in" style={{ "--d": ".72s" } as React.CSSProperties} d="M47 3l6 5-6 5" vectorEffect="non-scaling-stroke"/></svg>
            <code className="dm-dst">Account.AccountNumber</code>
            <span className="dm-rule">external ID · dedupe key</span>
          </li>
          <li className="dm-row rise" style={{ "--d": ".2s" } as React.CSSProperties}>
            <code className="dm-src">cust_name</code>
            <svg className="dm-link wipe" style={{ "--d": ".45s" } as React.CSSProperties} viewBox="0 0 60 16" preserveAspectRatio="none" aria-hidden="true"><path className="dm-path" d="M2 8H52"/><path className="dm-path dm-hot" d="M2 8H52"/><path className="dm-head stamp-in" style={{ "--d": ".82s" } as React.CSSProperties} d="M47 3l6 5-6 5" vectorEffect="non-scaling-stroke"/></svg>
            <code className="dm-dst">Account.Name</code>
            <span className="dm-rule">trimmed · legal name kept</span>
          </li>
          <li className="dm-row rise" style={{ "--d": ".3s" } as React.CSSProperties}>
            <code className="dm-src">region_cd</code>
            <svg className="dm-link wipe" style={{ "--d": ".55s" } as React.CSSProperties} viewBox="0 0 60 16" preserveAspectRatio="none" aria-hidden="true"><path className="dm-path" d="M2 8H52"/><path className="dm-path dm-hot" d="M2 8H52"/><path className="dm-head stamp-in" style={{ "--d": ".92s" } as React.CSSProperties} d="M47 3l6 5-6 5" vectorEffect="non-scaling-stroke"/></svg>
            <code className="dm-dst">Account.Region__c</code>
            <span className="dm-rule">picklist · 6 codes mapped</span>
          </li>
          <li className="dm-row rise" style={{ "--d": ".4s" } as React.CSSProperties}>
            <code className="dm-src">credit_lim</code>
            <svg className="dm-link wipe" style={{ "--d": ".65s" } as React.CSSProperties} viewBox="0 0 60 16" preserveAspectRatio="none" aria-hidden="true"><path className="dm-path" d="M2 8H52"/><path className="dm-path dm-hot" d="M2 8H52"/><path className="dm-head stamp-in" style={{ "--d": "1.02s" } as React.CSSProperties} d="M47 3l6 5-6 5" vectorEffect="non-scaling-stroke"/></svg>
            <code className="dm-dst">Account.CreditLimit__c</code>
            <span className="dm-rule">currency · 2 decimals</span>
          </li>
          <li className="dm-row rise" style={{ "--d": ".5s" } as React.CSSProperties}>
            <code className="dm-src">rep_id</code>
            <svg className="dm-link wipe" style={{ "--d": ".75s" } as React.CSSProperties} viewBox="0 0 60 16" preserveAspectRatio="none" aria-hidden="true"><path className="dm-path" d="M2 8H52"/><path className="dm-path dm-hot" d="M2 8H52"/><path className="dm-head stamp-in" style={{ "--d": "1.12s" } as React.CSSProperties} d="M47 3l6 5-6 5" vectorEffect="non-scaling-stroke"/></svg>
            <code className="dm-dst">Account.OwnerId</code>
            <span className="dm-rule">lookup to User · 14 reps matched</span>
          </li>
        </ol>
        <div className="dm-recon">
          <p className="dm-kicker rise" style={{ "--d": "1.05s" } as React.CSSProperties}>Reconciliation · after load</p>
          <div className="dm-bar-row rise" style={{ "--d": "1.1s" } as React.CSSProperties}>
            <span className="dm-obj">Accounts</span>
            <div className="dm-bar" role="img" aria-label="18,420 of 18,420 accounts matched"><span className="dm-fill" style={{ "--d": "1.25s" } as React.CSSProperties}></span></div>
            <p className="dm-count mono"><span className="num" data-count="18420">18,420</span> / 18,420 matched</p>
            <svg className="tickmark" viewBox="0 0 18 18" aria-hidden="true"><path className="draw" style={{ "--d": "2.2s" } as React.CSSProperties} d="M3 9.5l4.5 4.5L15 5" pathLength="1"/></svg>
          </div>
          <p className="dm-note rise" style={{ "--d": "1.15s" } as React.CSSProperties}>Record counts and totals agree on both sides before go-live. Next objects: Contacts, Opportunities.</p>
        </div>
      </div>
      <span className="ticks" aria-hidden="true"></span>
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Staged scene · Sample data, not a client org</span><span>OneAlgorithm</span></div>
      <figcaption id="dm-cap" className="cap">Illustration with sample data. Each legacy field is mapped with its rule, then every loaded record is counted against the source until the totals match.</figcaption>

    </figure>
  );
}
