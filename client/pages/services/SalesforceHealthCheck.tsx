import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PartnerBadge } from "./SalesforceCity";
import { SalesforceRecordCard } from "../../components/SalesforceRecordCard";
import {
  PageHero,
  Section,
  SectionHeading,
  ProcessSteps,
  CTABand,
  Reveal,
  PrimaryCTA,
  SecondaryCTA,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
} from "../../components/StructuredData";

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
 * figure is stated anywhere: none is published or evidenced. ⛔ No "most
 * orgs", "many admins" or "usually": we hold no data for any of them.
 *
 * FACTS (checked 2026-10-23): Workflow Rules and Process Builder end of
 * support 2025-12-31. Optimizer: Salesforce's notice retires it for Hyperforce
 * orgs in Winter '26 (released autumn 2025) and for the rest in Summer '26;
 * Org Check is a free Salesforce Labs app. Sources linked at the foot.
 *
 * FAQ phrasings are real autocomplete (hub /api/suggest, 2026-10-23): "what is
 * salesforce health check", "how to run salesforce health check", "salesforce
 * health check vs optimizer", "how long does a health check take",
 * "salesforce org health assessment". ⛔ Not repeated on sibling pages.
 *
 * Revised after a fresh-critic pass the same day: one offer name everywhere,
 * the hub's verification card in the hero, the reason to act under the hero,
 * a call to action under the comparison, no six-card grid at the foot. */

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
    body: "Steps still done by hand that Flow should be doing, and every Workflow Rule or Process Builder process still active, with what moving it to Flow involves.",
  },
  {
    title: "Permissions",
    body: "Who can see and export what, and where profiles are doing a permission set's job. We start from Salesforce's own Health Check score and go beyond security settings.",
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
    body: "You create a user that can read your setup and records. We work through the five areas against how your team actually uses Salesforce.",
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
    a: "Health Check reviews security settings and is still in Setup. Optimizer reviewed how the org was built; Salesforce's notice retired it for Hyperforce orgs in the Winter '26 release and for all other orgs in Summer '26. Salesforce Labs offers a free app, Org Check, that covers some of the same ground.",
  },
  {
    q: "How long does a Salesforce org health check take?",
    a: "Ours takes one week. Salesforce's built-in Health Check takes minutes because it reads security settings only.",
  },
  {
    q: "What does a Salesforce org health assessment include?",
    a: "Ours covers five areas: licences and edition, data, automation, permissions and integrations. You get a written list of what we found, why it matters and what fixing it involves, ranked by what to do first.",
  },
  {
    q: "Why is the health check free?",
    a: "Because it lets you see how we work on your own org before you spend anything. If the list leads to work, we quote that work separately. If it does not, the week cost you nothing and the list is still yours.",
  },
  {
    q: "What access do you need for the week?",
    a: "A Salesforce user that can view your setup and read your records, usually with the View Setup and Configuration permission. A review only reads, so nothing in your org needs to change, and you can deactivate the user when the week ends.",
  },
];

const SOURCES = [
  { label: "Salesforce Help: Health Check", href: "https://help.salesforce.com/s/articleView?id=sf.security_health_check.htm&type=5" },
  { label: "Trailblazer Community: Optimizer retirement notice", href: "https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000mlut50AA" },
  { label: "Salesforce Ben: end of support for Workflow Rules and Process Builder", href: "https://www.salesforceben.com/salesforce-announces-end-of-support-for-workflow-rules-process-builder/" },
];

const NEXT = [
  { to: "/services/salesforce-managed-services", label: "Salesforce managed services", body: "Weekly admin and development once the fixes are in." },
  { to: "/services/salesforce-data-migration", label: "Salesforce data migration", body: "When the review finds data worth moving or cleaning." },
  { to: "/services/salesforce-implementation-cost", label: "What Salesforce implementation costs", body: "How fixes and new work fit a budget." },
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
        lede="One week in your Salesforce org, then a written list of what is costing you money, time or trust in your data, ranked by what to fix first. Free, and the list is yours."
        panel={{ title: "Salesforce's record of us", items: [], slot: <SalesforceRecordCard /> }}
        primary={{ label: "Book a free health check", to: "/contact?need=salesforce" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        meta={[
          { label: "Office", value: "Malvern, PA" },
          { label: "Works with", value: "teams across the U.S." },
        ]}
        siblings={false}
      />

      <Section tone="night" bordered>
        <SectionHeading
          tone="dark"
          eyebrow="Why now"
          title="Two Salesforce changes worth checking your org for"
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="text-lg font-semibold text-oa-nightInk">Workflow Rules and Process Builder</h3>
            <p className="mt-3 leading-relaxed text-oa-nightInk2">
              Salesforce ended support for both on December 31, 2025. Automation
              built with them still runs, but bugs are no longer fixed and
              Salesforce support will not help when it breaks. The review lists
              every one still active, with what moving it to Flow involves.
            </p>
          </Reveal>
          <Reveal>
            <h3 className="text-lg font-semibold text-oa-nightInk">Optimizer is gone</h3>
            <p className="mt-3 leading-relaxed text-oa-nightInk2">
              Salesforce retired Optimizer, the free app that scanned how an org
              was built, between the Winter '26 and Summer '26 releases. The
              review covers what it used to show, and how your team uses the
              org as well as how it is built.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryCTA to="/contact?need=salesforce">Book a free health check</PrimaryCTA>
          <SecondaryCTA href="tel:+16108909711">Call (610) 890-9711</SecondaryCTA>
        </div>
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
          lede="Run Salesforce's own check first; it is free and takes minutes. The review covers what it cannot see."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="sr-only">Salesforce Health Check compared with a one-week org review</caption>
            <thead>
              <tr className="border-b border-oa-hairlineStrong">
                <td className="py-3 pr-6" />
                <th scope="col" className="py-3 pr-6 font-semibold text-oa-ink">Salesforce Health Check</th>
                <th scope="col" className="py-3 font-semibold text-oa-ink">Our free health check</th>
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
        <div className="mt-10 flex flex-col gap-4 border-t border-oa-hairlineStrong pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-oa-ink">Ran Salesforce's Health Check already? The week covers the rest.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryCTA to="/contact?need=salesforce">Book a free health check</PrimaryCTA>
            <SecondaryCTA tone="light" href="tel:+16108909711">Call (610) 890-9711</SecondaryCTA>
          </div>
        </div>
      </Section>

      <Section tone="paper">
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

      <Section tone="surface" bordered compact>
        <SectionHeading eyebrow="After the review" title="Where the list can lead" />
        <ul className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-3">
          {NEXT.map((l) => (
            <li key={l.to} className="border-t border-oa-hairlineStrong pt-5">
              <Link to={l.to} className="text-lg font-semibold text-oa-ink underline decoration-oa-hairlineStrong underline-offset-4 hover:decoration-oa-orange">
                {l.label}
              </Link>
              <p className="mt-2 leading-relaxed text-oa-ink2">{l.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <PartnerBadge />
        </div>
      </Section>

      <CTABand
        title="Find out what your Salesforce is costing you"
        body="Tell us the symptom and we will tell you what the week would look at first. Free, and the written list is yours to keep."
        primary={{ label: "Book a free health check", to: "/contact?need=salesforce" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />
    </Layout>
  );
}
