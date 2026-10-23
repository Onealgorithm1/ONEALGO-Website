import { Cable, Calculator, DatabaseZap, Layers, LifeBuoy, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { SalesforceRecordCard } from "../../components/SalesforceRecordCard";
import {
  Card,
  CardGrid,
  PageHero,
  PrimaryCTA,
  ProcessSteps,
  SecondaryCTA,
  Section,
  SectionHeading,
} from "../../components/site";
import {
  AnswerBand,
  DataTable,
  DeliveredLedger,
  Desk,
  DocNote,
  FAQList,
  Objections,
  PeopleStrip,
  PhoneBand,
  Plate,
  PlateScope,
  SF_OBJECTIONS,
  usePlate,
  type SfFaq,
} from "../../components/salesforce";
import { SF_PAGES, SF_PHONE, SF_VERIFIED_LABEL, type SfPageKey } from "../../data/salesforceProof";
import { PLATES } from "../../data/plates/health-check";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  SF_HEALTH_CHECK_OFFER,
  createFAQSchema,
  createLocalBusinessSchema,
  createServiceSchema,
  createWebPageSchema,
} from "../../components/StructuredData";

/* Salesforce health check: the entry offer every Salesforce CTA points to.
 * Rebuilt 2026-10-23 on the Salesforce plate system (build spec
 * onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/design-spec.md §3 HC and
 * §5 HC, plus the wide-layout and voice addenda). Gap IDs below are HC-n from
 * gap-audit-verified-gaps.md.
 *
 * DEMAND: "salesforce health check" ~500/mo US, KD 13; it also absorbs the
 * "salesforce optimization" queries that reach the hub (page-map.json), hence
 * the H2 "Salesforce optimization: what the week checks".
 *
 * OFFER: the free one-week review the hub has offered since 2026-08-24; the
 * five areas are the hub's REVIEW_CHECKS. ⛔ No price, SLA, reply time or
 * result figure: none is published or evidenced (SF_REPLY_PROMISE stays
 * empty until the owner picks one). ⛔ No "most orgs", "many admins",
 * "usually happens": we hold no data for any of them.
 *
 * OWNER-GATED, deliberately absent (spec §7), so nothing here is guessed:
 *  - HC-F3 specimen (Setup › Health Check screenshot): no demo-org capture
 *    exists yet; the comparison table stands on its own until it does.
 *  - "What the written list looks like" (HC-6): the list's columns, whether
 *    the Health Check score and effort estimates are reported. Owner decision 8.
 *  - "What the week does not cover" (HC-8): owner decision 8.
 *  - Reply time (HC-13), reviews (HC-2), video (HC-16).
 *  - People: no photo exists; the lead is named via PeopleStrip (SF_PEOPLE).
 * Kept out of visible copy per the voice addendum (honesty by not claiming,
 * not by announcing): we publish no client names or case studies and the
 * AppExchange listing carries no ratings yet; the "You have no reviews"
 * objection is therefore not used here.
 *
 * FACTS (checked 2026-10-23): Workflow Rules and Process Builder end of
 * support 2025-12-31 (Salesforce Help 001096524). Optimizer retired for
 * Hyperforce orgs in Winter '26 and for all other orgs in Summer '26
 * (Salesforce's notice on the Trailblazer Community). Health Check: 0-100
 * score against Salesforce's baseline or an imported one, more restrictive
 * settings typically raise it, Fix Risks can change settings at once and may
 * affect an integration (Trailhead "Use Health Check to Scan Your Security
 * Configurations"). Four levels of data access: organization, objects,
 * fields, records (Trailhead "Data Security"). Three seasonal releases a
 * year, Spring in February, Summer in June, Winter in October
 * (salesforce.com/releases). Org Check is a free Salesforce Labs app.
 * ⛔ Score grade bands (Excellent/Poor %) are NOT stated: third-party sources
 * disagree and Salesforce Help could not be read without JavaScript. */

const UPDATED = "2026-10-23";
const PAGE_URL = "https://onealgorithm.com/services/salesforce-health-check";
const TITLE = "Free One-Week Salesforce Health Check | OneAlgorithm";
const DESCRIPTION =
  "Free one-week Salesforce health check: licences, data, automation, permissions and integrations, ranked by what to fix first. Call (610) 890-9711.";
