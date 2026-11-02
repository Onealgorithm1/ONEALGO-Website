import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, PersonCredentials, FAQ, DeskCTA, StageRail, StageUnits,
  SourcesDialog, Readouts, Verify, type SfFaqItem, type Stage,
} from "../../components/sf";
import { McJourney } from "../../components/sf/illus";
import { SF_PHONE } from "../../data/salesforceProof";
import { SREENIVAS, SF_BADGES, badgeSrc } from "../../data/sfPeople";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, createServiceSchema, createLocalBusinessSchema, createWebPageSchema, SF_HEALTH_CHECK_OFFER,
} from "../../components/StructuredData";

/* /services/salesforce-marketing-cloud-consulting. Rebuilt 2026-10-23 on the redesign-v2 kit (client/components/sf),
 * in the approved prototype's design (Louis 2026-10-23: "Yes, build the 23 pages this way"). Title, meta, H1 and the
 * eleven H2 strings: seo-completeness/structure-spec.md §5.2 (exact, in the spec's order). Build notes:
 * onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/build-v2/page-marketing-cloud.md.
 *
 * ⛔ PROOF, and only this: about 18 months of Marketing Cloud support delivered on an account already running (client
 * private, no dates, sector or tool scope: which tools that engagement touched is an owner fact, gap MC-5);
 * Salesforce's AppExchange record (16 / 53 / 38, the firm total, never broken out by cloud); Sreenivas Amirisetti's
 * 14 active certifications, Marketing Cloud Engagement Specialist among them (badges.md row 13; his credential, never
 * the company's). Do not upgrade "support" into a claimed new-account implementation (OD 12, FV-07). Lender bulk-email
 * work is core-org work, not Marketing Cloud: it stays off this page. Account Engagement (Pardot), Data 360 (Data
 * Cloud) and HubSpot are explained as products only, never as delivered work. MuleSoft: not mentioned here.
 * ⛔ OWNER-GATED (OD 12): whether the free week covers the Marketing Cloud ACCOUNT. Until answered, every mention of
 * the free week says "the Salesforce side" / "the Salesforce org that feeds Marketing Cloud".
 * Schema: the Service carries the health-check Offer per structure-spec §9 (SD-04); the offer is the Salesforce
 * health check, which the desk band shows, not a Marketing Cloud review.
 * LINKS: in-site only in the body. Salesforce's documentation, which the old page linked off-site twelve times,
 * is listed once in the "mc-docs" SourcesDialog (new tab, noopener, external mark), opened by Verify chips. */

const PAGE_PATH = "/services/salesforce-marketing-cloud-consulting";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-10-23";
const READ_ON = "23 October 2026";
const TITLE = "Salesforce Marketing Cloud Consultants | One Algorithm";
const DESCRIPTION =
  "Salesforce Marketing Cloud consulting for running accounts: Connect sync, journeys, opt-outs. Free health check from a listed partner. Call (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og/og-mc-journey.jpg";
const OG_ALT =
  "Illustration with sample data: a simplified Marketing Cloud journey from a quote request through an email, a three-day wait and a decision, with consent synced from Salesforce.";
const HUB = "/services/salesforce";
const HC = "/services/salesforce-health-check";
const COST = "/services/salesforce-implementation-cost";
const MS = "/services/salesforce-managed-services";
const INT = "/services/salesforce-integration";
const DM = "/services/salesforce-data-migration";
const PA = "/services/salesforce-consulting-partner-pennsylvania";

/* Salesforce's own documentation, each page read 23 October 2026, paraphrased on the page (never quoted: Salesforce's
   trademark guidelines bar reusing their text). Listed in the "mc-docs" pop-up; no body link leaves the site. */
