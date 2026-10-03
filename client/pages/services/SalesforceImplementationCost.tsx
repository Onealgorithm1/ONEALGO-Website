import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Users, Workflow, Plug, Database, Layers, ClipboardCheck } from "lucide-react";
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

/* Salesforce implementation cost. Added 2026-10-03.
 *
 * WHY THIS PAGE EXISTS. Search Console and the autocomplete tool both show the
 * question "how much does salesforce implementation cost" and no page on this
 * site answered it with a number. The existing Salesforce pages said "we will
 * not quote a figure on a web page". Louis, 2026-10-03: every business is
 * different, so show AVERAGES, and copy what works on high-converting pages.
 *
 * WHAT WORKS (read live 2026-10-03, structure only, no wording copied): the
 * ranking cost guides put a range in the first screen, split it by company
 * size, list what moves it and the costs people miss, and carry a long FAQ.
 * The weaker pattern hides the number behind a download.
 *
 * ⛔ EVERY FIGURE ON THIS PAGE IS A PUBLISHED MARKET FIGURE OR SALESFORCE'S OWN
 * LIST PRICE, NAMED, LINKED AND DATED. NONE IS A ONEALGORITHM PRICE. The page
 * says so near the top. Do not add our rates. Do not replace a named range with
 * "typically". If a source changes, change the row and MARKET_CHECKED.
 *
 * ⛔ NO FAQ QUESTION HERE IS REPEATED ON ANOTHER PAGE. The Salesforce pages
 * already carry: "What does a Salesforce implementation cost?", "How much does
 * Salesforce cost for a small company?", "What are the costs people do not
 * budget for?", "Do I need Sales Cloud or Service Cloud?". Check before adding.
 *
 * ⛔ The Salesforce prices below are the same four editions as
 * SalesforceConsultantChesterCounty.tsx plus Agentforce 1, all read off
 * salesforce.com on 1 September 2026. Keep the two pages in step.
 */

const MARKET_CHECKED = "3 October 2026";
const PRICES_CHECKED = "1 September 2026";

const SOURCES = [
  {
    name: "Cynoteck",
    when: "Updated 11 September 2026",
    url: "https://www.cynoteck.com/blog-post/salesforce-implementation-cost",
    small: "$10,000 to $50,000",
    smallNote: "1 to 10 users, 4 to 8 weeks",
    mid: "$75,000 to $250,000",
    midNote: "50 to 200 users, 4 to 6 months",
    ent: "$150,000 to $500,000+",
    entNote: "200+ users, 6 to 12+ months",
  },
  {
    name: "BrainSpate",
    when: "Published 10 September 2026",
    url: "https://brainspate.com/blog/salesforce-implementation-cost-guide/",
    small: "$15,000 to $50,000",
    smallNote: "",
    mid: "$50,000 to $150,000",
    midNote: "",
    ent: "$150,000 to $500,000+",
    entNote: "",
  },
  {
    name: "Groviya",
    when: "Published 16 September 2026, updated 3 October 2026",
    url: "https://www.groviya.com/blog/salesforce-implementation-cost-guide",
    small: "$15,000 to $50,000",
    smallNote: "One cloud, standard processes, up to about 50 users",
    mid: "$50,000 to $250,000",
    midNote: "One or two clouds, 50 to 300 users, 3 to 6 months",
    ent: "$250,000 to $1,000,000+",
    entNote: "6 to 18 months",
  },
  {
    name: "American Chase",
    when: "Published 13 June 2025",
    url: "https://americanchase.com/salesforce-implementation-costs/",
    small: "$15,000 to $50,000",
    smallNote: "5 to 50 users",
    mid: "$50,000 to $150,000",
    midNote: "50 to 500 users",
    ent: "$150,000 to $500,000+",
    entNote: "500+ users",
  },
];

const EDITIONS = [
  { name: "Starter Suite", price: "$25", note: "Billed monthly or annually." },
  { name: "Pro Suite", price: "$100", note: "Billed annually, contract required." },
  { name: "Enterprise", price: "$175", note: "Billed annually." },
  { name: "Unlimited", price: "$350", note: "Billed annually." },
  { name: "Agentforce 1", price: "$550", note: "Billed annually." },
];

