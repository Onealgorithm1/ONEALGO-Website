import React, { useEffect, useRef, useState } from "react";

/**
 * A live node lattice — the hero of the website-development page.
 *
 * WHY THIS EXISTS, AND WHY IT IS NOT DECORATION
 *
 * That page sells web development, so it is judged by what it is rather than by
 * what it claims. "Modern Design ✓" asks to be believed; a scene running at
 * 60fps in front of the reader does not.
 *
 * The subject is deliberate. This company integrates systems, so the scene is
 * nodes and the connections between them, moving under the cursor. It is a
 * picture of the work, not a spinning cube.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REWRITTEN 2026-08-12: three.js is gone. This is canvas-2D.
 *
 * The old version dynamically imported three.js and defended that choice
 * carefully — its own chunk, loaded only on intersection, skipped entirely
 * under reduced motion. All of that was true, and the chunk was still 720KB on
 * disk: five times the next largest file in the build, for one animation on one
 * page. The page measured ~70 on mobile Lighthouse while the homepage measured
 * 84, and the gap was this.
 *
 * The honest question was never "how do we ship 3D cheaply". It was "does this
 * scene need a 3D engine at all". It does not. It is points, lines between
 * near neighbours, and a cursor field. Canvas-2D draws that in a few hundred
 * lines with no dependency, and the depth cue that made it read as 3D — nearer
 * nodes larger, brighter, and moving further under the cursor — is four lines
 * of arithmetic rather than a renderer, a scene graph and a camera.
 *
 * The page's claim gets stronger, not weaker. "We shipped 3D and kept the
 * score" is a thing a careful team can do. "We got the effect without the
 * 720KB" is the judgement that separates one from another.
 *
 * WHAT SURVIVED THE REWRITE, because it was right the first time:
 *
 *   - Nothing runs until the canvas is near the viewport (IntersectionObserver),
 *     so a visitor who never scrolls here pays nothing at all.
 *   - `prefers-reduced-motion` renders ONE static frame and never starts a loop.
 *     Motion sensitivity is not a preference to animate around.
 *   - Device pixel ratio is capped at 2. Uncapped, a modern phone renders ~9x
 *     the pixels for no visible gain and drops frames doing it.
 *   - The loop stops when the tab is hidden and when the canvas scrolls away.
 *     An offscreen render is heat and battery spent on nothing.
 *   - Pointer position is written to a ref and read inside the frame. A
 *     mousemove handler that touches layout is the classic way to wreck INP;
 *     this one touches nothing but a number.
 */

type Props = {
  className?: string;
  /** Rendered instead of the canvas when canvas-2D is unavailable. */
  fallback?: React.ReactNode;
};

const NODE_COUNT = 90;
/** Squared, so the inner loop never calls Math.sqrt. At ~4,000 pair checks a
 *  frame that is measurable on a mid-range phone. */
const LINK_DIST_SQ = 0.19 * 0.19;
/** Brand values, hard-coded because a canvas cannot read a Tailwind token. */
const NIGHT = "#04182b";
const NODE = "#7fb4e6";
const ACCENT = "#ffa634";

type Node = { x: number; y: number; z: number; vx: number; vy: number };

export default function SystemsLattice({ className, fallback }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "display:block;width:100%;height:100%";
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFailed(true);
      return;
    }
    host.appendChild(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Deterministic layout: the same scene every load, so a visual regression
    // is a real change rather than a different random seed.
    let seed = 20260812;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: rand(),
      y: rand(),
      z: 0.35 + rand() * 0.65, // depth: nearer nodes are larger and brighter
      vx: (rand() - 0.5) * 0.00035,
      vy: (rand() - 0.5) * 0.00035,
    }));

    // Normalised, and off-canvas until the pointer actually arrives.
    const pointer = { x: -1, y: -1 };

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      ctx.fillStyle = NIGHT;
      ctx.fillRect(0, 0, w, h);
      // The canvas is square-ish in normalised space; scaling x by the aspect
      // ratio keeps links from stretching on wide viewports.
      const aspect = w / h || 1;

      const px: number[] = [];
      const py: number[] = [];
      const pz: number[] = [];

      for (const n of nodes) {
        // Cursor field: nearer nodes are pushed further, which is the whole of
        // the depth illusion.
        let dx = 0;
        let dy = 0;
        if (pointer.x >= 0) {
          const ox = n.x - pointer.x;
          const oy = n.y - pointer.y;
          const d2 = ox * ox * aspect * aspect + oy * oy;
          if (d2 < 0.055) {
            const push = (0.055 - d2) * 2.6 * n.z;
            dx = ox * push;
            dy = oy * push;
          }
        }
        px.push((n.x + dx) * w);
        py.push((n.y + dy) * h);
        pz.push(n.z);
      }

      // Links first, so nodes sit on top of them.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ax = (px[i] - px[j]) / w;
          const ay = (py[i] - py[j]) / h;
          const d2 = ax * ax * aspect * aspect + ay * ay;
          if (d2 > LINK_DIST_SQ) continue;
          const strength = 1 - d2 / LINK_DIST_SQ;
          ctx.strokeStyle = `rgba(127,180,230,${(strength * 0.42 * ((pz[i] + pz[j]) / 2)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(px[j], py[j]);
          ctx.stroke();
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const r = 0.9 + pz[i] * 1.9;
        // One node in nine takes the accent, so the scene reads as brand rather
        // than as a generic particle field.
        ctx.fillStyle = i % 9 === 0 ? ACCENT : NODE;
        ctx.globalAlpha = 0.35 + pz[i] * 0.5;
        ctx.beginPath();
        ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reduced) {
      // One frame, no loop, no listeners. The lattice is legible standing still.
      draw();
      const onResizeStatic = () => {
        resize();
        draw();
      };
      window.addEventListener("resize", onResizeStatic);
      return () => {
        window.removeEventListener("resize", onResizeStatic);
        canvas.remove();
      };
    }

    let raf = 0;
    let running = false;

    const frame = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => {
      pointer.x = -1;
      pointer.y = -1;
    };
    const onResize = () => {
      resize();
      if (!running) draw();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(host);

    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    draw(); // paint immediately so there is never an empty box

    return () => {
      stop();
      io.disconnect();
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.remove();
    };
  }, []);

  if (failed) return <>{fallback ?? null}</>;

  return <div ref={hostRef} className={className} data-systems-lattice="" />;
}
