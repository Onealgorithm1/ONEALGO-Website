import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Building2,
  Factory,
  ShoppingCart,
  Landmark,
  ExternalLink,
  Clock,
  Users,
  Boxes,
  Route as RouteIcon,
} from "lucide-react";
import { siteConfig } from "../../shared/companyProfile";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  createOrganizationSchemaDetailed,
  createFAQSchema,
  createLocalBusinessSchema,
} from "../components/StructuredData";
import { JSONLDScript } from "../components/JSONLDScript";
import SystemCanvas from "../components/SystemCanvas";
import { IdentifierRail } from "../components/site";

/* ---------------------------------------------------------------------------
   Homepage - 2026 refresh.

   Three rules govern everything below.

   1. BRAND IS FIXED. #005eaa and #ffa634 are unchanged, and so is the
      One+Alg+globe+rithm wordmark and the "From Strategy to Support" tagline.
      What changed is how the orange is spent: it was previously doing five
      jobs at once (headings, icons, hover borders, checkmarks, every button),
      which is why it stopped directing attention. It now marks the tagline,
      the primary CTA and dark-section accents - and nothing else.

   2. THE FRONT DOOR SELLS THE SMALL-BUSINESS FIVE. Louis, 2026-08-26:
      "stop saying federal, we are going after web development, seo, google
      ads, marketing and crm work for small business". Website Development,
      SEO, Google Ads and CRM lead the capability grid; Marketing heads the
      list beneath. Staff augmentation still produces revenue today and is
      deliberately NOT deleted - it sits at the top of that list, one click
      away. Oracle ERP, IT Consulting, Operations Technology and Zendesk
      remain as secondary pages: the positioning changed, the capability
      did not. Before this, /services/seo, /services/google-ads and
      /services/marketing existed and were routed but had ZERO links from
      the homepage - the three things we now sell were orphaned from our
      own front door.

   3. ELIGIBILITY IS NOT EXPERIENCE. The firm is SBA-certified and SAM
      registered but has NOT yet been awarded a government contract. Every
      government reference on this page is therefore phrased as eligibility and
      registration. Nothing here claims past federal performance, and the 17
      organisations listed on /capabilities are individual prior employment -
      they are deliberately absent from this page. See REDESIGN-NOTES.md.

   Accessibility: #ffa634 is 1.95:1 on white and fails every WCAG threshold, so
   it is never text on a light surface here. On the dark ground it is 9.19:1.
   The primary CTA is an orange fill with an INK label (8.91:1).
   Verify with `node scripts/contrast-check.mjs`.
--------------------------------------------------------------------------- */

import { useHeroVideo } from "@/lib/heroVideo";
/* Re-exported so client/pages/Index.spec.ts keeps importing from this module. */
export { shouldPlayHeroVideo, useHeroVideo } from "@/lib/heroVideo";


/** ~1KB of SVG noise. Kills gradient banding and stops the scrim reading as a
 *  flat filter laid over the footage. */
const GRAIN: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
  opacity: 0.05,
  mixBlendMode: "overlay",
};

/* A "blueprint grid" -- two hairline gradients tiled on a 64px cell, masked to
   an ellipse -- used to sit on the two dark sections below. Removed 2026-08-12,
   at the same time as the shared copy in components/site.tsx.

   It is one of the most reliable generated-UI signatures there is: it says
   "engineering" without any of it being true, and it was on every dark ground
   on the site. GRAIN alone is the treatment now. If a grid ever means
   something here -- a chart, a plan, a measurement surface -- draw it on that
   element, where it is describing something real. */

/** Directional scrim over the hero video. The previous treatment was a flat
 *  two-stop brand-blue wash, which reads as a filter applied to footage. A
 *  darker top and bottom with a lighter middle reads as grading, holds the
 *  headline at full contrast, and lets the footage stay visible in the middle
 *  band where there is no text. */
const HERO_SCRIM: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, rgba(4,24,43,0.94) 0%, rgba(4,24,43,0.72) 42%," +
    "rgba(4,24,43,0.80) 72%, rgba(4,24,43,0.95) 100%)",
};

/** Credentials a buyer can independently verify. Each was already published in
 *  the footer - only the position is new. These attest to certification and
 *  registration status, not to contract awards. */
