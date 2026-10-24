import * as React from "react";
import { BuildStage, SCENES, type Scene } from "./BuildStage";

/*
 * FIG. 2 · three finished demo frames (restaurant, roofer, dentist) fanned on one sheet (design-contract-webdev.md U3).
 * The frames are BuildStage `finished` renders: static DOM, no keyframes, no hooks. The stage sweeps open with the
 * wire; on `.in` the frames deal onto the sheet (translate + opacity, staggered .12 s: <= 3 tweens); a fine pointer
 * brings the hovered frame forward (wd.css). Reduced motion: the stack rendered final.
 *
 *   <DemoSheet />                       the three default scenes
 *   <DemoSheet scenes={[SCENES[1]]} />  one frame
 */
export function DemoSheet({ scenes = SCENES, fig = 2, stamp = "Three layouts, one blank page · Demo", caption = "The same blank page, three businesses: full-bleed, split, centred. Nothing here is client work.", className = "" }: {
  scenes?: Scene[];
  fig?: number;
  stamp?: string;
  caption?: React.ReactNode;
  className?: string;
}) {
  const id = `fig${fig}`;
  return (
    <figure className={`sf-stage sf-sweep wd-sheet ${className}`} aria-labelledby={`${id}-cap`} data-reveal="">
      <div className="sf-stage-in">
        <div className="wd-sheet-in wd-cut" aria-hidden="true">
          {scenes.map((s, k) => (
            <div className="wd-deal" key={s.id} style={{ ["--i" as string]: k } as React.CSSProperties}>
              <BuildStage finished scene={k} scenes={scenes} />
              <span className="wd-deal-stamp">Demo · {s.kind}</span>
            </div>
          ))}
        </div>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}
