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
  createFAQSchema,
  createLocalBusinessSchema,
} from "../components/StructuredData";
import { JSONLDScript } from "../components/JSONLDScript";
import SystemCanvas from "../components/SystemCanvas";
import { IdentifierRail } from "../components/site";
import { HomeBody } from "../components/v2/home-Body";

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
      away. IT Consulting and Zendesk
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
/* ORDER IS LOAD-BearING in the secondary list. Zendesk is the only
   row there that carries a mark, and at
   three columns they were previously two grid rows apart with unmarked rows
   between -- which made the logos read as sprinkled rather than deliberate.
   Adjacent, they land side by side on desktop and stacked on mobile, so the
   marks read as a set. Marketing and Social still heads the list.

   `logo` names a file in public/media/logos/ and is set ONLY where the service
   IS a named platform -- Salesforce, Google Ads, Zendesk. It is absent
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
];

/** Engagement model. Drawn from the four-step process already described on the
 *  IT Consulting service pages. */
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
    body: "Salesforce, Zendesk, HubSpot, QuickBooks and custom APIs. We connect what you already own rather than replacing it by default.",
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
    a: "Staff augmentation, website and web application development, Salesforce implementation, system and API integration, marketing technology and SEO, and Zendesk implementation.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Every engagement includes a hypercare period immediately after go-live, followed by ongoing 24/7 technical support and maintenance across all time zones.",
  },
  {
    q: "Can you work with our existing systems?",
    a: "Usually, yes. We connect the platforms you already own — Salesforce, Zendesk, HubSpot, QuickBooks and custom APIs — rather than assuming a replacement is required.",
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
    // Louis 2026-10-21: add Salesforce (decision-log #12, hypothesis — measure brand + SF impressions at 2 and 4 weeks).
    title: "Salesforce Consulting, Websites, SEO & Google Ads | OneAlgorithm",
    description:
      "Websites and marketing for small businesses in Chester County and Philadelphia: web development, SEO, Google Ads and CRM. Based in Malvern PA.",
    canonical: getCanonicalUrl("/"),
    // The LCP element on this page is the hero video poster (measured with
    // Lighthouse and PageSpeed Insights, 2026-08-25). Nothing told the browser to
    // fetch it early; now something does. See preloadImage in use-seo.ts.
    preloadImage: "/media/hero-poster.webp",
    keywords:
      "small business website development, local SEO, Google Ads management, CRM setup, Salesforce consulting partner, marketing agency Malvern PA, Chester County web design",
    ogTitle: "Salesforce Consulting, Websites, SEO & Google Ads | OneAlgorithm",
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
      {/* Organization is the #org node in index.html; see the note there. */}
      {/* The same FAQS the section below renders. Google requires marked-up
          FAQ content to be visible on the page, so the schema is generated
          from the array rather than kept as a second copy that can drift. */}
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
        {/* No separate poster <img> here, deliberately. Measured on identical
            preview infra 2026-08-31: the <video poster> paints WITH the first
            frame (LCP 2,561ms), while a duplicate <img> behind it became a
            larger LCP candidate whose paint hydration long-tasks deferred to
            5,582ms — 3s worse. The poster attribute IS the fast path. */}
        {/* 2026-10-31: poster <img> restored now that "/" hydrates (prerender.mjs): it paints with the static
            HTML at first paint, so the later video frame is no longer the LCP (PSI 7.5s, frame paint ~1.1s late).
            The 08-31 note above measured the createRoot era, when hydration long tasks deferred this paint. */}
        <img src="/media/hero-poster.webp" alt="" aria-hidden="true" width={1200} height={500}
          className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async"
          {...({ fetchpriority: "high" } as Record<string, string>)} />
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
              {/* ⛔ Was "Woman-owned, based in Malvern". Louis 2026-09-01: not a
                  selling point on a commercial page. Ownership status now leads
                  only on /capabilities and /industries/government. */}
              Based in Malvern — and still doing ERP, integration and staff
              augmentation for larger teams nationally.
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

      <HomeBody />
    </Layout>
  );
}