const DOCS = [
  { name: "Salesforce Help: Marketing Cloud Connect", what: "How the connector links Sales or Service Cloud to Marketing Cloud, and what it synchronizes", page: "https://help.salesforce.com/s/articleView?id=mktg.mc_co_marketing_cloud_connect.htm&language=en_US&type=5" },
  { name: "Salesforce Help: Unsubscribes with Marketing Cloud Connect", what: "Which opt-out paths update both systems, and which do not", page: "https://help.salesforce.com/s/articleView?id=mc_co_unsubscribes.htm&language=en_US&type=5" },
  { name: "Salesforce Help: Email Studio", page: "https://help.salesforce.com/s/articleView?id=sf.mc_es_email_studio.htm&language=en_US&type=5" },
  { name: "Salesforce Help: Content Builder", page: "https://help.salesforce.com/s/articleView?id=sf.mc_ceb_content_builder.htm&language=en_US&type=5" },
  { name: "Salesforce Help: Journey Builder", page: "https://help.salesforce.com/s/articleView?id=mktg.mc_jb_journey_builder.htm&language=en_US&type=5" },
  { name: "Salesforce Help: Automation Studio", page: "https://help.salesforce.com/s/articleView?id=mktg.mc_as_automation_studio.htm&language=en_US&type=5" },
  { name: "Salesforce Help: Contact Builder", page: "https://help.salesforce.com/s/articleView?id=mc_cab_contact_builder.htm&language=en_US&type=5" },
  { name: "Salesforce Developers: AMPscript guide", page: "https://developer.salesforce.com/docs/marketing/marketing-cloud-ampscript/guide" },
  { name: "Salesforce: Marketing Cloud Engagement pricing", what: "Published list prices for Pro+, Corporate+ and Enterprise+, billed annually", page: "https://www.salesforce.com/marketing/engagement/pricing/" },
  { name: "Salesforce: Marketing Cloud Account Engagement", what: "The B2B product once called Pardot", page: "https://www.salesforce.com/marketing/b2b-automation/" },
  { name: "Salesforce: Data 360 (formerly Data Cloud)", what: "Salesforce's description of Data 360 and how it works with Marketing Cloud", page: "https://www.salesforce.com/data/" },
  { name: "Salesforce: Marketing Cloud overview", page: "https://www.salesforce.com/marketing/" },
].map((d) => ({ ...d, read: `read ${READ_ON}` }));

/* The tool table (structure-spec §5.2 row 3: visible, the table is the answer). "What we check there" says what we
   look at, never what "usually breaks" (no frequency data). Tool names as Salesforce documents them. */
const TOOLS: { tool: string; what: string; check: string }[] = [
  { tool: "Email Studio", what: "Where emails are built, sent and tracked, with subscriber lists and send settings.", check: "Send classifications, sender profiles and the tracking on recent sends." },
  { tool: "Content Builder", what: "The shared library of emails, templates, content blocks and images.", check: "Templates and blocks reused across sends, and what changes when one is edited." },
  { tool: "Journey Builder", what: "Multi-step journeys: an entry source, waits, decisions and messages.", check: "Entry sources, exit criteria, and journeys still running after their campaign ended." },
  { tool: "Automation Studio", what: "Scheduled and triggered automations: imports, SQL query activities and sends.", check: "Schedules, failures, and automations that run but send nothing." },
  { tool: "Contact Builder", what: "Contact data, data extensions and how they relate to each other.", check: "Each data extension, where its data comes from, and which journeys depend on it." },
  { tool: "AMPscript", what: "Marketing Cloud's scripting language for personalizing emails, SMS and CloudPages.", check: "The lookups and conditions behind content that renders wrongly for some subscribers." },
  { tool: "Marketing Cloud Connect", what: "Salesforce's connector between Sales or Service Cloud and Marketing Cloud.", check: "Synchronized objects, sync frequency, and the opt-out path in both directions." },
];

/* FIG. 2: the data flow, as HTML (was the old plate "marketing-cloud-connect-data-flow"). Rows 1-5 run out from
   Salesforce; row 6 is the way back, the opt-out path we test in both directions. */
const FLOW: { k: string; title: string; body: string }[] = [
  { k: "01 · CRM", title: "Your Salesforce org", body: "Contacts, Leads and Campaign Members live here, with the Email Opt Out field." },
  { k: "02 · Connector", title: "Marketing Cloud Connect", body: "Copies the objects and fields you choose into Marketing Cloud on a schedule." },
  { k: "03 · Data", title: "Contact Builder", body: "They arrive as synchronized data extensions: your CRM as Marketing Cloud sees it." },
  { k: "04 · Logic", title: "Journey Builder and Automation Studio", body: "Decide who gets which message, and when." },
  { k: "05 · Out", title: "Sends", body: "Email and SMS go to the audience, minus anyone unsubscribed." },
];
const WAY_BACK = { k: "06 · Back to Salesforce", title: "The way back", body: "An unsubscribe link or the Marketing Cloud Unsubscribe button updates both systems. A hand-ticked Email Opt Out does not. We test both paths." };

/* Five checks (gap MC-2): things we CHECK, not delivery claims; "why" states the risk, not a frequency. */
const CHECKS: { check: string; where: string; why: string }[] = [
  { check: "Which Salesforce objects and fields sync, and how often", where: "Marketing Cloud Connect · synchronized data sources in Contact Builder", why: "Journeys can only target fields that actually arrive, and only as fresh as the last sync." },
  { check: "Email Opt Out and unsubscribes, in both directions", where: "Email Opt Out on Contacts and Leads · All Subscribers in Marketing Cloud", why: "A send to someone who opted out is the mistake a customer remembers." },
  { check: "Automation Studio automations that run but send nothing", where: "Automation Studio · activity history", why: "An automation that fails quietly leaves a gap nobody notices until the numbers drop." },
  { check: "Data extensions in Contact Builder nobody can explain", where: "Contact Builder · Data Extensions", why: "A journey built on a stale extension sends to the wrong people." },
  { check: "Who has access, and whether they still should", where: "Marketing Cloud Setup · Users", why: "Former staff and agencies keep a login to your customer data until someone removes it." },
];

