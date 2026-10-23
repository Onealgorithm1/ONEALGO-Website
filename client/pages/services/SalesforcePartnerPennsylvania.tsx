import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero, Section, SectionHeading, PrimaryCTA, SecondaryCTA } from "../../components/site";
import {
  AnswerBand,
  DataTable,
  Desk,
  FAQList,
  HcLink,
  Objections,
  PartnerBadge,
  PeopleStrip,
  Plate,
  PlateScope,
  RouteBoard,
  SF_OBJECTIONS,
  WiredRow,
  type SfFaq,
} from "../../components/salesforce";
import { RecordBand, SalesforceRecordCard } from "../../components/SalesforceRecordCard";
import { PLATES } from "../../data/plates/pennsylvania";
import { SF_PHONE, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
  createWebPageSchema,
} from "../../components/StructuredData";

/* Salesforce Consulting Partner — Pennsylvania. Rebuilt 2026-10-23 on the
 * Salesforce plate system (design-spec.md §3 PA-F1, §5 PA, plus the wide-layout
 * and voice addenda).
 *
 * THIS PAGE'S DISTINCT JOB: the buyer asking "what is a Salesforce Consulting
 * Partner, and how would I know if one is real?" It owns the how-to-check topic
 * site-wide (the top-firms guide was killed so it would stay here). Partner
 * definition, Professional Services vs partner and "top partners in PA" are
 * answered ONLY here; cost lives on the cost guide and Chester County, the
 * consultant role on Philadelphia.
 *
 * ⛔ FACTS RE-CHECKED 2026-10-23, and two of the 2026-09-01 ones no longer hold:
 * - Salesforce's FY27 consulting partner program has TWO tiers, Select and
 *   Summit, replacing Base / Ridge / Crest / Summit (Salesforce's FY27 brochure;
 *   Salesforce Ben, 3 March 2026). The old page's "Provisional" tier and "only
 *   Summit partners display a tier badge" could not be confirmed for 2026, so
 *   they are gone. Do not put them back without a Salesforce source.
 * - Competencies are earned at Accredited or Expert from certifications,
 *   completed projects and CSAT. The old thresholds (2+ projects, CSAT 4.0, 4+
 *   certifications) were not confirmable for the new program and are gone too.
 * - "There is no such thing as a certified partner firm" was dropped:
 *   Salesforce's own Professional Services FAQ says "certified partners".
 *   What stays true and is said: Salesforce certifies people.
 * - Partner Finder = appexchange.salesforce.com/consulting, so named on
 *   salesforce.com/partners/find-a-consulting-partner. Its location filter is
 *   NOT confirmed, so the page never mentions one.
 *
 * ⛔ VOICE (addendum, binding, overrides gap-audit "keep OUR_RECORD unchanged"):
 * the old "What you will find" list announced what the listing lacks ("No tier
 * badge", "No competency badges earned yet", "No customer ratings — nobody has
 * reviewed us there"). Those lines are deleted from visible copy. Honesty is
 * kept by never claiming the opposite: no tier, badge, rating or review is
 * claimed anywhere, and step 04 teaches the reader to read ratings on ANY
 * listing, ours included. SF_OBJECTIONS.reviews is not used for the same reason.
 *
 * ⛔ No client is named, no office street address in body copy (owner question
 * 7.5 open), no photos of people, no screenshots of the listing. MuleSoft and
 * Agentforce are not claimed; Agentforce appears only as an example of a
 * competency row a buyer might read.
 */

const PATH = "/services/salesforce-consulting-partner-pennsylvania";
const PAGE_UPDATED = "2026-10-23";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og-salesforce-partner-pennsylvania.jpg";
const IMAGE_1600 = "https://onealgorithm.com/media/salesforce/how-to-check-a-salesforce-partner-1600x900.jpg";
const PARTNER_FINDER = "https://appexchange.salesforce.com/consulting";
const SF_FIND_PARTNER = "https://www.salesforce.com/partners/find-a-consulting-partner/";
const SF_PRO_SERVICES = "https://www.salesforce.com/services/professional-services/";
const TIERS_SOURCE = "https://www.salesforceben.com/salesforce-massively-overhauls-partner-program/";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const DESCRIPTION =
  "Listed Salesforce Consulting Partner in Malvern, PA. Check any partner's record, then book a free one-week Salesforce health check. Call (610) 890-9711.";

