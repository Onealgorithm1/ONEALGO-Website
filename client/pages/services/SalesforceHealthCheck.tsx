import Layout from "../../components/Layout";
import { PartnerBadge } from "./SalesforceCity";
import SocialShare from "../../components/SocialShare";
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
import { SF_CERTIFIED_PEOPLE, SF_PROOF_LINE } from "../../data/salesforceProof";

/* Salesforce health check — the entry offer, given its own page 2026-10-23
 * (sf audit + redesign, onealgo-icm-oa areas/sales/runs/2026-10-23_sf-audit).
 *
 * DEMAND: "salesforce health check" ~500/mo US (Keyword Planner, 4 years,
 * runs/2026-10-21_sf-nationwide/demand/kp-findings.md). The results page is
 * consultancy service pages, so the intent is commercial. Search Console
 * already shows "salesforce optimization services / consultant / solutions"
 * reaching the hub at positions 47-70 with no page that matches them.
 *
 * OFFER: the same free one-week review the hub has offered since 2026-08-24;
 * the five areas are the hub's REVIEW_CHECKS. ⛔ No price, SLA or result
 * figure is stated anywhere: none is published or evidenced.
 *
 * FACTS (checked 2026-10-23): Workflow Rules and Process Builder end of
 * support 2025-12-31; Optimizer retired during 2026 (Winter '26 on Hyperforce,
 * later elsewhere); Org Check from Salesforce Labs is the usual replacement.
 * Sources are linked at the foot of the page.
 *
 * FAQ phrasings are real autocomplete (hub /api/suggest, 2026-10-23): "what is
 * salesforce health check", "how to run salesforce health check", "salesforce
 * health check vs optimizer", "how long does a health check take",
 * "salesforce org health assessment". ⛔ Not repeated on sibling pages. */

const AREAS = [
  {
    title: "Licences and edition",
    body: "What you pay for against what is in use: inactive users still holding licences, add-ons nobody opened, and an edition chosen before the team knew what it needed.",
  },
  {
    title: "Data",
    body: "Duplicates, required fields filled with junk to get past validation, and the reports people quietly rebuild in a spreadsheet because they do not trust them.",
  },
  {
    title: "Automation",
    body: "Steps still done by hand that Flow should be doing, and any Workflow Rules or Process Builder processes still running. Salesforce ended support for both on December 31, 2025.",
  },
  {
    title: "Permissions",
    body: "Who can see and export what, and where profiles are doing a permission set's job. We start from Salesforce's own Health Check score and go further than security settings.",
  },
  {
    title: "Integrations",
    body: "What syncs, what fails without telling anyone, and which integration users hold more access than the job needs.",
  },
];

const STEPS = [
  {
    title: "Tell us the symptom",
    body: "Reports nobody trusts, a renewal you are unsure about, automation nobody dares touch. A call or the form is enough to start.",
  },
  {
    title: "A week in your org",
    body: "You give us a login that can read your setup. We work through the five areas above against how your team actually uses Salesforce.",
  },
  {
    title: "A written, ranked list",
    body: "What we found, why it matters, and what fixing it involves, ordered by what to do first. We walk you through it on a call.",
  },
  {
    title: "You decide what happens next",
    body: "Act on it with us, with your own admin, or not at all. If the org is basically fine, we say so.",
  },
];

const COMPARE: [string, string, string][] = [
  ["What it looks at", "Security settings only, against a baseline", "Licences, data, automation, permissions and integrations"],
  ["Who runs it", "Your admin, from Setup", "Us, over one week"],
  ["How long", "Minutes", "One week"],
  ["What you get", "A score, with each setting marked by risk", "A written list ranked by what to fix first"],
  ["Cost", "Included in Salesforce", "Free"],
];