/* The four steps (structure-spec §5.2 row 8: distinct titles; fixes the old duplicate "Describe the symptom").
   Step 02 is the free health check, Salesforce side only until OD 12 is answered. No billing terms in step 04. */
const MC_STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Describe the symptom", sub: "call or send the form", line: `Call ${SF_PHONE.display} or send the form: a wrong audience, a journey that stopped, opt-outs you do not trust.`,
    details: ["A wrong audience, or a journey that stopped sending", "Opt-outs you do not trust", "A person at OneAlgorithm reads it and replies"] },
  { k: "s2", num: "02", title: "A one-week review of the Salesforce side", short: "One-week review, Salesforce side", sub: "free · the org that feeds Marketing Cloud", line: "What syncs through Marketing Cloud Connect, how often, and whether opt-outs agree in both systems.",
    details: ["Which Salesforce objects and fields sync, and how often", "Whether Email Opt Out and unsubscribes agree in both systems", "Whether the fields marketing filters on are filled in"] },
  { k: "s3", num: "03", title: "A written list", sub: "ranked by what to fix first", line: "What is still running, what it sends, and whether anyone would miss it if it stopped, ranked by what to fix first.",
    details: ["Ranked by what to fix first", "Yours to keep, whether or not you hire us", "If the org is basically fine, we say so"] },
  { k: "s4", num: "04", title: "Ongoing support", sub: "optional · scoped first", line: "If you want it, we take the requests one at a time, each scoped in writing first.",
    details: ["Changes, fixes and data checks, month by month", "Journeys and automations switched off when nobody needs them", "Problems traced to Marketing Cloud or to the CRM data behind it"] },
];

/* FAQ: this page's question bank (questions/questions-by-page.md, Marketing Cloud). ⛔ Not repeated on sibling pages.
   "How does Marketing Cloud connect to Salesforce CRM?" became H2 4 (HDG-08: no FAQ repeats an H2); its answer is in
   that unit's Go deeper. Data 360 and HubSpot: product explanations only. The array renders AND feeds FAQPage. */
const FAQS: SfFaqItem[] = [
  {
    q: "Is Marketing Cloud the same as Account Engagement (Pardot)?",
    a: "No. They are two different products that share the Marketing Cloud name. Pardot is now Marketing Cloud Account Engagement, Salesforce's B2B lead-nurturing product, built around Sales Cloud. Marketing Cloud Engagement is the separate platform for email, SMS and multi-step journeys. This page covers Marketing Cloud Engagement.",
  },
  {
    q: "Marketing Cloud or Data Cloud: what is the difference?",
    a: `They do different jobs. Marketing Cloud Engagement sends email, SMS and multi-step journeys. Data Cloud, which Salesforce now calls Data 360, is what Salesforce describes as the real-time data engine behind its platform, so applications such as Sales, Service and Marketing Cloud can act on the same customer data (salesforce.com, read ${READ_ON}). This page covers Marketing Cloud Engagement and the Salesforce data that feeds it.`,
  },
  {
    q: "Marketing Cloud or HubSpot: which fits us?",
    a: "Choose on where your customer data lives. If your accounts, contacts and consent already live in Salesforce, Marketing Cloud reads them through Marketing Cloud Connect, Salesforce's own connector. HubSpot's marketing tools sit on HubSpot's own CRM, which is often the quicker start for a team that does not run Salesforce. If you already pay for Marketing Cloud, the first question is whether it is set up to earn that cost.",
  },
  {
    q: "How long have you supported Salesforce Marketing Cloud?",
    a: "About 18 months, month by month, on a live Marketing Cloud account that was already sending. Supporting running accounts is the work we offer. Sreenivas Amirisetti, who leads our Salesforce practice, holds the Salesforce Certified Marketing Cloud Engagement Specialist certification.",
    link: { to: "#record", label: "Marketing Cloud work we have delivered" },
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
    a: "AMPscript is Marketing Cloud Engagement's scripting language. It runs inside emails, SMS messages and CloudPages to personalize content from data extension values, look up related rows and apply conditions. You need it when a template has to do more than drop in a field. When a personalized email renders wrongly for some subscribers, the AMPscript and the data it reads are where we look.",
  },
  {
    q: "How much does Salesforce Marketing Cloud support cost?",
    a: `Two parts. Salesforce's license: its published list prices for Marketing Cloud Engagement are $2,000 per org per month for Pro+, $5,500 for Corporate+ and $30,000 for Enterprise+, billed annually (salesforce.com, read ${READ_ON}). Our support is scoped in writing, from what you tell us and what we find in the Salesforce org that feeds Marketing Cloud, before anything is signed.`,
    link: { to: COST, label: "What Salesforce work costs" },
    more: <p className="sf-mono">Salesforce's published prices, read {READ_ON} · <Verify id="mc-docs">Sources</Verify></p>,
  },
];

