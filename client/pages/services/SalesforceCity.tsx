import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeliveredLedger, PersonCredentials, FAQ, DeskCTA,
  ServiceCards, HUB_SERVICE_CARDS, StageRail, SourcesDialog, Verify, PhotoCreditDialog, PhotoCreditsLine,
  type Readout, type SfFaqItem, type Station, type SfSource, sfHeroAvifSrcset, SF_HERO_SIZES } from "../../components/sf";
import { HealthCheck } from "../../components/sf/illus";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  SF_HEALTH_CHECK_OFFER, StructuredData, createFAQSchema, createLocalBusinessSchema, createServiceSchema, createWebPageSchema,
} from "../../components/StructuredData";
import { SALESFORCE_CITIES } from "../../data/salesforceCities";
import { CITY_COPY, type CityUnit } from "../../data/salesforceCityCopy";
import { SF_CITY_HEROES, sfCityFiles } from "../../data/sfCityHeroes";
import {
  SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_LISTING_ID, SF_PAGES, SF_PHONE, SF_PLATFORM_CERTS, SF_VERIFIED_LABEL,
} from "../../data/salesforceProof";

/* One template for the 13 Salesforce city pages, /services/salesforce-consultant-<slug> (the 12 wave-2 cities plus
 * Houston). Rebuilt 2026-10-23 on the redesign-v2 kit (client/components/sf), in the design Louis approved that day
 * ("Yes, build the 23 pages this way"). Build notes: onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/build-v2/
 * page-city-template.md. Structure: seo-completeness/structure-spec.md §7.4 (title, meta, H1, the 13 H2s, H3s,
 * FAQ, schema, links) and §11 (doorway rules). Section order follows the approved prototype's rhythm (spec §0:
 * heading order is not a ranking factor); every H2 string is the spec's.
 *
 * WHY THIS IS NOT A DOORWAY PAGE (spec §11): the hero is the city's own licensed photograph; the market figures,
 * industry chart, role counts, community groups, Salesforce office line and federal lines are the city's own
 * sourced data (client/data/salesforceCities.ts, generated, never typed); the city-only H2 band, the service order
 * and at least four FAQs are hand-written per city (client/data/salesforceCityCopy.ts); shared blocks (rail,
 * objections, generic FAQs) are one or two sentences that link their owner page; the hero button opens this page's
 * own form (#start), never another URL.
 * ⛔ We are in Malvern, PA: no city address, office, client or "serving since" claim. Visits only as the owner put
 *    it (2026-10-23 19:05): most work is remote; on larger projects on-site visits are planned into the project.
 * ⛔ Proof is the allowed list only (structure-spec §8.1). No industry-to-delivery pairing beyond lending (D8).
 * ⛔ Links: in-site only in the body. Every source (Census, BLS, LinkedIn, USAspending, Trailblazer groups, events)
 *    is named as text with its read date; the human-readable source pages sit in the two SourcesDialogs. No API or
 *    data URL anywhere (the 91 api.census.gov anchors of ef1a8f0 are gone). Houston is never linked until its gate. */

type City = (typeof SALESFORCE_CITIES)[number];

const n = (v: number | null | undefined) => (v == null ? "—" : Number(v).toLocaleString("en-US"));
const ord = (k: number) => k + (["th", "st", "nd", "rd"][((k % 100) - 20) % 10] || ["th", "st", "nd", "rd"][k % 100] || "th");
const pct = (a?: number | null, b?: number | null) => (a && b ? Math.round(((a - b) / b) * 1000) / 10 : null);
const signed = (v: number) => `${v >= 0 ? "+" : ""}${v}%`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "2026-10-21" -> "21 October 2026" (the site's registry date style, as SF_VERIFIED_LABEL). */
const fmtDate = (iso: string, month: "long" | "short" = "long") =>
  new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month, year: "numeric", timeZone: "UTC" });
/** "2027-07-15/16" -> "15–16 July 2027". */
const fmtEvent = (d: string) => {
  const [base, end] = d.split("/");
  const out = fmtDate(base);
  return end ? out.replace(/^\d+/, (day) => `${day}–${Number(end)}`) : out;
};
const today = () => new Date().toISOString().slice(0, 10);
/** For possessives: "DC's", "Dallas's". */
const short = (c: City) => (c.slug === "washington-dc" ? "DC" : c.name);
const jobsTotal = (c: City) => c.jobs.reduce((s, j) => s + j.count, 0);
const msaName = (c: City) => c.msa.name.replace(/ Metro Area$/, " metro area");
const roleName = (r: string) => r.replace(/^Salesforce /, "");
/** The four role searches, most listings first (one order everywhere, fix round L6). */
const jobsByCount = (c: City) => [...c.jobs].sort((a, b) => b.count - a.count);
/** "844 listings for Salesforce consultants, 672 for administrators, … and 391 for developers". */
const roleCounts = (c: City) => {
  const rows = jobsByCount(c).map((j, i) => `${n(j.count)} ${i === 0 ? "listings for Salesforce " : "for "}${roleName(j.role).toLowerCase()}s`);
  return `${rows.slice(0, -1).join(", ")} and ${rows[rows.length - 1]}`;
};
/** Upcoming community events only: they go stale, so past ones are dropped at render time. */
const EVENTS_CUTOFF = "2026-10-23"; // first render (prerender + hydration) uses a fixed cutoff; real date after mount
const upcomingEvents = (c: City, day: string = EVENTS_CUTOFF) =>
  (c.events as readonly { name: string; date: string; url: string }[]).filter((e) => e.date.slice(0, 10) >= day);
