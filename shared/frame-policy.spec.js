import { describe, expect, it } from "vitest";
import { frameAllowed } from "./frame-policy.js";

/* Each case is a header set a site we list actually sent (curl, 2026-10-29) or a spec rule that decides it.
   A wrong "allowed" here is a blank preview on onealgorithm.com, which is the bug this exists to stop. */
const OA = "https://onealgorithm.com";
const h = (o) => new Headers(o);

describe("frameAllowed", () => {
  it("no framing headers -> allowed (TBP, Gorband, Starzi)", () => {
    expect(frameAllowed(h({}), OA).allowed).toBe(true);
  });
  it("Phantom 2026-10-29: XFO SAMEORIGIN + frame-ancestors 'self' -> blocked", () => {
    const r = frameAllowed(h({ "x-frame-options": "SAMEORIGIN", "content-security-policy": "default-src 'self'; frame-ancestors 'self'; base-uri 'self'" }), OA);
    expect(r).toEqual({ allowed: false, reason: "frame-ancestors 'self'" });
  });
  it("Atlas: XFO DENY + frame-ancestors 'none' -> blocked", () => {
    expect(frameAllowed(h({ "x-frame-options": "DENY", "content-security-policy": "frame-ancestors 'none'" }), OA).allowed).toBe(false);
  });
  it("ITH: frame-ancestors lists onealgorithm.com -> allowed, and it overrides XFO", () => {
    const csp = "frame-ancestors 'self' https://onealgorithm.com https://www.onealgorithm.com";
    expect(frameAllowed(h({ "content-security-policy": csp }), OA).allowed).toBe(true);
    expect(frameAllowed(h({ "content-security-policy": csp, "x-frame-options": "DENY" }), OA).allowed).toBe(true);
    expect(frameAllowed(h({ "content-security-policy": csp }), "https://x.onealgo-builderio.pages.dev").allowed).toBe(false);
  });
  it("XFO alone", () => {
    expect(frameAllowed(h({ "x-frame-options": "deny" }), OA).allowed).toBe(false);
    expect(frameAllowed(h({ "x-frame-options": "ALLOW-FROM https://onealgorithm.com" }), OA).allowed).toBe(true);
    // Two stacked headers (CDN + app): browsers block, the first version of this said "allowed".
    expect(frameAllowed(h({ "x-frame-options": "ALLOW-FROM https://onealgorithm.com, SAMEORIGIN" }), OA).allowed).toBe(false);
    expect(frameAllowed(h({ "x-frame-options": "allowall, deny" }), OA).allowed).toBe(false);
  });
  it("wildcards, schemes, ports", () => {
    const ok = (fa, origin = OA) => frameAllowed(h({ "content-security-policy": `frame-ancestors ${fa}` }), origin).allowed;
    expect(ok("*")).toBe(true);
    expect(ok("https:")).toBe(true);
    expect(ok("*.onealgorithm.com")).toBe(false);
    expect(ok("*.onealgorithm.com", "https://www.onealgorithm.com")).toBe(true);
    expect(ok("onealgorithm.com")).toBe(true);
    expect(ok("http://onealgorithm.com")).toBe(true); // http source matches the https upgrade
    expect(ok("https://onealgorithm.com:8443")).toBe(false);
    expect(ok("https://evilonealgorithm.com")).toBe(false);
    expect(ok("https://onealgorithm.com/only-this")).toBe(false);
    expect(ok("https://onealgorithm.com/")).toBe(true);
  });
  it("two CSP headers: any blocking policy blocks", () => {
    expect(frameAllowed(h({ "content-security-policy": "frame-ancestors *, frame-ancestors 'self'" }), OA).allowed).toBe(false);
  });
});
