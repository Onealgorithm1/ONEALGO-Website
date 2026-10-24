import * as React from "react";
import type { IllusProps } from "./types";

/**
 * Marketing Cloud journey, simplified (redesign-v2/illustrations.md, "mc-journey"). Staged scene with SAMPLE data for the fictional
 * Example Manufacturing Co.: never a screenshot of any org. Markup, CSS and choreography are the approved source
 * (illustrations/src/mc-journey) converted to JSX; behaviour lives in ./runtime.ts, styles in client/styles/sf.css.
 * Without JS, or with reduced motion, the figure is its finished static self.
 *   <McJourney fig={1} />                      // below the fold: plays once on entry
 *   <McJourney fig={1} hero className="sf-hero-fig" />  // hero: dealt by CSS 250ms after first paint, counters off
 */
export function McJourney({ fig, hero, className = "" }: IllusProps) {
  return (
    <figure className={`illus mc${hero ? " js in" : ""} ${className}`} style={hero ? ({ "--t0": ".25s" } as React.CSSProperties) : undefined} data-illus="mc-journey" data-duration="3100" data-w="1000" aria-labelledby="mc-cap" data-counters={hero ? "off" : undefined}>

      <div className="scene">
        <header className="scene-head">
          <div>
            <p className="scene-kicker">Marketing Cloud · Journey, simplified</p>
            <p className="scene-org">Example Manufacturing Co. · “Quote follow-up” · entry from a Salesforce Opportunity, exit to the owner</p>
          </div>
          <span className="sample">Sample data</span>
        </header>
        <ol className="mc-flow" aria-label="Journey steps">
          <li className="mc-node mc-entry rise" style={{ "--d": ".1s" } as React.CSSProperties}><span className="mc-k">Entry</span><p className="mc-t">Quote requested</p><p className="mc-s">Contact added when the Opportunity reaches “Quote sent”</p></li>
          <li className="mc-link" style={{ "--d": ".35s" } as React.CSSProperties} aria-hidden="true"><svg className="mc-h wipe" style={{ "--d": ".35s" } as React.CSSProperties} viewBox="0 0 40 20" preserveAspectRatio="none"><path className="mc-path" d="M0 10H40"/></svg><svg className="mc-v wipe-v" style={{ "--d": ".35s" } as React.CSSProperties} viewBox="0 0 20 30" preserveAspectRatio="none"><path className="mc-path" d="M10 0V30"/></svg></li>
          <li className="mc-node rise" style={{ "--d": ".7s" } as React.CSSProperties}><span className="mc-k">Email 1</span><p className="mc-t">Your quote, and what happens next</p><p className="mc-s">Sent within 10 minutes</p></li>
          <li className="mc-link" style={{ "--d": ".95s" } as React.CSSProperties} aria-hidden="true"><svg className="mc-h wipe" style={{ "--d": ".95s" } as React.CSSProperties} viewBox="0 0 40 20" preserveAspectRatio="none"><path className="mc-path" d="M0 10H40"/></svg><svg className="mc-v wipe-v" style={{ "--d": ".95s" } as React.CSSProperties} viewBox="0 0 20 30" preserveAspectRatio="none"><path className="mc-path" d="M10 0V30"/></svg></li>
          <li className="mc-node mc-wait rise" style={{ "--d": "1.3s" } as React.CSSProperties}><span className="mc-k">Wait</span><p className="mc-t">3 days</p></li>
          <li className="mc-link" style={{ "--d": "1.55s" } as React.CSSProperties} aria-hidden="true"><svg className="mc-h wipe" style={{ "--d": "1.55s" } as React.CSSProperties} viewBox="0 0 40 20" preserveAspectRatio="none"><path className="mc-path" d="M0 10H40"/></svg><svg className="mc-v wipe-v" style={{ "--d": "1.55s" } as React.CSSProperties} viewBox="0 0 20 30" preserveAspectRatio="none"><path className="mc-path" d="M10 0V30"/></svg></li>
          <li className="mc-node mc-dec rise" style={{ "--d": "1.9s" } as React.CSSProperties}><span className="mc-k">Decision</span><p className="mc-t">Clicked the quote?</p></li>
          <li className="mc-fork" style={{ "--d": "2.15s" } as React.CSSProperties} aria-hidden="true">
            <svg className="mc-h wipe" style={{ "--d": "2.15s" } as React.CSSProperties} viewBox="0 0 44 100" preserveAspectRatio="none"><path className="mc-path" d="M0 50C22 50 22 25 44 25" vectorEffect="non-scaling-stroke"/><path className="mc-path" d="M0 50C22 50 22 75 44 75" vectorEffect="non-scaling-stroke"/></svg>
            <svg className="mc-v wipe-v" style={{ "--d": "2.15s" } as React.CSSProperties} viewBox="0 0 100 44" preserveAspectRatio="none"><path className="mc-path" d="M50 0C50 22 25 22 25 44" vectorEffect="non-scaling-stroke"/><path className="mc-path" d="M50 0C50 22 75 22 75 44" vectorEffect="non-scaling-stroke"/></svg>
          </li>
          <li className="mc-node mc-yes rise" style={{ "--d": "2.5s" } as React.CSSProperties}><span className="mc-k"><i className="mc-br">Yes</i> Hand to sales</span><p className="mc-t">Task on the Opportunity owner, due today</p></li>
          <li className="mc-node mc-no rise" style={{ "--d": "2.56s" } as React.CSSProperties}><span className="mc-k"><i className="mc-br mc-br-no">No</i> Email 2</span><p className="mc-t">Reminder with a call option, then exit</p></li>
        </ol>
        <footer className="mc-consent rule-draw rise" style={{ "--d": "2.75s" } as React.CSSProperties}>
          <svg className="mc-sync" style={{ "--d": "2.85s" } as React.CSSProperties} viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10a6.5 6.5 0 0 1 11.2-4.5L16.5 7M16.5 10a6.5 6.5 0 0 1-11.2 4.5L3.5 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16.5 3v4h-4M3.5 17v-4h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <p><b>Consent synced from Salesforce.</b> An opt-out in either system stops this journey at the next step, and the contact’s record shows why.</p>
        </footer>
      </div>
      <span className="ticks" aria-hidden="true"></span>
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Staged scene · Sample data, not a client org</span><span>OneAlgorithm</span></div>
      <figcaption id="mc-cap" className="cap">Illustration with sample data. One journey, in order: who enters, what they get, how long we wait, what decides the branch, and where consent comes from.</figcaption>

    </figure>
  );
}