/* Answered in the AnswerBand and included in FAQPage (it is visible there). */
const ANSWER: SfFaq = {
  q: "What is a Salesforce Consulting Partner?",
  a: "A Salesforce Consulting Partner is an independent firm that Salesforce lists in AppExchange Partner Finder, its public register of consultants. Salesforce, not the firm, publishes the record: how many certified people work there, how many certifications they hold by competency, and customer ratings. That makes a partner's claims checkable before you hire.",
};

/* Keyed c1-c4 to the PA-F1 checkpoints (scripts/plates/pennsylvania.mjs). */
const HOW_TO_CHECK = [
  {
    k: "c1",
    title: "Find the firm in AppExchange Partner Finder",
    body: (
      <>
        Salesforce keeps its own register of consulting partners:{" "}
        <a className="oa-link" href={PARTNER_FINDER} {...ext}>
          AppExchange Partner Finder ↗
        </a>
        , the Consultants section of AppExchange. Search the firm's name and open its listing. A firm that calls
        itself a Salesforce partner belongs there.
      </>
    ),
  },
  {
    k: "c2",
    title: "Read the tier",
    body: (
      <>
        Salesforce's current partner program has two tiers, Select and Summit. Its 2026 overhaul retired the Base,
        Ridge and Crest names, so a firm still quoting them is describing a program that no longer exists. Ask which
        tier the firm holds today.
      </>
    ),
  },
  {
    k: "c3",
    title: "Read the competency row for what you are buying",
    body: (
      <>
        Salesforce groups expertise into competencies, each earned at Accredited or Expert level from
        certifications, completed projects and customer satisfaction. Read the row for the product you are buying,
        for example Agentforce or Marketing Cloud, rather than the firm's overall total.
      </>
    ),
  },
  {
    k: "c4",
    title: "Count people, certifications and ratings",
    body: (
      <>
        Salesforce certifies people, not companies. The listing shows how many certified people the firm employs,
        how many certifications they hold and any customer ratings. Then ask who on that list will work on your org,
        and what they hold.
      </>
    ),
  },
];

/* RecordBand facts: true, positive, and read off the listing on SF_VERIFIED_ON. */
const RECORD_FACTS = [
  "Listed as a Consulting Partner in AppExchange Partner Finder",
  "Office in Malvern, Chester County, Pennsylvania",
  "People and certifications counted by Salesforce against its competencies",
];

/* RouteBoard bodies: each service card carries the delivered pattern behind it
   (gap PA-5 + PA-6). Wording is the approved delivered-work list in
   salesforceProof.ts plus each page's existing one-liner. No client, sector,
   date (except lending) or metric. */
const DELIVERED_BODIES = {
  dm: "We have migrated QuickBase and Kissflow systems into Salesforce. Yours is reconciled before go-live.",
  int: "We keep SAP and Salesforce in sync, with the owner of each record agreed before anything is built.",
  ms: "Weekly administration and development, with hours reported every week. Ongoing for a lending company since April 2026.",
  mc: "Support for Marketing Cloud accounts already running, backed by about 18 months of Marketing Cloud support delivered.",
};

/* Market comparison (no `own` column: neither column is our offer). Paraphrased
   from Salesforce's pages, never quoted (trademark guideline on Salesforce text). */
const COMPARE = [
  {
    cells: [
      "Who does the work",
      "Salesforce's own experts, working closely with its product teams",
      "An independent firm's certified people",
    ],
  },
  {
    cells: [
      "What Salesforce positions it for",
      "Complex, high-impact projects, from first setup to large transformations",
      "Delivery across industries, with more flexibility and specialist expertise",
    ],
  },
  {
    cells: [
      "Where you find it",
      "Salesforce's Professional Services page, through its contact form",
      "AppExchange Partner Finder, one public listing per firm",
    ],
  },
  {
    cells: [
      "What you can check first",
      "The customer stories Salesforce publishes",
      "The firm's listing: certified people, certifications by competency, competency badges and customer ratings",
    ],
  },
];

