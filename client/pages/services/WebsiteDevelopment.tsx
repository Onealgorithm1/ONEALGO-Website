import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import HeroFrame from "../../components/HeroSlides";
import WorkCarousel from "../../components/WorkCarousel";
import Roadmap from "../../components/Roadmap";
import { FAQS } from "../../data/faqs";
import { MeasureRule, Parallax } from "../../components/Instrument";
import {
  Section,
  SectionHeading,
  Reveal,
  CheckList,
  ProcessSteps,
  PrimaryCTA,
  SecondaryCTA,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
} from "../../components/StructuredData";

/* Website development — rebuilt 2026-08-24.
 *
 * WHAT WAS WRONG. The page was the 14-frame carousel and nothing else. Measured
 * before this rewrite: 93 words in <main>, ZERO links in <main> — no call to
 * action of any kind — an <h1> that was `sr-only` so no human ever saw it, and a
 * heading outline made of slide captions ("Design is everything.", "Guide them
 * through your message."). Three schema types. The meta description said "Five of
 * the most popular hero designs" when there were fourteen slides.
 *
 * It was a showreel that ended, and the visitor fell off the edge of the page.
 *
 * ⭐ THE HERO IS NOW ONE FRAME. The carousel went 14 → 9 → 6 → 5 → 1 over the
 * course of 2026-08-24 as Louis cut it down, ending at "i only want frame 4 —
 * called Rebuild". What survives is the canvas particle field in HeroSlides.tsx.
 * ⛔ That file is untracked, so the removed frames are NOT in git history — see
 * the note at the top of it before promising anyone a rollback.
 *
 * THE ARGUMENT THIS PAGE MAKES. The hero is live browser code — a canvas
 * particle system, drawn per frame, reacting to the pointer. No video and no
 * screenshots, verifiable by anyone who opens the inspector, which is exactly
 * the buyer this page is for. ⛔ That claim appears in the lede, in the hero
 * copy and in the first FAQ answer. If a video or a screenshot is ever added to
 * this page, all three change in the same commit.
 *
 * ⭐ PERFORMANCE WAS THE OTHER REASON TO CUT. Dropping the robot frame removed
 * the ONLY three.js import in the codebase and a 943KB (249KB gzipped) lazy
 * chunk; dropping the rest took the WebGL shader runtime, the lazy UFO chunk and
 * embla-carousel off this route entirely. LCP measured 5.0s before any of it.
 * ⛔ Do not reintroduce three.js, or a carousel, for decoration without
 * re-measuring LCP first.
 *
 * One frame also means no rail and no auto-advance, so the carousel's only CTA
 * button is gone. That is safe only because "Start a project" sits immediately
 * below the hero — ⛔ keep it there.
 *
 * ⛔ WHAT IS DELIBERATELY NOT HERE. No client names and no case studies. This firm
 * does have live website clients, but naming a client publicly needs that client's
 * consent and none is on file. Same rule as /services/salesforce. Do not add logos
 * or names to fill this out.
 * ⛔ No invented turnaround times, no invented prices, no "hundreds of sites".
 */

const BUILD = [
  {
    title: "Sites people can actually use",
    description:
      "Built to web standards rather than assembled in a page builder. Accessible to WCAG 2.1 AA, fast on a phone on a bad connection, and readable by the search engines and AI assistants that decide whether anyone finds you.",
    details: [
      "Semantic markup, real headings, keyboard-reachable everything",
      "Core Web Vitals treated as a budget, not an afterthought",
      "Structured data so machines can read what the page says",
      "Tested at 390px first, then out to desktop widths",
    ],
  },
  {
    title: "Interaction that is not a template",
    description:
      "The hero above is the demonstration — a particle field rasterised from live text and redrawn every frame, reacting to your pointer. Written for this site, not installed from a template.",
    details: [
      "WebGL, canvas and 3D work built and re-coloured for the brand, not dropped in",
      "Motion that respects prefers-reduced-motion without breaking",
      "3D and product configurators where they earn their place",
      "Every effect degrades to something legible if it fails",
    ],
  },
  {
    title: "The parts behind the page",
    description:
      "A site that only looks good is half a job. Forms that reach a person, a CMS the client can actually edit, analytics that answer a question, and the integrations that connect the site to whatever runs the business.",
    details: [
      "Forms wired to email and CRM, with a record when one fails",
      "CMS setup where the client will genuinely maintain content",
      "Analytics and conversion tracking configured, not just installed",
      "Integration with Salesforce, Zendesk or whatever you already run",
    ],
  },
  /* ⛔ "You own all of it" used to be the fourth item here, repeating what the
     closing handover panel says in more detail. Both OpenRouter reviewers flagged
     it independently as the page's clearest remaining duplication, and Louis had
     already said "do not make it redundant". Ownership is now made in ONE place:
     the panel at the close, which is also where HANDOVER is defined. If that
     panel is ever removed, this page stops making its ownership argument. */
];

