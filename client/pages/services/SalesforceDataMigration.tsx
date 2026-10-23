import { Link } from "react-router-dom";
import { Blocks, Database, GitMerge, Sheet } from "lucide-react";
import Layout from "../../components/Layout";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  ProcessSteps,
  CheckList,
} from "../../components/site";
import {
  AnswerBand,
  CTAProof,
  DataTable,
  DeliveredLedger,
  Desk,
  DocNote,
  FAQList,
  HcLink,
  MidStrip,
  Objections,
  PeopleStrip,
  Plate,
  PlateScope,
  RouteBoard,
  SF_OBJECTIONS,
  WiredRow,
  type SfFaq,
} from "../../components/salesforce";
import { RecordLine } from "../../components/SalesforceRecordCard";
import { PLATES } from "../../data/plates/data-migration";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createWebPageSchema,
  createFAQSchema,
} from "../../components/StructuredData";

/* Salesforce data migration — rebuilt 2026-10-23 on the Salesforce plate
 * system (onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/design-spec.md
 * §3 DM and §5 DM, plus the wide-layout and voice addenda).
 *
 * ⛔ PROOF IS PATTERNS, NEVER A NAMED CUSTOMER. Delivery claims on this page
 * are limited to the allowed-proof list: QuickBase and Kissflow migrations to
 * Salesforce, an SAP-to-Salesforce sync, ongoing weekly development for a
 * lending company since April 2026, about 18 months of Marketing Cloud support
 * (the last two only through DeliveredLedger). Never name a client; no job
 * details, phases, volumes or figures from any engagement.
 *   Sources: salesforce-delivery-evidence-2026-09-01.md (invoiced "QuickBase
 *   Migration" and "Kissflow Migration to SFDC"), deepak-fundmate-automation-
 *   2026-09-22.md (the lending company).
 * ⛔ HubSpot, Zoho, Dynamics, spreadsheets and org-to-org are METHOD only. We
 * describe how we would do them, never that we have.
 * ⛔ No timelines, prices, record-count promises, success rates or SLAs (owner
 * decision #10 is open). Duration and cost FAQs answer with the drivers only.
 * ⛔ Security answer uses page facts only: no encryption, SOC 2, ISO or
 * "zero downtime" language.
 * ⛔ MuleSoft: not named here at all (owner decision #6: add nothing).
 * Gated, renders nothing until supplied: DM-F4 demo-org specimen (no capture
 * exists), a typical duration or price, a
 * redacted reconciliation artifact, reviews.
 * Voice (addendum, Louis 2026-10-23): no visible "we have no case studies /
 * reviews" lines. Honesty is kept by never claiming the opposite.
 */

const PAGE = "/services/salesforce-data-migration";
const PAGE_URL = `https://onealgorithm.com${PAGE}`;
const READ_ON = "23 October 2026";

const F1 = PLATES["salesforce-data-migration-sources"];
const F2 = PLATES["salesforce-data-migration-steps"];
const F3 = PLATES["salesforce-external-id-upsert-relationships"];
const PRIMARY_IMAGE = {
  url: "https://onealgorithm.com/media/salesforce/salesforce-data-migration-sources-1600x900.jpg",
  width: 1600,
  height: 900,
};

const DOCS = {
  dataLoader: {
    label: "Salesforce: When to Use Data Loader",
    href: "https://developer.salesforce.com/docs/atlas.en-us.dataLoader.meta/dataLoader/when_to_use_the_data_loader.htm",
  },
  trailhead: {
    label: "Trailhead: Import Data into Salesforce",
    href: "https://trailhead.salesforce.com/content/learn/modules/lex_implementation_data_management/lex_implementation_data_import",
  },
  wizard: {
    label: "Salesforce Help: Data Import Wizard",
    href: "https://help.salesforce.com/s/articleView?id=sf.data_import_wizard.htm&type=5",
  },
  export: {
    label: "Salesforce Help: Export Backup Data",
    href: "https://help.salesforce.com/s/articleView?id=sf.exporting_data.htm&type=5",
  },
  bulk: {
    label: "Salesforce: Bulk API 2.0 Developer Guide",
    href: "https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_intro.htm",
  },
  async: {
    label: "Salesforce Architects: Asynchronous Processing Decision Guide",
    href: "https://architect.salesforce.com/decision-guides/async-processing",
  },
  audit: {
    label: "Salesforce: System Fields (Set Audit Fields)",
    href: "https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/system_fields.htm",
  },
} as const;

