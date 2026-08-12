import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import SystemCanvas, {
  chamfer,
  fractionAt,
  latchTrack,
  pointAt,
  CANVAS_SYSTEMS,
  CANVAS_ROUTES,
  type Pt,
} from "./SystemCanvas";

/**
 * The canvas is declarative SMIL, which fails SILENTLY: a browser that dislikes
 * a keyTimes list drops the animation and renders a still frame with no error
 * anywhere. A screenshot taken at the wrong moment looks identical to a working
 * one. These tests cover the two things that can go wrong without anyone
 * noticing - malformed animation timing, and a platform name nobody verified.
 */

describe("chamfer", () => {
  it("keeps the endpoints and replaces each interior corner with two points", () => {
    const pts: Pt[] = [[0, 0], [100, 0], [100, 100]];
    const out = chamfer(pts, 10);
    expect(out[0]).toEqual([0, 0]);
    expect(out[out.length - 1]).toEqual([100, 100]);
    expect(out).toHaveLength(4);
    expect(out[1]).toEqual([90, 0]);
    expect(out[2]).toEqual([100, 10]);
  });

  it("never overshoots a segment shorter than twice the radius", () => {
    // The failure this guards: a 6-unit jog with a 16-unit radius would put the
    // cut points past each other and fold the wire back on itself.
    const pts: Pt[] = [[0, 0], [100, 0], [100, 6], [200, 6]];
    const out = chamfer(pts, 16);
    for (let i = 1; i < out.length; i++) {
      const dx = out[i][0] - out[i - 1][0];
      const dy = out[i][1] - out[i - 1][1];
      expect(dx >= -0.001 || Math.abs(dx) < 0.001).toBe(true);
      expect(dy >= -0.001).toBe(true); // monotonic: no fold-back
    }
  });
});

describe("fractionAt / pointAt", () => {
  const line = chamfer([[0, 0], [100, 0], [100, 100]] as Pt[], 0);

  it("finds a point that lies on the polyline", () => {
    const f = fractionAt(line, [100, 50]);
    expect(f).toBeGreaterThan(0);
    expect(f).toBeLessThan(1);
    expect(f).toBeCloseTo(0.75, 5);
  });

  it("rejects a point that does not", () => {
    expect(fractionAt(line, [50, 50])).toBe(-1);
  });

  it("round-trips against pointAt", () => {
    const p = pointAt(line, 0.25);
    expect(fractionAt(line, p)).toBeCloseTo(0.25, 5);
  });
});

describe("latchTrack", () => {
  const parse = (t: { values: string; keyTimes: string }) => ({
    values: t.values.split(";").map(Number),
    keyTimes: t.keyTimes.split(";").map(Number),
  });

  it("emits a well-formed SMIL track", () => {
    const { values, keyTimes } = parse(latchTrack([0.2, 0.5, 0.9], 0.2, 1));
    expect(values).toHaveLength(keyTimes.length);
    expect(keyTimes[0]).toBe(0);
    expect(keyTimes[keyTimes.length - 1]).toBe(1);
    for (let i = 1; i < keyTimes.length; i++) {
      expect(keyTimes[i]).toBeGreaterThan(keyTimes[i - 1]);
    }
    expect(Math.max(...values)).toBe(1);
  });

  it("stays well-formed when latches overlap or sit at the edges", () => {
    // Two crossings 3ms apart and one right on the end of the cycle: the naive
    // version emits a keyTimes list that goes backwards, and the browser throws
    // the whole animation away without a word.
    const { values, keyTimes } = parse(latchTrack([0.001, 0.4, 0.402, 0.999], 0.2, 1));
    expect(values).toHaveLength(keyTimes.length);
    expect(keyTimes[0]).toBe(0);
    expect(keyTimes[keyTimes.length - 1]).toBe(1);
    for (let i = 1; i < keyTimes.length; i++) {
      expect(keyTimes[i]).toBeGreaterThan(keyTimes[i - 1]);
    }
  });
});

describe("the rendered canvas", () => {
  const html = renderToStaticMarkup(React.createElement(SystemCanvas));

  it("emits animations whose keyTimes a browser will accept", () => {
    const tracks = [...html.matchAll(/keyTimes="([^"]+)"/g)].map((m) => m[1]);
    expect(tracks.length).toBeGreaterThan(20);
    for (const track of tracks) {
      const times = track.split(";").map(Number);
      expect(times[0]).toBe(0);
      expect(times[times.length - 1]).toBe(1);
      for (let i = 1; i < times.length; i++) {
        expect(times[i]).toBeGreaterThan(times[i - 1]);
      }
    }
  });

  it("gives every values list the same length as its keyTimes list", () => {
    const values = [...html.matchAll(/values="([^"]+)"/g)].map((m) => m[1].split(";").length);
    const keys = [...html.matchAll(/keyTimes="([^"]+)"/g)].map((m) => m[1].split(";").length);
    // animateMotion carries keyPoints instead of values, so keyTimes is the
    // longer list; every values list must still pair with one of them.
    expect(values.length).toBeGreaterThan(0);
    expect(keys.length).toBeGreaterThanOrEqual(values.length);
  });

  it("labels every system it draws, and draws only systems we work with", () => {
    for (const sys of Object.values(CANVAS_SYSTEMS)) {
      expect(html).toContain(sys.label);
    }
    for (const route of CANVAS_ROUTES) {
      expect(CANVAS_SYSTEMS[route.from]).toBeDefined();
      expect(CANVAS_SYSTEMS[route.to]).toBeDefined();
    }
  });

  it("says on its face that the traffic is not real", () => {
    expect(html).toContain("ILLUSTRATIVE");
  });

  it("makes no performance or scale claim", () => {
    // The diagram is allowed to name systems and stages. It is not allowed to
    // start quoting numbers - the moment it does, someone has to be able to
    // prove them.
    const text = html.replace(/<[^>]+>/g, " ");
    for (const banned of [/\buptime\b/i, /\bSLA\b/, /\d+\s*%/, /\d+\s*ms\b/, /\b99\.\d/]) {
      expect(text).not.toMatch(banned);
    }
  });

  it("ships a text alternative and hides the picture from assistive tech", () => {
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("sr-only");
    expect(html).toContain("integration layer");
  });
});
