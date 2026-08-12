import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Briefcase,
  Database,
  Zap,
  LifeBuoy,
  TrendingUp,
  Shield,
  Users,
  Target,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  ProcessSteps,
  PrimaryCTA,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Oracle ERP - 2026 refresh; copy rewritten 2026-08-12.
 *
 * The copy pass replaced the category filler ("Business Transformation -
 * Optimize processes and unlock new capabilities to drive competitive
 * advantage") with what the work is: the sequencing decisions, the trial loads,
 * the reconciliation, the first month-end. An ERP buyer has been read the
 * generic version by every firm they have met; the specifics are the only thing
 * that distinguishes anyone.
 *
 * "Oracle-certified experts" was dropped. Nothing in this repository names an
 * Oracle certification - shared/capabilities-data.ts lists Salesforce platform
 * expertise and nothing equivalent for Oracle - and it is not a claim to make
 * on the strength of a page that already said it. TKTK: if individual Oracle
 * certifications exist, name them and the claim can come back.
 *
 * Kept because the repository supports them: the 30-90 day Hypercare window,
 * Oracle Integration Cloud, the Financials/SCM/HCM module set, and 24/7 support
 * across time zones.
 *
 * The structural changes from the earlier presentation-only pass:
 *
 *  1. The four pillars no longer hide their detail behind a click. The old
 *     accordion was a plain <div> card with an onClick - not focusable, not
 *     keyboard operable, no aria state - and it buried the specifics a buyer
 *     is actually scanning for. All five bullets per pillar now render inline.
 *  2. The frosted "Enterprise-Grade Expertise" hero panel is gone; it restated
 *     the bullets beside it in a decorative box.
 *  3. The mid-page CTA is a dark band rather than a white card with an orange
 *     left rule, so it reads as a break in the page rather than a stray widget.
 */

const PILLARS = [
  {
    icon: Briefcase,
    title: "Before the project starts",
    description:
      "We map the processes you run today, decide which survive the move and which get changed, and put a date and a cost against each phase. Most of the risk in an ERP programme is decided here, months before anyone configures anything.",
    details: [
      "Current process mapped, including the workarounds nobody documents",
      "Which modules go live in phase one, and which can wait",
      "A timeline built backwards from the cutover date",
      "Where this is likely to go wrong, written down early",
      "A cost you can take to a board",
    ],
  },
  {
    icon: Zap,
    title: "Configuration and rollout",
    description:
      "Financials, Supply Chain and Human Capital Management, configured to the chart of accounts and the approval rules you actually use — plus the training, because an ERP nobody can operate is an expensive ledger.",
    details: [
      "Oracle Financials: ledger, payables, receivables, fixed assets",
      "Supply Chain: procurement, inventory, order management",
      "Human Capital Management: core HR and payroll interfaces",
      "Training built around each team's daily tasks, not the module list",
      "A cutover plan, rehearsed before the weekend that counts",
    ],
  },
  {
    icon: Database,
    title: "Data migration and integration",
    description:
      "Getting years of records out of the old system, agreeing what comes across, and proving the balances still match afterwards. Then Oracle Integration Cloud connections to whatever you're keeping.",
    details: [
      "Extract and profile legacy data before agreeing what moves",
      "Cleanse, map and dedupe; agree in writing what gets dropped",
      "Oracle Integration Cloud (OIC) connections to third-party systems",
      "Trial loads — more than one — before the real one",
      "Balances reconciled against the old ledger after cutover",
    ],
  },
  {
    icon: LifeBuoy,
    title: "After go-live",
    description:
      "Hypercare, typically 30-90 days, covering the first month-end on the new system. That period is when the things nobody thought of show up, so it's the part we don't shorten.",
    details: [
      '"Hypercare" following go-live, typically 30-90 days',
      "The first month-end and quarter-end run with us on hand",
      "Performance tuning once real transaction volumes arrive",
      "User support and ticket resolution",
      "Documentation your own team can maintain without us",
    ],
  },
];

const BENEFITS = [
  {
    icon: Target,
    title: "We'll argue about the date early",
    description:
      "ERP dates slip because someone agreed to one before the data was profiled. We'd rather have that argument in week two than in month nine, when it costs a quarter.",
  },
  {
    icon: TrendingUp,
    title: "Fewer modules, sooner",
    description:
      "A phase one that goes live beats a phase one that keeps growing. We'll push back on scope, including scope that would have been ours to bill.",
  },
  {
    icon: Shield,
    title: "The cutover is rehearsed",
    description:
      "Trial loads and a dry-run cutover before the weekend that counts. The first time you do this should not be the time that matters.",
  },
  {
    icon: Users,
    title: "The same people at month-end",
    description:
      "Whoever configured your ledger is who picks up the phone when the first close goes sideways. No handoff to a support desk that wasn't in the room.",
  },
];

const PROCESS = [
  {
    title: "Discovery",
    body: "We sit with finance, procurement and HR separately, because each will describe a different version of the same process — and the differences are the project.",
  },
  {
    title: "Plan",
    body: "Modules, phases, dates and the cutover weekend, worked backwards from your financial calendar rather than forwards from today.",
  },
  {
    title: "Build and migrate",
    body: "Configuration, integrations, trial data loads and training, in cycles short enough that you can see it and object.",
  },
  {
    title: "Go-live and after",
    body: "Cutover, then Hypercare through the first month-end. Then ongoing support, 24/7 across the time zones you operate in.",
  },
];

export default function OracleERP() {
  useSEO({
    title: "OneAlgorithm — Oracle ERP Implementation Services",
    description:
      "Oracle Cloud ERP implementation: Financials, SCM and HCM configuration, legacy data migration reconciled before cutover, Oracle Integration Cloud connections, and Hypercare through the first month-end.",
    canonical: getCanonicalUrl("/services/oracle-erp"),
    keywords:
      "Oracle ERP implementation, Oracle Cloud ERP, Oracle Financials, Oracle SCM, Oracle HCM, ERP data migration, Oracle integration, enterprise resource planning",
    ogTitle: "OneAlgorithm — Oracle ERP Implementation Services",
    ogDescription:
      "Oracle Cloud ERP implementation: Financials, SCM and HCM configuration, data migration reconciled before cutover, OIC integrations, and Hypercare through the first month-end.",
    ogUrl: getCanonicalUrl("/services/oracle-erp"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Oracle ERP Implementation - OneAlgorithm",
    twitterDescription:
      "Financials, SCM and HCM configuration, data migration reconciled before cutover, OIC integrations, and Hypercare through the first month-end.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Oracle ERP Implementation Services",
          "Oracle Cloud ERP implementation covering Financials, Supply Chain and Human Capital Management configuration, legacy data migration and reconciliation, Oracle Integration Cloud connections, cutover, and Hypercare support after go-live.",
          "Oracle ERP Implementation",
          "https://onealgorithm.com/services/oracle-erp",
        )}
      />

      <PageHero
        eyebrow="Oracle ERP"
        title={
          <>
            Oracle Cloud ERP{" "}
            <span className="text-oa-orange">implementation</span>
          </>
        }
        lede="We configure Financials, SCM and HCM, move the data off whatever you run now, connect what's left with Oracle Integration Cloud, and stay through the first month-end — which is when an ERP tells you what it really thinks of your data."
        panel={{
          title: "What that involves",
          items: [
            "Financials, SCM and HCM configuration",
            "Legacy data migrated, then reconciled against the old ledger",
            "Oracle Integration Cloud connections to the systems you keep",
            "A cutover rehearsed before the real one",
            "Hypercare after go-live, typically 30-90 days",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="What an ERP implementation actually involves"
          lede="Most clients take all four. If you have a team already and only need the migration, take that one — we'd rather do a piece well than pad the scope."
        />
        <CardGrid columns={2} className="mt-12">
          {PILLARS.map((p) => (
            <Card
              key={p.title}
              icon={p.icon}
              title={p.title}
              body={p.description}
            >
              <div className="mt-6">
                <CheckList items={p.details} />
              </div>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Four things we'll be straight with you about"
          lede="ERP programmes fail slowly and in public. These are the habits that make that less likely, and each one costs us something."
        />
        <CardGrid columns={4} className="mt-12">
          {BENEFITS.map((b) => (
            <Card
              key={b.title}
              icon={b.icon}
              title={b.title}
              body={b.description}
            />
          ))}
        </CardGrid>
      </Section>

      <Section tone="night" grid compact>
        <SectionHeading
          tone="dark"
          title="Not sure you need a whole implementation?"
          lede="Plenty of Oracle complaints are configuration, not a project — an approval chain nobody can change, a report that takes two days to produce, a close that drags. Tell us the symptom and we'll tell you which one it is."
        />
        <div className="mt-9">
          <PrimaryCTA to="/contact">Talk to an Expert</PrimaryCTA>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Process"
          title="How the work runs"
          lede="Four phases. The first two decide whether the last two go well, which is why we spend longer on them than clients expect."
        />
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      <CTABand
        title="Tell us where the ERP hurts"
        body="A close that takes two weeks, a migration that stalled halfway, or a decision about Oracle you haven't made yet. We'll tell you what we'd do and roughly what it costs."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare
          title="Oracle ERP Implementation Services - OneAlgorithm"
          className="justify-center"
        />
      </Section>
    </Layout>
  );
}
