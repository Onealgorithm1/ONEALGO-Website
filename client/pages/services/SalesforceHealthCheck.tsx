import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeliveredLedger, PersonCredentials,
  FAQ, DeskCTA, ServiceCards, HUB_SERVICE_CARDS, StageRail, StageUnits, SourcesDialog, Verify,
  type SfFaqItem, type ServiceCard, type Stage, type SfSource,
} from "../../components/sf";
import { HealthCheck, FlowMigration } from "../../components/sf/illus";
import { SF_LISTING_ID, SF_PHONE } from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, SF_HEALTH_CHECK_OFFER, createLocalBusinessSchema, createServiceSchema, createWebPageSchema,
} from "../../components/StructuredData";

/* /services/salesforce-health-check: the free one-week org review every Salesforce CTA points to.
 * Rebuilt 2026-10-23 on the redesign-v2 kit (client/components/sf, build-v2/foundation.md) in the design Louis
 * approved ("Yes, build the 23 pages this way"). Title, meta, H1, the H2 strings and their answer sentences:
 * seo-completeness/structure-spec.md §6.2 (exact). Section order follows the prototype's rhythm (spec §0: heading
 * order is not a ranking factor). Build notes: onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/build-v2/page-health-check.md.
 *
 * FIGURES: FIG. 1 HealthCheck (hero, the ranked list the week produces), FIG. 2 FlowMigration beside the five
 * areas (the automation finding, illustrations.md), FIG. 3 the four-step rail. Sample data only; never an org.
 *
 * FACTS (all on this page at ef1a8f0, or owner-decisions.md / verify-fix-log-2026-10-23.md):
 *  - Workflow Rules and Process Builder end of support 2025-12-31 (Salesforce Help 001096524). Optimizer retired for
 *    Hyperforce orgs in Winter '26 and for all other orgs in Summer '26 (Salesforce's notice, Trailblazer Community).
 *  - Health Check: 0-100 against Salesforce's baseline or an imported one; risk groups High-Risk to Informational;
 *    more restrictive settings typically raise it; Fix Risks may affect an integration (Trailhead). Four levels of
 *    data access (Trailhead "Data Security"). Three releases a year (salesforce.com/releases). Org Check is a free
 *    Salesforce Labs app.
 *  ⛔ Score grade bands are NOT stated (sources disagree). ⛔ OWNER-GATED (decision 8): the list's columns, whether
 *  the score and effort estimates are reported, what the week excludes; the list stays "ranked by what to fix
 *  first" (FV-11: no "what moving it to Flow involves"). ⛔ Marketing Cloud stays off the next-step cards
 *  (decision 12). ⛔ No reply time, price, SLA, review, client name or years figure.
 *  Travel wording: owner 2026-10-23 19:05 (most work remote; in person when a project calls for it, easiest
 *  across the Philadelphia region). Terms wording: owner 19:05 #5 (scoped after the free health check, terms in
 *  the written proposal).
 *
 * LINKS: in-site only in the body; sources live in the one SourcesDialog (#ev-sources), proof in the AppExchange and
 * Trailblazer dialogs (Readouts / PersonCredentials). Plan links (PM:239): hub, MS, INT, DM, COST, all in #fix. */

const PAGE_PATH = "/services/salesforce-health-check";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-10-23";
const TITLE = "Free One-Week Salesforce Health Check | One Algorithm";
const DESCRIPTION =
  "Free one-week Salesforce health check: licenses, data, automation, permissions and integrations, ranked by what to fix first. Call (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og/og-health-check.jpg";
const OG_ALT =
  "Illustration with sample data: a week-one health check report for a fictional company, five findings ranked by what to fix first, each with its fix and a severity.";
const COST = "/services/salesforce-implementation-cost";
const READ = "read October 2026";

