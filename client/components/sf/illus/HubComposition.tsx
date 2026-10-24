import * as React from "react";
import type { IllusProps } from "./types";

/**
 * One org, three views (the layered desk) (redesign-v2/illustrations.md, "hub-composition"). Staged scene with SAMPLE data for the fictional
 * Example Manufacturing Co.: never a screenshot of any org. Markup, CSS and choreography are the approved source
 * (illustrations/src/hub-composition) converted to JSX; behaviour lives in ./runtime.ts, styles in client/styles/sf.css.
 * Without JS, or with reduced motion, the figure is its finished static self.
 *   <HubComposition fig={1} />                      // below the fold: plays once on entry
 *   <HubComposition fig={1} hero className="sf-hero-fig" />  // hero: dealt by CSS 250ms after first paint, counters off
 */
export function HubComposition({ fig, hero, className = "" }: IllusProps) {
  return (
    <figure className={`illus hub${hero ? " js in" : ""} ${className}`} style={hero ? ({ "--t0": ".25s" } as React.CSSProperties) : undefined} data-illus="hub-composition" data-duration="2600" data-w="800" aria-labelledby="hub-cap" aria-describedby="hub-note" tabIndex={0} data-counters={hero ? "off" : undefined}>

      <div className="scene">
        <header className="scene-head">
          <div>
            <p className="scene-kicker">One org · three views from the same week</p>
            <p className="scene-org">Example Manufacturing Co. · health check, order sync, managed services</p>
          </div>
          <span className="sample">Sample data</span>
        </header>
        <div className="hub-stack">
          <div className="hub-group">
            <article className="hub-card" style={{ "--z": "0", "--d": ".1s" } as React.CSSProperties} aria-label="Managed services, this week">
              <div className="hub-in rise" style={{ "--d": ".1s" } as React.CSSProperties}>
                <p className="hub-k">Managed services · This week</p>
                <ul className="mw-stats hub-stats">
                  <li className="mw-stat rule-draw" style={{ "--d": ".5s" } as React.CSSProperties}><p className="mw-num"><span className="num" data-count="23">23</span></p><p className="mw-lab">tickets closed</p></li>
                  <li className="mw-stat rule-draw" style={{ "--d": ".58s" } as React.CSSProperties}><p className="mw-num"><span className="num" data-count="7">7</span></p><p className="mw-lab">fields added</p></li>
                  <li className="mw-stat rule-draw" style={{ "--d": ".66s" } as React.CSSProperties}><p className="mw-num"><span className="num" data-count="4">4</span></p><p className="mw-lab">flows updated</p></li>
                  <li className="mw-stat rule-draw" style={{ "--d": ".74s" } as React.CSSProperties}><p className="mw-num"><span className="num" data-count="2">2</span></p><p className="mw-lab">release checks</p></li>
                </ul>
                <p className="hub-s">Weekly summary · 14.5 hours, each logged</p>
              </div>
            </article>
            <article className="hub-card" style={{ "--z": "1", "--d": ".25s" } as React.CSSProperties} aria-label="Order sync, SAP and Salesforce">
              <div className="hub-in rise" style={{ "--d": ".25s" } as React.CSSProperties}>
                <p className="hub-k">Order sync · SAP ↔ Salesforce · <b>0 errors</b> · last 09:42:07</p>
                <ol className="ss-lanes hub-lanes" aria-label="Objects kept in sync">
                  <li className="ss-lane" data-dir="sf"><p className="ss-obj"><b>Customer master</b> → Account</p><p className="ss-count mono"><span className="num" data-count="312">312</span> updated</p><svg className="ss-wire wipe" style={{ "--d": ".7s" } as React.CSSProperties} viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path className="ss-path" d="M0 8H200"/><path className="ss-path ss-hot" d="M0 8H200"/><g className="ss-pkt" style={{ "--d": "1.15s" } as React.CSSProperties}><rect x="0" y="3" width="6" height="10"/></g></svg></li>
                  <li className="ss-lane" data-dir="sap"><p className="ss-obj"><b>Sales order</b> ← Order</p><p className="ss-count mono"><span className="num" data-count="1284">1,284</span> sent</p><svg className="ss-wire wipe" style={{ "--d": ".8s" } as React.CSSProperties} viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path className="ss-path" d="M0 8H200"/><path className="ss-path ss-hot" d="M0 8H200"/><g className="ss-pkt" style={{ "--d": "1.3s" } as React.CSSProperties}><rect x="0" y="3" width="6" height="10"/></g></svg></li>
                  <li className="ss-lane" data-dir="sf"><p className="ss-obj"><b>Delivery status</b> → Order status</p><p className="ss-count mono"><span className="num" data-count="940">940</span> confirmed</p><svg className="ss-wire wipe" style={{ "--d": ".9s" } as React.CSSProperties} viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path className="ss-path" d="M0 8H200"/><path className="ss-path ss-hot" d="M0 8H200"/><g className="ss-pkt" style={{ "--d": "1.45s" } as React.CSSProperties}><rect x="0" y="3" width="6" height="10"/></g></svg></li>
                </ol>
              </div>
            </article>
            <article className="hub-card" style={{ "--z": "2", "--d": ".4s" } as React.CSSProperties} aria-label="Health check, week 1, top three findings">
              <div className="hub-in rise" style={{ "--d": ".4s" } as React.CSSProperties}>
                <p className="hub-k">Health check · Week 1 · top 3 of 5 findings</p>
                <ol className="hc-rows hub-rows" aria-label="Findings, ranked">
                  <li className="hc-row slide" style={{ "--d": ".8s" } as React.CSSProperties}><span className="hc-rank mono" aria-hidden="true">1</span><div className="hc-body"><p className="hc-find"><b className="hc-n">2</b> admins without MFA</p></div><span className="chip chip-crit stamp-in" style={{ "--d": "1.1s" } as React.CSSProperties}>Critical</span></li>
                  <li className="hc-row slide" style={{ "--d": ".89s" } as React.CSSProperties}><span className="hc-rank mono" aria-hidden="true">2</span><div className="hc-body"><p className="hc-find"><b className="hc-n">3</b> profiles with Modify All Data</p></div><span className="chip chip-high stamp-in" style={{ "--d": "1.19s" } as React.CSSProperties}>High</span></li>
                  <li className="hc-row slide" style={{ "--d": ".98s" } as React.CSSProperties}><span className="hc-rank mono" aria-hidden="true">3</span><div className="hc-body"><p className="hc-find"><b className="hc-n">12</b> Workflow Rules still active</p></div><span className="chip chip-high stamp-in" style={{ "--d": "1.28s" } as React.CSSProperties}>High</span></li>
                </ol>
                <p className="hub-s">Ranked by what to fix first · the written list is yours to keep</p>
              </div>
            </article>
          </div>
        </div>
        <p id="hub-note" className="hub-note">Hover or focus the figure to spread the three cards.</p>
      </div>
      <span className="ticks" aria-hidden="true"></span>
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Staged scene · Sample data, not a client org</span><span>OneAlgorithm</span></div>
      <figcaption id="hub-cap" className="cap">Illustration with sample data. The three things an ops leader gets from us in one week, laid on the same desk: the ranked findings, the sync that runs, the hours that were worked.</figcaption>

    </figure>
  );
}
