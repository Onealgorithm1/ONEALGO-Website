import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useHeroVideo } from "@/lib/heroVideo";
import { PrimaryCTA, SecondaryCTA } from "./site";

/* HeroSlides — the hero on /services/website-development.
 *
 * ⭐ 2026-08-24: this was a fourteen-frame carousel. Louis cut it to nine, then
 * to six, then to five, then to ONE: "i only want frame 4 — called Rebuild".
 *
 * ⛔ THE REMOVED FRAMES ARE NOT IN GIT. This file has never been committed —
 * it was untracked for the whole of the 2026-08-24 session, so there is no
 * history to check out and no earlier blob to recover. The frames that went:
 * Statement (WebGL prism), Play (UFO), Space (CSS corridor), Journey (tunnel
 * shader), Clear thinking (floating paths), plus the robot, the brand video,
 * the wave and five others cut earlier the same day. Anyone who wants one back
 * rebuilds it. Commit this file and that stops being true.
 *
 * WHAT THE CUT BOUGHT. Every import left in this file is React or
 * framer-motion. The frames that went took the WebGL shader runtime, the lazy
 * UFO chunk, the spotlight, the liquid-glass button and the kinetic headline
 * with them — on top of the three.js chunk (943KB / 249KB gzipped) the robot
 * frame dropped earlier. LCP on this page was the reason the carousel started
 * getting cut in the first place.
 *
 * WHAT IS LEFT. The brand film, and a canvas of particles in front of it. Text
 * is rasterised to an offscreen buffer, sampled on a grid, and every opaque
 * pixel becomes a particle that springs home, flees the pointer, and scatters
 * for 1.4s every 6s. The canvas clears to transparent each frame so the film
 * reads through it.
 *
 * ⛔ THE VIDEO IS BACK, AND THE PAGE'S CLAIMS CHANGED WITH IT. Louis, 2026-08-24:
 * "chenge the background to our hero video on web page with the particles in
 * front of it". This page previously asserted "there is no video and no
 * photography anywhere on this page" in its lede, its hero copy and its FAQ —
 * that is exactly why the brand film was cut from the old carousel in the first
 * place. All three claims were rewritten in the same change. ⛔ If the video is
 * ever removed again, do not silently restore the old absolute wording; it was
 * wrong even then, because the header logo is an image.
 *
 * The film is gated by useHeroVideo(): wide viewport, no reduced-motion request,
 * no Save-Data header. When any of those fail the <source> elements are never
 * rendered, so the 746KB webm is not merely paused — it is never fetched — and
 * the 70KB poster stands in.
 *
 * Credit: after the 21st.dev "Magic Text Reveal" pattern; hand-built, no library.
 *
 * The subline under the canvas ("Move your cursor through the letters…") was
 * cut by Louis on 2026-08-24 along with the pointer-parallax hook that moved
 * it. The frame is the canvas and nothing else now.
 *
 * ACCESSIBILITY. The canvas is aria-hidden and the <h1> immediately below
 * carries the identical words, so the headline is announced once rather than
 * twice. ⛔ That makes the h1 the ONLY text route to this headline — do not
 * change one without the other. prefers-reduced-motion parks every particle on its home
 * pixel and stops the loop outright — no rAF, no scatter — and withholds the
 * film's <source> elements so it is never fetched. */

/* ponytail: the two brand inks are literals rather than CSS custom properties —
   canvas cannot read var(), and getComputedStyle per frame is worse than a
   literal. Ceiling: a brand recolour has to touch this file too. */
/* Brand navy. Was #030f1a, a near-black that did not match anything else on
   the site — Louis, 2026-08-24: "make sure the hero background is the same
   brand blue not black". This is oa.night, the same ground the intro section
   and the footer use, so the hero and the section under it are one surface. */
const NIGHT = "#04182b";
const ORANGE = "#ffa634";

/* Percent of its own height the film travels across one pass of the hero. The
   film is rendered 130% tall (.hs-film), so 15% keeps both of its edges outside
   the frame at either extreme. ⛔ Raise this past half the overshoot and bare
   ground appears at the top or bottom of the hero — the two numbers are a pair. */
const PARALLAX_SHIFT = 15;

