import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Calculator, MapPin, ShieldQuestion, Layers, Phone, TrendingDown } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Split,
  PrimaryCTA,
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

/* Salesforce consulting — Chester County. Added 2026-09-01. Second of three.
 * Read the header of SalesforceConsultantPhiladelphia.tsx first: it carries the
 * strategy, the doorway-page rule and the no-town-list rule for all three.
 *
 * THIS PAGE'S DISTINCT JOB: the buyer who has NOT bought yet, or who has
 * outgrown a spreadsheet and is being quoted an edition they may not need.
 * Philadelphia gets the already-own-it buyer; Pennsylvania gets the
 * what-is-a-partner buyer. ⛔ Do not let the three converge.
 *
 * ⭐ WHY THE PRICE TABLE IS ON THIS PAGE AND NOWHERE ELSE. "How much does
 * Salesforce cost for a small company?" is a live Google People-Also-Ask
 * question (observed 2026-08-31), and cost questions were the single most
 * repeated group in the whole harvest. Louis's constraint, 2026-09-01: "we
 * can't be tied down to pricing. It all varies... I don't wanna mess this up or
 * steer people the wrong way."
 *
 * The resolution: EVERY FIGURE BELOW IS SALESFORCE'S OWN PUBLISHED LIST PRICE,
 * not ours, and the licence half of the cost genuinely IS knowable arithmetic —
 * seats times edition. So the page answers the question precisely without
 * quoting anything we would be held to.
 * ⛔ NEVER add our own hourly rate or a project range to this page. That was
 * decided, not overlooked.
 * ⛔ Re-read the prices before changing anything: Salesforce's page says
 * "provided for information purposes only and subject to change", so the
 * "checked on" date below is load-bearing. Read them in a BROWSER — WebFetch
 * gets 403 from salesforce.com.
 */

/* Read off salesforce.com/sales/pricing/ and salesforce.com/service/pricing/ on
   2026-09-01. Sales Cloud and Service Cloud publish an identical ladder.
   ⛔ Update PRICES_CHECKED whenever these change. */
const PRICES_CHECKED = "1 September 2026";
const EDITIONS = [
  {
    name: "Starter Suite",
    price: "$25",
    note: "Billed monthly or annually. Where most small teams should start.",
  },
  {
    name: "Pro Suite",
    price: "$100",
    note: "Billed annually, contract required. Adds quoting and forecasting.",
  },
  {
    name: "Enterprise",
    price: "$175",
    note: "Billed annually. The first edition with a full web API.",
  },
  {
    name: "Unlimited",
    price: "$350",
    note: "Billed annually. Includes Premier Success and a full sandbox.",
  },
];

const LOCAL_WORK = [
  {
    icon: ShieldQuestion,
    title: "Whether you need it at all",
    body: "Sometimes the honest answer is that a spreadsheet and a shared inbox are still doing the job, and that is a much cheaper thing to find out now than in month four. We will say so.",
  },
  {
    icon: Layers,
    title: "Which edition, and which you don't need",
    body: "The expensive mistake is buying up a tier for one feature, or buying seats for people who will never log in. Edition and seat count are the first thing we look at, before anything gets configured.",
  },
  {
    icon: TrendingDown,
    title: "Getting off the spreadsheet without losing the history",
    body: "The records come out of whatever you are on now, get cleaned, get loaded, and the totals get reconciled so you can prove nothing went missing.",
  },
  {
    icon: MapPin,
    title: "Close enough to sit down with",
    body: "Our office is on Swedesford Road in Malvern, inside the county rather than driving into it. Most of the work runs remotely, but the first conversation can happen across a table.",
  },
];

const COVERAGE = [
  "The whole of Chester County, and we are inside it rather than driving in",
  "The surrounding counties: Delaware, Montgomery, Bucks and Philadelphia",
  "New Castle County, Delaware, which is closer to us than most of Philadelphia",
  "Anywhere in the United States remotely, which is how most of this work runs",
];

/* ⛔ Asked ONLY here. The cost questions are deliberately concentrated on this
   page. "How much does Salesforce cost for a small company?" and "Do I need
   Sales Cloud or Service Cloud?" are both live Google PAA questions observed
   2026-08-31. ⛔ Do not repeat them on the Philadelphia or Pennsylvania page. */
const FAQS = [
  {
    q: "How much does Salesforce cost for a small company?",
    a: `The licence half is simple arithmetic and you can do it yourself: seats multiplied by the edition price. As published by Salesforce on ${PRICES_CHECKED}, that is $25 per user per month for Starter Suite, $100 for Pro Suite, $175 for Enterprise and $350 for Unlimited, with Pro and above billed annually on a contract. Ten people on Starter is $250 a month. The part that genuinely varies is the setup, because it depends on how much data has to move and how many other systems it has to talk to — which is why we will give you a licence count and a rough cost before you sign anything, rather than a number from a web page.`,
  },
  {
    q: "What are the costs people do not budget for?",
    a: `The big one is support. Salesforce prices its Premier Success Plan at 30% of net licence fees — published on their own pricing page, checked ${PRICES_CHECKED} — and almost nobody includes it in the first budget. After that it is usually extra storage, additional sandboxes for testing, and licences for the systems you want Salesforce to integrate with. None of it is hidden exactly, but none of it is on the front of the quote either.`,
  },
  {
    q: "Do I need Sales Cloud or Service Cloud?",
    a: "Sales Cloud tracks the work of winning business — leads, opportunities and pipeline. Service Cloud tracks the work of supporting customers after they buy — cases, queues and escalation. Plenty of companies need both, and a fair number need considerably less than they were sold. That is the first thing worth settling, because it changes the licence bill every month rather than once.",
  },
  {
    q: "Can we actually meet in person?",
    a: "Yes. We are on Swedesford Road in Malvern, so for most of the county that is a short drive either way. In practice most of a Salesforce engagement runs remotely because the work happens inside the org, but the first conversation is often better across a table and we are happy to do it that way.",
  },
];

