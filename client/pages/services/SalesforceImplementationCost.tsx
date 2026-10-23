import type React from "react";
import { Link } from "react-router-dom";
import { Database, Layers, LifeBuoy, Plug, Users, Workflow } from "lucide-react";
import Layout from "../../components/Layout";
import { Card, CardGrid, CheckList, PageHero, PrimaryCTA, Section, SectionHeading, SecondaryCTA } from "../../components/site";
import {
  AnswerBand,
  CTAProof,
  DataTable,
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
  type SfFaq,
} from "../../components/salesforce";
import { SalesforceRecordCard } from "../../components/SalesforceRecordCard";
import {
  SF_APPEXCHANGE_URL,
  SF_CERTIFICATIONS,
  SF_CERTIFIED_PEOPLE,
  SF_LISTING_ID,
  SF_PHONE,
} from "../../data/salesforceProof";
import { PLATES } from "../../data/plates/cost";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createFAQSchema,
  createLocalBusinessSchema,
  createServiceSchema,
  createWebPageSchema,
} from "../../components/StructuredData";

/* Salesforce implementation cost guide. Added 2026-10-03; rebuilt 2026-10-23 on
 * the Salesforce plate system (design-spec.md §3 COST, §5 COST, plus the
 * wide-layout and voice addenda).
 *
 * ⛔ EVERY FIGURE ON THIS PAGE IS A PUBLISHED MARKET FIGURE, A SALESFORCE LIST
 * PRICE OR A BLS STATISTIC, NAMED, LINKED AND DATED. NONE IS A ONEALGORITHM
 * PRICE, and the page says so. Do not add our rates (owner decision 7 is open).
 * If a source changes, change its row here AND in scripts/plates/cost.mjs (the
 * two charts), then re-run `node scripts/plates.mjs cost --og`.
 *
 * ⛔ Re-read 23 October 2026 (WebFetch + curl of each page):
 *  - The four size-band guides still publish the same ranges; Groviya was
 *    updated that morning and its bands did not change.
 *  - salesforce.com/sales/pricing NO LONGER lists Enterprise $175 / Unlimited
 *    $350 / Agentforce 1 $550 (our 1 September read). It lists Free Suite $0,
 *    Starter Suite $25, Pro Suite $100, Core $195, Advanced $395, Max $550.
 *    Premier Success is now "included with Core, Advanced and Max" and no
 *    longer shown as 30% of net licence fees; sandboxes are listed per edition
 *    with no percentage. The old 30% / 5% / 20% / 30% lines were removed for
 *    that reason. SalesforceConsultantChesterCounty.tsx still carries the
 *    1 September prices and must be brought into step (reported, not edited
 *    here: another page owner).
 *  - The Lightning Usage app tip could not be re-confirmed on
 *    help.salesforce.com (the help site renders client-side), so it is
 *    replaced by the Company Information licence count (spec §3 COST-F3).
 *
 * ⛔ NO FAQ QUESTION HERE IS REPEATED ON ANOTHER SALESFORCE PAGE (checked by
 * grep of every q: string on 2026-10-23). Objections do not repeat FAQs.
 *
 * Voice (addendum 2026-10-23): problem -> what we do -> proof. Absences are not
 * announced in visible copy. Gated, so not on the page: the byline (owner
 * decision 5), our own rates (7), the demo-org licence screenshot COST-F3
 * (screenshots blocked), reviews (off-site).
 */

const MARKET_CHECKED = "23 October 2026";
const PRICES_CHECKED = "23 October 2026";
const PUBLISHED = "2026-10-03";
/** The last real content edit. Not tied to the check dates on purpose. */
const UPDATED = "2026-10-23";
const UPDATED_LABEL = "23 October 2026";

const PAGE_URL = "https://onealgorithm.com/services/salesforce-implementation-cost";
const IMAGE_1600 = "https://onealgorithm.com/media/salesforce/salesforce-implementation-cost-ranges-1600x900.jpg";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og-salesforce-implementation-cost.jpg";

const HC = "/services/salesforce-health-check";
const DM = "/services/salesforce-data-migration";
const INT = "/services/salesforce-integration";
const MS = "/services/salesforce-managed-services";
const MC = "/services/salesforce-marketing-cloud-consulting";

const RANGES = PLATES["salesforce-implementation-cost-ranges"];
const BY_PHASE = PLATES["salesforce-implementation-cost-by-phase"];

const ext = { target: "_blank", rel: "nofollow noopener noreferrer" } as const;
const usd = (n: number) => "$" + n.toLocaleString("en-US");

/* `k` matches the wire keys in scripts/plates/cost.mjs, so a table row lights
   up that guide's bars in Fig. 1. */
const SOURCES = [
  {
    k: "cynoteck",
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
    k: "brainspate",
    name: "BrainSpate",
    when: "Updated 10 September 2026",
    url: "https://brainspate.com/blog/salesforce-implementation-cost-guide/",
    small: "$15,000 to $50,000",
    smallNote: "",
    mid: "$50,000 to $150,000",
    midNote: "",
    ent: "$150,000 to $500,000+",
    entNote: "",
  },
  {
    k: "groviya",
    name: "Groviya",
    when: "Published 16 September 2026, updated 23 October 2026",
    url: "https://www.groviya.com/blog/salesforce-implementation-cost-guide",
    small: "$15,000 to $50,000",
    smallNote: "One cloud, standard processes, up to about 50 users",
    mid: "$50,000 to $250,000",
    midNote: "One or two clouds, 50 to 300 users, 3 to 6 months",
    ent: "$250,000 to $1,000,000+",
    entNote: "Several clouds or industry clouds, 6 to 18 months",
  },
  {
    k: "amchase",
    name: "American Chase",
    when: "Published 13 June 2025, updated 3 August 2026",
    url: "https://americanchase.com/salesforce-implementation-costs/",
    small: "$15,000 to $50,000",
    smallNote: "5 to 50 users",
    mid: "$50,000 to $150,000",
    midNote: "50 to 500 users",
    ent: "$150,000 to $500,000+",
    entNote: "500+ users",
  },
];