/* Credentials as a RECORD, not four badges.
 *
 *  Every competitor in this category proves competence by asserting it: a
 *  stock photograph and an adjective, with nothing on the page a reader can
 *  check. This company's actual advantage is the opposite -- its claims are
 *  registry entries, and a registry entry has an issuing authority and a
 *  reference number. So they are set as a table with those columns showing.
 *
 *  A row of shiny seals reads as marketing. `CAGE 14G18` in mono, next to the
 *  authority that issued it and a link into that authority's own registry,
 *  reads as a record -- which is what it is. Same facts, and the second one is
 *  the only version a contracting officer can act on.
 *
 *  `reference: null` renders an em dash. Virginia's directory is searched by
 *  name and issues no public certificate number we hold, and inventing one to
 *  make the column look full would defeat the entire point of the table. */
/* The CREDENTIALS array that lived here is gone. The canonical certification
   list is CERTIFICATIONS in components/site.tsx, rendered by the hero rail on
   every page that shows one -- so the homepage and /about cannot drift apart on
   what this company claims. */

/** Capability tiles, ordered by the positioning the listings now carry -
 *  NOT by revenue. Staff augmentation still earns today and is deliberately
 *  in the secondary list rather than a featured card; see rule 2 at the top
 *  of this file before "correcting" that back.
 *
 *  Every one links to a service page that already exists - which the old SEO
 *  prose block did not do at all: 1,100 words and not one internal link. And
 *  until 2026-08-26 the homepage linked to none of /services/seo,
 *  /services/google-ads or /services/marketing, so the three services the
 *  business now leads with were orphaned from the front door. */
/* ORDER IS LOAD-BearING in the secondary list. Oracle ERP and Zendesk sit
   together because they are the only two rows there that carry a mark, and at
   three columns they were previously two grid rows apart with unmarked rows
   between -- which made the logos read as sprinkled rather than deliberate.
   Adjacent, they land side by side on desktop and stacked on mobile, so the
   marks read as a set. Marketing and Social still heads the list.

   `logo` names a file in public/media/logos/ and is set ONLY where the service
   IS a named platform -- Salesforce, Google Ads, Oracle, Zendesk. It is absent
   from the other seven because there is no platform to name, and a mark
   invented for "IT Consulting" would be decoration.

   ⛔ Only the four files listed as REAL in public/media/logos/README.txt may be
   used. The rest of that folder is placeholders, several of which are the
   company name typed in Inter. The marks are used nominatively -- to say which
   platform the work runs on -- and must not be arranged to imply endorsement or
   that these companies are clients. */
const CAPABILITIES: {
  title: string;
  body: string;
  href: string;
  feature?: boolean;
  logo?: string;
}[] = [
  {
    title: "Website Development",
    body: "Fast, accessible, search-ready sites and web applications - built, launched and maintained.",
    href: "/services/website-development",
    feature: true,
  },
  {
    title: "SEO",
    body: "The work that gets you found: local search, your Google Business Profile, and pages that answer what people actually type.",
    href: "/services/seo",
    feature: true,
  },
  {
    title: "Google Ads",
    body: "Campaigns built, run and cut back to what converts, so the budget goes to the clicks that call you.",
    href: "/services/google-ads",
    logo: "google-ads",
    feature: true,
  },
  {
    title: "CRM and Salesforce",
    body: "The system that keeps track of your customers, set up and wired to the rest of your tools - from a listed Salesforce Consulting Partner.",
    href: "/services/salesforce",
    logo: "salesforce",
    feature: true,
  },
  {
    title: "Marketing and Social",
    body: "Campaigns, content and the social accounts, handled.",
    href: "/services/marketing",
  },
  {
    title: "Staff Augmentation",
    body: "Senior practitioners embedded alongside your team, on your tools and your timeline - for a sprint or for a year.",
    href: "/services/staff-augmentation",
  },
  {
    title: "MarTech",
    body: "Marketing platforms wired together so the data lands where you can use it.",
    href: "/services/martech",
  },
  {
    title: "Oracle ERP",
    body: "Implementation and transformation across finance, supply chain and operations.",
    href: "/services/oracle-erp",
    logo: "oracle",
  },
  {
    title: "Zendesk",
    body: "Support-desk implementation and ongoing optimization.",
    href: "/services/zendesk",
    logo: "zendesk",
  },
  {
    title: "IT Consulting",
    body: "Strategy, architecture and modernization roadmaps.",
    href: "/services/it-consulting",
  },
  {
    title: "Operations Technology",
    body: "Automation, IoT and process integration on the plant floor.",
    href: "/services/operations-technology",
  },
];

