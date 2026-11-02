import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeliveredLedger, PersonCredentials,
  FAQ, DeskCTA, StageRail, StageUnits, SourcesDialog, Verify, type SfFaqItem, type Stage, type SfSource,
} from "../../components/sf";
import { DataMigration } from "../../components/sf/illus";
import { SF_PHONE } from "../../data/salesforceShared";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, createServiceSchema, createWebPageSchema, createLocalBusinessSchema, SF_HEALTH_CHECK_OFFER,
} from "../../components/StructuredData";

/* /services/salesforce-data-migration. Rebuilt 2026-10-23 on the redesign-v2 kit (client/components/sf), in the
 * approved prototype's rhythm (Louis 2026-10-23: "build the 23 pages this way"), with title, meta, H1, the H2/H3
 * list and schema from seo-completeness/structure-spec.md §5.3. Build notes: build-v2/page-data-migration.md.
 *
 * ⛔ PROOF IS PATTERNS, NEVER A NAMED CUSTOMER. Delivered claims here: QuickBase and Kissflow migrations into
 * Salesforce, an SAP-to-Salesforce sync, and (through DeliveredLedger only) the lending company and Marketing Cloud
 * support. HubSpot, Zoho, Dynamics 365, Zendesk, spreadsheets, SQL Server and org merges are METHOD only: how we
 * run it, never that we have (Zendesk and SQL Server are named per spec §5.3 row 2, method wording only).
 * ⛔ No duration, price, record-count promise, success rate or SLA (owner decision #10 open): drivers only.
 * ⛔ Security answers use page facts only: no encryption, SOC 2, ISO, NIST, CMMC, FedRAMP or "zero downtime".
 * ⛔ MuleSoft is not named on this page (owner decision #6: add nothing). No years-of-experience figure.
 * ⛔ The company count never describes individuals: "the certified people doing the migration" is gone (gap #35);
 *    the people block names Sreenivas (14) and Swapna (2) with their own badges.
 * LINKS: in-site only in the body. Salesforce's documentation is cited as text + read date and listed in ONE
 * sources pop-up (id "docs"); the only off-site anchors live inside the dialogs (new tab, noopener, external mark). */

const PAGE_PATH = "/services/salesforce-data-migration";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-10-23";
const READ_ON = "23 October 2026"; // the date a person read Salesforce's documentation below (fact-checked at ef1a8f0)
const TITLE = "Salesforce Data Migration Services & Consultants | One Algorithm";
const DESCRIPTION =
  "Salesforce data migration services from QuickBase, Kissflow, HubSpot or another org, reconciled before go-live. Free one-week health check: (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og/og-data-migration.jpg";
const OG_ALT =
  "Illustration with sample data: five legacy Account fields mapped to Salesforce fields with their rules, then 18,420 of 18,420 accounts matched after the load.";
const COST = "/services/salesforce-implementation-cost";
const INT = "/services/salesforce-integration";
const MS = "/services/salesforce-managed-services";
const PHL = "/services/salesforce-consultant-philadelphia";

/* Salesforce's own documentation, read READ_ON. Shown only inside the sources pop-up (link policy). */
const DOCS: SfSource[] = [
  { name: "Salesforce Developers: When to Use Data Loader", what: "Data Loader: up to 150 million records at a time, any object, scheduled loads, exports", read: `read ${READ_ON}`, page: "https://developer.salesforce.com/docs/atlas.en-us.dataLoader.meta/dataLoader/when_to_use_the_data_loader.htm" },
  { name: "Trailhead: Import Data into Salesforce", what: "Data Import Wizard: under 50,000 records, common objects, duplicate matching", read: `read ${READ_ON}`, page: "https://trailhead.salesforce.com/content/learn/modules/lex_implementation_data_management/lex_implementation_data_import" },
  { name: "Salesforce Help: Data Import Wizard", what: "Which objects the wizard imports", read: `read ${READ_ON}`, page: "https://help.salesforce.com/s/articleView?id=sf.data_import_wizard.htm&type=5" },
  { name: "Salesforce Help: Export Backup Data", what: "The Data Export Service: weekly or monthly CSV files", read: `read ${READ_ON}`, page: "https://help.salesforce.com/s/articleView?id=sf.exporting_data.htm&type=5" },
  { name: "Salesforce Developers: Bulk API 2.0 Developer Guide", what: "Large loads processed asynchronously and in parallel", read: `read ${READ_ON}`, page: "https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_intro.htm" },
  { name: "Salesforce Architects: Asynchronous Processing Decision Guide", what: "The Bulk API for large record sets, run as background jobs", read: `read ${READ_ON}`, page: "https://architect.salesforce.com/decision-guides/async-processing" },
  { name: "Salesforce Developers: System Fields", what: "Set Audit Fields upon Record Creation: original created dates and creators on insert", read: `read ${READ_ON}`, page: "https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/system_fields.htm" },
];

