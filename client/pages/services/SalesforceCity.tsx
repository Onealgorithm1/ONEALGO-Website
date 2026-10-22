import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  PageHero,
  Section,
  SectionHeading,
  CTABand,
  Reveal,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
} from "../../components/StructuredData";
import { SALESFORCE_CITIES } from "../../data/salesforceCities";
import { CITY_COPY } from "../../data/salesforceCityCopy";

/* One template for the wave-2 Salesforce city pages (2026-10-22).
 * WHY ONE TEMPLATE IS NOT A DOORWAY PAGE: the body is the city's own data —
 * Census, BLS, LinkedIn, USAspending and Salesforce community counts generated
 * from source (client/data/salesforceCities.ts) — plus a hand-written angle and
 * FAQs unique to that city (salesforceCityCopy.ts). Only the "what we do" and
 * honesty blocks repeat. Decision + data: onealgo-icm-oa run
 * 2026-10-21_sf-nationwide/decision-log.md (#3, #8, #9).
 * ⛔ We are in Malvern, PA. Never imply an office or clients in the city. */

const n = (v: number | null | undefined) =>
  v == null ? "—" : Number(v).toLocaleString("en-US");

const SERVICES = [
  ["/services/salesforce-data-migration", "Salesforce data migration"],
  ["/services/salesforce-integration", "Salesforce integration (SAP and ERP)"],
  ["/services/salesforce-managed-services", "Salesforce managed services"],
  ["/services/salesforce-marketing-cloud-consulting", "Marketing Cloud consulting"],
  ["/services/staff-augmentation", "Salesforce staff augmentation"],
  ["/services/salesforce-implementation-cost", "Salesforce implementation cost guide"],
] as const;

type Fact = { label: string; value: string; note?: ReactNode; source: string; href: string };

const STATE: Record<string, string> = { NY: "New York State", DC: "the District of Columbia", TX: "Texas", CO: "Colorado", GA: "Georgia", MA: "Massachusetts", WA: "Washington State", CA: "California", FL: "Florida", IL: "Illinois", PA: "Pennsylvania" };
/** ", Fort Worth" when a group's URL names a place other than the page's city, so same-named groups differ. */
const groupPlace = (url: string, city: string) => {
  const place = url.match(/group-([a-z-]+?)-united-states/)?.[1].split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
  return place && !city.toLowerCase().startsWith(place.toLowerCase()) ? `, ${place}` : "";
};
const ord = (k: number) => k + (["th", "st", "nd", "rd"][((k % 100) - 20) % 10] || ["th", "st", "nd", "rd"][k % 100] || "th");
const pct = (a?: number | null, b?: number | null) => (a && b ? Math.round(((a - b) / b) * 1000) / 10 : null);

/** A generated chart (scripts/salesforce-images.mjs). Height follows the generator's layout: 92 + rows*56 + 64. */
function Chart({ src, alt, rows }: { src: string; alt: string; rows: number }) {
  return (
    <figure className="mt-10 max-w-3xl">
      <img src={src} alt={alt} title={alt} width={800} height={92 + rows * 56 + 64} loading="lazy" decoding="async" className="h-auto w-full border border-oa-hairline" />
    </figure>
  );
}

/** The genuine Salesforce Partner badge (public/salesforce-partner-badge.png, 360x206). */
export function PartnerBadge() {
  return (
    <a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000EV7SwUAL" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-4 text-sm text-oa-ink2 underline-offset-4 hover:underline">
      <img src="/salesforce-partner-badge.png" alt="Salesforce Partner badge" width={120} height={69} loading="lazy" decoding="async" />
      <span>OneAlgorithm on Salesforce AppExchange</span>
    </a>
  );
}