/* ⛔ Asked ONLY here (questions-by-page.md, PA section). */
const FAQS: SfFaq[] = [
  {
    q: "Who are the top Salesforce partners in Pennsylvania?",
    a: "Salesforce does not publish a ranking of partners by state. AppExchange Partner Finder lists every consulting partner on the same record: certified people, certifications by competency, competency badges and customer ratings. Build your shortlist on those figures. 'Top 10' lists on directory sites are compiled by the directory, not by Salesforce.",
  },
  {
    q: "What is the difference between Salesforce Professional Services and a Consulting Partner?",
    a: "Professional Services is Salesforce's own team of experts, which Salesforce positions for complex, high-impact projects. A Consulting Partner is an independent firm listed in AppExchange Partner Finder, where its certified people and certifications are published. Salesforce says most customers use both.",
  },
  {
    q: "What is the difference between a Salesforce consultant and an implementation partner?",
    a: "A consultant is a person; a partner is a firm. 'Implementation partner' is the everyday name for the firm you hire to set Salesforce up, and Salesforce lists those firms as Consulting Partners. Many Salesforce consultants work inside partner firms, and others work freelance.",
  },
  {
    q: "Partner or freelancer: does it matter?",
    a: "A good freelancer can do excellent work. A listed partner adds a public record and cover: several certified people who can pick the work up if one is unavailable. Ask any firm two things: who specifically will work on your org, and what happens if that person is out. Ask us both, too.",
    link: { to: "/services/salesforce-consultant-philadelphia", label: "What a Salesforce consultant actually does" },
  },
  {
    q: "What should I ask a Salesforce partner before hiring?",
    a: "Four questions sort most firms. Who will do the work, and which certifications do they hold? Which competency on the listing matches what you are buying? How will they prove your data arrived intact after a migration? Who looks after Salesforce once it is live? A strong partner answers all four before you sign.",
  },
  {
    q: "Do we have to be in Pennsylvania to work with you?",
    a: "No. Our office is in Malvern, Chester County, and we work with companies across the United States. Salesforce work happens inside your org, so most of it runs remotely, and we meet in person when a meeting needs it.",
  },
];

const OBJECTIONS = [
  {
    q: "Will we get a junior team after the sale?",
    a: "You work directly with the certified people doing the work, with no hand-off after the sale. Sreenivas Amirisetti leads our Salesforce practice.",
  },
  SF_OBJECTIONS.pitch,
  SF_OBJECTIONS.cost,
  SF_OBJECTIONS.city,
];