function useToday() {
  const [day, setDay] = React.useState(EVENTS_CUTOFF);
  // Prerender keeps the fixed cutoff so the saved HTML matches the first browser render.
  React.useEffect(() => { if (!(window as { __oaPrerender?: boolean }).__oaPrerender) setDay(today()); }, []);
  return day;
}

/** Renders [text](/path) inside copy strings as router links (salesforceCityCopy.ts). In-site paths only. */
function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    out.push(text.slice(last, m.index));
    out.push(<Link key={m.index} className="sf-link" to={m[2]}>{m[1]}</Link>);
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

const STATE: Record<string, string> = { NY: "New York State", DC: "the District of Columbia", TX: "Texas", CO: "Colorado", GA: "Georgia", MA: "Massachusetts", WA: "Washington State", CA: "California", FL: "Florida", IL: "Illinois", PA: "Pennsylvania" };

/** The state-level federal line appears on ONE city page per state (the largest without a city figure), so
 *  Dallas/Austin/Houston and San Francisco/Los Angeles do not share it. Dallas carries Texas in its city-only band. */
function federalStateFor(c: City) {
  const owner = SALESFORCE_CITIES.filter((x) => x.state === c.state && !x.federal && x.slug !== "philadelphia").sort(
    (a, b) => (b.establishments?.value ?? 0) - (a.establishments?.value ?? 0),
  )[0];
  return !c.federal && owner?.slug === c.slug && c.slug !== "dallas" ? c.federalState : null;
}
function federalSentence(c: City) {
  const f = federalStateFor(c);
  if (f) {
    const top = f.agencies ? String(f.agencies).split(";").slice(0, 2).map((a) => a.split(":")[0].trim()).join(" and ") : "";
    return `Across ${STATE[f.place] ?? f.place}, federal agencies recorded ${n(f.awards)} contract award${f.awards === 1 ? "" : "s"} mentioning Salesforce in ${f.period.replace("–", " to ")}${f.usd ? `, worth $${n(f.usd)} in obligations` : ""}${top ? `; the largest buyers were ${top}` : ""}.`;
  }
  /* FV-16: a handful of tiny awards (New York: 1 award, $500) reads as a data error; the city line shows from 3 awards
     up, and only where the city-only band does not already carry it (DC, Atlanta, Denver say it there). */
  if (c.federal && c.federal.awards >= 3 && c.slug === "san-francisco")
    return `Federal agencies recorded ${n(c.federal.awards)} contract awards mentioning Salesforce with work performed in San Francisco in ${c.federal.period.replace("–", " to ")}, worth $${n(c.federal.usd)}.`;
  return null;
}
const usesUsaspending = (c: City) => Boolean(federalStateFor(c) || c.federal?.awards && c.federal.awards >= 3 || c.slug === "dallas");

/* Where Salesforce work sits in each employer group: sector context only, no delivery claim beyond lending
   (structure-spec D8; the 2026-10-23 fix round already dropped "we run bulk data jobs as routine work"). */
const INDUSTRY_NOTE: Record<string, string> = {
  "62": "Salesforce work there usually turns on access: who can see which records, enforced with permission sets and sharing rules rather than a pile of profiles.",
  "52": "Lending is where we run ongoing Salesforce development every week, since April 2026.",
  "54": "Firms like these tend to use Salesforce to track clients, projects and proposals, and need reporting that agrees across all three.",
  "31-33": "Manufacturers usually need Salesforce to agree with an ERP on accounts, orders and pricing.",
  "42": "Distribution runs on volume, so bulk loads and de-duplication decide whether reports can be trusted.",
  "813": "Associations and nonprofits often move member and donor data off older databases into Salesforce.",
  "51": "These businesses usually need Salesforce connected to billing and product systems.",
  "53": "Firms here typically use Salesforce to keep properties, contacts and deals in one place.",
};
/** The four-word phrase for the "Why it matters:" line of the industries unit. */
const INDUSTRY_WORK: Record<string, string> = {
  "62": "health care access rules",
  "54": "professional services project tracking",
  "52": "loan pipelines in finance",
  "31-33": "manufacturing ERP sync",
  "42": "wholesale bulk loads",
  "813": "nonprofit member data",
  "51": "information-sector billing integrations",
  "53": "real estate deal tracking",
};
/** "200 Spectrum Center Drive, Suite 1500, Irvine, CA 92618" -> "Irvine" (the town is the segment before the state). */
const officeTown = (address: string) => address.split(";")[0].split(",").map((x) => x.trim()).slice(-2)[0];
/** The community unit's lede: how close the groups meet, from data (the heading lede already gives the count). */
function communityLede(groups: readonly { km: number }[]) {
  if (!groups.length) return "No group with a recent event meets within 50 km of the city center.";
  if (groups.length === 1) return `The one group with a recent event meets ${groups[0].km === 0 ? "in the city center" : `${groups[0].km} km from the city center`}.`;
  const near = groups.filter((g) => g.km <= 5).length;
  return `${near ? `${near} of the ${groups.length}` : `None of the ${groups.length}`} groups ${near === 1 ? "meets" : "meet"} within 5 km of the city center; the nearest are listed first.`;
}
const list = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** The four role searches, most listings first, with what each role does (general definitions, not claims about us). */
const ROLE_DOES: Record<string, string> = {
  Administrator: "runs the org day to day: users, permissions, reports and small changes",
  Developer: "builds what configuration cannot: Apex code, integrations and complex automation",
  Consultant: "designs how Salesforce should fit the business and leads the project",
  Architect: "designs the data model, security and integrations across a large org",
};

