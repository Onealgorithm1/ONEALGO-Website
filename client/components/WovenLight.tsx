import React, { useEffect, useRef, useState } from "react";

/* A 3D object woven from light particles that reacts to the cursor.
 *
 * The idea is adapted from "Woven Light Hero" by @dhileepkumargm on 21st.dev
 * (retrieved 2026-08-16). That component is three.js; this one is not, and the
 * difference is deliberate — this repo removed three.js on 2026-08-12 because
 * the dependency cost ~720KB and about fourteen Lighthouse points for a scene
 * that is a few hundred lines of maths. So the torus knot, the perspective
 * projection, the depth sort and the cursor field are done here directly on a
 * 2D canvas: same picture, zero dependencies, no WebGL context to leak.
 *
 * What it does:
 *  - ~2,600 points sampled along a torus knot, each with a small jitter so the
 *    surface reads as woven rather than printed.
 *  - Brand ramp: #005eaa blue → white core → #ffa634 orange.
 *  - Rotates on Y and breathes on X; the cursor pushes points away and a
 *    spring pulls them home.
 *  - Painter's algorithm: sorted back-to-front, additive-ish blending, and
 *    size/alpha scale with depth so it has real volume.
 *
 * What it costs: nothing when it cannot be seen. It renders one static frame
 * under prefers-reduced-motion, never starts on screens under 768px, stops the
 * loop when scrolled out of view, and caps DPR at 2.
 */

type Props = {
  className?: string;
  /** Rendered instead of the canvas when it is not run (small screen, no 2D context). */
  fallback?: React.ReactNode;
};

/** Brand ramp, sampled per point: blue → lifted blue → white → orange. */
const RAMP: [number, number, number][] = [
  [0, 94, 170],
  [64, 140, 217],
  [255, 255, 255],
  [255, 166, 52],
];

