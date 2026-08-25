import React from "react";

/* Hero video gating. Lifted out of Index.tsx on 2026-08-24 so
   /services/website-development could reuse it — importing it from the page
   module would have pulled the entire homepage into that route's chunk.
   Index.tsx re-exports both names, so client/pages/Index.spec.ts is unchanged. */

/** ⛔ THE VIEWPORT GATE IS GONE — 2026-08-24, at Louis's direction: "the video
 *  isn't playing on home and website page", reported from his own phone after
 *  he had been told the gate existed.
 *
 *  What it used to say, and why it was wrong to keep: the film is 746KB of webm
 *  and on a phone the scrim reduces it to dark texture, so paying three quarters
 *  of a megabyte on a cellular connection for something you cannot tell is
 *  moving was a byte that had not earned its place. That reasoning was sound for
 *  the homepage's heavy scrim. It stopped being sound when the same component
 *  became the hero of /services/website-development, where the film IS the
 *  background and its absence reads as a broken page.
 *
 *  ⛔ THE COST IS REAL AND IT IS NOW PAID ON PHONES: 746KB webm / 576KB mp4, on
 *  a page already over its LCP and TBT budget. `preload="none"` and the 70KB
 *  poster keep it off the critical path — it is fetched after first paint, not
 *  before — but it is fetched.
 *
 *  The two remaining conditions are not preferences, they are the visitor's
 *  explicit instructions, and they stay: a reduced-motion request, and a
 *  Save-Data header. In both cases the <source> elements are never rendered, so
 *  nothing is downloaded at all rather than merely paused. */
export function shouldPlayHeroVideo(env: {
  reducedMotion: boolean;
  /** Retained so callers and the spec keep compiling; deliberately unused. */
  wideViewport?: boolean;
  saveData: boolean;
}) {
  return !env.reducedMotion && !env.saveData;
}

/** Returns false on the server and on the first client render, which is the
 *  point: the prerendered HTML then contains no <source> at all, so nothing
 *  can start fetching before the decision has been made. */
/** Returns false on the server and on the first client render, which is the
 *  point: the prerendered HTML then contains no <source> at all, so nothing
 *  can start fetching before the decision has been made. */
export function useHeroVideo() {
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Kept only so the existing add/removeEventListener wiring below is
    // unchanged; the width no longer decides anything.
    const wide = window.matchMedia("(min-width: 768px)");
    const update = () =>
      setPlay(
        shouldPlayHeroVideo({
          reducedMotion: motion.matches,
          wideViewport: wide.matches,
          // Not in every browser's typings, and absent entirely in Safari.
          saveData:
            (navigator as Navigator & { connection?: { saveData?: boolean } })
              .connection?.saveData === true,
        }),
      );

    update();
    motion.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, []);

  return play;
}

