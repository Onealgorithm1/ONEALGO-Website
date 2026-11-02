import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, SmartSection, GoDeeper, Readouts, DeliveredLedger, PersonCredentials, DeskCTA, type SfFaqItem } from "../../components/sf";
import { EnterpriseTable, EnterpriseFaq } from "../../components/v2/enterprise-Units";
import { EVStyles, BridgePlate, HoverCards, StepRail, Statement } from "../../components/v2/enterprise-Visuals";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { CaseCard } from "../../components/v2/shared-CaseCard";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* /services/hire-salesforce-developers. Added 2026-11-01 (SEO round 2, plan action 7).
 * DEMAND (Semrush US, 2026-10-31, keywords/volumes-merged.json): "hire salesforce developer" 1,300 (KD 0), "hire salesforce
 * developers" 880, "hire a salesforce developer" 720, "salesforce developer for hire" 590, "salesforce staff augmentation"
 * 320 (KD 8) and its variants. SERP checked 2026-11-01 (web search, logged out): page one is agencies (BairesDev, Glorium,
 * Silverline, Techforce, Vention, Bacancy) plus talent marketplaces (Toptal, Braintrust), not job boards, so a service
 * page can compete.
 * /services/staff-augmentation keeps the general "IT staff augmentation" phrases; this page owns the Salesforce ones.
 * ⛔ FACTS: only what other pages already publish. AppExchange counts from salesforceProof.ts; people from sfPeople.ts
 *    (PersonCredentials); delivered work from SF_DELIVERED (DeliveredLedger); "ongoing Salesforce development for a
 *    lending company since April 2026", client never named, no figures; E-Verify covers our own employees only.
 *    NO rate, time-to-start, bench size, fill rate or years of experience. */

const PATH = "/services/hire-salesforce-developers";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "Hire Salesforce Developers: Staff Augmentation | One Algorithm";
const DESCRIPTION = "Hire Salesforce developers, admins and architects who work inside your team, from a listed Salesforce Consulting Partner in Malvern, PA. (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/og-image.jpg";

const L = (to: string, t: string) => <Link className="sf-link" to={to}>{t}</Link>;

