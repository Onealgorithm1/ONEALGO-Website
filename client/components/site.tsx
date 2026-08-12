import React from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./ui/button";

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

/** Reveals its children on scroll. No-ops entirely under reduced motion. */
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
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
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

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
      }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          className="h-full"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.35, ease: EASE_OUT },
            },
          }}
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

/** Standard page section. Handles ground colour, rhythm and the container. */
export function Section({
  tone = "paper",
  children,
  className = "",
  bordered = false,
  grid = false,
  compact = false,
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
  /** Anchor target, for in-page links. */
  id?: string;
}) {
  const dark = tone === "night";

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
      className={`relative overflow-hidden ${TONE_BG[tone]} ${rules} ${className}`}
    >
      {grid && dark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={GRAIN}
          aria-hidden="true"
        />
      )}
      <div
        className={`relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 ${
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
          className={`mt-5 text-lede ${
            dark ? "text-oa-nightInk2" : "text-oa-ink2"
          }`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/** Primary call to action. Orange fill, ink label. */
export function PrimaryCTA({
  to,
  href,
  children,
  download,
  className = "",
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  download?: string;
  className?: string;
}) {
  /* py-3 rather than the button's default zero vertical padding. `size="lg"`
     is `h-11 px-8` -- a fixed 44px box with no vertical inset at all, so a
     long label sat flush against the top and bottom of its own fill. 12px + a
     20px line box is exactly 44px, so nothing moves; the padding is simply
     declared instead of implied by the fixed height. */
  const classes = `bg-oa-orange text-oa-ink hover:bg-[#ffb757] font-semibold px-7 py-3 ${className}`;
  return (
    <Button asChild size="lg" className={classes}>
      {to ? (
        <Link to={to}>
          {children}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      ) : (
        <a
          href={href}
          download={download}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )}
    </Button>
  );
}

/** Secondary call to action. Ghost on dark, hairline outline on light. */
export function SecondaryCTA({
  to,
  href,
  children,
  download,
  tone = "dark",
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  download?: string;
  tone?: "light" | "dark";
}) {
  // py-3 for the same reason as PrimaryCTA above.
  const classes =
    tone === "dark"
      ? "border-white/25 bg-white/5 text-oa-nightInk hover:bg-white/10 hover:text-oa-nightInk px-7 py-3"
      : "border-oa-hairlineStrong bg-oa-surface text-oa-ink hover:bg-oa-blueTint hover:text-oa-ink px-7 py-3";
  return (
    <Button asChild size="lg" variant="outline" className={classes}>
      {to ? (
        <Link to={to}>{children}</Link>
      ) : (
        <a
          href={href}
          download={download}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )}
    </Button>
  );
}

/**
 * Page hero. Dark ground, left-aligned, type-led.
 *
 * Replaces the old pattern of a centred heading on a blue gradient with an
 * orange sub-line - the orange failed contrast, and centring everything left
 * no hierarchy. `bullets` renders the short proof list several service pages
 * carried in their hero.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  bullets,
  panel,
  primary,
  secondary,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  bullets?: string[];
  /**
   * Right-hand substance panel.
   *
   * The inner-page heroes are left-aligned in a 1200px container, so without
   * this the right ~40% is dead space - which reads as "there should be an
   * image here". There should not. A photograph on a consulting page is either
   * stock (in which case it makes the firm indistinguishable from every
   * competitor, and becomes the LCP element for 150-400KB) or it does not
   * exist, because there is no photography budget.
   *
   * So the space carries something a buyer actually reads instead: the page's
   * own key points, and where relevant a credential they can verify. Costs
   * nothing to load.
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
  };
  primary?: { label: string; to?: string; href?: string; download?: string };
  secondary?: { label: string; to?: string; href?: string; download?: string };
  children?: React.ReactNode;
}) {
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
      <div className="absolute inset-0 pointer-events-none" style={GRAIN} aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-20">
        {/* 7/5 split when a panel is supplied, otherwise the original single
            column. The panel drops below the text on anything under lg. */}
        <div
          className={
            panel
              ? "grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14"
              : ""
          }
        >
        <div className={panel ? "" : "max-w-4xl"}>
          {/* Eyebrow not rendered — see the note in SectionHeading above. Same
              reasoning applies to the page hero, where the kicker sits directly
              over the h1 and is the first thing a visitor reads. */}
          <h1 className="text-h1 font-semibold text-oa-nightInk">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-lede text-oa-nightInk2">{lede}</p>
          )}

          {bullets && bullets.length > 0 && (
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-oa-nightInk2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oa-orange"
                    aria-hidden="true"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {(primary || secondary) && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {primary && (
                <PrimaryCTA
                  to={primary.to}
                  href={primary.href}
                  download={primary.download}
                >
                  {primary.label}
                </PrimaryCTA>
              )}
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
          )}

          {children}
        </div>

        {panel && (
          <aside className="rounded-xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-oa-nightInk">
              {panel.title}
            </h2>
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

            {panel.footer && panel.footer.length > 0 && (
              <ul className="mt-6 space-y-1.5 border-t border-white/10 pt-5">
                {panel.footer.map((f) => (
                  <li
                    key={f}
                    className="font-mono text-[11px] uppercase tracking-wider text-oa-nightInk3"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </aside>
        )}
        </div>
      </div>
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
  children,
}: {
  icon?: LucideIcon;
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** Makes the whole card a link, with an arrow affordance. */
  to?: string;
  tone?: "light" | "dark";
  className?: string;
  children?: React.ReactNode;
}) {
  const dark = tone === "dark";
  const base = dark
    ? "h-full rounded-xl border border-white/12 bg-white/[0.03] p-7"
    : "h-full rounded-xl border border-oa-hairline bg-oa-surface p-7";
  const interactive = to
    ? dark
      ? " transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25"
      : " transition-all duration-200 hover:-translate-y-0.5 hover:border-oa-blue/40"
    : "";

  const inner = (
    <>
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

/** Numbered process steps, rule-topped rather than boxed. */
export function ProcessSteps({
  steps,
  tone = "light",
}: {
  steps: { title: string; body: string }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const reduced = useReducedMotion();

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
          <span
            className={`font-mono text-sm ${dark ? "text-oa-orange" : "text-oa-orangeText"}`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            className={`mt-3 text-lg font-semibold ${dark ? "text-oa-nightInk" : "text-oa-ink"}`}
          >
            {s.title}
          </h3>
          <p
            className={`mt-2.5 text-sm leading-relaxed ${
              dark ? "text-oa-nightInk2" : "text-oa-ink2"
            }`}
          >
            {s.body}
          </p>
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
 *  measure - full-width body text was one of the clearest template tells. */
export function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-[68ch] space-y-4 leading-relaxed text-oa-ink2 ${className}`}
    >
      {children}
    </div>
  );
}