/** Sentences written from this city's numbers only, so no two cities share them. */
export function CityNarrative({ slug }: { slug: string }) {
  const c = SALESFORCE_CITIES.find((x) => x.slug === slug)!;
  const role = (r: string) => c.jobs.find((j) => j.role.endsWith(r))?.count;
  const total = c.jobs.reduce((s, j) => s + j.count, 0);
  const estChange = pct(c.establishments?.value, c.establishments2018?.value);
  const bigChange = pct(c.size500plus?.value, c.size500plus2018?.value);
  const popChange = pct(c.population?.value, c.population2019?.value);
  const top = c.industries[0];
  // State-level federal line appears on ONE city page per state (the largest without a city figure),
  // so Dallas/Austin and San Francisco/Los Angeles do not share an identical paragraph.
  const owner = SALESFORCE_CITIES.filter((x) => x.state === c.state && !x.federal).sort((a, b) => (b.establishments?.value ?? 0) - (a.establishments?.value ?? 0))[0];
  const fedState = !c.federal && owner?.slug === c.slug ? c.federalState : null;
  return (
    <Section tone="surface" bordered>
      <SectionHeading eyebrow="What the numbers say" title={`Reading the ${c.name} data`} />
      <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-oa-ink2">
        <p>
          On {c.jobsPulled}, a LinkedIn search within 25 miles of {c.name} returned {n(role("Consultant"))} openings for Salesforce consultants, {n(role("Administrator"))} for administrators, {n(role("Architect"))} for architects and {n(role("Developer"))} for developers — {n(total)} in all, {ord(c.jobsRank.rank)} of the {c.jobsRank.of} metro areas we checked.
        </p>
        <p>
          The metro had {n(c.establishments?.value)} business establishments in 2023{estChange != null && <>, {estChange >= 0 ? "up" : "down"} {Math.abs(estChange)}% from {n(c.establishments2018?.value)} in 2018</>}. Establishments with 500 or more employees{bigChange != null ? <> went from {n(c.size500plus2018?.value)} to {n(c.size500plus?.value)} ({bigChange >= 0 ? "+" : ""}{bigChange}%)</> : <> numbered {n(c.size500plus?.value)}</>}{popChange != null && <>, while population changed {popChange >= 0 ? "+" : ""}{popChange}% between 2019 and 2024</>}.
          {top && <> The largest employer group in our pull is {top.label}, with {n(top.employees)} employees across {n(top.establishments)} establishments.</>}
          {c.industries[1] && c.industries[2] && <> Next come {c.industries[1].label} ({n(c.industries[1].employees)} employees) and {c.industries[2].label} ({n(c.industries[2].employees)}){c.industries[3] ? <>, then {c.industries[3].label} ({n(c.industries[3].employees)})</> : null}. Those are the groups whose Salesforce needs we plan around when we scope work for {/^[AEIOU]/.test(c.name) ? "an" : "a"} {c.name} company.</>}
        </p>
        {fedState && (
          <p>
            Across {STATE[fedState.place] ?? fedState.place}, federal agencies recorded {n(fedState.awards)} contract award{fedState.awards === 1 ? "" : "s"} mentioning Salesforce in {fedState.period}{fedState.usd ? <>, worth ${n(fedState.usd)} in obligations</> : null}{fedState.agencies ? <>; the largest buyers were {String(fedState.agencies).split(";").slice(0, 2).map((a) => a.split(":")[0].trim()).join(" and ")}</> : null}.
          </p>
        )}
      </div>
      <Chart src={`/media/salesforce/salesforce-jobs-${c.slug}.svg`} rows={c.jobs.length} alt={`Bar chart of open Salesforce roles within 25 miles of ${c.name} on ${c.jobsPulled}: ${c.jobs.map((j) => `${j.role.replace("Salesforce ", "")} ${n(j.count)}`).join(", ")}. Source: LinkedIn public job search.`} />
    </Section>
  );
}

/* Where our proven work meets each industry. Every clause is true of OneAlgorithm
   (OA notes: salesforce-delivery-evidence-2026-09-01, clients-oa) or a plain statement of
   what the work involves — no industry client claims. Joined to the city's own numbers in
   ONE sentence so no two city pages share it. */
const INDUSTRY_FIT: Record<string, string> = {
  "62": "Salesforce work there usually turns on access — who can see which records — enforced with permission sets and sharing rules rather than a pile of profiles",
  "52": "that is where we currently run ongoing Salesforce development for a lending company",
  "54": "firms like these tend to use Salesforce to track clients, projects and proposals, and need reporting that agrees across all three",
  "31-33": "manufacturers usually need Salesforce to agree with an ERP on accounts, orders and pricing, and we have built an SAP-to-Salesforce sync",
  "42": "distribution runs on volume, so bulk data loads and de-duplication matter, and we run bulk data jobs as routine work",
  "813": "associations and nonprofits often move member and donor data off older databases, and we have migrated QuickBase and Kissflow systems into Salesforce",
  "51": "these businesses usually need Salesforce connected to billing and product systems, which is integration work we deliver",
  "53": "firms here typically use Salesforce to keep properties, contacts and deals in one place",
};