/* The five areas, in the order the signs and the figure use. `id` is the anchor the signs link to. */
type AreaKey = "lic" | "data" | "auto" | "perm" | "int";
const AREAS: { k: AreaKey; n: string; title: string; tag: string; line: string; deep: React.ReactNode }[] = [
  {
    k: "lic", n: "01", tag: "Licenses", title: "Licenses and edition",
    line: "What you pay for, checked against what your team actually uses.",
    deep: (
      <>
        <p className="sf-rule">Inactive users still holding licenses, add-ons nobody opened, and an edition chosen before the team knew what it needed.</p>
        <div className="sf-links"><Link className="sf-link" to={COST}>What Salesforce costs, before licenses</Link></div>
      </>
    ),
  },
  {
    k: "data", n: "02", tag: "Data", title: "Data quality",
    line: "Whether people trust the numbers enough to stop rebuilding reports in a spreadsheet.",
    deep: (
      <>
        <p className="sf-rule">Duplicates, required fields filled with junk to get past validation, and the reports people rebuild because they do not trust them. Duplicate records also carry straight into what an Agentforce agent says and does.</p>
        <div className="sf-links"><Link className="sf-link" to="/services/salesforce-data-migration">When data needs moving or cleaning</Link></div>
      </>
    ),
  },
  {
    k: "auto", n: "03", tag: "Automation", title: "Automation and Flow",
    line: "Manual steps Flow should own, and every Workflow Rule and Process Builder process still active.",
    deep: (
      <p className="sf-rule">Each Workflow Rule and Process Builder process is listed for its move to Flow. The week also names what fires on your busiest objects, where Workflow Rules, Process Builder processes and Flows all fire on one save.</p>
    ),
  },
  {
    k: "perm", n: "04", tag: "Permissions", title: "Permissions and sharing",
    line: "Who can see and export what, from organization-wide defaults down to each field.",
    deep: (
      <p className="sf-rule">Organization-wide defaults, sharing rules, the role hierarchy, field-level security, and profiles doing a permission set's job. Salesforce controls data access at four levels: organization, objects, fields and records. The check covers all four.</p>
    ),
  },
  {
    k: "int", n: "05", tag: "Integrations", title: "Integrations",
    line: "What syncs, and what fails without telling anyone.",
    deep: (
      <>
        <p className="sf-rule">Which integration users, connected apps and named credentials hold more access than the job needs, and every sync that fails without an alert.</p>
        <div className="sf-links"><Link className="sf-link" to="/services/salesforce-integration">When two systems disagree</Link></div>
      </>
    ),
  },
];
const AREA_BY_KEY = Object.fromEntries(AREAS.map((a) => [a.k, a])) as Record<AreaKey, (typeof AREAS)[number]>;

/* Spec §6.2 row 3: six signs, each mapped to the area that checks it. No statistics. */
const SIGNS: { text: string; area: AreaKey }[] = [
  { text: "A license renewal is coming and nobody can say which licenses are in use.", area: "lic" },
  { text: "People rebuild Salesforce reports in a spreadsheet because they do not trust the numbers.", area: "data" },
  { text: "Workflow Rules or Process Builder processes are still running your automation.", area: "auto" },
  { text: "The person who built your automation has left, and nobody dares touch it.", area: "auto" },
  { text: "Nobody is sure who can see or export your customer records.", area: "perm" },
  { text: "A sync fails and nobody hears about it until a customer does.", area: "int" },
];

/* Spec §6.2 row 2: the comparison IS the answer, so it stays visible. */
const COMPARE: { k: string; tool: string; week: string }[] = [
  { k: "What it looks at", tool: "Security settings, against a baseline", week: "Licenses, data, automation, permissions and integrations" },
  { k: "Who runs it", tool: "Your admin, from Setup", week: "Us, inside your org" },
  { k: "How long", tool: "Minutes", week: "One week, then a walkthrough call" },
  { k: "What you get", tool: "A score from 0 to 100, with each setting marked by risk", week: "A written list ranked by what to fix first" },
  { k: "What it costs", tool: "Included in Salesforce", week: "Free" },
];

