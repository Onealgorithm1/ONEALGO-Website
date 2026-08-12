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

/* ---------------------------------------------------------------------------
   Homepage - 2026 refresh.

   Three rules govern everything below.

   1. BRAND IS FIXED. #005eaa and #ffa634 are unchanged, and so is the
      One+Alg+globe+rithm wordmark and the "From Strategy to Support" tagline.
      What changed is how the orange is spent: it was previously doing five
      jobs at once (headings, icons, hover borders, checkmarks, every button),
      which is why it stopped directing attention. It now marks the tagline,
      the primary CTA and dark-section accents - and nothing else.

   2. LEAD WITH THE REVENUE. Staff augmentation and web development are the
      services actually producing revenue today, so they lead the capability
      grid. Oracle ERP and Salesforce follow.

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

/** True when the visitor has asked their system to reduce motion. Read once on
 *  mount and kept in sync, so the hero can fall back to its poster image. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

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
const CREDENTIALS: {
  authority: string;
  credential: string;
  reference: string | null;
  href: string;
}[] = [
  {
    authority: "U.S. Small Business Administration",
    credential: "Certified WOSB / EDWOSB",
    reference: "UEI W8DYK38MEKP3",
    href: siteConfig.sbaUrl,
  },
  {
    authority: "Salesforce AppExchange",
    credential: "Consulting Partner",
    reference: "Listing a0N3A00000EV7SwUAL",
    href: "https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N3A00000EV7SwUAL",
  },
  {
    authority: "Pennsylvania Dept. of General Services",
    credential: "Registered Supplier",
    reference: "Supplier 35896",
    href: "https://dgs.internet.state.pa.us/suppliersearch/Home/Details/35896",
  },
  {
    authority: "Virginia Dept. of Small Business",
    credential: "SWaM Certified",
    reference: null,
    href: "https://directory.sbsd.virginia.gov/#/directory",
  },
];

/** Capability tiles, ordered by where revenue actually comes from today.
 *  Every one links to a service page that already exists - which the old SEO
 *  prose block did not do at all: 1,100 words and not one internal link. */