export default function SalesforcePartnerPennsylvania() {
  useSEO({
    title: "Salesforce Consulting Partner in Pennsylvania | OneAlgorithm",
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    ogTitle: "Salesforce Consulting Partner in Pennsylvania — OneAlgorithm",
    ogDescription:
      "A listed AppExchange Consulting Partner in Malvern, PA. Four checks for any Salesforce partner, then a free one-week Salesforce health check.",
    ogUrl: getCanonicalUrl(PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: PLATES["how-to-check-a-salesforce-partner"].alt,
    twitterTitle: "Salesforce Consulting Partner in Pennsylvania",
    twitterDescription:
      "Four checks for any Salesforce partner, from a listed Consulting Partner in Malvern, PA. Free one-week health check.",
    twitterImage: OG_IMAGE,
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting Partner Services in Pennsylvania",
          "A listed AppExchange Salesforce Consulting Partner based in Malvern, Pennsylvania, working with companies across Pennsylvania and the United States: Sales Cloud and Service Cloud configuration, Flow automation, data migration, integration, ongoing support, and a free one-week Salesforce health check.",
          "CRM & Salesforce Implementation",
          `https://onealgorithm.com${PATH}`,
          {
            areaServed: [
              { "@type": "State", name: "Pennsylvania" },
              { "@type": "Country", name: "United States" },
            ],
            image: IMAGE_1600,
          },
        )}
      />
      <StructuredData
        data={createWebPageSchema("Salesforce Consulting Partner in Pennsylvania", DESCRIPTION, `https://onealgorithm.com${PATH}`, {
          dateModified: PAGE_UPDATED,
          primaryImage: { url: IMAGE_1600, width: 1600, height: 900 },
        })}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema([ANSWER, ...FAQS])} />

      <PageHero
        eyebrow="Pennsylvania"
        title={
          <>
            A Salesforce Consulting Partner <span className="text-oa-orange">based in Pennsylvania</span>
          </>
        }
        lede="We configure, migrate, integrate and support Salesforce for companies across Pennsylvania from our office in Malvern. Salesforce lists us as a Consulting Partner, and this page shows how to check that record, for us and for any firm you are weighing."
        panel={{ title: "Salesforce's record of us", items: [], slot: <SalesforceRecordCard /> }}
        primary={{ label: "Get a free health check", href: "#start", cta: "hero" }}
        secondary={{ label: `Call ${SF_PHONE.display}`, href: SF_PHONE.href, cta: "hero" }}
        meta={[
          { label: "Office", value: "Malvern, PA" },
          { label: "Checked against AppExchange", value: SF_VERIFIED_LABEL },
        ]}
        siblings={false}
      >
        <HcLink />
      </PageHero>

      <AnswerBand
        question={ANSWER.q}
        answer={ANSWER.a}
        leads={[
          {
            label: "Why it matters",
            body: "Anyone can call themselves a Salesforce consultant. A listing ties the claim to figures Salesforce publishes, so you compare firms on the same record.",
          },
          {
            label: "What we do",
            body: "We are a listed Consulting Partner in Malvern, PA, configuring, migrating, integrating and supporting Salesforce for companies across Pennsylvania and the United States.",
          },
          {
            label: "What it costs",
            body: (
              <>
                The first step is free: a{" "}
                <Link className="oa-link" to="/services/salesforce-health-check">
                  one-week Salesforce health check
                </Link>{" "}
                of your org, with a written list ranked by what to fix first.
              </>
            ),
          },
        ]}
      />

      <Section clip tone="surface" id="check">
        <PlateScope>
          <SectionHeading
            title="How do you check a Salesforce partner before you hire?"
            lede="Four checks, all on Salesforce's own register. Run them on any firm you are considering, us included."
          />
          <div className="mt-12">
            <Plate
              spec={PLATES["how-to-check-a-salesforce-partner"]}
              fig={1}
              first
              stamp={["DIAGRAM · HOW TO CHECK ANY SALESFORCE PARTNER", "CHECKED OCT 2026"]}
              caption="The four checks, in the order a buyer runs them. Each one is explained below."
            />
          </div>
          <ol className="mt-12 grid gap-x-6 gap-y-2 sm:grid-cols-2 xl:grid-cols-4">
            {HOW_TO_CHECK.map((c, i) => (
              <WiredRow key={c.k} k={c.k} as="li" className="border-t-2 border-oa-hairlineStrong px-4 pb-6 pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-oa-ink3">
                  Check {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-oa-ink">{c.title}</h3>
                <p className="mt-2.5 max-w-[68ch] text-sm leading-relaxed text-oa-ink2">{c.body}</p>
              </WiredRow>
            ))}
          </ol>
          <p className="mt-6 font-mono text-xs text-oa-ink3">
            Sources, checked October 2026:{" "}
            <a className="oa-link" href={SF_FIND_PARTNER} {...ext}>
              Salesforce, Find a Consulting Partner ↗
            </a>{" "}
            ·{" "}
            <a className="oa-link" href={TIERS_SOURCE} {...ext}>
              Salesforce Ben on the 2026 partner program ↗
            </a>
          </p>
        </PlateScope>
      </Section>

      <Section tone="night" grid id="record">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              title="What you will find when you check us"
              lede="Every figure here is Salesforce's, read from our listing's stat box. Open the listing and compare it line by line."
            />
            <div className="mt-10 max-w-[60ch] border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-oa-nightInk">Who leads the work</h3>
              <PeopleStrip tone="night" />
            </div>
          </div>
          <RecordBand facts={RECORD_FACTS} />
        </div>
      </Section>

      <Section tone="paper" compact bordered id="badge">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <PartnerBadge />
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryCTA href="#start" tone="light" cta="mid">
              Get a free health check
            </PrimaryCTA>
            <SecondaryCTA href={SF_PHONE.href} tone="light" cta="mid">
              Call {SF_PHONE.display}
            </SecondaryCTA>
          </div>
        </div>
      </Section>

      <Section tone="surface" id="services">
        <SectionHeading
          title="Salesforce work we deliver"
          lede={
            <>
              Sales Cloud and Service Cloud configuration, Flow automation, migration, integration and support after
              go-live. The cards carry work we have delivered; clients stay unnamed. The full picture is on{" "}
              <Link className="oa-link" to="/services/salesforce">
                our Salesforce page
              </Link>
              .
            </>
          }
        />
        <RouteBoard groups={["services"]} bodies={DELIVERED_BODIES} />
      </Section>

      <Section tone="paper" id="compare">
        <SectionHeading
          title="Salesforce Professional Services or a Consulting Partner?"
          lede="Salesforce sells its own expert services and also lists independent partners. They suit different projects, and Salesforce says most customers use both."
        />
        <div className="mt-10">
          <DataTable
            label="Salesforce Professional Services compared with a Salesforce Consulting Partner"
            head={["", "Salesforce Professional Services", "Salesforce Consulting Partner"]}
            rows={COMPARE}
            source={
              <>
                Source: Salesforce,{" "}
                <a className="oa-link" href={SF_FIND_PARTNER} {...ext}>
                  Find a Consulting Partner ↗
                </a>{" "}
                and{" "}
                <a className="oa-link" href={SF_PRO_SERVICES} {...ext}>
                  Professional Services ↗
                </a>
                , read 23 October 2026. Paraphrased.
              </>
            }
          />
        </div>
      </Section>

      <Section tone="surface" id="objections">
        <Objections items={OBJECTIONS} />
      </Section>

      <Section tone="paper" id="questions">
        <SectionHeading title="Questions about Salesforce partners" />
        <FAQList
          faqs={FAQS}
          sources={{
            checked: "October 2026",
            links: [
              { label: "AppExchange Partner Finder", href: PARTNER_FINDER },
              { label: "Salesforce: Find a Consulting Partner", href: SF_FIND_PARTNER },
              { label: "Salesforce Professional Services", href: SF_PRO_SERVICES },
              { label: "Salesforce Ben: the 2026 partner program", href: TIERS_SOURCE },
            ],
          }}
        />
      </Section>

      <Section tone="surface" compact id="pennsylvania">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeading
            title="Salesforce work anywhere in Pennsylvania"
            lede="From Malvern we take on Salesforce work across the state: Philadelphia, the Lehigh Valley, Harrisburg and Pittsburgh. The work happens inside your org, so distance changes little, and we meet in person when a meeting needs it."
          />
          <ul className="border-b border-oa-hairlineStrong lg:self-end">
            <li className="border-t border-oa-hairlineStrong py-5">
              <p className="text-oa-ink2">Already running Salesforce near Philadelphia?</p>
              <Link className="oa-link mt-1 inline-flex min-h-11 items-center text-lg font-semibold" to="/services/salesforce-consultant-philadelphia">
                Salesforce consultants for Philadelphia companies
              </Link>
            </li>
            <li className="border-t border-oa-hairlineStrong py-5">
              <p className="text-oa-ink2">Still choosing an edition in Chester County?</p>
              <Link className="oa-link mt-1 inline-flex min-h-11 items-center text-lg font-semibold" to="/services/salesforce-consultant-chester-county">
                Salesforce consultant for Chester County businesses
              </Link>
            </li>
          </ul>
        </div>
      </Section>

      <Desk
        heading="Start with a free one-week Salesforce health check"
        body="One week in your Salesforce org, then a written list of what is costing you money, time or trust in your data, ranked by what to fix first. Free, and the list is yours."
        form={{
          topic: "pa",
          topicLabel: "Salesforce Consulting Partner · Pennsylvania",
          heading: "Get a free health check",
          prompt: "What is your Salesforce doing wrong?",
          submitLabel: "Get a free health check",
        }}
      />
    </Layout>
  );
}