/* Spec §6.2 row 5: the four steps (rail stations + stage units; `line` <= 25 words, details -> Go deeper). */
const STEPS: Stage[] = [
  { k: "s1", num: "01", title: "Tell us the symptom", sub: "a call or the form",
    line: "Reports nobody trusts, a renewal you are unsure about, automation nobody dares touch: a call or the form is enough to start.",
    details: [`Call ${SF_PHONE.display} or send the form on this page`, "A person at OneAlgorithm reads it and replies", "If it fits, the week starts with a read-only user you create"] },
  { k: "s2", num: "02", title: "A week in your org", sub: "read-only user · five areas",
    line: "You create a user that can read your setup and records; we work through the five areas against how your team actually uses Salesforce.",
    details: ["Usually the View Setup and Configuration permission", "The review reads and changes nothing", "Licenses, data, automation, permissions and integrations", "You deactivate the user when the week ends"] },
  { k: "s3", num: "03", title: "A written, ranked list", sub: "what to fix first · walkthrough",
    line: "Every finding written down with why it matters, in the order to fix it, then walked through with you on a call.",
    details: ["What we found and why it matters", "Ordered by what to fix first", "Walked through with you on a call", "The list is yours to keep"] },
  { k: "s4", num: "04", title: "You decide what happens next", sub: "with us, your admin, or neither",
    line: "Act on it with us, with your own admin, or not at all; if the org is basically fine, we say so.",
    details: ["Fixes are scoped in writing first", "Weekly administration and development, data migration and integrations, if you want us", "Or hand the list to your own admin"] },
];

/* Spec §6.2 row 7: six next steps, the hub's own cards (exact service names, verified bodies) + the hub itself
   (ILK-02 anchor "Salesforce consulting…"). Marketing Cloud stays off (decision 12). Text cards, no scene details:
   no hub scene exists (a scene-less card misaligns its row), and the 680x340 scenes outgrow the lead card's 4.6
   window (the kit sizes that window for the 1320x300 health-check scene the hub uses). */
const hubCard = (to: string) => ({ ...HUB_SERVICE_CARDS.find((c) => c.to === to)!, scene: undefined });
const NEXT_CARDS: ServiceCard[] = [
  { ...hubCard("/services/salesforce-managed-services"), kicker: "Weekly fixes", cta: "See managed services" },
  { ...hubCard("/services/salesforce-data-migration"), cta: "See data migration" },
  { ...hubCard("/services/salesforce-integration"), cta: "See integration" },
  { ...hubCard("/services/staff-augmentation"), cta: "See staff augmentation" },
  hubCard(COST),
  { to: "/services/salesforce", title: "Salesforce consulting and implementation services", body: "Every Salesforce service we deliver, from the license count before you buy to the work after go-live.", cta: "See every service" },
];

/* Objection questions (H3), answers in Go deeper. None repeats a FAQ question. */
const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "Will the free week turn into a sales pitch?", a: <>The list is yours. If the org is basically fine, we say so, and you can hand the list to your own admin.</> },
  { q: "Will we get senior people, or whoever is free?", a: <>The person who scopes your org stays on it through delivery, and you deal with the people doing the work directly. Sreenivas Amirisetti leads the practice; his credentials are under <a className="sf-link" href="#review">who reviews your org</a>.</> },
  { q: "What does it cost after the free week?", a: <>Every engagement is scoped after the free health check, and the terms are set in a written proposal. <Link className="sf-link" to={COST}>What Salesforce work costs</Link></> },
  { q: "You are not in our city.", a: <>The health check runs remotely, through the read-only user you create. Most of our work is remote, from our office in Malvern, PA; in-person sessions happen when a project calls for them, easiest across the Philadelphia region.</> },
];

/* FAQ: the health-check question bank (questions/questions-by-page.md), highest signal first. One owner page per
   question across the 23 pages. Dropped as FAQs because they became H2s (spec §3, HDG-08): "How do I know if I need
   one?" (Signs), "Can you fix what it finds?" (Fixing), "What is the Salesforce Health Check?" (the two answer H2s).
   The array renders AND feeds FAQPage schema. */
