import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Cable, Calculator, DatabaseZap, LifeBuoy, Mail, MapPin, Stethoscope, Users } from "lucide-react";
import {
  Card,
  CardGrid,
  PrimaryCTA,
  SecondaryCTA,
  Section,
  SectionHeading,
  normalisePath,
  FRAME,
} from "./site";
import {
  SF_APPEXCHANGE_URL,
  SF_CERTIFICATIONS,
  SF_CERTIFIED_PEOPLE,
  SF_DELIVERED,
  SF_LISTING_ID,
  SF_PAGES,
  SF_PEOPLE,
  SF_PHONE,
  SF_PLATFORM_CERTS,
  SF_VERIFIED_LABEL,
  type SfDeliveredId,
  type SfPageKey,
} from "../data/salesforceProof";
import type { PlateSpec, ShotSpec } from "../data/plates/types";

/* ---------------------------------------------------------------------------
   SALESFORCE PLATE SYSTEM — shared primitives for the 22 Salesforce routes
   (build spec: onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/design-spec.md §2).

   WHY THIS IS NOT IN site.tsx
   AGENTS.md says new primitives go in site.tsx. These are Salesforce-only, and
   site.tsx is imported by Layout, so anything in it ships in the main chunk on
   every page of the site. Keeping them here means only the Salesforce route
   chunks pay for the form, the plate overlay and the observers (spec §8:
   "Shared chunk unchanged"). The rule's intent still holds: no Salesforce page
   hand-rolls any of these. Generic changes (Section `clip`, CTA `cta`/`tone`,
   Card `wire`, ProcessSteps `rail`/`terminal`) ARE in site.tsx, all opt-in.

   RULES FOR PAGE AUTHORS
   - Honesty: every figure comes from data/salesforceProof.ts. Owner-gated
     components (PeopleStrip, reply promise) render nothing until their data
     exists. Never pass invented numbers, clients, prices or SLAs.
   - Motion (spec §4.8): never wrap AnswerBand, Plate, Specimen, RecordLine,
     RecordBand, CTAProof, Desk or LeadForm in Reveal/Stagger.
   - Scroll effects (trace draw, sweep, rail) only run inside `<Section clip>`.
     Outside one, everything renders in its final, fully drawn state.
   - Anchors: give every Section an `id`. On Salesforce pages Layout sets
     `scroll-padding: 6rem` on <html>, so do NOT add scroll-mt-* as well (the
     two add up).
   - One Desk (id="start") per page. Every primary CTA points at "#start".
--------------------------------------------------------------------------- */

const HC_PATH = "/services/salesforce-health-check";

/* ============================ PLATES ==================================== */

type PlateState = {
  active: string | null;
  pinned: string | null;
  set: (k: string | null) => void;
  pin: (k: string) => void;
};
const PlateCtx = React.createContext<PlateState>({
  active: null,
  pinned: null,
  set: () => {},
  pin: () => {},
});

/**
 * Shares hover/focus/pin state between a plate's wires and the HTML rows that
 * describe them.
 *
 *   import { PLATES } from "../../data/plates/hub";
 *   <Section clip tone="paper" id="work">
 *     <PlateScope>
 *       <Plate spec={PLATES["salesforce-implementation-stages"]} fig={1} first
 *              stamp={["DIAGRAM · HOW AN IMPLEMENTATION RUNS", "ONEALGORITHM"]} caption="…" />
 *       {stages.map(s => { const { rowProps } = usePlate(); … })}
 *       // or: <WiredRow k="s1" as="div" className="…">…</WiredRow>
 *     </PlateScope>
 *   </Section>
 */
export function PlateScope({ children }: { children: React.ReactNode }) {
  const [hover, set] = React.useState<string | null>(null);
  const [pinned, setPinned] = React.useState<string | null>(null);
  const v = React.useMemo(
    () => ({
      active: hover ?? pinned,
      pinned,
      set,
      pin: (k: string) => setPinned((p) => (p === k ? null : k)),
    }),
    [hover, pinned],
  );
  return <PlateCtx.Provider value={v}>{children}</PlateCtx.Provider>;
}

/** Spread onto any row/block wired to a plate:
 *  `<tr {...rowProps("bp")} className="plate-row">`. Mouse hover previews,
 *  focus previews, click/tap pins (touch has no hover). */
export function usePlate() {
  const { active, set, pin } = React.useContext(PlateCtx);
  const rowProps = (k: string) => ({
    "data-on": active === k,
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") set(k);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") set(null);
    },
    onFocus: () => set(k),
    onBlur: () => set(null),
    onClick: () => pin(k),
  });
  return { rowProps };
}

/** A block wired to plate key `k`, for when a hook call per row is awkward.
 *  `<WiredRow k="s2" className="plate-row border-t …">…</WiredRow>` */
