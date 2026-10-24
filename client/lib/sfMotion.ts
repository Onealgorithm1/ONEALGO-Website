/* Salesforce pages · motion runtime (motion-system.md). Runs ONCE per page from <SfPage>'s effect, after
 * hydration, never during render: server and client markup are identical, and the prerendered HTML is the
 * no-JS state (every rule drawn, every figure final, every number its real value).
 *
 *   1. ledger rules: .sf-unit gets .in as it enters (IntersectionObserver, threshold .12, rootMargin -12%)
 *   2. evidence pop-ups: [data-evidence="x"] opens <dialog id="ev-x"> (showModal, focus to the title,
 *      Esc closes natively, focus returns to the opener)
 *   3. stage units highlight their station on the rail figure (hover / focus-within)
 *   4. service cards tilt <= 3deg on fine pointers (transform written directly on pointermove, rAF)
 *   5. staged illustrations boot (client/components/sf/illus/runtime.ts)
 *   6. GSAP 3 + ScrollTrigger (vendored, /public/vendor/gsap-3.15.0) load lazily after the first scroll
 *      brings a [data-scene] / [data-count] within 300px, or a pointer reaches a [data-magnet] CTA; never
 *      under reduced motion. It drives the rail scene (scrub), the registry readouts (count once, below
 *      the fold only) and the magnetic CTAs (<= 6px, quickTo).
 *   7. website-development pages (design-contract-webdev.md §3-§4): [data-reveal] figures get .in like units;
 *      [data-hl-for="<figure id>"][data-hl-key="k"] rows highlight a node on a plate (data-hl, as the rail);
 *      [data-scene="build"] (wd/BuildStage) is THE ONE PIN: at >= 1024x700 and no-preference GSAP pins the
 *      row ([data-pin] ancestor) and scrubs the three builds with snap points at the finished states; below
 *      that the CSS keyframes play scene 1 once when .play lands (IO at 70% of the viewport).
 *
 * Reduced motion: nothing is observed or tweened; the rail figure gets .static; the CSS already holds.
 * Prerender: scripts/prerender.mjs sets window.__oaPrerender for Salesforce routes and this file does
 * nothing at all, so no class, inline style or half-counted number can be baked into the static HTML. */

import { bootIllus, RM, FINE } from "@/components/sf/illus/runtime";

declare global {
  interface Window {
    __oaPrerender?: boolean;
    gsap?: any;
    ScrollTrigger?: any;
  }
}

const GSAP_DIR = "/vendor/gsap-3.15.0/";
let gsapLoading: Promise<void> | null = null;
/** Inject the two vendored files, once. Resolves when both are available. */
export function loadGsap(): Promise<void> {
  if (window.gsap && window.ScrollTrigger) return Promise.resolve();
  if (gsapLoading) return gsapLoading;
  const inject = (file: string) =>
    new Promise<void>((res, rej) => {
      const s = document.createElement("script");
      s.src = GSAP_DIR + file; s.async = true;
      s.onload = () => res(); s.onerror = () => rej(new Error(file));
      document.head.appendChild(s);
    });
  gsapLoading = inject("gsap.min.js").then(() => inject("ScrollTrigger.min.js")).catch(() => { gsapLoading = null; });
  return gsapLoading;
}

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const below = (el: Element) => el.getBoundingClientRect().top > innerHeight;

/** The one pin on the site (website-development U2). scripts/wd-motion-gates-check.mjs asserts this string. */
export const PIN_MQ = "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
/** Seconds of timeline per build scene: 4.56 s of build (the CSS keyframes' clock, --d on each layer), then hold; the next scene wipes in over the end. */
const BUILD_SCENE_LEN = 6;

