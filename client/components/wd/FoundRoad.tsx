import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROADMAP, ROAD_X } from "../../data/roadmap";

/*
 * U12 · the road after launch, on the wd page (design-contract-webdev.md U12, S4). The road from
 * client/components/Roadmap.tsx (one curved SVG segment per stop, drawn once by framer-motion as the stop enters;
 * fully drawn and listener-free under reduced motion) WITHOUT that component's own header, eyebrow, lede and closing
 * button: the unit's H2 is "How a new website gets found" (structure-spec.md §4.2 #12) and the page has one primary
 * action. Reuses the `.rd-*` rules in client/global.css; the page CSS lets the road run the full 12 columns and makes
 * the stop links >= 44 px. Stop titles are capped at 8 words (gate 4) by SHORT; the links stay data/roadmap.ts's.
 */
const SHORT: Record<string, string> = { "stop-reach": "Reach people searching now, and people not yet" };
const SEG = 100;
const segmentPath = (k: number) => `M ${ROAD_X[k]} 0 C ${ROAD_X[k]} ${SEG / 2}, ${ROAD_X[k + 1]} ${SEG / 2}, ${ROAD_X[k + 1]} ${SEG}`;

function Segment({ k, animate }: { k: number; animate: boolean }) {
  const d = segmentPath(k), maskId = `wd-rd-mask-${k}`;
  const road = <><path className="rd-surface" d={d} vectorEffect="non-scaling-stroke" /><path className="rd-centre" d={d} vectorEffect="non-scaling-stroke" /></>;
  return (
    <svg className="rd-seg" viewBox={`0 0 100 ${SEG}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {animate ? (
        <>
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height={SEG}>
              <motion.path d={d} fill="none" stroke="#fff" strokeWidth={60} strokeLinecap="round" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }} transition={{ duration: 0.9, ease: "easeInOut" }} />
            </mask>
          </defs>
          <g mask={`url(#${maskId})`}>{road}</g>
        </>
      ) : road}
    </svg>
  );
}

export function FoundRoad({ className = "" }: { className?: string }) {
  // The prerender runs with no preference, so the first client render must match it whatever the visitor prefers:
  // the reduced-motion swap to the bare, listener-free road happens after hydration (Codex review finding 2).
  const reduce = useReducedMotion();
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);
  const animate = !(hydrated && reduce);
  const Item: any = animate ? motion.li : "li";
  const itemMotion = animate
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.35 }, variants: { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } } }
    : {};
  return (
    <ol className={`rd-road wd-road ${className}`} role="list">
      {ROADMAP.map((s, k) => (
        <Item key={s.id} className="rd-stop" aria-current={k === 0 ? "step" : undefined} {...itemMotion}>
          <div className="rd-lane" style={{ ["--x" as string]: `${ROAD_X[k]}%` } as React.CSSProperties}>
            <Segment k={k} animate={animate} />
            <span className="rd-pin"><span className="sr-only">Stop </span>{k + 1}</span>
          </div>
          <div className="rd-body">
            <h3 className="rd-stop-title">{SHORT[s.id] ?? s.title}</h3>
            <p className="rd-text">{s.text}</p>
            {s.links.length ? (
              <p className="rd-links">
                {s.links.map((l) => <Link key={l.to} className="rd-link" to={l.to}>{l.label}<span aria-hidden="true"> →</span></Link>)}
              </p>
            ) : (
              <span className="rd-here">You are here</span>
            )}
          </div>
        </Item>
      ))}
    </ol>
  );
}
