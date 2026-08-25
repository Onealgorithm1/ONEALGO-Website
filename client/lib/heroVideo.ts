import React from "react";

/* Shared by the homepage and /services/website-development. Lives here rather
   than in a page module because importing it from the homepage would have
   pulled the entire homepage into the other route's chunk. Index.tsx
   re-exports both names, so client/pages/Index.spec.ts is unchanged. */

export function shouldPlayHeroVideo(env: {
  reducedMotion: boolean;
  wideViewport?: boolean;
  saveData: boolean;
}) {
  return !env.reducedMotion && !env.saveData;
}

/**
 * Whether the hero film should be attached and playing.
 *
 * Three gates, all of which must be open:
 *
 *   1. The environment allows it — no reduced-motion request, no Save-Data.
 *      (shouldPlayHeroVideo, unchanged, and the spec covers it.)
 *   2. ⛔ FIRST PAINT HAS HAPPENED. Until 2026-08-25 `play` went true in the
 *      mount effect, so `<video autoplay>` began fetching the 729KB film at
 *      once — before the CSS, the fonts and the 69KB poster the visitor
 *      actually sees first. On Lighthouse's mobile throttle that film alone
 *      is ~3.6s of bandwidth, all of it spent ahead of first paint. The
 *      signal is the `first-contentful-paint` entry from a PerformanceObserver
 *      with `buffered: true`, because this effect can easily run AFTER the
 *      paint and an unbuffered observer would never fire. `load` was
 *      considered and rejected by the reviewer: it is not a paint signal, and
 *      it starts the film for a visitor who has already scrolled away.
 *   3. The hero is on screen, when a ref is given. A visitor who lands and
 *      scrolls straight past the hero does not pay for a film they will not
 *      see. Once started, the film stays started — un-attaching sources on
 *      every scroll would re-fetch on every return.
 *
 * The <source> elements are rendered only while this is true, so nothing is
 * requested until every gate is open. `preload="none"` alone does not stop a
 * fetch once `autoplay` and a source are present.
 */
export function useHeroVideo(ref?: React.RefObject<HTMLVideoElement | null>) {
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    let allowed = false;
    let painted = false;
    let visible = !ref; // no ref → visibility is not a gate
    let started = false;

    const update = () => {
      if (allowed && painted && visible) started = true;
      setPlay(started && allowed);
    };
    const env = () => {
      allowed = shouldPlayHeroVideo({
        reducedMotion: motion.matches,
        wideViewport: wide.matches,
        saveData:
          (navigator as Navigator & { connection?: { saveData?: boolean } })
            .connection?.saveData === true,
      });
      update();
    };
    env();
    motion.addEventListener("change", env);
    wide.addEventListener("change", env);

    let po: PerformanceObserver | undefined;
    if (typeof PerformanceObserver !== "undefined") {
      try {
        po = new PerformanceObserver((list) => {
          if (list.getEntries().some((e) => e.name === "first-contentful-paint")) {
            painted = true;
            po?.disconnect();
            update();
          }
        });
        po.observe({ type: "paint", buffered: true });
      } catch {
        // A browser without the paint entry type: do not hold the film
        // hostage to a signal that will never come.
        painted = true;
        update();
      }
    } else {
      painted = true;
      update();
    }

    let io: IntersectionObserver | undefined;
    const el = ref?.current;
    if (ref && el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          update();
        },
        { threshold: 0.01 },
      );
      io.observe(el);
    } else if (ref) {
      visible = true;
      update();
    }

    return () => {
      motion.removeEventListener("change", env);
      wide.removeEventListener("change", env);
      po?.disconnect();
      io?.disconnect();
    };
  }, [ref]);

  return play;
}