/** The build stage: one pinned, scrubbed, snapped timeline per [data-scene="build"]. Called inside gsap.matchMedia(PIN_MQ). */
function initBuildScenes(root: HTMLElement) {
  const { gsap, ScrollTrigger } = window;
  root.querySelectorAll<HTMLElement>('[data-scene="build"]').forEach((fig) => {
    const scenes = Array.from(fig.querySelectorAll<HTMLElement>(".bs-scene"));
    if (!scenes.length) return;
    const row = fig.closest<HTMLElement>("[data-pin]") || fig;
    fig.classList.add("js-scrub"); fig.classList.remove("play"); // GSAP owns the layers; the CSS keyframes are stripped
    const movers = Array.from(fig.querySelectorAll<HTMLElement>(".bs-scene, .bs-paint, .bs-photo, .bs-cursor"));
    const d = (el: HTMLElement) => parseFloat(el.style.getPropertyValue("--d")) || 0;
    const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
      trigger: row, start: "top top+=65", end: "+=200%", pin: true, pinSpacing: true, anticipatePin: 1, scrub: 0.6, invalidateOnRefresh: true,
      snap: { snapTo: [0, 1 / 3, 2 / 3, 1], duration: { min: 0.2, max: 0.5 }, ease: "power1.inOut", inertia: false }, // no velocity projection: one flick never skips a build
      onToggle: (st: any) => movers.forEach((el) => { el.style.willChange = st.isActive ? "transform, opacity" : ""; }),
    } });
    scenes.forEach((sc, k) => {
      const at = k * BUILD_SCENE_LEN, q = (s: string) => Array.from(sc.querySelectorAll<HTMLElement>(s));
      const log = Array.from(fig.querySelectorAll<HTMLElement>(`.bs-log[data-for="${k}"], .bs-url[data-scene-index="${k}"]`)); // the scene's log and its address bar come and go with it
      const lines = log.flatMap((l) => Array.from(l.querySelectorAll<HTMLElement>("li")));
      gsap.set(sc, { autoAlpha: k ? 0 : 1, y: k ? 10 : 0 }); gsap.set(log, { autoAlpha: k ? 0 : 1 });
      gsap.set(q(".bs-grid"), { opacity: 0 }); gsap.set(q(".bs-block"), { opacity: 0, scaleY: 0.6, transformOrigin: "top", outlineColor: "rgba(127,180,230,.7)" });
      gsap.set(q(".bs-paint"), { backgroundColor: "rgba(0,0,0,0)" }); gsap.set(q(".bs-type"), { clipPath: "inset(0 100% 0 0)" });
      gsap.set(q(".bs-pop"), { opacity: 0, scale: 0.85 }); gsap.set(q(".bs-photo"), { opacity: 0 }); gsap.set(q(".bs-cursor"), { opacity: 0, x: 60, y: 40 });
      gsap.set(q(".bs-check"), { opacity: 0 }); gsap.set(lines, { opacity: 0 });
      if (k) { tl.to(sc, { autoAlpha: 1, y: 0, duration: 0.55 }, at); tl.to(log, { autoAlpha: 1, duration: 0.3 }, at); }
      q(".bs-grid").forEach((el) => tl.to(el, { opacity: 1, duration: 0.5 }, at + 0.05).to(el, { opacity: 0, duration: 0.6 }, at + 1.6));
      q(".bs-block").forEach((el) => tl.to(el, { opacity: 1, scaleY: 1, duration: 0.55 }, at + d(el)).to(el, { outlineColor: "rgba(0,0,0,0)", duration: 0.5 }, at + 1.7));
      q(".bs-paint").forEach((el) => tl.to(el, { backgroundColor: el.getAttribute("data-bg"), duration: 0.6 }, at + 1.5));
      q(".bs-type").forEach((el) => tl.to(el, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "steps(18)" }, at + d(el)));
      q(".bs-pop").forEach((el) => tl.to(el, { opacity: 1, scale: 1, duration: 0.45 }, at + d(el)));
      q(".bs-photo").forEach((el) => tl.to(el, { opacity: 1, duration: 0.8 }, at + 3.05));
      q(".bs-cursor").forEach((el) => tl.to(el, { opacity: 1, x: 0, y: 0, duration: 0.98 }, at + 3.3).to(el, { scale: 0.85, duration: 0.14 }, at + 4.28).to(el, { scale: 1, duration: 0.14 }, at + 4.42));
      q(".bs-check").forEach((el) => tl.to(el, { opacity: 1, duration: 0.3 }, at + 3.75));
      lines.forEach((el) => tl.to(el, { opacity: 1, duration: 0.3 }, at + d(el)));
      if (k < scenes.length - 1) { tl.to(sc, { autoAlpha: 0, y: -8, scale: 0.985, duration: 0.8 }, at + BUILD_SCENE_LEN); tl.to(log, { autoAlpha: 0, duration: 0.3 }, at + BUILD_SCENE_LEN); }
    });
    tl.to({}, { duration: 0.001 }, scenes.length * BUILD_SCENE_LEN); // total = scenes x LEN exactly, so the snap thirds land on finished builds
    ScrollTrigger.refresh();
  });
}