const KINDS = [
  {
    icon: Blocks,
    title: "Off a no-code platform",
    body: "QuickBase and Kissflow apps that grew one form at a time. We have moved both into Salesforce.",
    to: "#source-lowcode",
  },
  {
    icon: Database,
    title: "Off another CRM",
    body: "HubSpot, Zoho or Dynamics 365, mapped field by field, with the history you choose to keep.",
    to: "#source-crm",
  },
  {
    icon: Sheet,
    title: "Out of spreadsheets",
    body: "Contact lists and trackers that become Accounts and Contacts, with duplicates merged first.",
    to: "#source-sheets",
  },
  {
    icon: GitMerge,
    title: "From another Salesforce org",
    body: "Two orgs merged into one after an acquisition, with relationships rebuilt from external IDs.",
    to: "#source-org",
  },
];

/* Wired to DM-F1 by key. `chip` mirrors the plate; only lowcode says DELIVERED. */
const SOURCES = [
  {
    k: "lowcode",
    id: "source-lowcode",
    chip: "Delivered",
    title: "QuickBase and Kissflow to Salesforce",
    body: "No-code apps hold years of records in whatever shape the person who built each form chose. We have migrated QuickBase and Kissflow systems into Salesforce, and each move starts by deciding what every table really is: which tables are live, which are history, and which are three copies of the same list. You get Salesforce objects that mean what your team thinks they mean.",
  },
  {
    k: "crm",
    id: "source-crm",
    chip: "Field map first",
    title: "HubSpot, Zoho or Dynamics 365 to Salesforce",
    body: "CRMs share names, not structures. A HubSpot company, a Zoho account and a Dynamics account all become Salesforce Accounts, but their owners, stages and custom fields do not line up one to one. We map every field and picklist value from your system's own export, agree the map with you in writing, and decide with you which emails, notes and activities come across.",
  },
  {
    k: "sheets",
    id: "source-sheets",
    chip: "Dedupe first",
    title: "Spreadsheets to Salesforce",
    body: "A sheet can become Accounts and Contacts, duplicates merged first. A contact list with a company column is two objects, not one: the companies become Accounts and the people become Contacts linked to them. Name variants such as Inc. and Inc are merged into one record before the load, so they never reach a report.",
  },
  {
    k: "org",
    id: "source-org",
    chip: "External IDs",
    title: "Merging two Salesforce orgs",
    body: "After a merger, or when a business unit was given its own org years ago, the objects share names but rarely share fields, picklist values or record IDs. Every record carries its old ID into an external ID field, so parents and children reconnect in the target org and the load can run again without creating duplicates.",
  },
];

/* A real sequence, so the numbering is honest (web-build banlist). */
const STEPS = [
  {
    title: "Inventory the source",
    body: "Every table, field and attachment, with a row count and a note on who still uses it. Fields nobody has filled in for years are flagged so you can leave them behind.",
  },
  {
    title: "Map to the Salesforce data model",
    body: "Source fields to standard and custom objects, picklist values to picklist values, users to owners. Parent records and their external IDs are planned before anything loads.",
  },
  {
    title: "Load into a sandbox first",
    body: "A full trial run against a sandbox, with record counts reconciled object by object and a sample checked by the people who know the data. Automation that would fire on insert is paused for the load.",
  },
  {
    title: "Cut over and reconcile",
    body: "The production load runs in a planned window, counts are reconciled again, and the source is set read-only rather than deleted, so anything questioned later can be checked against the original.",
  },
];

const CHECKLIST = [
  "Full export of the source, kept as a backup before any load",
  "Every table, field and file counted, with a named owner",
  "Fields nobody has filled in for years flagged to leave behind",
  "Duplicate and merge rules agreed before the load",
  "Every user mapped to a Salesforce record owner",
  "An external ID field on every object that has children",
  "Validation rules, duplicate rules, flows and triggers reviewed and paused",
  "Consent and do-not-call fields tested first",
  "Sandbox trial load reconciled object by object and sampled by your team",
  "Production load in a planned window, counts reconciled again",
  "Source set read-only, never deleted",
];