/** The free health check's four steps (titles: structure-spec §7.4 row 9; lines: SalesforceHealthCheck at ef1a8f0). */
const HC_STAGES: (Station & { line: string })[] = [
  { k: "s1", num: "01", title: "Tell us the symptom", sub: "a call or the form", line: "Reports nobody trusts, a renewal you are unsure about, automation nobody dares touch." },
  { k: "s2", num: "02", title: "A week in your org", sub: "read-only user · free", line: "You create a user that can read your setup and records; the week is free." },
  { k: "s3", num: "03", title: "A written, ranked list", sub: "ordered by what to fix first", line: "What we found and why it matters, ordered by what to fix first." },
  { k: "s4", num: "04", title: "You decide what happens next", sub: "with us or your admin", line: "Act on it with us, with your own admin, or not at all." },
];
/** The rail's own labels: the desktop drawing centres station 04 at x=1090 of 1200, so its title is shortened there. */
const HC_STATIONS: Station[] = HC_STAGES.map((s) => (s.k === "s4" ? { ...s, title: "You decide next" } : s));

const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "Will we get senior people, or whoever is free?", a: <>The person who scopes your org stays on it through delivery, and you deal with the people doing the work directly.</> },
  { q: "Will the free week turn into a sales pitch?", a: <>The list is yours. If the org is basically fine, we say so.</> },
  { q: "What does it cost after the free week?", a: <>Fixes are scoped and priced in writing first. <Link className="sf-link" to="/services/salesforce-implementation-cost">What Salesforce work costs</Link></> },
];

/** `schema: false` = shown on the page but left out of FAQPage: the answer is the same on all 13 city pages (SEO-08). */
type CityFaqRow = SfFaqItem & { schema?: false };

function buildFaqs(c: City, who: string): CityFaqRow[] {
  const copy = CITY_COPY[c.slug];
  return [
    {
      q: `Do you have an office in ${c.name}?`,
      a: `No. We take on Salesforce work for ${who} remotely from our office at 625 Swedesford Rd, Unit B, Malvern, PA 19355. Most of the work runs inside your org over video and screen-share; on larger projects, on-site visits for kickoff, go-live or training are planned into the project.`,
      schema: false,
    },
    ...copy.faqs,
    {
      q: `How many Salesforce jobs are open in ${c.name}?`,
      a: `On ${fmtDate(c.jobsPulled)}, LinkedIn searches within 25 miles of ${c.name} showed ${roleCounts(c)}: ${n(jobsTotal(c))} across the four searches, ${ord(c.jobsRank.rank)} of the ${c.jobsRank.of} metro areas we checked. A listing can match more than one search, so read the total as demand rather than a head count.`,
    },
    {
      q: `Can you move a ${c.name} company off an older database into Salesforce?`,
      a: "Yes. We have migrated QuickBase and Kissflow systems into Salesforce with record counts and totals reconciled before go-live, and the free one-week health check shows the state of your data first, so the plan starts from facts.",
      link: { to: "/services/salesforce-data-migration", label: "Salesforce data migration services" },
      schema: false,
    },
    {
      q: `What should a ${c.name} company budget for Salesforce consulting, and how long does it take?`,
      a: `We scope and price ${c.name} work in writing after the free one-week health check. Published guides put a small-business project at $15,000 to $50,000 and a mid-market one at $50,000 to $150,000 (BrainSpate, American Chase), and Cynoteck puts a small project at 4 to 8 weeks; for comparison, one in-house software developer in the ${msaName(c)} earns a median $${n(c.wages.developers.median)} a year in salary alone (BLS, ${c.wages.period}).`,
      link: { to: "/services/salesforce-implementation-cost", label: "Salesforce implementation cost guide" },
    },
    {
      q: `After go-live, who looks after Salesforce for a ${short(c)} team?`,
      a: "We can: our managed services run weekly administration and development with hours reported every week, and if your own admin takes over instead, the handover is written down.",
      link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" },
      schema: false,
    },
  ];
}