const FAQS = [
  {
    q: "What is the Salesforce Health Check?",
    a: "A tool built into Salesforce Setup that compares your org's security settings with a baseline, either Salesforce's Baseline Standard or one you import, and gives a score with each setting marked by risk. It covers security settings only. It does not look at your data, automation, licences or integrations.",
  },
  {
    q: "How do I run Salesforce Health Check?",
    a: "In Setup, type Health Check in the Quick Find box and open it. You need the View Setup and Configuration permission. Settings that miss the baseline can be changed one by one, and many can be moved to the baseline value with Fix Risks.",
  },
  {
    q: "Salesforce Health Check or Optimizer: which should I use?",
    a: "Health Check reviews security settings and is still in Setup. Optimizer reviewed how the org was built, and Salesforce retired it during 2026, starting with Hyperforce orgs in the Winter '26 release. Org Check, a free Salesforce Labs app, is what many admins use in its place.",
  },
  {
    q: "How long does a Salesforce org health check take?",
    a: "Ours takes one week. Salesforce's built-in Health Check takes minutes because it reads security settings only.",
  },
  {
    q: "What does a Salesforce org health assessment include?",
    a: "Ours covers five areas: licences and edition, data, automation, permissions and integrations. You get a written list of what we found, why it matters and what fixing it involves, ranked by what to do first.",
  },
];

const SOURCES = [
  { label: "Salesforce Help: Health Check", href: "https://help.salesforce.com/s/articleView?id=sf.security_health_check.htm&type=5" },
  { label: "Salesforce Ben: end of support for Workflow Rules and Process Builder", href: "https://www.salesforceben.com/salesforce-announces-end-of-support-for-workflow-rules-process-builder/" },
  { label: "Trailblazer Community: Optimizer retirement notice", href: "https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000mlut50AA" },
];

const RELATED = [
  { title: "Salesforce consulting", to: "/services/salesforce", body: "How our Salesforce work runs, end to end." },
  { title: "Salesforce managed services", to: "/services/salesforce-managed-services", body: "Weekly admin and development after the fixes." },
  { title: "Salesforce data migration", to: "/services/salesforce-data-migration", body: "When the review finds data worth moving or cleaning." },
  { title: "Salesforce integration: SAP and ERP", to: "/services/salesforce-integration", body: "When the review finds syncs that fail quietly." },
  { title: "What Salesforce implementation costs", to: "/services/salesforce-implementation-cost", body: "How fixes and new work fit a budget." },
  { title: "Salesforce consultant, Philadelphia", to: "/services/salesforce-consultant-philadelphia", body: "For firms near our Malvern office." },
];

const link = "text-oa-blue underline underline-offset-4";