const AREAS_PLATE = PLATES["salesforce-health-check-five-areas"];
const TIMELINE_PLATE = PLATES["salesforce-workflow-rules-optimizer-retirement-timeline"];
const SHARE_IMAGE = "https://onealgorithm.com/media/salesforce/og-salesforce-health-check.jpg";
const PREFERRED_IMAGE = "https://onealgorithm.com/media/salesforce/salesforce-health-check-five-areas-1600x900.jpg";
const TRAILBLAZER = "https://www.salesforce.com/trailblazer/samirisetti";

const TOC = [
  { id: "why-now", label: "Why now" },
  { id: "signs", label: "Signs" },
  { id: "areas", label: "Five areas" },
  { id: "start", label: "Book the week" },
  { id: "process", label: "How it runs" },
  { id: "compare", label: "Tool or review" },
  { id: "faq", label: "Questions" },
];

/* HC-3: six signs, each mapped to the area that checks it. */
const SIGNS: { text: string; area: AreaKey }[] = [
  { text: "People rebuild Salesforce reports in a spreadsheet because they do not trust the numbers.", area: "data" },
  { text: "A licence renewal is coming and nobody can say which licences are in use.", area: "lic" },
  { text: "Workflow Rules or Process Builder processes are still running your automation.", area: "auto" },
  { text: "The person who built your automation has left, and nobody dares touch it.", area: "auto" },
  { text: "A sync fails and nobody hears about it until a customer does.", area: "int" },
  { text: "Nobody is sure who can see or export your customer records.", area: "perm" },
];

type AreaKey = "lic" | "data" | "auto" | "perm" | "int";
/* HC-5 / HC-7: bodies name the security and sharing terms buyers search for,
 * all inside the existing scope; links go to the service each area leads to. */
const AREAS: { k: AreaKey; title: string; tag: string; body: string; link?: { to: string; label: string } }[] = [
  {
    k: "lic",
    title: "Licences and edition",
    tag: "LICENCES",
    body: "What you pay for against what is in use: inactive users still holding licences, add-ons nobody opened, and an edition chosen before the team knew what it needed.",
    link: { to: "/services/salesforce-implementation-cost", label: "What Salesforce costs, before licences" },
  },
  {
    k: "data",
    title: "Data",
    tag: "DATA",
    body: "Duplicates, required fields filled with junk to get past validation, and the reports people rebuild in a spreadsheet because they do not trust them.",
    link: { to: "/services/salesforce-data-migration", label: "When data needs moving or cleaning" },
  },
  {
    k: "auto",
    title: "Automation",
    tag: "AUTOMATION",
    body: "Steps still done by hand that Flow should be doing, and every Workflow Rule and Process Builder process still active, with what moving each one to Flow involves.",
  },
  {
    k: "perm",
    title: "Permissions",
    tag: "PERMISSIONS",
    body: "Who can see and export what: organisation-wide defaults, sharing rules, the role hierarchy, field-level security, and profiles doing a permission set's job. We start from Salesforce's Health Check score, which covers settings such as password and session policies, and go well beyond it.",
  },
  {
    k: "int",
    title: "Integrations",
    tag: "INTEGRATIONS",
    body: "What syncs, what fails without telling anyone, and which integration users, connected apps and named credentials hold more access than the job needs.",
    link: { to: "/services/salesforce-integration", label: "When two systems disagree" },
  },
];
const AREA_TAG = Object.fromEntries(AREAS.map((a) => [a.k, a.tag])) as Record<AreaKey, string>;

const STEPS = [
  {
    title: "Tell us the symptom",
    body: "Reports nobody trusts, a renewal you are unsure about, automation nobody dares touch. A call or the form is enough to start.",
  },
  {
    title: "A week in your org",
    body: "You create a user that can read your setup and records. We work through the five areas against how your team actually uses Salesforce.",
  },
  {
    title: "A written, ranked list",
    body: "What we found, why it matters and what fixing it involves, ordered by what to do first. We walk you through it on a call.",
  },
  {
    title: "You decide what happens next",
    body: "Act on it with us, with your own admin, or not at all. If the org is basically fine, we say so.",
  },
];

const COMPARE = [
  { cells: ["What it looks at", "Security settings, against a baseline", "Licences, data, automation, permissions and integrations"] },
  { cells: ["Who runs it", "Your admin, from Setup", "Us, inside your org"] },
  { cells: ["How long", "Minutes", "One week, then a walkthrough call"] },
  { cells: ["What you get", "A score from 0 to 100, with each setting marked by risk", "A written list ranked by what to fix first"] },
  { cells: ["What it costs", "Included in Salesforce", "Free"] },
];