const GIRIKON = {
  url: "https://www.girikon.com/blog/salesforce-implementation-cost/",
  when: "published 21 January 2026, updated 25 June 2026",
};
const FOLIO3 = {
  url: "https://crm.folio3.com/blog/salesforce-implementation-cost/",
  when: "published 4 March 2026, updated 30 July 2026",
};
const CYNTEXA = { url: "https://cyntexa.com/blog/salesforce-implementation-cost/", when: "updated 11 August 2026" };
const ASCENDIX = { url: "https://ascendix.com/blog/salesforce-implementation-cost/", when: "updated 21 May 2025" };

/* Girikon's seven ranges. `k` = the wire keys of Fig. 2. */
const PHASES = [
  { k: "p1", label: "Discovery and planning", range: "$5,000 to $15,000" },
  { k: "p2", label: "System configuration and setup", range: "$15,000 to $50,000" },
  { k: "p3", label: "Customization and development", range: "$10,000 to $60,000+" },
  { k: "p4", label: "Data migration", range: "$8,000 to $30,000" },
  { k: "p5", label: "Integrations", range: "$10,000 to $40,000" },
  { k: "p6", label: "User training and change management", range: "$5,000 to $20,000" },
  { k: "p7", label: "Testing, deployment and support", range: "$10,000 to $35,000" },
];

/* Folio3's one-time implementation ranges, excluding licences. Effort notes are
   our paraphrase of Folio3's. */
const CLOUDS: { name: string; range: string; note: React.ReactNode }[] = [
  { name: "Sales Cloud", range: "$15,000 to $100,000+", note: "Process complexity, territories, forecasting and integrations" },
  { name: "Service Cloud", range: "$25,000 to $150,000+", note: "Omnichannel, knowledge base, telephony and case targets" },
  { name: "Field Service", range: "$40,000 to $200,000+", note: "Work orders, scheduling and the mobile app" },
  { name: "Experience Cloud (portals)", range: "$25,000 to $150,000+", note: "Branding, sign-in and single sign-on, self-service" },
  { name: "CPQ / Revenue Cloud", range: "$40,000 to $150,000+", note: "Product rules, pricing, approvals and quotes" },
  {
    name: "Marketing Cloud Engagement",
    range: "$25,000 to $120,000+",
    note: (
      <>
        Data model, journeys, channels and integrations.{" "}
        <span className="mt-1 block text-oa-ink">
          We have supported Salesforce Marketing Cloud for about 18 months on a single engagement.{" "}
          <Link className="oa-link" to={MC}>
            Marketing Cloud consulting
          </Link>
        </span>
      </>
    ),
  },
  { name: "Account Engagement (Pardot)", range: "$15,000 to $60,000+", note: "Scoring, grading, forms, B2B journeys and the CRM sync" },
  { name: "Commerce Cloud", range: "$75,000 to $300,000+", note: "Catalogue, checkout, storefront, ERP and payment links" },
  { name: "CRM Analytics", range: "$15,000 to $75,000+", note: "Data pipelines, dashboards and row-level security" },
  { name: "Platform and custom apps", range: "$10,000 to $60,000+", note: "Custom objects, Flows, light integrations" },
];

/* Salesforce list prices, read off salesforce.com/sales/pricing on
   PRICES_CHECKED. Service Cloud lists the same figure for each edition. */
const EDITIONS = [
  { name: "Free Suite", price: 0, note: "Up to two users. No contract or credit card." },
  { name: "Starter Suite", price: 25, note: "Billed monthly or annually." },
  { name: "Pro Suite", price: 100, note: "Billed annually." },
  { name: "Core", price: 195, note: "Billed annually. Premier Success and one Partial Copy sandbox included." },
  { name: "Advanced", price: 395, note: "Billed annually. Premier Success, a Partial Copy and a Full sandbox included." },
  { name: "Max", price: 550, note: "Billed annually. Premier Success, a Partial Copy and a Full sandbox included." },
];
const price = (name: string) => EDITIONS.find((e) => e.name === name)!.price;

/* Worked first year: licences from EDITIONS times the published band. Every
   input is already on this page; the arithmetic is done here, not typed. */
const SMALL: [number, number] = [15000, 50000]; // three of four guides
const MID: [number, number] = [50000, 150000]; // BrainSpate, American Chase
const SCENARIOS = [
  { users: 5, edition: "Starter Suite", band: SMALL, bandName: "Small business" },
  { users: 10, edition: "Pro Suite", band: SMALL, bandName: "Small business" },
  { users: 50, edition: "Core", band: MID, bandName: "Mid-market" },
].map((s) => {
  const lic = s.users * price(s.edition) * 12;
  return { ...s, lic, lo: lic + s.band[0], hi: lic + s.band[1] };
});

const BLS = {
  analysts: { median: 105850, url: "https://www.bls.gov/oes/2025/may/oes151211.htm" },
  developers: { median: 135980, url: "https://www.bls.gov/oes/2025/may/oes151252.htm" },
};