/* The four steps (spec §5.3 row 3 H3s, exact). Lines and details are the ef1a8f0 page's STEPS and CHECKLIST. */
const STEPS: Stage[] = [
  { k: "s1", num: "01", title: "Inventory the source", sub: "tables · fields · files · owners", line: "Every table, field and attachment, with a row count and a note on who still uses it.",
    details: ["Fields nobody has filled in for years flagged so you can leave them behind", "A full export of the source, kept as a backup before any load", "Every table, field and file counted, with a named owner"] },
  { k: "s2", num: "02", title: "Map to the Salesforce data model", short: "Map to the data model", sub: "objects · picklists · owners · IDs", line: "Source fields to standard and custom objects, picklist values to picklist values, users to owners.",
    details: ["Parent records and their external IDs planned before anything loads", "Duplicate and merge rules agreed before the load", "The field map agreed with you in writing"] },
  { k: "s3", num: "03", title: "Load into a sandbox first", sub: "trial load · counts reconciled", line: "A full trial run against a sandbox, with record counts reconciled object by object.",
    details: ["A sample checked by the people who know the data", "Automation that would fire on insert paused for the load", "Consent and do-not-call fields tested first"] },
  { k: "s4", num: "04", title: "Cut over and reconcile", sub: "planned window · source read-only", line: "The production load runs in a planned window, and the counts are reconciled again.",
    details: ["The source set read-only rather than deleted", "Anything questioned later checked against the original", "Rules switched back on and tested before users return"] },
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

const HISTORY: [string, string][] = [
  ["Every record keeps its old ID.", "The old system's ID goes into an external ID field on the Salesforce record, so anything can be traced back to where it came from."],
  ["Relationships are rebuilt, parent first.", "Accounts load before the contacts, opportunities and cases that hang off them, and each child finds its parent through that ID."],
  ["Reruns are safe.", "Loads run as upserts matched on the external ID, so a corrected file can be loaded again: existing records update and nothing duplicates."],
  ["Original dates and creators, where you need them.", "Salesforce's Set Audit Fields upon Record Creation permission lets a load keep the original created date and created-by user on insert. Record owners come across through the user map."],
  ["Attachments become Files.", "Documents attached in the old system load as Salesforce Files on the records they belong to."],
  ["Rules are paused, then switched back on.", "Validation rules, duplicate rules, flows and triggers are reviewed and paused for the load, then re-enabled and tested before users return."],
];

const BREAKS: [string, string][] = [
  ["Relationships that do not connect", "Parents load first; children find them by external ID"],
  ["Duplicates that load perfectly", "Merge rules agreed with you before the load, not after"],
  ["Six spellings of one picklist value", "Every source value mapped to one Salesforce value"],
  ["Automation firing on every record", "Flows, triggers and rules reviewed and paused for the load"],
  ["Consent and do-not-call flags lost", "Suppression fields tested first, not last"],
  ["Records with no owner", "Every user mapped to a Salesforce owner"],
  ["The old system switched off too early", "Source set read-only and kept for checks"],
];

/* The visible comparison (spec §5.3 row 5: the table IS the answer). Limits are Salesforce's, read READ_ON. */
const TOOLS: { tool: string; fits: React.ReactNode; limit: string }[] = [
  { tool: "Data Import Wizard", fits: "Accounts, contacts, leads and custom objects", limit: "Under 50,000 records per import" },
  { tool: "Data Loader", fits: "Any object; repeat, scheduled and backup jobs", limit: "Up to 150 million records at a time" },
  { tool: "Bulk API 2.0", fits: "Large loads run as background jobs; Data Loader can switch to it", limit: "Asynchronous and parallel" },
  { tool: "Integration and ETL platforms", fits: "The old system keeps running beside Salesforce", limit: "Set by each product" },
];

/* Objections (H3) with the answers in Go deeper. ⛔ None repeats a FAQ question. The city answer is the owner's
   2026-10-23 19:05 wording (most work remote; in person when the project calls for it, easiest around Philadelphia). */
const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "What if the load goes wrong halfway?", a: <>Nothing touches production until a full trial load has reconciled in a sandbox. The source stays read-only, not deleted, so anything questioned later is checked against the original.</> },
  { q: "Our data is a mess. Should we clean it up first?", a: <>Cleanup is part of the migration. Duplicate accounts, contacts with no owner and picklists with six spellings of one value are agreed and merged before the load.</> },
  { q: "You are not in our city.", a: <>Most of the work is remote, inside your org, from Malvern, PA; in-person sessions when the project calls for them, easiest across the Philadelphia region. <Link className="sf-link" to={PHL}>Salesforce consultants for Philadelphia companies</Link></> },
];