const CAPABILITIES = [
  {
    title: "Staff Augmentation",
    body: "Senior practitioners embedded alongside your team, on your tools and your timeline - for a sprint or for a year.",
    href: "/services/staff-augmentation",
    feature: true,
  },
  {
    title: "Website Development",
    body: "Fast, accessible, search-ready sites and web applications - built, launched and maintained.",
    href: "/services/website-development",
    feature: true,
  },
  {
    title: "Oracle ERP",
    body: "Implementation and transformation across finance, supply chain and operations.",
    href: "/services/oracle-erp",
  },
  {
    title: "Salesforce",
    body: "Sales, Service and Marketing Cloud, from a listed Consulting Partner.",
    href: "/services/salesforce",
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
  {
    title: "MarTech & SEO",
    body: "Marketing platforms wired together, and the search visibility to feed them.",
    href: "/services/martech",
  },
  {
    title: "Zendesk",
    body: "Support-desk implementation and ongoing optimization.",
    href: "/services/zendesk",
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
    body: "Set-aside eligible and SAM registered, with NAICS and PSC codes published for market research.",
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
  const prefersReducedMotion = usePrefersReducedMotion();

  useSEO({
    title: "OneAlgorithm — IT Consulting & Secure Digital Transformation",
    description:
      "OneAlgorithm delivers staff augmentation, website development, Oracle ERP and Salesforce implementation, and system integration — with 24/7 support. SBA-certified WOSB/EDWOSB. Based in Malvern, PA.",
    canonical: getCanonicalUrl("/"),
    keywords:
      "staff augmentation, website development, Oracle ERP implementation, Salesforce consulting partner, system integration, API integration, operations automation, EDWOSB, WOSB, Malvern PA technology consulting",
    ogTitle: "OneAlgorithm — IT Consulting & Secure Digital Transformation",
    ogDescription:
      "Staff augmentation, website development, ERP and CRM implementation — from strategy to support, with 24/7 coverage.",
    ogUrl: getCanonicalUrl("/"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — IT Consulting & Secure Digital Transformation",
    twitterDescription:
      "Staff augmentation, website development, ERP and CRM implementation — from strategy to support, with 24/7 coverage.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <JSONLDScript data={createOrganizationSchemaDetailed()} />
      <JSONLDScript data={createFAQSchema()} />
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
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="none"
          poster="/media/hero-poster.webp"
          aria-hidden="true"
        >
          {!prefersReducedMotion && (
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
            {/* This line was previously buried in the capabilities section
                halfway down the page. It is the only headline on the site that
                could not be lifted wholesale by a competitor, so it leads. */}
            <h1 className="text-display font-semibold text-oa-nightInk">
              People, platforms and{" "}
              <span className="text-oa-orange">the systems in between</span>
            </h1>

            {/* The tagline. Previously set smaller than the paragraph beneath
                it, so the eye read headline -> paragraph -> tagline. It now
                sits directly under the headline at 9.19:1 on this ground. */}
            <p className="mt-5 font-mono text-eyebrow uppercase text-oa-orange">
              From Strategy to Support
            </p>

            <p className="mt-6 max-w-2xl text-lede text-oa-nightInk2">
              A woman-owned IT consultancy in Malvern, Pennsylvania: Oracle ERP,
              Salesforce, web development and system integration. Add senior
              people to your team, or hand us the whole build — the same team is
              there from the first workshop to the run-state.
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

        {/* Identifier strip. A contracting officer copy-pastes a UEI; it
            previously existed only inside JSON-LD, where no human sees it.
            This is the ONLY copy of these identifiers on the page - the
            government section used to render the same table a second time.
            Tighter column gap on mobile so it packs into fewer rows. */}
        {/* OPAQUE, not /70 + blur. Measured 2026-08-12 with impeccable, which
            samples RENDERED PIXELS rather than CSS colours: at 70% opacity the
            video showed through and the identifiers measured as low as 1.0:1
            against a 4.5:1 requirement -- "SAM.gov" and the UEI itself were the
            worst. Depending on which frame was playing they were close to
            invisible.

            Nothing else caught this. axe computes contrast from CSS colour
            pairs and cannot see through a video; scripts/contrast-check.mjs
            validates palette pairings, not composited output; Lighthouse scored
            the page 96 for accessibility. A tool that samples pixels was the
            only way to find it.

            This is the one element on the page a government buyer must be able
            to READ and copy, so legibility wins over letting the video show
            through. The blur goes too -- it does nothing behind an opaque
            surface and only costs a compositor layer. */}
        <div className="relative z-10 border-t border-white/10 bg-oa-night">
          <dl className="mx-auto flex max-w-[1200px] flex-wrap gap-x-6 gap-y-4 sm:gap-x-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 font-mono text-sm">
            {[
              ["UEI", siteConfig.identifiers.uei],
              ["CAGE", siteConfig.identifiers.cage],
              ["Primary NAICS", siteConfig.codes.naics[0]],
              ["SAM.gov", "Active"],
              ["Founded", siteConfig.foundingDate],
            ].map(([label, value]) => (
              <div key={label}>
                {/* 12px, not 11px. Flagged as tiny-text: below 12px is hard to
                    read on high-DPI screens, and these are identifiers someone
                    has to transcribe accurately. */}
                <dt className="text-xs uppercase tracking-wider text-oa-nightInk3">
                  {label}
                </dt>
                <dd className="text-oa-nightInk2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= CREDENTIALS =================
          A real <table>, because this is real tabular data: four rows, three
          columns, one issuing authority each. The semantics are not decoration
          -- a screen reader announces "Authority: U.S. Small Business
          Administration, Credential: Certified WOSB / EDWOSB", which is
          exactly the association a sighted reader gets from the columns.

          At 390px the columns collapse and each row becomes a stacked block,
          because four columns of registry data at phone width is unreadable.
          The three values stay distinguishable by weight and face alone --
          authority in regular ink2, credential in semibold ink, reference in
          mono -- so no repeated per-cell labels are needed. The <th> row is
          hidden there rather than removed, so the scope="col" association
          survives for assistive tech.
          =============================================== */}
      <section className="border-b border-oa-hairline bg-oa-paper">
        <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
          <table className="w-full border-collapse text-left">
            <caption className="mb-6 text-left font-mono text-xs uppercase tracking-[0.06em] text-oa-ink3">
              Registrations and certifications &middot; each links to the
              issuing authority&rsquo;s own registry
            </caption>
            <thead className="sr-only md:not-sr-only">
              <tr className="border-b border-oa-hairlineStrong">
                <th scope="col" className="pb-3 font-mono text-xs font-normal uppercase tracking-[0.06em] text-oa-ink3">
                  Authority
                </th>
                <th scope="col" className="pb-3 font-mono text-xs font-normal uppercase tracking-[0.06em] text-oa-ink3">
                  Credential
                </th>
                <th scope="col" className="pb-3 font-mono text-xs font-normal uppercase tracking-[0.06em] text-oa-ink3">
                  Reference
                </th>
                <th scope="col" className="pb-3">
                  <span className="sr-only">Registry link</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {CREDENTIALS.map((c) => (
                <tr
                  key={c.credential}
                  className="block border-b border-oa-hairline py-5 md:table-row md:py-0"
                >
                  <td className="block text-oa-ink2 md:table-cell md:py-5 md:pr-6">
                    {c.authority}
                  </td>
                  <td className="block font-semibold text-oa-ink md:table-cell md:py-5 md:pr-6">
                    {c.credential}
                  </td>
                  <td className="block font-mono text-sm text-oa-ink3 md:table-cell md:py-5 md:pr-6">
                    {c.reference ?? <span aria-hidden="true">&mdash;</span>}
                    {c.reference === null && (
                      <span className="sr-only">
                        No public reference number issued
                      </span>
                    )}
                  </td>
                  <td className="block md:table-cell md:py-5 md:text-right">
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-oa-blue hover:underline md:min-h-0"
                    >
                      Verify
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">
                        {c.credential} with {c.authority}, opens in a new tab
                      </span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= CAPABILITIES ================= */}
      <section className="bg-oa-paper">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-16 md:pb-20">
          <div className="max-w-3xl">
            {/* The heading and lede that used to sit here are now the hero -
                they were the best copy on the page and were doing that work
                below the fold. This section keeps only what the hero does not
                say, so the page does not state its own positioning twice. */}
            <h2 className="mt-4 text-h2 font-semibold text-oa-ink">
              What we build, and what we keep running
            </h2>
          </div>

          {/* The two revenue-leading services get the wide row. */}
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {CAPABILITIES.filter((c) => c.feature).map((c) => (
              <Link
                key={c.title}
                to={c.href}
                className="group flex flex-col rounded-xl border border-oa-hairline bg-oa-surface p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-oa-blue/40"
              >
                <h3 className="text-h3 font-semibold text-oa-ink">{c.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-oa-ink2">{c.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-oa-blue">
                  Learn more
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* The other six are a divided list, not six more cards.
              Two cards above six cards is one shape at two sizes, which is why
              this band read as eight identical rectangles. Cards and rows are
              different KINDS of object, so the hierarchy is now legible at a
              glance: two things this firm leads with, six it also does. */}
          <ul className="mt-10 grid border-t border-oa-hairlineStrong sm:grid-cols-2 sm:gap-x-10">
            {CAPABILITIES.filter((c) => !c.feature).map((c) => (
              <li key={c.title} className="border-b border-oa-hairline">
                <Link
                  to={c.href}
                  className="group flex items-baseline gap-4 py-5 transition-colors hover:bg-oa-surface"
                >
                  <span className="flex-1">
                    <span className="block font-semibold text-oa-ink">
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
            <h2 className="mt-4 text-h2 font-semibold text-oa-ink">Where we work</h2>
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
                Set-aside eligible and registered to receive award
              </h2>
              <p className="mt-5 max-w-[68ch] leading-relaxed text-oa-ink2">
                SBA-certified WOSB/EDWOSB with an active SAM registration,{" "}
                {siteConfig.codes.naics.length} published NAICS codes and{" "}
                {siteConfig.codes.psc.length} PSC codes, and state procurement
                registrations across Pennsylvania, Virginia and others — so a
                contracting officer can verify eligibility during market
                research. The UEI and CAGE code are at the top of this page.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-start md:justify-center">
              <Button
                asChild
                className="w-full bg-oa-blue font-semibold text-white hover:bg-oa-blue600 sm:w-auto"
              >
                <Link to="/capabilities">View capability statement</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-oa-hairlineStrong sm:w-auto"
              >
                <a
                  href="/docs/capability-statement.pdf"
                  download="OneAlgorithm-Capability-Statement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
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