/** Market sources for the "Where these figures come from" pop-up: program pages only, never a query or API. */
function marketSources(c: City): SfSource[] {
  const read = `read ${fmtDate(c.jobsPulled)}`;
  const out: SfSource[] = [
    { name: "LinkedIn public job search", what: `Four role searches (Salesforce consultant, administrator, architect, developer) within 25 miles of ${c.name}`, read, page: "https://www.linkedin.com/jobs/" },
    { name: "U.S. Census Bureau, County Business Patterns", what: `Establishments by size and employees by industry, ${c.msa.name}, 2018 and 2023`, read, page: "https://www.census.gov/programs-surveys/cbp.html" },
    { name: "U.S. Census Bureau, American Community Survey (1-year)", what: `Population, ${c.msa.name}, 2019 and 2024`, read, page: "https://www.census.gov/programs-surveys/acs" },
    { name: "U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics", what: `Computer systems analysts and software developers, ${c.msa.name}, ${c.wages.period}; Salesforce roles have no federal job code of their own, so the closest occupations stand in`, read: `read ${fmtDate(c.wages.pulled)}`, page: "https://www.bls.gov/oes/" },
  ];
  if (usesUsaspending(c)) out.push({ name: "USAspending.gov", what: "Federal contract awards mentioning Salesforce, fiscal years 2022 to 2026", read, page: "https://www.usaspending.gov/" });
  for (const s of CITY_COPY[c.slug].sources ?? []) out.push(s);
  return out;
}
function communitySources(c: City, day?: string): SfSource[] {
  return [
    { name: "Trailblazer Community Groups", what: `Salesforce community groups within 50 km of central ${c.name} with an event since 23 October 2025`, read: `read ${fmtDate(c.community.pulled)}`, page: "https://trailblazercommunitygroups.com/" },
    { name: "Salesforce office locations", what: "Salesforce's published list of its offices", read: `read ${fmtDate(c.jobsPulled)}`, page: "https://www.salesforce.com/company/locations/" },
    ...upcomingEvents(c, day).map((e) => ({ name: e.name, what: `Community event, ${fmtEvent(e.date)}`, read: `read ${fmtDate(c.jobsPulled)}`, page: e.url })),
  ];
}

/** FIG. 2: the city's four largest employer groups (Census CBP 2023), as a framed chart. Real figures, so the stamp
 *  names the source instead of "sample data". Static: values are text in the HTML; the frame is the kit's stage. */
function IndustriesFigure({ c, fig }: { c: City; fig: number }) {
  const max = Math.max(...c.industries.map((i) => i.employees ?? 0));
  const id = `fig${fig}-cap`;
  return (
    <figure className="sf-stage sf-c7" aria-labelledby={id} style={{ alignSelf: "start" }}>
      <div className="sf-stage-in" style={{ padding: "clamp(18px, 2.2vw, 32px)" }}>
        <p className="sf-kicker">Employees by employer group · {msaName(c)}</p>
        <ol style={{ display: "grid", gap: 22, marginTop: 20 }}>
          {c.industries.map((i, k) => (
            <li key={i.code}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "4px 16px", flexWrap: "wrap" }}>
                <span className="sf-h4">{cap(i.label)}</span>
                <span className="sf-mono" style={{ color: "var(--ink)", fontSize: 15 }}>{n(i.employees)}</span>
              </div>
              <span aria-hidden="true" style={{ display: "block", marginTop: 8, height: 14, background: "var(--tint)" }}>
                <span style={{ display: "block", height: "100%", width: `${Math.max(4, Math.round(((i.employees ?? 0) / max) * 100))}%`, background: "var(--navy)", opacity: k === 0 ? 1 : 0.62 }} />
              </span>
              <span className="sf-mono" style={{ display: "block", marginTop: 6 }}>{n(i.establishments)} establishments</span>
            </li>
          ))}
        </ol>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Chart · Census County Business Patterns 2023 · MSA {c.msa.code}</span><span>OneAlgorithm</span></div>
      <figcaption id={id} style={{ padding: "10px 12px 12px" }}>
        Employees in the four largest of the eight employer groups we pulled for the {msaName(c)}; {c.industries[0].label} leads with {n(c.industries[0].employees)}.
      </figcaption>
    </figure>
  );
}

/** One hand-written H3 unit of the city-only band (night). */
function LocalUnit({ u, delay }: { u: CityUnit; delay?: number }) {
  return (
    <SmartUnit level={3} className="sf-c6" delay={delay} title={u.title} lede={u.lede} leadIn={u.leadIn} lead={u.lead} points={u.points} measure={false}>
      <GoDeeper label={u.label}>
        {u.deeper.map((p, i) => (
          <p key={i} className={i === 0 ? "sf-rule" : undefined}><Rich text={p} /></p>
        ))}
      </GoDeeper>
    </SmartUnit>
  );
}