const FAQS: SfFaqItem[] = [
  {
    q: "How do I run Salesforce Health Check?",
    a: "In Setup, type Health Check in the Quick Find box and open it. You need the View Setup and Configuration permission. Settings that miss the baseline can be changed one at a time, and many can be moved to the baseline at once with Fix Risks. Salesforce warns that changing everything at once can affect something like an integration, so check what each change touches first.",
  },
  {
    q: "What does a Salesforce org health assessment include?",
    a: "Ours covers five areas: licenses and edition, data, automation, permissions and integrations. You get a written list of what we found and why it matters, ranked by what to fix first.",
    link: { to: "#areas", label: "What the week checks" },
  },
  {
    q: "What are the four levels of security in Salesforce?",
    a: "Organization, objects, fields and records. Organization settings control who can log in and how; object and field permissions control what each user can see and edit; record access comes from organization-wide defaults, the role hierarchy and sharing rules. The week's Permissions area checks all four.",
    link: { to: "#area-perm", label: "What the week checks in permissions" },
  },
  {
    q: "How is the Salesforce Health Check score calculated?",
    a: "Salesforce scores your security settings from 0 to 100 by how closely they match the baseline you measure against: its own standard, or one you import. Settings are grouped by risk, from High-Risk to Informational, and moving a setting to the more restrictive value typically raises the score. The score is a starting point; the week explains which gaps matter for how your team works.",
  },
  {
    q: "What is a good Salesforce Health Check score?",
    a: "The closer to 100, the closer your security settings are to the baseline you measure against, Salesforce's standard or one you import. Work through the settings marked High-Risk first, and check what each change touches before you make it: Salesforce warns that moving many settings at once can affect something like an integration.",
  },
  {
    q: "Is our Salesforce org ready for Agentforce?",
    a: "Agentforce works from your Salesforce records and acts with the access you give it, so duplicate records and loose permissions carry straight into what an agent says and does. The week's Data and Permissions areas show both before you switch an agent on.",
  },
  {
    q: "What free tools check Salesforce org health?",
    a: "Health Check in Setup, for security settings. Org Check, a free Salesforce Labs app on AppExchange, for how the org is built. Salesforce Code Analyzer, for Apex and other code. Optimizer used to cover part of this and is now retired. None of them weighs what it finds against how your team uses Salesforce; that is what the week adds.",
  },
  {
    q: "Salesforce Health Check or Optimizer: which should I use?",
    a: "Health Check, because Optimizer is gone. Health Check reviews security settings and is still in Setup. Optimizer reviewed how the org was built; Salesforce retired it for Hyperforce orgs in the Winter '26 release and for all other orgs in Summer '26.",
  },
  {
    q: "How much does a Salesforce health check cost?",
    a: "Ours costs nothing. The week is free because it shows you how we work, on your own org, before you spend anything, and the written list is yours whether or not you work with us afterwards.",
    link: { to: COST, label: "What Salesforce work costs" },
  },
  {
    q: "Is a Salesforce health check worth it?",
    a: "Yes, when one of the signs on this page applies: reports rebuilt in spreadsheets, a renewal with no clear view of license use, Workflow Rules or Process Builder still active, automation nobody dares touch, sync errors nobody sees, or doubt about who can export records. Ours costs nothing, and the written list is yours either way.",
    link: { to: "#signs", label: "Signs your Salesforce org needs a health check" },
  },
  {
    q: "Why is our Salesforce so slow?",
    a: "Two things the week checks slow a save down: automation stacked on the same object, where Workflow Rules, Process Builder processes and Flows all fire on one save, and integrations writing into the same records. The list names what fires on your busiest objects and what to consolidate.",
    link: { to: "#area-auto", label: "What the week checks in automation" },
  },
  {
    q: "How long does a Salesforce org health check take?",
    a: "Ours takes one week, followed by a call to walk you through the list. Salesforce's built-in Health Check takes minutes, because it reads security settings only.",
  },
  {
    q: "How often should you run a Salesforce health check?",
    a: "Run Salesforce's Health Check after each of its three releases a year, in February, June and October, and whenever security settings change. Book the free one-week health check before a license renewal, when your admin changes, or before new build work starts.",
  },
  {
    q: "Will the health check disrupt our org?",
    a: "No. You create a user that can view your setup and read your records, usually with the View Setup and Configuration permission. The review reads and changes nothing, and you deactivate the user when the week ends.",
  },
];