/** Engagement model. Drawn from the four-step process already described on the
 *  IT Consulting, Operations Technology and Oracle ERP service pages. */
const PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "Workshops and process mapping to find where the work actually breaks - before anyone proposes a system.",
  },
  {
    step: "02",
    title: "Design",
    body: "An architecture and a plan sized to your budget, your compliance needs and the team you already have.",
  },
  {
    step: "03",
    title: "Deliver",
    body: "Built in short cycles so you see working software early and change your mind cheaply.",
  },
  {
    step: "04",
    title: "Support",
    body: "We stay on after go-live. Hypercare first, then ongoing support around the clock.",
  },
];

/** Differentiators. Each is either confirmed by the business or already
 *  published elsewhere in this repository - no new claims. */
const DIFFERENTIATORS = [
  {
    icon: Clock,
    title: "24/7 support",
    body: "Round-the-clock technical support and maintenance across all time zones, backed by teams in the US, Canada, India and the UAE.",
  },
  {
    icon: Users,
    title: "Senior people, on your team",
    body: "You work with the practitioners doing the build, not a rotating bench. Augment your team or hand us the whole scope.",
  },
  {
    icon: Boxes,
    title: "Platform-agnostic",
    body: "Oracle, Salesforce, Zendesk, HubSpot, QuickBooks and custom APIs. We connect what you already own rather than replacing it by default.",
  },
  {
    icon: RouteIcon,
    title: "Strategy through support",
    body: "One team from the first workshop to the run-state. No handoff to a support vendor who was not in the room.",
  },
];

const INDUSTRIES = [
  {
    name: "Construction",
    icon: Building2,
    href: "/industries/construction",
    body: "Coordination, automated task management and real-time visibility from the field to the office.",
  },
  {
    name: "Manufacturing",
    icon: Factory,
    href: "/industries/manufacturing",
    body: "Connected systems, streamlined production workflows and live data insights.",
  },
  {
    name: "E-Commerce",
    icon: ShoppingCart,
    href: "/industries/ecommerce",
    body: "Integrated platforms connecting inventory, payments and customer data.",
  },
  {
    name: "Government",
    icon: Landmark,
    href: "/industries/government",
    body: "Registered and eligible for public-sector work. Everything a buyer needs to verify it is on this page.",
  },
];

/** Visible FAQ. The page already injected FAQPage structured data with no
 *  corresponding on-page content, which is exactly what Google asks you not to
 *  do. These four are the entries that are factual and confirmed; the schema's
 *  remaining claims are flagged in REDESIGN-NOTES.md for review. */
const FAQS = [
  {
    q: "Where is OneAlgorithm located?",
    a: "Our headquarters is at 625 Swedesford Rd, Unit B, Malvern, PA 19355. We serve clients across the United States, Canada, India and the United Arab Emirates.",
  },
  {
    q: "What services does OneAlgorithm provide?",
    a: "Staff augmentation, website and web application development, Oracle ERP and Salesforce implementation, system and API integration, operations technology, marketing technology and SEO, and Zendesk implementation.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Every engagement includes a hypercare period immediately after go-live, followed by ongoing 24/7 technical support and maintenance across all time zones.",
  },
  {
    q: "Can you work with our existing systems?",
    a: "Usually, yes. We connect the platforms you already own — Oracle, Salesforce, Zendesk, HubSpot, QuickBooks and custom APIs — rather than assuming a replacement is required.",
  },
];

/** Small caps label. Used instead of an orange sub-heading, which would fail
 *  contrast on a light surface. */
function Eyebrow({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`font-mono text-eyebrow uppercase ${
        tone === "dark" ? "text-oa-nightInk3" : "text-oa-ink3"
      }`}
    >
      {children}
    </p>
  );
}

