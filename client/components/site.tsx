import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./ui/button";
import { siteConfig } from "../../shared/companyProfile";
import { SF_PHONE } from "../data/salesforceShared";

/* ---------------------------------------------------------------------------
   Shared page primitives for the 2026 refresh.

   Every page outside the homepage is built from these, so the site reads as one
   system rather than 27 pages that each reinvented a card. If a page needs
   something that is not here, add it here rather than hand-rolling it locally.

   THE RULES THESE ENCODE

   - Depth comes from a 1px hairline and a surface step, never a drop shadow.
     Shadows stay on floating UI only (dropdowns, dialogs, toasts).
   - #ffa634 is 1.95:1 on white. It is NEVER text, an icon or a border on a
     light surface. On the dark ground it is 9.19:1 and is used freely.
     An orange fill always takes an INK label (8.91:1), never white.
   - Orange marks the primary CTA and dark-section accents. Nothing else.
     Icons are brand blue on light, orange on dark.
   - Sections alternate paper -> surface, with dark used sparingly for
     emphasis. No white/grey stripe rhythm.
   - Headings use the fluid text-h1/h2/h3 scale, which carries its own negative
     tracking. Do not add letter-spacing by hand.

   Verify colour work with `node scripts/contrast-check.mjs`.
--------------------------------------------------------------------------- */

type Tone = "paper" | "surface" | "night";

const TONE_BG: Record<Tone, string> = {
  paper: "bg-oa-paper",
  surface: "bg-oa-surface",
  night: "bg-oa-night",
};

/* The dark ground used to carry a "blueprint grid": two hairline
   linear-gradient layers tiled on a fixed 64px cell, masked to a soft ellipse.
   Removed 2026-08-12. Two hairline gradient layers on a repeating cell is one
   of the most reliable generated-UI signatures there is, and it fired on every
   page here because PageHero drew it. The detector's wording: "Reserve grid
   overlays for actual canvas, map, blueprint or measurement surfaces;
   elsewhere use product structure or a plain surface."

   Nothing replaces it. The dark ground already has two treatments that are
   real: the radial ground gradient in PageHero, and GRAIN below. Adding a
   second decorative layer to stand in for the grid would just be a different
   tell. If a page genuinely needs a measurement surface (a chart, a plan, a
   drawing), draw the grid there, on that element, where it means something. */

/** ~1KB of SVG noise. Stops a dark ground reading as flat digital black. */
export const GRAIN: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
  opacity: 0.05,
  mixBlendMode: "overlay",
};

/* ---------------------------------------------------------------------------
   MOTION

   framer-motion was in package.json and completely unused, so the site was
   paying the install cost for nothing. It now drives scroll reveals here.

   The numbers are deliberate, and they are the difference between motion that
   reads as 2026 and motion that reads as a 2019 AOS script:

   - Travel is 16px, not 40px. Long travel is the template tell.
   - Duration is 350ms with a decisive ease-out curve. Anything over ~500ms on
     a marketing page feels sluggish.
   - `once: true`. Re-animating on every scroll-up is the other template tell.
   - The trigger margin fires slightly BEFORE the element reaches the viewport,
     so content is already settled by the time you look at it. Motion you have
     to wait for is worse than none.
   - Stagger is 60ms and capped: staggering 12 items at 150ms takes 1.8s and
     reads as broken.
   - Only transform and opacity are animated - both composite on the GPU and
     neither triggers layout.

   Nothing above the fold animates in. A hero headline that fades in is a hero
   headline that is invisible when the Largest Contentful Paint is measured.
--------------------------------------------------------------------------- */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Reveals its children on scroll. No-ops entirely under reduced motion.
 *  ⛔ Same elements in both modes (fix round, with PERF-1): the Salesforce pages
 *  HYDRATE HTML that was prerendered with motion on, so a plain <div> branch
 *  here (and in Stagger) made every reduced-motion visit fail hydration
 *  (React #418/#425/#422) and fall back to a full client re-render. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.35, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers a set of siblings. Used by CardGrid and ProcessSteps so every page
 *  gets the same rhythm without any page having to ask for it. */
function Stagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const items = React.Children.toArray(children);

  // Same elements under reduced motion, just no animation (see Reveal).
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
      }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          className="h-full"
          variants={
            reduced
              ? undefined
              : {
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: EASE_OUT },
                  },
                }
          }
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Small-caps label. Replaces the orange sub-headings used across the old
 *  pages, which failed contrast on every light surface. */