/* ⛔ These two lines MUST stay in step with the <h1> on
   client/pages/services/WebsiteDevelopment.tsx and with the copies in
   scripts/hero-frame-check.mjs. The canvas is aria-hidden, so the h1 is the
   only route a screen reader has to this headline — if they drift apart,
   sighted and non-sighted visitors read different pages, and the check fails.
   Was "Break apart. / Come back stronger." until Louis replaced it on
   2026-08-24: a brand slogan that never said what the firm sells, on the page
   meant to rank for people searching exactly that. */
const LINE_A = "Custom website design";
const LINE_B = "and development";

export default function HeroFrame() {
  const ref = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const playVideo = useHeroVideo();

  /* Background parallax: the film drifts against the scroll instead of tracking
     it one-to-one, so the hero has depth without a second asset. Transform only,
     so it stays on the compositor and never triggers layout. Off entirely under
     reduced motion. */
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start start", "end start"] });
  const filmY = useTransform(scrollYProgress, [0, 1], ["0%", `${PARALLAX_SHIFT}%`]);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0, dot = 2;
    const t0 = performance.now();
    /* Governs the timed scatter AND the mouse listeners — not touch, which is
       always on now. The burst stays desktop-only: at phone type sizes it reads
       as a rendering fault rather than as drama. */
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const pts: { hx: number; hy: number; x: number; y: number; vx: number; vy: number; c: string }[] = [];
    const mouse = { x: -1e4, y: -1e4 };

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      W = Math.floor(r.width); H = Math.floor(r.height); if (!W || !H) return;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const off = document.createElement("canvas"); off.width = W; off.height = H;
      const o = off.getContext("2d")!;
      /* Fit the longer line to 88% of the frame rather than guessing from a
         width ratio. The old Math.min(W/9, 120) clipped "Come back stronger."
         between roughly 1080px and 1440px, where the 120px cap stopped the
         type shrinking but the frame had not yet grown to hold it. Measure,
         then scale — two measureText calls at build time, not per frame. */
      o.textAlign = "center"; o.textBaseline = "middle";
      /* Narrow frames get a bigger share of their width. At 390px the old
         W/8 cap resolved to ~35px inside a 780px-tall hero — under 10% of the
         frame, and smaller than the h1 further down the page. */
      /* ⛔ DESKTOP AND MOBILE ARE TUNED SEPARATELY ON PURPOSE. Louis,
         2026-08-25: "our hero desktop image is small when we adjusted for the
         mobile view they have to be independent." They were one expression with
         two ternaries in it, so every mobile correction moved desktop too.
         Change one row of this table without touching the other.

         `share` is how much of the frame width the longer line fills; `cap` only
         binds on very wide screens, because in practice `share` is what decides
         the size — 21 characters fitted to 92% of a 1521px frame lands near
         130px, and the cap never comes into it. */
      const TYPE = W < 640
        ? { share: 0.90, cap: 132 }   // phones: the frame is short, the type is the whole frame
        : { share: 0.92, cap: 260 };  // desktop: fill the width; the film reads around it
      const FIT = W * TYPE.share;
      let size = Math.min(W / (W < 640 ? 6.2 : 6.5), TYPE.cap);
      o.font = `800 ${size}px "IBM Plex Sans", system-ui, sans-serif`;
      const widest = Math.max(o.measureText(LINE_A).width, o.measureText(LINE_B).width);
      if (widest > FIT) {
        size = Math.max(22, Math.floor(size * (FIT / widest)));
        o.font = `800 ${size}px "IBM Plex Sans", system-ui, sans-serif`;
      }
      o.fillStyle = "#fff"; o.fillText(LINE_A, W / 2, H / 2 - size * 0.62);
      o.fillStyle = ORANGE; o.fillText(LINE_B, W / 2, H / 2 + size * 0.62);
      /* ⛔ TBT. This used to getImageData over the WHOLE canvas and scan every
         pixel of it — ~300k samples at 390px, ~1.2M at 1440px, all on the main
         thread during hydration. Lighthouse mobile measured TBT 360ms against a
         200ms budget. The type only ever occupies a band around the vertical
         centre, so read back just that band: same particles, roughly a third of
         the pixels. bandY/bandH are derived from the same numbers the fillText
         calls use, so they cannot drift out of step with the type. */
      const bandH = Math.min(H, Math.ceil(size * 3.2));
      const bandY = Math.max(0, Math.floor(H / 2 - bandH / 2));
      const d = o.getImageData(0, bandY, W, bandH).data;
      pts.length = 0;
      /* Sampling grid follows the TYPE, not the viewport. It used to be
         `W < 640 ? 4 : 3`, which at 390px sampled a ~36px glyph every 4px and
         left the headline as an unreadable dotted outline. Tying the step to
         the font size keeps the same particles-per-letter at every width. */
      const step = Math.max(2, Math.round(size / 37));
      /* ⛔ THE DOT MUST SCALE WITH THE GRID. It was a flat 2px at every size.
         On desktop the grid is 4px, so a 2px dot fills a quarter of its cell
         and the letters read as separated dots. On a phone the grid drops to
         2px, and a 2px dot fills its cell completely — the dots fuse and the
         headline turns into solid blocky letterforms. Louis, 2026-08-24: "the
         dots ... very blocky looking it doesnt look like tiny dots". Holding
         dot = half the grid keeps the same 25% fill, and therefore the same
         texture, at every width. */
      dot = Math.max(1, step / 2);
      for (let y = 0; y < bandH; y += step) for (let x = 0; x < W; x += step) {
        const k = (y * W + x) * 4;
        if (d[k + 3] > 128) pts.push({ hx: x, hy: y + bandY, x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, c: d[k] > 250 && d[k + 2] > 250 ? "#ffffff" : ORANGE });
      }
      /* ⛔ Under reduced motion the loop draws ONE frame and stops, so build()
         has to repaint itself or the hero is blank. It measured blank: on mount
         the canvas has no size yet, build() bails at the !W guard, the single
         frame paints an empty background, and the ResizeObserver's later build()
         fills pts with nothing left running to draw them. Setting canvas.width
         also clears the canvas, so every resize had the same effect. */
      if (reduced) frame(performance.now());
    };

    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      /* ⛔ Only where there is a pointer. At desktop sizes the 1.4s scatter
         every 6s reads as the point of the piece; at phone sizes the type is
         small enough that it just reads as broken rendering, and it was
         illegible for 23% of the time the visitor spent on the first screen. */
      const burst = !reduced && finePointer && (t % 6) > 4.6;
      /* Transparent, not NIGHT. The film is behind this canvas and an opaque
         fill would hide it. Particles therefore leave no trail, which is what
         the spring motion wants anyway. */
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        if (reduced) { p.x = p.hx; p.y = p.hy; }
        else {
          const dx = p.hx - p.x, dy = p.hy - p.y;
          p.vx += dx * 0.06; p.vy += dy * 0.06;
          const mx = p.x - mouse.x, my = p.y - mouse.y, md = mx * mx + my * my;
          if (md < 6400) { const s = Math.sqrt(md) || 1, f = (80 - s) * 0.12; p.vx += (mx / s) * f; p.vy += (my / s) * f; }
          if (burst && Math.random() < 0.05) { p.vx += (Math.random() - 0.5) * 24; p.vy += (Math.random() - 0.5) * 24; }
          p.vx *= 0.82; p.vy *= 0.82; p.x += p.vx; p.y += p.vy;
        }
        ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, dot, dot);
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    /* ⛔ Do NOT build on the hydration tick. Rasterising the type and sampling
       it is a few hundred thousand array reads, and running it inline put a
       346ms long task on the main thread during load — the single biggest slice
       of this page's Total Blocking Time. The night ground is painted by CSS on
       `.hg-s`, so the frame looks finished the whole time; only the particles
       arrive a beat later. Resize rebuilds stay synchronous — by then the page
       is interactive and the user is waiting to see the result. */
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };
    const start = () => { build(); raf = requestAnimationFrame(frame); };
    const idle = w.requestIdleCallback
      ? w.requestIdleCallback(start, { timeout: 900 })
      : window.setTimeout(start, 1);
    const ro = new ResizeObserver(() => { if (pts.length) build(); }); ro.observe(canvas);
    const mv = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const out = () => { mouse.x = -1e4; mouse.y = -1e4; };
    /* ⛔ TOUCH WITHOUT TAKING THE SCROLL. The first version called
       setPointerCapture on pointerdown with touch-action:none in CSS, which is
       the usual way to read a finger — and it swallowed every swipe on the
       first screen of a phone. Louis, on a real handset: "I can't scroll down
       the hero image animation keeps moving and will not allow me to scroll."
       The second version simply switched touch off, which cost the effect.

       Both were wrong, because a PASSIVE touch listener already does what is
       wanted here. Passive is a promise never to call preventDefault, so the
       browser never blocks on us and scrolling runs at full speed — while every
       coordinate is still delivered. The particles therefore react WHILE the
       page scrolls under the finger, and a horizontal slide (which scrolls
       nothing) just drives the effect.

       ⛔ These three listeners must stay passive and nothing here may set
       touch-action. Drop either and the swipe is stolen again. There is a check
       for it: "TOUCH: a swipe over the hero scrolls the page". */
    const touch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const r = canvas.getBoundingClientRect();
      mouse.x = t.clientX - r.left;
      mouse.y = t.clientY - r.top;
    };
    canvas.addEventListener("touchstart", touch, { passive: true });
    canvas.addEventListener("touchmove", touch, { passive: true });
    canvas.addEventListener("touchend", out, { passive: true });
    canvas.addEventListener("touchcancel", out, { passive: true });
    /* A mouse has no touchend, so it needs pointerleave to let the field go. */
    if (finePointer) {
      canvas.addEventListener("pointermove", mv, { passive: true });
      canvas.addEventListener("pointerleave", out, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle); else window.clearTimeout(idle);
      canvas.removeEventListener("touchstart", touch);
      canvas.removeEventListener("touchmove", touch);
      canvas.removeEventListener("touchend", out);
      canvas.removeEventListener("touchcancel", out);
      canvas.removeEventListener("pointermove", mv);
      canvas.removeEventListener("pointerleave", out);
    };
  }, [reduced]);

  return (
    <div className="hg">
      <div className="hg-slide">
        <article ref={frameRef} className="hg-s" style={{ background: NIGHT }}>
          <motion.video
            className="hs-film"
            style={reduced ? undefined : { y: filmY }}
            autoPlay={playVideo}
            muted
            loop
            playsInline
            preload="none"
            poster="/media/hero-poster.webp"
            aria-hidden="true"
          >
            {playVideo && (
              <>
                <source src="/media/hero.webm" type="video/webm" />
                <source src="/media/hero.mp4" type="video/mp4" />
              </>
            )}
          </motion.video>
          {/* Without this the white particles sit on the brightest part of the
              film and stop being readable. Same navy as the ground, so the frame
              still reads as one surface with the section below it. */}
          <div className="hs-scrim" aria-hidden="true" />
          {/* A band over the type, not the whole hero. Full-bleed meant the reactive
              surface covered the entire first screen — Louis: "the animation
              footprint area is too big. It should be over the text not the
              entire hero." The particles scatter inside this band, so the film
              above and below it stays clean. */}
          <canvas ref={ref} className="hs-band" aria-hidden="true" />

          {/* The tagline and the actions, moved INTO the hero on 2026-08-25.
              Louis: "remove the section underneath the hero bring the call to
              action up and use our tagline". The section below carried the h1,
              a lede and these two buttons; a visitor had to scroll past a full
              screen of hero before anything asked them to do something.

              ⛔ THE <h1> IS sr-only AND THAT IS DELIBERATE. The canvas above
              renders exactly this string as particles, so this is the standard
              image-replacement pattern: the words are real text for a screen
              reader and for Google, and the canvas is their visual form. It is
              NOT the old empty-hero problem — that hero had an sr-only h1 with
              nothing on screen corresponding to it. If the canvas text ever
              changes, change this string with it or the page starts lying. */}
          <div className="hs-copy">
            <h1 className="sr-only">Custom website design and development</h1>
            <p className="hs-tag">From Strategy to Support</p>
            <p className="hs-sub">
              Think bigger. Build smarter. Move faster — with technology
              solutions tailored to you.
            </p>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row">
              <PrimaryCTA to="/contact">Start a project</PrimaryCTA>
              <SecondaryCTA href="tel:+16108909711">
                Call (610) 890-9711
              </SecondaryCTA>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