/* The one sources pop-up: human-readable pages only (no API or data URL), read dates as text. */
const SOURCES: SfSource[] = [
  { name: "Salesforce Help: Health Check", what: "The Setup tool, its 0 to 100 score, baselines and Fix Risks", read: READ, page: "https://help.salesforce.com/s/articleView?id=sf.security_health_check.htm&type=5" },
  { name: "Trailhead: Use Health Check to Scan Your Security Configurations", what: "How to run it, the risk groups, and the warning on changing settings at once", read: READ, page: "https://trailhead.salesforce.com/content/learn/modules/security_basics/security_basics_healthcheck" },
  { name: "Salesforce Help 001096524: Workflow Rules and Process Builder end of support", what: "Support ended on December 31, 2025", read: READ, page: "https://help.salesforce.com/s/articleView?id=001096524&type=1" },
  { name: "Salesforce's Optimizer retirement notice, Trailblazer Community", what: "Retired for Hyperforce orgs in Winter '26 and for all other orgs in Summer '26", read: READ, page: "https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000mlut50AA" },
  { name: "Trailhead: Data Security", what: "The four levels of data access: organization, objects, fields and records", read: READ, page: "https://trailhead.salesforce.com/content/learn/modules/data_security/data_security_overview" },
  { name: "Salesforce release schedule", what: "Three releases a year: Spring in February, Summer in June, Winter in October", read: READ, page: "https://www.salesforce.com/releases/" },
];

/* ponytail: the comparison table is styled here with Tailwind's sf.* mirrors because the kit has no visible-table
   class yet (only tables inside Go deeper / dialogs). Upgrade path: a `.sf-table` rule in sf.css, requested in
   build-v2/requests-health-check.md, then drop these classes. */