const FAQS: SfFaq[] = [
  {
    q: "What is the Salesforce Health Check?",
    a: "A free tool in Salesforce Setup that compares your org's security settings with a baseline, either Salesforce's standard or one you import, and scores them from 0 to 100 with each setting marked by risk. It covers security settings only, not your data, automation, licences or integrations.",
  },
  {
    q: "How do I run Salesforce Health Check?",
    a: "In Setup, type Health Check in the Quick Find box and open it. You need the View Setup and Configuration permission. Settings that miss the baseline can be changed one at a time, and many can be moved to the baseline at once with Fix Risks. Salesforce warns that changing everything at once can affect something like an integration, so check what each change touches first.",
  },
  {
    q: "How is the Salesforce Health Check score calculated?",
    a: "Salesforce scores your security settings from 0 to 100 by how closely they match the baseline you measure against: its own standard, or one you import. Settings are grouped by risk, from High-Risk to Informational, and moving a setting to the more restrictive value typically raises the score. The score is a starting point; the week explains which gaps matter for how your team works.",
  },
  {
    q: "Salesforce Health Check or Optimizer: which should I use?",
    a: "Health Check, because Optimizer is gone. Health Check reviews security settings and is still in Setup. Optimizer reviewed how the org was built; Salesforce retired it for Hyperforce orgs in the Winter '26 release and for all other orgs in Summer '26.",
  },
  {
    q: "What free tools check Salesforce org health?",
    a: "Health Check in Setup, for security settings. Org Check, a free Salesforce Labs app on AppExchange, for how the org is built. Salesforce Code Analyzer, for Apex and other code. Optimizer used to cover part of this and is now retired. None of them weighs what it finds against how your team uses Salesforce; that is what the week adds.",
  },
  {
    q: "How do I know if I need a Salesforce health check?",
    a: "Check the six signs on this page: reports rebuilt in spreadsheets, a renewal with no clear view of licence use, Workflow Rules or Process Builder still active, automation nobody dares touch, sync errors nobody sees, and doubt about who can export records. Any one of them is worth a week.",
  },
  {
    q: "What does a Salesforce org health assessment include?",
    a: "Ours covers five areas: licences and edition, data, automation, permissions and integrations. You get a written list of what we found, why it matters and what fixing it involves, ranked by what to do first.",
  },
  {
    q: "How long does a Salesforce org health check take?",
    a: "Ours takes one week, followed by a call to walk you through the list. Salesforce's built-in Health Check takes minutes, because it reads security settings only.",
  },
  {
    q: "How much does a Salesforce health check cost?",
    a: "Ours costs nothing. The week is free because it shows you how we work, on your own org, before you spend anything, and the written list is yours whether or not you work with us afterwards.",
    link: { to: "/services/salesforce-implementation-cost", label: "What Salesforce work costs" },
  },
  {
    q: "How often should you run a Salesforce health check?",
    a: "Run Salesforce's Health Check after each of its three releases a year, in February, June and October, and whenever security settings change. Book the free one-week health check before a licence renewal, when your admin changes, or before new build work starts.",
  },
  {
    q: "Will the health check disrupt our org?",
    a: "No. You create a user that can view your setup and read your records, usually with the View Setup and Configuration permission. The review reads and changes nothing, and you deactivate the user when the week ends.",
  },
  {
    q: "Can you fix what the health check finds?",
    a: "Yes. We run weekly Salesforce administration and development, migrate and reconcile data, and build integrations, SAP included. We have run ongoing Salesforce development for a lending company since April 2026. You can also hand the list to your own admin.",
    link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" },
  },
  {
    q: "What are the four levels of security in Salesforce?",
    a: "Organization, objects, fields and records. Organization settings control who can log in and how; object and field permissions control what each user can see and edit; record access comes from organisation-wide defaults, the role hierarchy and sharing rules. The week's Permissions area checks all four.",
  },
  {
    q: "Why is our Salesforce so slow?",
    a: "Two things the week checks slow a save down: automation stacked on the same object, where Workflow Rules, Process Builder processes and Flows all fire on one save, and integrations writing into the same records. The list names what fires on your busiest objects and what to consolidate.",
  },
  {
    q: "Is our Salesforce org ready for Agentforce?",
    a: "Agentforce works from your Salesforce records and acts with the access you give it, so duplicate records and loose permissions carry straight into what an agent says and does. The week's Data and Permissions areas show both before you switch an agent on.",
  },
];

