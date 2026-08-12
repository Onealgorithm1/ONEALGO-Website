import { describe, expect, it } from "vitest";
import { shouldPlayHeroVideo } from "./Index";

/* The hero video is 746KB of webm behind a scrim that, on a phone, reduces it
   to dark texture you cannot tell is moving. Three separate conditions have to
   hold before it is fetched, and each one is easy to drop silently in a later
   edit -- nothing about the page LOOKS wrong when a phone starts downloading
   three quarters of a megabyte it will never show. Hence this. */

const env = (over: Partial<Parameters<typeof shouldPlayHeroVideo>[0]> = {}) => ({
  reducedMotion: false,
  wideViewport: true,
  saveData: false,
  ...over,
});

describe("shouldPlayHeroVideo", () => {
  it("plays only on a wide viewport, with motion allowed and no data saver", () => {
    expect(shouldPlayHeroVideo(env())).toBe(true);
  });

  it("never plays on a narrow viewport", () => {
    expect(shouldPlayHeroVideo(env({ wideViewport: false }))).toBe(false);
  });

  it("never plays when the visitor asked for reduced motion", () => {
    expect(shouldPlayHeroVideo(env({ reducedMotion: true }))).toBe(false);
  });

  it("never plays when the visitor asked to save data", () => {
    expect(shouldPlayHeroVideo(env({ saveData: true }))).toBe(false);
  });

  it("stays off when several reasons apply at once", () => {
    expect(
      shouldPlayHeroVideo({
        reducedMotion: true,
        wideViewport: false,
        saveData: true,
      }),
    ).toBe(false);
  });
});
