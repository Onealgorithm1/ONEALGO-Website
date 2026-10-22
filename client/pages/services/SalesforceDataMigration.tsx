import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Database, FileSearch, ShieldCheck, Repeat } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  ProcessSteps,
  Prose,
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

/* Salesforce data migration — nationwide service page. Added 2026-10-21
 * (sf-seo-wave-2026-10-22), one of four: data migration / integration /
 * managed services / Marketing Cloud.
 *
 * DEMAND: "salesforce data migration" ~500/mo US, Keyword Planner bucket
 * (onealgo-icm-oa/areas/sales/runs/2026-10-21_sf-nationwide/demand/kp-findings.md).
 *
 * ⛔ PROOF IS PATTERNS, NEVER A NAMED CUSTOMER. Every delivery claim below
 * comes from one of two notes and the client is unnamed in both on purpose:
 *   - salesforce-delivery-evidence-2026-09-01.md — invoiced, paid work
 *     packages "QuickBase Migration" and "Kissflow Migration to SFDC".
 *   - deepak-fundmate-automation-2026-09-22.md — ongoing weekly Salesforce
 *     work for "a lending company" since April 2026: 14.6k-lead backfill,
 *     9,665 records moved, TCPA do-not-call scrub, 100k email pulls.
 *     ⛔ Never name the lender.
 * ⛔ No timelines, prices, record-count promises or success rates. Cost
 * questions go to /services/salesforce-implementation-cost.
 */

const PROBLEMS = [
  {
    icon: FileSearch,
    title: "Off a no-code tool",
    body: "Apps built in QuickBase or Kissflow hold years of records in a shape that made sense to whoever built them. We have moved both onto Salesforce, and the work is mostly deciding what each table really is before any row moves.",
  },
  {
    icon: Database,
    title: "Another CRM, or another org",
    body: "HubSpot, Zoho, Dynamics, or a second Salesforce org left over from an acquisition. Same job underneath: map objects and owners, keep the history that matters, and drop the duplicates on the way in rather than after.",
  },
  {
    icon: Repeat,
    title: "Bulk jobs inside a live org",
    body: "Not every migration is a launch. Backfilling thousands of leads, moving records between objects, or pulling a large email set out for another system all need the same care, because users are working in the org while it runs.",
  },
  {
    icon: ShieldCheck,
    title: "Data that carries a legal duty",
    body: "Consent and do-not-call flags have to arrive intact. We have run a TCPA do-not-call scrub as part of lead data work for a lender, and we treat suppression fields as the first thing to test, not the last.",
  },
];

/* A real sequence, so numbered steps are honest here (web-build banlist:
   numbering only when the content is a sequence). */
const STEPS = [
  {
    title: "Inventory the source",
    body: "Every table, field and attachment, with a row count and a note on who still uses it. Fields nobody has filled in years are flagged so you can decide to leave them behind.",
  },
  {
    title: "Map to the Salesforce data model",
    body: "Source fields to standard and custom objects, picklist values to picklist values, users to owners. Relationships are the hard part, so parent records and their external IDs are planned before anything loads.",
  },
  {
    title: "Load into a sandbox first",
    body: "A full trial run against a sandbox, with record counts reconciled object by object and a sample checked by the people who know the data. Automation that would fire on insert is identified and paused for the load.",
  },
  {
    title: "Cut over and reconcile",
    body: "The production load runs in a planned window, counts are reconciled again, and the source is set read-only rather than deleted, so anything questioned later can be checked against the original.",
  },
];

/* Questions are real autocomplete phrasings from
   areas/sales/runs/2026-10-21_sf-nationwide/gaps/questions.json
   ("what is salesforce data migration", "can i export data from salesforce",
   "data migration from salesforce to salesforce" / "migrate data from one org
   to another", "data migration tools for salesforce").
   ⛔ Not repeated on the other three pages of this wave. */
const FAQS = [
  {
    q: "What is Salesforce data migration?",
    a: "Moving records from somewhere else into Salesforce, or from one Salesforce org into another, so they arrive in the right objects with their relationships, owners and history intact. The copying is the small part. Most of the effort is the mapping before it and the reconciliation after it.",
  },
  {
    q: "Can I export data from Salesforce?",
    a: "Yes. Salesforce has a built-in Data Export Service that produces a weekly or monthly set of CSV files, and Data Loader can export any object you have access to on demand. Both are documented in Salesforce's own help. Your data is yours to take out, and a migration plan should include a full export before any load begins, as a backup.",
  },
  {
    q: "Can you migrate data from one Salesforce org to another?",
    a: "Yes, and it is more common than people expect, usually after a merger or when a business unit was given its own org years ago. The objects may share names but rarely share fields, picklist values or record IDs, so it is planned the same way as any other migration, with external IDs used to rebuild the relationships.",
  },
  {
    q: "Which tools are used for Salesforce data migration?",
    a: "For small, simple loads Salesforce's Data Import Wizard is enough. For larger volumes or objects the wizard does not support, Data Loader, which can use Salesforce's Bulk API for large volumes. We pick by the size and shape of the data, not by a favourite tool, and the choice matters less than the mapping and testing around it.",
  },
];

const RELATED = [
  { title: "Salesforce consulting", to: "/services/salesforce", body: "How our Salesforce work runs, end to end." },
  { title: "Salesforce integration: SAP and ERP", to: "/services/salesforce-integration", body: "When the data should keep flowing after it lands." },
  { title: "Salesforce managed services", to: "/services/salesforce-managed-services", body: "Ongoing admin and development after go-live." },
  { title: "Marketing Cloud consulting", to: "/services/salesforce-marketing-cloud-consulting", body: "Email, journeys and the data feeding them." },
  { title: "What Salesforce implementation costs", to: "/services/salesforce-implementation-cost", body: "Where the money goes, including migration." },
  { title: "Salesforce consultant, Philadelphia", to: "/services/salesforce-consultant-philadelphia", body: "For firms near our Malvern office." },
];

