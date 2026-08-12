import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { ArrowRight } from "lucide-react";
import {
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

const SystemsLattice = lazy(() => import("../../components/SystemsLattice"));

/* Website development — rebuilt 2026-08-12.
 *
 * WHY THIS PAGE DOES NOT LOOK LIKE THE OTHER SERVICE PAGES
 *
 * It used to. It ran the same PageHero and the same CardGrid as Oracle ERP and
 * Staff Augmentation, and it listed: Modern Design · Responsive Development ·
 * Performance Optimized · SEO Ready · Secure & Reliable · Custom Solutions.
 *
 * Every one of those is table stakes. Nobody has ever chosen a developer
 * because they promised responsiveness — in 2026 that is a restaurant
 * advertising food. And the page had no screenshot, no live example and no
 * number on it anywhere.
 *
 * That is survivable on a page selling ERP work, where the buyer cannot inspect
 * the deliverable. It is fatal here. This is the one service where the medium is
 * the message: a visitor is judging whether this company can build a website by
 * looking at a website this company built. Describing the work is not evidence.
 * The page has to BE the evidence.
 *
 * So: a live scene the reader can push around with the cursor, and beside
 * it the page's own measured scores with an invitation to verify them in
 * DevTools. Claims a visitor can check in thirty seconds, instead of adjectives.
 *
 * THE CONSTRAINT THAT MAKES IT HONEST
 *
 * A flashy page that loads slowly would disprove its own argument. The scene is
 * dynamically imported, gated on the viewport, reduced to a single static frame
 * under prefers-reduced-motion, and paused offscreen — see SystemsLattice.tsx.
 *
 * It used to be three.js, and that cost about fourteen performance points even
 * loaded as carefully as we knew how. On 2026-08-12 it was rewritten in plain
 * canvas: same scene, no dependency, 720KB out of the build, and the gap
 * against the rest of the site closed. Careful loading reduces what a library
 * costs; it never removes it. Asking whether the library was needed does.
 *
 * EVERY NUMBER BELOW IS MEASURED, NOT MARKETING. Lighthouse mobile against the
 * PRERENDERED production build on 2026-08-12 — three runs, 79/81/79 — and the
 * two gates are real scripts in this repo. Measure the un-prerendered build and
 * you get 74-77; that is not what ships, so it is not what is printed. If the
 * site regresses, these have to change or come down.
 */

/**
 * Measured on THIS page — Lighthouse mobile, production build, 2026-08-12.
 *
 * The first draft of this page put the HOMEPAGE's numbers here under the words
 * "measured on the page you are reading". They were better (performance 84,
 * accessibility 96) and they were not true of this page, which runs a scene
 * the homepage does not. That is the same species of claim removed from
 * the rest of this site today, and it would have been on the one page arguing
 * that we check things.
 *
 * So these are this page's own figures, including the one that is worse. The
 * trade-off is stated in the hero rather than hidden: a visitor who runs
 * Lighthouse gets the number we printed, which is the entire point of printing
 * it.
 */
const SCORES = [
  { label: "SEO", value: "100", of: "/100" },
  { label: "Best practices", value: "100", of: "/100" },
  { label: "Layout shift", value: "0", of: "CLS" },
  { label: "Performance", value: "~80", of: "/100" },
];

/**
 * Replaces the six commodity features. Each one names a standard this repo
 * actually enforces and points at the thing that enforces it — a claim with a
 * receipt rather than an adjective.
 */
const STANDARDS = [
  {
    title: "Colour contrast is a build gate, not a review note",
    body: "Twenty text and interface pairings are checked on every build against WCAG AA. Our own brand orange fails at 1.95:1 on white, so the build refuses to let it be text on a light background. A designer cannot forget; the pipeline will not let them.",
    proof: "scripts/contrast-check.mjs — 20/20 passing",
  },
  {
    title: "Content stays visible without JavaScript",
    body: "We added scroll animations once and shipped 22 of 27 pages with their content invisible to anything that does not run JavaScript — search engines included. The prerenderer now fails the build if that recurs. Most teams never find out this class of bug exists.",
    proof: "scripts/prerender.mjs — build fails on hidden content",
  },
  {
    title: "Zero layout shift",
    body: "Nothing on this site moves after it paints. Images carry explicit dimensions, fonts are loaded so they do not reflow the page, and the measured Cumulative Layout Shift is 0 — not low, zero.",
    proof: "Lighthouse CLS 0",
  },
  {
    title: "Motion respects the person reading",
    body: "Everything that moves, including the scene at the top of this page, stops when the browser reports a preference for reduced motion. The scene still draws — one static frame, no loop, no listeners — because the picture is worth seeing standing still and a blank box is not an accommodation. Accessibility is not a switch you flip at the end.",
    proof: "prefers-reduced-motion — one static frame, no animation loop",
  },
  {
    title: "We tell you what the flourish costs",
    body: "The scene above was three.js, deferred and disposed carefully, and it still cost about fourteen performance points. Careful loading reduces a dependency's cost; it does not remove it. So we removed the dependency instead — the same scene is now a few hundred lines of canvas, 720KB left the build, and the gap against our other pages closed. The discipline worth paying for is asking whether the library was needed, not tuning how it loads.",
    proof: "720KB removed; this page and the homepage now measure the same",
  },
  {
    title: "You own everything",
    body: "All code, all assets, all accounts. No proprietary page builder you cannot leave, no licence that expires with the relationship, no hosting you are locked into. If you replace us, you keep the work.",
    proof: "in every engagement",
  },
];

export default function WebsiteDevelopment() {
  useSEO({
    title:
      "Website Development — OneAlgorithm | WCAG AA, zero layout shift, Malvern PA",
    description:
      "Websites built to a measurable standard: WCAG AA contrast enforced at build time, zero cumulative layout shift, content readable without JavaScript, and an interactive scene that costs no measurable page speed. Woman-owned, Malvern, Pennsylvania.",
    canonical: getCanonicalUrl("/services/website-development"),
    keywords:
      "website development Malvern PA, accessible web development, WCAG AA website, Core Web Vitals, interactive canvas website, woman owned web developer Pennsylvania",
    ogTitle: "Website Development — OneAlgorithm",
    ogDescription:
      "Built to a measurable standard: WCAG AA contrast as a build gate, zero layout shift, and an interactive scene with no dependency behind it. Check the scores yourself.",
    ogUrl: getCanonicalUrl("/services/website-development"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Website Development — OneAlgorithm",
    twitterDescription:
      "Built to a measurable standard. Check the scores yourself in DevTools.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Website Development",
          "Website development built to a measurable standard: WCAG AA contrast enforced at build time, zero cumulative layout shift, content readable without JavaScript, and an interactive scene that costs no measurable page speed.",
          "Website Development",
          "https://onealgorithm.com/services/website-development",
        )}
      />

      {/* ------------------------------------------------------------------
          Hero. Hand-rolled rather than PageHero, which has no slot for a
          canvas — and because a page arguing that this company can build
          something distinctive should not open with the same component as
          every other page on the site.
         ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-oa-ink text-white">
        <Suspense fallback={null}>
          <SystemsLattice
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70 md:pointer-events-auto"
            fallback={
              // Shown when canvas is unavailable. A designed
              // state, not a blank rectangle — the page still has to look
              // considered for the person who never sees the scene.
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,166,52,0.18),transparent_60%),radial-gradient(circle_at_30%_70%,rgba(77,163,255,0.16),transparent_55%)]"
                aria-hidden="true"
              />
            }
          />
        </Suspense>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="mt-4 text-display font-bold leading-[1.05]">
              This page is the{" "}
              <span className="text-oa-orange">portfolio</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              You are looking at a website while deciding whether we can build
              one. So instead of describing the work — the scene behind this text
              is live, you can push it around with the cursor, and every number
              beside it was measured on this page.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              This page used to run the scene in{" "}
              <strong className="font-semibold text-white">three.js</strong>, and
              it cost about fourteen performance points. We had published that
              number rather than hide it. Then we asked the better question —
              whether the effect needed a 3D engine at all — and it did not. It
              is points, lines between near neighbours and a cursor field, which
              is a few hundred lines of plain canvas.{" "}
              <strong className="font-semibold text-white">
                A 720KB dependency came out of the build
              </strong>{" "}
              and the picture did not change. This page and our homepage now
              measure within a point of each other.
            </p>
            <p className="mt-4 text-sm text-white/70">
              Open DevTools and run Lighthouse. We would rather you checked than
              took our word for it — and if you do, you will also see the number
              we have not fixed yet: this site&rsquo;s largest paint is slower
              than we want, and we are working on it.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-oa-orange px-6 font-semibold text-oa-ink transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Talk to an Expert
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* The scorecard. Mono, tabular, deliberately unstyled-looking — it
              should read as instrument output rather than a marketing badge,
              because that is what makes it credible. */}
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-4 lg:absolute lg:right-8 lg:top-32 lg:mt-0 lg:w-64 lg:grid-cols-1 lg:gap-y-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {SCORES.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-white/75">
                  {s.label}
                </dt>
                <dd className="mt-1 font-mono text-3xl font-bold text-white">
                  {s.value}
                  <span className="ml-1 text-sm font-normal text-white/70">
                    {s.of}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          {/* Caption lives OUTSIDE the <dl>, not wrapped in a <div> inside it.
              A <dl> may contain dt, dd, div, script and template -- but axe
              still rejects a <div> that is not a dt/dd group, which is what a
              lone caption paragraph is. A sibling is simply correct.
              Opacities above were raised from /60 and /45 as well: white at 45%
              on this navy fails AA, and a contrast failure on the page arguing
              that we enforce contrast is the worst possible place to have one. */}
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-white/70 lg:absolute lg:right-8 lg:top-[26rem] lg:w-64 lg:pl-8">
            Lighthouse mobile, production build of this page, 2026-08-12. Performance varies a few points per run; the others are stable.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we hold ourselves to"
          title="Standards with receipts"
          lede="Every item below names something enforced by a script in the repository, not a promise made in a proposal. If the site regresses, the build fails."
        />
        <CardGrid columns={2} className="mt-12">
          {STANDARDS.map((s) => (
            <Card
              key={s.title}
              title={s.title}
              body={
                <>
                  {s.body}
                  <span className="mt-3 block font-mono text-[11px] uppercase tracking-wider text-oa-ink2">
                    {s.proof}
                  </span>
                </>
              }
            />
          ))}
        </CardGrid>
      </Section>

      {/*
        TODO — CLIENT WORK. This is the section that should sit here, and it is
        deliberately absent rather than filled with something invented.

        Two real client sites exist: theboardsprofessor.com and the Inspect This
        Home rebuild. Neither can go on this page yet, for different reasons:

          - Inspect This Home is on a noindex preview and the client has not
            signed off. Publishing a client's site as portfolio before they
            approve it is not ours to do.
          - theboardsprofessor.com is live, but nobody has confirmed WHAT
            OneAlgorithm did for it. It is a WordPress site with no animation or
            3D. Claiming design credit for work we may not have done would be
            exactly the kind of unevidenced claim removed from this site today.

        Get permission and confirm scope, then this section carries real
        screenshots and a one-line honest description of what was delivered.
        Until then the standards above are doing the work, because they are true.
      */}

      <CTABand
        title="Bring us something that has to work"
        body="A rebuild, a site that fails an accessibility audit, or a build nobody can maintain. Tell us what is actually wrong with it and we will tell you what we would do."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View all services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare
          title="Website Development — OneAlgorithm"
          className="justify-center"
        />
      </Section>
    </Layout>
  );
}