export default function Index() {
  // The ref lets the hook hold the film until the hero is on screen; the
  // hook also waits for first paint. See client/lib/heroVideo.ts.
  const heroVideoRef = React.useRef<HTMLVideoElement>(null);
  const playHeroVideo = useHeroVideo(heroVideoRef);

  useSEO({
    title: "OneAlgorithm — Websites, SEO and Google Ads for Small Business",
    description:
      "Websites and marketing for small businesses in Chester County and Philadelphia: web development, SEO, Google Ads and CRM. Woman-owned, Malvern PA.",
    canonical: getCanonicalUrl("/"),
    // The LCP element on this page is the hero video poster (measured with
    // Lighthouse and PageSpeed Insights, 2026-08-25). Nothing told the browser to
    // fetch it early; now something does. See preloadImage in use-seo.ts.
    preloadImage: "/media/hero-poster.webp",
    keywords:
      "small business website development, local SEO, Google Ads management, CRM setup, Salesforce consulting partner, marketing agency Malvern PA, Chester County web design, woman-owned business",
    ogTitle: "OneAlgorithm — Websites, SEO and Google Ads for Small Business",
    ogDescription:
      "Websites, SEO, Google Ads, marketing and CRM for small businesses around Malvern and Philadelphia.",
    ogUrl: getCanonicalUrl("/"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — Websites, SEO and Google Ads for Small Business",
    twitterDescription:
      "Websites, SEO, Google Ads, marketing and CRM for small businesses around Malvern and Philadelphia.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <JSONLDScript data={createOrganizationSchemaDetailed()} />
      {/* The same FAQS the section below renders. Google requires marked-up
          FAQ content to be visible on the page, so the schema is generated
          from the array rather than kept as a second copy that can drift. */}
      <JSONLDScript data={createFAQSchema(FAQS)} />
      <JSONLDScript data={createLocalBusinessSchema()} />

      {/* ================= HERO =================
          The background video is kept. What changed is the treatment: a flat
          two-stop brand-blue wash became a directional scrim, so the footage
          reads as graded rather than filtered, and the headline sits at full
          contrast instead of competing with the busiest part of the frame.

          The reduced-motion handling is preserved exactly as it was - when a
          visitor has asked their system to reduce motion the <source> elements
          are never rendered, so the 1.3MB of video is not merely paused, it is
          never fetched. */}
      <section className="relative overflow-hidden bg-oa-night">
        {/* The poster as a REAL image, painted under the video. Traced
            2026-08-31: the hero <video> was the LCP element, and a video's
            poster paints ~1.2s later than an equivalent <img> (63% of the
            whole LCP was that render delay — the file itself downloads in
            9ms). A plain bitmap <img> paints at image speed; the video then
            covers it when (and if) it loads. Decorative twin of the poster,
            so empty alt + aria-hidden, like the scrim and grain layers.
            decoding MUST stay sync: async let Chrome defer the decode behind
            hydration long-tasks — traced on the 2026-08-31 preview, the img
            painted 2.3s AFTER first paint. Sync paints it with the frame. */}
        <img
          src="/media/hero-poster.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="sync"
          width={1200}
          height={500}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={playHeroVideo}
          muted
          loop
          playsInline
          preload="none"
          poster="/media/hero-poster.webp"
          aria-hidden="true"
        >
          {playHeroVideo && (
            <>
              <source src="/media/hero.webm" type="video/webm" />
              <source src="/media/hero.mp4" type="video/mp4" />
            </>
          )}
        </video>

        <div className="absolute inset-0" style={HERO_SCRIM} aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={GRAIN}
          aria-hidden="true"
        />

        {/* Mobile top/bottom padding is deliberately tighter than the desktop
            rhythm. At 390px the identifier strip below is the most distinctive
            thing on the page and it was landing under the fold; the padding,
            plus dropping the second CTA, buys it back without shrinking type. */}
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 md:pt-28 lg:pt-32 pb-10 sm:pb-16 md:pb-20">
          <div className="max-w-4xl">
            {/* Louis, 2026-08-25: the homepage carries the "a beautiful website
                is not effective if people can't find you" idea, and the site
                sells COMMERCIAL work nationally — federal is a small section and
                a bonus. Three reviewers this morning put the "found" message
                here rather than on a service page. The old headline, "People,
                platforms and the systems in between", was kept because a
                competitor could not lift it; distinctiveness is not what a
                buyer came for, and the second half of it survives below. */}
            {/* Louis, 2026-08-25: "put our original heading and tagline on
                home page". This is the pre-redesign heading verbatim
                (main@974d206), with the two-line tagline under it. */}
            <h1 className="text-display font-semibold text-oa-nightInk">
              Transform Operations,{" "}
              <span className="text-oa-orange">Accelerate Growth</span>
            </h1>

            {/* The tagline. Previously set smaller than the paragraph beneath
                it, so the eye read headline -> paragraph -> tagline. It now
                sits directly under the headline at 9.19:1 on this ground. */}
            <p className="mt-5 font-mono text-eyebrow uppercase text-oa-orange">
              From Strategy to Support
            </p>
            <p className="mt-3 max-w-2xl text-xl font-medium text-oa-nightInk">
              Think bigger. Build smarter. Move faster — with technology
              solutions tailored to you.
            </p>

            {/* The H1 above is the client's own heading, verbatim, by his
                instruction (2026-08-25) — it stays. This H2 carries the query
                words the page ranks for, per the audit: the heading layer must
                say what the title tag promises. */}
            <h2 className="mt-6 max-w-2xl text-xl font-semibold text-oa-nightInk">
              Websites, SEO and Google Ads for small businesses — from Malvern,
              Pennsylvania
            </h2>
            <p className="mt-3 max-w-2xl text-lede text-oa-nightInk2">
              We build websites for small businesses and then do the work that
              gets them found: search, Google Ads, the marketing, and the CRM
              that keeps track of who called. Most people come to us with a site
              that isn't bringing in work, or a system they have outgrown.
              Woman-owned, based in Malvern — and still doing ERP, integration
              and staff augmentation for larger teams nationally.
            </p>

            {/* ONE action. The capability-statement PDF used to sit here as a
                second button: it opens a new tab, ends the session and captures
                nothing. It still exists, in the government section further down,
                where the buyer who actually wants it is already looking. */}
            <div className="mt-8 md:mt-9">
              {/* Orange fill, INK label. White on this orange is 1.95:1 and was
                  the least readable element on the old site. */}
              <Button
                asChild
                size="lg"
                className="bg-oa-orange text-oa-ink hover:bg-[#ffb757] font-semibold px-7"
              >
                <Link to="/contact">
                  Talk to an Expert
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

      </section>

      {/* ⚠️ THE IDENTIFIER STRIP IS BACK, AND IT WAS DELIBERATELY REMOVED ONCE.
          Removed 2026-08-25 -- Louis: "federal contracting is supposed to be a
          small picture on this website … if we win a project, which we haven't,
          is just a bonus." Three reviewers read it as a commercial buyer and
          all three said the procurement codes made them leave.

          Restored 2026-08-28 at Louis's explicit request: the certifications
          are "supposed to be placed with everything like the about page at the
          bottom of the hero". It now carries BOTH registers, so a WBE/MBE
          supplier-diversity buyer -- a commercial audience, not a contracting
          officer -- is served by the same strip.

          ⛔ If the "it reads as procurement-speak" objection comes back, the
          fix is to drop the five registration cells and keep the three
          certifications, NOT to delete the rail. Read this whole note first. */}
      <IdentifierRail />

      {/* The standalone credentials band that sat here is GONE: the same three
          certifications now ride in the hero rail above, and printing them
          twice on one page made the second copy read as filler. The canonical
          list lives in CERTIFICATIONS in components/site.tsx. */}

      {/* ================= CAPABILITIES =================
          ONE structure, two weights. Rebuilt 2026-08-28.

          It was four bordered cards over seven divided rows: two different
          shapes carrying the same kind of content, and the cards were mostly
          air -- 236px each to hold a title, one sentence and a "Learn more"
          that repeated four times when the whole tile was already the link.

          The hierarchy that split them was real and is kept, but it is carried
          by SCALE AND ORDER inside a single list now instead of by a box. The
          four the business leads with come first, at a larger title, with their
          sentence. The seven it also does follow at body size, name only.

          ⛔ THE SEVEN LOST THEIR DESCRIPTIONS ON THIS PAGE. That is a content
          decision, not an oversight: "Strategy, architecture and modernization
          roadmaps" under a link that already says IT Consulting was the least
          load-bearing copy in the band, and each name links to a page that
          explains it properly. If someone wants that copy back, put it on the
          four leads' pages, not here.

          Measured: 1,160px -> ~580px desktop, 2,168px -> ~890px mobile, for the
          same eleven services and the same eleven links.
          =============================================== */}
      <section className="bg-oa-paper">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-12 md:pb-16">
          <h2 className="max-w-3xl text-h2 font-semibold text-oa-ink">
            What we build, and what we keep running
          </h2>

          {/* The four the front door leads with - the same four the Google
              Business Profile and the Apple place card name, so the listings
              and the site agree. */}
          <ul className="mt-8 grid border-t border-oa-hairlineStrong sm:grid-cols-2 sm:gap-x-12">
            {CAPABILITIES.filter((c) => c.feature).map((c) => (
              <li key={c.title} className="border-b border-oa-hairline">
                <Link
                  to={c.href}
                  className="group flex items-baseline gap-4 py-4 transition-colors hover:bg-oa-surface"
                >
                  <span className="flex-1">
                    <span className="flex items-center gap-2.5 text-lg font-semibold leading-snug text-oa-ink">
                      {/* aria-hidden + empty alt: the platform name is right
                          next to it, so announcing the mark too would just
                          repeat the word. */}
                      {c.logo && (
                        <img
                          src={`/media/logos/${c.logo}.svg`}
                          alt=""
                          aria-hidden="true"
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px] shrink-0"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      {c.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-oa-ink2">
                      {c.body}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-oa-blue transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Name only, three across. These are "we also do this" - the name is
              the whole message and the page behind it does the explaining. */}
          <ul className="mt-8 grid border-t border-oa-hairlineStrong sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
            {CAPABILITIES.filter((c) => !c.feature).map((c) => (
              <li key={c.title} className="border-b border-oa-hairline">
                <Link
                  to={c.href}
                  className="group flex items-center justify-between gap-4 py-3 text-oa-ink transition-colors hover:bg-oa-surface"
                >
                  <span className="flex items-center gap-2.5 font-medium">
                    {c.logo && (
                      <img
                        src={`/media/logos/${c.logo}.svg`}
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    {c.title}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-oa-blue transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= SIGNAL PATH =================
          The page had no moment. Nine bands of type and rules explained the
          work and none of them showed it, which is the whole of the "this does
          not make me believe you can execute" problem: a firm that sells
          system integration was describing integration in prose.

          This is the one visual on the site, and it is deliberately the only
          one -- it is placed here, after the services are named, so it reads as
          "and this is what that means" rather than as decoration. It is SVG
          and SMIL: no WebGL, no new dependency, ~5.6KB gzipped, and it does
          nothing at all until it scrolls into view.

          It is labelled ILLUSTRATIVE - NOT LIVE DATA inside the frame, because
          it is a diagram of how these integrations are built and not a
          telemetry feed, and a diagram that lets someone believe otherwise is
          the same lie as an invented statistic.
          ============================================== */}
      <section className="border-t border-oa-hairline bg-oa-paper">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-h2 font-semibold text-oa-ink">
              What &ldquo;integration&rdquo; actually means
            </h2>
            <p className="mt-5 text-lede leading-relaxed text-oa-ink2">
              Most of the work is not at either end. It is the layer in the
              middle that authenticates, maps one system&rsquo;s fields onto
              another&rsquo;s, checks the record before it lands, and decides
              what happens to the ones that fail. This is the shape of it.
            </p>
          </div>
          <SystemCanvas className="mt-12" />
        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}
      <section className="border-y border-oa-hairline bg-oa-surface">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="mt-4 text-h2 font-semibold text-oa-ink">
              Four steps, and we stay for the fourth
            </h2>
          </div>

          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <li key={p.step} className="border-t border-oa-hairlineStrong pt-6">
                <span className="font-mono text-sm text-oa-orangeText">{p.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-oa-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-oa-ink2">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="relative overflow-hidden bg-oa-night">
        <div
          className="absolute inset-0 pointer-events-none"
          style={GRAIN}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="mt-4 text-h2 font-semibold text-oa-nightInk">
              Built around how you actually work
            </h2>
          </div>

          {/* Four boxes on the dark ground became four hairline-divided
              columns. A translucent card on a dark section is a box drawn
              around text that was already grouped by the section itself --
              double containment, and it was the fourth 2x2 card grid in a row
              down this page. The rules do the same job with no enclosure, and
              the orange index numerals give the band a shape nothing else on
              the page has. */}
          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {DIFFERENTIATORS.map(({ title, body }, i) => (
              <li key={title} className="border-t border-white/15 pt-6">
                <span className="font-mono text-sm text-oa-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-oa-nightInk">
                  {title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-oa-nightInk2">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="bg-oa-paper">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="mt-4 text-h2 font-semibold text-oa-ink">Industries we serve</h2>
          </div>

          {/* Full-width divided rows, not a 4-up card grid.
              Every other band on this page was a grid of equal bordered
              rectangles, so the page had one shape repeated nine times and
              nothing to remember. This band is deliberately the widest and the
              least dense on the page: four rows, the industry name at heading
              scale, the detail set beside it rather than under it. The icons
              are gone -- four different glyphs at the top of four identical
              boxes was decoration standing in for hierarchy. */}
          <ul className="mt-12 border-t border-oa-hairlineStrong">
            {INDUSTRIES.map(({ name, href, body }) => (
              <li key={name} className="border-b border-oa-hairline">
                <Link
                  to={href}
                  className="group flex flex-col gap-2 py-7 transition-colors hover:bg-oa-surface md:flex-row md:items-baseline md:gap-10 md:px-4"
                >
                  <h3 className="text-h3 font-semibold text-oa-ink md:w-[38%] md:shrink-0">
                    {name}
                  </h3>
                  <p className="flex-1 leading-relaxed text-oa-ink2">{body}</p>
                  <ArrowRight
                    className="mt-1 h-5 w-5 shrink-0 text-oa-blue transition-transform duration-200 group-hover:translate-x-1 md:mt-0"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= GOVERNMENT =================
          Framed strictly as eligibility and registration. The firm has not yet
          been awarded a government contract, so nothing here implies past
          federal performance. */}
      {/* A full-bleed band on the surface tone, not a rounded card floating on
          paper. The card was the ninth bordered rectangle on the page and the
          largest, so it read as one more tile rather than as the procurement
          note it is. Asymmetric split: the statement holds the left, the two
          documents sit right, which is a column arrangement nothing else on
          this page uses.

          The identifier table that used to fill the right half was a
          byte-for-byte repeat of the strip under the hero. The strip won - it
          is above the fold and a buyer meets it first. The two facts the table
          carried that the strip does not (the code counts) are in the
          paragraph; the full lists live on /capabilities. */}
      <section className="border-y border-oa-hairline bg-oa-surface">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div>
              <h2 className="text-h3 font-semibold text-oa-ink">
                Buying for government? That has its own page.
              </h2>
              <p className="mt-5 max-w-[68ch] leading-relaxed text-oa-ink2">
                Registrations, eligibility, codes and the capability statement
                are all on the government page — everything a contracting
                officer needs, kept out of everyone else&rsquo;s way.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-start md:justify-center">
              <Button
                asChild
                className="w-full bg-oa-blue font-semibold text-white hover:bg-oa-blue600 sm:w-auto"
              >
                <Link to="/capabilities">View capability statement</Link>
              </Button>
              {/* Opens the statement, it does not download it.
                  The `download` attribute was forcing a save: a buyer who
                  tapped this on a phone got a file in a downloads folder and no
                  page, which on iOS in particular means they have to go and
                  find it before they can read a word. Every browser renders PDF
                  inline now, so the plain link shows it and the viewer's own
                  share/save control is right there if they want a copy. Named
                  for what it does. */}
              <Button
                asChild
                variant="outline"
                className="w-full border-oa-hairlineStrong sm:w-auto"
              >
                <a
                  href="/docs/capability-statement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ =================
          The page already emitted FAQPage structured data with no visible
          content behind it. This gives the schema something real to describe. */}
      <section className="border-t border-oa-hairline bg-oa-surface">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[22rem_1fr]">
            <div>
              <h2 className="mt-4 text-h2 font-semibold text-oa-ink">
                Before you get in touch
              </h2>
            </div>

            <dl className="divide-y divide-oa-hairline border-t border-oa-hairline">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="py-7">
                  <dt className="text-lg font-semibold text-oa-ink">{q}</dt>
                  <dd className="mt-2.5 max-w-[68ch] leading-relaxed text-oa-ink2">
                    {a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="relative overflow-hidden bg-oa-night">
        <div
          className="absolute inset-0 pointer-events-none"
          style={GRAIN}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <h2 className="text-h2 font-semibold text-oa-nightInk">
              Tell us what you are trying to fix
            </h2>
            <p className="mt-5 text-lede text-oa-nightInk2">
              Bring us the system that is slowing you down, or the role you
              cannot fill. We will tell you what it would take to put it right.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-oa-orange text-oa-ink hover:bg-[#ffb757] font-semibold px-7"
              >
                <Link to="/contact">
                  Talk to an Expert
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-oa-nightInk hover:bg-white/10 hover:text-oa-nightInk px-7"
              >
                <Link to="/services">Explore services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