const HISTORY = [
  {
    k: "ext",
    title: "Every record keeps its old ID.",
    body: "The old system's ID goes into an external ID field on the Salesforce record, so anything can be traced back to where it came from.",
  },
  {
    k: "child",
    title: "Relationships are rebuilt, parent first.",
    body: "Accounts load before the contacts, opportunities and cases that hang off them, and each child finds its parent through that ID.",
  },
  {
    k: "rerun",
    title: "Reruns are safe.",
    body: "Loads run as upserts matched on the external ID, so a corrected file can be loaded again: existing records update and nothing duplicates.",
  },
  {
    title: "Original dates and creators, where you need them.",
    body: "Salesforce's Set Audit Fields upon Record Creation permission lets a load keep the original created date and created-by user on insert. Record owners come across through the user map.",
  },
  {
    title: "Attachments become Files.",
    body: "Documents attached in the old system load as Salesforce Files on the records they belong to.",
  },
  {
    title: "Rules are paused, then switched back on.",
    body: "Validation rules, duplicate rules, flows and triggers are reviewed and paused for the load, then re-enabled and tested before users return.",
  },
];

const BREAKS = [
  ["Relationships that do not connect", "Parents load first; children find them by external ID"],
  ["Duplicates that load perfectly", "Merge rules agreed with you before the load, not after"],
  ["Six spellings of one picklist value", "Every source value mapped to one Salesforce value"],
  ["Automation firing on every record", "Flows, triggers and rules reviewed and paused for the load"],
  ["Consent and do-not-call flags lost", "Suppression fields tested first, not last"],
  ["Records with no owner", "Every user mapped to a Salesforce owner"],
  ["The old system switched off too early", "Source set read-only and kept for checks"],
];

/* Questions are the page's own entries in the buyer question bank
   (2026-10-23_sf-audit/questions/questions-by-page.md, Data migration). None
   repeats a question on another Salesforce page; "What is Salesforce data
   migration?" is answered by the AnswerBand. ⛔ Duration and cost: drivers
   only until owner decision #10. */
const FAQS: SfFaq[] = [
  {
    q: "What do Salesforce data migration services include?",
    a: "An inventory of the source, a field map to Salesforce objects and owners agreed in writing, cleanup and duplicate merging, a full trial load in a sandbox, the production cutover, and a reconciliation of record counts after each load. The source system is set read-only at the end, not deleted.",
  },
  {
    q: "How do you handle data migration into Salesforce?",
    a: "In four steps: inventory the source, map it to the Salesforce data model with external IDs, run a full trial load in a sandbox, then cut over to production and reconcile again. Nothing touches production until the sandbox counts match.",
    link: { to: "#process", label: "The order we do it in" },
  },
  {
    q: "What are the best data migration tools for Salesforce?",
    a: "For loads under 50,000 records into common objects, Salesforce's Data Import Wizard. For larger volumes, objects the wizard does not support, or loads that repeat on a schedule, Data Loader, which handles up to 150 million records at a time and can run on the Bulk API. We choose by the size and shape of the data; the mapping and testing matter more than the tool.",
    link: { to: "#tools", label: "Which tool fits the volume" },
  },
  {
    q: "Can I export data from Salesforce?",
    a: "Yes. Salesforce's built-in Data Export Service produces a weekly or monthly set of CSV files, and Data Loader exports any object you have access to on demand. Your data is yours to take out, and our migration plans start with a full export before any load, as a backup.",
  },
  {
    q: "Can you merge two Salesforce orgs or move data between them?",
    a: "Yes. An org merge is planned like any other migration. The objects may share names but rarely share fields, picklist values or record IDs, so every record carries its old ID into an external ID field and the relationships are rebuilt from it in the target org.",
    link: { to: "#source-org", label: "Merging two Salesforce orgs" },
  },
  {
    q: "How do we migrate from HubSpot to Salesforce?",
    a: "Export every HubSpot object you use, map companies to Accounts, contacts to Contacts and deals to Opportunities, map each pipeline stage and owner, and decide which emails, notes and activities come across. Then run a trial load in a sandbox and reconcile the counts before the production load.",
  },
  {
    q: "How long does a migration to Salesforce take?",
    a: "Four things set it: how many source systems, how much data, how much cleanup the data needs, and how many sandbox trial runs it takes for the counts to match. The schedule is set once the source has been inventoried. Name the system and roughly how much is in it, and we will tell you what we would check first.",
  },
  {
    q: "How much does Salesforce data migration cost?",
    a: "The same four drivers set the cost: sources, volume, cleanup and trial runs. The work is scoped in writing before it starts. Published market ranges for migration inside a wider Salesforce project are in our cost guide.",
    link: { to: "/services/salesforce-implementation-cost", label: "Salesforce implementation cost guide" },
  },
  {
    q: "Will the migration disrupt our daily work?",
    a: "Your team keeps working in the old system while the trial loads run in a sandbox. The production load runs in a planned window, and the old system stays readable afterwards, set read-only rather than deleted.",
  },
  {
    q: "How do you keep our data safe during the migration?",
    a: "With four habits: a full export of the source before any load, as a backup; every trial load in a sandbox, never in production; consent and do-not-call fields tested first; and the source set read-only, not deleted, so every record can be checked against the original.",
  },
  {
    q: "Will we keep activity history, notes and attachments?",
    a: "Yes, when they are mapped. Notes and activities load against the records they belong to, attachments load as Salesforce Files, and where original created dates matter, Salesforce's Set Audit Fields upon Record Creation permission keeps them on insert. Which history comes across is decided with you at the mapping stage.",
    link: { to: "#history", label: "Keeping history" },
  },
  {
    q: "Can you move an app off QuickBase or Kissflow into Salesforce?",
    a: "Yes. We have migrated QuickBase and Kissflow systems into Salesforce. The work starts by deciding which tables are live and which are history, because no-code apps grow one form at a time.",
    link: { to: "#source-lowcode", label: "QuickBase and Kissflow to Salesforce" },
  },
  {
    q: "How do you test a Salesforce data migration?",
    a: "Record counts are reconciled object by object after the sandbox trial load and again after the production load, and a sample of records is checked by the people who know the data. Relationships, owners and consent fields are checked first.",
  },
];

