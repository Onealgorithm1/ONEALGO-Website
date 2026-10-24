import * as React from "react";
import type { IllusProps } from "./types";

/**
 * Health check · week 1 report (redesign-v2/illustrations.md, "health-check"). Staged scene with SAMPLE data for the fictional
 * Example Manufacturing Co.: never a screenshot of any org. Markup, CSS and choreography are the approved source
 * (illustrations/src/health-check) converted to JSX; behaviour lives in ./runtime.ts, styles in client/styles/sf.css.
 * Without JS, or with reduced motion, the figure is its finished static self.
 *   <HealthCheck fig={1} />                      // below the fold: plays once on entry
 *   <HealthCheck fig={1} hero className="sf-hero-fig" />  // hero: dealt by CSS 250ms after first paint, counters off
 */
export function HealthCheck({ fig, hero, className = "" }: IllusProps) {
  return (
    <figure className={`illus hc${hero ? " js in" : ""} ${className}`} style={hero ? ({ "--t0": ".25s" } as React.CSSProperties) : undefined} data-illus="health-check" data-duration="1900" data-w="620" aria-labelledby="hc-cap" data-counters={hero ? "off" : undefined}>

      <div className="scene">
        <header className="scene-head">
          <div>
            <p className="scene-kicker">Org health check · Week 1 report</p>
            <p className="scene-org">Example Manufacturing Co. · Sales Cloud · <b>5 findings</b>, ranked</p>
          </div>
          <span className="sample">Sample data</span>
        </header>
        <ol className="hc-rows" aria-label="Findings, ranked by severity">
          <li className="hc-row slide" style={{ "--d": ".15s" } as React.CSSProperties}>
            <span className="hc-rank mono" aria-hidden="true">1</span>
            <div className="hc-body"><p className="hc-find"><b className="hc-n">2</b> admins without MFA</p><p className="hc-fix">Enforce MFA on every admin login this week</p></div>
            <span className="hc-area mono">Security</span>
            <span className="chip chip-crit stamp-in" style={{ "--d": ".5s" } as React.CSSProperties}>Critical</span>
          </li>
          <li className="hc-row slide" style={{ "--d": ".24s" } as React.CSSProperties}>
            <span className="hc-rank mono" aria-hidden="true">2</span>
            <div className="hc-body"><p className="hc-find"><b className="hc-n">3</b> profiles with Modify All Data</p><p className="hc-fix">Move the rights to permission sets, off the profiles</p></div>
            <span className="hc-area mono">Permissions</span>
            <span className="chip chip-high stamp-in" style={{ "--d": ".59s" } as React.CSSProperties}>High</span>
          </li>
          <li className="hc-row slide" style={{ "--d": ".33s" } as React.CSSProperties}>
            <span className="hc-rank mono" aria-hidden="true">3</span>
            <div className="hc-body"><p className="hc-find"><b className="hc-n">12</b> Workflow Rules still active</p><p className="hc-fix">Move to Flow, one rule at a time, tested in sandbox</p></div>
            <span className="hc-area mono">Automation</span>
            <span className="chip chip-high stamp-in" style={{ "--d": ".68s" } as React.CSSProperties}>High</span>
          </li>
          <li className="hc-row slide" style={{ "--d": ".42s" } as React.CSSProperties}>
            <span className="hc-rank mono" aria-hidden="true">4</span>
            <div className="hc-body"><p className="hc-find"><b className="hc-n">1,240</b> duplicate accounts</p><p className="hc-fix">Duplicate rules on, then one merge pass</p></div>
            <span className="hc-area mono">Data</span>
            <span className="chip stamp-in" style={{ "--d": ".77s" } as React.CSSProperties}>Medium</span>
          </li>
          <li className="hc-row slide" style={{ "--d": ".51s" } as React.CSSProperties}>
            <span className="hc-rank mono" aria-hidden="true">5</span>
            <div className="hc-body"><p className="hc-find"><b className="hc-n">9</b> unused licenses</p><p className="hc-fix">Reassign now, drop the rest at renewal</p></div>
            <span className="hc-area mono">Licenses</span>
            <span className="chip chip-low stamp-in" style={{ "--d": ".86s" } as React.CSSProperties}>Low</span>
          </li>
        </ol>
        <footer className="hc-foot rise" style={{ "--d": ".95s" } as React.CSSProperties}>
          <svg className="tickmark" viewBox="0 0 18 18" aria-hidden="true"><path className="draw" style={{ "--d": "1.25s" } as React.CSSProperties} d="M3 9.5l4.5 4.5L15 5" pathLength="1"/></svg>
          <p><b>3 to fix this week</b>, 2 to plan · the written list is yours to keep</p>
        </footer>
      </div>
      <span className="ticks" aria-hidden="true"></span>
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Staged scene · Sample data, not a client org</span><span>OneAlgorithm</span></div>
      <figcaption id="hc-cap" className="cap">Illustration with sample data. The free week ends with this list: five findings ranked by what to fix first, each with the fix written down.</figcaption>

    </figure>
  );
}
