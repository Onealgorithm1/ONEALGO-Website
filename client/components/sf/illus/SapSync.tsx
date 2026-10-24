import * as React from "react";
import type { IllusProps } from "./types";

/**
 * SAP ↔ Salesforce order sync (redesign-v2/illustrations.md, "sap-sync"). Staged scene with SAMPLE data for the fictional
 * Example Manufacturing Co.: never a screenshot of any org. Markup, CSS and choreography are the approved source
 * (illustrations/src/sap-sync) converted to JSX; behaviour lives in ./runtime.ts, styles in client/styles/sf.css.
 * Without JS, or with reduced motion, the figure is its finished static self.
 *   <SapSync fig={1} />                      // below the fold: plays once on entry
 *   <SapSync fig={1} hero className="sf-hero-fig" />  // hero: dealt by CSS 250ms after first paint, counters off
 */
export function SapSync({ fig, hero, className = "" }: IllusProps) {
  return (
    <figure className={`illus ss${hero ? " js in" : ""} ${className}`} style={hero ? ({ "--t0": ".25s" } as React.CSSProperties) : undefined} data-illus="sap-sync" data-duration="2700" data-w="720" aria-labelledby="ss-cap" data-counters={hero ? "off" : undefined}>

      <div className="scene">
        <header className="scene-head">
          <div>
            <p className="scene-kicker">Order sync · SAP ↔ Salesforce</p>
            <p className="scene-org">Example Manufacturing Co. · every 5 minutes · today · last sync <b className="mono">09:42:07</b> · <b>0 errors</b></p>
          </div>
          <span className="sample">Sample data</span>
        </header>
        <div className="ss-panel">
          <div className="ss-sys ss-sap rise" style={{ "--d": ".05s" } as React.CSSProperties}><p className="ss-name">SAP</p><p className="ss-sub">ERP · S/4HANA</p></div>
          <ol className="ss-lanes" aria-label="Objects kept in sync">
            <li className="ss-lane" data-dir="sf" style={{ "--i": "0" } as React.CSSProperties}>
              <p className="ss-obj rise" style={{ "--d": ".25s" } as React.CSSProperties}><b>Customer master</b> → Account</p>
              <p className="ss-count mono rise" style={{ "--d": ".3s" } as React.CSSProperties}><span className="num" data-count="312">312</span> updated</p>
              <svg className="ss-wire wipe" style={{ "--d": ".4s" } as React.CSSProperties} viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path className="ss-path" d="M0 8H200"/><path className="ss-path ss-hot" d="M0 8H200"/><g className="ss-pkt" style={{ "--d": ".95s" } as React.CSSProperties}><rect x="0" y="3" width="6" height="10"/></g></svg>
            </li>
            <li className="ss-lane" data-dir="sap" style={{ "--i": "1" } as React.CSSProperties}>
              <p className="ss-obj rise" style={{ "--d": ".4s" } as React.CSSProperties}><b>Sales order</b> ← Order</p>
              <p className="ss-count mono rise" style={{ "--d": ".45s" } as React.CSSProperties}><span className="num" data-count="1284">1,284</span> sent</p>
              <svg className="ss-wire wipe" style={{ "--d": ".55s" } as React.CSSProperties} viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path className="ss-path" d="M0 8H200"/><path className="ss-path ss-hot" d="M0 8H200"/><g className="ss-pkt" style={{ "--d": "1.1s" } as React.CSSProperties}><rect x="0" y="3" width="6" height="10"/></g></svg>
            </li>
            <li className="ss-lane" data-dir="sf" style={{ "--i": "2" } as React.CSSProperties}>
              <p className="ss-obj rise" style={{ "--d": ".55s" } as React.CSSProperties}><b>Delivery status</b> → Order status</p>
              <p className="ss-count mono rise" style={{ "--d": ".6s" } as React.CSSProperties}><span className="num" data-count="940">940</span> confirmed</p>
              <svg className="ss-wire wipe" style={{ "--d": ".7s" } as React.CSSProperties} viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path className="ss-path" d="M0 8H200"/><path className="ss-path ss-hot" d="M0 8H200"/><g className="ss-pkt" style={{ "--d": "1.25s" } as React.CSSProperties}><rect x="0" y="3" width="6" height="10"/></g></svg>
            </li>
          </ol>
          <div className="ss-sys ss-sf rise" style={{ "--d": ".05s" } as React.CSSProperties}><p className="ss-name">Salesforce</p><p className="ss-sub">Sales Cloud</p></div>
        </div>
        <footer className="ss-foot rise" style={{ "--d": "2.05s" } as React.CSSProperties}>
          <svg className="tickmark" viewBox="0 0 18 18" aria-hidden="true"><path className="draw" style={{ "--d": "2.2s" } as React.CSSProperties} d="M3 9.5l4.5 4.5L15 5" pathLength="1"/></svg>
          <p><b>3 objects in sync</b> · field-level log on every record · a failed record retries, then alerts the admin</p>
        </footer>
      </div>
      <span className="ticks" aria-hidden="true"></span>
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Staged scene · Sample data, not a client org</span><span>OneAlgorithm</span></div>
      <figcaption id="ss-cap" className="cap">Illustration with sample data. Customer master and delivery status flow from SAP into Salesforce; orders flow back. Each object has a count, a time and a log.</figcaption>

    </figure>
  );
}
