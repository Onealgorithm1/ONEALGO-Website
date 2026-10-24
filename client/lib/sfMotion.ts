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
  root.classList.add("js");
  cleanups.push(() => root.classList.remove("js"));

  // 1. ledger rules draw once as their unit enters (under reduced motion the CSS never hides them)
  const units = Array.from(root.querySelectorAll<HTMLElement>(".sf-unit"));
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