/** The city's three largest employer groups, each tied to the Salesforce work it usually needs. */
export function CityIndustries({ slug }: { slug: string }) {
  const c = SALESFORCE_CITIES.find((x) => x.slug === slug)!;
  const top = c.industries.slice(0, 3).filter((i) => INDUSTRY_FIT[i.code]);
  if (top.length === 0) return null;
  return (
    <Section tone="paper" bordered>
      <SectionHeading eyebrow="Industries" title={`Where Salesforce fits ${c.name}'s largest industries`} lede="Employer groups ranked by employees, Census County Business Patterns 2023." />
      <ul className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-oa-ink2">
        {top.map((i) => (
          <li key={i.code} className="border-t border-oa-hairlineStrong pt-5">
            <strong className="text-oa-ink">{i.label.charAt(0).toUpperCase() + i.label.slice(1)}.</strong>{" "}
            In the {c.name} metro, {n(i.employees)} people work in {i.label} across {n(i.establishments)} establishments; {INDUSTRY_FIT[i.code]}.
          </li>
        ))}
      </ul>
      <Chart src={`/media/salesforce/${c.slug}-largest-industries.svg`} rows={c.industries.length} alt={`Bar chart of the largest employer groups in the ${c.name} metro by employees: ${c.industries.map((x) => `${x.label} ${n(x.employees)}`).join(", ")}. Source: US Census Bureau, County Business Patterns 2023.`} />
    </Section>
  );
}