const FAQS: SfFaq[] = [
  {
    q: "Why do published Salesforce implementation costs vary so much?",
    a: "Because the guides are pricing different projects. Groviya's small-business band assumes one cloud, standard processes and up to about 50 users. Its mid-market band assumes one or two clouds, several custom processes and 50 to 300 users. Change the clouds, the data or the integrations and the number moves with them, which is why a range from one firm rarely fits your case.",
  },
  {
    q: "Why is Salesforce implementation so expensive?",
    a: "Because licences are only half of the bill. Salesforce charges per user, and the setup work on top scales with the number of clouds, the data that has to move and the systems Salesforce has to talk to. BrainSpate's guide puts data migration at $5,000 to $50,000 or more and integrations at $5,000 to $75,000 or more, before a single licence.",
  },
  {
    q: "How long does a Salesforce implementation take?",
    a: "The guides give different timelines because they price different projects. Cynoteck puts a small project at 4 to 8 weeks. Groviya puts a mid-sized rollout at 3 to 6 months and an enterprise programme at 6 to 18 months. Your own timeline comes out of the written scope, which is why we scope before we quote.",
  },
  {
    q: "Is the implementation fee on top of the Salesforce licence?",
    a: "Yes. Salesforce bills licences per user, and the implementation fee goes to whoever does the work. BrainSpate's guide says implementation often runs two to three times the annual licence fees, and Cynoteck suggests budgeting 40 to 80 percent above licence cost for a realistic first-year total. Both are rules of thumb from firms that sell implementation.",
  },
  {
    q: "Can I get Salesforce for free?",
    a: `Yes, for up to two users. Salesforce's Free Suite needs no contract or credit card and stays free as long as someone logs in at least once every 60 days (salesforce.com, read ${PRICES_CHECKED}). From the third user you move to a paid suite, starting with Starter Suite at $25 per user per month.`,
  },
  {
    q: "What is the Premier Success Plan, and does it cost extra?",
    a: `It is Salesforce's paid tier of guidance and faster support. As listed on salesforce.com on ${PRICES_CHECKED}, Premier is included with the Core, Advanced and Max editions and available for purchase on Pro Suite. The Standard plan comes with every licence, and the Signature plan is priced by your Salesforce account executive. Check which plan your edition already includes before you budget for it.`,
  },
  {
    q: "How much do Salesforce sandboxes cost?",
    a: `Salesforce's pricing page, read ${PRICES_CHECKED}, lists what each edition includes rather than a sandbox price: a Developer sandbox from Pro Suite up, one Partial Copy sandbox with Core, Advanced and Max, and a Full sandbox with Advanced and Max. Developer Pro sandboxes, and a Full sandbox on Core, are available for purchase and quoted by Salesforce.`,
  },
  {
    q: "What does a Salesforce consultant charge per hour?",
    a: "Published rates for a consulting firm run $90 to $300 an hour in Ascendix's guide and $100 to $300 for certified partners in Cynoteck's. Freelancers run $25 to $250 an hour in Ascendix's table and $50 to $150 in Cynoteck's. A rate is half of a quote: compare the written scope, because the scope decides the hours.",
  },
  {
    q: "How do we get a fixed price for our Salesforce project?",
    a: "Scope it in writing first. A fixed price is only as firm as the scope behind it, so we write the scope, then price it, then do the work and hand it over. If you already run Salesforce, the free one-week health check gives you a licence count and a rough cost before you sign anything.",
    link: { to: HC, label: "What the free health check covers" },
  },
  {
    q: "Where can I check whether my current licences are being used?",
    a: "In Setup, open Company Information. Its user licence list shows each licence type with the total you pay for, how many are assigned and how many remain. Compare the assigned seats with the people who actually log in. Seats nobody uses are worth checking first, and checking costs nothing.",
  },
];

const FAQ_SOURCES = [
  { label: "Cynoteck", href: SOURCES[0].url },
  { label: "BrainSpate", href: SOURCES[1].url },
  { label: "Groviya", href: SOURCES[2].url },
  { label: "American Chase", href: SOURCES[3].url },
  { label: "Girikon", href: GIRIKON.url },
  { label: "Folio3", href: FOLIO3.url },
  { label: "Cyntexa", href: CYNTEXA.url },
  { label: "Ascendix", href: ASCENDIX.url },
  { label: "Salesforce Sales Cloud pricing", href: "https://www.salesforce.com/sales/pricing/" },
  { label: "Salesforce Free Suite", href: "https://www.salesforce.com/crm/free-crm/" },
  { label: "Salesforce pricing update, 2025", href: "https://www.salesforce.com/news/stories/pricing-update-2025/" },
  { label: "BLS OEWS May 2025", href: BLS.developers.url },
];

const TOC = [
  { id: "ranges", label: "Published ranges" },
  { id: "movers", label: "What moves the number" },
  { id: "phases", label: "Cost by part of the work" },
  { id: "clouds", label: "Cost by cloud" },
  { id: "licences", label: "Licence prices" },
  { id: "beyond-licences", label: "Costs beyond licences" },
  { id: "over-budget", label: "Keeping cost down" },
  { id: "rates", label: "Consultant rates" },
  { id: "faq", label: "Questions" },
  { id: "start", label: "Your number" },
];

const DESCRIPTION =
  "Salesforce implementation cost in 2026: published ranges by company size, list prices and consultant rates. Free health check: (610) 890-9711.";

/** First-hand line inside a mover card: our delivered work, approved wording. */
function Ours({ children }: { children: React.ReactNode }) {
  return <span className="mt-3 block font-medium text-oa-ink">{children}</span>;
}