function CompareTable() {
  const cell = "border-t border-sf-hairline px-3 py-3 align-top sm:px-4";
  return (
    <table className="w-full border-collapse text-left text-[15px] leading-snug sm:text-base">
      <caption className="sr-only">Salesforce's Health Check tool compared with OneAlgorithm's free one-week health check</caption>
      <thead>
        <tr>
          <th scope="col" className="w-[26%] pb-3 pr-3"><span className="sr-only">Compared on</span></th>
          <th scope="col" className="px-3 pb-3 align-bottom font-semibold text-sf-ink sm:px-4">Health Check tool (Setup)</th>
          <th scope="col" className="border-t-2 border-sf-navy bg-sf-tint px-3 pb-3 pt-3 align-bottom font-semibold text-sf-navy sm:px-4">Free one-week health check</th>
        </tr>
      </thead>
      <tbody>
        {COMPARE.map((r) => (
          <tr key={r.k}>
            <th scope="row" className="border-t border-sf-hairline py-3 pr-3 align-top font-mono text-[12px] font-medium uppercase leading-snug tracking-[0.08em] text-sf-ink3">{r.k}</th>
            <td className={cell}>{r.tool}</td>
            <td className={`${cell} bg-sf-tint font-medium text-sf-ink`}>{r.week}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function SalesforceHealthCheck() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: "Free one-week Salesforce health check | One Algorithm",
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: "Free one-week Salesforce health check | One Algorithm",
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Free one-week Salesforce health check",
          "A free one-week review of a Salesforce org covering licenses and edition, data quality, automation including Workflow Rules and Process Builder still in use, permissions and sharing, and integrations, delivered as a written list ranked by what to fix first.",
          "Salesforce org health check",
          PAGE_URL,
          { image: OG_IMAGE, offers: SF_HEALTH_CHECK_OFFER },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce", to: "/services/salesforce" }, { label: "Health check" }]}>
        {/* 1 HERO. H1 = the LCP; FIG. 1 (the ranked list the week produces) is dealt by CSS 250ms after first paint. */}
        <SFHero
          kicker="Free · one week · read-only access"
          title={<>Salesforce health check: a free <span style={{ whiteSpace: "nowrap" }}>one-week</span> org review</>}
          lede="The free one-week health check reviews your Salesforce org's licenses, data, automation, permissions and integrations, then ranks every finding by what to fix first."
          primary={{ href: "#start", label: "Book the free health check" }}
          proof
          figure={<HealthCheck fig={1} hero className="sf-hero-fig" />}
        />

        {/* 2 THE ANSWER (spec §6.2 row 1) beside what the week produces (row 6, GATED: no columns, score or effort). */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="What is a Salesforce health check?"
            lede="A Salesforce health check is a review of an org's licenses, data, automation, permissions and integrations; ours is free and takes one week."
            leadIn="Yes, but:"
            lead="Salesforce's built-in Health Check tool scores security settings only; it does not look at your data, automation, licenses or integrations."
            points={[
              "One week inside your org, through a read-only user you create",
              "Five areas, checked against how your team actually uses Salesforce",
              "A written list ranked by what to fix first, yours to keep",
            ]}
          >
            <GoDeeper label="the two meanings and what the week costs">
              <p className="sf-rule">"Salesforce health check" means two things. Health Check is a free tool in Setup that scores your org's security settings against a baseline. A Salesforce org health check is the wider review: licenses, data, automation, permissions and integrations, delivered as a written list of what to fix first. Ours is the second, free, over one week.</p>
              <p><span className="sf-lead-in">What it costs:</span> Nothing for the week. Fixes are scoped in writing first.</p>
              <div className="sf-links">
                <a className="sf-link" href="#compare">The Health Check tool or the full review</a>
                <Link className="sf-link" to={COST}>What Salesforce work costs</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c5"
            delay={0.08}
            headingId="h-list"
            title="What the written health check list includes"
            lede="What we found and why it matters, ranked by what to fix first, then walked through with you on a call."
            leadIn="What you get:"
            lead="The list is yours whether or not you work with us afterwards, and if the org is basically fine, we say so."
            measure={false}
          >
            <GoDeeper label="what happens after the list">
              <p className="sf-rule">Act on it with us, with your own admin, or not at all. Fixes are scoped in writing first.</p>
              <div className="sf-links"><a className="sf-link" href="#how">How the free Salesforce health check runs</a></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 3 THE SIGNS, the night band (row 3): six rows, each pointing at the area that checks it. */}
        <SmartSection
          id="signs"
          tone="night"
          grid
          heading={{
            id: "h-signs",
            title: "Signs your Salesforce org needs a health check",
            lede: "Each sign below points to one of the five areas the week checks, and any one of them is worth a week.",
          }}
        >
          {SIGNS.map((s, i) => {
            const a = AREA_BY_KEY[s.area];
            return (
              <LedgerRule key={s.text} className="sf-c4" delay={(i % 3) * 0.08}>
                <p className="sf-kicker">Area {a.n} · {a.tag}</p>
                <p className="sf-h4" style={{ marginTop: 10, fontSize: 20, lineHeight: 1.4 }}>{s.text}</p>
                <div className="sf-links" style={{ marginTop: 6 }}>
                  <a className="sf-link" href={`#area-${s.area}`}>How the week checks {a.tag.toLowerCase()}</a>
                </div>
              </LedgerRule>
            );
          })}
        </SmartSection>

        {/* 4 TOOL OR REVIEW (row 2): the answer on 5 columns, the table on 7 (alternating sides). */}
        <SmartSection id="compare" grid labelledBy="h-compare">
          <SmartUnit
            className="sf-c5"
            headingId="h-compare"
            title="Salesforce Security Health Check or a full review?"
            lede="The built-in Security Health Check scores security settings only; our week also covers licenses, data, automation and integrations."
            leadIn="The bottom line:"
            lead="Run Salesforce's own check first, because it is free and takes minutes; the week covers what it cannot see."
            measure={false}
          >
            <p className="sf-mono" style={{ marginTop: 20, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Health Check details: Salesforce Help and Trailhead, {READ} · <Verify id="sources">Where these facts come from</Verify>
            </p>
          </SmartUnit>
          <div className="sf-c7">
            <CompareTable />
          </div>
        </SmartSection>

        {/* 5 THE FIVE AREAS (row 4): five H3 units + the two recent changes, FIG. 2 (the automation finding) beside them. */}
        <SmartSection
          id="areas"
          tone="surface"
          grid
          heading={{
            id: "h-areas",
            title: "Salesforce optimization: what the week checks",
            lede: "The week checks five areas and ranks every finding by what to fix first.",
          }}
        >
          <div className="sf-c7 grid grid-cols-1 gap-x-6 gap-y-10 xl:grid-cols-2">
            {AREAS.map((a, i) => (
              <SmartUnit
                key={a.k}
                id={`area-${a.k}`}
                level={3}
                className="scroll-mt-28"
                delay={(i % 2) * 0.08}
                kicker={`Area ${a.n}`}
                title={a.title}
                lede={a.line}
                measure={false}
              >
                <GoDeeper label={`what the ${a.tag.toLowerCase()} check covers`}>{a.deep}</GoDeeper>
              </SmartUnit>
            ))}
            <SmartUnit
              id="changes"
              level={3}
              className="scroll-mt-28"
              delay={0.08}
              kicker="Since December 2025"
              title="Two recent Salesforce changes to check"
              lede="Salesforce ended support for Workflow Rules and Process Builder on December 31, 2025, and has retired Optimizer."
              lead="Neither change raises an error in your org, so the week lists every Workflow Rule and Process Builder process still active."
              measure={false}
            >
              <GoDeeper label="the two Salesforce changes in detail">
                <p className="sf-rule">Automation built with Workflow Rules and Process Builder still runs, but Salesforce no longer fixes it or helps when it breaks; every one still active is listed for its move to Flow.</p>
                <p>Optimizer, the free app that scanned how an org was built, was retired for Hyperforce orgs in the Winter '26 release and for all other orgs in Summer '26. Health Check in Setup still reviews security settings; the week covers the rest.</p>
                <div className="sf-links"><Verify id="sources">Where these facts come from</Verify></div>
              </GoDeeper>
            </SmartUnit>
          </div>
          <FlowMigration fig={2} className="sf-c5 self-start lg:sticky lg:top-28" />
        </SmartSection>

        {/* 6 HOW IT RUNS (row 5): FIG. 3, the four-step rail (scroll-scrubbed), and the four stage units wired to it. */}
        <SmartSection
          id="how"
          heading={{
            id: "h-how",
            title: "How the free Salesforce health check runs",
            lede: "Four steps take you from the first call to a written list you can act on, with the week itself as step two.",
          }}
        >
          <StageRail
            fig={3}
            stations={STEPS}
            className="sf-rail-top"
            title="Diagram of the four steps of the free one-week Salesforce health check"
            desc="A rail runs through four stations: tell us the symptom, a week in your org, a written ranked list, and you decide what happens next."
            stamp="How the free week runs"
            caption="The four steps, in order. Step 02 is the week itself: a read-only user, five areas, nothing changed in your org."
          />
          <StageUnits items={STEPS} />
        </SmartSection>

        {/* 7 WHO REVIEWS YOUR ORG (row 8): the record readouts (count up once, below the fold), delivered work, the lead. */}
        <SmartSection
          id="review"
          tone="surface"
          heading={{
            id: "h-review",
            title: "Who reviews your Salesforce org",
            lede: "The week is run by our Salesforce practice, led by Sreenivas Amirisetti; Salesforce's AppExchange record lists 16 certified people and 53 certifications.",
          }}
        >
          <Readouts />
          <div className="sf-grid" style={{ marginTop: 56 }}>
            {/* DOM order = visual order (no inline grid placement: an inline gridColumn beats the kit's <=1023 stack rule). */}
            <SmartUnit
              level={3}
              className="sf-c7"
              title="Salesforce work we have delivered"
              lede="We have delivered Salesforce development, an SAP-to-Salesforce sync, QuickBase and Kissflow migrations, and Marketing Cloud support."
            >
              <DeliveredLedger />
              <GoDeeper label="how to check us before you book">
                <p className="sf-rule">Open Salesforce's AppExchange listing {SF_LISTING_ID} and read its stat box: certified people, certifications and the competencies they sit under. Then look up the people who will do the work on their Trailblazer profiles. The Verify buttons on this page show what we read and when.</p>
                <div className="sf-links"><Link className="sf-link" to="/services/salesforce-consulting-partner-pennsylvania">How to check any Salesforce partner</Link></div>
              </GoDeeper>
            </SmartUnit>
            <LedgerRule as="aside" className="sf-c5 sf-lead-block" delay={0.08} aria-labelledby="h-lead">
              <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
              <PersonCredentials />
            </LedgerRule>
          </div>
        </SmartSection>

        {/* 8 FIXING WHAT IT FINDS (row 7): the route board. */}
        <SmartSection
          id="fix"
          heading={{
            id: "h-fix",
            title: "Fixing what the health check finds",
            lede: "We can fix what the list finds, or you can hand it to your own admin; the list is yours either way.",
          }}
        >
          <ServiceCards items={NEXT_CARDS} />
        </SmartSection>

        {/* 9 CONCERNS (row 10): objection questions as H3, answers in Go deeper. */}
        <SmartSection
          id="concerns"
          tone="surface"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before a Salesforce health check",
            lede: "Four questions buyers raise before booking the week, each with the direct answer.",
          }}
        >
          {CONCERNS.map((c, i) => (
            <LedgerRule as="article" key={c.q} className="sf-c6" delay={i % 2 ? 0.08 : 0}>
              <h3 className="sf-h3">{c.q}</h3>
              <GoDeeper label={c.q} title="The answer">
                <p className="sf-rule">{c.a}</p>
              </GoDeeper>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* 10 DESK: the one form, #start (row 9). No "what the health check covers" link on the page itself. */}
        <DeskCTA
          heading="Book the free one-week Salesforce health check"
          lede="Tell us the symptom; we spend one week in your org with a read-only user you create, then walk you through the ranked list."
          hcLink={false}
          form={{ topic: "hc", topicLabel: "Salesforce health check", heading: "Book the free week", prompt: "What is the symptom?", submitLabel: "Request the free health check" }}
        />

        {/* 11 FAQ (row 11): questions visible, answers in the HTML behind native disclosures; sources in the pop-up. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Salesforce health check questions</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
            <p className="sf-mono" style={{ marginTop: 12, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Salesforce facts {READ} · <Verify id="sources">Where these facts come from</Verify>
            </p>
            {/* ponytail: overflow-wrap is inherited through the DOM (the top layer does not break inheritance), so this
                wrapper lets the long Salesforce Help / Trailhead addresses wrap inside the pop-up instead of widening it
                past its frame. Upgrade path: `.sf-ev-sources .sf-mono { overflow-wrap: anywhere }` in sf.css (requested). */}
            <div style={{ overflowWrap: "anywhere" }}>
              <SourcesDialog
                id="sources"
                title="Where these facts come from"
                intro="Every Salesforce fact on this page comes from Salesforce's own help, training or release pages, read by a person at OneAlgorithm on the date shown."
                sources={SOURCES}
              />
            </div>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>
      </SfPage>
    </Layout>
  );
}
