/* Staged illustrations · runtime. A port of redesign-v2/illustrations/shared/illus.js (vanilla, no dependencies)
 * plus the per-figure inits that lived in each <name>.js. Same behaviour, same class contract:
 *   .js     the figure's init ran            .in   it entered the viewport (25% visible)
 *   .static reduced motion: final state      .scrub paused at --t0 for the capture harness (?scrub=<ms>)
 * Without JS, or with reduced motion, every figure is its finished, static self: the HTML holds the final
 * numbers, the resting transforms and the drawn rules; CSS (client/styles/sf.css, ILLUS block) rewinds and plays.
 *
 * Boot is called once per page by client/lib/sfMotion.ts (bootIllus(root)); it inits each [data-illus] figure
 * when it comes within 800px. Nothing here runs during render, so server and client markup stay identical.
 * data-counters="off" on a figure skips its count-ups (the hero desk: motion-system.md counts below the fold only). */

type Init = (root: HTMLElement) => void;
const inits: Record<string, Init> = {};
const register = (name: string, fn: Init) => { inits[name] = fn; };

const mq = (q: string) => (typeof matchMedia === "function" ? matchMedia(q) : ({ matches: false } as MediaQueryList));
export const RM = () => mq("(prefers-reduced-motion: reduce)");
export const FINE = () => mq("(hover: hover) and (pointer: fine)");

/* cubic-bezier sampler, so a JS counter can share a CSS curve (the reconciliation bar + its total) */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  return (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) { const d = sx(t) - x; if (Math.abs(d) < 1e-5) break; t -= d / ((3 * ax * t + 2 * bx) * t + cx); }
    return sy(Math.min(1, Math.max(0, t)));
  };
}
export const EASE = { out: (t: number) => 1 - (1 - t) * (1 - t), draw: bezier(0.45, 0, 0.2, 1), arrive: bezier(0.22, 1, 0.36, 1) };
const fmt = (n: number, dec: number) => n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });

/** Tween data-count from 0 to its value (power1.out by default); the element already shows the final value. */
export function countUp(el: HTMLElement, o: { dur?: number; delay?: number; ease?: keyof typeof EASE } = {}) {
  if ((window as { __oaPrerender?: boolean }).__oaPrerender) return; // prerender keeps the final value
  const to = +el.getAttribute("data-count")!, dec = +(el.getAttribute("data-dec") || 0), dur = o.dur || 900, delay = o.delay || 0, ease = EASE[o.ease || "out"];
  const root = el.closest<HTMLElement>(".illus"), scrub = root && root.getAttribute("data-scrub");
  if (root && root.getAttribute("data-counters") === "off") return;
  if (scrub != null) { el.textContent = fmt(to * ease(Math.min(1, Math.max(0, (+scrub - delay) / dur))), dec); return; }
  el.textContent = fmt(0, dec);
  let start: number | null = null;
  const step = (ts: number) => {
    if (start === null) start = ts;
    let t = (ts - start - delay) / dur;
    if (t < 0) { requestAnimationFrame(step); return; }
    t = Math.min(1, t); el.textContent = fmt(to * ease(t), dec);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Mark the figure .js, wait until 25% of it is visible, then add .in and run the figure's counters. */
export function play(root: HTMLElement, onIn?: () => void) {
  root.classList.add("js");
  const scrub = root.getAttribute("data-scrub");
  if (RM().matches) { root.classList.add("in", "static"); return; }
  if (scrub != null) { root.style.setProperty("--t0", -scrub + "ms"); root.classList.add("in", "scrub"); onIn && onIn(); return; }
  if (root.classList.contains("in")) { onIn && onIn(); return; } // a hero figure ships with .js.in already set (CSS deals it); only the counters are left to run
  if (!("IntersectionObserver" in window)) { root.classList.add("in"); onIn && onIn(); return; }
  const io = new IntersectionObserver((es) => {
    if (es.some((e) => e.isIntersecting)) { io.disconnect(); root.classList.add("in"); onIn && onIn(); }
  }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });
  io.observe(root);
}

/** One-shot Web Animation for hover replays (fine pointers, motion allowed); never loops. */
export function once(el: Element, keyframes: Keyframe[], opts: KeyframeAnimationOptions = {}) {
  if (RM().matches || !el.animate) return null;
  return el.animate(keyframes, { duration: 700, easing: "cubic-bezier(.45,0,.2,1)", ...opts });
}

/** Hovering a sync lane sends one more packet across, once (shared by sap-sync and hub-composition). */
function laneHover(root: HTMLElement) {
  if (!FINE().matches) return;
  root.querySelectorAll<HTMLElement>(".ss-lane").forEach((lane) => {
    const pkt = lane.querySelector(".ss-pkt"), back = lane.getAttribute("data-dir") === "sap";
    let busy = false;
    lane.addEventListener("pointerenter", () => {
      if (busy || !pkt) return; busy = true;
      const a = once(pkt, back ? [{ transform: "translateX(194px)" }, { transform: "translateX(0)" }] : [{ transform: "translateX(0)" }, { transform: "translateX(194px)" }], { duration: 900 });
      if (a) a.onfinish = () => { busy = false; }; else busy = false;
    });
  });
}

/* ---- the eight figures ---- */
const counters = (root: HTMLElement, sel: string, o: (i: number) => Parameters<typeof countUp>[1]) =>
  root.querySelectorAll<HTMLElement>(sel).forEach((el, i) => countUp(el, o(i)));

register("health-check", (root) => play(root));
register("flow-migration", (root) => play(root));
register("mc-journey", (root) => play(root));
register("data-migration", (root) => play(root, () => counters(root, "[data-count]", () => ({ dur: 1100, delay: 1250, ease: "draw" }))));
register("cost-phases", (root) => play(root, () => counters(root, "[data-count]", () => ({ dur: 800, delay: 1800 }))));
register("managed-week", (root) => play(root, () => {
  counters(root, ".mw-stat [data-count]", (i) => ({ dur: 900, delay: 250 + i * 100 }));
  const h = root.querySelector<HTMLElement>(".mw-hval [data-count]"); if (h) countUp(h, { dur: 700, delay: 1000, ease: "draw" });
}));
register("sap-sync", (root) => {
  play(root, () => root.querySelectorAll<HTMLElement>(".ss-lane").forEach((lane, i) => { const n = lane.querySelector<HTMLElement>("[data-count]"); if (n) countUp(n, { dur: 900, delay: 1150 + i * 150 }); }));
  laneHover(root);
});
register("hub-composition", (root) => {
  const group = root.querySelector<HTMLElement>(".hub-group"), stack = root.querySelector<HTMLElement>(".hub-stack");
  play(root, () => {
    counters(root, ".mw-stat [data-count]", (i) => ({ dur: 900, delay: 600 + i * 90 }));
    counters(root, ".ss-lane [data-count]", (i) => ({ dur: 900, delay: 1300 + i * 150 }));
  });
  laneHover(root);
  if (!group || !stack || !FINE().matches || RM().matches) return;
  /* fine pointer: the desk tilts <= 4deg toward the pointer (rAF-throttled, transform only) and the cards spread; keyboard focus spreads without tilt (CSS) */
  let raf = 0, ev: PointerEvent | null = null;
  const paint = () => {
    raf = 0; if (!ev) return; const r = stack.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
    group.style.setProperty("--ry", (x * 8).toFixed(2) + "deg"); group.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
  };
  stack.addEventListener("pointerenter", () => group.classList.add("spread"));
  stack.addEventListener("pointermove", (e) => { ev = e; if (!raf) raf = requestAnimationFrame(paint); });
  stack.addEventListener("pointerleave", () => { group.classList.remove("spread"); group.style.removeProperty("--rx"); group.style.removeProperty("--ry"); });
});

/** Find every [data-illus] figure under `scope` and init it once it is within 800px of the viewport. Idempotent per element. */
export function bootIllus(scope: ParentNode = document) {
  const els = Array.from(scope.querySelectorAll<HTMLElement>("[data-illus]"));
  const scrub = new URLSearchParams(location.search).get("scrub");
  if (scrub != null) els.forEach((el) => el.setAttribute("data-scrub", scrub));
  const run = (el: HTMLElement) => { const fn = inits[el.getAttribute("data-illus")!]; if (fn && !el.dataset.inited) { el.dataset.inited = "1"; fn(el); } };
  if (!("IntersectionObserver" in window) || scrub != null) { els.forEach(run); return; }
  const lio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { lio.unobserve(e.target); run(e.target as HTMLElement); } }), { rootMargin: "800px 0px" });
  els.forEach((el) => lio.observe(el));
}