/** GSAP part: called once the library is present. Everything inside gsap.matchMedia(no-preference). */
function initGsap(root: HTMLElement) {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    // registry readouts: count up once, only if they started below the fold; the HTML already holds the final value
    // motion-system.md: at most 3 count-ups tween at once (an anchor jump past two rows of three fires six triggers together)
    let active = 0; const queue: (() => void)[] = [];
    const slot = (start: (done: () => void) => void) => {
      if (active >= 3) { queue.push(() => slot(start)); return; }
      active++; start(() => { active--; queue.shift()?.(); });
    };
    root.querySelectorAll<HTMLElement>(".sf-readout [data-count]").forEach((el) => {
      if (!below(el)) return;
      const n = +el.getAttribute("data-count")!, o = { v: 0 }; el.textContent = "0";
      ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => slot((done) =>
        gsap.to(o, { v: n, duration: 0.9, ease: "power1.out", onUpdate: () => { el.textContent = fmt(o.v); }, onComplete: done })) });
    });

    // the rail scene: rail drawn by scroll (scrub .6); stations fill as it arrives; records and ledger totals arrive once; tick draws last
    root.querySelectorAll<HTMLElement>('[data-scene="rail"]').forEach((fig) => {
      if (!below(fig)) return;
      const svg = Array.from(fig.querySelectorAll("svg")).find((s) => s.getClientRects().length) || fig;
      const rail = svg.querySelector(".rail"), nodes = Array.from(svg.querySelectorAll(".node")), recs = Array.from(svg.querySelectorAll(".rec"));
      const cnts = Array.from(svg.querySelectorAll<SVGElement>(".cnt")), ok = svg.querySelector(".okpath"), okg = svg.querySelector(".ok");
      if (!rail) return;
      gsap.set(rail, { attr: { "stroke-dasharray": 1, "stroke-dashoffset": 1 } });
      gsap.set(nodes, { scale: 0.6, transformOrigin: "center" });
      if (recs.length) gsap.set(recs, { x: -60, opacity: 0 });
      if (ok) gsap.set(ok, { attr: { "stroke-dashoffset": 30 } });
      if (okg) gsap.set(okg, { opacity: 0.25 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 75%", end: "center 40%", scrub: 0.6 } });
      tl.to(rail, { attr: { "stroke-dashoffset": 0 }, ease: "none", duration: 1 }, 0);
      nodes.forEach((n, i) => tl.to(n, { scale: 1, duration: 0.08, ease: "power2.out" }, i / 3 - 0.03));
      ScrollTrigger.create({ trigger: fig, start: "top 55%", once: true, onEnter: () => {
        if (recs.length) gsap.to(recs, { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" });
        cnts.forEach((c) => { const n = +c.getAttribute("data-count")!, o = { v: 0 }; c.textContent = "0"; gsap.to(o, { v: n, duration: 0.9, ease: "power1.out", delay: 0.2, onUpdate: () => { c.textContent = fmt(o.v); } }); });
        if (okg) gsap.to(okg, { opacity: 1, duration: 0.3, delay: 1.05 });
        if (ok) gsap.to(ok, { attr: { "stroke-dashoffset": 0 }, duration: 0.3, ease: "power2.inOut", delay: 1.1 });
      } });
    });

    // magnetic CTAs: desktop pointer only, <= 6px toward the pointer, quickTo; <= 2 per page by convention (hero + desk)
    if (FINE().matches) root.querySelectorAll<HTMLElement>("[data-magnet]").forEach((b) => {
      const xTo = gsap.quickTo(b, "x", { duration: 0.3, ease: "power3.out" }), yTo = gsap.quickTo(b, "y", { duration: 0.3, ease: "power3.out" });
      const zone = b.parentElement || b;
      zone.addEventListener("pointermove", (e: PointerEvent) => {
        const r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        if (Math.abs(dx) < r.width / 2 + 80 && Math.abs(dy) < r.height / 2 + 80) { xTo(Math.max(-6, Math.min(6, dx * 0.08))); yTo(Math.max(-6, Math.min(6, dy * 0.08))); }
        else { xTo(0); yTo(0); }
      });
      zone.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  });
  // the one pin: desktop with room for it, and no reduced-motion preference; nothing is created otherwise
  gsap.matchMedia().add(PIN_MQ, () => initBuildScenes(root));
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
}

/**
 * Wire one Salesforce page. Returns a cleanup. Call from a useEffect on the `.sfv2` root (SfPage does).
 * Safe to call on a page with none of the hooks present: every query is optional.
 */
export function initSfMotion(root: HTMLElement): () => void {
  if (typeof window === "undefined" || window.__oaPrerender) return () => {};
  const cleanups: (() => void)[] = [];
  const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Document, type: K | string, fn: any, opts?: any) => {
    el.addEventListener(type as string, fn, opts); cleanups.push(() => el.removeEventListener(type as string, fn, opts));
  };
  const reduced = RM().matches;
  // units already on screen at load start drawn (measured before .js hides them): nothing above the fold moves on arrival
  root.querySelectorAll<HTMLElement>(".sf-unit, [data-reveal]").forEach((u) => { if (u.getBoundingClientRect().top < innerHeight) u.classList.add("in"); });
  root.classList.add("js");
  cleanups.push(() => root.classList.remove("js"));

  // 1. ledger rules draw once as their unit enters (under reduced motion the CSS never hides them); [data-reveal] figures the same
  const units = Array.from(root.querySelectorAll<HTMLElement>(".sf-unit, [data-reveal]"));
  if (!reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    units.forEach((u) => io.observe(u));
    cleanups.push(() => io.disconnect());
  } else units.forEach((u) => u.classList.add("in"));

  // 2. evidence pop-ups (delegated, so re-rendered buttons keep working)
  let opener: HTMLElement | null = null;
  on(root, "click", (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    const b = t.closest<HTMLElement>("[data-evidence]");
    if (b) {
      const dlg = root.querySelector<HTMLDialogElement>("#ev-" + b.getAttribute("data-evidence"));
      if (!dlg || dlg.open) return;
      opener = b; dlg.showModal();
      const title = dlg.querySelector<HTMLElement>("[data-ev-title]"); title && title.focus();
      return;
    }
    const close = t.closest<HTMLElement>("[data-ev-close]");
    if (close) { close.closest("dialog")?.close(); return; }
    if (t instanceof HTMLDialogElement && t.classList.contains("sf-evidence")) t.close(); // backdrop click
  });
  root.querySelectorAll<HTMLDialogElement>("dialog.sf-evidence").forEach((dlg) => {
    on(dlg, "close", () => { opener && opener.focus({ preventScroll: true }); opener = null; });
  });

  // 3. stage units highlight their station on the rail (information-carrying hover; keyboard too)
  const railFig = root.querySelector<HTMLElement>('[data-scene="rail"]');
  if (railFig) root.querySelectorAll<HTMLElement>("[data-station]").forEach((u) => {
    const k = u.getAttribute("data-station")!, hl = () => railFig.setAttribute("data-hl", k), off = () => railFig.removeAttribute("data-hl");
    on(u, "mouseenter", hl); on(u, "mouseleave", off); on(u, "focusin", hl); on(u, "focusout", off);
  });
  // 3b. the same for any plate: a row with data-hl-for="<figure id>" data-hl-key="k" sets data-hl="k" on that figure
  root.querySelectorAll<HTMLElement>("[data-hl-for][data-hl-key]").forEach((u) => {
    const fig = document.getElementById(u.getAttribute("data-hl-for")!); if (!fig) return;
    const k = u.getAttribute("data-hl-key")!, hl = () => fig.setAttribute("data-hl", k), off = () => fig.removeAttribute("data-hl");
    on(u, "mouseenter", hl); on(u, "mouseleave", off); on(u, "focusin", hl); on(u, "focusout", off);
  });
  // 3c. the build stage below the pin's media query: scene 1's CSS keyframes play once when the figure reaches 70% of the viewport
  const builds = Array.from(root.querySelectorAll<HTMLElement>('[data-scene="build"]'));
  if (builds.length && !reduced && "IntersectionObserver" in window) {
    const bio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("play"); bio.unobserve(e.target); } }), { rootMargin: "0px 0px -30% 0px" });
    builds.forEach((b) => bio.observe(b));
    cleanups.push(() => bio.disconnect());
  }

  // 4. card tilt: fine pointers only, transform written directly (no CSS-var recalc), <= 3deg
  if (FINE().matches && !reduced) root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((c) => {
    let raf = 0, ev: PointerEvent | null = null;
    const paint = () => { raf = 0; if (!ev) return; const r = c.getBoundingClientRect(); const x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
      c.style.transform = "perspective(1200px) rotateX(" + (-y * 6).toFixed(2) + "deg) rotateY(" + (x * 6).toFixed(2) + "deg) translateZ(0)"; };
    on(c, "pointermove", (e: PointerEvent) => { ev = e; if (!raf) raf = requestAnimationFrame(paint); });
    on(c, "pointerleave", () => { c.style.transform = ""; });
  });

  // 5. staged scenes
  bootIllus(root);

  // 6. GSAP, lazily, never under reduced motion
  if (reduced) { railFig && railFig.classList.add("static"); return () => cleanups.forEach((f) => f()); }
  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-scene], [data-count], [data-magnet]"));
  if (!targets.length) return () => cleanups.forEach((f) => f());
  let done = false, anchorId = "", anchorAt = 0;
  // ScrollTrigger's set-up refresh restores the scroll position, which stops a native smooth scroll in flight: tapping
  // "#start" before GSAP is present (the first scroll is what loads it) left iPhone WebKit ~140px down the page.
  // ponytail: remember the last in-page anchor tap and replay it once GSAP is set up (4s window).
  on(document, "click", (e: MouseEvent) => { const a = (e.target as HTMLElement).closest?.('a[href^="#"]'); if (a) { anchorId = a.getAttribute("href")!.slice(1); anchorAt = Date.now(); } });
  const load = () => { if (done) return; done = true; loadGsap().then(() => {
    if (!root.isConnected) return;
    initGsap(root);
    const el = anchorId && Date.now() - anchorAt < 4000 ? document.getElementById(anchorId) : null;
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }); };
  const watch = () => {
    if ("IntersectionObserver" in window) {
      const lio = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { load(); lio.disconnect(); } }, { rootMargin: "300px 0px" });
      targets.forEach((t) => lio.observe(t));
      cleanups.push(() => lio.disconnect());
    } else load();
  };
  on(window as unknown as Document, "scroll", watch, { once: true, passive: true });
  root.querySelectorAll<HTMLElement>("[data-magnet]").forEach((b) => on(b, "pointerenter", load, { once: true }));
  return () => cleanups.forEach((f) => f());
}