const SOURCES = {
  checked: "October 2026",
  links: [
    { label: "Salesforce Help: Health Check", href: "https://help.salesforce.com/s/articleView?id=sf.security_health_check.htm&type=5" },
    { label: "Trailhead: Use Health Check to scan your security configurations", href: "https://trailhead.salesforce.com/content/learn/modules/security_basics/security_basics_healthcheck" },
    { label: "Salesforce Help: Workflow Rules and Process Builder end of support", href: "https://help.salesforce.com/s/articleView?id=001096524&type=1" },
    { label: "Trailblazer Community: Optimizer retirement notice", href: "https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000mlut50AA" },
    { label: "Trailhead: Data security overview", href: "https://trailhead.salesforce.com/content/learn/modules/data_security/data_security_overview" },
    { label: "Salesforce release schedule", href: "https://www.salesforce.com/releases/" },
  ],
};

/* "Where the list can lead" (HC-5). ponytail: hand-picked from SF_PAGES
 * instead of <RouteBoard>, because RouteBoard has no way to leave a card out
 * and the spec keeps Marketing Cloud off this page until the owner confirms
 * the week covers it (owner decision 12). Same Card/CardGrid markup as
 * RouteBoard. Upgrade path: an `exclude` prop on RouteBoard, then
 * <RouteBoard groups={["services"]} first="ms" exclude={["mc"]} />. */
const NEXT_KEYS: SfPageKey[] = ["ms", "dm", "int", "cost", "sa"];
const NEXT_ICONS: Partial<Record<SfPageKey, LucideIcon>> = {
  ms: LifeBuoy,
  dm: DatabaseZap,
  int: Cable,
  cost: Calculator,
  sa: Users,
};
const NEXT = NEXT_KEYS.map((k) => SF_PAGES.services.find((p) => p.key === k)!);

function AreaRow({ a }: { a: (typeof AREAS)[number] }) {
  const { rowProps } = usePlate();
  return (
    <div
      {...rowProps(a.k)}
      id={`area-${a.k}`}
      className="plate-row -mx-4 border-t border-oa-hairlineStrong px-4 py-6 last:border-b md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-8"
    >
      <dt>
        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-oa-ink3">{a.tag}</span>
        <span className="mt-1 block text-lg font-semibold text-oa-ink">{a.title}</span>
      </dt>
      <dd className="mt-2 max-w-[68ch] leading-relaxed text-oa-ink2 md:mt-0">
        {a.body}
        {a.link && (
          <>
            {" "}
            <Link to={a.link.to} className="oa-link whitespace-nowrap">
              {a.link.label} →
            </Link>
          </>
        )}
      </dd>
    </div>
  );
}