/** The sourced fact table for one city. Shared with the Philadelphia page. */
export function CityFacts({ slug }: { slug: string }) {
  const c = SALESFORCE_CITIES.find((x) => x.slug === slug)!;
  const jobsTotal = c.jobs.reduce((s, j) => s + j.count, 0);
  const facts: Fact[] = [
    { label: `${n(c.establishments?.value)} business establishments in the ${c.name} metro`, value: n(c.establishments?.value), note: c.establishments2018 ? `${n(c.establishments2018.value)} in 2018` : undefined, source: "US Census Bureau, County Business Patterns 2023", href: c.sources.cbp },
    { label: `${n(c.size500plus?.value)} establishments with 500 or more employees`, value: n(c.size500plus?.value), note: c.size500plus2018 ? `${n(c.size500plus2018.value)} in 2018` : undefined, source: "Census CBP 2023 (sum of two published size classes)", href: c.sources.cbp },
    { label: `${n(c.size100to499?.value)} establishments with 100–499 employees`, value: n(c.size100to499?.value), source: "Census CBP 2023 (sum of two published size classes)", href: c.sources.cbp },
    ...c.industries.slice(0, 3).map((i) => ({ label: `${n(i.employees)} employees in ${i.label}`, value: n(i.employees), note: `${n(i.establishments)} establishments`, source: "Census CBP 2023", href: c.sources.cbp })),
    { label: `${n(c.softwareDevelopers?.value)} software developers employed in the metro`, value: n(c.softwareDevelopers?.value), note: c.softwareDeveloperMedianWage ? `median wage $${n(c.softwareDeveloperMedianWage.value)}` : undefined, source: "BLS Occupational Employment and Wage Statistics, May 2025", href: c.sources.oews ?? "https://www.bls.gov/oes/" },
    { label: `${n(jobsTotal)} open Salesforce roles within 25 miles of ${c.name}`, value: n(jobsTotal), note: c.jobs.map((j, i) => <span key={j.role}>{i > 0 && " · "}<a href={j.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{j.role.replace("Salesforce ", "")} {n(j.count)}</a></span>), source: `LinkedIn job search: sum of four role-title searches, ${c.jobsPulled} (each count links to its own search; this link is the consultant search)`, href: c.jobs.find((j) => j.role.endsWith("Consultant"))?.url ?? "https://www.linkedin.com/jobs/" },
    ...(c.federal ? [{ label: `${n(c.federal.awards)} federal contract award${c.federal.awards === 1 ? "" : "s"} mentioning Salesforce (${c.federal.place === "Washington DC" ? "Washington, DC" : `city of ${c.federal.place}`})`, value: n(c.federal.awards), note: c.federal.usd ? `$${n(c.federal.usd)} obligated, ${c.federal.period}` : c.federal.period, source: "USAspending.gov", href: c.sources.usaspending }] : []),
  ];

  return (
    <Section tone="surface" bordered>
        <SectionHeading eyebrow="The local data" title={`Business and Salesforce data for ${c.name}`} lede="Every figure links to its public source. Metro-area figures unless stated." />
        <dl className="mt-10 divide-y divide-oa-hairlineStrong border-y border-oa-hairlineStrong">
          {facts.map((f) => (
            <div key={f.label} className="grid gap-1 py-4 md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,4fr)] md:gap-6">
              <dt className="text-lg font-semibold text-oa-ink">{f.label}</dt>
              <dd className="text-sm text-oa-ink2">{f.note ?? ""}</dd>
              <dd className="text-sm text-oa-ink2">
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="underline decoration-oa-hairlineStrong underline-offset-4 hover:text-oa-ink">{f.source}</a>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
  );
}

export default function SalesforceCity({ slug }: { slug: string }) {
  const c = SALESFORCE_CITIES.find((x) => x.slug === slug)!;
  const copy = CITY_COPY[slug];
  const where = `${c.name}, ${c.state}`.replace("Washington, DC, DC", "Washington, DC");
  const path = c.path;
  const jobsTotal = c.jobs.reduce((s, j) => s + j.count, 0);
  // Two FAQs generated from this city's own numbers (LinkedIn 2026-10-21, BLS OEWS May 2025).
  const role = (r: string) => c.jobs.find((j) => j.role.endsWith(r))?.count;
  const faqs = [
    ...copy.faqs,
    {
      q: `How much demand is there for Salesforce skills in ${c.name}?`,
      a: `On ${c.jobsPulled}, a LinkedIn search within 25 miles of ${c.name} showed ${n(jobsTotal)} open Salesforce roles: ${n(role("Consultant"))} consultant, ${n(role("Administrator"))} administrator, ${n(role("Architect"))} architect and ${n(role("Developer"))} developer openings. That ranked ${c.name} ${ord(c.jobsRank.rank)} of the ${c.jobsRank.of} metro areas we checked. When that many employers compete for the same people, a partner can cover a defined project without a new hire.`,
    },
    {
      q: `Is there a Salesforce user community in ${c.name}?`,
      a: c.groups.length > 0
        ? `Yes. ${c.groups.length} Salesforce Trailblazer Community Group${c.groups.length === 1 ? " lists" : "s list"} the ${c.name} area: ${c.groups.map((g) => { const pl = groupPlace(g.url, c.name).replace(/^,\s*/, ""); return pl ? `${g.name} (${pl})` : g.name; }).join(", ")}. ${c.salesforceOffice ? `Salesforce also lists an office at ${c.salesforceOffice}.` : `Salesforce lists no office in ${c.name}${c.nearestOffice ? `; the nearest is at ${c.nearestOffice}` : ""}.`}${c.events.length ? ` Upcoming regional events include ${c.events.map((e) => `${e.name} (${e.date})`).join(" and ")}.` : ""}`
        : `We found no Trailblazer Community Group listed for ${c.name}. ${c.salesforceOffice ? `Salesforce lists an office at ${c.salesforceOffice}.` : `Salesforce lists no office in ${c.name}${c.nearestOffice ? `; the nearest is at ${c.nearestOffice}` : ""}.`}${c.events.length ? ` The nearest community events we found are ${c.events.map((e) => `${e.name} (${e.date})`).join(" and ")}.` : ""}`,
    },
    ...(c.softwareDeveloperMedianWage
      ? [{
          q: `What does Salesforce talent cost in ${c.name}?`,
          a: `Salesforce roles have no job code of their own in federal wage data, so the closest official figure is software developers: in the ${c.name} metro, ${n(c.softwareDevelopers?.value)} are employed at a median annual wage of $${n(c.softwareDeveloperMedianWage.value)} (BLS, May 2025). For a migration, an integration or an org clean-up, a partner engagement is scoped and priced up front instead; our implementation cost guide shows published market ranges.`,
        }]
      : []),
  ];

  useSEO({
    title: `Salesforce Consultant ${where} | OneAlgorithm`,
    description: `Salesforce consulting for ${c.name} companies: migration, integration and managed services. Free org review.`,
    canonical: getCanonicalUrl(path),
    ogTitle: `Salesforce Consultant ${where} — OneAlgorithm`,
    ogDescription: `Salesforce consulting for ${c.name} companies from a listed AppExchange Consulting Partner in Malvern, PA.`,
    ogUrl: getCanonicalUrl(path),
    ogImage: `https://onealgorithm.com/media/salesforce/og-${slug}.jpg`,
    ogImageSize: [1200, 630],
    twitterImage: `https://onealgorithm.com/media/salesforce/og-${slug}.jpg`,
  });

  return (
    <Layout>
      <StructuredData data={createServiceSchema(`Salesforce Consulting in ${where}`, `Salesforce consulting for companies in ${where}: data migration, SAP and ERP integration, managed services and Marketing Cloud, delivered remotely from Malvern, Pennsylvania by a listed AppExchange Consulting Partner.`, "CRM & Salesforce Implementation", `https://onealgorithm.com${path}`)} />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(faqs)} />

      <PageHero
        eyebrow={c.name}
        title={<>Salesforce consultant for <span className="text-oa-orange">{where}</span> companies</>}
        lede={`We are a listed AppExchange Consulting Partner based in Malvern, Pennsylvania. We deliver Salesforce work for ${c.name} companies remotely — migrations, integrations, ongoing administration, Marketing Cloud and staff augmentation — and come in person when a meeting needs it.`}
        panel={{
          title: "At a glance",
          items: [
            `${n(c.establishments?.value)} business establishments`,
            `${n(c.size500plus?.value)} with 500+ employees`,
            `${n(jobsTotal)} open Salesforce roles nearby`,
          ],
        }}
        primary={{ label: "Get a free org review", to: "/contact?need=salesforce" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <CityFacts slug={slug} />

      <CityNarrative slug={slug} />

      <CityIndustries slug={slug} />

      <Section tone="paper">
        <SectionHeading eyebrow={c.name} title={copy.angleTitle} />
        <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-oa-ink2">
          {copy.angle.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </Section>

      <Section tone="surface" bordered>
        {/* The proof list lives once, on /services/salesforce and each service page — not repeated
            on 12 city pages (dedupe pass 2026-10-22). */}
        <SectionHeading eyebrow="What we deliver" title="Our Salesforce services" />
        <PartnerBadge />
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {SERVICES.map(([to, label]) => (
            <li key={to}><Link to={to} className="inline-flex min-h-11 items-center font-medium text-oa-ink underline decoration-oa-orange underline-offset-4">{label}</Link></li>
          ))}
        </ul>
      </Section>

      {/* Community facts now live in the generated FAQ ("Is there a Salesforce user community…"). */}

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="Questions" title={`What ${c.name} callers ask first`} />
        <div className="mt-12 space-y-10">
          {faqs.map((f) => (
            <Reveal key={f.q}>
              <div className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
                <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                <p className="mt-3 leading-relaxed text-oa-ink2 md:mt-0">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" compact bordered>
        <p className="font-mono text-xs uppercase tracking-wider text-oa-ink2">Salesforce consulting in other cities</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {SALESFORCE_CITIES.filter((x) => x.slug !== slug).map((x) => (
            <li key={x.slug}><Link to={x.path} className="inline-flex min-h-11 items-center text-sm text-oa-ink2 hover:text-oa-ink">{x.name}</Link></li>
          ))}
        </ul>
      </Section>

      <CTABand
        title={`Tell us what your Salesforce is doing wrong`}
        body="An org nobody trusts, a migration that stalled, or an integration that fails quietly. Describe it and we will tell you what we would look at first."
        primary={{ label: "Get a free org review", to: "/contact?need=salesforce" }}
        secondary={{ label: "How the work runs", to: "/services/salesforce" }}
      />
    </Layout>
  );
}
