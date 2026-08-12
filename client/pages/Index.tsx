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
  ShieldCheck,
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

/** Fine engineering grid, used on the dark sections that carry no video. */
const BLUEPRINT_GRID: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
  WebkitMaskImage:
    "radial-gradient(90% 70% at 50% 35%, #000 35%, transparent 100%)",
  maskImage: "radial-gradient(90% 70% at 50% 35%, #000 35%, transparent 100%)",
};

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
const CREDENTIALS = [
  {
    label: "SBA Certified WOSB / EDWOSB",
    detail: "Verified on SBA's certification registry",
    href: siteConfig.sbaUrl,
  },
  {
    label: "Salesforce Consulting Partner",
    detail: "Listed on Salesforce AppExchange",
    href: "https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N3A00000EV7SwUAL",
  },
  {
    label: "PA DGS Registered Supplier",
    detail: "Commonwealth of Pennsylvania supplier registry",
    href: "https://dgs.internet.state.pa.us/suppliersearch/Home/Details/35896",
  },
  {
    label: "Virginia SWaM Certified",
    detail: "Small, women-owned and minority-owned business",
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
        <div className="relative z-10 border-t border-white/10 bg-oa-night/70 backdrop-blur-sm">
          <dl className="mx-auto flex max-w-[1200px] flex-wrap gap-x-6 gap-y-4 sm:gap-x-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 font-mono text-sm">
            {[
              ["UEI", siteConfig.identifiers.uei],
              ["CAGE", siteConfig.identifiers.cage],
              ["Primary NAICS", siteConfig.codes.naics[0]],
              ["SAM.gov", "Active"],
              ["Founded", siteConfig.foundingDate],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[11px] uppercase tracking-wider text-oa-nightInk3">
                  {label}
                </dt>
                <dd className="text-oa-nightInk2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= CREDENTIALS ================= */}
      <section className="bg-oa-paper border-b border-oa-hairline">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <Eyebrow>Independently verifiable</Eyebrow>
          <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-oa-hairline bg-oa-hairline sm:grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 bg-oa-surface p-6 transition-colors hover:bg-oa-blueTint"
              >
                <ShieldCheck className="h-5 w-5 text-oa-blue" aria-hidden="true" />
                <span className="font-semibold leading-snug text-oa-ink">
                  {c.label}
                </span>
                <span className="text-sm leading-snug text-oa-ink3">{c.detail}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-oa-blue">
                  Verify
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
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
            <Eyebrow>What we do</Eyebrow>
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

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.filter((c) => !c.feature).map((c) => (
              <Link
                key={c.title}
                to={c.href}
                className="group flex flex-col rounded-xl border border-oa-hairline bg-oa-surface p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-oa-blue/40"
              >
                <h3 className="text-lg font-semibold text-oa-ink">{c.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-oa-ink2">
                  {c.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-oa-blue">
                  Learn more
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}
      <section className="border-y border-oa-hairline bg-oa-surface">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow>How we work</Eyebrow>
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
        <div className="absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={GRAIN}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow tone="dark">Why OneAlgorithm</Eyebrow>
            <h2 className="mt-4 text-h2 font-semibold text-oa-nightInk">
              Built around how you actually work
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-white/12 bg-white/[0.03] p-7"
              >
                <Icon className="h-6 w-6 text-oa-orange" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold text-oa-nightInk">
                  {title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-oa-nightInk2">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="bg-oa-paper">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Industries</Eyebrow>
            <h2 className="mt-4 text-h2 font-semibold text-oa-ink">Where we work</h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map(({ name, icon: Icon, href, body }) => (
              <Link
                key={name}
                to={href}
                className="group rounded-xl border border-oa-hairline bg-oa-surface p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-oa-blue/40"
              >
                <Icon className="h-7 w-7 text-oa-blue" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold text-oa-ink">{name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-oa-ink2">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GOVERNMENT =================
          Framed strictly as eligibility and registration. The firm has not yet
          been awarded a government contract, so nothing here implies past
          federal performance. */}
      <section className="bg-oa-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* The identifier table that used to fill the right half of this card
              was a byte-for-byte repeat of the strip under the hero. The strip
              won - it is above the fold and a buyer meets it first - so this is
              now a single column. The two facts the table carried that the
              strip does not (the code counts) are stated in the paragraph, and
              the full lists live on /capabilities and /industries/government. */}
          <div className="overflow-hidden rounded-2xl border border-oa-hairline bg-oa-surface">
            <div className="p-8 md:p-12">
              <Eyebrow>For government buyers</Eyebrow>
              <h2 className="mt-4 text-h3 font-semibold text-oa-ink">
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="bg-oa-blue text-white hover:bg-oa-blue600 font-semibold"
                >
                  <Link to="/capabilities">View capability statement</Link>
                </Button>
                <Button asChild variant="outline" className="border-oa-hairlineStrong">
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
        </div>
      </section>

      {/* ================= FAQ =================
          The page already emitted FAQPage structured data with no visible
          content behind it. This gives the schema something real to describe. */}
      <section className="border-t border-oa-hairline bg-oa-surface">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[22rem_1fr]">
            <div>
              <Eyebrow>Common questions</Eyebrow>
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
        <div className="absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />
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