export default function SalesforceHealthCheck() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl("/services/salesforce-health-check"),
    ogTitle: "Free one-week Salesforce health check | OneAlgorithm",
    ogDescription:
      "One week inside your Salesforce org, then a written list of what to fix first. Free, and the list is yours. Call (610) 890-9711.",
    ogUrl: getCanonicalUrl("/services/salesforce-health-check"),
    ogImage: SHARE_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: AREAS_PLATE.alt,
    twitterTitle: "Free one-week Salesforce health check | OneAlgorithm",
    twitterDescription: "A free one-week Salesforce health check, ranked by what to fix first.",
    twitterImage: SHARE_IMAGE,
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Free one-week Salesforce health check",
          "A free one-week review of a Salesforce org covering licences and edition, data, automation including Workflow Rules and Process Builder still in use, permissions and integrations, delivered as a written list ranked by what to fix first.",
          "Salesforce org health check",
          PAGE_URL,
          { image: PREFERRED_IMAGE, offers: SF_HEALTH_CHECK_OFFER },
        )}
      />
      <StructuredData
        data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, {
          dateModified: UPDATED,
          primaryImage: { url: PREFERRED_IMAGE, width: 1600, height: 900 },
        })}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      {/* 1. Hero. Text-led (the LCP is the h1/lede); the panel is the
          AppExchange record, so no CTAProof under the pair. */}
      <PageHero
        title={
          <>
            Salesforce health check:{" "}
            <span className="text-oa-orange">a free one-week review of your org</span>
          </>
        }
        lede="One week in your Salesforce org, then a written list of what is costing you money, time or trust in your data, ranked by what to fix first. Free, and the list is yours."
        panel={{ title: "Salesforce's record of us", items: [], slot: <SalesforceRecordCard /> }}
        primary={{ label: "Book the free week", href: "#start", cta: "hero" }}
        secondary={{ label: `Call ${SF_PHONE.display}`, href: SF_PHONE.href, cta: "hero" }}
        meta={[
          { label: "Updated", value: "October 2026" },
          { label: "Figures read", value: SF_VERIFIED_LABEL },
        ]}
        siblings={false}
      />

      {/* 2. The answer, both meanings, in 51 words (HC-4). */}
      <AnswerBand
        question="What is a Salesforce health check?"
        answer="Salesforce Health Check is a free tool in Setup that scores your org's security settings against a baseline. A Salesforce org health check is the wider review: licences, data, automation, permissions and integrations, delivered as a written list of what to fix first. Ours is the second, free, over one week."
        leads={[
          {
            label: "Why it matters",
            body: "Workflow Rules and Process Builder lost Salesforce support at the end of 2025, and Optimizer, the app that scanned how an org was built, is retired.",
          },
          {
            label: "What we do",
            body: "We spend one week in your org with a read-only user you create, then walk you through a list ranked by what to fix first.",
          },
          {
            label: "What it costs",
            body: (
              <>
                Nothing for the week. Fixes are scoped in writing first;{" "}
                <Link className="oa-link" to="/services/salesforce-implementation-cost">
                  see what Salesforce work costs
                </Link>
                .
              </>
            ),
          },
        ]}
        toc={TOC}
      />

      {/* 3. Why now (the one mid-page night band). HC-F1 is the page's first
          figure: eager, static, no draw (HC-1). */}
      <Section tone="night" grid clip id="why-now">
        <SectionHeading
          tone="dark"
          title="Two Salesforce changes worth checking your org for"
          lede="Both landed between October 2025 and June 2026, and neither one raises an error in your org."
        />
        <div className="grid gap-x-16 lg:grid-cols-2">
          <DocNote
            tone="dark"
            said="Salesforce stopped supporting Workflow Rules and Process Builder on December 31, 2025."
            title="Salesforce Help 001096524: Workflow Rules and Process Builder end of support"
            url="https://help.salesforce.com/s/articleView?id=001096524&type=1"
            readOn="October 2026"
            meaning="Automation built with them still runs, but Salesforce no longer fixes it or helps when it breaks. The week lists every one still active in your org, with what moving it to Flow involves."
          />
          <div className="max-w-[64ch] lg:my-10">
            <h3 className="text-lg font-semibold text-oa-nightInk">Optimizer is retired</h3>
            <p className="mt-3 leading-relaxed text-oa-nightInk2">
              Salesforce retired Optimizer, the free app that scanned how an org was built, for Hyperforce
              orgs in the Winter '26 release and for all other orgs in Summer '26. Health Check in Setup
              reviews security settings. The week covers the rest: licences, data, automation, permissions
              and integrations, checked against how your team actually works.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Plate
            spec={TIMELINE_PLATE}
            fig={1}
            first
            tone="night"
            stamp={["TIMELINE · SALESFORCE RETIREMENTS", "SALESFORCE · OCT 2026"]}
            caption="Dates from Salesforce Help and Salesforce's Optimizer retirement notice. Release markers sit at the month each release reached production."
          />
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryCTA href="#start" cta="mid" tone="dark">
            Book the free week
          </PrimaryCTA>
          <SecondaryCTA href={SF_PHONE.href} cta="mid" tone="dark">
            Call {SF_PHONE.display}
          </SecondaryCTA>
        </div>
      </Section>

      {/* 4. Signs (HC-3): six rows, each tagged with the area that checks it.
          No statistics. */}
      <Section tone="paper" id="signs">
        <SectionHeading
          title="Signs your Salesforce org needs a health check"
          lede="Each one points to an area the week checks. Follow the tag to see what we look at."
        />
        <ul className="mt-10 grid border-b border-oa-hairlineStrong sm:grid-cols-2 sm:gap-x-10 xl:grid-cols-3">
          {SIGNS.map((s) => (
            <li key={s.text} className="flex flex-col justify-between gap-3 border-t border-oa-hairlineStrong py-5">
              <p className="max-w-[46ch] text-lg text-oa-ink">{s.text}</p>
              <a
                href={`#area-${s.area}`}
                className="oa-link inline-flex min-h-11 w-fit items-center font-mono text-[12px] uppercase tracking-[0.14em]"
              >
                {AREA_TAG[s.area]} →
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Five areas (HC-1, HC-5, HC-7): HC-F2 pinned on the left at lg,
          area rows wired to its lines on the right. */}
      <Section tone="surface" bordered clip id="areas">
        <SectionHeading
          title="Salesforce optimization: what the week checks"
          lede="The same five areas every time, checked against how your team actually works, so nothing depends on what we happen to notice."
        />
        <PlateScope>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <Plate
                  spec={AREAS_PLATE}
                  fig={2}
                  stamp={["DIAGRAM · WHAT THE WEEK COVERS", "ONEALGORITHM"]}
                  caption="Five areas feed one written list, ranked by what to fix first."
                />
              </div>
            </div>
            <dl className="lg:col-span-7">
              {AREAS.map((a) => (
                <AreaRow key={a.k} a={a} />
              ))}
            </dl>
          </div>
        </PlateScope>
      </Section>

      {/* 6. The Desk, mid-page where the offer is described (HC-12). */}
      <Desk
        heading="Book the free one-week Salesforce health check"
        body="Tell us the symptom. We spend one week in your org with a read-only user you create, then walk you through a written list ranked by what to fix first. Free, and the list is yours."
        form={{
          topic: "hc",
          topicLabel: "Salesforce health check",
          heading: "Book the free week",
          prompt: "What is the symptom?",
          submitLabel: "Request the free health check",
        }}
      />

      {/* 7. Process rail ending in the Desk CTA. */}
      <Section tone="paper" clip id="process">
        <SectionHeading title="From first call to a list you can act on" />
        <div className="mt-12">
          <ProcessSteps rail terminal={{ label: "Book the free week" }} steps={STEPS} />
        </div>
      </Section>

      {/* 8. Tool vs review (HC-1). Our column is highlighted and carries the
          table's one CTA row. HC-F3 (Setup screenshot) goes above this table
          once a demo-org capture exists (owner-gated). */}
      <Section tone="surface" bordered id="compare">
        <SectionHeading
          title="Salesforce's Health Check tool, or our free one-week health check?"
          lede="Run Salesforce's own check first: it is free and takes minutes. The week goes further, across five areas, checked against how your team works."
        />
        <div className="mt-10">
          <DataTable
            label="Salesforce Health Check tool compared with OneAlgorithm's free one-week health check"
            ground="surface"
            head={["", "Health Check tool (Setup)", "Free one-week health check"]}
            rows={COMPARE}
            own={2}
            nextStep={{ label: "Book the free week" }}
            source="Health Check details: Salesforce Help and Trailhead, checked October 2026."
          />
        </div>
      </Section>

      {/* 10. Delivery behind the review (HC-10), with the practice lead
          beside it (HC-11, allowed wording only). */}
      <Section tone="paper" id="delivered">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <DeliveredLedger title="Salesforce work behind the review" lead="lending" />
          </div>
          <aside className="border-t border-oa-hairlineStrong pt-6 lg:col-span-4 lg:mt-2 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h3 className="text-lg font-semibold text-oa-ink">Who leads the work</h3>
            <PeopleStrip />
            <p className="mt-4 max-w-[60ch] leading-relaxed text-oa-ink2">
              You work directly with the certified people doing the review.
            </p>
          </aside>
        </div>
      </Section>


      {/* 12. Objections, before the FAQ. None repeats a FAQ question. */}
      <Section tone="surface" bordered id="objections">
        <Objections items={[SF_OBJECTIONS.pitch, SF_OBJECTIONS.city, SF_OBJECTIONS.cost]} />
      </Section>

      {/* 13. FAQ (HC-9, HC-14): the same array feeds FAQPage. */}
      <Section tone="paper" id="faq">
        <SectionHeading title="Salesforce health check questions" />
        <FAQList faqs={FAQS} sources={SOURCES} />
      </Section>

      {/* 14. Where the list can lead (HC-5): Integration added; Marketing
          Cloud left off until the owner confirms coverage. */}
      <Section tone="surface" bordered id="next">
        <SectionHeading title="Where the list can lead" lede="Act on the list with us, one area at a time." />
        <CardGrid columns={2} className="mt-10 xl:grid-cols-3">
          {NEXT.map((p) => (
            <Card key={p.key} wire to={p.to} icon={NEXT_ICONS[p.key]} title={p.title} body={p.body} />
          ))}
          <Card
            wire
            to="/services/salesforce"
            icon={Layers}
            title="Salesforce implementation services"
            body="Every Salesforce service we deliver, from the licence count before you buy to the work after go-live."
          />
        </CardGrid>
      </Section>

      {/* 15. The page ends on the phone (the Desk is mid-page). */}
      <PhoneBand />
    </Layout>
  );
}