const OBJECTIONS = [
  {
    q: "What if the load goes wrong halfway?",
    a: "Nothing touches production until a full trial load has reconciled in a sandbox. The source stays read-only, not deleted, so anything questioned later is checked against the original.",
  },
  {
    q: "Our data is a mess. Should we clean it up first?",
    a: "Cleanup is part of the migration. Duplicate accounts, contacts with no owner and picklists with six spellings of one value are agreed and merged before the load. A day spent agreeing merge rules saves a month of cleanup after it.",
  },
  SF_OBJECTIONS.city,
];

const TOC = [
  { id: "kinds", label: "Four kinds" },
  { id: "sources", label: "By source system" },
  { id: "process", label: "The order" },
  { id: "history", label: "History and what breaks" },
  { id: "tools", label: "Which tool" },
  { id: "delivered", label: "Delivered work" },
  { id: "questions", label: "Questions" },
  { id: "start", label: "Start" },
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function SalesforceDataMigration() {
  useSEO({
    title: "Salesforce Data Migration Services and Consultants",
    description:
      "Salesforce data migration from QuickBase, Kissflow, HubSpot or another org, reconciled before go-live. Free one-week health check: (610) 890-9711.",
    canonical: getCanonicalUrl(PAGE),
    ogTitle: "Salesforce data migration services, reconciled row by row",
    ogDescription:
      "Moving records into Salesforce from no-code tools, other CRMs, spreadsheets or another org, with sandbox trial loads and reconciled counts.",
    ogUrl: getCanonicalUrl(PAGE),
    ogImage: "https://onealgorithm.com/media/salesforce/og-salesforce-data-migration.jpg",
    ogImageSize: [1200, 630],
    ogImageAlt: F1.alt,
    twitterTitle: "Salesforce data migration services, reconciled row by row",
    twitterDescription:
      "Moving records into Salesforce from QuickBase, Kissflow, other CRMs or another org, reconciled before go-live.",
    twitterImage: "https://onealgorithm.com/media/salesforce/og-salesforce-data-migration.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Data Migration",
          "Data migration into Salesforce from no-code platforms such as QuickBase and Kissflow, from other CRMs and spreadsheets, and between Salesforce orgs: source inventory, field mapping with external IDs, sandbox trial loads, production cutover and record-count reconciliation. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "Salesforce data migration",
          PAGE_URL,
          { image: PRIMARY_IMAGE.url },
        )}
      />
      <StructuredData
        data={createWebPageSchema(
          "Salesforce Data Migration Services and Consultants",
          "Salesforce data migration from QuickBase, Kissflow, other CRMs, spreadsheets or another org, reconciled object by object before go-live.",
          PAGE_URL,
          { dateModified: "2026-10-23", primaryImage: PRIMARY_IMAGE },
        )}
      />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Salesforce data migration"
        title={
          <>
            Salesforce data migration services,{" "}
            <span className="text-oa-orange">reconciled row by row</span>
          </>
        }
        lede="We move QuickBase, Kissflow, other CRMs and other Salesforce orgs into Salesforce, and we prove the counts match before anyone switches the old system off."
        panel={{
          title: "What you get",
          items: [
            "A source inventory: every table, field and file, with row counts",
            "A field map to Salesforce objects, owners and external IDs, agreed in writing",
            "A full trial load in a sandbox, reconciled object by object",
            "The production cutover, reconciled again, with the source kept read-only",
          ],
        }}
        primary={{ label: "Tell us what you are moving", href: "#start", cta: "hero" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711", cta: "hero" }}
        siblings={false}
      >
        <div>
          <HcLink label="Data already in Salesforce? What the free health check covers →" />
        </div>
        <CTAProof tone="dark" className="mt-6" />
      </PageHero>

      <AnswerBand
        question="What is Salesforce data migration?"
        answer="Salesforce data migration moves records from another system, or another Salesforce org, into Salesforce so they land in the right objects with their relationships, owners and history intact. The copying is the small part. The work is the mapping before it and the reconciliation after it: counts that match, object by object, before go-live."
        leads={[
          {
            label: "Why it matters",
            body: "Records that load but no longer mean what they meant make every report wrong from the first day.",
          },
          {
            label: "What we do",
            body: "We inventory the source, map it to Salesforce with external IDs, trial-load a sandbox, then cut over and reconcile again. We have migrated QuickBase and Kissflow systems into Salesforce.",
          },
          {
            label: "What it costs",
            body: (
              <>
                Scoped in writing once we know the source and the volume; published market ranges are in the{" "}
                <Link className="oa-link" to="/services/salesforce-implementation-cost">
                  Salesforce cost guide
                </Link>
                . Data already in Salesforce? Start with the{" "}
                <Link className="oa-link" to="/services/salesforce-health-check">
                  free one-week health check
                </Link>
                .
              </>
            ),
          },
        ]}
        toc={TOC}
      >
        <RecordLine />
      </AnswerBand>

      <Section tone="surface" id="kinds">
        <SectionHeading
          title="Four kinds of migration we are asked for"
          lede="The source changes. The risk stays the same: records that arrive but no longer mean what they meant. Every path ends the same way, with counts reconciled before go-live."
        />
        <CardGrid columns={4} className="mt-12">
          {KINDS.map((c) => (
            <Card key={c.title} wire icon={c.icon} title={c.title} body={c.body} to={c.to} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper" id="sources" clip>
        <PlateScope>
          <SectionHeading
            title="Salesforce data migration by source system"
            lede="Each source needs one thing settled before anything loads. Every path runs through the same field map and the same reconciliation."
          />
          <div className="mt-12 grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-14">
            <div className="xl:order-2">
              <div className="mx-auto max-w-[760px] xl:sticky xl:top-28 xl:max-w-none">
                <Plate
                  spec={F1}
                  fig={1}
                  first
                  stamp={["DIAGRAM · WHERE MIGRATIONS COME FROM", "ONEALGORITHM"]}
                  caption="Every source runs through one field map into Salesforce, and every load ends in a count-by-count reconciliation."
                />
              </div>
            </div>
            <div className="xl:order-1">
              {SOURCES.map((s) => (
                <WiredRow key={s.k} k={s.k} as="article" className="-mx-3 px-3">
                  <div className="border-t border-oa-hairlineStrong py-7">
                  <p
                    className={`inline-flex border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] ${
                      s.k === "lowcode" ? "border-oa-blue text-oa-blue" : "border-oa-hairlineStrong text-oa-ink3"
                    }`}
                  >
                    {s.chip}
                  </p>
                  <h3 id={s.id} className="mt-3 text-lg font-semibold text-oa-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-[68ch] leading-relaxed text-oa-ink2">{s.body}</p>
                  </div>
                </WiredRow>
              ))}
              <article className="border-y border-oa-hairlineStrong py-7">
                <h3 id="source-sap" className="text-lg font-semibold text-oa-ink">
                  SAP: a one-off move or a sync
                </h3>
                <p className="mt-2.5 max-w-[68ch] leading-relaxed text-oa-ink2">
                  If SAP keeps running after go-live, the job is an integration, not a migration. We have delivered an
                  SAP-to-Salesforce sync, and it starts by agreeing which system owns each record. If SAP is being
                  retired, the move runs like any other source on this page.{" "}
                  <Link className="oa-link" to="/services/salesforce-integration">
                    Salesforce integration with SAP and ERP
                  </Link>
                </p>
              </article>
            </div>
          </div>
        </PlateScope>
      </Section>

      <Section tone="surface" id="process" clip>
        <PlateScope>
          <SectionHeading
            title="The order we do it in"
            lede="Nothing touches production until a full trial load has reconciled in a sandbox."
          />
          <div className="mt-12">
            <Plate
              spec={F2}
              fig={2}
              legend
              stamp={["DIAGRAM · THE ORDER OF A MIGRATION", "ONEALGORITHM"]}
              caption="Two tallies, one after the sandbox trial and one after the production load. The source stays readable throughout."
            />
          </div>
        </PlateScope>
        <div className="mt-16">
          <ProcessSteps rail terminal={{ label: "Name your source" }} steps={STEPS} />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-16 lg:grid-cols-2 lg:items-start">
          <DocNote
            said="Salesforce's architecture guidance names the Bulk API as the way to move large record sets in with the least strain on org limits. Its jobs run in the background as platform capacity allows, and report their results when they finish."
            title={DOCS.async.label}
            url={DOCS.async.href}
            readOn={READ_ON}
            meaning="A load is a job to check, not a button to press. We read every job's success and error results and reconcile the counts before the next object loads, and the production load runs in a planned window."
          />
          <div className="lg:pt-10">
            <h3 className="text-lg font-semibold text-oa-ink">Salesforce data migration checklist</h3>
            <div className="mt-5">
              <CheckList items={CHECKLIST} />
            </div>
          </div>
        </div>
      </Section>

      <MidStrip line="Name the source system and roughly how much is in it." label="Tell us what you are moving" />

      <Section tone="paper" id="history" clip>
        <PlateScope>
          <SectionHeading
            title="Keeping history, and what breaks"
            lede="History survives a migration when it is planned at the mapping stage. These are the Salesforce features we use to keep it, decided with you object by object."
          />
          <div className="mt-12 grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-14">
            <div>
              <div className="mx-auto max-w-[600px] xl:sticky xl:top-28 xl:max-w-none">
                <Plate
                  spec={F3}
                  fig={3}
                  stamp={["DIAGRAM · ILLUSTRATIVE VALUES, NOT A CLIENT'S DATA", "ONEALGORITHM"]}
                  caption="The old system's ID travels with every record, so children find their parents and a rerun updates instead of duplicating."
                />
              </div>
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-oa-ink">How history comes across</h3>
              <div className="mt-6 border-b border-oa-hairlineStrong">
                {HISTORY.map((h) =>
                  h.k ? (
                    <WiredRow key={h.title} k={h.k} className="-mx-3 px-3">
                      <p className="max-w-[68ch] border-t border-oa-hairlineStrong py-5 text-oa-ink2">
                        <strong className="font-semibold text-oa-ink">{h.title}</strong> {h.body}
                      </p>
                    </WiredRow>
                  ) : (
                    <div key={h.title} className="border-t border-oa-hairlineStrong py-5">
                      <p className="max-w-[68ch] text-oa-ink2">
                        <strong className="font-semibold text-oa-ink">{h.title}</strong> {h.body}
                      </p>
                    </div>
                  ),
                )}
              </div>
              <h3 className="mt-16 text-h3 font-semibold text-oa-ink">What breaks, and the check that catches it</h3>
              <div className="mt-6">
                <DataTable
                  label="Common Salesforce data migration mistakes and the check that catches each one"
                  head={["What breaks", "The check that catches it"]}
                  rows={BREAKS.map(([a, b]) => ({ cells: [a, b] }))}
                  source="Each check is a step in the method above."
                />
              </div>
            </div>
          </div>
        </PlateScope>
      </Section>

      <Section tone="surface" id="tools">
        <SectionHeading
          title="Which Salesforce tool fits the volume"
          lede="We choose the tool by the size and shape of the data. Salesforce documents where each one stops."
        />
        <div className="mt-10">
          <DataTable
            label="Salesforce data loading tools and their documented limits"
            ground="surface"
            head={["Tool", "Fits", "Salesforce's documented limit"]}
            rows={[
              {
                cells: [
                  "Data Import Wizard",
                  "Common standard objects such as accounts, contacts and leads, plus custom objects. Matches duplicates on account name and site, or on contact or lead email.",
                  "Under 50,000 records per import",
                ],
              },
              {
                cells: [
                  "Data Loader",
                  "Any object, including those the wizard does not support; field mappings that repeat; scheduled loads such as nightly imports; full exports for backup.",
                  "Up to 150 million records at a time. Above that, Salesforce points you to a partner or to AppExchange.",
                ],
              },
              {
                cells: [
                  "Bulk API 2.0",
                  "Large loads processed as background jobs. Data Loader can switch to it.",
                  "Asynchronous and parallel: faster than the SOAP API that Data Loader uses by default",
                ],
              },
              {
                cells: [
                  "Integration and ETL platforms",
                  <>
                    When the old system keeps running beside Salesforce, the job is an integration rather than a one-off load.{" "}
                    <Link className="oa-link" to="/services/salesforce-integration">
                      Salesforce integration
                    </Link>
                  </>,
                  "Set by each product",
                ],
              },
            ]}
            source={
              <>
                Sources, read {READ_ON}:{" "}
                <a className="oa-link" href={DOCS.dataLoader.href} {...ext}>
                  {DOCS.dataLoader.label} ↗
                </a>{" "}
                ·{" "}
                <a className="oa-link" href={DOCS.trailhead.href} {...ext}>
                  {DOCS.trailhead.label} ↗
                </a>{" "}
                ·{" "}
                <a className="oa-link" href={DOCS.bulk.href} {...ext}>
                  {DOCS.bulk.label} ↗
                </a>
              </>
            }
          />
        </div>
        <p className="mt-10 max-w-[60ch] text-lede text-oa-ink">
          Above 150 million records, Salesforce's own guidance is to work with a Salesforce partner. We are a listed
          Consulting Partner on AppExchange.
        </p>
      </Section>

      <Section tone="paper" id="delivered">
        <div className="grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-16">
          <div>
            <DeliveredLedger title="Work we have delivered" lead="lowcode" />
          </div>
          <aside className="border-t-2 border-oa-blue pt-6 xl:mt-2 xl:self-start">
            <h3 className="text-h3 font-semibold text-oa-ink">Who leads the work</h3>
            <PeopleStrip className="mt-4 max-w-[60ch] text-oa-ink2" />
            <p className="mt-5 max-w-[60ch] text-oa-ink2">
              You work directly with the certified people doing the migration, from the first inventory to the last
              count.
            </p>
          </aside>
        </div>
      </Section>

      <Section tone="surface" id="objections">
        {/* Measure cap for the shared answer column (~110 chars at 1440 otherwise). */}
        <div className="[&_dd]:max-w-[68ch]">
          <Objections items={OBJECTIONS} />
        </div>
      </Section>

      <Section tone="paper" id="questions">
        <SectionHeading title="What people ask about moving data into Salesforce" />
        <div className="[&_h3+div]:max-w-[68ch]">
          <FAQList
            faqs={FAQS}
            sources={{
              checked: "October 2026",
              links: [DOCS.dataLoader, DOCS.trailhead, DOCS.wizard, DOCS.export, DOCS.bulk, DOCS.async, DOCS.audit],
            }}
          />
        </div>
      </Section>

      <Section tone="surface" id="related">
        <SectionHeading
          title="Other Salesforce work"
          lede={
            <>
              Data migration is one stage of a Salesforce implementation.{" "}
              <Link className="oa-link" to="/services/salesforce">
                How an implementation runs
              </Link>
            </>
          }
        />
        <RouteBoard groups={["services", "local", "cities"]} citiesLabel="Where we deliver this" />
      </Section>

      <Desk
        heading="Tell us what you are moving"
        body="Name the source system and roughly how much is in it. We will tell you what we would check first."
        form={{
          topic: "data-migration",
          topicLabel: "Salesforce data migration",
          heading: "Scope your Salesforce migration",
          prompt: "Source system and roughly how much is in it",
          submitLabel: "Tell us what you are moving",
        }}
        next={[
          "Call or send the form.",
          "A person at OneAlgorithm reads it and replies.",
          "We tell you what we would check first.",
        ]}
      />
    </Layout>
  );
}
