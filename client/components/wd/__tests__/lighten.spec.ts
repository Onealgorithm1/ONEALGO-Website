import { describe, it, expect } from "vitest";
// @ts-expect-error plain .mjs generator helper
import { lighten } from "../../../../scripts/local-context.mjs";

describe("lighten (place-name density helper)", () => {
  it("keeps the first state mention and drops later ones", () => {
    expect(lighten("Texas residents and Texas residents", "Texas")).toBe("Texas residents and residents");
  });
  it("does not touch a longer word that merely contains the state name", () => {
    expect(lighten("Texasville residents", "Texas")).toBe("Texasville residents");
  });
});