/* Objection questions (H3) with the answers in Go deeper. ⛔ None repeats a FAQ question; the "no reviews" objection
   stays off (voice rule: never announce an absence). Travel wording: owner answer 2026-10-23 ~19:05. */
const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "Our account was built by someone who has left.", a: <>We start there: a plain list of what is still running, what it sends, and whether anyone would miss it if it stopped. Fewer moving parts make every later change cheaper and safer.</> },
  { q: "Will we get senior people, or whoever is free?", a: <>The person who scopes your account stays on it through delivery, and you deal with the people doing the work directly: no hand-off after the sales call. Sreenivas Amirisetti leads the practice; his credentials are under <a className="sf-link" href="#record">our record</a>.</> },
  { q: "Will the free week turn into a sales pitch?", a: <>The list is yours. If the org is basically fine, we say so.</> },
  { q: "You are not in our city.", a: <>Most of the work is remote, inside your accounts, from Malvern, PA. In-person sessions happen when the project calls for them, easiest across the Philadelphia region; for larger projects elsewhere, on-site visits such as kickoff or training are planned into the project.</> },
];

const MC_BADGE = SF_BADGES["marketing-cloud-engagement-specialist"];
const DOCS_CHIP = <Verify id="mc-docs">Salesforce's documentation</Verify>;

/* Visible tables and lists outside the kit's units: tokens only, no new motion. */
const th: React.CSSProperties = { textAlign: "left", font: "500 12px/1.4 var(--mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink3)", padding: "0 16px 10px 0" };
const td: React.CSSProperties = { padding: "14px 16px 14px 0", verticalAlign: "top", fontSize: 16, lineHeight: 1.5 };