export default function SalesforceImplementationCost() {
  useSEO({
    /* Page-map title, 57 characters. */
    title: "Salesforce Implementation Cost & Consultant Rates (2026)",
    description: DESCRIPTION,
    canonical: getCanonicalUrl("/services/salesforce-implementation-cost"),
    ogTitle: "Salesforce Implementation Cost & Consultant Rates (2026)",
    ogDescription:
      "Four published guides side by side, Salesforce's list prices, consultant rates and a worked first year. Every figure named and dated.",
    ogUrl: getCanonicalUrl("/services/salesforce-implementation-cost"),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: "Range chart of published Salesforce implementation costs for small, mid-market and enterprise companies, from four guides.",
    twitterTitle: "Salesforce Implementation Cost & Consultant Rates (2026)",
    twitterDescription:
      "Published Salesforce implementation ranges by company size, Salesforce's list prices and what consultants charge.",
    twitterImage: OG_IMAGE,
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce implementation",
          "Salesforce implementation and cost scoping from a listed Salesforce Consulting Partner in Malvern, Pennsylvania: a licence count and a rough cost before anyone signs, then configuration, data migration and integration.",
          "CRM & Salesforce Implementation",
          PAGE_URL,
          { image: IMAGE_1600 },
        )}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Salesforce Implementation Cost, 2026",
          description: DESCRIPTION,
          mainEntityOfPage: PAGE_URL,
          url: PAGE_URL,
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          // Byline is owner-gated (decision 5): Organization until confirmed.
          author: { "@type": "Organization", name: "OneAlgorithm", url: "https://onealgorithm.com" },
          publisher: { "@id": "https://onealgorithm.com/#org" },
          image: { "@type": "ImageObject", url: IMAGE_1600, width: 1600, height: 900 },
        }}
      />
      <StructuredData
        data={createWebPageSchema("Salesforce Implementation Cost & Consultant Rates (2026)", DESCRIPTION, PAGE_URL, {
          dateModified: UPDATED,
          primaryImage: { url: IMAGE_1600, width: 1600, height: 900 },
        })}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        title={
          <>
            What a Salesforce implementation <span className="text-oa-orange">costs</span>
          </>
        }
        lede="Published guides put a small-business Salesforce implementation at $15,000 to $50,000, mid-market at $50,000 to $250,000 and enterprise at $150,000 to $500,000 or more, before licences. We line up four of them, name and date every figure, then give you a licence count and a rough cost for your own org, free."
        panel={{
          title: "How to read this page",
          /* The bands themselves are in the lede, the answer band and Fig. 1;
             the panel says how the page is built instead of a fourth copy. */
          items: [
            "Published ranges for small, mid-market and enterprise companies",
            "What moves the number, part by part and cloud by cloud",
            "Salesforce licences are billed on top, per user",
            "Every figure is named, linked and dated",
            "A free health check turns a range into your number",
          ],
        }}
        primary={{ label: "Book a free health check", href: "#start", cta: "hero" }}
        secondary={{ label: `Call ${SF_PHONE.display}`, href: SF_PHONE.href, cta: "hero" }}
        meta={[
          { label: "Updated", value: UPDATED_LABEL },
          { label: "Market figures checked", value: MARKET_CHECKED },
          { label: "Salesforce prices read", value: PRICES_CHECKED },
        ]}
        siblings={false}
      >
        <div>
          <HcLink />
        </div>
        <CTAProof tone="dark" className="mt-6" />
      </PageHero>

      <AnswerBand
        question="How much does Salesforce implementation cost?"
        answer="Four published guides put a small-business Salesforce implementation at $15,000 to $50,000, and one starts at $10,000. Mid-market runs $50,000 to $150,000 in two guides and up to $250,000 in the other two. Enterprise runs $150,000 to $500,000 or more in three, and to $1,000,000 or more in the fourth. Licences are billed on top."
        leads={[
          {
            label: "Why it matters",
            body: "A quote outside these bands needs a reason. With four guides side by side, you can see where any proposal sits.",
          },
          {
            label: "What we do",
            body: "We scope the work in writing and give you a licence count and a rough cost before anyone signs.",
          },
          {
            label: "What it costs",
            body: (
              <>
                The free one-week Salesforce health check costs nothing.{" "}
                <Link className="oa-link" to={HC}>
                  What the free health check covers
                </Link>
              </>
            ),
          },
        ]}
        toc={TOC}
      />

      {/* FIG. 1 + the four-source table. The first <figure> on the page:
          eager, static, no draw (spec §3). Not in the first section after the
          hero (AnswerBand is). */}
      <Section tone="surface" clip bordered id="ranges">
        <PlateScope>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              title="Four published guides, side by side"
              lede="Implementation firms publish these ranges on their own sites. They differ at the edges because each guide prices a different project, so read the notes under each figure."
            />
            <div className="max-w-[68ch] text-oa-ink2 lg:pt-2">
              <h3 className="text-lg font-semibold text-oa-ink">Where they agree</h3>
              <p className="mt-3">
                All four top the small-business band at $50,000, and three start it at $15,000. For mid-market, two say
                $50,000 to $150,000 and two stretch to $250,000. Three put enterprise at $150,000 to $500,000 or more;
                Groviya's multi-cloud band runs to $1,000,000 or more.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Plate
              spec={RANGES}
              fig={1}
              first
              stamp={["CHART · FOUR PUBLISHED GUIDES", `CHECKED ${MARKET_CHECKED.toUpperCase()}`]}
              caption="Each guide's published range for small, mid-market and enterprise companies, before Salesforce licences. The table below carries the same figures with each guide's assumptions."
            />
          </div>
          <div className="mt-12">
            <DataTable
              label={`Published Salesforce implementation cost ranges by company size, four guides, checked ${MARKET_CHECKED}`}
              ground="surface"
              head={["Guide", "Small business", "Mid-market", "Enterprise"]}
              rows={SOURCES.map((s) => ({
                k: s.k,
                cells: [
                  <>
                    <a href={s.url} {...ext} className="oa-link">
                      {s.name}
                    </a>
                    <span className="mt-1 block text-xs font-normal text-oa-ink3">{s.when}</span>
                  </>,
                  ...[
                    [s.small, s.smallNote],
                    [s.mid, s.midNote],
                    [s.ent, s.entNote],
                  ].map(([range, note]) => (
                    <>
                      <span className="block font-mono text-base text-oa-ink">{range}</span>
                      {note && <span className="mt-1 block text-xs leading-snug text-oa-ink3">{note}</span>}
                    </>
                  )),
                ],
              }))}
              source={`Ranges as each guide publishes them, re-checked ${MARKET_CHECKED}. Market figures, not OneAlgorithm prices.`}
            />
          </div>
        </PlateScope>
      </Section>

      <Section tone="paper" id="movers">
        <SectionHeading
          title="Six things that decide where you land in the range"
          lede="The bands are wide because these six change from one business to the next. Three of them are work we have delivered, and we price them from your org, not from a guide."
        />
        <CardGrid columns={3} className="mt-12">
          <Card
            icon={Users}
            title="Users, roles and training"
            body="More people means more roles, more permission sets and more training. BrainSpate's guide prices training at $2,000 to $10,000 on its own."
          />
          <Card
            icon={Layers}
            title="How many clouds and products"
            body="One sales process is a different job from sales, service and marketing together. Groviya's guide sets its bands by exactly this: how many clouds the project covers."
          />
          <Card
            wire
            to={DM}
            icon={Database}
            title="How much data moves, and how clean it is"
            body={
              <>
                Moving a lot of messy records costs more than moving a little clean data. BrainSpate puts data migration
                at $5,000 to $50,000 or more.
                <Ours>We migrate QuickBase and Kissflow systems into Salesforce, reconciled before go-live.</Ours>
              </>
            }
          />
          <Card
            wire
            to={INT}
            icon={Plug}
            title="What Salesforce has to talk to"
            body={
              <>
                Each connection to an ERP, a finance system or the website is its own piece of work. BrainSpate puts
                integrations at $5,000 to $75,000 or more.
                <Ours>We have built an SAP-to-Salesforce sync, with the owner of every record agreed before the build.</Ours>
              </>
            }
          />
          <Card
            icon={Workflow}
            title="Configuration or custom build"
            body="BrainSpate prices basic configuration (fields, workflows, reports and dashboards) at $10,000 to $25,000, and custom apps, Apex code and automation at $50,000 to $150,000 or more."
          />
          <Card
            wire
            to={MS}
            icon={LifeBuoy}
            title="Who runs it after go-live"
            body={
              <>
                Salesforce needs someone to keep it in step with the business. Cynoteck's guide puts a dedicated admin
                at $70,000 to $120,000 or more a year.
                <Ours>We run weekly Salesforce development for a lending company, ongoing since April 2026.</Ours>
              </>
            }
          />
        </CardGrid>
      </Section>

      <MidStrip line="A real figure starts with your org, not a guide." label="Book a free health check" />

      {/* FIG. 2 + Girikon's table, side by side at xl (6/6, plate on the right). */}
      <Section tone="surface" clip id="phases">
        <PlateScope>
          <SectionHeading
            title="What each part of the work costs"
            lede={
              <>
                <a href={GIRIKON.url} {...ext} className="oa-link">
                  Girikon's guide
                </a>{" "}
                ({GIRIKON.when}) prices seven parts of an implementation separately.
              </>
            }
          />
          <div className="mt-12 grid gap-12 xl:grid-cols-2 xl:items-start xl:gap-14">
            <div>
              <DataTable
                label="Salesforce implementation cost by part of the work, Girikon"
                ground="surface"
                head={["Part of the work", "Girikon's range"]}
                rows={PHASES.map((p) => ({
                  k: p.k,
                  cells: [p.label, <span className="font-mono text-base text-oa-ink">{p.range}</span>],
                }))}
                source={`Girikon, ${GIRIKON.when}; read ${MARKET_CHECKED}. Not a OneAlgorithm price.`}
              />
              <p className="mt-8 max-w-[68ch] text-oa-ink2">
                <a href={FOLIO3.url} {...ext} className="oa-link">
                  Folio3
                </a>{" "}
                ({FOLIO3.when}) splits a typical budget by share instead: discovery and design 10 to 15 percent, build
                and configuration 40 to 60, integrations and data 15 to 30, testing, user acceptance and training 10 to
                20, and go-live and hypercare 5 to 10. BrainSpate's component figures in the cards above differ again,
                because each guide prices a different project.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[760px]">
              <Plate
                spec={BY_PHASE}
                fig={2}
                stamp={["CHART · GIRIKON'S PUBLISHED RANGES", `READ ${MARKET_CHECKED.toUpperCase()}`]}
                caption="Girikon's seven ranges on one scale. Open-ended ranges end in an arrow."
              />
            </div>
          </div>
        </PlateScope>
      </Section>

      <Section tone="paper" id="clouds">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            title="Cost by Salesforce cloud"
            lede={
              <>
                <a href={FOLIO3.url} {...ext} className="oa-link">
                  Folio3's guide
                </a>{" "}
                ({FOLIO3.when}) gives a typical one-time implementation range for each product, excluding licences.
              </>
            }
          />
          <p className="max-w-[68ch] text-oa-ink2 lg:pt-2">
            Each cloud is its own build: Service Cloud brings channels and case rules, Field Service brings scheduling
            and a mobile app, Commerce brings a storefront. Two clouds cost more than one, which is why the first step
            is deciding which ones you need.
          </p>
        </div>
        <div className="mt-12">
          <DataTable
            label="Salesforce implementation cost by cloud or product, Folio3, excluding licences"
            head={["Cloud or product", "Implementation services", "What drives the effort"]}
            rows={CLOUDS.map((c) => ({
              cells: [c.name, <span className="font-mono text-base text-oa-ink">{c.range}</span>, c.note],
            }))}
            source={`Folio3, ${FOLIO3.when}; read ${MARKET_CHECKED}. Services only, excluding licences. Not OneAlgorithm prices.`}
          />
        </div>
      </Section>

      <Section tone="surface" id="licences">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              title="Salesforce's own prices, per user per month"
              lede="The licence half is arithmetic: seats times the edition price. These are Salesforce's list prices for Sales Cloud; Service Cloud lists the same figure for each edition."
            />
            <div className="mt-10">
              <DataTable
                label={`Salesforce Sales Cloud list prices per user per month, read ${PRICES_CHECKED}`}
                ground="surface"
                head={["Edition", "Per user / month", "Terms"]}
                rows={EDITIONS.map((e) => ({
                  cells: [e.name, <span className="font-mono text-base text-oa-ink">{usd(e.price)}</span>, e.note],
                }))}
                source={`Read on salesforce.com/sales/pricing on ${PRICES_CHECKED}. On 1 September 2026 the same page listed Enterprise ($175), Unlimited ($350) and Agentforce 1 ($550); it now lists Core, Advanced and Max.`}
              />
            </div>
          </div>
          <div className="lg:pt-24">
            <DocNote
              said="Salesforce offers a Free Suite for up to two users with no contract or credit card. It stays free as long as someone logs in at least once every 60 days."
              title="Salesforce: Free CRM"
              url="https://www.salesforce.com/crm/free-crm/"
              readOn={PRICES_CHECKED}
              meaning="Two people can start on Salesforce for nothing. When a third person needs access, you are pricing Starter Suite or Pro Suite, plus the setup work in the guides above."
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-h3 font-semibold text-oa-ink">A worked first year</h3>
          <p className="mt-3 max-w-[68ch] text-oa-ink2">
            Licences from the table above, plus the published implementation band for a company that size. Every input
            is already on this page.
          </p>
          <div className="mt-8">
            <DataTable
              label="Worked first-year Salesforce cost: licences plus the published implementation band"
              ground="surface"
              head={["Example org", "Licences, year one", "Implementation, published band", "Year one, before add-ons"]}
              rows={SCENARIOS.map((s) => ({
                cells: [
                  `${s.users} users on ${s.edition}`,
                  <span className="font-mono text-oa-ink">
                    {usd(s.lic)}
                    <span className="mt-1 block font-sans text-xs text-oa-ink3">
                      {s.users} × {usd(price(s.edition))} × 12
                    </span>
                  </span>,
                  <span className="font-mono text-oa-ink">
                    {usd(s.band[0])} to {usd(s.band[1])}
                    <span className="mt-1 block font-sans text-xs text-oa-ink3">{s.bandName}</span>
                  </span>,
                  <span className="font-mono text-base font-medium text-oa-ink">
                    {usd(s.lo)} to {usd(s.hi)}
                  </span>,
                ],
              }))}
              source="Small business: three of four guides (Cynoteck starts at $10,000). Mid-market: BrainSpate and American Chase. Before storage, AppExchange apps and anything Salesforce lists as available for purchase."
            />
          </div>
          <p className="mt-8 max-w-[68ch] text-oa-ink2">
            Want this worked out for your own org?{" "}
            <a href={SF_PHONE.href} data-cta="table" className="oa-link font-mono">
              Call {SF_PHONE.display}
            </a>{" "}
            or{" "}
            <a href="#start" data-cta="table" className="oa-link">
              book the free health check
            </a>
            .
          </p>
        </div>
      </Section>

      <Section tone="paper" id="beyond-licences">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading title="Costs on a Salesforce bill that are not licences" />
            <div className="mt-8 max-w-[68ch]">
              <CheckList
                items={[
                  "Premier Success Plan: included with Core, Advanced and Max, and available for purchase on Pro Suite. Standard Success comes with every licence; Signature is priced by your Salesforce account executive.",
                  "Sandboxes: Pro Suite and up include a Developer sandbox. Core, Advanced and Max include one Partial Copy sandbox. A Full sandbox is included in Advanced and Max and available for purchase on Core.",
                  "Storage above your allowance. Cynoteck's guide quotes about $125 a month per 500 MB.",
                  "AppExchange apps that carry their own subscription.",
                  "Someone to run the org once it is live. Cynoteck's guide puts a dedicated admin at $70,000 to $120,000 or more a year.",
                  "List-price changes at renewal. Read the price terms in your order form before you sign.",
                ]}
              />
            </div>
            <p className="mt-6 font-mono text-xs text-oa-ink3">
              Salesforce figures read on salesforce.com on {PRICES_CHECKED}. Storage and admin figures: Cynoteck, updated
              11 September 2026.
            </p>
          </div>
          <div>
            <DocNote
              said="Salesforce raised list prices for the Enterprise and Unlimited editions of Sales Cloud, Service Cloud, Field Service and some Industries Clouds by an average of 6 percent on 1 August 2025, and left Foundations, Starter and Pro unchanged."
              title="Salesforce news: pricing update, 17 June 2025"
              url="https://www.salesforce.com/news/stories/pricing-update-2025/"
              readOn={PRICES_CHECKED}
              meaning="List prices move. Budget the renewal as well as the first year, and agree the price terms before you sign."
            />
            <div className="border-t border-oa-hairlineStrong pt-6">
              <h3 className="text-lg font-semibold text-oa-ink">Check what you already pay for</h3>
              <p className="mt-3 max-w-[68ch] text-oa-ink2">
                In Setup, the Company Information page lists each user licence type with the total you pay for, how many
                are assigned and how many remain. Set the assigned seats against the people who actually log in: seats
                nobody uses are the first saving.
              </p>
              <Link to={HC} className="oa-link mt-3 inline-flex min-h-11 items-center">
                The free health check counts them for you
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" id="over-budget">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              title="Why Salesforce projects go over budget, and how to keep the cost down"
              lede={
                <>
                  <a href={CYNTEXA.url} {...ext} className="oa-link">
                    Cyntexa's guide
                  </a>{" "}
                  ({CYNTEXA.when}) names the usual causes: scope creep, weak discovery, data-quality surprises and late
                  decisions. Each one has a fix that costs less than the overrun.
                </>
              }
            />
            <h3 className="mt-10 text-lg font-semibold text-oa-ink">What pushes a project past its band</h3>
            <ul className="mt-4 space-y-2 text-oa-ink2">
              {[
                "More than one cloud",
                "Several systems to connect",
                "Years of unclean data to move",
                "Custom processes Salesforce does not do natively",
                "A large number of users and roles",
              ].map((b) => (
                <li key={b} className="border-t border-oa-hairline pt-2">
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10 border border-oa-hairlineStrong bg-oa-paper p-5 font-mono text-sm text-oa-ink">
              <p>Contingency = 10–20% × (core costs + hidden costs)</p>
              <p className="mt-2 text-oa-ink2">Worked: 15% × ($120,000 + $40,000) = $24,000</p>
              <p className="mt-3 text-xs text-oa-ink3">
                <a href={GIRIKON.url} {...ext} className="oa-link">
                  Girikon's formula
                </a>
                , {GIRIKON.when}
              </p>
            </div>
          </div>
          <dl className="lg:col-span-7">
            {[
              {
                t: "Phase the rollout",
                d: "Launch the process that pays back first, then add teams and clouds. Each phase is scoped and priced on its own, so a late request lands in the next phase instead of on this bill.",
              },
              {
                t: "Configure before you custom-build",
                d: "Standard features cost less to build and to keep running than custom code. BrainSpate prices basic configuration at $10,000 to $25,000 and custom apps and code at $50,000 to $150,000 or more.",
              },
              {
                t: "Clean the data before it moves",
                d: (
                  <>
                    Data surprises are the classic mid-project overrun. We map, clean and load, then reconcile record
                    counts and totals before go-live.{" "}
                    <Link className="oa-link" to={DM}>
                      Salesforce data migration
                    </Link>
                  </>
                ),
              },
              {
                t: "Count the seats you actually use",
                d: (
                  <>
                    The free health check sets your licences against real use, so you renew what people use.{" "}
                    <Link className="oa-link" to={HC}>
                      What the free health check covers
                    </Link>
                  </>
                ),
              },
              {
                t: "Carry a contingency line",
                d: "Girikon's guide adds 10 to 20 percent of core and hidden costs as contingency. A line in the budget beats a change order mid-build.",
              },
            ].map((l) => (
              <div key={l.t} className="grid gap-2 border-t border-oa-hairlineStrong py-6 sm:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] sm:gap-8">
                <dt className="text-lg font-semibold text-oa-ink">{l.t}</dt>
                <dd className="max-w-[68ch] text-oa-ink2">{l.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="paper" id="rates">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            title="What Salesforce consultants charge, and how you pay"
            lede="The rate depends on who does the work. These are published figures from two guides and the US Bureau of Labor Statistics, not OneAlgorithm rates."
          />
          <p className="max-w-[68ch] text-oa-ink2 lg:pt-2">
            Compare written scopes, not hourly rates: the scope decides the hours.{" "}
            <Link className="oa-link" to="/services/salesforce-consulting-partner-pennsylvania">
              How to tell a Salesforce partner from a freelancer
            </Link>{" "}
            ·{" "}
            <Link className="oa-link" to="/services/salesforce-consultant-austin">
              Set Salesforce up yourselves? When to bring in help
            </Link>
          </p>
        </div>
        <div className="mt-12">
          <DataTable
            label="Published cost of a Salesforce implementation by who does the work"
            head={["Who does the work", "Published cost", "What you get"]}
            rows={[
              { cells: ["Do it yourself", <span className="font-mono text-oa-ink">$5,000+</span>, "Your own staff, learning the platform as they go"] },
              {
                cells: [
                  "Freelancer or contractor",
                  <span className="font-mono text-oa-ink">
                    $25 to $250 an hour
                    <span className="mt-1 block font-sans text-xs text-oa-ink3">Cynoteck: $50 to $150 an hour</span>
                  </span>,
                  "One person for a defined task",
                ],
              },
              {
                cells: [
                  "In-house hire",
                  <span className="font-mono text-oa-ink">
                    $80,000 to $170,000 a year
                    <span className="mt-1 block font-sans text-xs text-oa-ink3">
                      BLS medians, May 2025: computer systems analysts {usd(BLS.analysts.median)}, software developers{" "}
                      {usd(BLS.developers.median)} (salary only)
                    </span>
                  </span>,
                  "A dedicated person who learns your business, plus recruiting and training",
                ],
              },
              {
                cells: [
                  "Consulting partner",
                  <span className="font-mono text-oa-ink">
                    $90 to $300 an hour
                    <span className="mt-1 block font-sans text-xs text-oa-ink3">Cynoteck, certified partners: $100 to $300</span>
                  </span>,
                  "A team that covers configuration, data and integration, end to end",
                ],
              },
            ]}
            source={
              <>
                Ascendix ({ASCENDIX.when}), main figures; Cynoteck (updated 11 September 2026); BLS Occupational
                Employment and Wage Statistics, May 2025 (
                <a className="oa-link" href={BLS.analysts.url} {...ext}>
                  15-1211
                </a>
                ,{" "}
                <a className="oa-link" href={BLS.developers.url} {...ext}>
                  15-1252
                </a>
                ). Salesforce roles have no occupation code of their own, so BLS counts them inside these; the medians
                exclude benefits.
              </>
            }
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-h3 font-semibold text-oa-ink">How Salesforce projects are priced</h3>
            <dl className="mt-6">
              {[
                {
                  t: "Fixed price",
                  d: "You agree a scope and a total up front. Cyntexa's guide calls it the right model for a well-scoped build.",
                },
                {
                  t: "Time and materials",
                  d: "You pay an hourly or daily rate for whatever the project needs. Cyntexa sees it as a fit for ongoing support.",
                },
                {
                  t: "Flat monthly fee",
                  d: "A monthly fee for a set number of hours, common for maintenance work. Ascendix notes it can bring a lower hourly rate than a fixed project.",
                },
              ].map((m) => (
                <div key={m.t} className="grid gap-2 border-t border-oa-hairlineStrong py-5 sm:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] sm:gap-8">
                  <dt className="font-semibold text-oa-ink">{m.t}</dt>
                  <dd className="text-oa-ink2">{m.d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-h3 font-semibold text-oa-ink">How we price</h3>
            <dl className="mt-6">
              <div className="border-t border-oa-hairlineStrong py-5">
                <dt className="font-semibold text-oa-ink">Project work</dt>
                <dd className="mt-2 max-w-[68ch] text-oa-ink2">
                  A written scope first, then the work, then a handover. Fixes are scoped in writing before anything
                  starts.
                </dd>
              </div>
              <div className="border-t border-oa-hairlineStrong py-5">
                <dt className="font-semibold text-oa-ink">Ongoing work</dt>
                <dd className="mt-2 max-w-[68ch] text-oa-ink2">
                  Weekly administration and development, with hours reported every week.{" "}
                  <Link className="oa-link" to={MS}>
                    Salesforce managed services
                  </Link>
                </dd>
              </div>
              <div className="border-t border-oa-hairlineStrong py-5">
                <dt className="font-semibold text-oa-ink">Where to start</dt>
                <dd className="mt-2 max-w-[68ch] text-oa-ink2">
                  The free one-week Salesforce health check: a licence count and a rough cost before anyone signs.{" "}
                  <Link className="oa-link" to={HC}>
                    What it covers
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="surface" compact id="industry">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <h2 className="text-h3 font-semibold text-oa-ink">Regulated industries cost more to implement</h2>
          <p className="max-w-[68ch] text-oa-ink2">
            <a href={FOLIO3.url} {...ext} className="oa-link">
              Folio3's guide
            </a>{" "}
            ({FOLIO3.when}) puts the extra for HIPAA or PCI compliance, audits and validation at 10 to 30 percent.
            Lending is where we work every week: ongoing Salesforce development for a lending company since April 2026.{" "}
            <Link className="oa-link" to={MS}>
              How that work runs
            </Link>
          </p>
        </div>
      </Section>

      {/* The one mid-page night band (spec §5 COST 12): the registry record
          beside the offer. Not adjacent to the hero or the Desk. */}
      <Section tone="night" grid id="real-figure">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <h2 className="text-h2 font-semibold text-oa-nightInk">How we get you a real figure</h2>
            <p className="mt-6 max-w-[68ch] text-lede text-oa-nightInk2">
              If you already own Salesforce, the free one-week health check reads your licences against real use, your
              data quality, what is still done by hand, who can see what, and which integrations fail quietly. You get a
              written list, ranked by what to fix first.
            </p>
            <p className="mt-5 max-w-[68ch] text-oa-nightInk2">
              If you are choosing Salesforce, we give you a licence count and a rough cost before you sign, and tell you
              when a smaller edition does the job.
            </p>
            {/* Allowed proof, verbatim from SF_PEOPLE (2026-10-23), with the Person schema. */}
            <PeopleStrip tone="night" className="mt-8 max-w-[68ch] border-t border-white/10 pt-6 text-oa-nightInk2" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryCTA href="#start" cta="mid">
                Book a free health check
              </PrimaryCTA>
              <SecondaryCTA href={SF_PHONE.href} cta="mid">
                Call {SF_PHONE.display}
              </SecondaryCTA>
            </div>
          </div>
          <aside className="border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
            <h3 className="text-sm font-semibold text-oa-nightInk">Salesforce's record of us</h3>
            <div className="mt-5 border-t border-white/10 pt-5">
              <SalesforceRecordCard />
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="paper" id="objections">
        <Objections
          items={[
            {
              q: "How do we know you are a real Salesforce partner?",
              a: `Check Salesforce's record rather than our word: a listed Consulting Partner with ${SF_CERTIFIED_PEOPLE} Salesforce-certified people and ${SF_CERTIFICATIONS} certifications.`,
              checked: { label: `AppExchange listing ${SF_LISTING_ID}`, href: SF_APPEXCHANGE_URL },
            },
            {
              q: "Will the price grow once the work starts?",
              a: "Every piece of work is scoped in writing before it starts: a written scope, then the work, then a handover.",
            },
            SF_OBJECTIONS.pitch,
            SF_OBJECTIONS.city,
          ]}
        />
      </Section>

      <Section tone="surface" id="faq">
        <SectionHeading title="What people ask about Salesforce cost" />
        <FAQList faqs={FAQS} sources={{ checked: "October 2026", links: FAQ_SOURCES }} />
      </Section>

      <Section tone="paper" id="more">
        <SectionHeading
          title="More on Salesforce from OneAlgorithm"
          lede={
            <>
              Every service below starts from the same free health check.{" "}
              <Link className="oa-link" to="/services/salesforce">
                How a Salesforce implementation runs
              </Link>
            </>
          }
        />
        <RouteBoard groups={["services"]} />
        <p className="mt-10 max-w-[68ch] text-oa-ink2">
          Buying for a Chester County business?{" "}
          <Link className="oa-link" to="/services/salesforce-consultant-chester-county">
            Which edition you need, and a licence count before you sign
          </Link>
        </p>
      </Section>

      <Desk
        heading="Get your number, not the market's"
        body="Tell us what you run, or what you are choosing between. You get a licence count and a rough cost before you sign anything."
        form={{
          topic: "cost",
          topicLabel: "Salesforce implementation cost",
          heading: "Book a free health check",
          prompt: "How many users, and which clouds?",
          submitLabel: "Book a free health check",
        }}
      />
    </Layout>
  );
}