function rampAt(t: number): [number, number, number] {
  const seg = Math.min(RAMP.length - 2, Math.floor(t * (RAMP.length - 1)));
  const f = t * (RAMP.length - 1) - seg;
  const a = RAMP[seg];
  const b = RAMP[seg + 1];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

export default function WovenLight({ className, fallback }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Decoration. A phone pays for it in battery and gets a scrim over it
    // anyway — same rule the homepage film uses.
    if (!window.matchMedia("(min-width: 768px)").matches) {
      setFailed(true);
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      setFailed(true);
      return;
    }
    host.appendChild(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Build the knot -----------------------------------------------------
    const COUNT = reduced ? 4200 : 9000;
    const ox = new Float32Array(COUNT); // home position
    const oy = new Float32Array(COUNT);
    const oz = new Float32Array(COUNT);
    const px = new Float32Array(COUNT); // current position
    const py = new Float32Array(COUNT);
    const pz = new Float32Array(COUNT);
    const vx = new Float32Array(COUNT);
    const vy = new Float32Array(COUNT);
    const vz = new Float32Array(COUNT);
    const col: string[] = new Array(COUNT);
    const depth = new Float32Array(COUNT);

    // p=2, q=3 torus knot; tube radius gives it body.
    const R = 1.45;
    const TUBE = 0.30;
    for (let i = 0; i < COUNT; i++) {
      const u = (i / COUNT) * Math.PI * 2 * 2; // two full wraps of the knot
      const p = 2;
      const q = 3;
      const r = R * (2 + Math.cos((q * u) / p));
      const cx = 0.5 * r * Math.cos(u);
      const cy = 0.5 * r * Math.sin(u);
      const cz = 0.5 * R * 2 * Math.sin((q * u) / p);

      // Random point in the tube cross-section, plus a little jitter.
      const a = Math.random() * Math.PI * 2;
      const rad = TUBE * Math.pow(Math.random(), 0.65);
      const jx = Math.cos(a) * rad + (Math.random() - 0.5) * 0.06;
      const jy = Math.sin(a) * rad + (Math.random() - 0.5) * 0.06;
      const jz = (Math.random() - 0.5) * TUBE * 0.9;

      ox[i] = px[i] = cx + jx;
      oy[i] = py[i] = cy + jy;
      oz[i] = pz[i] = cz + jz;

      // Colour: mostly blue body, white core highlights, orange sparks.
      const t = Math.random();
      const [r8, g8, b8] = rampAt(t < 0.62 ? t * 0.42 : t < 0.9 ? 0.55 + t * 0.2 : 0.93);
      col[i] = `${r8},${g8},${b8}`;
    }

    // ---- Sizing -------------------------------------------------------------
    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      w = host.clientWidth || 1;
      h = host.clientHeight || 1;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ---- Cursor -------------------------------------------------------------
    let mx = 0;
    let my = 0;
    let mActive = false;
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      my = -((e.clientY - r.top) / r.height) * 2 + 1;
      mActive =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    };
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    // ---- Render -------------------------------------------------------------
    // Projected-point scratch buffers, reused every frame: the loop allocates
    // nothing, so the garbage collector never interrupts the animation.
    const px2 = new Float32Array(COUNT);
    const py2 = new Float32Array(COUNT);
    const pz2 = new Float32Array(COUNT);
    const idx: number[] = Array.from({ length: COUNT }, (_, i) => i);

    const FOV = 2.6;
    const CAM_Z = 5.4;

    const draw = (time: number) => {
      const ry = time * 0.16;
      const rx = Math.sin(time * 0.22) * 0.22;
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);

      // Cursor in object space (approximate: same plane as the knot centre).
      const fx = mx * 2.6;
      const fy = my * 2.6;

      for (let i = 0; i < COUNT; i++) {
        if (!reduced) {
          let ax = 0;
          let ay = 0;
          let az = 0;

          if (mActive) {
            // Screen-space-ish push: compare the ROTATED point to the cursor.
            const x0 = px[i];
            const z0 = pz[i];
            const xr = x0 * cosY + z0 * sinY;
            const dx = xr - fx;
            const dy = py[i] - fy;
            const d2 = dx * dx + dy * dy;
            if (d2 < 1.7) {
              const d = Math.sqrt(d2) || 0.0001;
              const f = (1.3 - d) * 0.05;
              ax += (dx / d) * f;
              ay += (dy / d) * f;
              az += 0.01 * f;
            }
          }

          // Spring home + damping.
          ax += (ox[i] - px[i]) * 0.02;
          ay += (oy[i] - py[i]) * 0.02;
          az += (oz[i] - pz[i]) * 0.02;

          vx[i] = (vx[i] + ax) * 0.9;
          vy[i] = (vy[i] + ay) * 0.9;
          vz[i] = (vz[i] + az) * 0.9;

          px[i] += vx[i];
          py[i] += vy[i];
          pz[i] += vz[i];
        }

        // Rotate Y then X, then project.
        const x1 = px[i] * cosY + pz[i] * sinY;
        const z1 = -px[i] * sinY + pz[i] * cosY;
        const y2 = py[i] * cosX - z1 * sinX;
        const z2 = py[i] * sinX + z1 * cosX;

        depth[i] = z2;
        px2[i] = x1;
        py2[i] = y2;
        pz2[i] = z2;
      }

      // Painter's algorithm: far points first. Sorts the same array in place.
      idx.sort((a, b) => depth[a] - depth[b]);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const cx = w > 1024 ? w * 0.72 : w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * (w > 1024 ? 0.33 : 0.38);

      for (let k = 0; k < idx.length; k++) {
        const i = idx[k];
        const zc = CAM_Z - pz2[i];
        if (zc <= 0.2) continue;
        const persp = FOV / zc;
        const sx = cx + px2[i] * persp * scale;
        const sy = cy - py2[i] * persp * scale;

        // Depth shapes both size and brightness, which is what gives volume.
        const t = Math.max(0, Math.min(1, (pz2[i] + 2.2) / 4.4));
        const size = (0.55 + t * 1.5) * (dpr > 1 ? 1 : 1.15);
        const alpha = 0.10 + t * t * 0.72;

        ctx.fillStyle = `rgba(${col[i]},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, 6.283185);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      // Keep the left third quiet so the headline never fights the object.
      if (w > 1024) {
        const g = ctx.createLinearGradient(0, 0, w * 0.62, 0);
        g.addColorStop(0, "rgba(4,24,43,0.96)");
        g.addColorStop(0.62, "rgba(4,24,43,0.55)");
        g.addColorStop(1, "rgba(4,24,43,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w * 0.62, h);
      }
    };

    let raf = 0;
    let running = false;
    let start = performance.now();

    const loop = (now: number) => {
      draw((now - start) / 1000);
      if (running) raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      draw(1.2); // one considered frame, no loop, no listeners
    } else {
      running = true;
      start = performance.now();
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting && !running) {
        running = true;
        start = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(host);

    const onResize = () => {
      resize();
      if (reduced) draw(1.2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      canvas.remove();
    };
  }, []);

  if (failed) return <>{fallback ?? null}</>;
  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
