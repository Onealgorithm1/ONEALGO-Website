import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROADMAP, ROAD_X } from "../data/roadmap";
import { PrimaryCTA } from "./site";

/**
 * The road after launch. A winding road, drawn as the reader reaches it, with
 * a stop for each thing that gets a business found — each one linking to the
 * page that does that work.
 *
 * WHY A SEGMENT PER STOP, NOT ONE LONG PATH. The obvious build is one SVG road
 * behind the whole list. It cannot align: an SVG path has fixed coordinates
 * and the copy beside it has whatever height the viewport gives it, so the
 * pins drift off the road at every width but the one it was drawn for. Here
 * every <li> owns one curved segment that is exactly as tall as that item
 * (`preserveAspectRatio="none"` + `vector-effect="non-scaling-stroke"` — the
 * curve stretches, the stroke does not). It always aligns, because the road
 * is sized by the content instead of the other way round.
 *
 * WHY TRIGGERED, NOT SCRUBBED. Scroll-scrubbing repaints the road on every
 * frame of every scroll; this page already carries a particle canvas and a
 * multi-second mobile LCP. Each segment draws once, over ~0.9s, when its stop
 * comes into view — bounded work, and the road is visibly ahead of the
 * reader, which is what a road should be. Measured A/B (matched builds, two
 * Lighthouse runs each): LCP identical with and without this component; TBT
 * within the laptop's noise floor; the page chunk's bootup is the same either
 * way. The page's cost is the hero and the poster, not this.
 *
 * WHY A MASK. Animating `pathLength` directly on the dashed centre line would
 * fight its dash pattern (both are stroke-dasharray). The road group is masked
 * by a solid path whose pathLength animates instead, so the dashes stay dashes.
 *
 * ⛔ THE SVG IS DECORATION. `aria-hidden`, no text, no links inside it. The
 * <ol> is the content and it is in reading order regardless of which side a
 * stop sits on visually. `role="list"` is explicit because Safari drops list
 * semantics under `list-style:none`, and the pin's number is read out with an
 * sr-only "Stop" so the sequence reaches a screen reader as it reaches the eye.
 * `aria-current="step"` sits on the <li>, where assistive tech expects it.
 *
 * Reduced motion renders the same markup with no motion components and no
 * mask: fully drawn, all visible, nothing listening to scroll.
 */

const SEG = 100; // viewBox is 0 0 100 100; y is stretched to the item's height

function segmentPath(k: number) {
  const x0 = ROAD_X[k];
  const x1 = ROAD_X[k + 1];
  // A cubic from the top edge to the bottom edge, handles halfway down, so
  // consecutive segments meet with a continuous tangent.
  return `M ${x0} 0 C ${x0} ${SEG / 2}, ${x1} ${SEG / 2}, ${x1} ${SEG}`;
}

function Segment({ k, animate }: { k: number; animate: boolean }) {
  const d = segmentPath(k);
  const maskId = `rd-mask-${k}`;
  const road = (
    <>
      <path className="rd-surface" d={d} vectorEffect="non-scaling-stroke" />
      <path className="rd-centre" d={d} vectorEffect="non-scaling-stroke" />
    </>
  );
  return (
    <svg
      className="rd-seg"
      viewBox={`0 0 100 ${SEG}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {animate ? (
        <>
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height={SEG}>
              {/* ⛔ NO whileInView and NO vector-effect on this path.
                  - It lives inside <defs>, so it has no layout box and
                    IntersectionObserver never reliably sees it; the <li> is
                    the observed element and its "show" variant propagates
                    down here through Motion's variant inheritance.
                  - Motion draws the road by normalising the dash pattern to
                    pathLength="1" in the path's own user space; non-scaling-
                    stroke moves stroke geometry into screen space, where
                    preserveAspectRatio="none" stretches the path non-uniformly,
                    and the two disagree about its length — every segment drew
                    to roughly half and stopped short of the next pin while the
                    dasharray still read fully drawn. The visible road keeps
                    non-scaling-stroke (constant width); this mask is simply
                    wide enough to cover it at any stretch. */}
              <motion.path
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={60}
                strokeLinecap="round"
                variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            </mask>
          </defs>
          <g mask={`url(#${maskId})`}>{road}</g>
        </>
      ) : (
        road
      )}
    </svg>
  );
}

export default function Roadmap() {
  const reduced = useReducedMotion();
  const animate = !reduced;
  const Item: any = animate ? motion.li : "li";
  // Named variants, not inline targets: the mask path inside each segment
  // inherits "show" from this <li> and draws itself on the same trigger.
  const itemMotion = animate
    ? {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.35 },
        variants: {
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        },
      }
    : {};

  return (
    <section className="rd" aria-labelledby="rd-h">
      <div className="rd-head">
        <p className="rd-eyebrow">After launch</p>
        <h2 id="rd-h" className="rd-title">How we get you found</h2>
        {/* Two reviewers read "start at any of them" against the "you are
            here" marker as a contradiction. It is not — the marker is where the
            READER is, the stops are what a CLIENT can buy — but a lede that has
            to be defended is a lede that failed. This one says which is which. */}
        <p className="rd-lede">
          You are on the website stop now. The rest is what comes after launch,
          and you can start with whichever one you need.
        </p>
      </div>

      <ol className="rd-road" role="list">
        {ROADMAP.map((s, k) => (
          <Item
            key={s.id}
            className="rd-stop"
            aria-current={k === 0 ? "step" : undefined}
            {...itemMotion}
          >
            <div className="rd-lane" style={{ ["--x" as any]: `${ROAD_X[k]}%` }}>
              <Segment k={k} animate={animate} />
              <span className="rd-pin">
                <span className="sr-only">Stop </span>
                {k + 1}
              </span>
            </div>
            <div className="rd-body">
              <h3 className="rd-stop-title">{s.title}</h3>
              <p className="rd-text">{s.text}</p>
              {s.links.length ? (
                <p className="rd-links">
                  {s.links.map((l) => (
                    <Link key={l.to} className="rd-link" to={l.to}>
                      {l.label}
                      <span aria-hidden="true"> →</span>
                    </Link>
                  ))}
                </p>
              ) : (
                <span className="rd-here">You are here</span>
              )}
            </div>
          </Item>
        ))}
      </ol>

      <div className="rd-end">
        <p className="rd-end-text">
          Tell us where you are and what you have to work with, and we will put
          the next steps in writing.
        </p>
        <PrimaryCTA to="/contact">Get a written plan</PrimaryCTA>
      </div>
    </section>
  );
}
