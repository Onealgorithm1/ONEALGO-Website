import { Link } from "react-router-dom";
import { Link2, ListChecks, ShieldCheck, Wrench } from "lucide-react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Card,
  CardGrid,
  PageHero,
  PrimaryCTA,
  ProcessSteps,
  Prose,
  SecondaryCTA,
  Section,
  SectionHeading,
} from "../../components/site";
import {
  AnswerBand,
  DataTable,
  Desk,
  DocNote,
  FAQList,
  HcLink,
  Objections,
  PeopleStrip,
  Plate,
  PlateScope,
  RouteBoard,
  SF_OBJECTIONS,
  WiredRow,
  type SfFaq,
} from "../../components/salesforce";
import { RecordLine, SalesforceRecordCard } from "../../components/SalesforceRecordCard";
import { SF_PHONE } from "../../data/salesforceProof";
import { PLATES } from "../../data/plates/marketing-cloud";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createFAQSchema,
  createLocalBusinessSchema,
  createServiceSchema,
  createWebPageSchema,
} from "../../components/StructuredData";

/* Salesforce Marketing Cloud consulting: nationwide service page. Added
 * 2026-10-21; rebuilt 2026-10-23 on the Salesforce plate system
 * (onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/design-spec.md §3 MC, §5 MC,
 * plus the wide-layout and voice addenda).
 *
 * DEMAND: "salesforce marketing cloud consulting" KD 11, cluster ~1,800/mo US; the
 * title uses the plural "Consultants" (the singular SERP is job boards).
 *
 * ⛔ PROOF: two recurring "Marketing Cloud Support" POs, invoiced ~18 months
 * (salesforce-delivery-evidence-2026-09-01.md). Client NOT named; no dates, sector
 * or tool scope on the page (which tools that engagement touched is an owner fact,
 * gap MC-5). Do not upgrade "support" into a claimed greenfield implementation.
 * Lender bulk-email work is core-org work, not Marketing Cloud: keep it off this page.
 * ⛔ No Marketing Cloud certification is stated (owner decision 12). The 53 figure is
 * the firm total from the AppExchange listing (data/salesforceProof.ts), not broken
 * out by cloud. Account Engagement (Pardot), Data Cloud, Personalization: no delivery
 * evidence, not claimed. MuleSoft: not mentioned here.
 * ⛔ OWNER-GATED (decision 12): whether the free health check covers the Marketing
 * Cloud ACCOUNT. Until confirmed: the primary CTA stays "Tell us what Marketing Cloud
 * is getting wrong", the free week is described as covering the Salesforce side only,
 * and the Service schema carries no Offer. When confirmed, switch the CTA to "Book a
 * free health check" and add `offers: SF_HEALTH_CHECK_OFFER` to createServiceSchema.
 * Voice rule (addendum 2026-10-23): no visible line announces what we lack (no
 * certification, no reviews, no case studies); honesty is kept by never claiming them.
 */

const PAGE_URL = "https://onealgorithm.com/services/salesforce-marketing-cloud-consulting";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og-salesforce-marketing-cloud-consulting.jpg";
const PLATE = PLATES["marketing-cloud-connect-data-flow"];
const READ_ON = "23 October 2026";
const DESCRIPTION =
  "Marketing Cloud consultants for running accounts: Connect sync, journeys, opt-outs. Free Salesforce health check, listed partner. Call (610) 890-9711.";

/* Salesforce documentation, each found and read 2026-10-23. Paraphrased on the page,
   never quoted (Salesforce trademark guidelines bar reusing their text). */