const MOVERS = [
  {
    icon: Users,
    title: "Users, roles and who sees what",
    body: "More people means more roles, more permission sets and more training. BrainSpate's guide prices training at $2,000 to $10,000 on its own.",
  },
  {
    icon: Layers,
    title: "How many clouds and products",
    body: "A single sales process is a different job from sales, service and marketing together. Groviya's guide separates its bands on exactly this, by how many clouds the project covers.",
  },
  {
    icon: Database,
    title: "How much data moves, and how clean it is",
    body: "Moving a lot of messy records costs more than moving a little clean data. BrainSpate puts data migration at $5,000 to $50,000 or more.",
  },
  {
    icon: Plug,
    title: "What Salesforce has to talk to",
    body: "Each connection to the ERP, the finance system or the website is its own piece of work. BrainSpate puts integrations at $5,000 to $75,000 or more.",
  },
  {
    icon: Workflow,
    title: "Configuration or custom build",
    body: "Setting Salesforce up the way it ships is cheaper than building around a process it does not natively fit. BrainSpate puts customization at $10,000 to $150,000 or more.",
  },
  {
    icon: ClipboardCheck,
    title: "Change management",
    body: "Training and rollout are part of the work, not an extra, and they scale with the number of people using the system.",
  },
];

const INCLUDES = [
  "Discovery and requirements",
  "Configuration of the clouds you chose",
  "Data migration of what you decided to move",
  "Testing and user training",
];

const EXCLUDES = [
  "Salesforce licences, billed per user",
  "Salesforce support plans and sandboxes",
  "Storage above your allowance",
  "AppExchange apps with their own subscription",
  "Someone to run the org once it is live",
];

const BREAKS = [
  "More than one cloud",
  "Several systems to connect",
  "Years of unclean data to move",
  "Custom processes Salesforce does not do natively",
  "A large number of users and roles",
];

const FAQS = [
  {
    q: "Why do published Salesforce implementation costs vary so much?",
    a: "Because the guides are pricing different projects. Groviya's small-business band assumes one cloud, standard processes and up to about 50 users. Its mid-market band assumes one or two clouds, several custom processes and 50 to 300 users. Change the clouds, the data or the integrations and the number moves with them, which is why a range from one firm rarely fits your case.",
  },
  {
    q: "How long does a Salesforce implementation take?",
    a: "It depends on the scope, and the guides give different timelines. Cynoteck puts a small project at 4 to 8 weeks. Groviya puts a mid-market one at 3 to 6 months and an enterprise one at 6 to 18 months. The honest answer for your business is whatever the scope turns out to be, which is why we scope it before quoting.",
  },
  {
    q: "Is the implementation fee on top of the Salesforce licence?",
    a: "Yes. Licences are billed by Salesforce, per user, and the implementation fee goes to whoever does the work. BrainSpate's guide notes that implementation can run two to three times the annual licence fees, and Cynoteck suggests budgeting 40 to 80 percent above licence cost for the true first-year total. Both are rules of thumb from firms that sell implementation, not our quote.",
  },
  {
    q: "What is the Premier Success Plan, and does it cost extra?",
    a: `It is Salesforce's paid support tier. Salesforce lists it at 30 percent of net licence fees, with the Standard plan included and the Signature plan priced by contacting Salesforce. We read that on salesforce.com on ${PRICES_CHECKED}. Check which plan your edition already includes before you budget for it.`,
  },
  {
    q: "How much do Salesforce sandboxes cost?",
    a: `Salesforce prices them by tier. As listed on ${PRICES_CHECKED}: a Developer sandbox is included with CRM licences, Developer Pro is 5 percent of net spend, Partial Copy is 20 percent and Full Copy is 30 percent. Because they are a share of spend, they grow as you add users.`,
  },
  {
    q: "What does a Salesforce consultant charge per hour?",
    a: "It varies by firm. Cynoteck's guide puts consulting partner rates at $100 to $300 an hour. A rate is only half of a quote, because the hours depend on the scope, so ask any firm for the scope in writing and compare that, not the rate.",
  },
  {
    q: "Why do you not publish a single fixed price?",
    a: "Because it depends on your data and on what has to connect, and a number from a web page can steer you wrong. We publish the market's ranges, named and dated, so you can see where a quote sits. The free org review gives you a licence count and a rough cost before you sign anything.",
  },
  {
    q: "Where can I check whether my current licences are being used?",
    a: "Salesforce includes a Lightning Usage app that shows active users against the licences you hold. Seats nobody uses are worth checking first, and checking costs nothing.",
  },
];

