import * as React from "react";
import type { IllusProps } from "./types";

/**
 * Managed services · this week (redesign-v2/illustrations.md, "managed-week"). Staged scene with SAMPLE data for the fictional
 * Example Manufacturing Co.: never a screenshot of any org. Markup, CSS and choreography are the approved source
 * (illustrations/src/managed-week) converted to JSX; behaviour lives in ./runtime.ts, styles in client/styles/sf.css.
 * Without JS, or with reduced motion, the figure is its finished static self.
 *   <ManagedWeek fig={1} />                      // below the fold: plays once on entry
 *   <ManagedWeek fig={1} hero className="sf-hero-fig" />  // hero: dealt by CSS 250ms after first paint, counters off
 */
export function ManagedWeek({ fig, hero, className = "" }: IllusProps) {
  return (
    <figure className={`illus mw${hero ? " js in" : ""} ${className}`} style={hero ? ({ "--t0": ".25s" } as React.CSSProperties) : undefined} data-illus="managed-week" data-duration="2200" data-w="680" aria-labelledby="mw-cap" data-counters={hero ? "off" : undefined}>

      <div className="scene">
        <header className="scene-head">
          <div>
            <p className="scene-kicker">Managed services · This week</p>
            <p className="scene-org">Example Manufacturing Co. · a sample week, Monday to Friday</p>
          </div>
          <span className="sample">Sample data</span>
        </header>
        <ul className="mw-stats" aria-label="This week in numbers">
          <li className="mw-stat rule-draw" style={{ "--d": ".1s" } as React.CSSProperties}><p className="mw-num"><span className="num" data-count="23">23</span></p><p className="mw-lab">tickets closed</p><p className="mw-sub">each one logged</p></li>
          <li className="mw-stat rule-draw" style={{ "--d": ".2s" } as React.CSSProperties}><p className="mw-num"><span className="num" data-count="7">7</span></p><p className="mw-lab">fields added</p><p className="mw-sub">help text, history on</p></li>
          <li className="mw-stat rule-draw" style={{ "--d": ".3s" } as React.CSSProperties}><p className="mw-num"><span className="num" data-count="4">4</span></p><p className="mw-lab">flows updated</p><p className="mw-sub">tested in sandbox first</p></li>
          <li className="mw-stat rule-draw" style={{ "--d": ".4s" } as React.CSSProperties}><p className="mw-num"><span className="num" data-count="2">2</span></p><p className="mw-lab">release checks</p><p className="mw-sub">passed, nothing broke</p></li>
        </ul>
        <div className="mw-lower">
          <div className="mw-days rise" style={{ "--d": ".55s" } as React.CSSProperties}>
            <p className="mw-k">Tickets closed by day</p>
            <ol className="mw-bars" aria-label="Tickets closed per day">
              <li style={{ "--v": "6" } as React.CSSProperties}><span className="mw-v mono">6</span><span className="mw-barwrap"><span className="mw-bar" style={{ "--d": ".7s" } as React.CSSProperties}></span></span><span className="mw-d mono">Mon</span></li>
              <li style={{ "--v": "4" } as React.CSSProperties}><span className="mw-v mono">4</span><span className="mw-barwrap"><span className="mw-bar" style={{ "--d": ".76s" } as React.CSSProperties}></span></span><span className="mw-d mono">Tue</span></li>
              <li style={{ "--v": "5" } as React.CSSProperties}><span className="mw-v mono">5</span><span className="mw-barwrap"><span className="mw-bar" style={{ "--d": ".82s" } as React.CSSProperties}></span></span><span className="mw-d mono">Wed</span></li>
              <li style={{ "--v": "3" } as React.CSSProperties}><span className="mw-v mono">3</span><span className="mw-barwrap"><span className="mw-bar" style={{ "--d": ".88s" } as React.CSSProperties}></span></span><span className="mw-d mono">Thu</span></li>
              <li style={{ "--v": "5" } as React.CSSProperties}><span className="mw-v mono">5</span><span className="mw-barwrap"><span className="mw-bar" style={{ "--d": ".94s" } as React.CSSProperties}></span></span><span className="mw-d mono">Fri</span></li>
            </ol>
          </div>
          <div className="mw-hours rise" style={{ "--d": ".7s" } as React.CSSProperties}>
            <p className="mw-k">Hours this week</p>
            <p className="mw-hval"><b><span className="num" data-count="14.5" data-dec="1">14.5</span> h</b> worked</p>
            <p className="mw-sub">every hour on the report</p>
          </div>
        </div>
      </div>
      <span className="ticks" aria-hidden="true"></span>
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Staged scene · Sample data, not a client org</span><span>OneAlgorithm</span></div>
      <figcaption id="mw-cap" className="cap">Illustration with sample data. What a week of weekly administration looks like on paper: closed tickets, fields, flows and release checks, with the hours used.</figcaption>

    </figure>
  );
}
