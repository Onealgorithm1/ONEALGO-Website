/* The runnable check for the website-development kit: render every component the way the prerender does
 * (react-dom/server, no DOM) and assert the hooks the motion runtime, the crawler and the image budget rely on.
 *   npx vitest --run client/components/wd
 */
import { describe, it, expect } from "vitest";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { WORK } from "../../../data/work";
import { SiteWindow, BuildStage, DemoSheet, HandoverPlate, AccessibilityPlate, RegionPlate, SCENES, STEPS } from "..";

const html = (el: React.ReactElement) => renderToStaticMarkup(el);

describe("SiteWindow", () => {
  const w = WORK[0];
  const out = html(<SiteWindow item={w} eager sweep onPreview={() => {}} reviewDialogId="review-phantom" />);
  it("frames a real capture with the fixed alt, AVIF first, width/height, eager when asked", () => {
    expect(out).toContain(`alt="The ${w.name} website, built by OneAlgorithm"`);
    expect(out).toContain(`/work/${w.slug}-card.avif?v=${w.shot}`);
    expect(out).toContain(`src="/work/${w.slug}-card.webp?v=${w.shot}"`);
    expect(out).toMatch(/width="1280" height="800"/);
    expect(out).toContain('loading="eager"');
  });
  it("keeps the tall hover capture out of the HTML as an <img>: a CSS var the hover media query turns on", () => {
    expect(out).not.toMatch(/<img[^>]+-tall\./);
    expect(out).toContain(`--tall:image-set(url(&quot;/work/${w.slug}-tall.avif`);
  });
  it("has the Preview button, the in-site review opener and the crawlable domain link, stamped LIVE SITE", () => {
    expect(out).toMatch(/<button[^>]+data-preview="phantom-arcades"[^>]*>Preview<\/button>/);
    expect(out).toContain('data-evidence="review-phantom"');
    expect(out).toMatch(/<a class="sf-link wd-domain" href="https:\/\/phantomarcades\.com\/" target="_blank" rel="noopener">/);
    expect(out).toContain("Live site · phantomarcades.com · opens here");
    expect(out).toContain("sf-sweep");
    expect(out).toContain('data-reveal=""');
  });
  it("second screen is lazy, says so in the stamp, and a non-embeddable site shows its capture date", () => {
    const atlas = WORK.find((x) => !x.embed)!;
    const o = html(<SiteWindow item={atlas} screen="second" size="third" onPreview={() => {}} />);
    expect(o).toContain(`/work/${atlas.slug}-screen2.avif`);
    expect(o).toContain('loading="lazy"');
    expect(o).toContain("second screen · opens here");
    expect(o).toContain(`Screenshot · ${atlas.shot}`);
    expect(o).not.toContain("data-evidence"); // no review, no review button
  });
});

describe("BuildStage", () => {
  const full = html(<BuildStage fig={1} />);
  it("the full stage is the one GSAP scene: data-scene=build, three stacked scenes, a log per scene, --d on every layer", () => {
    expect(full).toContain('data-scene="build"');
    expect((full.match(/class="bs-scene"/g) || []).length).toBe(3);
    expect((full.match(/class="bs-log"/g) || []).length).toBe(3);
    expect((full.match(/data-step="/g) || []).length).toBe(STEPS.length * 3);
    expect(full).toContain('data-tilt=""');
    expect(full).toContain("FIG. 1 · Build stage · Demo sites, not client work");
    expect(full).toMatch(/class="bs-block[^"]*" style="--d:0\.7s"/);
    expect(full).toContain('data-bg="#1d1a16"');
  });
  it("finished renders one static frame with no scene hook", () => {
    const f = html(<BuildStage finished scene={1} />);
    expect(f).not.toContain("data-scene=");
    expect(f).not.toContain("<figure");
    expect(f).toContain("bs-finished");
    expect(f).toContain(SCENES[1].brand);
    expect((f.match(/class="bs-scene"/g) || []).length).toBe(1);
  });
});

describe("DemoSheet and the plates", () => {
  it("DemoSheet fans three finished frames under one DEMO stamp", () => {
    const o = html(<DemoSheet />);
    expect((o.match(/bs-finished/g) || []).length).toBe(3);
    expect(o).not.toContain("data-scene=");
    expect(o).toContain("FIG. 2 · Three layouts, one blank page · Demo");
    expect(o).toContain("sf-sweep");
  });
  it("every plate is an accessible SVG stage: title + desc, stamp, caption, data-reveal, and an id for the highlight map", () => {
    for (const [el, fig, id] of [
      [<HandoverPlate />, "FIG. 5", "fig5"],
      [<AccessibilityPlate />, "FIG. 4", "fig4"],
      [<RegionPlate counties={["Chester County, PA", "Delaware County, PA", "Montgomery County, PA", "Bucks County, PA", "Philadelphia County, PA", "New Castle County, DE"]} office={{ l1: "625 Swedesford Rd, Unit B", l2: "Malvern, PA 19355" }} />, "FIG. 6", "fig6"],
    ] as const) {
      const o = html(el);
      expect(o).toContain(`id="${id}"`);
      expect(o).toMatch(/<title id="fig\d-t">/);
      expect(o).toMatch(/<desc id="fig\d-d">/);
      expect(o).toContain(fig);
      expect(o).toContain('data-reveal=""');
      expect(o).toContain("<figcaption");
      expect(o).toMatch(/role="img" aria-labelledby="fig\d-t fig\d-d"/);
    }
  });
  it("HandoverPlate names the four accounts and the launch row; RegionPlate draws six tiles and the office", () => {
    const h = html(<HandoverPlate />);
    for (const k of ["repo", "dns", "host", "docs"]) expect(h).toContain(`hp-node n-${k}`);
    expect((h.match(/YOUR ACCOUNT/g) || []).length).toBe(4);
    expect(h).toContain("HTTPS"); expect(h).toContain("HEADERS"); expect(h).not.toContain("BACKUPS");
    const r = html(<RegionPlate counties={["A, PA", "B, PA", "C, PA", "D, PA", "E, PA", "F, DE"]} office={{ l1: "625 Swedesford Rd, Unit B", l2: "Malvern, PA 19355" }} note="25 miles from Center City Philadelphia" />);
    expect((r.match(/<rect x="\d+" y="\d+" width="170" height="110"/g) || []).length).toBe(6);
    expect(r).toContain('class="mark"'); expect(r).toContain('class="leader"'); expect(r).toContain("Malvern, PA 19355");
    expect(r).toContain("25 miles from Center City Philadelphia");
  });
});
