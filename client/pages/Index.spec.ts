import { describe, expect, it } from "vitest";
import { shouldPlayHeroVideo } from "./Index";

/* The hero film is 746KB of webm. Two conditions have to hold before it is
   fetched, and each is easy to drop silently in a later edit -- nothing about
   the page LOOKS wrong when a visitor who asked for reduced motion or for
   Save-Data starts downloading three quarters of a megabyte. Hence this.

   ⛔ The viewport condition was REMOVED on 2026-08-24. It used to block the
   film below 768px to spare phones the download. Louis reversed it after
   seeing a still hero on his own handset -- on /services/website-development
   the film is the background, and its absence reads as a broken page. The two
   conditions left are the visitor's explicit instructions, not our guess about
   their connection, which is why they stay. */
const env = (over: Partial<Parameters<typeof shouldPlayHeroVideo>[0]> = {}) => ({
  reducedMotion: false,
  wideViewport: true,
  saveData: false,
  ...over,
});

describe("shouldPlayHeroVideo", () => {
  it("plays when motion is allowed and no data saver is set", () => {
    expect(shouldPlayHeroVideo(env())).toBe(true);
  });

  it("plays on a narrow viewport too -- the width gate was removed", () => {
    expect(shouldPlayHeroVideo(env({ wideViewport: false }))).toBe(true);
  });

  it("never plays when the visitor asked for reduced motion", () => {
    expect(shouldPlayHeroVideo(env({ reducedMotion: true }))).toBe(false);
  });

  it("never plays when the visitor asked to save data", () => {
    expect(shouldPlayHeroVideo(env({ saveData: true }))).toBe(false);
  });

  it("stays off when both remaining reasons apply at once", () => {
    expect(
      shouldPlayHeroVideo({
        reducedMotion: true,
        wideViewport: false,
        saveData: true,
      }),
    ).toBe(false);
  });
});