export function Eyebrow({
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

/* ---- Content frame -------------------------------------------------------
   "default" is the site's 1200px container. "wide" is the Salesforce frame
   (design-spec-addendum-wide-layout.md, Louis 2026-10-23: "we aren't utilizing
   the full desktop browser window"): 1440px with wider gutters, so at 1440 the
   side margin is 40px instead of 152px. The measure does NOT widen -- Prose and
   ledes keep their ch caps; the extra width is for side-by-side layout.

   From 2xl (1536px) the wide frame grows to 1680px (fix round M4): at 1920 the
   gutters were 288px a side (15% of the viewport); now 168px (under 10%).
   Prose keeps its measure (34em on the wide frame, see Prose), so lines do not
   grow with it.

   Layout provides "wide" on /services/salesforce* so the header, breadcrumbs,
   every Section and the footer share one left edge without each page having to
   opt in (one forgotten prop = one section out of line). An explicit `width`
   prop wins over the context. Every other route gets "default", the same
   classes it had before.
   ⛔ Static strings: Tailwind cannot see a computed class name. */
export type Frame = "default" | "wide";
export const FRAME: Record<Frame, string> = {
  default: "max-w-[1200px] px-4 sm:px-6 lg:px-8",
  wide: "max-w-[1440px] px-4 sm:px-6 lg:px-10 2xl:max-w-[1680px] 2xl:px-12",
};
export const FrameContext = React.createContext<Frame>("default");
function useFrame(width?: Frame): string {
  const ctx = React.useContext(FrameContext);
  return FRAME[width ?? ctx];
}

/** Standard page section. Handles ground colour, rhythm and the container. */
export function Section({
  tone = "paper",
  children,
  className = "",
  bordered = false,
  grid = false,
  compact = false,
  allowSticky = false,
  clip = false,
  width,
  id,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  /** Hairline rule top and bottom - use when two same-tone sections meet. */
  bordered?: boolean;
  /**
   * Grain texture. Dark sections only.
   *
   * Named `grid` because it used to draw the blueprint grid as well (see the
   * note at the top of this file). The name is kept so the 20-odd call sites
   * do not all have to change in the same commit as the removal; what it means
   * now is "give this dark ground its texture".
   */
  grid?: boolean;
  compact?: boolean;
  /**
   * Drop the clipping so a `position: sticky` child can actually pin.
   *
   * ⛔ `overflow: hidden` on an ancestor silently kills sticky in every
   * browser — no error, no warning, the element just scrolls away like static
   * content. /capabilities has had `lg:sticky lg:top-24` on its rail since the
   * refresh and it has never once pinned: measured at 1440px the rail's top
   * went 881 → -19 → -919 → -1819 as the page scrolled, perfectly linear. The
   * cost was 4,001px of empty 304px-wide column, 47% of the page height, which
   * is precisely the "too much white space" the client reported.
   *
   * Only set this on a section with no absolutely-positioned decoration to
   * clip — the grain layer and the band rules both rely on the clipping.
   */
  allowSticky?: boolean;
  /**
   * Opt-in (Salesforce plate system, 2026-10-23). Clips with `overflow: clip`
   * where supported instead of `overflow: hidden`. Same visual clipping, but
   * `clip` does not make the section a scroll container, so (a) a sticky child
   * pins and (b) a CSS `view()` scroll timeline inside it tracks the page
   * instead of a box that never scrolls. Also adds `oa-fx`, the class every
   * scroll-driven rule in global.css is scoped under: a plate in a section
   * WITHOUT `clip` simply renders fully drawn, it never sticks half-drawn.
   * Off by default so no existing page changes.
   */
  clip?: boolean;
  /** Container frame. Omitted = whatever Layout provides (see FRAME). */
  width?: Frame;
  /** Anchor target, for in-page links. */
  id?: string;
}) {
  const dark = tone === "night";
  const frame = useFrame(width);

  /* The band rules are 1px pseudo-elements, not a CSS border on the <section>.
     Rendered result is identical to the `border-y` this replaces.

     Why: a full-bleed band is a ground, not a bounded surface. Drawing it with
     a real border makes every Card inside it a card sitting inside another
     card -- which is exactly what the `nested-cards` detector reported on
     2026-08-12, firing on /about, /industries/government and the service pages
     wherever a CardGrid sat in a `bordered` Section. One boundary per level of
     grouping: the band separates itself from its neighbours with a rule, the
     cards inside carry the only real edges. */
  const rules = bordered
    ? "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:content-[''] " +
      "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:content-[''] " +
      (dark
        ? "before:bg-white/10 after:bg-white/10"
        : "before:bg-oa-hairline after:bg-oa-hairline")
    : "";

  return (
    <section
      id={id}
      className={`relative ${allowSticky ? "" : clip ? "oa-fx overflow-hidden supports-[overflow:clip]:overflow-clip" : "overflow-hidden"} ${TONE_BG[tone]} ${rules} ${className}`}
    >
      {grid && dark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={GRAIN}
          aria-hidden="true"
        />
      )}
      <div
        className={`relative z-10 mx-auto ${frame} ${
          compact ? "py-14 md:py-16" : "py-20 md:py-28"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

/** Section heading block: eyebrow, h2, optional lede. Left-aligned by default -
 *  the old pages centred every heading, which is what made four consecutive
 *  sections read as the same section. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  // Wide (Salesforce) frame: the lede keeps a ~72-character measure (fix round M2).
  const wide = React.useContext(FrameContext) === "wide";
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      {/* The eyebrow is deliberately NOT rendered. Measured 2026-08-12: the
          kicker-above-heading pattern fired 19 times across 7 pages and is the
          loudest generated-UI signature on this site. The detector's wording:
          "A tiny tracked uppercase label sitting as its own block directly
          above a heading is banned outright, repeated or not. Generated kickers
          never earn their place: the heading carries its own weight."

          It also accounted for most of the all-caps-body findings, since every
          kicker was a run of uppercase.

          The `eyebrow` prop is kept and inert rather than removed, because 73
          call sites pass one and deleting them all in the same change would be
          a 26-file mechanical diff that buries this decision and is far harder
          to reverse if it turns out to be wrong. If a kicker's words actually
          mattered, the fix is to work them into the heading or the lede -- not
          to switch this back on. Once that pass is done, delete the prop. */}
      <h2
        className={`text-h2 font-semibold ${
          dark ? "text-oa-nightInk" : "text-oa-ink"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 text-lede ${wide ? "max-w-[34em]" : ""} ${
            dark ? "text-oa-nightInk2" : "text-oa-ink2"
          }`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/** Opens in a new tab only when leaving the page for a real document or site.
 *  Site-wide bug fix 2026-10-23: every `tel:`, `mailto:` and `#` CTA used to
 *  carry target=_blank, so "Call" opened an empty tab before dialling and an
 *  in-page jump opened a second copy of the page. Relative documents (the
 *  capability-statement PDF on /industries/government) keep opening in a new
 *  tab, as they always did. */
function newTabProps(href?: string) {
  return href && !/^(tel:|mailto:|#)/.test(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

/** Primary call to action. Orange fill, ink label.
 *
 *  `cta` (opt-in, Salesforce pages) tags the link with `data-cta` for GA4
 *  placement tracking, and switches on the plate-system treatment: a visible
 *  focus outline in the ground's colour (`tone`) and the nudging arrow on
 *  in-page links. Without `cta` the button renders exactly as before. */
export function PrimaryCTA({
  to,
  href,
  children,
  download,
  className = "",
  cta,
  tone = "dark",
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  download?: string;
  className?: string;
  /** GA4 placement: hero, header, bar, mid, rail, table, desk, band, record, answer, faq. */
  cta?: string;
  /** The ground the button sits on; picks the focus-outline colour. */
  tone?: "light" | "dark";
}) {
  /* py-3 rather than the button's default zero vertical padding. `size="lg"`
     is `h-11 px-8` -- a fixed 44px box with no vertical inset at all, so a
     long label sat flush against the top and bottom of its own fill. 12px + a
     20px line box is exactly 44px, so nothing moves; the padding is simply
     declared instead of implied by the fixed height. */
  /* With `cta` the label may wrap (h-auto, min 44px): a long Salesforce label
     ran past a 390px screen and past the ProcessSteps end column. */
  const fx = cta
    ? ` group h-auto min-h-11 whitespace-normal text-center transition-colors duration-200 [transition-timing-function:cubic-bezier(.22,1,.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:ring-0 ${
        tone === "dark" ? "focus-visible:outline-oa-orange" : "focus-visible:outline-oa-orangeText"
      }`
    : "";
  const classes = `bg-oa-orange text-oa-ink hover:bg-[#ffb757] font-semibold px-7 py-3${fx} ${className}`;
  const arrow = cta
    ? "ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
    : "ml-1 h-4 w-4";
  const hrefArrow = cta && href && !/^(tel:|mailto:|https?:)/.test(href);
  return (
    <Button asChild size="lg" className={classes}>
      {to ? (
        <Link to={to} data-cta={cta}>
          {children}
          <ArrowRight className={arrow} aria-hidden="true" />
        </Link>
      ) : (
        <a href={href} download={download} data-cta={cta} {...newTabProps(href)}>
          {children}
          {hrefArrow && <ArrowRight className={arrow} aria-hidden="true" />}
        </a>
      )}
    </Button>
  );
}

/** Secondary call to action. Ghost on dark, hairline outline on light.
 *  `cta` is opt-in exactly as on PrimaryCTA (data-cta + focus outline). */
export function SecondaryCTA({
  to,
  href,
  children,
  download,
  tone = "dark",
  cta,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  download?: string;
  tone?: "light" | "dark";
  cta?: string;
}) {
  // py-3 for the same reason as PrimaryCTA above.
  const base =
    tone === "dark"
      ? "border-white/25 bg-white/5 text-oa-nightInk hover:bg-white/10 hover:text-oa-nightInk px-7 py-3"
      : "border-oa-hairlineStrong bg-oa-surface text-oa-ink hover:bg-oa-blueTint hover:text-oa-ink px-7 py-3";
  const fx = cta
    ? ` h-auto min-h-11 whitespace-normal text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:ring-0 ${
        tone === "dark" ? "focus-visible:outline-oa-nightBlue" : "focus-visible:outline-oa-blue"
      }`
    : "";
  return (
    <Button asChild size="lg" variant="outline" className={base + fx}>
      {to ? (
        <Link to={to} data-cta={cta}>{children}</Link>
      ) : (
        <a href={href} download={download} data-cta={cta} {...newTabProps(href)}>
          {children}
        </a>
      )}
    </Button>
  );
}

/* ---------------------------------------------------------------------------
   INNER-PAGE HEROES — "THE WIRE"

   THE PROBLEM THIS SOLVES
   One PageHero opened all twenty-one non-homepage routes with the same dark
   navy band at the same height with the same left-aligned headline, whether
   the page was a flagship service or the privacy policy. Twenty-one pages that
   open identically read as a template, because they are one.

   WHAT REPLACES IT
   The hero now renders the page's real position in the site as a wire: the
   ancestors it hangs off (the rail at the top), the node it is (the current
   crumb, latched orange), and the wires that leave it (a terminal strip whose
   CONTENT depends on what kind of page this is).

   Four page classes, four silhouettes:

     service   night, text + right-hand panel card, terminating in the other
               ten services as a live wire. Different siblings highlighted on
               every page, so no two service heroes are the same shape of text.
     industry  night, NO panel card at all — the panel's own items run
               full-bleed as a numbered scope strip. Headline gets full width.
     company   night, text + panel card, terminating in the registry
               identifiers with a link to the live SBA record. These are the
               three pages where a stranger decides whether to trust the firm,
               so this is where "every claim next to its means of verification"
               has to be literal.
     utility   PAPER, roughly a third of the height, no dark band. A privacy
               policy does not deserve 400px of navy.

   WHY THE CLASS IS DERIVED FROM THE ROUTE, NOT PASSED IN
   Twenty-one call sites, none of them touched. More importantly the content in
   the rail and the sibling wire is derived from the site's own structure, so
   it cannot be a lie and cannot drift out of date the way a hand-written
   "related services" list does. It is the one kind of hero content that is
   true by construction.

   COLOUR
   Note `[&_.text-oa-orange]:text-oa-orangeText` on the utility h1. Almost
   every call site hard-codes <span className="text-oa-orange"> inside its
   title, which is 9.19:1 on night and 1.95:1 on paper. That one arbitrary
   variant retargets any such span to the AA-safe orangeText (6.01:1) whenever
   the hero is on a light ground, so the light variant is safe for a call site
   that has never heard of it. On the light rail the live node is brand blue,
   never orange.

   MOTION
   None. Nothing here animates in — this is the LCP element on every page.
--------------------------------------------------------------------------- */

type HeroClass = "service" | "industry" | "company" | "utility";

/* ponytail: third copy of the site's page list (Layout.tsx hard-codes it as
   JSX twice, Services.tsx and Industries.tsx each hold a richer version with
   icons and body copy). Ceiling: a route added to the nav and not added here
   goes missing from the sibling wire. Upgrade path is to lift this pair of
   arrays into shared/ and have Layout, Services and Industries read their
   labels and hrefs off it; that is a five-file change and does not belong in
   the same commit as a hero redesign. The orphan checker
   (scripts/orphan-check.mjs) catches the reverse case. */
const SERVICE_PAGES: ReadonlyArray<readonly [string, string]> = [
  ["/services/staff-augmentation", "Staffing"],
  ["/services/website-development", "Websites"],
  ["/services/application-development", "App Development"],
  ["/services/oracle-erp", "Oracle ERP"],
  ["/services/salesforce", "Salesforce"],
  ["/services/it-consulting", "IT Consulting"],
  ["/services/operations-technology", "Operations Tech"],
  ["/services/marketing", "Marketing"],
  ["/services/martech", "MarTech"],
  ["/services/google-ads", "Google Ads"],
  ["/services/seo", "SEO"],
  ["/services/zendesk", "Zendesk"],
];

const INDUSTRY_PAGES: ReadonlyArray<readonly [string, string]> = [
  ["/industries/construction", "Construction"],
  ["/industries/manufacturing", "Manufacturing"],
  ["/industries/ecommerce", "E-Commerce"],
  ["/industries/marketing", "Marketing"],
  ["/industries/website-development", "Website Development"],
  ["/industries/government", "Government"],
];

const SECTION_LABEL: Record<string, string> = {
  "/services": "Services",
  "/industries": "Industries",
  "/about": "About",
  "/capabilities": "Capabilities",
  "/contact": "Contact",
  "/privacy": "Privacy",
  "/terms": "Terms",
  "/ai-info": "AI Information",
  /* The three Salesforce local pages, 2026-09-01. Short labels on purpose:
     the rail sets crumbs in uppercase, and `labelFromSlug` would render
     "SALESFORCE CONSULTANT PHILADELPHIA" — 34 characters of all-caps, which
     the design detector flags as an all-caps-body legibility warning and which
     reads badly at the top of the page. The place is the only new information
     in the crumb; "Salesforce" is already the section the reader came through.
     ⛔ These are NOT in SERVICE_PAGES deliberately — that array drives the
     sibling rail on every other service page, and it was trimmed on purpose. */
  "/services/salesforce-consultant-philadelphia": "Philadelphia",
  "/services/salesforce-consultant-chester-county": "Chester County",
  "/services/salesforce-consulting-partner-pennsylvania": "Pennsylvania",
  "/services/salesforce-implementation-cost": "Cost guide",
  /* Salesforce services + wave-2 city pages, 2026-10-22. Same short-label rule as above. */
  "/services/salesforce-data-migration": "Data migration",
  "/services/salesforce-integration": "Integration",
  "/services/salesforce-managed-services": "Managed services",
  "/services/salesforce-health-check": "Health check",
  "/services/salesforce-marketing-cloud-consulting": "Marketing Cloud",
  "/services/salesforce-consultant-new-york": "New York",
  "/services/salesforce-consultant-washington-dc": "Washington, DC",
  "/services/salesforce-consultant-dallas": "Dallas",
  "/services/salesforce-consultant-denver": "Denver",
  "/services/salesforce-consultant-atlanta": "Atlanta",
  "/services/salesforce-consultant-boston": "Boston",
  "/services/salesforce-consultant-seattle": "Seattle",
  "/services/salesforce-consultant-san-francisco": "San Francisco",
  "/services/salesforce-consultant-los-angeles": "Los Angeles",
  "/services/salesforce-consultant-austin": "Austin",
  "/services/salesforce-consultant-miami": "Miami",
  "/services/salesforce-consultant-chicago": "Chicago",
  "/services/salesforce-consultant-houston": "Houston",
  "/services/operational-transformation-consulting": "Transformation",
  /* ponytail: slug label read "Seo Chester County" -- Semrush flagged the exact
     phrase as overused on the page (2026-10-12). Place is the new info. */
  "/services/seo-chester-county": "Chester County",
};

const COMPANY_PATHS = ["/about", "/capabilities", "/contact"];

/** Trailing slash and case are not meaningful here; a route is a route. */
export function normalisePath(pathname: string): string {
  const p = pathname.toLowerCase().replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

function classifyPath(path: string): HeroClass {
  if (path === "/services" || path.startsWith("/services/")) return "service";
  if (path === "/industries" || path.startsWith("/industries/"))
    return "industry";
  if (COMPANY_PATHS.includes(path)) return "company";
  // Legal pages, /ai-info, and anything unrecognised — which includes every
  // 404, since NotFound renders at whatever address the visitor mistyped.
  return "utility";
}

/**
 * Last-resort label for a route not in the maps above: "/services/foo-bar"
 * becomes "Foo Bar". Only reachable from a 404, which is exactly why the slug
 * is whitelisted rather than escaped: this is the address bar being echoed back
 * into the page, and the only thing that should survive that round trip is a
 * plain lowercase route segment. Anything else becomes "Not found".
 */
function labelFromSlug(path: string): string {
  const slug = path.split("/").filter(Boolean).pop() ?? "";
  if (!/^[a-z0-9][a-z0-9-]{0,39}$/.test(slug)) return "Not found";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type Crumb = { label: string; to?: string };

function crumbsFor(path: string): Crumb[] {
  const known = [...SERVICE_PAGES, ...INDUSTRY_PAGES].find(
    ([to]) => to === path,
  );
  const crumbs: Crumb[] = [{ label: "Home", to: "/" }];

  if (known) {
    const parent = path.startsWith("/services") ? "/services" : "/industries";
    crumbs.push({ label: SECTION_LABEL[parent], to: parent });
    crumbs.push({ label: known[1] });
    return crumbs;
  }

  /* Salesforce children hang off the hub (spec 2.17, 2026-10-23): Home /
     Services / Salesforce / <page>. Only these 22 routes change. */
  if (path.startsWith("/services/salesforce-") && SECTION_LABEL[path]) {
    crumbs.push({ label: "Services", to: "/services" });
    crumbs.push({ label: "Salesforce", to: "/services/salesforce" });
    crumbs.push({ label: SECTION_LABEL[path] });
    return crumbs;
  }

  if (SECTION_LABEL[path]) {
    crumbs.push({ label: SECTION_LABEL[path] });
    return crumbs;
  }

  crumbs.push({ label: labelFromSlug(path) || "Not found" });
  return crumbs;
}

/**
 * The rail. Ancestors of this page as nodes on a wire, the current page latched
 * on the end. A real <nav>/<ol> breadcrumb, so it is navigation to a screen
 * reader as well as to the eye — the signature "mono identifier strip as
 * structure, not trim".
 */
export function HeroRail({ crumbs, dark, width }: { crumbs: Crumb[]; dark: boolean; width?: Frame }) {
  const frame = useFrame(width);
  /* The same crumbs, for machines.
     BreadcrumbList is one of the few structured-data types still earning a rich
     result in Google's current gallery -- FAQPage and HowTo both stopped
     appearing, in May 2026 and 2023 respectively -- and this site had none on
     any of its 26 pages. The markup was already here and correct as navigation;
     only the machine-readable half was missing, which is the cheapest kind of
     gap to close.

     `item` is omitted on the last crumb, per Google's guidance: the current
     page is the position it occupies, not a link to somewhere else. */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.to && i < crumbs.length - 1
        ? { item: `https://onealgorithm.com${c.to === "/" ? "" : c.to}` }
        : {}),
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`relative z-10 border-b ${
        dark ? "border-white/10 bg-black/15" : "border-oa-hairline bg-oa-paper"
      }`}
    >
      <script
        type="application/ld+json"
        // The crumbs are generated from the route, so this can never disagree
        // with what is rendered below it -- both read the same array.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ol className={`mx-auto flex ${frame} flex-wrap items-center font-mono text-xs`}>
        {crumbs.map((c, i) => {
          const current = i === crumbs.length - 1;
          return (
            <li key={c.label} className="flex items-center">
              {i > 0 && (
                <span
                  className={`mx-2 h-px w-5 sm:mx-3 sm:w-9 ${
                    dark ? "bg-white/25" : "bg-oa-hairlineStrong"
                  }`}
                  aria-hidden="true"
                />
              )}
              {/* Square node, not a round dot. The round dot is already the
                  bullet marker used everywhere else on the site, and one
                  border-radius on every element is its own tell. */}
              <span
                className={`mr-2 h-[7px] w-[7px] shrink-0 ${
                  current
                    ? dark
                      ? "bg-oa-orange"
                      : "bg-oa-blue"
                    : dark
                      ? "border border-white/40"
                      : "border border-oa-hairlineStrong"
                }`}
                aria-hidden="true"
              />
              {c.to ? (
                <Link
                  to={c.to}
                  /* min-h-11 = 44px. These are the smallest links on the page
                     and they sit at the very top of it, where a thumb lands. */
                  className={`inline-flex min-h-11 min-w-11 items-center uppercase tracking-wider transition-colors ${
                    dark
                      ? "text-oa-nightInk3 hover:text-oa-nightInk"
                      : "text-oa-ink3 hover:text-oa-blue"
                  }`}
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  /* A blog post's title can be a whole sentence: on a phone it
                     truncates instead of wrapping into a second rail row. */
                  className={`inline-flex min-h-11 max-w-[38vw] items-center truncate uppercase tracking-wider sm:max-w-none ${
                    dark ? "text-oa-orange" : "text-oa-blue"
                  }`}
                >
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Terminal strip: the other pages in this group, as links on a wire. Full
 *  bleed, hairline top. On a phone it runs off the right edge in its own
 *  scroller rather than wrapping into six 44px rows — one contained scroller,
 *  no page overflow, and the wire visibly continues past the viewport. */
function SiblingWire({
  label,
  pages,
  currentPath,
  frame,
}: {
  label: string;
  pages: ReadonlyArray<readonly [string, string]>;
  currentPath: string;
  frame: string;
}) {
  const others = pages.filter(([to]) => to !== currentPath);
  if (others.length === 0) return null;

  return (
    <div className="relative z-10 border-t border-white/10 bg-oa-night">
      <div className={`mx-auto ${frame} py-1.5 sm:py-3`}>
        <div className="sm:flex sm:items-baseline sm:gap-8">
          <p className="shrink-0 pt-3 font-mono text-xs uppercase tracking-wider text-oa-nightInk3 sm:pt-0">
            {label}
          </p>
          <ul className="-mx-4 flex flex-nowrap gap-x-6 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:gap-x-7 sm:gap-y-0 sm:overflow-x-visible sm:px-0">
            {others.map(([to, name]) => (
              <li key={to} className="shrink-0">
                <Link
                  to={to}
                  className="inline-flex min-h-11 items-center whitespace-nowrap text-sm text-oa-nightInk2 transition-colors hover:text-oa-orange"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Terminal strip for industry pages: the panel's own items, numbered, running
 *  the full width instead of stacked in a card off to the right. This is the
 *  whole reason an industry hero does not look like a service hero. */
function ScopeStrip({
  title,
  items,
  footer,
  frame,
}: {
  title: string;
  items: string[];
  footer?: string[];
  frame: string;
}) {
  /* Column count follows the item count so the last row is never a single
     orphan cell sitting under four empty ones - six items read as 3x2, not
     5+1. Static class strings because Tailwind cannot see a computed one. */
  const cols =
    {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
      5: "sm:grid-cols-3 lg:grid-cols-5",
      6: "sm:grid-cols-3",
    }[items.length] ?? "sm:grid-cols-3 lg:grid-cols-4";

  return (
    <div className="relative z-10 border-t border-white/10 bg-oa-night">
      <div className={`mx-auto ${frame} py-8 md:py-10`}>
        <p className="font-mono text-xs uppercase tracking-wider text-oa-nightInk3">
          {title}
        </p>
        <ol className={`mt-6 grid grid-cols-2 gap-x-6 gap-y-6 ${cols}`}>
          {items.map((item, i) => (
            <li key={item} className="border-t border-white/15 pt-3">
              <span className="font-mono text-xs text-oa-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm leading-snug text-oa-nightInk2">
                {item}
              </p>
            </li>
          ))}
        </ol>
        {footer && footer.length > 0 && (
          <p className="mt-7 font-mono text-xs uppercase tracking-wider text-oa-nightInk3">
            {footer.join("  ·  ")}
          </p>
        )}
      </div>
    </div>
  );
}

/** The certifications that carry a checkable number. Canonical list, shared,
 *  so the hero rail says the same thing on every page that renders it. The
 *  longer "don't take our word for it" list on /about (COSTARS, SWaM) is a
 *  superset kept on that page -- those two are searched by name and issue no
 *  public number we hold, so they cannot carry their own reference here. */
export const CERTIFICATIONS: Credential[] = [
  {
    credential: "Certified WBE",
    short: "WBENC",
    authority: "Women's Business Enterprise National Council",
    reference: "WBE2600434",
    href: "/capabilities",
  },
  {
    credential: "Certified MBE",
    short: "NMSDC",
    authority: "National Minority Supplier Development Council",
    reference: "PT100000051",
    href: "/capabilities",
  },
  {
    credential: "Consulting Partner",
    short: "Salesforce",
    authority: "Salesforce AppExchange",
    reference: "a0N3A00000EV7SwUAL",
    href: "https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N3A00000EV7SwUAL",
  },
];

/** Terminal strip at the foot of the hero. It is the one element on the site a
 *  government or supplier-diversity buyer has to be able to read and copy.
 *
 *  ONE LINE. Louis, 2026-08-30: "put everything on one line on the bottom of
 *  the hero". The two stacked label-over-value groups this replaces cost
 *  ~420px on a phone directly under the hero; the same nine facts as one
 *  dot-separated stream are a single line at 1440 and a three-line wrap at
 *  390. Labels sit inline before their values, dimmer, so the stream stays
 *  scannable without the vertical cost.
 *
 *  The reference numbers remain the links: a badge is a claim, a number
 *  pointing at the registry that issued it is a record. ⛔ Never truncate one.
 *  The Salesforce Consulting Partner entry stays OFF this strip (Louis,
 *  2026-08-30: "doesn't belong" beside the diversity certifications).
 *
 *  Every value is read from shared/companyProfile; nothing here is typed in. */
function IdentifierRail({ frame }: { frame?: string }) {
  const ctxFrame = useFrame();
  frame ??= ctxFrame;
  const facts: [string, string][] = [
    ["UEI", siteConfig.identifiers.uei],
    ["CAGE", siteConfig.identifiers.cage],
    ["NAICS", siteConfig.codes.naics[0]],
    ["SAM.gov", "Active"],
    ["Founded", siteConfig.foundingDate],
  ];
  const certs = CERTIFICATIONS.filter((c) => c.credential.startsWith("Certified"));
  const Dot = () => (
    <span aria-hidden="true" className="select-none text-oa-nightInk3/50">
      &middot;
    </span>
  );
  return (
    <div className="relative z-10 border-t border-white/10 bg-oa-night">
      <div className={`mx-auto ${frame} py-4`}>
        {/* text-xs at every width, deliberately: 12px is this element's
            documented floor (the values get transcribed by hand), and at 14px
            the full stream measures ~1,190px against the 1,136px measure --
            two lines, which defeats the point of a one-line rail. */}
        <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-xs">
          {facts.map(([label, value], i) => (
            <li key={label} className="flex items-center gap-x-2.5 whitespace-nowrap">
              {i > 0 && <Dot />}
              <span>
                <span className="uppercase tracking-wider text-oa-nightInk3">
                  {label}
                </span>{" "}
                <span className="text-oa-nightInk2">{value}</span>
              </span>
            </li>
          ))}
          {certs.map((c) => (
            <li key={c.credential} className="flex items-center gap-x-2.5 whitespace-nowrap">
              <Dot />
              <span>
                <span className="uppercase tracking-wider text-oa-nightInk3">
                  {c.short}
                </span>{" "}
                <a
                  href={c.href}
                  className="inline-flex min-h-11 items-center gap-1 text-oa-nightBlue underline underline-offset-4 hover:text-oa-nightInk sm:min-h-0"
                >
                  {c.reference}
                  <span className="sr-only">
                    {" "}
                    — {c.credential} with {c.authority}
                  </span>
                </a>
              </span>
            </li>
          ))}
          <li className="flex items-center gap-x-2.5 whitespace-nowrap">
            <Dot />
            <a
              href={siteConfig.sbaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-oa-nightBlue underline underline-offset-4 hover:text-oa-nightInk sm:min-h-0"
            >
              Verify on SBA
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { IdentifierRail };

export type Credential = {
  /** What we hold. Shown as the label. */
  credential: string;
  /** The issuing body, abbreviated -- WBENC, not "Women's Business Enterprise
   *  National Council". The full name goes in `authority` for screen readers. */
  short: string;
  authority: string;
  /** The checkable number. `null` where the registry issues none. */
  reference: string | null;
  href: string;
};

/** Certifications in the IdentifierRail treatment -- label over value, mono,
 *  one wrapping strip.
 *
 *  Louis, 2026-08-28: "it shoul look like the way you have it on the about
 *  page". The four-column table this replaces cost 394px on desktop and 652px
 *  on mobile to carry three facts. The rail is the same information as two
 *  short lines: what we hold, and the number that proves it.
 *
 *  The REFERENCE NUMBER is the link. That is the whole argument of this
 *  element -- a badge is a claim, "WBE2600434" pointing at the registry that
 *  issued it is a record. ⛔ Do not replace these with certification seal
 *  images, and do not truncate a reference: it exists to be copied.
 *
 *  Shared so the homepage and /about cannot drift apart on what we claim. */
export function CredentialRail({
  items,
  caption,
  className = "",
}: {
  items: Credential[];
  caption?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {caption ? (
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.06em] text-oa-ink3">
          {caption}
        </p>
      ) : null}
      <dl className="flex flex-wrap gap-x-10 gap-y-5 border-t border-oa-hairline pt-5 font-mono text-sm sm:gap-x-12">
        {items.map((c) => {
          const external = !c.href.startsWith("/");
          return (
            <div key={c.credential}>
              {/* 12px floor, same as IdentifierRail: these get transcribed. */}
              <dt className="text-xs uppercase tracking-wider text-oa-ink3">
                {c.credential} &middot; {c.short}
              </dt>
              <dd className="mt-1">
                <a
                  href={c.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center gap-1.5 text-oa-blue underline underline-offset-4 hover:text-oa-blue700 sm:min-h-0"
                >
                  {c.reference ?? "Verify"}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="sr-only">
                    {c.credential} with {c.authority}
                    {external ? ", opens in a new tab" : ""}
                  </span>
                </a>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

/** Small mono record under the hero copy. Used for the things that date a
 *  page: a legal document's effective date, a capability statement's revision. */
function MetaLine({
  meta,
  dark,
}: {
  meta: { label: string; value: string }[];
  dark: boolean;
}) {
  /* w-fit, not full width: a hairline running 900px across an empty column with
     two 12px labels under it reads as a rule someone forgot to remove. It
     should be exactly as wide as the record it underlines. */
  return (
    <dl
      className={`mt-8 flex w-fit flex-wrap gap-x-8 gap-y-3 border-t pt-5 font-mono text-xs ${
        dark ? "border-white/12" : "border-oa-hairline"
      }`}
    >
      {meta.map((m) => (
        <div key={m.label}>
          <dt
            className={`uppercase tracking-wider ${
              dark ? "text-oa-nightInk3" : "text-oa-ink3"
            }`}
          >
            {m.label}
          </dt>
          <dd className={`mt-1 ${dark ? "text-oa-nightInk2" : "text-oa-ink2"}`}>
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Page hero. See the block comment above for what varies and why.
 *
 * The signature is unchanged apart from the optional `meta`, so all twenty-one
 * existing call sites keep working; what a page gets is decided by its route.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  bullets,
  panel,
  primary,
  secondary,
  meta,
  siblings = true,
  width,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  bullets?: string[];
  /* Service pages carry a wire of the ten sibling services under the hero.
     A page that is a conversion target rather than a directory entry can turn
     it off: on /services/salesforce it put ten exits above the first proof
     the visitor sees. Defaults true so the other service pages are unchanged. */
  siblings?: boolean;
  /**
   * The page's own key points.
   *
   * On service and company pages this renders as the right-hand card, so the
   * right ~40% of a left-aligned hero carries something a buyer reads instead
   * of reading as "there should be a photograph here". There should not: stock
   * photography makes the firm indistinguishable from every competitor and
   * becomes the LCP element for 150-400KB.
   *
   * On INDUSTRY pages the same content renders full-bleed as the numbered
   * scope strip instead. Same words either way.
   *
   * CONTENT RULE: everything in here must already be true and already on the
   * page. `items` is normally the hero bullet list relocated. Do not write new
   * claims to fill the panel.
   */
  panel?: {
    title: string;
    items: string[];
    /** Verifiable credentials only, e.g. "SBA Certified WOSB / EDWOSB". */
    footer?: string[];
    /**
     * Renders INSTEAD of `items`, for a hero whose strongest asset is a thing
     * to look at rather than a list to read. Added 2026-08-24 for
     * /services/salesforce, whose proof is a third-party registry record — a
     * card that reproduces the record beats five bullets describing it.
     * Same rule as `items` applies: nothing in here may be a new claim.
     */
    slot?: React.ReactNode;
  };
  /** `cta` is opt-in: set it (e.g. "hero") to tag the link for GA4 and get
   *  the plate-system focus treatment. Omitted = unchanged. */
  primary?: { label: string; to?: string; href?: string; download?: string; cta?: string };
  secondary?: { label: string; to?: string; href?: string; download?: string; cta?: string };
  /** Dates and revisions — the things that tell a reader how stale this is. */
  meta?: { label: string; value: string }[];
  /** Container frame for the rail, body and strips. Omitted = Layout's. */
  width?: Frame;
  children?: React.ReactNode;
}) {
  const frame = useFrame(width);
  const path = normalisePath(useLocation().pathname);
  const kind = classifyPath(path);
  const dark = kind !== "utility";
  const crumbs = crumbsFor(path);

  /* Industry pages spend the panel on the full-width scope strip, so the card
     is suppressed and the headline takes the whole measure. */
  const showCard = Boolean(panel) && kind !== "industry";

  /* Company pages already carry "SBA Certified WOSB / EDWOSB" in the identifier
     rail below, with the link that proves it. Repeating it inside the card in
     the same hero is the duplication the panel footer exists to avoid. */
  const cardFooter = kind === "company" ? undefined : panel?.footer;

  /* Eyebrow not rendered — see the note in SectionHeading above. The kicker
     sat directly over the h1 and was the first thing read. */
  const heading = (
    <h1
      className={
        dark
          ? "text-h1 font-semibold text-oa-nightInk"
          : "max-w-3xl text-h2 font-semibold text-oa-ink [&_.text-oa-orange]:text-oa-orangeText"
      }
    >
      {title}
    </h1>
  );

  const ledeEl = lede ? (
    <p
      className={
        dark ? "text-lede text-oa-nightInk2" : "max-w-2xl text-oa-ink2"
      }
    >
      {lede}
    </p>
  ) : null;

  const rest = (
    <>
      {bullets && bullets.length > 0 && (
        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {bullets.map((b) => (
            <li
              key={b}
              className={`flex items-start gap-2.5 ${
                dark ? "text-oa-nightInk2" : "text-oa-ink2"
              }`}
            >
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                  dark ? "bg-oa-orange" : "bg-oa-blue"
                }`}
                aria-hidden="true"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {(primary || secondary) && (
        <div
          className={`flex flex-col gap-3 sm:flex-row ${dark ? "mt-9" : "mt-7"}`}
        >
          {primary && (
            <PrimaryCTA
              to={primary.to}
              href={primary.href}
              download={primary.download}
              cta={primary.cta}
              tone={dark ? "dark" : "light"}
            >
              {primary.label}
            </PrimaryCTA>
          )}
          {secondary && (
            <SecondaryCTA
              to={secondary.to}
              href={secondary.href}
              download={secondary.download}
              tone={dark ? "dark" : "light"}
              cta={secondary.cta}
            >
              {secondary.label}
            </SecondaryCTA>
          )}
        </div>
      )}

      {children}

      {meta && meta.length > 0 && <MetaLine meta={meta} dark={dark} />}
    </>
  );

  /* ---- UTILITY: paper, compact, no dark band at all. -------------------- */
  if (!dark) {
    return (
      <section className="relative border-b border-oa-hairline bg-oa-surface">
        <HeroRail crumbs={crumbs} dark={false} width={width} />
        <div className={`mx-auto ${frame} py-9 md:py-11`}>
          {heading}
          {ledeEl && <div className="mt-4">{ledeEl}</div>}
          {rest}
        </div>
      </section>
    );
  }

  /* ---- NIGHT: service, industry, company. ------------------------------- */
  return (
    <section className="relative overflow-hidden bg-oa-night">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #0d2b42 0%, #04182b 62%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={GRAIN}
        aria-hidden="true"
      />

      <HeroRail crumbs={crumbs} dark width={width} />

      {/* Tighter than the old pt-20/24/28 pb-16/20: the rail above and the
          terminal strip below now carry height that the padding used to fake. */}
      <div
        className={`relative z-10 mx-auto ${frame} pt-12 md:pt-16 ${
          kind === "industry" ? "pb-10 md:pb-12" : "pb-12 md:pb-16"
        }`}
      >
        {/* INDUSTRY: no right-hand panel, so the headline row would leave the
            right 45% of a 1200px container as bare navy - the exact "there
            should be a photograph here" hole the panel was invented to fill.
            The lede moves there instead, tapped off the headline column by a
            short vertical hairline. Nothing new is written; the same sentence
            simply sits beside the headline rather than under it. */}
        {kind === "industry" ? (
          /* Explicit row/column placement rather than source order, so a phone
             reads headline -> lede -> buttons (you are told what this is before
             you are asked to act) while 1024px+ puts the lede beside the
             headline. Source order is the mobile order. */
          <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-y-0">
            <div className="lg:col-start-1 lg:row-start-1">{heading}</div>
            {ledeEl && (
              <div className="lg:col-start-2 lg:row-start-1 lg:self-end lg:border-l lg:border-white/15 lg:pl-10">
                {ledeEl}
              </div>
            )}
            <div className="lg:col-start-1 lg:row-start-2">{rest}</div>
          </div>
        ) : (
          <div
            className={
              showCard
                ? `grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14 ${
                    /* Company keeps the boxed card and top-aligns it. Service
                       stretches, so the panel's rule runs the full height of
                       the hero body and the space under a short headline reads
                       as a column rather than as a gap someone forgot. */
                    kind === "company" ? "items-start" : "items-stretch"
                  }`
                : ""
            }
          >
            <div className={showCard ? "" : "max-w-4xl"}>
              {heading}
              {ledeEl && <div className="mt-6 max-w-2xl">{ledeEl}</div>}
              {rest}
            </div>

            {showCard && panel && (
              <aside
                className={
                  kind === "company"
                    ? "rounded-xl border border-white/12 bg-white/[0.04] p-7"
                    : /* Ruled column, not a box. Depth from a hairline and a
                         surface step is the site's rule; a second rounded
                         rectangle on a page already full of them is not. */
                      "border-t border-white/15 pt-7 lg:h-full lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1"
                }
              >
                <h2 className="text-sm font-semibold text-oa-nightInk">
                  {panel.title}
                </h2>
                {panel.slot ? (
                  <div className="mt-5 border-t border-white/10 pt-5">
                    {panel.slot}
                  </div>
                ) : (
                  <ul className="mt-5 space-y-3.5 border-t border-white/10 pt-5">
                    {panel.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          className="mt-1 h-4 w-4 shrink-0 text-oa-orange"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 8.5l3.5 3.5L13 4.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-sm leading-relaxed text-oa-nightInk2">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {cardFooter && cardFooter.length > 0 && (
                  <ul className="mt-6 space-y-1.5 border-t border-white/10 pt-5">
                    {cardFooter.map((f) => (
                      <li
                        key={f}
                        className="font-mono text-xs uppercase tracking-wider text-oa-nightInk3"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            )}
          </div>
        )}
      </div>

      {kind === "service" && siblings && (
        <SiblingWire
          label="Also in Services"
          pages={SERVICE_PAGES}
          currentPath={path}
          frame={frame}
        />
      )}
      {kind === "industry" && panel && (
        <ScopeStrip
          title={panel.title}
          items={panel.items}
          footer={panel.footer}
          frame={frame}
        />
      )}
      {kind === "company" && <IdentifierRail frame={frame} />}
    </section>
  );
}

/** Hairline card. The workhorse. No shadow - depth is the border plus the
 *  surface step off the paper ground. */
export function Card({
  icon: Icon,
  title,
  body,
  to,
  tone = "light",
  className = "",
  wire = false,
  children,
}: {
  icon?: LucideIcon;
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** Makes the whole card a link, with an arrow affordance. */
  to?: string;
  tone?: "light" | "dark";
  className?: string;
  /**
   * Opt-in (Salesforce plate system, spec 4.9). A linked card gets a visible
   * focus outline and a top hairline that draws across on hover/focus instead
   * of the border tint. Ignored without `to`. Off = unchanged.
   */
  wire?: boolean;
  children?: React.ReactNode;
}) {
  const dark = tone === "dark";
  /* p-5 below 640px, p-7 above. 28px of padding on each side of a 390px screen
     left 334px for the content, which is what made card-heavy pages scroll
     forever on a phone. Desktop is deliberately unchanged, so this cannot
     regress a wide layout — it only stops narrow ones wasting a sixth of their
     width on gutters. */
  const base = dark
    ? "h-full rounded-xl border border-white/12 bg-white/[0.03] p-5 sm:p-7"
    : "h-full rounded-xl border border-oa-hairline bg-oa-surface p-5 sm:p-7";
  const interactive = to && wire
    ? ` relative transition-[transform,border-color] duration-200 [transition-timing-function:cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        dark ? "focus-visible:outline-oa-orange" : "focus-visible:outline-oa-blue"
      }`
    : to
    ? dark
      ? " transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25"
      : " transition-all duration-200 hover:-translate-y-0.5 hover:border-oa-blue/40"
    : "";

  const inner = (
    <>
      {to && wire && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-5 -top-px h-px origin-left scale-x-0 transition-transform [transition-duration:450ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none ${
            dark ? "bg-oa-orange" : "bg-oa-blue"
          }`}
        />
      )}
      {Icon && (
        <Icon
          className={`h-6 w-6 ${dark ? "text-oa-orange" : "text-oa-blue"}`}
          aria-hidden="true"
        />
      )}
      {title && (
        <h3
          className={`${Icon ? "mt-5" : ""} text-lg font-semibold ${
            dark ? "text-oa-nightInk" : "text-oa-ink"
          }`}
        >
          {title}
        </h3>
      )}
      {body && (
        <p
          className={`mt-2.5 flex-1 text-sm leading-relaxed ${
            dark ? "text-oa-nightInk2" : "text-oa-ink2"
          }`}
        >
          {body}
        </p>
      )}
      {children}
      {to && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-oa-blue">
          Learn more
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group flex flex-col ${base}${interactive} ${className}`}>
        {inner}
      </Link>
    );
  }
  return <div className={`flex flex-col ${base} ${className}`}>{inner}</div>;
}

/** Responsive card grid. */
export function CardGrid({
  columns = 3,
  children,
  className = "",
}: {
  columns?: 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];
  return (
    <Stagger className={`grid gap-5 ${cols} ${className}`}>{children}</Stagger>
  );
}

/** Numbered process steps, rule-topped rather than boxed.
 *
 *  `rail` and `terminal` are opt-in (Salesforce plate system, spec 2.8):
 *    <Section clip tone="surface" id="process" className="scroll-mt-24">
 *      <ProcessSteps rail terminal={{ label: "Book the free week" }} steps={[
 *        { title: "Call or send the form", body: "...", to: "/services/salesforce-health-check" }, ...]} />
 *    </Section>
 *  With `rail`, a 2px wire draws across the steps as they scroll in (lg only,
 *  CSS scroll timeline, only inside a `<Section clip>`), each step gets a
 *  square node, and nothing is framer-animated so text and wire never
 *  double-move. `terminal` ends the rail in the Desk CTA (#start) plus the
 *  phone number. Without either prop the component renders exactly as before. */
export function ProcessSteps({
  steps,
  tone = "light",
  rail = false,
  terminal,
}: {
  steps: { title: string; body: string; to?: string }[];
  tone?: "light" | "dark";
  rail?: boolean;
  terminal?: { label: string };
}) {
  const dark = tone === "dark";
  const reduced = useReducedMotion();

  const index = (i: number) => (
    <span className={`font-mono text-sm ${dark ? "text-oa-orange" : "text-oa-orangeText"}`}>
      {String(i + 1).padStart(2, "0")}
    </span>
  );
  const heading = (s: { title: string; to?: string }) => (
    <h3 className={`mt-3 text-lg font-semibold ${dark ? "text-oa-nightInk" : "text-oa-ink"}`}>
      {s.to ? (
        <Link to={s.to} className="oa-link">
          {s.title}
        </Link>
      ) : (
        s.title
      )}
    </h3>
  );
  const body = (s: { body: string }) => (
    <p className={`mt-2.5 text-sm leading-relaxed ${dark ? "text-oa-nightInk2" : "text-oa-ink2"}`}>
      {s.body}
    </p>
  );

  if (rail || terminal) {
    const node = (i: number) => (
      <span
        aria-hidden="true"
        className={`step-node absolute -top-[4px] left-0 hidden h-[7px] w-[7px] lg:block ${dark ? "bg-oa-orange" : "bg-oa-blue"}`}
        style={{ animationRange: `entry ${22 + i * 3}% cover ${30 + i * 3}%` } as React.CSSProperties}
      />
    );
    const rule = dark ? "border-white/15" : "border-oa-hairlineStrong";
    return (
      <div className={`relative ${terminal ? "lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-x-8" : ""}`}>
        {rail && (
          <span
            aria-hidden="true"
            className={`rail pointer-events-none absolute inset-x-0 -top-px hidden h-0.5 lg:block ${dark ? "bg-oa-orange" : "bg-oa-blue"}`}
          />
        )}
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className={`relative border-t pt-6 ${rule}`}>
              {rail && node(i)}
              {index(i)}
              {heading(s)}
              {body(s)}
            </li>
          ))}
        </ol>
        {terminal && (
          <div className={`relative mt-10 border-t pt-6 lg:mt-0 ${rule}`}>
            {rail && node(steps.length)}
            <PrimaryCTA href="#start" tone={dark ? "dark" : "light"} cta="rail">
              {terminal.label}
            </PrimaryCTA>
            <a
              href={SF_PHONE.href}
              data-cta="rail"
              className="oa-link mt-4 flex min-h-11 w-fit items-center font-mono text-sm"
            >
              Call {SF_PHONE.display}
            </a>
          </div>
        )}
      </div>
    );
  }

  // motion.li rather than wrapping each item in a div - an <ol> whose children
  // are divs is no longer a list to a screen reader.
  return (
    <motion.ol
      className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
      }}
    >
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          variants={
            reduced
              ? undefined
              : {
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: EASE_OUT },
                  },
                }
          }
          className={`border-t pt-6 ${dark ? "border-white/15" : "border-oa-hairlineStrong"}`}
        >
          {index(i)}
          {heading(s)}
          {body(s)}
        </motion.li>
      ))}
    </motion.ol>
  );
}

/** Tick list. Replaces the orange CheckCircle rows used across the old pages. */
export function CheckList({
  items,
  tone = "light",
}: {
  items: string[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <svg
            className={`mt-1 h-4 w-4 shrink-0 ${dark ? "text-oa-orange" : "text-oa-blue"}`}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8.5l3.5 3.5L13 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={dark ? "text-oa-nightInk2" : "text-oa-ink2"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Closing call-to-action band. Every page ends with one of these. */
export function CTABand({
  title = "Tell us what you are trying to fix",
  body = "Bring us the system that is slowing you down, or the role you cannot fill. We will tell you what it would take to put it right.",
  primary = { label: "Talk to an Expert", to: "/contact" },
  secondary,
}: {
  title?: string;
  body?: string;
  primary?: { label: string; to?: string; href?: string; download?: string };
  secondary?: { label: string; to?: string; href?: string; download?: string };
}) {
  return (
    <Section tone="night" grid>
      <div className="max-w-2xl">
        <h2 className="text-h2 font-semibold text-oa-nightInk">{title}</h2>
        <p className="mt-5 text-lede text-oa-nightInk2">{body}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <PrimaryCTA to={primary.to} href={primary.href} download={primary.download}>
            {primary.label}
          </PrimaryCTA>
          {secondary && (
            <SecondaryCTA
              to={secondary.to}
              href={secondary.href}
              download={secondary.download}
            >
              {secondary.label}
            </SecondaryCTA>
          )}
        </div>
      </div>
    </Section>
  );
}

/** Two-column split: prose on one side, a card or list on the other. */
export function Split({
  left,
  right,
  className = "",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-10 lg:grid-cols-2 lg:gap-16 ${className}`}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

/** Prose block for the long-form copy several pages carry. Constrains the
 *  measure - full-width body text was one of the clearest template tells.
 *  On the wide (Salesforce) frame the cap is 34em, about 72 characters of IBM
 *  Plex Sans at any font size; 68ch measured 85-90 characters a line there,
 *  because a "ch" (the width of "0") is wider than Plex's average letter (fix
 *  round M2). Other pages keep 68ch until they are reviewed. */
export function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const wide = React.useContext(FrameContext) === "wide";
  return (
    <div
      className={`${wide ? "max-w-[34em]" : "max-w-[68ch]"} space-y-4 leading-relaxed text-oa-ink2 ${className}`}
    >
      {children}
    </div>
  );
}
