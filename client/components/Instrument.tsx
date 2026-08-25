import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* Instrument — the design layer for /services/website-development.
 *
 * WHY THIS EXISTS. That page may show no client names, no logos, no
 * testimonials, no case studies, no photography we own and no AI imagery
 * standing in for work — none of it exists with consent. Every ordinary agency
 * move is off the table, which is why the page had drifted into a column of
 * prose with half the width empty. Louis, 2026-08-24: "no paralax effect no
 * hover effect on the page no design to it it is generic".
 *
 * WHAT IS HERE. A measure rule that draws itself as a section enters, a
 * parallax wrapper, and a panel for short factual lists. That is all.
 *
 * ⛔ WHAT IS NOT HERE, AND MUST NOT COME BACK. A "live readout" panel that
 * measured the page in front of the reader — particles drawn, first paint,
 * page weight, image count. It worked, every figure was real, and Louis killed
 * it: "stop putting live readout facts that not what we want". The lesson is
 * that a measurement being true and live does not make it something a buyer
 * cares about. Fill the column with what they are deciding on instead.
 *
 * DESIGN CONTRACT. Radius 0 on everything in this file; the site's 8px radius
 * stays on buttons. Motion tiers come from the design KB
 * (onealgo-design-kb/ui-ux-pro-max/data/motion.csv): parallax "Subtle", hover
 * "Subtle". All of it collapses under prefers-reduced-motion. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---- Live readings ----------------------------------------------------------
   ponytail: one interval shared by every readout instead of a hook per metric.
   Ceiling: 1s granularity, which is right for a panel a human reads and wrong
   if this is ever reused for anything that needs to be frame-accurate. */
/* ---- Answers panel -----------------------------------------------------------
   ⛔ TWO THINGS HAVE ALREADY BEEN KILLED IN THIS SLOT. Read both before putting
   anything else here.

   1. A "live readout" measuring the page in front of the reader — particles
      drawn, first paint, page weight, image count. Every figure was real and
      genuinely live. Louis, 2026-08-24: "stop putting live readout facts that
      not what we want". True and live does not mean the buyer cares.
   2. A facts panel listing Malvern / woman-owned / Salesforce Partner / 24-7.
      All verified — and all four already appear in the paragraph immediately to
      its left. Louis: "do not make it redundant". A panel that restates its own
      neighbour is worse than an empty column.

   What is here now comes from what people actually type into Google before they
   hire anyone: "web design pricing", "how much does a website cost", "do I own
   my website", "can you fix my existing site". Those are the top commercial
   queries in this category, and this page already answers all of them further
   down — it just buried the answers 3,000px below the fold. This is a shortcut
   to them, so it is navigation rather than repetition, and it puts the page's
   first real links above the fold.

   ⛔ It must NOT print a price. No price list has ever been agreed, and invented
   turnaround times and a "fixed price before any work starts" line were both
   caught and cut from this page already. */
export type Answer = { q: string; target: string };

export function AnswersPanel({
  title,
  answers,
  foot,
  tone = "night",
}: {
  title: string;
  answers: Answer[];
  foot?: string;
  tone?: "night" | "light";
}) {
  /* Open the disclosure being jumped to, otherwise the link lands on a closed
     row and the reader has to find and click it a second time. */
  const jump = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    const el = document.getElementById(target);
    if (!el) return;
    e.preventDefault();
    if (el instanceof HTMLDetailsElement) el.open = true;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.querySelector("summary")?.focus();
  };
  return (
    <div className={`inst ${tone === "night" ? "inst-dark" : "inst-light"}`}>
      <div className="inst-head"><span>{title}</span></div>
      <ul className="ans">
        {answers.map((a) => (
          <li key={a.target}>
            <a href={`#${a.target}`} onClick={(e) => jump(e, a.target)}>
              <span>{a.q}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </li>
        ))}
      </ul>
      {foot ? <p className="inst-foot">{foot}</p> : null}
    </div>
  );
}

/* ---- The measure rule -------------------------------------------------------
   The layout motif. A hairline that draws itself across the section as it
   enters, with the specimen index and a true measurement in the margin. */
/* ⛔ `reading` must vary between rules and must be derived from real content.
   The first version printed the rule's own measured width, which is the same
   container every time — all three rules read "1136px", i.e. a decorative
   number wearing a measurement's clothes, which is the exact banlist item this
   motif existed to avoid. */
export function MeasureRule({
  index,
  label,
  reading,
  tone = "light",
}: {
  index: number;
  label: string;
  reading: string;
  tone?: "light" | "dark";
}) {
  const reduced = useReducedMotion();
  return (
    <div className={`mrule ${tone === "dark" ? "mrule-dark" : ""}`}>
      <motion.span
        className="mrule-line"
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
        aria-hidden="true"
      />
      <div className="mrule-meta">
        <span className="mrule-i">{String(index).padStart(2, "0")}</span>
        <span className="mrule-l">{label}</span>
        <span className="mrule-w">{reading}</span>
      </div>
    </div>
  );
}

/* ---- Parallax ---------------------------------------------------------------
   Layers move at different scroll rates so the page has depth without needing
   a single image. `depth` is the travel in px across the whole pass — the KB's
   "Subtle" tier caps this deliberately low so foreground and background never
   visibly desync. */
export function Parallax({
  children,
  depth = 40,
  className = "",
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