export default function SalesforceImplementationCost() {
  useSEO({
    /* Query-first, brand last. 56 characters. */
    title: "Salesforce Implementation Cost, 2026 | OneAlgorithm",
    description:
      "What a Salesforce implementation costs: published market ranges by company size, Salesforce's list prices, the costs buyers miss, and a free org review.",
    canonical: getCanonicalUrl("/services/salesforce-implementation-cost"),
    ogTitle: "Salesforce Implementation Cost, 2026 — OneAlgorithm",
    ogDescription:
      "Published market ranges for Salesforce implementation by company size, Salesforce's list prices, and the costs most buyers do not budget for.",
    ogUrl: getCanonicalUrl("/services/salesforce-implementation-cost"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Salesforce Implementation Cost, 2026 — OneAlgorithm",
    twitterDescription:
      "Market ranges for Salesforce implementation by company size, Salesforce's list prices, and the costs most buyers miss.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Implementation Cost Guide",
          "A cost guide for Salesforce implementation: published market ranges by company size from named sources, Salesforce's own list prices, the costs most buyers do not budget for, and a free review of an existing org from a listed AppExchange Consulting Partner in Malvern, Pennsylvania.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce-implementation-cost",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Cost guide"
        title={
          <>
            What a Salesforce implementation{" "}
            <span className="text-oa-orange">costs</span>
          </>
        }
        lede={`For a small business, the published ranges we checked on ${MARKET_CHECKED} top out at $50,000, and most start at $15,000. Those are the ranges other firms publish, not our quote. Your number depends on your data, your edition and what has to connect.`}
        panel={{
          title: "How to read this page",
          items: [
            "Small business: usually $15,000 to $50,000 in the guides below",
            "Salesforce licences are billed separately, per user",
            "Every figure is named, linked and dated",
            "A free org review gives a licence count and a rough cost",
          ],
        }}
        primary={{ label: "Get a free org review", to: "/contact?need=salesforce" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="What the market publishes"
          title="Four published guides, by company size"
          lede={`Checked ${MARKET_CHECKED}. These are the ranges implementation firms print on their own sites. They disagree at the edges because they assume different projects, so read the notes beside each figure.`}
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <caption className="sr-only">
              Published Salesforce implementation cost ranges by company size,
              four sources, checked {MARKET_CHECKED}
            </caption>
            <thead>
              <tr className="border-b border-oa-hairlineStrong">
                <th className="py-3 pr-6 font-mono text-xs uppercase tracking-[0.14em] text-oa-ink3">
                  Source
                </th>
                <th className="py-3 pr-6 font-mono text-xs uppercase tracking-[0.14em] text-oa-ink3">
                  Small business
                </th>
                <th className="py-3 pr-6 font-mono text-xs uppercase tracking-[0.14em] text-oa-ink3">
                  Mid-market
                </th>
                <th className="py-3 font-mono text-xs uppercase tracking-[0.14em] text-oa-ink3">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {SOURCES.map((s) => (
                <tr key={s.name} className="border-b border-oa-hairline align-top">
                  <td className="py-4 pr-6">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="font-semibold text-oa-ink underline decoration-oa-hairlineStrong underline-offset-4 hover:text-oa-orangeText"
                    >
                      {s.name}
                    </a>
                    <div className="mt-1 text-xs text-oa-ink3">{s.when}</div>
                  </td>
                  {[
                    [s.small, s.smallNote],
                    [s.mid, s.midNote],
                    [s.ent, s.entNote],
                  ].map(([range, note], i) => (
                    <td key={i} className="py-4 pr-6">
                      <div className="font-mono text-base text-oa-ink">{range}</div>
                      {note ? (
                        <div className="mt-1 text-xs leading-snug text-oa-ink3">{note}</div>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Reveal>
          <p className="mt-8 max-w-3xl leading-relaxed text-oa-ink2">
            What they agree on: all four put the top of the small-business range
            at $50,000, and three start it at $15,000. For mid-market, two say
            $50,000 to $150,000 and the other two stretch to $250,000. These are
            published figures from other firms, shown so you can see where a
            quote sits. They are not a OneAlgorithm price.
          </p>
        </Reveal>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What moves the number"
          title="Six things that decide where you land in the range"
          lede="The ranges are wide because these six change from one business to the next."
        />
        <CardGrid columns={3} className="mt-12">
          {MOVERS.map((m) => (
            <Card key={m.title} icon={m.icon} title={m.title} body={m.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="night" grid>
        <SectionHeading
          tone="dark"
          eyebrow="Licences are separate"
          title="Salesforce's own prices, per user per month"
          lede="The licence half is simple arithmetic: seats multiplied by the edition price. These are Salesforce's published list prices for Sales Cloud and Service Cloud, not ours."
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left">
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
                  <td className="py-4 pr-6 font-semibold text-oa-nightInk">{e.name}</td>
                  <td className="py-4 pr-6 font-mono text-lg text-oa-orange">{e.price}</td>
                  <td className="py-4 text-sm leading-relaxed text-oa-nightInk2">{e.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Reveal>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-oa-nightInk3">
            Salesforce list prices, read on salesforce.com on {PRICES_CHECKED}.
            Salesforce says they are subject to change, so check the current
            page before you budget. Ten people on Starter Suite is $250 a month.
          </p>
        </Reveal>
      </Section>

      <Section tone="paper">
        <Split
          left={
            <>
              <SectionHeading
                eyebrow="Costs people miss"
                title="Costs on a Salesforce bill that are not licences"
              />
              <div className="mt-8">
                <CheckList
                  items={[
                    "Premier Success Plan: 30 percent of net licence fees. Standard is included; Signature is priced by Salesforce.",
                    "Full Copy sandbox: 30 percent of net spend. Partial Copy is 20 percent, Developer Pro 5 percent, and the Developer sandbox is included with CRM licences.",
                    "Storage above your allowance. One guide quotes about $125 a month per 500 MB.",
                    "AppExchange apps that carry their own subscription.",
                    "Someone to run the org afterwards. One guide puts a dedicated admin at $70,000 to $120,000 or more a year.",
                  ]}
                />
              </div>
              <p className="mt-8 max-w-xl leading-relaxed text-oa-ink2">
                Salesforce figures read on {PRICES_CHECKED}. The storage and
                admin figures come from Cynoteck's guide, one source each, so
                treat them as a guide and not a price list.
              </p>
            </>
          }
          right={
            <Card>
              <h3 className="text-h3 font-semibold text-oa-ink">
                What the guides cover, and what they list separately
              </h3>
              <div className="mt-5 grid gap-6 sm:grid-cols-1">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-oa-ink3">
                    Phases the guides describe
                  </p>
                  <div className="mt-3">
                    <CheckList items={INCLUDES} />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-oa-ink3">
                    Listed as separate costs
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-oa-ink2">
                    {EXCLUDES.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-oa-ink3">
                    What pushes you past the range
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-oa-ink2">
                    {BREAKS.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-oa-ink3">
                Phases are from{" "}
                <a
                  href="https://kloudfusion.com/salesforce-implementation-cost"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Kloudfusion's guide
                </a>
                . Separate costs and range drivers come from the four guides in
                the table and from Salesforce's own pricing.
              </p>
            </Card>
          }
        />
      </Section>

      <Section tone="night" grid>
        <Split
          left={
            <>
              <SectionHeading
                tone="dark"
                eyebrow="From a range to your number"
                title="How we get you a real figure"
              />
              <p className="mt-8 max-w-xl leading-relaxed text-oa-nightInk2">
                If you already own Salesforce, the free review looks at your
                licences against actual use, your data quality, what is still
                done by hand, who can see what, and which integrations fail
                quietly. If you do not own it yet, we give you the licence count
                and a rough cost before you sign, and tell you if a smaller
                edition does the job.
              </p>
            </>
          }
          right={
            <Card tone="dark">
              <h3 className="text-h3 font-semibold text-oa-nightInk">
                A licence count and a rough cost, before anyone signs
              </h3>
              <p className="mt-4 leading-relaxed text-oa-nightInk2">
                You get a written, ranked list and no obligation attached to it.
                The ranges above tell you what the market charges. The review
                tells you where you sit in them.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact?need=salesforce">Get a free org review</PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="What people ask about Salesforce cost" />
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

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand
        title="Want your number, not the market's?"
        body="Tell us what you have or what you are choosing between. We will give you a licence count and a rough cost before you sign anything."
        primary={{ label: "Get a free org review", to: "/contact?need=salesforce" }}
        secondary={{ label: "How the work runs", to: "/services/salesforce" }}
      />
    </Layout>
  );
}