const link = "text-oa-blue underline underline-offset-4";

export default function SalesforceDataMigration() {
  useSEO({
    title: "Salesforce Data Migration Consultants | OneAlgorithm",
    description:
      "Salesforce data migration from QuickBase, Kissflow, other CRMs or another org, by a listed Consulting Partner.",
    canonical: getCanonicalUrl("/services/salesforce-data-migration"),
    ogTitle: "Salesforce Data Migration — OneAlgorithm",
    ogDescription:
      "Moving records into Salesforce from no-code tools, other CRMs or another org, with sandbox trial loads and reconciled counts.",
    ogUrl: getCanonicalUrl("/services/salesforce-data-migration"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Salesforce Data Migration — OneAlgorithm",
    twitterDescription:
      "Salesforce data migration from QuickBase, Kissflow, other CRMs or another org, by a listed Consulting Partner.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Data Migration",
          "Data migration into Salesforce from no-code platforms such as QuickBase and Kissflow, from other CRMs, and between Salesforce orgs: source inventory, data-model mapping, sandbox trial loads, production cutover and record reconciliation. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce-data-migration",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Salesforce data migration"
        title={
          <>
            Salesforce data migration,{" "}
            <span className="text-oa-orange">reconciled row by row</span>
          </>
        }
        lede="We move records into Salesforce from no-code tools, other CRMs and other Salesforce orgs, and we prove the counts match before anyone switches the old system off."
        panel={{
          title: "Salesforce's record of us",
          items: [
            "16 Salesforce-certified people",
            "52 certifications, 38 on Platform",
            "Listed AppExchange Consulting Partner",
            "Free one-week review of your org",
          ],
        }}
        primary={{ label: "Get a free org review", to: "/contact?need=salesforce" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Where the data is coming from"
          title="Four kinds of migration we are asked for"
          lede="The source changes. The risk is always the same one: records that arrive but no longer mean what they meant."
        />
        <CardGrid columns={2} className="mt-12">
          {PROBLEMS.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="How it runs"
          title="The order we do it in"
          lede="Nothing touches production until a full trial load has reconciled in a sandbox."
        />
        <div className="mt-12">
          <ProcessSteps steps={STEPS} />
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="What we have done" title="Migrations are not a side line here" />
        <Prose className="mt-8">
          <p>
            Our invoiced Salesforce work includes moving a business off QuickBase,
            in more than one phase, and moving another set of processes off
            Kissflow. Both are no-code platforms where the structure grew one
            form at a time, so the first job each time was working out which
            tables were live and which were history.
          </p>
          <p>
            Inside live orgs we run the bulk jobs that keep data useful: a
            14,600-lead backfill, a move of 9,665 records between objects, a
            do-not-call scrub across a lead base, and email pulls of up to
            100,000 records, all for a lending company we support every week. These
            are the jobs where a trigger or flow firing on every record can do
            real damage, so automation is reviewed before the load, not after.
          </p>
          <p>
            For the mechanics, Salesforce documents its own tools well: the{" "}
            <a className={link} href="https://help.salesforce.com/s/articleView?id=sf.data_import_wizard.htm&type=5" target="_blank" rel="noopener noreferrer">Data Import Wizard</a>,{" "}
            <a className={link} href="https://help.salesforce.com/s/articleView?id=sf.exporting_data.htm&type=5" target="_blank" rel="noopener noreferrer">exporting data with Data Loader</a>{" "}
            and the{" "}
            <a className={link} href="https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_intro.htm" target="_blank" rel="noopener noreferrer">Bulk API 2.0</a>{" "}
            that large loads run on. Trailhead's{" "}
            <a className={link} href="https://trailhead.salesforce.com/content/learn/modules/lex_implementation_data_management" target="_blank" rel="noopener noreferrer">importing and exporting data module</a>{" "}
            is a fair introduction if you want to understand the moving parts
            before you talk to anyone.
          </p>
          <p>
            The part most plans underestimate is cleanup. Duplicate accounts,
            contacts with no owner, and picklists with six spellings of the same
            value all load perfectly well, and then sit in Salesforce making
            every report wrong. We would rather spend a day agreeing the merge
            rules with you before the load than a month cleaning up after it.
          </p>
          <p>
            If the old system has to keep running alongside Salesforce, that is
            an integration rather than a one-off move; see{" "}
            <a className={link} href="/services/salesforce-integration">Salesforce integration</a>.
            Budgeting for the migration as part of a wider project is covered on{" "}
            <a className={link} href="/services/salesforce-implementation-cost">what Salesforce implementation costs</a>.
          </p>
        </Prose>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="What people ask about moving data" />
        <div className="mt-12 space-y-10">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <div className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
                <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                <p className="mt-3 leading-relaxed text-oa-ink2 md:mt-0">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="Related" title="Other Salesforce work" />
        <CardGrid columns={3} className="mt-12">
          {RELATED.map((r) => (
            <Card key={r.to} title={r.title} body={r.body} to={r.to} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand
        title="Tell us what you are moving"
        body="Name the source system and roughly how much is in it. We will tell you what we would check first, and the one-week org review is free if the data is already in Salesforce."
        primary={{ label: "Get a free org review", to: "/contact?need=salesforce" }}
        secondary={{ label: "How the work runs", to: "/services/salesforce" }}
      />
    </Layout>
  );
}