export default function SalesforceConsultantChesterCounty() {
  useSEO({
    title: "Salesforce Consultant Chester County PA | OneAlgorithm",
    description:
      "Salesforce consulting for Chester County businesses from an office in Malvern. Which edition you actually need, what it costs, and a licence count before you sign.",
    canonical: getCanonicalUrl(
      "/services/salesforce-consultant-chester-county",
    ),
    ogTitle: "Salesforce Consultant Chester County PA — OneAlgorithm",
    ogDescription:
      "Salesforce consulting for Chester County businesses, from an office in Malvern inside the county. Edition and licence advice before you buy, not after.",
    ogUrl: getCanonicalUrl("/services/salesforce-consultant-chester-county"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Salesforce Consultant Chester County PA — OneAlgorithm",
    twitterDescription:
      "Salesforce consulting for Chester County businesses from an office in Malvern. Edition and licence advice before you buy.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting in Chester County, Pennsylvania",
          "Salesforce consulting for businesses in Chester County, Pennsylvania, from an office in Malvern: edition and licence advice before purchase, Sales Cloud and Service Cloud configuration, migration off spreadsheets and legacy systems, and a free one-week review of an existing org.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce-consultant-chester-county",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Chester County"
        title={
          <>
            Salesforce for{" "}
            <span className="text-oa-orange">Chester County businesses</span>
          </>
        }
        lede="If you are being quoted Salesforce and cannot tell what you actually need, that is the expensive moment — before anything is configured. Our office is on Swedesford Road in Malvern, inside the county rather than driving into it."
        panel={{
          title: "Before you sign anything",
          items: [
            "What your process actually is now",
            "Which edition you need — and which you don't",
            "A licence count and a rough cost",
            "Who owns and administers the org after we leave",
          ],
        }}
        primary={{ label: "Get a licence count", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What we look at"
          title="The decisions that cost money are made before the build"
          lede="Not the configuration. The edition, the seat count, and whether the platform is the right answer at all."
        />
        <CardGrid columns={2} className="mt-12">
          {LOCAL_WORK.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      {/* ⭐ THE LICENCE TABLE. Salesforce's published list price, cited and
          dated. This is the half of "what does Salesforce cost" that is
          genuinely knowable, and publishing it costs us nothing because the
          numbers are not ours. ⛔ Do not add our rates here. */}
      <Section tone="night" grid>
        <SectionHeading
          tone="dark"
          eyebrow="What it costs"
          title="Work out your own licence bill in ten seconds"
          lede="Seats multiplied by the edition price. These are Salesforce's published list prices, not ours — Sales Cloud and Service Cloud carry the same ladder."
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              Salesforce Sales Cloud and Service Cloud published list prices per
              user per month, checked {PRICES_CHECKED}
            </caption>
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-3 pr-6 font-mono text-xs uppercase tracking-[0.14em] text-oa-nightInk3">
                  Edition
                </th>
                <th className="py-3 pr-6 font-mono text-xs uppercase tracking-[0.14em] text-oa-nightInk3">
                  Per user / month
                </th>
                <th className="py-3 font-mono text-xs uppercase tracking-[0.14em] text-oa-nightInk3">
                  Terms
                </th>
              </tr>
            </thead>
            <tbody>
              {EDITIONS.map((e) => (
                <tr key={e.name} className="border-b border-white/10">
                  <td className="py-4 pr-6 font-semibold text-oa-nightInk">
                    {e.name}
                  </td>
                  <td className="py-4 pr-6 font-mono text-lg text-oa-orange">
                    {e.price}
                  </td>
                  <td className="py-4 text-sm leading-relaxed text-oa-nightInk2">
                    {e.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Reveal>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-oa-nightInk3">
            Salesforce list prices, checked {PRICES_CHECKED}, and subject to
            change by Salesforce. The setup cost is the part that genuinely
            varies — it depends on how much data has to move and how many
            systems Salesforce has to talk to, so we will give you a number for
            it in writing before you commit, rather than a guess from a web
            page.
          </p>
        </Reveal>
      </Section>

      <Section tone="paper">
        <Split
          left={
            <>
              <SectionHeading
                eyebrow="Where we work"
                title="Who this covers"
              />
              <div className="mt-8">
                <CheckList items={COVERAGE} />
              </div>
            </>
          }
          right={
            <Card>
              <h3 className="text-h3 font-semibold text-oa-ink">
                Already own Salesforce?
              </h3>
              <p className="mt-4 leading-relaxed text-oa-ink2">
                Then the useful first step is different: a free, fixed,
                one-week look at the org you already have, and a written ranked
                list of what we found.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/services/salesforce">
                  See how the work runs
                </PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Questions"
          title="What people ask before they buy"
        />
        <div className="mt-12 space-y-10">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <div className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
                <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                <p className="mt-3 leading-relaxed text-oa-ink2 md:mt-0">
                  {f.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand
        title="Get a licence count before you sign"
        body="Tell us how your team works now and how many people would actually log in. You get an edition recommendation and a rough cost in writing, and if a smaller edition does the job we will say so."
        primary={{ label: "Get a licence count", to: "/contact" }}
        secondary={{ label: "How the work runs", to: "/services/salesforce" }}
      />
    </Layout>
  );
}