const FAQS: SfFaqItem[] = [
  { q: "How do I hire a Salesforce developer through you?", a: "Tell us the org, the work and who the developer would report to. We say whether we have the right person and where they are light, you interview them, and once you agree they join your team and work to your backlog under your lead." },
  { q: "Who manages the Salesforce developer day to day?", a: "You do. Your lead sets the priorities, and the developer works in your org, your sandboxes, your ticket queue and your standups. We stay in touch with you and with the developer, and raise problems early rather than at a review." },
  { q: "Which Salesforce roles can you place?", a: "Salesforce developers, administrators and architects. Salesforce is where our delivery record is, so it is the only area where we lead. If the role you need is outside what we can stand behind, we say so before you spend time interviewing." },
  { q: "Are your Salesforce developers certified?", a: `Salesforce's AppExchange record lists ${SF_CERTIFIED_PEOPLE} Salesforce-certified people at OneAlgorithm holding ${SF_CERTIFICATIONS} certifications (read ${SF_VERIFIED_LABEL}). You can open the listing and check it yourself; ask who will do your work and look them up on Trailblazer.` },
  { q: "What does it cost to hire a Salesforce developer this way?", a: "It follows the role, the seniority, how long you need the person and the hours. We quote in writing once we know the work, and we publish no rate card. For published market ranges on Salesforce projects, see our cost guide.", link: { to: "/services/salesforce-implementation-cost", label: "Salesforce implementation cost guide" } },
  { q: "Staff augmentation or managed services: which do I need?", a: "If you want a Salesforce person working to your own backlog under your lead, that is staff augmentation, and it is this page. If you want us to run the org week by week and be accountable for it, that is managed services.", link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" } },
  { q: "Can the Salesforce developer work remotely with our team?", a: "Yes. Salesforce work happens inside your org, so it runs remotely from our Malvern, Pennsylvania office with teams across the United States. In-person sessions happen when the project calls for them, easiest around Philadelphia." },
  { q: "Who employs the Salesforce developer you place?", a: "We tell you in writing before work starts. Our E-Verify account covers our own employees only and does not cover subcontractors, so we never claim that everyone placed on your team is verified." },
];

export default function HireSalesforceDevelopers() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "hire Salesforce developer, hire Salesforce developers, Salesforce staff augmentation, Salesforce developer for hire, hire Salesforce admin",
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
    ogImage: OG_IMAGE,
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Staff Augmentation",
          "Salesforce developers, administrators and architects from a listed Salesforce Consulting Partner, working inside the client's team, org and process under the client's lead.",
          "Salesforce staff augmentation",
          URL_,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-11-01" })} />

      <PageHero
        eyebrow="Salesforce staff augmentation"
        title={
          <>
            Hire Salesforce developers —{" "}
            <span className="text-oa-orange">inside your team</span>
          </>
        }
        lede="Salesforce developers, admins and architects who join your standups, work in your org and your sandboxes, and take direction from your lead. From a listed Salesforce Consulting Partner in Malvern, PA."
        panel={{
          title: "How it works",
          items: [
            "Your org, your backlog, your lead setting priorities",
            "Salesforce developers, admins and architects",
            "We tell you where each candidate is light",
            "Certifications you can check on Salesforce's own record",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact#need=staff-augmentation" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />

      <SfPage crumbs={[{ label: "Salesforce", to: "/services/salesforce" }, { label: "Hire Salesforce developers" }]}>
        <EVStyles />
        <BridgePlate
          id="what"
          fig={1}
          tone="surface"
          heading={{ id: "h-what", title: "What Salesforce staff augmentation is", lede: "Salesforce staff augmentation adds a Salesforce developer, admin or architect to your team, working in your org under your lead, for as long as the work lasts." }}
          title="Where a Salesforce developer from us sits"
          desc="Four boxes joined by arrows: your lead sets priorities, your org and sandboxes stay as they are, our Salesforce developer works inside your team, and we say where each candidate is light."
          stamp="Inside your org"
          caption="You keep control of the backlog; we tell you where a candidate is light before you interview."
          nodes={[
            { num: "01", title: "Your lead", sub: "sets the priorities" },
            { num: "02", title: "Your org", sub: "sandboxes, backlog, standups" },
            { num: "03", title: "Our developer", sub: "works inside your team", hl: true },
            { num: "04", title: "Our side", sub: "candidates, gaps stated" },
          ]}
        >
          <p className="sf-mono" style={{ marginTop: 16 }}>Updated November 1, 2026</p>
          <GoDeeper label="the model in plain terms">
            <p className="sf-rule">You hire the skill without hiring the employee. The developer works in your sandboxes, your release process and your ticket queue, so there is no second team to manage on the side. If you want us to run the org and be accountable for it instead, that is {L("/services/salesforce-managed-services", "Salesforce managed services")}.</p>
            <p>For technical roles beyond Salesforce, see {L("/services/staff-augmentation", "IT staff augmentation services")}.</p>
          </GoDeeper>
        </BridgePlate>

        <OfferBand heading="Have a Salesforce seat to fill?" line="Tell us the org, the work and who they report to. We say whether we have the person." label="Talk to a consultant" />

        <SmartSection id="when" tone="paper" heading={{ id: "h-when", title: "When hiring a Salesforce developer this way beats a full-time hire", lede: "A full-time hire is slow and commits you for years; four situations make adding the skill the better call." }}>
          <HoverCards
            cols={4}
            items={[
              { glyph: "clock", kicker: "Release", title: "A Salesforce release is due", body: "Go-live is closer than a hiring cycle for a certified developer." },
              { glyph: "gear", kicker: "Depth", title: "Flow, Apex or an integration", body: "One piece of Platform work nobody on staff has built." },
              { glyph: "flag", kicker: "Migration", title: "A one-off data move", body: "QuickBase, Kissflow or another CRM, then back to normal." },
              { glyph: "team", kicker: "Admin", title: "Your admin is at the limit", body: "The org keeps its owner; the backlog gets more hands." },
            ]}
          />
          <p className="sf-lead sf-measure" style={{ marginTop: 28 }}><span className="sf-lead-in">Yes, but:</span> if the org needs a Salesforce person every week for years, hire one, and we will say so.</p>
        </SmartSection>

        <SmartSection id="record" tone="surface" heading={{ id: "h-record", title: "Salesforce's record of our team", lede: `Salesforce's AppExchange listing shows ${SF_CERTIFIED_PEOPLE} Salesforce-certified people at OneAlgorithm holding ${SF_CERTIFICATIONS} certifications.` }}>
          <Readouts />
          <h3 className="sf-h3" id="h-lead" style={{ marginTop: 40 }}>Who leads the Salesforce work</h3>
          <PersonCredentials />
        </SmartSection>

        <StepRail
          id="steps"
          tone="paper"
          heading={{ id: "h-steps", title: "How we place a Salesforce developer", lede: "Four steps, and the second one is where this is usually won or lost." }}
          fig={2}
          stations={[
            { k: "s1", num: "01", title: "The org", sub: "clouds, backlog, lead" },
            { k: "s2", num: "02", title: "Candidates", sub: "gaps stated up front" },
            { k: "s3", num: "03", title: "Access", sub: "user, sandboxes, releases" },
            { k: "s4", num: "04", title: "Releases", sub: "check-ins with your lead" },
          ]}
          steps={[
            { k: "s1", num: "01", title: "The org and the work", line: "Which clouds, which automation and integrations, what is in the backlog, and who the developer reports to." },
            { k: "s2", num: "02", title: "Candidates, gaps stated", line: "You interview them, and we say which parts of your org each one has not worked on before you find out in a sprint." },
            { k: "s3", num: "03", title: "Access and sandboxes", line: "A user, a permission set, sandbox access and your release process, agreed with your lead before day one." },
            { k: "s4", num: "04", title: "Every release after", line: "We check in with your lead, not only with the developer, and raise problems before a deployment rather than after." },
          ]}
          title="Four-step rail: the org, candidates, access, releases"
          desc="A rail with four stations: the org and the work, candidates with gaps stated, access and sandboxes, and check-ins at every release."
          stamp="How we place a Salesforce developer"
          caption="The gaps are stated before the interview, not discovered in a sprint."
        />

        <SmartSection id="delivered" tone="night" grid heading={{ id: "h-delivered", title: "Salesforce work we have delivered", lede: "We provide ongoing Salesforce development for a lending company, and have done since April 2026." }}>
          <div className="sf-c5">
            <CaseCard title="Salesforce development for a lending company" built="Ongoing since April 2026. Development inside the client's org and process. Client name kept private." />
          </div>
          <Statement className="sf-c7">Their backlog, their release calendar, our Salesforce developer.</Statement>
          <div className="sf-c12" style={{ marginTop: 28 }}>
            <DeliveredLedger />
          </div>
        </SmartSection>

        <EnterpriseTable
          id="compare"
          tone="surface"
          title="Staff augmentation vs managed services vs a project"
          lede="The three differ in who manages the work and who is accountable for the result."
          caption="Salesforce staff augmentation compared with managed services and a project"
          head={["Model", "Who manages the work", "You get"]}
          rows={[
            ["Staff augmentation", "You do", "A Salesforce person inside your team"],
            ["Managed services", "We do, week by week", "The org run for you, hours reported"],
            ["Project", "Shared, with us accountable for the output", "A scoped build or migration"],
          ]}
        />

        <OfferBand heading="Tell us about the Salesforce role" line="The skill you need for three months, or the seat open too long." label="Talk to a consultant" />

        <EnterpriseFaq title="Questions about hiring Salesforce developers" items={FAQS} />
        <DeskCTA
          heading="Tell us about the Salesforce role you cannot fill"
          lede="The Flow backlog, the integration nobody on staff has built, or the release that needs two more pairs of hands."
          covers={["The org, the clouds and who they report to", "How long you need the person", "The start window", "Whether we have the right person"]}
          coversLabel="What to have ready"
          next={["Send the short form on the contact page, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you whether we have the person."]}
          hcLink={false}
          form={{ topic: "hire-salesforce-developers", topicLabel: "Hire Salesforce developers", need: "staff-augmentation", heading: "Talk to an expert", prompt: "What is the Salesforce role, and how long do you need it?", submitLabel: "Talk to an expert" }}
        />
      </SfPage>
    </Layout>
  );
}