const DOCS = {
  connect: "https://help.salesforce.com/s/articleView?id=mktg.mc_co_marketing_cloud_connect.htm&language=en_US&type=5",
  unsubscribes: "https://help.salesforce.com/s/articleView?id=mc_co_unsubscribes.htm&language=en_US&type=5",
  emailStudio: "https://help.salesforce.com/s/articleView?id=sf.mc_es_email_studio.htm&language=en_US&type=5",
  contentBuilder: "https://help.salesforce.com/s/articleView?id=sf.mc_ceb_content_builder.htm&language=en_US&type=5",
  journeyBuilder: "https://help.salesforce.com/s/articleView?id=mktg.mc_jb_journey_builder.htm&language=en_US&type=5",
  automationStudio: "https://help.salesforce.com/s/articleView?id=mktg.mc_as_automation_studio.htm&language=en_US&type=5",
  contactBuilder: "https://help.salesforce.com/s/articleView?id=mc_cab_contact_builder.htm&language=en_US&type=5",
  ampscript: "https://developer.salesforce.com/docs/marketing/marketing-cloud-ampscript/guide",
  pricing: "https://www.salesforce.com/marketing/engagement/pricing/",
  accountEngagement: "https://www.salesforce.com/marketing/b2b-automation/",
  overview: "https://www.salesforce.com/marketing/",
} as const;

/* Problem -> what we do. Card 1 says "support", never which tools that engagement
   covered (owner fact, gap MC-5). The old fourth card ("Getting data out": bulk pulls
   of email and engagement data) was dropped 2026-10-23: no Marketing Cloud evidence
   behind it (the bulk-email work was core-org work for the lender, see header). */
const WORK = [
  {
    icon: Wrench,
    title: "Support for a running account",
    body: "Month-by-month support for an account that is already sending. We supported a client's live account this way for about 18 months.",
  },
  {
    icon: Link2,
    title: "The CRM connection",
    body: "Marketing Cloud can only send to what Salesforce gives it. We check what syncs through Marketing Cloud Connect, how often, and whether the fields marketing filters on are filled in.",
  },
  {
    icon: ShieldCheck,
    title: "Consent and suppression",
    body: "Unsubscribes and Email Opt Out have to agree in both systems. We test that path in both directions before we change anything else.",
  },
  {
    icon: ListChecks,
    title: "Inherited journeys and automations",
    body: "We list what is still running, what it sends, and whether anyone would miss it if it stopped, then switch off what nobody needs.",
  },
];

/* Gap MC-2: the five checks under Salesforce's own tool names. These are things we
   CHECK, not delivery claims, and "why it matters" states the risk, not a frequency. */
const CHECKS: { check: string; where: string; why: string }[] = [
  {
    check: "Which Salesforce objects and fields sync, and how often",
    where: "Marketing Cloud Connect · synchronized data sources in Contact Builder",
    why: "Journeys can only target fields that actually arrive, and only as fresh as the last sync.",
  },
  {
    check: "Email Opt Out and unsubscribes, in both directions",
    where: "Email Opt Out on Contacts and Leads · All Subscribers in Marketing Cloud",
    why: "A send to someone who opted out is the mistake a customer remembers.",
  },
  {
    check: "Automation Studio automations that run but send nothing",
    where: "Automation Studio · activity history",
    why: "An automation that fails quietly leaves a gap nobody notices until the numbers drop.",
  },
  {
    check: "Data extensions in Contact Builder nobody can explain",
    where: "Contact Builder · Data Extensions",
    why: "A journey built on a stale extension sends to the wrong people.",
  },
  {
    check: "Who has access, and whether they still should",
    where: "Marketing Cloud Setup · Users",
    why: "Former staff and agencies keep a login to your customer data until someone removes it.",
  },
];

/* Gap MC-2: one row per tool. "What we check there" says what we look at, never what
   "usually breaks" (no frequency data). Each link is Salesforce's own documentation. */