export default function SalesforceHealthCheck() {
  useSEO({
    title: "Salesforce Health Check: Free One-Week Org Review | OneAlgorithm",
    description:
      "A free one-week Salesforce org health check: licences, data, automation, permissions and integrations, ranked by what to fix first.",
    canonical: getCanonicalUrl("/services/salesforce-health-check"),
    ogTitle: "Salesforce Health Check — OneAlgorithm",
    ogDescription:
      "One week inside your Salesforce org, then a written list of what to fix first. Free, and the list is yours.",
    ogUrl: getCanonicalUrl("/services/salesforce-health-check"),
    ogImage: "https://onealgorithm.com/media/salesforce/og-salesforce-health-check.jpg",
    ogImageSize: [1200, 630],
    twitterTitle: "Salesforce Health Check — OneAlgorithm",
    twitterDescription:
      "A free one-week Salesforce org health check, ranked by what to fix first.",
    twitterImage: "https://onealgorithm.com/media/salesforce/og-salesforce-health-check.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Health Check",
          "A free one-week review of a Salesforce org covering licences and edition, data quality, automation including Workflow Rules and Process Builder still in use, permissions and integrations, delivered as a written list ranked by what to fix first.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce-health-check",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Salesforce health check"
        title={
          <>
            Salesforce health check:{" "}
            <span className="text-oa-orange">a free week inside your org</span>
          </>
        }
        lede="We review your Salesforce org for one week and hand you a written list of what is costing you money, time or trust in your data, ranked by what to fix first. It costs nothing, and the list is yours to act on with us, your own admin, or nobody."
        panel={{
          title: "Salesforce's record of us",
          items: [
            `${SF_CERTIFIED_PEOPLE} Salesforce-certified people`,
            SF_PROOF_LINE,
            "Listed AppExchange Consulting Partner",
            "Office in Malvern, PA",
          ],
        }}
        primary={{ label: "Book the free health check", to: "/contact?need=salesforce" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <Section tone="paper" compact>
        <PartnerBadge />
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What the week looks at"
          title="Five areas, checked against how your team works"
          lede="The same five every time, so nothing depends on what we happen to notice."
        />
        <dl className="mt-12">
          {AREAS.map((a) => (
            <Reveal key={a.title}>
              <div className="border-t border-oa-hairlineStrong py-7 md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14">
                <dt className="text-lg font-semibold text-oa-ink">{a.title}</dt>
                <dd className="mt-2 leading-relaxed text-oa-ink2 md:mt-0">{a.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="How it runs" title="From first call to a list you can act on" />
        <div className="mt-12">
          <ProcessSteps steps={STEPS} />
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Two different checks"
          title="Salesforce's Health Check tool, or a full org review?"
          lede="Run Salesforce's own check first; it is free and takes minutes. A review covers what it cannot see."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="sr-only">Salesforce Health Check compared with a one-week org review</caption>
            <thead>
              <tr className="border-b border-oa-hairlineStrong">
                <td className="py-3 pr-6" />
                <th scope="col" className="py-3 pr-6 font-semibold text-oa-ink">Salesforce Health Check</th>
                <th scope="col" className="py-3 font-semibold text-oa-ink">One-week org review</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([row, tool, review]) => (
                <tr key={row} className="border-b border-oa-hairline align-top">
                  <th scope="row" className="py-4 pr-6 font-medium text-oa-ink3">{row}</th>
                  <td className="py-4 pr-6 leading-relaxed text-oa-ink2">{tool}</td>
                  <td className="py-4 leading-relaxed text-oa-ink">{review}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Why now" title="Two Salesforce changes most orgs have not caught up with" />
        <Prose className="mt-8">
          <p>
            Salesforce ended support for Workflow Rules and Process Builder on
            December 31, 2025. Automation built with them still runs, but bugs
            are no longer fixed and Salesforce support will not help when it
            breaks. The review lists every one still active, with what moving
            it to Flow involves.
          </p>
          <p>
            Salesforce also retired Optimizer during 2026, the free app that
            scanned how an org was built. Org Check, a free Salesforce Labs
            app, covers part of that gap. The review covers the rest, because
            it looks at how your team uses the org as well as how it is built.
          </p>
          <p>
            If the review finds work worth doing, it usually becomes a short
            project followed by{" "}
            <a className={link} href="/services/salesforce-managed-services">managed services</a>.
            For how that fits a budget, see{" "}
            <a className={link} href="/services/salesforce-implementation-cost">what Salesforce implementation costs</a>.
          </p>
        </Prose>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="Questions" title="What people ask about Salesforce health checks" />
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
        <div className="mt-14 border-t border-oa-hairline pt-6 text-sm text-oa-ink3">
          <p className="font-semibold text-oa-ink2">Sources, checked October 2026</p>
          <ul className="mt-3 space-y-2">
            {SOURCES.map((s) => (
              <li key={s.href}>
                <a className={link} href={s.href} rel="noopener" target="_blank">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="paper" bordered>
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
        title="Find out what your Salesforce is costing you"
        body="Tell us the symptom and we will tell you what the week would look at first. Free, and the written list is yours to keep."
        primary={{ label: "Book the free health check", to: "/contact?need=salesforce" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />
    </Layout>
  );
}