export default function SalesforceMarketingCloud() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Marketing Cloud Consulting",
          "Salesforce Marketing Cloud consulting and ongoing support for accounts already running: Marketing Cloud Connect configuration, consent and suppression checked in both directions, Journey Builder and Automation Studio changes, and data extensions in Contact Builder. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "Salesforce Marketing Cloud consulting",
          PAGE_URL,
          { image: OG_IMAGE, offers: SF_HEALTH_CHECK_OFFER },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce", to: HUB }, { label: "Marketing Cloud" }]}>
        {/* 1 HERO: text-led, the H1 is the LCP; FIG. 1 (the journey) on the right, 6/6, dealt by CSS 250ms after first paint.
            Tried full width under the text (2026-10-23): it left the right half of the 1440 hero empty and pushed the figure
            below the fold, so it sits in the 6/6 slot like the hub's desk; the scene stacks vertically under 640px. */}
        <SFHero
          kicker={<>Select Salesforce Consulting Partner<span className="sf-kicker-loc"> · Malvern, PA</span></>}
          title="Salesforce Marketing Cloud consulting for accounts already running"
          lede="We look after Marketing Cloud accounts already sending and the Salesforce data feeding them, starting with a free one-week health check of the Salesforce side."
          primary={{ href: "#start", label: "Book the free health check" }}
          proof
          figure={<McJourney fig={1} hero className="sf-hero-fig" />}
        />

        {/* 2 WHAT + SUPPORT: two answer units abreast (spec rows 1-2). */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c6"
            headingId="h-what"
            title="What does a Salesforce Marketing Cloud consultant do?"
            lede="A Salesforce Marketing Cloud consultant sets up and looks after the journeys, data and Salesforce connection behind your marketing email."
            lead="A send is only as right as the Salesforce data behind it and the opt-outs it honors, so we work on both sides."
            points={[
              "Keep the Marketing Cloud Connect link syncing what marketing needs",
              "Change journeys, automations and emails without breaking what already sends",
              "Keep consent and opt-outs agreeing in both systems",
            ]}
          >
            <GoDeeper label="what a consultant does on a running account">
              <p className="sf-rule">
                A Salesforce Marketing Cloud consultant sets up and looks after the parts of Marketing Cloud a marketing team relies on: the Marketing Cloud Connect link to Salesforce CRM, data extensions, emails, journeys and automations, and the consent rules around them. On a running account, most of the work is support: changing what exists, fixing what broke, keeping the data clean.
              </p>
              <p><span className="sf-lead-in">What it costs:</span> Support is scoped in writing before anything is signed.</p>
              <p>Running Marketing Cloud Account Engagement, the product once called Pardot? It is a separate product; <a className="sf-link" href="#faq">the questions below</a> explain how the two differ.</p>
              <div className="sf-links">
                <Link className="sf-link" to={HUB}>Salesforce consulting services</Link>
                <Link className="sf-link" to={COST}>What Salesforce work costs</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c6"
            delay={0.08}
            headingId="h-support"
            title="Marketing Cloud implementation or support for running accounts"
            lede="We support Marketing Cloud accounts that are already running, backed by about 18 months of Marketing Cloud support delivered month by month."
            leadIn="What we do:"
            lead="We make an account nobody on the team fully understands explainable again, then keep it that way."
            points={[
              "Month-by-month changes, fixes and data checks on an account already sending",
              "Inherited journeys listed, and the ones nobody needs switched off",
              "Consent and suppression tested in both systems before anything else changes",
            ]}
          >
            <GoDeeper label="the four things Marketing Cloud teams bring us">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                <li><span className="sf-lead-in">Support for a running account.</span> Month-by-month support for an account that is already sending: changes, fixes and the checks that keep the data clean.</li>
                <li><span className="sf-lead-in">The CRM connection.</span> Marketing Cloud can only send to what Salesforce gives it. We check what syncs through Marketing Cloud Connect, how often, and whether the fields marketing filters on are filled in.</li>
                <li><span className="sf-lead-in">Consent and suppression.</span> Unsubscribes and Email Opt Out have to agree in both systems. We test that path in both directions before we change anything else.</li>
                <li><span className="sf-lead-in">Inherited journeys and automations.</span> We list what is still running, what it sends, and whether anyone would miss it if it stopped, then switch off what nobody needs.</li>
              </ul>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 3 TOOLS: the table is the answer, so it stays visible (spec §2). Docs in the pop-up, not linked off-site. */}
        <SmartSection id="tools" grid labelledBy="h-tools">
          <SmartUnit
            className="sf-c4"
            headingId="h-tools"
            title="Marketing Cloud tools we work in"
            lede="We work in Email Studio, Journey Builder, Automation Studio and Contact Builder, including data extensions and SQL query activities."
            leadIn="What we do:"
            lead="We use Salesforce's own name for each tool and say exactly what we check there."
            measure={false}
          >
            <p className="sf-mono" style={{ marginTop: 20, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Tool names as Salesforce documents them, read {READ_ON} · {DOCS_CHIP}
            </p>
          </SmartUnit>
          <div className="sf-c8">
            <table style={{ width: "100%", borderCollapse: "collapse", borderBottom: "1px solid var(--hair-s)" }} aria-label="Marketing Cloud tools, what each does and what we check there">
              <thead className="hidden md:table-header-group">
                <tr><th scope="col" style={th}>Tool</th><th scope="col" style={th}>What it does</th><th scope="col" style={th}>What we check there</th></tr>
              </thead>
              <tbody>
                {TOOLS.map((t) => (
                  <tr key={t.tool} className="block md:table-row" style={{ borderTop: "1px solid var(--hair-s)" }}>
                    <th scope="row" className="block md:table-cell" style={{ ...td, textAlign: "left", fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap" }}>{t.tool}</th>
                    <td className="block md:table-cell" style={{ ...td, paddingTop: 0 }}>
                      <span className="block md:hidden sf-mono">What it does</span>
                      {t.what}
                    </td>
                    <td className="block md:table-cell" style={{ ...td, paddingTop: 0, color: "var(--ink)" }}>
                      <span className="block md:hidden sf-mono">What we check there</span>
                      {t.check}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SmartSection>

        {/* 4 THE CONNECTION: H2 unit + the consent H3 unit abreast, FIG. 2 (the data flow) the full frame below. */}
        <SmartSection id="connect" tone="surface" grid labelledBy="h-connect">
          <SmartUnit
            className="sf-c6"
            headingId="h-connect"
            title="How Marketing Cloud connects to Salesforce CRM"
            lede="Marketing Cloud Connect syncs Contacts, Leads and Campaign Members from Salesforce on a schedule, and opt-outs must flow back."
            lead="Marketing Cloud can only send to what Salesforce gives it, and only as fresh as the last sync."
            points={["Which objects and fields sync, and how often", "Whether the fields marketing filters on are filled in", "Whether opt-outs agree in both systems"]}
          >
            <GoDeeper label="how the connector is set up and what it maps">
              <p className="sf-rule">
                Marketing Cloud Connect is Salesforce's own connector. It is installed in your Salesforce org as a managed package and linked to your Marketing Cloud account. You choose which objects and fields to synchronize, such as Contacts, Leads and Campaign Members. They arrive in Contact Builder as synchronized data extensions on a schedule, and email tracking and unsubscribes are written back to the Salesforce record.
              </p>
              <p><span className="sf-lead-in">What we do:</span> We work on the Salesforce side as well, so a problem gets traced to Marketing Cloud or to the CRM data behind it and fixed where it starts.</p>
              <div className="sf-links">
                <Link className="sf-link" to={INT}>Salesforce integration services</Link>
                <Link className="sf-link" to={DM}>Salesforce data migration services</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c6"
            delay={0.08}
            headingId="h-consent"
            title="Consent and suppression, tested both ways"
            lede="An opt-out recorded in Salesforce has to stop Marketing Cloud sends, and an unsubscribe in Marketing Cloud has to show in Salesforce."
            lead="An opt-out recorded the wrong way can leave a person on the send list, or let sales email someone who unsubscribed."
            points={[
              "Unsubscribe link or Unsubscribe button: both systems update",
              "Email Opt Out ticked by hand in Salesforce: Marketing Cloud status unchanged",
              "Unsubscribed only inside Marketing Cloud: Email Opt Out stays unticked",
            ]}
          >
            <GoDeeper label="what Salesforce documents about unsubscribes">
              <p className="sf-rule">
                With Marketing Cloud Connect, an unsubscribe link or the Marketing Cloud Unsubscribe button on the record updates both systems. Ticking Email Opt Out by hand in Sales or Service Cloud does not change the subscriber's status in Marketing Cloud, and unsubscribing someone only inside Marketing Cloud does not tick Email Opt Out.
              </p>
              <p><span className="sf-lead-in">What we do:</span> We test that path in both directions before changing anything else, because it is the one mistake a customer will remember.</p>
              <p className="sf-mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
                Salesforce Help: Unsubscribes with Marketing Cloud Connect, read {READ_ON} · {DOCS_CHIP}
              </p>
            </GoDeeper>
          </SmartUnit>

          <figure className="illus sf-c12" aria-labelledby="fig2-cap" style={{ marginTop: 16 }}>
            <div className="scene">
              <header className="scene-head">
                <div>
                  <p className="scene-kicker">Marketing Cloud Connect · a typical set-up</p>
                  <p className="scene-org">Five steps out from your Salesforce org, and the way back that carries every opt-out</p>
                </div>
                <span className="sample">Illustrative</span>
              </header>
              <ol aria-label="How data moves between Salesforce and Marketing Cloud" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5" style={{ gap: 12 }}>
                {FLOW.map((f) => (
                  <li key={f.k} className="mc-node" style={{ gridRow: "auto", alignSelf: "stretch", minHeight: 0, justifyContent: "flex-start" }}>
                    <span className="mc-k">{f.k}</span>
                    <p className="mc-t">{f.title}</p>
                    <p className="mc-s">{f.body}</p>
                  </li>
                ))}
                <li className="mc-node mc-entry col-span-full" style={{ gridRow: "auto", alignSelf: "stretch", minHeight: 0 }}>
                  <span className="mc-k">{WAY_BACK.k}</span>
                  <p className="mc-t">{WAY_BACK.title}</p>
                  <p className="mc-s" style={{ fontSize: 14, maxWidth: "72ch" }}>{WAY_BACK.body}</p>
                </li>
              </ol>
            </div>
            <span className="ticks" aria-hidden="true" />
            <div className="stamp" aria-hidden="true"><span>FIG. 2 · Diagram · Typical Marketing Cloud Connect set-up · Illustrative</span><span>OneAlgorithm</span></div>
            <figcaption id="fig2-cap" className="cap">A typical Marketing Cloud Connect set-up, drawn by OneAlgorithm. Steps 01 to 05 run out from Salesforce; the navy row is the way back, the opt-out path we test in both directions.</figcaption>
          </figure>
        </SmartSection>

        {/* 5 FIVE CHECKS: the night band. The unit on 5 columns, the five checks as a numbered register on 7. */}
        <SmartSection id="checks" tone="night" grid labelledBy="h-checks">
          <SmartUnit
            className="sf-c5"
            headingId="h-checks"
            title="Five checks for a Marketing Cloud account"
            lede="We look in five places first on any Marketing Cloud account, each named the way Salesforce's own tools name it."
            lead="A send to someone who opted out is the mistake a customer remembers."
            measure={false}
          >
            <GoDeeper label="why each check matters">
              <ol className="sf-points" style={{ marginTop: 0 }}>
                {CHECKS.map((c, i) => (
                  <li key={c.check}><span className="sf-lead-in">{String(i + 1).padStart(2, "0")}.</span> {c.why}</li>
                ))}
              </ol>
            </GoDeeper>
          </SmartUnit>
          <ol className="sf-c7" aria-label="Five checks on a Marketing Cloud account" style={{ borderBottom: "1px solid var(--n-hair)" }}>
            {CHECKS.map((c, i) => (
              <li key={c.check} style={{ display: "grid", gridTemplateColumns: "44px minmax(0, 1fr)", gap: 12, padding: "18px 0", borderTop: "1px solid var(--n-hair)" }}>
                <span className="sf-mono" style={{ color: "var(--orange)", paddingTop: 3 }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span style={{ display: "block", font: "600 18px/1.4 var(--body)", color: "var(--n-ink)" }}>{c.check}</span>
                  <span className="sf-mono" style={{ display: "block", marginTop: 4 }}>{c.where}</span>
                </span>
              </li>
            ))}
          </ol>
        </SmartSection>

        {/* 6 HOW TO CHOOSE (spec row 6): the unit + the lead's own Marketing Cloud credential, Verify → his Trailblazer pop-up. */}
        <SmartSection id="choose" grid labelledBy="h-choose">
          <SmartUnit
            className="sf-c7"
            headingId="h-choose"
            title="How to choose a Marketing Cloud consultant"
            lede="Ask for the person who will do the work, their own Marketing Cloud certification and a running account they have supported."
            lead="Certifications belong to people, so check the person's own Trailblazer profile, not the company's total."
            points={[
              "Meet the person who will do the work before anything is signed",
              "Check their certifications on their own Trailblazer profile",
              "Ask which running accounts they support, and for how long",
            ]}
          >
            <GoDeeper label="how to check a consultant's credentials">
              <p className="sf-rule">
                Salesforce publishes each person's active certifications on their public Trailblazer profile, and anyone can check a credential on Salesforce's verification page. A company's AppExchange listing shows its total certified people and certifications; it does not tell you who will do your work. Ours lists 16 certified people and 53 certifications (read {READ_ON}).
              </p>
              <div className="sf-links"><Link className="sf-link" to={PA}>How to check any Salesforce partner</Link></div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08} aria-labelledby="mc-cred-name">
            <p className="sf-kicker">Who leads the work</p>
            <div style={{ display: "grid", gridTemplateColumns: "120px minmax(0, 1fr)", gap: 20, alignItems: "center", marginTop: 16 }}>
              <img src={badgeSrc(MC_BADGE)} alt={MC_BADGE.name} width={120} height={118} loading="lazy" decoding="async" />
              <div>
                <p id="mc-cred-name" style={{ font: "600 18px/1.35 var(--body)", color: "var(--ink)" }}>{SREENIVAS.name}</p>
                <p className="sf-mono" style={{ marginTop: 2 }}>{SREENIVAS.title}</p>
                <p style={{ marginTop: 8 }}>{MC_BADGE.name}</p>
              </div>
            </div>
            <p className="sf-mono" style={{ marginTop: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              One of his {SREENIVAS.badges.length} active Salesforce certifications, verified {SREENIVAS.verifiedLabel} · <Verify id={`trailblazer-${SREENIVAS.slug}`} />
            </p>
          </LedgerRule>
        </SmartSection>

        {/* 7 THE RECORD (spec row 7): delivered work + the AppExchange readouts (they also carry the dialog the hero proof's
            Verify opens) on 7 columns, who leads it on 5, badges with the PERSON. */}
        <SmartSection id="record" tone="surface" grid labelledBy="h-record">
          <div className="sf-c7">
            <SmartUnit
              headingId="h-record"
              title="Marketing Cloud work we have delivered"
              lede="We have delivered about 18 months of month-by-month support on a Marketing Cloud account that was already sending."
              lead="The same people work on both sides of the connection, so every fix lands where the problem starts."
            >
              <div className="sf-ledger" style={{ marginTop: 28 }}>
                <div className="sf-lrow">
                  <h3 className="sf-h4">About 18 months of Marketing Cloud support</h3>
                  <span className="sf-mono">Support · month by month</span>
                </div>
              </div>
              <GoDeeper label="what month-by-month support looks like">
                <p className="sf-rule">
                  On a running account, the requests are rarely dramatic. A new welcome series, a change to who counts as an active customer, an automation that ran overnight and sent nothing, a data extension somebody built for one campaign that three journeys now depend on. Each one is small. Left alone, they pile into an account nobody wants to touch, which is how teams end up paying for features they have stopped using.
                </p>
                <p>
                  We take those requests one at a time and keep the account explainable. Support also means saying when something should be switched off: journeys outlive the campaigns they were built for, and old automations keep running against data extensions nobody refreshes.
                </p>
                <div className="sf-links">
                  <Link className="sf-link" to={MS}>Salesforce managed services</Link>
                  <Link className="sf-link" to={INT}>Salesforce integration services</Link>
                  <Link className="sf-link" to={DM}>Data cleanup or migration</Link>
                </div>
              </GoDeeper>
            </SmartUnit>
            <p className="sf-kicker" style={{ marginTop: 48 }}>Salesforce's AppExchange record of us</p>
            <Readouts />
          </div>
          <LedgerRule as="aside" className="sf-c5 sf-lead-block" delay={0.08} aria-labelledby="h-lead" style={{ paddingTop: 20 }}>
            <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
            <PersonCredentials />
          </LedgerRule>
        </SmartSection>

        {/* 8 HOW IT STARTS (spec row 8): FIG. 3, the scrubbed rail, + the four steps wired to their stations. */}
        <SmartSection
          id="how"
          heading={{
            id: "h-how",
            title: "How a Marketing Cloud engagement starts",
            lede: "A Marketing Cloud engagement starts with the symptom you describe, then a free one-week review of the Salesforce side.",
          }}
        >
          <StageRail
            fig={3}
            stations={MC_STAGES}
            className="sf-rail-top"
            title="Staged diagram of how a Marketing Cloud engagement starts, in four steps"
            desc="A rail runs through four stations: describe the symptom, a free one-week review of the Salesforce side, a written list ranked by what to fix first, and ongoing support if you want it."
            stamp="How a Marketing Cloud engagement starts"
            caption="The four steps in the order they run. Step 02 is the free one-week health check of the Salesforce org that feeds Marketing Cloud; step 04 only if you want it."
          />
          <StageUnits items={MC_STAGES} />
        </SmartSection>

        {/* 9 DESK: the one form (#start). The free week is described as the Salesforce side only (OD 12). */}
        <DeskCTA
          lede="We spend a week in the Salesforce org that feeds Marketing Cloud, free, and you keep the written list ranked by what to fix first."
          covers={[
            "Marketing Cloud Connect: what syncs from Salesforce, and how often",
            "Consent: Email Opt Out and unsubscribes, in both directions",
            "Data: duplicates, orphans, fields nobody fills",
            "Automation: the manual steps Flow should own",
            "Permissions: who can see and change what",
          ]}
          next={[
            "Call or send the form.",
            "A person at OneAlgorithm reads it and replies.",
            "If it fits, the free one-week review starts with a read-only user you create.",
          ]}
          form={{ topic: "mc", topicLabel: "Marketing Cloud", heading: "Book a free health check", prompt: "What is Marketing Cloud getting wrong?", submitLabel: "Book a free health check" }}
        />

        {/* 10 CONCERNS (spec row 10): objection questions as H3, answers in Go deeper. */}
        <SmartSection
          id="concerns"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before hiring a Marketing Cloud consultant",
            lede: "Four questions Marketing Cloud teams raise before the first call, each with the direct answer.",
          }}
        >
          {CONCERNS.map((c, i) => (
            <LedgerRule as="article" key={c.q} className="sf-c3" delay={(i % 4) * 0.06}>
              <h3 className="sf-h3">{c.q}</h3>
              <GoDeeper label={c.q} title="The answer">
                <p className="sf-rule">{c.a}</p>
              </GoDeeper>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* 11 FAQ (spec row 11): questions visible, answers in the HTML behind native disclosures; the sources pop-up. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Salesforce Marketing Cloud questions</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
            <p className="sf-mono" style={{ marginTop: 12, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Product facts from Salesforce, read {READ_ON} · {DOCS_CHIP}
            </p>
            <nav aria-label="Related Salesforce services" style={{ marginTop: 32 }}>
              <p className="sf-kicker">Related Salesforce services</p>
              <ul className="sf-links" style={{ marginTop: 8, flexDirection: "column", gap: 0 }}>
                <li><Link className="sf-link" to={HC}>Free one-week Salesforce health check</Link></li>
                <li><Link className="sf-link" to={MS}>Salesforce managed services and development</Link></li>
                <li><Link className="sf-link" to={INT}>Salesforce integration services</Link></li>
                <li><Link className="sf-link" to={HUB}>All Salesforce consulting services</Link></li>
              </ul>
            </nav>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
          <SourcesDialog
            id="mc-docs"
            title="Salesforce documentation behind this page"
            intro="Tool names and product behavior on this page follow Salesforce's own documentation, in our words. A person at OneAlgorithm read each page on the date shown."
            sources={DOCS}
          />
        </SmartSection>
      </SfPage>
    </Layout>
  );
}