const TOOLS: { tool: string; what: string; check: string; href: string; doc: string }[] = [
  {
    tool: "Email Studio",
    what: "Where emails are built, sent and tracked, with subscriber lists and send settings.",
    check: "Send classifications, sender profiles and the tracking on recent sends.",
    href: DOCS.emailStudio,
    doc: "Salesforce Help",
  },
  {
    tool: "Content Builder",
    what: "The shared library of emails, templates, content blocks and images.",
    check: "Templates and blocks reused across sends, and what changes when one is edited.",
    href: DOCS.contentBuilder,
    doc: "Salesforce Help",
  },
  {
    tool: "Journey Builder",
    what: "Multi-step journeys: an entry source, waits, decisions and messages.",
    check: "Entry sources, exit criteria, and journeys still running after their campaign ended.",
    href: DOCS.journeyBuilder,
    doc: "Salesforce Help",
  },
  {
    tool: "Automation Studio",
    what: "Scheduled and triggered automations: imports, SQL queries and sends.",
    check: "Schedules, failures, and automations that run but send nothing.",
    href: DOCS.automationStudio,
    doc: "Salesforce Help",
  },
  {
    tool: "Contact Builder",
    what: "Contact data, data extensions and how they relate to each other.",
    check: "Each data extension, where its data comes from, and which journeys depend on it.",
    href: DOCS.contactBuilder,
    doc: "Salesforce Help",
  },
  {
    tool: "AMPscript",
    what: "Marketing Cloud's scripting language for personalising emails, SMS and CloudPages.",
    check: "The lookups and conditions behind content that renders wrongly for some subscribers.",
    href: DOCS.ampscript,
    doc: "Salesforce developer guide",
  },
  {
    tool: "Marketing Cloud Connect",
    what: "Salesforce's connector between Sales or Service Cloud and Marketing Cloud.",
    check: "Synchronized objects, sync frequency, and the opt-out path in both directions.",
    href: DOCS.connect,
    doc: "Salesforce Help",
  },
];

/* The HTML version of FIG. 1, row for row. Keys match the plate's wires and nodes. */
const FLOW: { k: string; title: string; body: string }[] = [
  { k: "crm", title: "Your Salesforce org", body: "Contacts, Leads and Campaign Members live here, with the Email Opt Out field." },
  { k: "sync", title: "Marketing Cloud Connect", body: "Copies the objects and fields you choose into Marketing Cloud on a schedule." },
  { k: "de", title: "Contact Builder", body: "They arrive as synchronized data extensions: your CRM as Marketing Cloud sees it." },
  { k: "journey", title: "Journey Builder and Automation Studio", body: "Decide who gets which message, and when." },
  { k: "send", title: "Sends", body: "Email and SMS go to the audience, minus anyone unsubscribed." },
  {
    k: "optout",
    title: "The way back",
    body: "An unsubscribe link or the Marketing Cloud Unsubscribe button updates both systems. A hand-ticked Email Opt Out does not. We test both paths.",
  },
];

/* Gap MC-9. Step 2 covers the SALESFORCE side only until the owner confirms the free
   week includes the Marketing Cloud account (decision 12). No billing terms in step 4. */
const STEPS = [
  {
    title: "Describe the symptom",
    body: "Call (610) 890-9711 or send the form: a wrong audience, a journey that stopped, opt-outs you do not trust.",
  },
  {
    title: "A one-week review of the Salesforce side",
    body: "What syncs through Marketing Cloud Connect, how often, and whether opt-outs agree in both systems.",
    to: "/services/salesforce-health-check",
  },
  {
    title: "A written list",
    body: "What is still running, what it sends, and whether anyone would miss it if it stopped, ranked by what to fix first.",
  },
  {
    title: "Ongoing support, if you want it",
    body: "We take the requests one at a time, each scoped in writing first.",
  },
];

/* Real autocomplete and PAA phrasings (questions/questions-by-page.md, Marketing Cloud
   section). ⛔ Not repeated on sibling pages. "What does a consultant do" moved up to
   the AnswerBand so it is not answered twice. Passed to createFAQSchema as-is. */
