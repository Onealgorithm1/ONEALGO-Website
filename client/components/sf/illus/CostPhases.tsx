import * as React from "react";
import type { IllusProps } from "./types";

/**
 * Implementation estimate by phase (redesign-v2/illustrations.md, "cost-phases"). Staged scene with SAMPLE data for the fictional
 * Example Manufacturing Co.: never a screenshot of any org. Markup, CSS and choreography are the approved source
 * (illustrations/src/cost-phases) converted to JSX; behaviour lives in ./runtime.ts, styles in client/styles/sf.css.
 * Without JS, or with reduced motion, the figure is its finished static self.
 *   <CostPhases fig={1} />                      // below the fold: plays once on entry
 *   <CostPhases fig={1} hero className="sf-hero-fig" />  // hero: dealt by CSS 250ms after first paint, counters off
 */
export function CostPhases({ fig, hero, className = "" }: IllusProps) {
  return (
    <figure className={`illus cp${hero ? " js in" : ""} ${className}`} style={{ "--days": "60", ...(hero ? { "--t0": ".25s" } : {}) } as React.CSSProperties} data-illus="cost-phases" data-duration="2600" data-w="760" aria-labelledby="cp-cap" data-counters={hero ? "off" : undefined}>

      <div className="scene">
        <header className="scene-head">
          <div>
            <p className="scene-kicker">Implementation estimate · working days by phase</p>
            <p className="scene-org">Example Manufacturing Co. · Sales Cloud · 40 users · one ERP integration</p>
          </div>
          <span className="sample">Sample data</span>
        </header>
        <div className="cp-chart">
          <div className="cp-axis" aria-hidden="true"><div className="cp-axis-in"><span style={{ "--x": "0" } as React.CSSProperties}>0</span><span style={{ "--x": "10" } as React.CSSProperties}>10</span><span style={{ "--x": "20" } as React.CSSProperties}>20</span><span style={{ "--x": "30" } as React.CSSProperties}>30</span><span style={{ "--x": "40" } as React.CSSProperties}>40</span><span style={{ "--x": "50" } as React.CSSProperties}>50</span><span style={{ "--x": "60" } as React.CSSProperties}>60</span></div></div>
          <ol className="cp-rows" aria-label="Phases with working-day ranges">
            <li className="cp-row rise" style={{ "--d": ".1s", "--s": "0", "--min": "5", "--max": "8" } as React.CSSProperties}>
              <span className="cp-num mono" aria-hidden="true">01</span>
              <p className="cp-name">Discovery and scope</p>
              <div className="cp-track" aria-hidden="true"><span className="cp-range" style={{ "--d": ".95s" } as React.CSSProperties}></span><span className="cp-bar" style={{ "--d": ".4s" } as React.CSSProperties}></span></div>
              <p className="cp-days mono">5–8 days</p>
            </li>
            <li className="cp-row rise" style={{ "--d": ".22s", "--s": "6", "--min": "20", "--max": "30" } as React.CSSProperties}>
              <span className="cp-num mono" aria-hidden="true">02</span>
              <p className="cp-name">Configuration and build</p>
              <div className="cp-track" aria-hidden="true"><span className="cp-range" style={{ "--d": "1.07s" } as React.CSSProperties}></span><span className="cp-bar" style={{ "--d": ".52s" } as React.CSSProperties}></span></div>
              <p className="cp-days mono">20–30 days</p>
            </li>
            <li className="cp-row rise" style={{ "--d": ".34s", "--s": "18", "--min": "10", "--max": "18" } as React.CSSProperties}>
              <span className="cp-num mono" aria-hidden="true">03</span>
              <p className="cp-name">Data migration and integration</p>
              <div className="cp-track" aria-hidden="true"><span className="cp-range" style={{ "--d": "1.19s" } as React.CSSProperties}></span><span className="cp-bar" style={{ "--d": ".64s" } as React.CSSProperties}></span></div>
              <p className="cp-days mono">10–18 days</p>
            </li>
            <li className="cp-row rise" style={{ "--d": ".46s", "--s": "34", "--min": "5", "--max": "8" } as React.CSSProperties}>
              <span className="cp-num mono" aria-hidden="true">04</span>
              <p className="cp-name">Training and go-live</p>
              <div className="cp-track" aria-hidden="true"><span className="cp-range" style={{ "--d": "1.31s" } as React.CSSProperties}></span><span className="cp-bar" style={{ "--d": ".76s" } as React.CSSProperties}></span></div>
              <p className="cp-days mono">5–8 days</p>
            </li>
            <li className="cp-row rise" style={{ "--d": ".58s", "--s": "40", "--min": "10", "--max": "20" } as React.CSSProperties}>
              <span className="cp-num mono" aria-hidden="true">05</span>
              <p className="cp-name">Hypercare, first weeks live</p>
              <div className="cp-track" aria-hidden="true"><span className="cp-range" style={{ "--d": "1.43s" } as React.CSSProperties}></span><span className="cp-bar" style={{ "--d": ".88s" } as React.CSSProperties}></span></div>
              <p className="cp-days mono">10–20 days</p>
            </li>
          </ol>
        </div>
        <footer className="cp-foot rise" style={{ "--d": "1.7s" } as React.CSSProperties}>
          <p className="cp-total"><b><span className="num" data-count="50">50</span>–<span className="num" data-count="60">60</span></b> working days, end to end</p>
          <p className="cp-sub">Solid is the shorter end of each range, hatched the longer. Phases 02 and 03 overlap by design: the data work starts while the build is still open.</p>
        </footer>
      </div>
      <span className="ticks" aria-hidden="true"></span>
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Staged scene · Sample data, not a client quote</span><span>OneAlgorithm</span></div>
      <figcaption id="cp-cap" className="cap">Illustration with sample data. Five phases on one working-day timeline, each with its shorter and longer end, and the total they add up to.</figcaption>

    </figure>
  );
}