export function WiredRow({
  k,
  as: Tag = "div",
  className = "",
  children,
}: {
  k: string;
  as?: "div" | "li" | "section" | "article";
  className?: string;
  children: React.ReactNode;
}) {
  const { rowProps } = usePlate();
  return (
    <Tag {...rowProps(k)} className={`plate-row ${className}`}>
      {children}
    </Tag>
  );
}

/** The two-cell mono provenance stamp on the frame's bottom edge. Below sm the
 *  halves stack: a long right label (Philadelphia's map credit) squeezed the
 *  left one to a word per line and overlapped it at 390px (fix round M1). */
function Stamp({ fig, stamp, night }: { fig: number; stamp: [string, string]; night: boolean }) {
  return (
    <div
      className={`grid grid-cols-1 border-t border-[var(--line)] font-mono text-[11px] uppercase leading-4 tracking-[0.14em] sm:grid-cols-[minmax(0,1fr)_auto] ${
        night ? "text-oa-nightInk3" : "text-oa-ink3"
      }`}
    >
      <span className="px-3 py-2">
        FIG. {fig} · {stamp[0]}
      </span>
      <span className="border-t border-[var(--line)] px-3 py-2 sm:border-l sm:border-t-0">{stamp[1]}</span>
    </div>
  );
}

/**
 * Provenance-stamped plate (diagram, chart or map). Geometry comes from the
 * page's own generated file, never from site-wide data:
 *
 *   import { PLATES } from "../../data/plates/health-check";
 *   <Plate spec={PLATES["salesforce-health-check-five-areas"]} fig={2} legend
 *          stamp={["DIAGRAM · WHAT THE WEEK COVERS", "ONEALGORITHM"]}
 *          caption="The five areas the week covers." />
 *
 * `first` = the first <figure> on the page: eager, static, no draw, no sweep.
 * Below 1024px the `-m` file (wires baked in the signal colour) is shown and
 * there is no overlay. The stamp is the honesty mechanism: say what the image
 * is and where it came from, e.g. "TYPICAL … PATTERN, ILLUSTRATIVE" (say what it is, not what it is not).
 */