const FAQS: SfFaq[] = [
  {
    q: "How does Marketing Cloud connect to Salesforce CRM?",
    a: "Through Marketing Cloud Connect, Salesforce's own connector. It is installed in your Salesforce org as a managed package and linked to your Marketing Cloud account. You choose which objects and fields to synchronize, such as Contacts, Leads and Campaign Members. They arrive in Contact Builder as synchronized data extensions on a schedule, and email tracking and unsubscribes are written back to the Salesforce record.",
  },
  {
    q: "Is Marketing Cloud the same as Pardot?",
    a: "They are two different products that now share the Marketing Cloud name. Pardot is now Marketing Cloud Account Engagement, Salesforce's B2B lead-nurturing product, built around Sales Cloud. Marketing Cloud Engagement is the separate platform for email, SMS and multi-step journeys. This page covers Marketing Cloud Engagement.",
  },
  {
    q: "How long have you supported Salesforce Marketing Cloud?",
    a: "About 18 months of month-by-month support on a client's live Marketing Cloud account. The client stays unnamed. Supporting accounts that are already running is the work this page offers.",
  },
  {
    q: "Is Salesforce Marketing Cloud a CRM?",
    a: "No. The CRM is Sales Cloud or Service Cloud, where your accounts, contacts and opportunities live. Marketing Cloud is the messaging side. It uses CRM data to decide who gets what, which is why we check the CRM data whenever Marketing Cloud sends to the wrong people.",
  },
  {
    q: "What is Salesforce Marketing Cloud?",
    a: "Salesforce's set of marketing products for sending email, SMS and other messages, building multi-step customer journeys, and measuring the results. It is sold and run separately from the core Salesforce CRM, and the two are linked with Marketing Cloud Connect, which Salesforce documents in its help pages.",
  },
  {
    q: "What is AMPscript, and when do you need it?",
    a: "AMPscript is Marketing Cloud Engagement's scripting language. It runs inside emails, SMS messages and CloudPages to personalise content from data extension values, look up related rows and apply conditions. You need it when a template has to do more than drop in a field. When a personalised email renders wrongly for some subscribers, the AMPscript and the data it reads are where we look.",
  },
  {
    q: "How much does Salesforce Marketing Cloud support cost?",
    a: "Two parts. Salesforce's licence: its published list prices for Marketing Cloud Engagement are $2,000 per org per month for Pro+, $5,500 for Corporate+ and $30,000 for Enterprise+, billed annually (salesforce.com, read 23 October 2026). Our support is scoped in writing, from what you tell us and what we find in the Salesforce org that feeds Marketing Cloud, before anything is signed.",
    link: { to: "/services/salesforce-implementation-cost", label: "What Salesforce work costs" },
  },
];

/* Spec 2.10: existing site wording only. The first answer is this page's existing
   wording ("a plain list of what is still running…"). */
const OBJECTIONS = [
  {
    q: "Our account was built by someone who has left.",
    a: "We start there: a plain list of what is still running, what it sends, and whether anyone would miss it if it stopped. Fewer moving parts make every later change cheaper and safer.",
  },
  SF_OBJECTIONS.pitch,
  SF_OBJECTIONS.city,
];

const MONO = "font-mono text-[11px] uppercase tracking-[0.14em] text-oa-ink3";

