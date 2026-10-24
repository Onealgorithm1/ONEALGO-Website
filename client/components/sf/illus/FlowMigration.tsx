import * as React from "react";
import type { IllusProps } from "./types";

/**
 * Flow migration mapping (redesign-v2/illustrations.md, "flow-migration"). Staged scene with SAMPLE data for the fictional
 * Example Manufacturing Co.: never a screenshot of any org. Markup, CSS and choreography are the approved source
 * (illustrations/src/flow-migration) converted to JSX; behaviour lives in ./runtime.ts, styles in client/styles/sf.css.
 * Without JS, or with reduced motion, the figure is its finished static self.
 *   <FlowMigration fig={1} />                      // below the fold: plays once on entry
 *   <FlowMigration fig={1} hero className="sf-hero-fig" />  // hero: dealt by CSS 250ms after first paint, counters off
 */
export function FlowMigration({ fig, hero, className = "" }: IllusProps) {
  return (
    <figure className={`illus fm${hero ? " js in" : ""} ${className}`} style={hero ? ({ "--t0": ".25s" } as React.CSSProperties) : undefined} data-illus="flow-migration" data-duration="2300" data-w="760" aria-labelledby="fm-cap" data-counters={hero ? "off" : undefined}>

      <div className="scene">
        <header className="scene-head">
          <div>
            <p className="scene-kicker">Automation migration · Workflow Rules and Process Builder → Flow</p>
            <p className="scene-org">Example Manufacturing Co. · <b>4 of 4</b> mapped · 2 live, 1 tested, 1 converted</p>
          </div>
          <span className="sample">Sample data</span>
        </header>
        <div className="fm-cols" aria-hidden="true"><span>Today</span><span></span><span>Flow</span><span>Status</span></div>
        <ol className="fm-rows" aria-label="Automations mapped to Flow">
          <li className="fm-row" style={{ "--s": "3" } as React.CSSProperties}>
            <div className="fm-from rise" style={{ "--d": ".1s" } as React.CSSProperties}><span className="tag">Workflow rule</span><p>Lead · assign owner by territory</p></div>
            <svg className="fm-link wipe" style={{ "--d": ".4s" } as React.CSSProperties} viewBox="0 0 80 24" preserveAspectRatio="none" aria-hidden="true"><path className="fm-path" d="M2 12H68"/><path className="fm-path fm-hot" d="M2 12H68"/><path className="fm-head stamp-in" style={{ "--d": ".82s" } as React.CSSProperties} d="M62 6l8 6-8 6" vectorEffect="non-scaling-stroke"/></svg>
            <div className="fm-to slide" style={{ "--d": ".9s" } as React.CSSProperties}><span className="tag tag-flow">Flow</span><p>Record-triggered · after save</p></div>
            <div className="fm-status rise" style={{ "--d": ".1s" } as React.CSSProperties}><span className="sr-only">Status: live</span><span className="fm-steps" aria-hidden="true" style={{ "--d": "1.2s" } as React.CSSProperties}><i className="st-q">Queued</i><i className="st-c">Converted</i><i className="st-t">Tested</i><i className="st-l">Live</i></span></div>
          </li>
          <li className="fm-row" style={{ "--s": "3" } as React.CSSProperties}>
            <div className="fm-from rise" style={{ "--d": ".24s" } as React.CSSProperties}><span className="tag">Workflow rule</span><p>Opportunity · alert on stage change</p></div>
            <svg className="fm-link wipe" style={{ "--d": ".54s" } as React.CSSProperties} viewBox="0 0 80 24" preserveAspectRatio="none" aria-hidden="true"><path className="fm-path" d="M2 12H68"/><path className="fm-path fm-hot" d="M2 12H68"/><path className="fm-head stamp-in" style={{ "--d": ".96s" } as React.CSSProperties} d="M62 6l8 6-8 6" vectorEffect="non-scaling-stroke"/></svg>
            <div className="fm-to slide" style={{ "--d": "1.04s" } as React.CSSProperties}><span className="tag tag-flow">Flow</span><p>Record-triggered · email action</p></div>
            <div className="fm-status rise" style={{ "--d": ".24s" } as React.CSSProperties}><span className="sr-only">Status: live</span><span className="fm-steps" aria-hidden="true" style={{ "--d": "1.34s" } as React.CSSProperties}><i className="st-q">Queued</i><i className="st-c">Converted</i><i className="st-t">Tested</i><i className="st-l">Live</i></span></div>
          </li>
          <li className="fm-row" style={{ "--s": "2" } as React.CSSProperties}>
            <div className="fm-from rise" style={{ "--d": ".38s" } as React.CSSProperties}><span className="tag">Process Builder</span><p>Case · escalate after 48 hours</p></div>
            <svg className="fm-link wipe" style={{ "--d": ".68s" } as React.CSSProperties} viewBox="0 0 80 24" preserveAspectRatio="none" aria-hidden="true"><path className="fm-path" d="M2 12H68"/><path className="fm-path fm-hot" d="M2 12H68"/><path className="fm-head stamp-in" style={{ "--d": "1.1s" } as React.CSSProperties} d="M62 6l8 6-8 6" vectorEffect="non-scaling-stroke"/></svg>
            <div className="fm-to slide" style={{ "--d": "1.18s" } as React.CSSProperties}><span className="tag tag-flow">Flow</span><p>Scheduled-triggered · hourly</p></div>
            <div className="fm-status rise" style={{ "--d": ".38s" } as React.CSSProperties}><span className="sr-only">Status: tested</span><span className="fm-steps" aria-hidden="true" style={{ "--d": "1.48s" } as React.CSSProperties}><i className="st-q">Queued</i><i className="st-c">Converted</i><i className="st-t">Tested</i><i className="st-l">Live</i></span></div>
          </li>
          <li className="fm-row" style={{ "--s": "1" } as React.CSSProperties}>
            <div className="fm-from rise" style={{ "--d": ".52s" } as React.CSSProperties}><span className="tag">Process Builder</span><p>Account · copy owner to contacts</p></div>
            <svg className="fm-link wipe" style={{ "--d": ".82s" } as React.CSSProperties} viewBox="0 0 80 24" preserveAspectRatio="none" aria-hidden="true"><path className="fm-path" d="M2 12H68"/><path className="fm-path fm-hot" d="M2 12H68"/><path className="fm-head stamp-in" style={{ "--d": "1.24s" } as React.CSSProperties} d="M62 6l8 6-8 6" vectorEffect="non-scaling-stroke"/></svg>
            <div className="fm-to slide" style={{ "--d": "1.32s" } as React.CSSProperties}><span className="tag tag-flow">Flow</span><p>Record-triggered · bulk-safe</p></div>
            <div className="fm-status rise" style={{ "--d": ".52s" } as React.CSSProperties}><span className="sr-only">Status: converted</span><span className="fm-steps" aria-hidden="true" style={{ "--d": "1.62s" } as React.CSSProperties}><i className="st-q">Queued</i><i className="st-c">Converted</i><i className="st-t">Tested</i><i className="st-l">Live</i></span></div>
          </li>
        </ol>
        <p className="fm-note rise" style={{ "--d": "1.9s" } as React.CSSProperties}>Each rule is rebuilt as one Flow, tested in a sandbox against real records, then switched over. The old rule is deactivated, not deleted, until the Flow has run for a week.</p>
      </div>
      <span className="ticks" aria-hidden="true"></span>
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Staged scene · Sample data, not a client org</span><span>OneAlgorithm</span></div>
      <figcaption id="fm-cap" className="cap">Illustration with sample data. Every legacy automation is mapped to one Flow and moves through converted, tested and live, in that order.</figcaption>

    </figure>
  );
}