/* The page's own question bank (questions/questions-by-page.md, data migration): the ef1a8f0 set minus the tools
   question, which is now the H2 "Salesforce data migration tools compared" (spec §5.3 row 11, HDG-08). One owner
   page per question across the 23 pages. ⛔ Duration and cost: drivers only until owner decision #10. */
const FAQS: SfFaqItem[] = [
  {
    q: "What do Salesforce data migration services include?",
    a: "An inventory of the source, a field map to Salesforce objects and owners agreed in writing, data cleansing and duplicate merging, a full trial load in a sandbox, the production cutover, and a reconciliation of record counts after each load. The source system is set read-only at the end, not deleted, so no data is lost.",
  },
  {
    q: "How do you handle data migration into Salesforce?",
    a: "In four steps: inventory the source, map it to the Salesforce data model with external IDs, run a full trial load in a sandbox, then cut over to production and reconcile again. Nothing touches production until the sandbox counts match, which is how a migration avoids data loss.",
    link: { to: "#process", label: "Salesforce data migration process and checklist" },
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
    link: { to: "#source-crm", label: "HubSpot, Zoho, Dynamics 365 or Zendesk to Salesforce" },
  },
  {
    q: "How long does a migration to Salesforce take?",
    a: "Four things set it: how many source systems, how much data, how much cleanup the data needs, and how many sandbox trial runs it takes for the counts to match. The schedule is set once the source has been inventoried. Name the system and roughly how much is in it, and we will tell you what we would check first.",
  },
  {
    q: "How much does Salesforce data migration cost?",
    a: "The same four drivers set the cost: sources, volume, cleanup and trial runs. The work is scoped in writing before it starts. Published market ranges for migration inside a wider Salesforce project are in our cost guide.",
    link: { to: COST, label: "Salesforce implementation cost guide" },
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
    link: { to: "#history", label: "Keeping record history in a Salesforce migration" },
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

/* Visible comparison table: the kit has no visible-table class yet (requested in build-v2/requests-data-migration.md),
   so the cells carry the kit's own tokens inline. Three columns stay readable at 390 because every cell is short. */
const cell: React.CSSProperties = { textAlign: "left", verticalAlign: "top", padding: "14px 16px 14px 0", borderTop: "1px solid var(--hair-s)" };
const headCell: React.CSSProperties = { ...cell, borderTop: 0, padding: "0 16px 10px 0", font: "500 12px/1.4 var(--mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink3)" };

export default function SalesforceDataMigration() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: "Salesforce data migration services, reconciled row by row | One Algorithm",
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: "Salesforce data migration services, reconciled row by row | One Algorithm",
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Data Migration",
          "Data migration into Salesforce from no-code platforms such as QuickBase and Kissflow, from other CRMs and spreadsheets, and between Salesforce orgs: source inventory, field mapping with external IDs, sandbox trial loads, production cutover and record-count reconciliation. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "Salesforce data migration",
          PAGE_URL,
          { image: OG_IMAGE, offers: SF_HEALTH_CHECK_OFFER },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce", to: "/services/salesforce" }, { label: "Data migration" }]}>
        {/* 1 HERO. H1 = the LCP; FIG. 1 (field mapping + reconciliation) is dealt by CSS 250ms after first paint. */}
        <SFHero
          kicker={<>Salesforce Consulting Partner<span className="sf-kicker-loc"> · Malvern, PA</span></>}
          title="Salesforce data migration services, reconciled row by row"
          lede="We move US companies off QuickBase, Kissflow or another CRM into Salesforce, reconciled before go-live; existing orgs start with a free one-week health check."
          proof
          figure={<DataMigration fig={1} hero className="sf-hero-fig" />}
        />

        {/* 2 WHAT IT IS (spec row 1) + what you get (the contract's 3 visible bullets; the old 14px H2 is now a label). */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="What is Salesforce data migration?"
            lede="Salesforce data migration moves records, history and files from another system into Salesforce and proves the counts match before go-live."
            lead="The copying is the small part; records that load but no longer mean what they meant make every report wrong from day one."
          >
            <GoDeeper label="what a migration involves and what it costs">
              <p className="sf-rule">
                Records from another system, or another Salesforce org, have to land in the right objects with their relationships, owners and history intact. The work is the mapping before the load and the reconciliation after it: counts that match, object by object, before go-live.
              </p>
              <p><span className="sf-lead-in">What we do:</span> We inventory the source, map it to Salesforce with external IDs, trial-load a sandbox, then cut over and reconcile again.</p>
              <p><span className="sf-lead-in">What it costs:</span> Scoped in writing once we know the source and the volume; published market ranges are in our cost guide.</p>
              <p>Data migration is one stage of a Salesforce implementation.</p>
              <div className="sf-links">
                <Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link>
                <Link className="sf-link" to="/services/salesforce">Salesforce consulting services</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="div" className="sf-c5" delay={0.08}>
            <p className="sf-kicker">What you get</p>
            <ul className="sf-points">
              <li>A source inventory: every table, field and file, with row counts</li>
              <li>A field map to objects, owners and external IDs, agreed in writing</li>
              <li>Two reconciliations: after the sandbox trial and after the production load</li>
            </ul>
          </LedgerRule>
        </SmartSection>

        {/* 3 BY SOURCE SYSTEM (spec row 2): five H3 units on the night band. "Delivered" only on QuickBase/Kissflow. */}
        <SmartSection
          id="sources"
          tone="night"
          grid
          heading={{
            id: "h-sources",
            title: "Salesforce data migration by source system",
            lede: "We have migrated QuickBase and Kissflow systems into Salesforce, and we run the same method for other CRMs, spreadsheets and orgs.",
          }}
        >
          <SmartUnit level={3} className="sf-c4" headingId="source-lowcode" kicker="Delivered" measure={false}
            title="QuickBase and Kissflow to Salesforce"
            lede="No-code apps grow one form at a time, so each move starts by agreeing which tables are live and which are history.">
            <GoDeeper label="moving a no-code app into Salesforce">
              <p className="sf-rule">No-code apps hold years of records in whatever shape the person who built each form chose. Every table is sorted first: live, history, or three copies of the same list. You get Salesforce objects that mean what your team thinks they mean.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" headingId="source-crm" kicker="Field map first" delay={0.08} measure={false}
            title="HubSpot, Zoho, Dynamics 365 or Zendesk to Salesforce"
            lede="CRMs share names, not structures, so every field, picklist value and owner is mapped from your system's own export first.">
            <GoDeeper label="how we would run a move off another CRM">
              <p className="sf-rule">A HubSpot company, a Zoho account and a Dynamics account all become Salesforce Accounts, but their owners, stages and custom fields do not line up one to one. We map every field and picklist value from your system's own export, agree the map with you in writing, and decide with you which emails, notes and activities come across. Zendesk runs the same way, with tickets mapped to Salesforce Cases and the ticket history you choose to keep.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" headingId="source-sheets" kicker="Dedupe first" delay={0.16} measure={false}
            title="Spreadsheets or SQL Server to Salesforce"
            lede="A contact list with a company column is two objects: companies become Accounts, people become Contacts linked to them.">
            <GoDeeper label="how we would run a move off spreadsheets or a database">
              <p className="sf-rule">Name variants such as "Inc." and "Inc" are merged into one record before the load, so they never reach a report. A SQL Server database moves the same way: each table is mapped to an object, and the keys that join tables are carried into external ID fields so the relationships rebuild in Salesforce.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c6" headingId="source-org" kicker="External IDs" measure={false}
            title="Merging two Salesforce orgs"
            lede="Every record carries its old ID into an external ID field, so parents and children reconnect in the target org.">
            <GoDeeper label="how we would merge two orgs">
              <p className="sf-rule">After a merger, or when a business unit was given its own org years ago, the objects share names but rarely share fields, picklist values or record IDs. Because every load matches on that external ID, it can run again without creating duplicates.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c6" headingId="source-sap" kicker="Migration or integration" delay={0.08} measure={false}
            title="SAP: a one-off move or a sync"
            lede="If SAP keeps running after go-live, the job is an integration; if SAP is being retired, it runs like any source here.">
            <GoDeeper label="SAP data and Salesforce">
              <p className="sf-rule">We have delivered an SAP-to-Salesforce sync, and it starts by agreeing which system owns each record.</p>
              <div className="sf-links"><Link className="sf-link" to={INT}>Salesforce integration with SAP and ERP</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 4 PROCESS AND CHECKLIST (spec row 3): FIG. 2 rail scrubbed by scroll + four stage units + the checklist. */}
        <SmartSection
          id="process"
          heading={{
            id: "h-process",
            title: "Salesforce data migration process and checklist",
            lede: "We inventory, map, load into a sandbox, then cut over and reconcile count by count.",
          }}
        >
          <StageRail
            fig={2}
            stations={STEPS}
            className="sf-rail-top"
            title="Staged diagram of the four steps of a Salesforce data migration"
            desc="A rail runs through four stations: inventory the source, map to the Salesforce data model, load into a sandbox first, then cut over and reconcile."
            stamp="The order of a migration"
            caption="The four steps in the order they run. Nothing touches production until the sandbox counts match, and the source stays readable throughout."
          />
          <StageUnits items={STEPS} />
          <div className="sf-grid" style={{ marginTop: 56 }}>
            <SmartUnit
              level={3}
              className="sf-c12"
              headingId="h-checklist"
              title="Salesforce data migration checklist"
              lede="Eleven checks, in the order they run, from the first export to the source going read-only."
            >
              <ol style={{ marginTop: 24, columns: "20em 3", columnGap: 40 }}>
                {CHECKLIST.map((c, i) => (
                  <li key={c} style={{ display: "flex", gap: 14, padding: "10px 0", borderTop: "1px solid var(--hair)", breakInside: "avoid" }}>
                    <span className="sf-mono" aria-hidden="true" style={{ color: "var(--orange-text)", paddingTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
            </SmartUnit>
          </div>
        </SmartSection>

        {/* 5 TOOLS COMPARED (spec row 5): the table is the answer, so it stays visible; sources in the pop-up. */}
        <SmartSection
          id="tools"
          tone="surface"
          grid
          heading={{
            id: "h-tools",
            title: "Salesforce data migration tools compared",
            lede: "Data Import Wizard suits small loads, Data Loader and the Bulk API handle large ones; the volume decides.",
          }}
        >
          <div className="sf-c8">
            {/* Two columns (tool + what it fits | the limit) so the comparison stays readable at 390. */}
            <table style={{ width: "100%", borderCollapse: "collapse", borderBottom: "1px solid var(--hair-s)", fontSize: 16, lineHeight: 1.45 }}>
              <caption className="sr-only">Salesforce data loading tools, what each fits, and Salesforce's documented limits</caption>
              <thead>
                <tr><th scope="col" style={{ ...headCell, width: "58%" }}>Tool · what it fits</th><th scope="col" style={headCell}>Salesforce's documented limit</th></tr>
              </thead>
              <tbody>
                {TOOLS.map((t) => (
                  <tr key={t.tool}>
                    <th scope="row" style={{ ...cell, fontWeight: 400 }}>
                      <span style={{ display: "block", font: "700 19px/1.3 var(--display)", color: "var(--ink)" }}>{t.tool}</span>
                      <span style={{ display: "block", marginTop: 4, color: "var(--ink2)" }}>{t.fits}</span>
                    </th>
                    <td style={{ ...cell, color: "var(--ink)", fontWeight: 600 }}>{t.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="sf-mono" style={{ marginTop: 14, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Salesforce's documentation, read {READ_ON} · <Verify id="docs">Where these limits come from</Verify>
            </p>
          </div>
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.08}
            measure={false}
            title="Above 150 million records"
            lede="Salesforce's own guidance is to work with a Salesforce partner, and we are a listed Consulting Partner on AppExchange."
          >
            <GoDeeper label="how a large load runs">
              <p className="sf-rule">Salesforce's architecture guidance names the Bulk API as the way to move large record sets in with the least strain on org limits. Its jobs run in the background as platform capacity allows, and report their results when they finish.</p>
              <p><span className="sf-lead-in">What we do:</span> We read every job's success and error results and reconcile the counts before the next object loads.</p>
              <p>The Data Import Wizard matches duplicates on account name and site, or on contact or lead email. When the old system keeps running beside Salesforce, the job is an integration rather than a one-off load.</p>
              <div className="sf-links"><Link className="sf-link" to={INT}>Salesforce integration services</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 6 HISTORY (spec row 6): two H3 units abreast; the history list and the failure table in Go deeper. */}
        <SmartSection
          id="history"
          grid
          heading={{
            id: "h-history",
            title: "Keeping record history in a Salesforce migration",
            lede: "History survives a migration when it is planned at the mapping stage, decided with you object by object.",
          }}
        >
          <SmartUnit
            level={3}
            className="sf-c6"
            measure={false}
            title="How history comes across"
            lede="Every record keeps its old ID, so children find their parents and a corrected file can load again without duplicates."
            points={[
              "Original created dates and creators kept on insert, where you need them",
              "Attachments from the old system load as Salesforce Files",
              "Notes and activities load against the records they belong to",
            ]}
          >
            <GoDeeper label="the six ways history is kept">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                {HISTORY.map(([t, b]) => <li key={t}><b className="sf-lead-in">{t}</b> {b}</li>)}
              </ul>
              <p className="sf-mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
                Set Audit Fields: Salesforce's documentation, read {READ_ON} · <Verify id="docs">Sources</Verify>
              </p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c6"
            delay={0.08}
            measure={false}
            title="What breaks, and the check that catches it"
            lede="Seven things break migrations, and each has a check in the method above that catches it before go-live."
            points={[
              "Relationships that do not connect: parents load first, children find them by ID",
              "Duplicates that load perfectly: merge rules agreed before the load",
              "Consent and do-not-call flags lost: suppression fields tested first",
            ]}
          >
            <GoDeeper label="all seven failure points and their checks">
              <table>
                <caption className="sr-only">Common Salesforce data migration mistakes and the check that catches each one</caption>
                <thead><tr><th scope="col">What breaks</th><th scope="col">The check that catches it</th></tr></thead>
                <tbody>
                  {BREAKS.map(([a, b]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td></tr>)}
                </tbody>
              </table>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 7 BEST PRACTICES (spec row 4) + AFTER THE MIGRATION (spec row 7): two H2 units abreast. */}
        <SmartSection id="practices" tone="surface" grid labelledBy="h-practices">
          <SmartUnit
            className="sf-c6"
            headingId="h-practices"
            measure={false}
            title="Salesforce data migration best practices"
            lede="The practices that prevent data loss: the source stays read-only, every old ID travels with its record, and counts are reconciled twice."
            lead="A day spent agreeing merge rules saves a month of cleanup after the load."
            points={[
              "A full export of the source first, kept as a backup",
              "Automation paused for the load, consent fields tested first",
              "Every user mapped to a Salesforce record owner",
            ]}
          >
            <GoDeeper label="the full list of practices">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                <li>Set the source read-only instead of deleting it, so anything questioned later is checked against the original.</li>
                <li>Carry every old record ID in an external ID field; parents load first and children find them by it.</li>
                <li>Load as upserts matched on the external ID, so a corrected file can run again without duplicates.</li>
                <li>Agree duplicate and merge rules with you before the load, not after.</li>
                <li>Map every source picklist value to one Salesforce value.</li>
                <li>Review and pause validation rules, duplicate rules, flows and triggers for the load, then re-enable and test them.</li>
                <li>Reconcile record counts object by object in the sandbox, and again after the production load.</li>
              </ul>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c6"
            headingId="h-after"
            delay={0.08}
            measure={false}
            leadIn="What we do:"
            title="After the migration: support and clean-up"
            lede="After cutover, every paused rule is switched back on and tested, and the old system stays readable for checks."
            lead="Weekly administration and development keeps the org running after go-live, with hours reported every week."
            points={[
              "Validation rules, flows and triggers re-enabled and tested before users return",
              "Questions about a record checked against the read-only source",
              "Reports and dashboards changed as the questions change",
            ]}
          >
            <GoDeeper label="support after go-live">
              <p className="sf-rule">Training for admins and for everyday users, reports and dashboards changed as the questions change, and testing before every Salesforce release. Managed services carry it on: weekly administration and development, with hours reported every week.</p>
              <div className="sf-links"><Link className="sf-link" to={MS}>Salesforce managed services and development</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 8 DELIVERED (spec row 8): the delivered rows, who leads the work (badges, Verify), Salesforce's record. */}
        <SmartSection
          id="delivered"
          heading={{
            id: "h-delivered",
            title: "Salesforce data migration work we have delivered",
            lede: "We have migrated QuickBase and Kissflow systems into Salesforce, and delivered an SAP sync, Marketing Cloud support and ongoing development for a lending company.",
          }}
        >
          <div className="sf-grid" style={{ marginTop: 40 }}>
            {/* The unit's own H3 comes first: the ledger rows are H3s too, and the unit heading is what the
                brevity lint measures (8 words). The QuickBase/Kissflow row is spec §5.3 row 8's H3. */}
            <LedgerRule as="div" className="sf-c7">
              <h3 className="sf-h3" id="h-practice-work">Delivered across our Salesforce practice</h3>
              <DeliveredLedger />
              <p className="sf-mono" style={{ marginTop: 10 }}>Client names stay private.</p>
              {/* Salesforce's record sits under the ledger so the 7/5 spread is full beside the people block. */}
              <p className="sf-kicker" style={{ marginTop: 56 }}>Salesforce's AppExchange record of OneAlgorithm</p>
              <Readouts />
            </LedgerRule>
            <LedgerRule as="aside" className="sf-c5 sf-lead-block" delay={0.08} aria-labelledby="h-lead">
              <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
              <PersonCredentials />
            </LedgerRule>
          </div>
        </SmartSection>

        {/* 9 CONCERNS (spec row 10): objection questions as H3, answers in Go deeper. */}
        <SmartSection
          id="concerns"
          tone="surface"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before a Salesforce data migration",
            lede: "Three questions buyers raise before a migration, each with the direct answer.",
          }}
        >
          {CONCERNS.map((c, i) => (
            <LedgerRule as="article" key={c.q} className="sf-c4" delay={i * 0.08}>
              <h3 className="sf-h3">{c.q}</h3>
              <GoDeeper label={c.q} title="The answer">
                <p className="sf-rule">{c.a}</p>
              </GoDeeper>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* 10 DESK (spec row 9): the one form, #start. */}
        <DeskCTA
          heading="Scope your Salesforce data migration"
          lede="Name the source system and roughly how much is in it; data already in Salesforce starts with the free one-week health check."
          next={["Call or send the form.", "A person at OneAlgorithm reads it and replies.", "We tell you what we would check first."]}
          form={{
            topic: "data-migration",
            topicLabel: "Salesforce data migration",
            heading: "Book a free health check",
            prompt: "Source system and roughly how much is in it",
            submitLabel: "Book a free health check",
          }}
        />

        {/* 11 FAQ (spec row 11): questions visible, answers in the HTML behind native disclosures. */}
        <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Salesforce data migration questions</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        <SourcesDialog
          id="docs"
          title="Where these limits come from"
          intro={`Every tool limit and feature on this page is Salesforce's own documentation, read by a person at OneAlgorithm on ${READ_ON}. The pages are listed here.`}
          sources={DOCS}
        />
      </SfPage>
    </Layout>
  );
}