export default function SalesforceMarketingCloud() {
  useSEO({
    title: "Salesforce Marketing Cloud Consultants | OneAlgorithm",
    description: DESCRIPTION,
    canonical: getCanonicalUrl("/services/salesforce-marketing-cloud-consulting"),
    ogTitle: "Salesforce Marketing Cloud Consultants | OneAlgorithm",
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl("/services/salesforce-marketing-cloud-consulting"),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: PLATE.alt,
    twitterTitle: "Salesforce Marketing Cloud Consultants | OneAlgorithm",
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Marketing Cloud Consulting",
          "Salesforce Marketing Cloud consulting and ongoing support for accounts already running: Marketing Cloud Connect configuration, consent and suppression checked in both directions, Journey Builder and Automation Studio changes, and data extensions in Contact Builder. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "Salesforce Marketing Cloud consulting",
          PAGE_URL,
          // No `offers` until the owner confirms the free week covers Marketing Cloud (decision 12).
          { image: "https://onealgorithm.com/media/salesforce/marketing-cloud-connect-data-flow-1600x900.jpg" },
        )}
      />
      <StructuredData
        data={createWebPageSchema("Salesforce Marketing Cloud Consultants", DESCRIPTION, PAGE_URL, {
          dateModified: "2026-10-23",
          primaryImage: {
            url: "https://onealgorithm.com/media/salesforce/marketing-cloud-connect-data-flow-1600x900.jpg",
            width: 1600,
            height: 900,
          },
        })}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        title={
          <>
            Salesforce Marketing Cloud consulting for <span className="text-oa-orange">accounts already running</span>
          </>
        }
        lede="Marketing Cloud sends what Salesforce feeds it. We support both sides of that connection: the CRM data and opt-outs going in, and the journeys, automations and sends coming out."
        panel={{
          title: "Salesforce's record of us",
          items: [],
          slot: <SalesforceRecordCard />,
          footer: ["Salesforce Consulting Partner"],
        }}
        siblings={false}
      >
        {/* The CTA pair is passed as children rather than `primary`/`secondary`: the
            spec's label is 46 characters, and PageHero's button is whitespace-nowrap,
            which pushed the whole hero column past 390px. `className` lets this one
            label wrap; same primitives, same wrapper classes PageHero uses. */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <PrimaryCTA href="#start" cta="hero" className="h-auto min-h-11 whitespace-normal text-center">
            Tell us what Marketing Cloud is getting wrong
          </PrimaryCTA>
          <SecondaryCTA href={SF_PHONE.href} cta="hero">
            Call {SF_PHONE.display}
          </SecondaryCTA>
        </div>
        <HcLink />
      </PageHero>

      <AnswerBand
        question="What does a Salesforce Marketing Cloud consultant do?"
        answer="A Salesforce Marketing Cloud consultant sets up and looks after the parts of Marketing Cloud a marketing team relies on: the Marketing Cloud Connect link to Salesforce CRM, data extensions, emails, journeys and automations, and the consent rules around them. On a running account, most of the work is support: changing what exists, fixing what broke, keeping the data clean."
        leads={[
          { label: "Why it matters", body: "A send is only as right as the Salesforce data behind it and the opt-outs it honours." },
          {
            label: "What we do",
            body: "We work on both sides of the connection, backed by about 18 months of Marketing Cloud support on a live account.",
          },
          {
            label: "What it costs",
            body: (
              <>
                Support is scoped in writing before anything is signed.{" "}
                <Link className="oa-link" to="/services/salesforce-implementation-cost">
                  What Salesforce work costs
                </Link>
              </>
            ),
          },
        ]}
        toc={[
          { id: "work", label: "What teams bring us" },
          { id: "checks", label: "Five checks" },
          { id: "tools", label: "The tools" },
          { id: "consent", label: "Consent and suppression" },
          { id: "process", label: "After you call" },
          { id: "support", label: "18 months of support" },
          { id: "faq", label: "Questions" },
          { id: "start", label: "Start" },
        ]}
      >
        <RecordLine />
      </AnswerBand>

      <Section tone="surface" bordered id="work">
        <SectionHeading
          title="Four things Marketing Cloud teams bring us"
          lede="An account that works, mostly, and that nobody on the team fully understands any more. We make it explainable again, then keep it that way."
        />
        <CardGrid columns={2} className="mt-12 xl:grid-cols-4">
          {WORK.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper" id="checks">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              title="Five checks on any Marketing Cloud account"
              lede="Where we look first, and where each check lives in Salesforce's own tools."
            />
          </div>
          <div className="lg:col-span-8">
            <DataTable
              label="Five checks on a Marketing Cloud account, where each lives and why it matters"
              head={["Check", "Where it lives", "Why it matters"]}
              rows={CHECKS.map((c) => ({
                cells: [c.check, <span className="font-mono text-[13px]">{c.where}</span>, c.why],
              }))}
              source={<>Tool and menu names as Salesforce documents them, checked {READ_ON}. Links in the table below.</>}
            />
          </div>
        </div>
      </Section>

      <Section tone="surface" bordered id="tools">
        <SectionHeading
          title="The parts of Marketing Cloud a support engagement touches"
          lede="Salesforce's own name for each tool, what it does, and what we check there."
        />
        <div className="mt-10">
          <DataTable
            label="Marketing Cloud tools, what each does and what we check there"
            ground="surface"
            head={["Tool", "What it does", "What we check there"]}
            rows={TOOLS.map((t) => ({
              cells: [
                /* The tool name IS the documentation link, so it stays visible on a
                   phone instead of sitting in a fourth column off-screen. */
                <a
                  className="oa-link -my-2.5 inline-block py-2.5"
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.tool}: ${t.doc} (opens in a new tab)`}
                >
                  {t.tool}&nbsp;↗
                </a>,
                t.what,
                t.check,
              ],
            }))}
            source={<>Our description of each tool. Each tool name links to Salesforce's own documentation, checked {READ_ON}.</>}
          />
        </div>
        <p className="mt-8 max-w-[68ch] text-oa-ink2">
          Running Marketing Cloud Account Engagement, the product once called Pardot? It is a separate product;{" "}
          <a className="oa-link" href="#faq">
            the questions below
          </a>{" "}
          explain how the two differ.
        </p>
      </Section>

      <Section clip tone="paper" id="consent">
        <PlateScope>
          <div className="grid grid-cols-1 gap-x-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                title="Consent and suppression, tested in both directions"
                lede="An opt-out recorded in Salesforce has to stop Marketing Cloud sends, and an unsubscribe in Marketing Cloud has to show in Salesforce so sales does not email the same person by hand."
              />
              <Prose className="mt-6">
                <p>
                  We test that path in both directions before changing anything else, because it is the one mistake a customer
                  will remember. The diagram is a typical set-up, and the numbered list under it says the same thing in words.
                </p>
              </Prose>
            </div>
            <div className="lg:col-span-5">
              <DocNote
                said="With Marketing Cloud Connect, an unsubscribe link or the Marketing Cloud Unsubscribe button on the record updates both systems. Ticking Email Opt Out by hand in Sales or Service Cloud does not change the subscriber's status in Marketing Cloud, and unsubscribing someone only inside Marketing Cloud does not tick Email Opt Out."
                title="Salesforce Help: Unsubscribes (Marketing Cloud Connect)"
                url={DOCS.unsubscribes}
                readOn={READ_ON}
                meaning="An opt-out recorded the wrong way can leave a person on the send list, or let sales email someone who unsubscribed. We check both paths on your org."
              />
            </div>
          </div>
          <div className="mt-6">
            <Plate
              spec={PLATE}
              fig={1}
              first
              stamp={["DIAGRAM · TYPICAL MARKETING CLOUD CONNECT SET-UP, NOT A CLIENT ACCOUNT", "ONEALGORITHM"]}
              caption="A typical Marketing Cloud Connect set-up, drawn by OneAlgorithm. The heavy line is the opt-out path, the one we test in both directions."
            />
          </div>
          <ol className="mt-10 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
            {FLOW.map((f, i) => (
              <WiredRow key={f.k} k={f.k} as="li" className="border-t border-oa-hairlineStrong px-1 py-5">
                <p className="flex items-baseline gap-3 font-semibold text-oa-ink">
                  <span className="font-mono text-sm tabular-nums text-oa-orangeText">{String(i + 1).padStart(2, "0")}</span>
                  {f.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-oa-ink2">{f.body}</p>
              </WiredRow>
            ))}
          </ol>
        </PlateScope>
      </Section>

      <Section clip tone="surface" bordered id="process">
        <SectionHeading
          title="What happens after you call"
          lede="Four steps, from the symptom to a written list you can act on."
        />
        <div className="mt-12">
          <ProcessSteps rail terminal={{ label: "Tell us the symptom" }} steps={STEPS} />
        </div>
      </Section>

      <Section tone="paper" id="support">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading title="Eighteen months of Marketing Cloud support" />
            <Prose className="mt-8">
              <p>
                On a running account, the requests are rarely dramatic. A new welcome series, a change to who counts as an active
                customer, an automation that ran overnight and sent nothing, a data extension somebody built for one campaign that
                three journeys now depend on. Each one is small. Left alone, they pile into an account nobody wants to touch, which
                is how teams end up paying for features they have stopped using.
              </p>
              <p>
                We take those requests one at a time and keep the account explainable. Support also means saying when something
                should be switched off: journeys outlive the campaigns they were built for, and old automations keep running against
                data extensions nobody refreshes. Fewer moving parts make every later change cheaper and safer.
              </p>
              <p>
                We work on the Salesforce side as well, so a problem gets traced to Marketing Cloud or to the CRM data behind it and
                fixed where it starts. If the CRM data needs fixing before marketing can trust it, start with a{" "}
                <Link className="oa-link" to="/services/salesforce-data-migration">
                  data cleanup or migration
                </Link>
                ; for order and customer data from an ERP, see{" "}
                <Link className="oa-link" to="/services/salesforce-integration">
                  Salesforce integration
                </Link>
                ; to have the core org looked after too, see{" "}
                <Link className="oa-link" to="/services/salesforce-managed-services">
                  managed services
                </Link>
                . Or read{" "}
                <Link className="oa-link" to="/services/salesforce">
                  how our Salesforce work runs
                </Link>
                , end to end.
              </p>
            </Prose>
          </div>
          <div className="lg:col-span-5">
            {/* Spec §5 MC-8: ledger block, WHAT / HOW LONG / CLIENT. Approved wording only. */}
            <div className="border-t-2 border-oa-ink">
              <p className={`${MONO} pt-3`}>Delivered · Marketing Cloud</p>
              <dl className="mt-2 border-b border-oa-hairlineStrong">
                {[
                  ["What", "Support for a Marketing Cloud account already running"],
                  ["How long", "About 18 months"],
                  ["Client", "Not named"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-t border-oa-hairlineStrong py-4">
                    <dt className={`${MONO} pt-1`}>{k}</dt>
                    <dd className="text-lg font-semibold text-oa-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* The approved lead line from SF_PEOPLE, with the Person schema. */}
            <div className="mt-10">
              <p className={MONO}>Who leads the work</p>
              <PeopleStrip className="mt-3 max-w-[60ch] text-oa-ink2" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" bordered id="objections">
        <Objections items={OBJECTIONS} />
      </Section>

      <Section tone="paper" id="faq">
        <SectionHeading title="What people ask about Marketing Cloud" />
        <FAQList
          faqs={FAQS}
          sources={{
            checked: "October 2026",
            links: [
              { label: "Salesforce Help: Marketing Cloud Connect", href: DOCS.connect },
              { label: "Salesforce Help: Unsubscribes", href: DOCS.unsubscribes },
              { label: "Salesforce: Account Engagement", href: DOCS.accountEngagement },
              { label: "Salesforce: AMPscript guide", href: DOCS.ampscript },
              { label: "Salesforce: Marketing Cloud Engagement pricing", href: DOCS.pricing },
              { label: "Salesforce: Marketing Cloud overview", href: DOCS.overview },
            ],
          }}
        />
      </Section>

      <Section tone="surface" bordered id="related">
        <SectionHeading title="Other Salesforce work we deliver" />
        <RouteBoard groups={["services"]} />
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <Desk
        heading="Tell us what Marketing Cloud is getting wrong"
        body="Wrong audience, a journey that stopped, opt-outs you do not trust. Describe the symptom and we will tell you where we would look first."
        form={{
          topic: "mc",
          topicLabel: "Marketing Cloud",
          heading: "Describe the symptom",
          prompt: "What is Marketing Cloud getting wrong?",
          submitLabel: "Send to OneAlgorithm",
        }}
        next={["Call or send the form.", "A person at OneAlgorithm reads it and replies.", "We tell you where we would look first."]}
      />
    </Layout>
  );
}