export default function SalesforceCity({ slug }: { slug: string }) {
  const c = SALESFORCE_CITIES.find((x) => x.slug === slug)!;
  const copy = CITY_COPY[slug];
  const photo = SF_CITY_HEROES[slug];
  const files = sfCityFiles(slug);
  const path = c.path;
  const url = `https://onealgorithm.com${path}`;
  const noun = copy.noun ?? "companies";
  const who = `${c.name} ${noun}`;
  const place = c.slug === "washington-dc" ? "Washington, DC" : `${c.name}, ${c.state}`;
  const h1 = `Salesforce consultants for ${place} ${noun}`;
  const total = jobsTotal(c);
  const byCount = jobsByCount(c);
  const faqs = buildFaqs(c, who);
  const estChange = pct(c.establishments.value, c.establishments2018.value);
  const popChange = pct(c.population.value, c.population2019.value);
  const fed = federalSentence(c);
  const day = useToday();
  const upcoming = upcomingEvents(c, day);
  const groups = c.community.groups;
  const shareImage = `https://onealgorithm.com${files.og}`;
  const ogTitle = `${h1} | OneAlgorithm`;
  const heroLede = copy.heroLede ?? `We take on Salesforce work for ${who} remotely from Malvern, PA, starting with a free one-week health check.`;
  const indTotal = c.industries.reduce((t, i) => t + (i.employees ?? 0), 0);
  const cards = [HUB_SERVICE_CARDS[0], ...copy.services.order.map((k) => {
    const to = SF_PAGES.services.find((s) => s.key === k)!.to;
    return HUB_SERVICE_CARDS.find((x) => x.to === to)!;
  })];
  const otherCities = [
    ...SF_PAGES.cities.filter((x) => !x.to.endsWith(`-${slug}`) && !x.to.endsWith("-houston")).map((x) => ({ to: x.to, label: x.label })),
    { to: "/services/salesforce-consultant-philadelphia", label: "Philadelphia" },
  ];

  // structure-spec §1.1-1.2: titles 50-60 (Denver's planned title is 62, allowed: the phrase and city sit inside 60).
  if (import.meta.env.DEV && (copy.title.length < 45 || copy.title.length > 62 || copy.description.length > 155))
    console.warn(`[SalesforceCity:${slug}] title ${copy.title.length} chars (45-62), description ${copy.description.length} (<=155)`);

  useSEO({
    title: copy.title,
    description: copy.description,
    canonical: getCanonicalUrl(path),
    ogTitle,
    ogDescription: copy.description,
    ogUrl: getCanonicalUrl(path),
    ogImage: shareImage,
    ogImageSize: [1200, 630],
    ogImageAlt: photo.alt,
    twitterTitle: ogTitle,
    twitterDescription: copy.description,
    twitterImage: shareImage,
    // structure-spec D9: Houston is built and routed but not shipped to search until its gate passes
    // (D2 vs Dallas/Austin + a Keyword Planner pull). Flip this, then add it to sitemap.xml and llms.txt.
    noindex: slug === "houston",
    preloadImage: files.avif1600,
    preloadImageSrcset: sfHeroAvifSrcset(files),
    preloadImageSizes: SF_HERO_SIZES,
    preloadImageType: "image/avif",
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  // CITY-11: the Malvern entity stays the provider, but its PA/DE county service area is not this page's area.
  const localBusiness: Record<string, unknown> = { ...createLocalBusinessSchema("ProfessionalService") };
  delete localBusiness.areaServed;

  const marketReadouts: Readout[] = [
    { value: total, label: "Salesforce job listings within 25 miles", source: <>LinkedIn · read {fmtDate(c.jobsPulled, "short")} · {ord(c.jobsRank.rank)} of {c.jobsRank.of} metros</> },
    { value: c.establishments.value, label: "Business establishments in the metro", source: <>Census CBP 2023{estChange != null && <> · {signed(estChange)} since 2018</>}</> },
    { value: c.size500plus.value, label: "Establishments with 500 or more employees", source: <>Census CBP 2023 · <Verify id="market">Where these figures come from</Verify></> },
  ];

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          `Salesforce consulting in ${place}`,
          `Salesforce consulting for ${who}: ${copy.answer.lead.replace(/, scoped.*$/, "")}, delivered remotely from Malvern, Pennsylvania by a listed AppExchange Consulting Partner.`,
          "Salesforce consulting",
          url,
          {
            areaServed: { "@type": "City", name: c.name, containedInPlace: { "@type": "AdministrativeArea", name: c.msa.name } },
            image: shareImage,
            offers: SF_HEALTH_CHECK_OFFER,
          },
        )}
      />
      <StructuredData data={localBusiness} />
      <StructuredData data={createFAQSchema(faqs.filter((f) => f.schema !== false))} />
      <StructuredData data={createWebPageSchema(copy.title, copy.description, url, { dateModified: "2026-10-23", primaryImage: { url: shareImage, width: 1200, height: 630 } })} />

      <SfPage crumbs={[{ label: "Salesforce", to: "/services/salesforce" }, { label: c.name }]}>
        {/* 1 HERO: the city's licensed photograph is the LCP (eager, preloaded, never animated); H1 + one-sentence lede. */}
        <SFHero
          kicker={<>Salesforce Consulting Partner<span className="sf-kicker-loc"> · remote from Malvern, PA</span></>}
          title={h1}
          lede={heroLede}
          primary={{ href: "#start", label: "Book a free health check" }}
          proof
          photo={photo}
        />

        {/* 2 THE ANSWER (spec H2 1) + FIG. 1, the one staged scene: what the free week produces. 7/5. */}
        <SmartSection id="answer" tone="surface" grid labelledBy="h-answer">
          <SmartUnit
            className="sf-c7"
            headingId="h-answer"
            title={`Do you provide Salesforce consulting in ${c.name}?`}
            lede={`Yes, we take on Salesforce work for ${who} remotely from Malvern, PA, and the work runs inside your org from day one.`}
            leadIn="What we do:"
            lead={copy.answer.lead}
            points={copy.answer.points}
          >
            <GoDeeper label={`how a ${c.name} engagement runs remotely`}>
              <p className="sf-rule">Salesforce work happens inside the org, not in a room, so we run {who.replace(/ (companies|organizations)$/, "")} projects from our office at 625 Swedesford Rd, Unit B, Malvern, PA 19355, over video and screen-share.</p>
              {copy.siblings.length > 0 && <p>The nearest of our other city pages is <Link className="sf-link" to={copy.siblings[0].to}>{copy.siblings[0].label}</Link>.</p>}
              <div className="sf-links">
                <Link className="sf-link" to="/services/salesforce">Salesforce consulting services</Link>
                <Link className="sf-link" to="/services/salesforce-implementation-cost">Salesforce implementation cost guide</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <HealthCheck fig={1} className="sf-c5" />
        </SmartSection>

        {/* 3 SERVICES (spec H2 2): 4 + 3 cards, the health check first, then this city's own emphasis. */}
        <SmartSection id="services" heading={{ id: "h-services", title: `Salesforce consulting services for ${who}`, lede: copy.services.lede }}>
          <ServiceCards items={cards} />
        </SmartSection>

        {/* 4 THE CITY-ONLY BAND (spec H2 6, doorway rule D3b): night split, two hand-written H3 units. */}
        <SmartSection id="local" tone="night" grid heading={{ id: "h-local", title: copy.local.h2, lede: copy.local.lede }}>
          <LocalUnit u={copy.local.units[0]} />
          <LocalUnit u={copy.local.units[1]} delay={0.08} />
        </SmartSection>

        {/* 5 CHOOSING (spec H2 3) beside HIRE, CONTRACT OR PARTNER (spec H2 4): the buyer's two decisions. */}
        <SmartSection id="decide" grid labelledBy="h-choose">
          <SmartUnit
            className="sf-c5"
            headingId="h-choose"
            title={`Choosing a Salesforce consultant in ${c.name}`}
            lede="Check the firm in Salesforce's AppExchange Partner Finder, count its certified people, and ask who will do the work."
            lead="A partner's record is public, so you can read it before the first call instead of after the contract."
            points={["Find the firm on AppExchange and open its listing", "Read its certified people, certifications and competency rows", "Ask who will do your work; check them on Trailblazer"]}
            measure={false}
            style={{ alignSelf: "start" }}
          >
            <GoDeeper label="our own record, checked the same way">
              <p className="sf-rule">Ours is AppExchange listing {SF_LISTING_ID}, a Select Consulting Partner record: Salesforce lists {SF_CERTIFIED_PEOPLE} certified people and {SF_CERTIFICATIONS} certifications, read {SF_VERIFIED_LABEL}.</p>
              <div className="sf-links">
                <Verify id="appexchange">Check our AppExchange record</Verify>
                <Link className="sf-link" to="/services/salesforce-consulting-partner-pennsylvania">How to check a Salesforce partner</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c7"
            headingId="h-hire"
            title={`Hire, contract or partner in ${c.name}?`}
            lede={`${c.name} showed ${n(total)} Salesforce listings across four LinkedIn role searches on ${fmtDate(c.jobsPulled)}; hire, contract or partner: the table shows which fits.`}
            lead={`One in-house software developer here earns a median $${n(c.wages.developers.median)} a year in salary alone (BLS, ${c.wages.period}), before benefits.`}
            measure={false}
          >
            <h3 className="sf-h3" style={{ marginTop: 32 }}>Three ways to get the work done</h3>
            <div className="sf-deep-body" style={{ padding: "12px 0 0" }}>
              <table>
                <caption className="sr-only">Hire, contract or bring in a Salesforce partner in {c.name}: what each costs to start and what you have at the end</caption>
                <thead>
                  <tr><th scope="col">Option</th><th scope="col">To start, and at the end</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Full-time hire</th>
                    <td><span style={{ display: "block" }}>Salary alone: BLS medians in the {msaName(c)} are ${n(c.wages.analysts.median)} for computer systems analysts and ${n(c.wages.developers.median)} for software developers, before benefits.</span><span className="sf-mono" style={{ display: "block", marginTop: 4 }}>At the end: a {c.name} hire who knows your org, for as long as they stay.</span></td>
                  </tr>
                  <tr>
                    <th scope="row">Contractor</th>
                    <td><span style={{ display: "block" }}>A day or hourly rate set by each contractor, competing for the same {n(total)} {c.name} listings.</span><span className="sf-mono" style={{ display: "block", marginTop: 4 }}>At the end: hours of work against a brief you write and manage.</span></td>
                  </tr>
                  <tr>
                    <th scope="row">Salesforce partner</th>
                    <td><span style={{ display: "block" }}>A written scope and price for the {c.name} work after the free one-week health check, from a team already certified and staffed.</span><span className="sf-mono" style={{ display: "block", marginTop: 4 }}>At the end: the finished work and a written handover your own people can run.</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="sf-mono" style={{ marginTop: 12, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              LinkedIn, read {fmtDate(c.jobsPulled, "short")} · BLS OEWS {c.wages.period}, read {fmtDate(c.wages.pulled, "short")} · <Verify id="market">Sources</Verify>
            </p>

            <h3 className="sf-h3" style={{ marginTop: 40 }}>Salesforce admin, developer, consultant or architect?</h3>
            <p style={{ marginTop: 8 }}>{roleName(byCount[0].role)} listings lead in {c.name} with {n(byCount[0].count)}; {roleName(byCount[3].role).toLowerCase()} listings are the fewest at {n(byCount[3].count)}.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "20px var(--gap)", marginTop: 20 }}>
              {byCount.map((j) => (
                <div className="sf-readout" key={j.role}>
                  <span className="sf-h2" data-count={j.count} style={{ display: "inline-block", minWidth: "2ch", fontVariantNumeric: "tabular-nums" }}>{n(j.count)}</span>
                  <p className="sf-readout-lab">{roleName(j.role)} listings</p>
                  <p className="sf-readout-src sf-mono">{Math.round((j.count / total) * 100)}% of the four searches</p>
                </div>
              ))}
            </div>
            <GoDeeper label="what each Salesforce role does">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                {byCount.map((j) => {
                  const r = roleName(j.role);
                  return <li key={r}><b className="sf-lead-in">{r}:</b> {ROLE_DOES[r]}.</li>;
                })}
              </ul>
              <p>Need one of these roles inside your team rather than a project? <Link className="sf-link" to="/services/staff-augmentation">Salesforce staff augmentation</Link></p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 6 INDUSTRIES (spec H2 5): unit + FIG. 2, the city's own employer groups. */}
        <SmartSection id="industries" tone="surface" grid labelledBy="h-industries">
          <SmartUnit
            className="sf-c5"
            headingId="h-industries"
            title={`Where Salesforce fits ${short(c)}'s largest industries`}
            lede={`The four largest employer groups in the ${msaName(c)} employ ${n(indTotal)} people, led by ${c.industries[0].label}.`}
            lead={`Each needs different Salesforce work: ${list(c.industries.map((i) => INDUSTRY_WORK[i.code] ?? i.label))}.`}
            measure={false}
          >
            <GoDeeper label={`the four ${short(c)} employer groups, one by one`}>
              <ul className="sf-points" style={{ marginTop: 0 }}>
                {c.industries.map((i) => (
                  <li key={i.code}><b className="sf-lead-in">{cap(i.label)}:</b> {n(i.employees)} employees, {n(i.establishments)} establishments. {INDUSTRY_NOTE[i.code]}</li>
                ))}
              </ul>
            </GoDeeper>
          </SmartUnit>
          <IndustriesFigure c={c} fig={2} />
        </SmartSection>

        {/* 7 FIGURES (spec H2 7): three market readouts + the one "Where these figures come from" pop-up. */}
        <SmartSection
          id="figures"
          heading={{
            id: "h-figures",
            title: `${c.name} business and Salesforce figures`,
            lede: `Every figure covers the ${msaName(c)} unless stated, with its source and the date we read it.`,
          }}
        >
          <Readouts items={marketReadouts} withEvidence={false} />
          <div className="sf-grid" style={{ marginTop: 8 }}>
            <div className="sf-c7">
              <GoDeeper label={`how to read the ${short(c)} figures`}>
                <p className="sf-rule">On {fmtDate(c.jobsPulled)}, LinkedIn searches within 25 miles of {c.name} returned {roleCounts(c)}; a listing can match more than one search, so read the {n(total)} as demand rather than a head count.</p>
                <p>
                  The {msaName(c)} had {n(c.establishments.value)} business establishments in 2023{estChange != null && <>, {estChange >= 0 ? "up" : "down"} {Math.abs(estChange)}% from 2018</>}; {n(c.size500plus.value)} of them employed 500 or more people and another {n(c.size100to499.value)} employed 100 to 499.
                  {popChange != null && <> Population changed {signed(popChange)} between 2019 and 2024.</>}
                </p>
                {fed && <p>{fed}</p>}
                <p>Salesforce roles have no federal job code of their own, so the BLS figures use the closest occupations: {n(c.wages.analysts.employment)} computer systems analysts (median ${n(c.wages.analysts.median)}) and {n(c.wages.developers.employment)} software developers (median ${n(c.wages.developers.median)}), {c.wages.period}.</p>
              </GoDeeper>
            </div>
          </div>
        </SmartSection>

        {/* 8 COMMUNITY (spec H2 8): the groups and the Salesforce office question, both from data. */}
        <SmartSection
          id="community"
          tone="surface"
          grid
          heading={{
            id: "h-community",
            title: `The Salesforce community in ${c.name}`,
            lede: groups.length
              ? `${groups.length} Trailblazer Community Group${groups.length === 1 ? "" : "s"} with an event in the past year ${groups.length === 1 ? "meets" : "meet"} within 50 km of central ${c.name}.`
              : `The nearest active Trailblazer Community Groups meet more than 50 km from central ${c.name}.`,
          }}
        >
          <SmartUnit
            level={3}
            className="sf-c6"
            title={`Where ${short(c)}'s Salesforce community meets`}
            lede={communityLede(groups)}
            points={groups.slice(0, 3).map((g) => <>{g.name} <span className="sf-mono">· {g.km} km</span></>)}
            measure={false}
          >
            {(groups.length > 3 || upcoming.length > 0) && (
              <GoDeeper label={`every ${short(c)} group and the upcoming events`}>
                {groups.length > 3 && (
                  <ul className="sf-points" style={{ marginTop: 0 }}>
                    {groups.slice(3).map((g) => <li key={g.url}>{g.name} <span className="sf-mono">· {g.km} km</span></li>)}
                  </ul>
                )}
                {upcoming.length > 0 && <p>Upcoming regional events: {list(upcoming.map((e) => `${e.name} (${fmtEvent(e.date)})`))}.</p>}
              </GoDeeper>
            )}
            <p className="sf-mono" style={{ marginTop: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Trailblazer Community Groups · read {fmtDate(c.community.pulled, "short")} · <Verify id="community">Sources</Verify>
            </p>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c6"
            delay={0.08}
            title={`Does Salesforce have an office in ${c.name}?`}
            lede={c.salesforceOffice ? `Yes, Salesforce lists an office in ${c.name}, at the address below.` : `No, Salesforce lists no office in ${c.name}${c.nearestOffice ? `; the nearest is in ${officeTown(c.nearestOffice)}` : ""}.`}
            leadIn="The bottom line:"
            lead="Salesforce certifies people, not offices, so the certification travels with the person and the work runs inside your org."
            measure={false}
          >
            {(c.salesforceOffice || c.nearestOffice) && (
              <p className="sf-mono" style={{ marginTop: 16, color: "var(--ink)" }}>{c.salesforceOffice ?? c.nearestOffice}</p>
            )}
            <p className="sf-mono" style={{ marginTop: 8, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Salesforce office locations · read {fmtDate(c.jobsPulled, "short")} · <Verify id="community">Sources</Verify>
            </p>
          </SmartUnit>
        </SmartSection>

        {/* 9 HOW IT RUNS (spec H2 9): FIG. 3, the scroll-drawn rail of the health check's four steps. */}
        <SmartSection
          id="process"
          heading={{
            id: "h-process",
            title: "How a Salesforce engagement runs from Malvern",
            lede: `A ${c.name} engagement starts with the free one-week health check and runs remotely from our Malvern office, in four steps.`,
          }}
        >
          <StageRail
            fig={3}
            stations={HC_STATIONS}
            className="sf-rail-top"
            title="Staged diagram of the four steps of the free one-week Salesforce health check"
            desc="A rail runs through four stations: tell us the symptom, a week in your org, a written ranked list, and you decide what happens next."
            stamp="How the free week runs"
            caption={`The four steps in order; every ${c.name} engagement starts here, and you can stop after any of them.`}
          />
          {/* D4: the shared rail stays one line per step (the detail lives on the health-check page); each unit is wired
              to its station through data-station, so hover and focus still highlight the rail. */}
          <ol className="sf-grid sf-stages">
            {HC_STAGES.map((s) => (
              <LedgerRule as="li" key={s.k} className="sf-c3" data-station={s.k}>
                <span className="sf-num" aria-hidden="true">{s.num}</span>
                <h3 className="sf-h3">{s.title}</h3>
                <p data-lede="">{s.line}</p>
              </LedgerRule>
            ))}
          </ol>
        </SmartSection>

        {/* 10 WHY US (spec H2 10): the record, who leads the work, delivered work, the objections. */}
        <SmartSection
          id="record"
          tone="surface"
          heading={{
            id: "h-record",
            title: `Why ${who} work with OneAlgorithm`,
            lede: <>Salesforce's AppExchange record lists OneAlgorithm as a Select Consulting Partner with {SF_CERTIFIED_PEOPLE} certified people and {SF_CERTIFICATIONS} certifications, read {SF_VERIFIED_LABEL}.</>,
          }}
        >
          <Readouts />
          <div className="sf-grid" style={{ marginTop: 56 }}>
            <SmartUnit
              level={3}
              className="sf-c7"
              title="Salesforce work we have delivered"
              lede="We have delivered Salesforce development, an SAP sync, QuickBase and Kissflow migrations and Marketing Cloud support; client names stay private."
            >
              <DeliveredLedger />
            </SmartUnit>
            <LedgerRule as="aside" className="sf-c5 sf-lead-block" delay={0.08} aria-labelledby="h-lead">
              <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
              <PersonCredentials />
            </LedgerRule>
          </div>
          <div className="sf-grid" style={{ marginTop: 56 }}>
            {CONCERNS.map((q, i) => (
              <LedgerRule as="article" key={q.q} className="sf-c4" delay={i * 0.08}>
                <h3 className="sf-h3">{q.q}</h3>
                <GoDeeper label={q.q} title="The answer">
                  <p className="sf-rule">{q.a}</p>
                </GoDeeper>
              </LedgerRule>
            ))}
          </div>
        </SmartSection>

        {/* 11 DESK (spec H2 13): the one form; every primary CTA points here. */}
        <DeskCTA form={{ topic: slug, topicLabel: `Salesforce consulting · ${c.name}`, heading: "Book a free health check", prompt: "What is your Salesforce doing wrong?", submitLabel: "Book a free health check" }} />

        {/* 12 FAQ (spec H2 11): the city's own questions + the template set; answers in the HTML behind disclosures. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Salesforce consulting in {c.name}: questions</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={faqs} schema={false} />
          </div>
        </SmartSection>

        {/* 13 OTHER CITIES (spec H2 12): the named siblings in prose, then the city nav. Houston waits for its gate. */}
        <SmartSection
          id="cities"
          compact
          heading={{
            id: "h-cities",
            title: "Salesforce consulting in other cities",
            lede: <>Nearest to {c.name} on our Salesforce pages: {copy.siblings.map((s, i) => (
              <React.Fragment key={s.to}>{i > 0 && (i === copy.siblings.length - 1 ? " and " : ", ")}<Link className="sf-link" to={s.to}>{s.label}</Link></React.Fragment>
            ))}.</>,
          }}
        >
          <nav aria-label="Salesforce consultants by city" style={{ marginTop: 24 }}>
            <ul className="sf-links">
              {otherCities.map((x) => (
                <li key={x.to}><Link className="sf-link" to={x.to}>Salesforce consultants in {x.label}</Link></li>
              ))}
            </ul>
          </nav>
        </SmartSection>

        <SourcesDialog id="market" sources={marketSources(c)} />
        <SourcesDialog id="community" title="Where the community figures come from" sources={communitySources(c, day)} />
        <PhotoCreditsLine photo={photo} />
      </SfPage>
    </Layout>
  );
}