export function Plate({
  spec,
  fig,
  caption,
  stamp,
  tone = "light",
  first = false,
  legend = false,
}: {
  spec: PlateSpec;
  fig: number;
  caption: React.ReactNode;
  stamp: [string, string];
  tone?: "light" | "night";
  first?: boolean;
  legend?: boolean;
}) {
  const { active, pinned, set, pin } = React.useContext(PlateCtx);
  const keys = [...spec.traces.map((t) => t.k), ...spec.nodes.map((n) => n.k)];
  const night = tone === "night";
  return (
    /* sm-lg: the phone drawing (640 wide, 26px labels) is capped at 560px. At 768-1023 it
       stretched to ~720px and its labels rendered larger than the H2s (fix round M6). */
    <figure
      id={`fig-${spec.id}`}
      className="plate sm:mx-auto sm:max-w-[560px] lg:mx-0 lg:max-w-none"
      data-tone={tone}
      {...(first ? {} : { "data-draw": "" })}
    >
      <div className="plate-frame">
        <div className="sweep relative" {...(first ? {} : { "data-sweep": "mobile" })}>
          <picture>
            <source media="(max-width: 1023px)" srcSet={spec.mSrc} width={spec.mw} height={spec.mh} />
            <img
              src={spec.src}
              width={spec.w}
              height={spec.h}
              alt={spec.alt}
              loading={first ? "eager" : "lazy"}
              decoding="async"
              className="block h-auto w-full"
            />
          </picture>
          <svg
            className="trace hidden lg:block"
            viewBox={`0 0 ${spec.w} ${spec.h}`}
            aria-hidden="true"
            focusable="false"
            data-any={active !== null && keys.includes(active)}
          >
            {spec.traces.map((t, n) => (
              <path
                key={`${t.k}-${n}`}
                d={t.d}
                pathLength={1}
                data-on={active === t.k}
                style={{ animationRange: `entry ${15 + t.i * 4}% cover ${45 + t.i * 4}%` } as React.CSSProperties}
              />
            ))}
            {spec.nodes.map((n) => (
              <rect key={n.k} x={n.x} y={n.y} width={n.w} height={n.h} data-on={active === n.k} />
            ))}
          </svg>
        </div>
        <Stamp fig={fig} stamp={stamp} night={night} />
      </div>
      {legend && spec.legend && (
        <ul className="legend mt-4 hidden gap-x-8 lg:grid lg:grid-cols-3">
          {spec.legend.map((l) => (
            <li key={l.k}>
              <button
                type="button"
                aria-pressed={pinned === l.k}
                data-on={active === l.k}
                onPointerEnter={(e) => e.pointerType === "mouse" && set(l.k)}
                onPointerLeave={(e) => e.pointerType === "mouse" && set(null)}
                onFocus={() => set(l.k)}
                onBlur={() => set(null)}
                onClick={() => pin(l.k)}
                className={`flex min-h-11 w-full items-center gap-3 border-t py-2 text-left text-sm transition-colors duration-150 ${
                  night
                    ? "border-white/10 text-oa-nightInk2 data-[on=true]:text-oa-nightInk"
                    : "border-oa-hairline text-oa-ink2 data-[on=true]:text-oa-ink"
                }`}
              >
                <span aria-hidden="true" className="sw h-2.5 w-2.5 shrink-0" />
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      <figcaption className={`mt-3 max-w-[40rem] text-sm ${night ? "text-oa-nightInk2" : "text-oa-ink2"}`}>{caption}</figcaption>
    </figure>
  );
}

/**
 * Demo-org screenshot, educational how-to only (spec 2.3). At most 2 per page,
 * never in the first viewport. ⛔ Owner-gated: no SHOTS exist until the demo
 * org is approved (spec §7.1); do not render one without real files.
 *
 *   import { SHOTS } from "../../data/plates/health-check";
 *   <Specimen shot={SHOTS["salesforce-health-check-setup-score"]} fig={3}
 *     alt="Screenshot of Salesforce Setup, Health Check, in OneAlgorithm's demo org …"
 *     stamp={["SALESFORCE SOFTWARE · ONEALGORITHM DEMO ORG · SAMPLE DATA", "OCT 2026"]}
 *     caption="Salesforce Setup › Health Check (Salesforce software), in OneAlgorithm's own demo org with sample data."
 *     pins={[{ n: 1, x: 18, y: 22, label: "The overall score" }]} />
 */
export function Specimen({
  shot,
  fig,
  alt,
  caption,
  stamp,
  pins,
  tone = "light",
  sizes = "(min-width: 1024px) 760px, calc(100vw - 32px)",
}: {
  shot: ShotSpec;
  fig: number;
  alt: string;
  caption: React.ReactNode;
  stamp: [string, string];
  pins: { n: number; x: number; y: number; label: string }[];
  tone?: "light" | "night";
  sizes?: string;
}) {
  const [hover, setHover] = React.useState<number | null>(null);
  const [pinned, setPinned] = React.useState<number | null>(null);
  const on = hover ?? pinned;
  const id = `fig-${shot.id}`;
  const night = tone === "night";
  const set = (t: string) => shot.widths.map((x) => `/media/salesforce/${shot.id}-${x}.${t} ${x}w`).join(", ");
  const fallback = shot.widths[Math.min(1, shot.widths.length - 1)];
  return (
    <figure id={id} className="plate" data-tone={tone} style={{ maxWidth: shot.cssW }}>
      <div className="plate-frame">
        <div className="sweep relative" data-sweep="always">
          <picture>
            <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
            <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
            <img
              src={`/media/salesforce/${shot.id}-${fallback}.webp`}
              width={shot.w}
              height={shot.h}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </picture>
          <div className="pins pointer-events-none absolute inset-0">
            {pins.map((p) => (
              <button
                key={p.n}
                type="button"
                className="pin pointer-events-auto"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                aria-label={`Callout ${p.n}: ${p.label}`}
                aria-describedby={`${id}-l${p.n}`}
                aria-pressed={pinned === p.n}
                data-on={on === p.n}
                data-dim={on !== null && on !== p.n}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(p.n)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(p.n)}
                onBlur={() => setHover(null)}
                onClick={() => setPinned((v) => (v === p.n ? null : p.n))}
              >
                <span className="pin-mark">{p.n}</span>
              </button>
            ))}
          </div>
        </div>
        <Stamp fig={fig} stamp={stamp} night={night} />
      </div>
      <ol className={`mt-4 grid gap-y-1 text-sm sm:grid-cols-2 sm:gap-x-8 ${night ? "text-oa-nightInk2" : "text-oa-ink2"}`}>
        {pins.map((p) => (
          <li
            key={p.n}
            id={`${id}-l${p.n}`}
            data-on={on === p.n}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(p.n)}
            onPointerLeave={() => setHover(null)}
            className={`flex gap-3 px-2 py-1.5 transition-colors duration-150 ${
              night ? "data-[on=true]:bg-white/[0.06]" : "data-[on=true]:bg-oa-blueTint"
            }`}
          >
            <span className="pin-key" aria-hidden="true">
              {p.n}
            </span>
            {p.label}
          </li>
        ))}
      </ol>
      <figcaption className={`mt-3 text-sm ${night ? "text-oa-nightInk2" : "text-oa-ink2"}`}>
        {caption}{" "}
        <a className="oa-link" href={`/media/salesforce/${shot.id}-${shot.widths[shot.widths.length - 1]}.webp`}>
          Open full size
        </a>
      </figcaption>
    </figure>
  );
}

/* ====================== ANSWER BAND / JUMP LIST ========================= */

/** In-page contents. Renders nothing under 6 items (not worth the space).
 *  `<JumpList items={[{ id: "answer", label: "The short answer" }, …]} />` */
export function JumpList({ items }: { items: { id: string; label: string }[] }) {
  if (items.length < 6) return null;
  return (
    <nav aria-label="On this page" className="mt-8 border-t border-oa-hairline pt-2">
      <ol className="flex flex-wrap gap-x-6 font-mono text-[13px]">
        {items.map((t, i) => (
          <li key={t.id}>
            <a href={`#${t.id}`} className="oa-link inline-flex min-h-11 items-center gap-2">
              <span className="tabular-nums text-oa-ink3">{String(i + 1).padStart(2, "0")}</span>
              {t.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Sticky "On this page" bar for the long cost guide only (wide-layout addendum
 * rule 2, fix round M9). xl and up, pinned under the site header while the
 * wrapped sections are on screen; the section in view is marked. Below xl the
 * AnswerBand's JumpList is the only TOC.
 *   <StickyToc items={TOC}>…the sections it covers…</StickyToc>
 * ponytail: a horizontal bar rather than a side rail, because every Section is
 * a full-bleed band with its own frame; a rail would mean re-framing all ten.
 */
export function StickyToc({ items, children }: { items: { id: string; label: string }[]; children: React.ReactNode }) {
  const [current, setCurrent] = React.useState<string | null>(null);
  React.useEffect(() => {
    const els = items.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-130px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  return (
    <div>
      <nav aria-label="On this page" className="sticky top-16 z-40 hidden border-b border-oa-hairline bg-white/95 backdrop-blur xl:block">
        <div className={`mx-auto ${FRAME.wide}`}>
          <ol className="flex gap-x-5 overflow-x-auto whitespace-nowrap font-mono text-xs">
            {items.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  aria-current={current === t.id ? "location" : undefined}
                  className="inline-flex min-h-11 items-center border-b-2 border-transparent text-oa-ink2 transition-colors hover:text-oa-ink aria-[current=location]:border-oa-blue aria-[current=location]:text-oa-ink"
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>
      {children}
    </div>
  );
}

/**
 * The 40–60-word answer that sits right under the hero (no motion).
 *
 *   <AnswerBand question="What is a Salesforce health check?"
 *     answer="…40–60 self-contained words…"
 *     leads={[{ label: "Why it matters", body: "…" },
 *             { label: "What it costs", body: <>Free for one week. <Link className="oa-link" to="/services/salesforce-implementation-cost">Cost guide</Link></> }]}
 *     toc={[{ id: "why-now", label: "Why now" }, …]}>
 *     <RecordLine />
 *   </AnswerBand>
 *
 * "What it costs" must always link to the health check or the cost guide.
 */
export function AnswerBand({
  question,
  answer,
  leads,
  toc,
  children,
}: {
  question: string;
  answer: string;
  leads: { label: "Why it matters" | "What we do" | "What it costs"; body: React.ReactNode }[];
  toc?: { id: string; label: string }[];
  children?: React.ReactNode;
}) {
  /* Wide-layout addendum + fix round M3: at xl the question and answer hold
     the left half at a ~72-character measure, and the three leads, the record
     line and the jump list fill the right half. With only the jump list on the
     right, 59-81% of it sat empty under every hero (and the PA page, with no
     toc, had no right column at all). Phone order is unchanged. */
  return (
    <Section tone="paper" compact id="answer" width="wide">
      <div className="xl:grid xl:grid-cols-2 xl:gap-16">
        <div>
          <h2 className="max-w-[34em] text-h2 font-semibold text-oa-ink">{question}</h2>
          <p className="mt-5 max-w-[34em] text-lede font-medium text-oa-ink">{answer}</p>
        </div>
        <div className="xl:border-l xl:border-oa-hairline xl:pl-12 xl:[&>nav:first-child]:mt-0">
          <dl className="mt-6 max-w-[34em] space-y-3 text-oa-ink2 xl:mt-1">
            {leads.map((l) => (
              <div key={l.label}>
                <dt className="inline font-semibold text-oa-ink">{l.label}: </dt>
                <dd className="inline">{l.body}</dd>
              </div>
            ))}
          </dl>
          {children && <div className="mt-8">{children}</div>}
          {toc && <JumpList items={toc} />}
        </div>
      </div>
    </Section>
  );
}

/* ========================= DELIVERED LEDGER ============================= */

/**
 * The four approved delivery facts, as ruled rows. The row for the current
 * page is plain text; the rest link to their service page.
 *   <DeliveredLedger title="Salesforce work we have delivered" lead="lowcode" />
 * Wrap in a Section yourself (it is content, not a band).
 */
export function DeliveredLedger({ title, lead, lede }: { title: string; lead?: SfDeliveredId; lede?: React.ReactNode }) {
  const path = normalisePath(useLocation().pathname);
  const rows = [...SF_DELIVERED].sort((a, b) => (a.id === lead ? -1 : b.id === lead ? 1 : 0));
  /* No default lede: the old fixed line ("We do not name clients, and we will
     not invent case studies") announced an absence, which the voice addendum
     (rule 4) bans. Honesty is kept by the rows themselves: approved wording
     only, no client named anywhere. */
  return (
    <>
      <SectionHeading title={title} lede={lede} />
      <ul className="mt-10 border-b border-oa-hairlineStrong">
        {rows.map((r) => {
          const self = r.to === path;
          return (
            <li
              key={r.id}
              className={`ledger-row grid gap-2 border-t border-oa-hairlineStrong py-5 sm:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] sm:items-baseline sm:gap-8 ${
                self ? "" : "is-link"
              }`}
            >
              <p className="text-lg font-semibold text-oa-ink">
                {self ? (
                  r.text
                ) : (
                  <Link to={r.to} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {r.text}
                    <span aria-hidden="true" className="ml-2 text-oa-blue">
                      →
                    </span>
                  </Link>
                )}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-oa-ink3">
                {self ? "THIS PAGE · " : ""}
                {r.tag}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* ============================ DATA TABLE ================================ */

/**
 * Comparison and mapping tables. Scrolls inside its own focusable region on a
 * phone, so the page never scrolls sideways. Rows with `k` cross-highlight a
 * plate inside the same PlateScope.
 *
 *   <DataTable label="Health Check tool vs a full org review" head={["", "Health Check tool", "Full org review (free week)"]}
 *     rows={[{ k: "scope", cells: ["What it looks at", "Security settings only", "Licences, data, …"] }]}
 *     source={<>Source: Salesforce Help, read 23 October 2026.</>}
 *     own={2} nextStep={{ label: "Book the free week" }} />
 *
 * ⛔ `own`/`nextStep` only where the highlighted column is OUR offer (HC tool-vs-
 * review, Chester editions). Market tables never highlight a column.
 */
export function DataTable({
  label,
  ground = "paper",
  head,
  rows,
  source,
  own,
  nextStep,
}: {
  label: string;
  ground?: "paper" | "surface";
  head: string[];
  rows: { k?: string; cells: React.ReactNode[] }[];
  source: React.ReactNode;
  own?: number;
  nextStep?: { label: string };
}) {
  const { rowProps } = usePlate();
  const bg = ground === "paper" ? "bg-oa-paper" : "bg-oa-surface";
  return (
    <>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="-mx-4 min-w-0 overflow-x-auto px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-oa-blue sm:mx-0 sm:px-0"
      >
        {/* Two columns fit a phone; only wider tables need the scroll floor. */}
        <table className={`w-full ${head.length > 2 ? "min-w-[34rem]" : ""} border-collapse text-left text-sm`}>
          <caption className="sr-only">{label}</caption>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th
                  key={`${i}-${h}`}
                  scope="col"
                  className={`border-b border-oa-hairlineStrong py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.12em] text-oa-ink3 ${
                    i === own ? "border-t-2 border-t-oa-blue bg-oa-blueTint/60 px-3" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} {...(r.k ? rowProps(r.k) : {})} className="plate-row">
                {r.cells.map((c, ci) =>
                  ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className={`sticky left-0 z-[1] ${bg} border-b border-oa-hairline py-4 pr-4 align-top font-semibold text-oa-ink sm:static`}
                    >
                      {c}
                    </th>
                  ) : (
                    <td
                      key={ci}
                      className={`border-b border-oa-hairline py-4 pr-4 align-top text-oa-ink2 ${ci === own ? "bg-oa-blueTint/60 px-3" : ""}`}
                    >
                      {c}
                    </td>
                  ),
                )}
              </tr>
            ))}
            {nextStep && own !== undefined && (
              <tr>
                <th scope="row" className={`sticky left-0 ${bg} py-4 pr-4 font-semibold text-oa-ink sm:static`}>
                  Next step
                </th>
                {head.slice(1).map((_, i) => (
                  <td key={i} className={`py-4 pr-4 ${i + 1 === own ? "bg-oa-blueTint/60 px-3" : ""}`}>
                    {i + 1 === own && (
                      <PrimaryCTA href="#start" tone="light" cta="table">
                        {nextStep.label}
                      </PrimaryCTA>
                    )}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 max-w-[90ch] font-mono text-xs text-oa-ink3">{source}</p>
    </>
  );
}

/* ============================== DOC NOTE ================================ */

/**
 * Replaces "Salesforce says" quotes. `said` is OUR paraphrase: no quotation
 * marks, never copied text (Salesforce trademark guidelines bar reusing their
 * text). At most 2 per page, none on city pages.
 *   <DocNote said="Salesforce ended support for Workflow Rules and Process Builder at the end of 2025."
 *     title="Salesforce Help: Workflow Rules and Process Builder retirement" url="https://help.salesforce.com/…"
 *     readOn="23 October 2026" meaning="Automations built that way still run, but nobody fixes them when they break." />
 */
export function DocNote({
  said,
  title,
  url,
  readOn,
  meaning,
  tone = "light",
}: {
  said: string;
  title: string;
  url: string;
  readOn: string;
  meaning: string;
  tone?: "light" | "dark";
}) {
  const d = tone === "dark";
  return (
    <div className={`my-10 max-w-[32em] border-l-2 pl-5 ${d ? "border-oa-orange" : "border-oa-blue"}`}>
      <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${d ? "text-oa-nightInk3" : "text-oa-ink3"}`}>
        From Salesforce's documentation
      </p>
      <p className={`mt-2 text-lg ${d ? "text-oa-nightInk" : "text-oa-ink"}`}>{said}</p>
      <p className={`mt-2 font-mono text-xs ${d ? "text-oa-nightInk3" : "text-oa-ink3"}`}>
        <a className="oa-link inline-flex min-h-11 items-center" href={url} target="_blank" rel="noopener noreferrer">
          {title} ↗
        </a>{" "}
        · read {readOn}
      </p>
      <p className={`mt-4 ${d ? "text-oa-nightInk2" : "text-oa-ink2"}`}>
        <strong className={d ? "text-oa-nightInk" : "text-oa-ink"}>What it means for you:</strong> {meaning}
      </p>
    </div>
  );
}

/* ============================ OBJECTIONS ================================ */

/** Approved objection answers (spec 2.10), existing site wording only. Pages
 *  pick 3–4; none may repeat a FAQ question on the same page.
 *  2026-10-23: the old "reviews" answer ("True. Our AppExchange listing shows no
 *  customer ratings yet.") was removed: it announced an absence (voice addendum
 *  rule 4). Never re-add it; never claim reviews either. */
export const SF_OBJECTIONS = {
  pitch: {
    q: "Will the free week turn into a sales pitch?",
    a: "The list is yours. If the org is basically fine, we say so.",
  },
  city: {
    q: "You are not in our city.",
    a: "Malvern, PA; the work happens inside your org, remotely; in person when a meeting needs it.",
  },
  cost: {
    q: "What does it cost after the free week?",
    a: (
      <>
        Fixes are scoped in writing first.{" "}
        <Link className="oa-link" to="/services/salesforce-implementation-cost">
          What Salesforce work costs
        </Link>
      </>
    ),
  },
} as const;

/**
 * Objections block, placed before the FAQ and the Desk. Not in FAQPage schema.
 *   <Section tone="surface" id="objections"><Objections items={[SF_OBJECTIONS.pitch, SF_OBJECTIONS.city, SF_OBJECTIONS.cost]} /></Section>
 */
export function Objections({
  items,
}: {
  items: ReadonlyArray<{ q: string; a: React.ReactNode; checked?: { label: string; href: string } }>;
}) {
  return (
    <>
      <SectionHeading title="Before you call, you are probably wondering" />
      <dl className="mt-10">
        {items.map((o) => (
          <div
            key={o.q}
            className="grid grid-cols-1 gap-3 border-t border-oa-hairlineStrong py-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
          >
            <dt className="text-lg font-semibold text-oa-ink">{o.q}</dt>
            <dd className="max-w-[34em] text-oa-ink2">
              {o.a}
              {o.checked && (
                <span className="mt-2 block font-mono text-xs text-oa-ink3">
                  Checked against:{" "}
                  <a
                    className="oa-link"
                    href={o.checked.href}
                    {...(/^https?:/.test(o.checked.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {o.checked.label}
                  </a>
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

/* ============================== FAQ LIST ================================ */

export type SfFaq = { q: string; a: string; link?: { to: string; label: string } };

/**
 * The shared FAQ rows. Pass the SAME array to createFAQSchema (it ignores `link`).
 *   <SectionHeading title="Questions" />
 *   <FAQList faqs={FAQS} sources={{ checked: "October 2026", links: [{ label: "Salesforce Help", href: "https://help.salesforce.com/…" }] }} />
 *   <StructuredData data={createFAQSchema(FAQS)} />
 */
export function FAQList({
  faqs,
  sources,
}: {
  faqs: readonly SfFaq[];
  sources?: { checked: string; links: { label: string; href: string }[] };
}) {
  /* Fix round M7: on a phone each answer is a native <details> drop-down (the
     pages ran to 23-29k px at 390). From md up every row is opened by script,
     the pattern Layout's FooterSection uses, so desktop reads as before. The
     answer text is in the DOM either way, so FAQPage and crawlers see it all. */
  const box = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => box.current?.querySelectorAll("details").forEach((d) => (d.open = mq.matches));
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return (
    <>
      <div ref={box} className="mt-10 space-y-5 md:space-y-7">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group border-t border-oa-hairlineStrong pt-5 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-3 md:pt-7"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 md:pointer-events-none md:cursor-auto [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
              <span aria-hidden="true" className="mt-0.5 font-mono text-lg leading-none text-oa-ink3 md:hidden">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <div className="pb-2 pt-3 md:pb-0 md:pt-0">
              <p className="max-w-[34em] text-oa-ink2">{f.a}</p>
              {f.link && (
                <Link className="oa-link mt-1 inline-flex min-h-11 items-center" to={f.link.to}>
                  {f.link.label}
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>
      {sources && sources.links.length > 0 && (
        <div className="mt-10 border-t border-oa-hairline pt-4 font-mono text-xs text-oa-ink3">
          <p>Sources, checked {sources.checked}</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {sources.links.map((l) => (
              <li key={l.href}>
                <a className="oa-link inline-flex min-h-11 items-center" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

/* ============================= ROUTE BOARD ============================== */

const SF_ICONS: Record<SfPageKey, LucideIcon> = {
  hc: Stethoscope,
  dm: DatabaseZap,
  int: Cable,
  ms: LifeBuoy,
  mc: Mail,
  sa: Users,
  cost: Calculator,
  phl: MapPin,
};

/**
 * Internal links to the other Salesforce pages. The current page is excluded.
 *   <RouteBoard groups={["services", "cities"]} />          // HC first
 *   <RouteBoard groups={["services", "local"]} first="dm" />
 *   <RouteBoard groups={["services"]} bodies={{ dm: "…one allowed-fact sentence…" }} />
 *   <RouteBoard groups={["services"]} first="ms" exclude={["mc"]} />
 */
export function RouteBoard({
  groups,
  first = "hc",
  exclude = [],
  bodies,
  citiesLabel = "Salesforce consulting by city",
}: {
  groups: ("services" | "local" | "cities")[];
  first?: SfPageKey;
  /** Cards to leave off on this page (e.g. the health check hides Marketing Cloud). */
  exclude?: SfPageKey[];
  /** Per-page body override (e.g. a city page's one allowed-fact sentence). */
  bodies?: Partial<Record<SfPageKey, string>>;
  citiesLabel?: string;
}) {
  const path = normalisePath(useLocation().pathname);
  const cards = [
    ...(groups.includes("services") ? SF_PAGES.services : []),
    ...(groups.includes("local") ? SF_PAGES.local : []),
  ]
    .filter((p) => p.to !== path && !exclude.includes(p.key))
    .sort((a, b) => (a.key === first ? -1 : b.key === first ? 1 : 0));
  /* xl columns follow the card count so the last row is never one orphan:
     7 cards read 4 + 3, 8 read 4 + 4, 6 read 3 + 3. ⛔ Static strings for Tailwind. */
  const n = cards.length;
  const xl = n % 4 === 0 || (n % 3 === 1 && n % 4 !== 1) ? "xl:grid-cols-4" : "xl:grid-cols-3";
  const cities = groups.includes("cities") ? SF_PAGES.cities.filter((c) => c.to !== path) : [];
  return (
    <>
      {cards.length > 0 && (
        <CardGrid columns={2} className={`mt-10 ${xl}`}>
          {cards.map((p) => (
            <Card key={p.key} wire to={p.to} icon={SF_ICONS[p.key]} title={p.title} body={bodies?.[p.key] ?? p.body} />
          ))}
        </CardGrid>
      )}
      {cities.length > 0 && (
        <div className="mt-10">
          <p className="text-sm font-semibold text-oa-ink">{citiesLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm">
            {cities.map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="group inline-flex min-h-11 items-center gap-2 text-oa-ink2 transition-colors duration-150 hover:text-oa-ink">
                  <span
                    aria-hidden="true"
                    className="h-[7px] w-[7px] border border-oa-blue transition-colors duration-150 group-hover:bg-oa-blue group-focus-visible:bg-oa-blue"
                  />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

/* ================= DESK / CTA PROOF / HC LINK / BANDS ================== */

/** The registry line under a CTA pair or in the Desk. Static, never animated.
 *  Under the hero pair ONLY where the hero panel is not SalesforceRecordCard. */
export function CTAProof({ tone = "dark", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <p
      className={`max-w-xl border-t pt-3 font-mono text-[12px] leading-5 ${
        dark ? "border-white/10 text-oa-nightInk3" : "border-oa-hairline text-oa-ink3"
      } ${className}`}
    >
      Listed Salesforce Consulting Partner · {SF_CERTIFIED_PEOPLE} certified people · {SF_CERTIFICATIONS} certifications · read {SF_VERIFIED_LABEL} ·{" "}
      <a className="oa-link -my-2.5 inline-flex min-h-11 items-center" href={SF_APPEXCHANGE_URL} target="_blank" rel="noopener noreferrer">
        Verify listing {SF_LISTING_ID} ↗
      </a>
    </p>
  );
}

/** "What the free health check covers →". Renders nothing on the health check
 *  page itself. Put it next to the hero pair (as PageHero children) and it is
 *  already inside every Desk. */
export function HcLink({ label = "What the free health check covers →" }: { label?: string }) {
  const path = normalisePath(useLocation().pathname);
  if (path === HC_PATH) return null;
  return (
    <Link to={HC_PATH} className="oa-link mt-3 inline-flex min-h-11 items-center text-sm">
      {label}
    </Link>
  );
}

/** One line plus a light CTA pair, after the second content section (COST, DM, INT, MS).
 *  `<MidStrip line="A real figure starts with your org, not a guide." label="Book a free health check" />` */
export function MidStrip({ line, label }: { line: string; label: string }) {
  return (
    <Section tone="paper" compact bordered width="wide">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-[46ch] text-lede text-oa-ink">{line}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <PrimaryCTA href="#start" tone="light" cta="mid">
            {label}
          </PrimaryCTA>
          <SecondaryCTA href={SF_PHONE.href} tone="light" cta="mid">
            Call {SF_PHONE.display}
          </SecondaryCTA>
        </div>
      </div>
    </Section>
  );
}

/** Hub and HC only (their Desk is mid-page): the closing phone band.  `<PhoneBand />` */
export function PhoneBand() {
  return (
    <Section tone="night" compact width="wide">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-h3 font-semibold text-oa-nightInk">
          Prefer to talk it through?{" "}
          <a data-cta="band" className="phone-xl whitespace-nowrap font-mono" href={SF_PHONE.href}>
            {SF_PHONE.display}
          </a>
        </p>
        <SecondaryCTA href="#start" cta="band">
          Back to the form
        </SecondaryCTA>
      </div>
    </Section>
  );
}

/* ============================ PEOPLE STRIP ============================== */

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * The named Salesforce lead(s) from SF_PEOPLE: the approved sentence, the
 * Trailblazer verify link and LinkedIn, plus the Person schema node. It drops
 * into the page's own "Who leads the work" block (beside the ledger or the
 * CTA, per the wide-layout addendum); the page keeps its own heading.
 *   <h3 className="text-lg font-semibold text-oa-ink">Who leads the work</h3>
 *   <PeopleStrip />
 *   <PeopleStrip tone="night" className="mt-3 text-oa-nightInk2" />
 *   <PeopleStrip lead="You work directly with the people doing the work. " />
 * ⛔ Owner-gated (spec §7.4): renders NOTHING while SF_PEOPLE is empty. No
 * photo exists, so there is no photo slot, silhouette or placeholder; never
 * team-1..4.webp. One per page (it emits the Person node).
 */
export function PeopleStrip({
  providerId = "https://onealgorithm.com/#org",
  tone = "light",
  className,
  lead,
}: {
  providerId?: string;
  tone?: "light" | "night";
  /** Classes for the statement paragraph (spacing, size, colour). */
  className?: string;
  /** Page text placed before the approved sentence. Nothing goes after it: the sentence is the
   *  only thing said about the person (fix round FV-04; the `extra` prop was removed). */
  lead?: React.ReactNode;
}) {
  if (!SF_PEOPLE.length) return null;
  const graph = SF_PEOPLE.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://onealgorithm.com/#person-${slug(p.name)}`,
    name: p.name,
    jobTitle: p.title,
    worksFor: { "@id": providerId },
    sameAs: [p.trailhead, ...(p.linkedin ? [p.linkedin] : [])],
  }));
  const ink = tone === "night" ? "text-oa-nightInk2" : "text-oa-ink2";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      {SF_PEOPLE.map((p) => (
        <React.Fragment key={p.name}>
          <p className={className ?? `mt-3 max-w-[30em] leading-relaxed ${ink}`}>
            {lead}
            {p.statement}
          </p>
          <p className="mt-2 flex flex-wrap gap-x-6 text-sm">
            <a className="oa-link inline-flex min-h-11 items-center" href={p.trailhead} target="_blank" rel="noopener noreferrer">
              {p.verifyLabel} ↗
            </a>
            {p.linkedin && (
              <a className="oa-link inline-flex min-h-11 items-center" href={p.linkedin} target="_blank" rel="noopener noreferrer">
                {p.name} on LinkedIn ↗
              </a>
            )}
          </p>
        </React.Fragment>
      ))}
    </>
  );
}

/* ============================ PARTNER BADGE ============================= */

/** The genuine Salesforce Partner badge, linked to our AppExchange listing.
 *  Lives here (not in SalesforceCity.tsx) so importing it never pulls the
 *  generated city dataset into a page's chunk.  `<PartnerBadge />` */
export function PartnerBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={SF_APPEXCHANGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-4 text-sm text-oa-ink2 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oa-blue ${className}`}
    >
      <img src="/salesforce-partner-badge.png" alt="Salesforce Partner badge" width={120} height={69} loading="lazy" decoding="async" />
      <span>OneAlgorithm on Salesforce AppExchange ↗</span>
    </a>
  );
}