const PROCESS = [
  {
    title: "What it is for",
    body: "Who the site is talking to and what it has to make them do. If the honest answer is that a one-page site would work, we say that before anyone builds five.",
  },
  {
    title: "Design in the browser",
    body: "Real type, real content, real widths — not a picture of a website. You see it on your own phone, because that is where it gets judged.",
  },
  {
    title: "Build and wire",
    body: "The site gets written, the forms get connected, the tracking goes on, and the content goes in. You get a link and can watch it come together.",
  },
  {
    title: "Launch and stay",
    body: "We deploy it, check it on real devices, and stay on afterwards. Sites break when nobody is watching them — that is what ongoing support is for.",
  },
];

/* Was BUILD[3].details, back when ownership was also a fourth "what we build"
   item. That item is gone; this is the single source now. */
const HANDOVER = [
  "Source in your own repository, from day one and at handover",
  "Domain and DNS in your account, not ours",
  "Deployed somewhere you control and can move",
  "Written so another developer can pick it up",
];



export default function WebsiteDevelopment() {
  useSEO({
    // Was "…in Malvern, PA". De-localised 2026-08-24 — the firm takes work
    // nationwide and the local framing was capping the page. 58 chars.
    title: "Custom Website Design & Development | OneAlgorithm",
    // The original claimed "Five of the most popular hero designs". 154 chars.
    description:
      "Custom websites and web apps for businesses across the US — accessible, fast, and yours to own outright. No page builder, no template, no licence to renew.",
    /* index.html sets a site-wide keywords default that names EDWOSB, WOSB and
       Malvern PA. Google ignores meta keywords outright and Bing gives it
       effectively nothing, so this is tidiness rather than ranking — but this
       page is not about certifications or a location, so it should not say it is. */
    keywords:
      "custom website design, website development, web application development, custom website, website redesign, accessible website, WCAG 2.1 AA, mobile-first web design, own your website code",
    canonical: getCanonicalUrl("/services/website-development"),
    // The LCP element on this page is the hero video poster (measured with
    // Lighthouse and PageSpeed Insights, 2026-08-25). Nothing told the browser to
    // fetch it early; now something does. See preloadImage in use-seo.ts.
    preloadImage: "/media/hero-poster.webp",
    ogTitle: "Custom Website Design & Development — OneAlgorithm",
    ogDescription:
      "Accessible, fast websites you own outright. No page builder, no template, and no licence you have to keep paying to stay online.",
    ogUrl: getCanonicalUrl("/services/website-development"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Custom Website Design & Development — OneAlgorithm",
    twitterDescription:
      "Accessible, fast websites you own outright. Everything on the page is live code.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Website Design & Development",
          "Custom website design and development for businesses across the United States: accessible to WCAG 2.1 AA, fast on mobile, custom interaction and 3D, integrated with the systems a business already runs, and owned outright by the client.",
          "Website Design & Development",
          "https://onealgorithm.com/services/website-development",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      {/* One frame, not fourteen. Louis cut the carousel down to this on
          2026-08-24: "i only want frame 4". It is the hook and the portfolio at
          once — and it is the only thing above the fold, so it carries the LCP. */}
      <HeroFrame />

      {/* Sites we built, directly under the hero — Louis, 2026-08-25. */}
      <WorkCarousel />

      {/* ⛔ THE SECTION THAT WAS HERE IS GONE ON PURPOSE — do not restore it
          without asking. Louis, 2026-08-25: "remove the section underneath the
          hero bring the call to action up and use our tagline". It held the
          <h1>, a lede paragraph, the two CTAs and the AnswersPanel, and it
          repeated the hero's own words directly beneath the hero.

          WHERE ITS PARTS WENT: the <h1> and both CTAs moved INTO the hero (see
          HeroSlides.tsx) so the first screen now asks for the click. The lede
          ("no page builder, no licence, you have your code from day one" — note
          "hand-coded" was dropped from this page on 2026-08-25 at Louis's
          request; do not reintroduce it if this copy is ever restored) and the AnswersPanel were NOT moved — they are in git history at
          this commit if either is wanted back further down the page. */}

      <Section tone="paper">
        <MeasureRule index={1} label="what we build" reading={`${BUILD.length} things`} />
        <SectionHeading
          title="What we build"
          lede="Three things, and none of them is a template with your logo dropped into it."
        />
        {/* ⛔ Was an <ol> with 01/02/03/04 markers. These four are unordered
            attributes, not a sequence, so the numbering asserted an order that
            does not exist — the banlist item about decorative structure, and a
            markup lie besides. <ul>, no numbers. The titles were <h2>, which
            made them peers of the section heading and left the page with a flat
            outline of fourteen sibling h2s, directly under a bullet claiming
            "semantic markup, real headings". <h3>. */}
        <ul className="mt-12 space-y-10 md:space-y-12">
          {BUILD.map((b) => (
            <li key={b.title}>
              <Reveal>
                <div className="spec grid gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:gap-14">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <h3 className="text-h3 font-semibold text-oa-ink">
                        {b.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-xl text-oa-ink2 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                  <div className="spec-list md:pt-1">
                    <CheckList items={b.details} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" bordered>
        <MeasureRule index={2} label="how a build runs" reading={`${PROCESS.length} stages`} />
        <SectionHeading
          title="How a build actually runs"
          lede="Four stages. You review the site in a browser, on real content at real widths — not only in a slide deck."
        />
        <div className="mt-14">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      {/* The road after launch. Louis, 2026-08-25: "make a animated roadmap";
          his framing, "a beautiful website is awesome but not effective if
          people can't find you - this is how we get you found." Sits after
          HOW WE BUILD (the four stages above) and before cost, because it is
          what happens once the site is live. Three reviewers on the design
          before a line was written; their verdicts are in the component and
          in client/data/roadmap.ts. It renders its own <section> and ground,
          so it is not wrapped in <Section>. */}
      <Roadmap />

      {/* ⛔ PRICE AND TIMING GET THEIR OWN SECTION. "How much does a website
          cost" and "how long does it take" are the two highest-intent queries in
          this category and they were buried as items 2 and 3 of a collapsed FAQ,
          3,000px down. Both OpenRouter reviewers raised this independently.
          ⛔ It still prints no number. No price list has ever been agreed, and
          invented turnaround times and a "fixed price before any work starts"
          line were both caught and cut from this page already. Both reviewers
          proposed billing-model claims ("no hourly billing", "that is what you
          pay") — REFUSED, because nobody has told me what the billing model is.
          What is here is the wording already vetted for the FAQ, promoted. */}
      <Section tone="surface" bordered>
        <MeasureRule index={3} label="cost and time" reading="the two big questions" />
        <SectionHeading
          title="What it costs, and how long it takes"
          lede="The two questions everybody opens with. Neither has a number on this page, and here is why that is the honest answer rather than a dodge."
        />
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <div className="spec">
              <h3 className="text-h3 font-semibold text-oa-ink">The price</h3>
              <p className="mt-4 text-oa-ink2 leading-relaxed">
                A site that explains what you do and takes enquiries is not the
                same job as one that runs a store, a booking calendar and a CRM
                behind it. Scope sets the price, so a range printed on a web page
                would be answering a question we have not asked you yet.
              </p>
              <p className="mt-4 text-oa-ink2 leading-relaxed">
                Tell us what the site has to do. We put the scope and the price in
                writing before implementation begins, and if the number is wrong
                for you we will say what we would cut to get there. Our pricing is
                affordable for what it is — custom work you own outright — and
                we would rather show you that against your actual scope than
                against someone else's average.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="spec">
              <h3 className="text-h3 font-semibold text-oa-ink">The schedule</h3>
              <p className="mt-4 text-oa-ink2 leading-relaxed">
                We work fast, and your project starts when the scope is agreed
                rather than joining a queue. The schedule goes in writing next to
                the price, so you get a date instead of a guess.
              </p>
              <p className="mt-4 text-oa-ink2 leading-relaxed">
                The honest part: across this industry the delays are almost never
                technical. They are content that has not been written and feedback
                that sits unanswered. We keep that from happening by walking you
                through each stage as it happens and putting the site in your
                browser early, so you are reviewing real pages rather than waiting
                for a reveal at the end.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
        <MeasureRule index={4} label="questions" reading={`${FAQS.length} answered`} />
        <SectionHeading
          title="Questions we get asked before the first call"
          lede="If an answer is not here it is because we could not make it true for every project. Ask and we will tell you what it depends on."
        />
        {/* These were static paragraphs that lifted and glowed on hover exactly
            as though they would expand. Ten such rows on the page and not one
            interactive element between the intro and the CTA band — a false
            affordance repeated ten times. Native <details>: keyboard-operable,
            no library, and now the hover means what it looks like it means.
            The FAQPage schema is emitted separately from FAQS, so collapsing
            the answers costs nothing in search. */}
        <div className="mt-12 space-y-4">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <details className="spec faq" id={f.id}>
                <summary>
                  <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                  <span className="faq-mark" aria-hidden="true" />
                </summary>
                <p className="faq-a text-oa-ink2 leading-relaxed">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The shared CTABand puts 672px of content in a 1425px band and leaves
          53% of it empty — the same defect this page fixed in the intro and then
          repeated at the close, where it matters more. CTABand is used on every
          other page, so it is replaced here rather than changed. The right half
          carries the handover list: the page's lede says the ownership item is
          the one worth reading before signing anything with anyone, so it is the
          last thing on the page rather than the fourth item in a list. */}
      <Section tone="night" grid>
        <MeasureRule index={5} label="what you leave with" reading={`${HANDOVER.length} handed over`} tone="dark" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <Reveal>
            <h2 className="text-h2 font-semibold text-oa-nightInk">
              Tell us what the site has to do
            </h2>
            <p className="mt-5 text-lede text-oa-nightInk2 leading-relaxed">
              A rebuild, a first site, or a page that looks fine and converts
              nobody. Describe what it needs to do and we will tell you what it
              would take — or call (610) 890-9711 and ask.
            </p>
              <p className="mt-5 text-oa-nightInk2 leading-relaxed">
                Local to us? See{" "}
                <Link className="text-oa-orange underline underline-offset-4" to="/services/web-design-chester-county">
                  web design in Chester County
                </Link>{" "}
                or{" "}
                <Link className="text-oa-orange underline underline-offset-4" to="/services/web-design-philadelphia">
                  web design in Philadelphia
                </Link>.
              </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryCTA to="/contact">Start a project</PrimaryCTA>
              <SecondaryCTA href="tel:+16108909711">
                Call (610) 890-9711
              </SecondaryCTA>
            </div>
          </Reveal>
          <Parallax depth={22}>
            <div className="inst inst-dark">
              <div className="inst-head">
                <span>what transfers to you</span>
              </div>
              <ul className="hand">
                {HANDOVER.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="inst-foot">
                No proprietary builder you cannot leave, no licence that lapses,
                and no hosting you are locked into because we hold the keys.
              </p>
            </div>
          </Parallax>
        </div>
      </Section>

    </Layout>
  );
}
