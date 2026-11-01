import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, SmartSection, GoDeeper, Readouts, SourcesDialog, DeskCTA, type SfFaqItem, type SfSource } from "../../components/sf";
import { EnterpriseRow, EnterpriseTable, EnterpriseFaq, type EUnit } from "../../components/v2/enterprise-Units";
import { EVStyles, BridgePlate, HoverCards, StepRail, Statement, EnterpriseSources } from "../../components/v2/enterprise-Visuals";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
import { CaseCard } from "../../components/v2/shared-CaseCard";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* Staff augmentation. Copy rewritten 2026-08-12; body rebuilt 2026-10-31 in the Salesforce-v2 look (sf kit); round 3
 * (SEO spec B 4.5): definition first, OfferBand x2, ProofStrip, CaseCard, BLS counts behind one Sources pop-up.
 *
 * ⛔ HOLD (spec, fact-check): the engagement models (dedicated / fixed scope / hourly) are in no source note, so the
 *    section, the FAQ and the hero lines are OUT. "We carry the employment and the paperwork" is OUT (unsourced).
 * ⛔ NO NUMBERS WERE INVENTED: no time-to-candidate, bench size, tenure or fill rate; no price or rate.
 * ⛔ PROOF: "ongoing Salesforce development for a lending company since April 2026". Client never named, no figures.
 *    Only Salesforce roles have delivery evidence; other roles are "on request".
 * ⛔ E-VERIFY covers OUR OWN EMPLOYEES only; subcontractors are not covered. No enrollment ID is printed.
 * ⛔ No WBE/MBE badges on this commercial page (spec 2). The frozen hero panel still carries "not a rotating bench";
 *    flagged in the build report.
 * 2026-11-01 (SEO round 2): H1 carries "IT staff augmentation" (2,900/mo, KD 6); the Salesforce phrases moved to
 *    /services/hire-salesforce-developers, linked from the Salesforce section. */

const PATH = "/services/staff-augmentation";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "IT Staff Augmentation Services | OneAlgorithm";
const DESCRIPTION = "IT staff augmentation, including Salesforce admins, developers and architects. We say where each candidate is light. Call (610) 890-9711.";

const SOURCES: SfSource[] = [
  { name: "U.S. Bureau of Labor Statistics: Occupational Employment and Wage Statistics", what: "Computer occupations, all other (15-1299), May 2025: 435,370 employed nationally; 7,360 in the Philadelphia-Camden-Wilmington area. BLS publishes no staff-augmentation series, so these counts are nearby context, not the size of the market", read: "read 31 October 2026", page: "https://www.bls.gov/oes/current/oes151299.htm" },
];

const L = (to: string, t: string) => <Link className="sf-link" to={to}>{t}</Link>;

const ROLES: EUnit[] = [
  {
    id: "h-roles", title: "Roles we place",
    lede: "Salesforce administrators, developers and architects first; other technical roles on request, and we say where we are light.",
    lead: "If what you need is not on this list, we will say so rather than send someone who read the documentation last week.",
    points: ["Salesforce administrator", "Salesforce developer", "Salesforce architect"],
    label: "how we handle other roles",
    deep: <p className="sf-rule">Salesforce is where our delivery evidence is, so it is where we lead. Other technical roles are considered on request, case by case, and we state plainly whether we have the right person before you spend an hour interviewing. For the Salesforce side, see {L("/services/salesforce", "Salesforce consulting")} and {L("/services/salesforce-managed-services", "Salesforce managed services")}. For a whole product, see {L("/services/application-development", "custom software development")}.</p>,
  },
];

const COST_COMPLIANCE: EUnit[] = [
  {
    id: "h-cost", title: "What staff augmentation costs",
    lede: "Cost follows the role, the seniority you need, how long you need the person and where they work.",
    lead: "We quote in writing once we know the work, and publish no rate card.",
    points: ["Role and seniority required", "Length of the engagement", "Location and hours"],
  },
  {
    id: "h-compliance", title: "Compliance and E-Verify for our employees",
    lede: "Our E-Verify account, enrolled since 2024, verifies our own employees and does not cover subcontractors.",
    lead: "A client taking on contract staff carries real risk, so we state the limit.",
    leadIn: "Yes, but:",
    points: ["E-Verify: our own employees only", "Registered in the federal SAM system", "Not a claim about subcontractors"],
    label: "what we do and do not claim",
    deep: <p className="sf-rule">The account is configured to verify our own employees. We do not say everyone placed on your team is covered, because subcontractors are their own employers' hires. Our SAM registration is active; see our {L("/capabilities", "capabilities page")} for the company record.</p>,
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Is staff augmentation outsourcing?", a: "No. In outsourcing the vendor takes the work and the management of it. In staff augmentation you keep the management and the priorities, and the specialist works as part of your team, in your tools, under your lead. You direct the day-to-day work and decide what comes first." },
  { q: "How fast can someone start?", a: "It depends on the role and on how quickly your access and environment are ready. We tell you honestly whether we have the right person before you spend time interviewing, and we give a start date once the role is defined. We do not quote a standard number of days." },
  { q: "Who manages the people you place?", a: "You do. Your lead sets their priorities, and they work in your repository, your ticket queue and your standups. We stay available to the person and to you, and we raise problems early rather than waiting for a review." },
  { q: "How is staff augmentation different from managed services?", a: "With managed services a vendor runs a function for you and is accountable for the service. With staff augmentation you manage the people, and they work inside your team. If you want a plan or a build instead of hours, that is consulting.", link: { to: "/services/it-consulting", label: "IT consulting services" } },
  { q: "What is in a staff augmentation contract?", a: "A staff augmentation contract normally covers the role and scope, the term, notice, intellectual property assignment and confidentiality. It also states who employs the person placed. We agree it in writing before work starts, and we are happy to review yours." },
  { q: "Do you E-Verify the people you place?", a: "Our E-Verify account covers our own employees only, and we have been enrolled since 2024. It does not cover subcontractors, so we do not claim that everyone placed on your team is verified. Ask us who employs the person, and we will tell you in writing." },
  { q: "Can you place people outside Salesforce?", a: "Our delivery record is Salesforce, so that is where we lead. Other technical roles are discussed case by case, and we say where we are light before you interview anyone. If we are not the right fit, we tell you rather than send a candidate we cannot stand behind." },
  { q: "Do you work with companies outside Pennsylvania?", a: "Yes. Our office is in Malvern, Pennsylvania, and most placements work remotely with teams across the United States. Where a project needs people in the room, we plan it with you, in writing, before anyone travels." },
  { q: "What do you need from us to start?", a: "Four things: the role, the stack, the team the person joins, and the window in which you need them to start. A paragraph is enough. We reply with whether we have the right person and what we would want to know next.", link: { to: "/contact?need=enterprise", label: "Talk to a consultant" } },
  { q: "What is the difference between staff augmentation and a software development company?", a: "A software development company takes a product and is accountable for building it. Staff augmentation gives you skilled people to direct yourself. If you want a finished product, see our custom software development work; if you want hands on your own backlog, this is the page.", link: { to: "/services/application-development", label: "Custom software development" } },
];

export default function StaffAugmentation() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "IT staff augmentation, IT staff augmentation services, staff augmentation services, contract developers, staff augmentation vs consulting",
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: "https://onealgorithm.com/og-image.jpg",
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "IT Staff Augmentation Services",
          "IT staff augmentation, including Salesforce administrators, developers and architects: specialists embedded in your team, working in your tools and reporting to your lead.",
          "IT staff augmentation",
          URL_,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-11-01" })} />

      <PageHero
        eyebrow="Staff Augmentation"
        title={
          <>
            IT staff <span className="text-oa-orange">augmentation services</span>{" "}
            — our people, inside your team
          </>
        }
        lede="Senior practitioners who join your standups, work in your repo and your ticket queue, and take direction from your lead. For a sprint, or for a year."
        panel={{
          title: "How it works",
          items: [
            "Your tools, your process, your lead setting priorities",
            "Senior practitioners, not a rotating bench",
            "Salesforce admins, developers and architects",
            "We tell you where each candidate is light",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <SfPage crumbs={[{ label: "Staff augmentation" }]}>
        <EVStyles />
        <BridgePlate
          id="what"
          fig={1}
          tone="surface"
          heading={{ id: "h-what", title: "What IT staff augmentation is", lede: "IT staff augmentation adds outside specialists to your team, working in your tools under your lead, for as long as the work lasts." }}
          title="Where an augmented specialist sits"
          desc="Four boxes joined by arrows: your lead sets priorities, your tools and process stay as they are, our specialist works inside your team, and we say where each candidate is light."
          stamp="Inside your team"
          caption="You keep control of the work; we tell you where a candidate is light before you interview."
          nodes={[
            { num: "01", title: "Your lead", sub: "sets the priorities" },
            { num: "02", title: "Your tools", sub: "repo, board, standups" },
            { num: "03", title: "Our specialist", sub: "works inside your team", hl: true },
            { num: "04", title: "Our side", sub: "candidates, gaps stated" },
          ]}
        >
          <p className="sf-mono" style={{ marginTop: 16 }}>Updated October 31, 2026</p>
          <GoDeeper label="the model in plain terms">
            <p className="sf-rule">Staff augmentation is a way to add skills without hiring. The person works inside your repository, your board and your review process, so there is no second team to manage on the side. It differs from outsourcing, where a vendor takes the work and the management of it.</p>
            <p>It is also different from {L("/services/it-consulting", "IT consulting services")}: a consultant delivers a recommendation or a build; an augmented specialist delivers hours of skilled work under your direction.</p>
          </GoDeeper>
        </BridgePlate>

        <OfferBand heading="Have a seat to fill?" line="Tell us the role and the stack. We say whether we have the person." label="Talk to a consultant" />

        <SmartSection id="beats" tone="paper" heading={{ id: "h-beats", title: "When staff augmentation beats hiring", lede: "Hiring is slow and commits you for years; four situations make renting the skill the better call." }}>
          <HoverCards
            cols={4}
            items={[
              { glyph: "clock", kicker: "Speed", title: "You need the person now", body: "The deadline is closer than a hiring cycle." },
              { glyph: "gear", kicker: "Skill", title: "You need one skill", body: "One skill for the project, not one more head on the payroll." },
              { glyph: "flag", kicker: "Duration", title: "The role may not last", body: "The work may not outlast the project." },
              { glyph: "team", kicker: "Capacity", title: "Your team is at its limit", body: "Two more pairs of hands, directed by your lead." },
            ]}
          />
          <p className="sf-lead sf-measure" style={{ marginTop: 28 }}><span className="sf-lead-in">Yes, but:</span> often hiring is still right, and we will say so.</p>
        </SmartSection>

        <SmartSection id="proof" tone="surface" compact labelledBy="proof-l">
          <h2 className="sf-h3" id="proof-l">Who you would work with</h2>
          <div style={{ marginTop: 20 }}><ProofStrip variant="salesforce" /></div>
        </SmartSection>

        <EnterpriseRow id="roles" units={ROLES} />

        <StepRail
          id="steps"
          tone="surface"
          heading={{ id: "h-steps", title: "How we place someone", lede: "Four steps, and the second one is where this is usually won or lost." }}
          fig={2}
          stations={[
            { k: "s1", num: "01", title: "What you need", sub: "the work, not the job ad" },
            { k: "s2", num: "02", title: "Candidates", sub: "gaps stated up front" },
            { k: "s3", num: "03", title: "Onboarding", sub: "access, accounts, context" },
            { k: "s4", num: "04", title: "While they stay", sub: "check-ins with you" },
          ]}
          steps={[
            { k: "s1", num: "01", title: "What you actually need", line: "Not the job description but the work: which system, which stack, who they report to." },
            { k: "s2", num: "02", title: "Candidates, gaps stated", line: "You interview them, and we tell you where each one is light before you find out in week three." },
            { k: "s3", num: "03", title: "Onboarding", line: "Access, accounts, environment and context, agreed with your lead before day one." },
            { k: "s4", num: "04", title: "While they are with you", line: "We check in with you, not only with them, and raise problems early." },
          ]}
          title="Four-step rail: need, candidates, onboarding, while they stay"
          desc="A rail with four stations: what you need, candidates with gaps stated, onboarding, and check-ins while the person is with you."
          stamp="How we place someone"
          caption="A candidate described honestly saves you a bad month."
        />

        <EnterpriseTable
          id="compare"
          tone="paper"
          title="Staff augmentation vs outsourcing vs consulting"
          lede="The three differ in who manages the work and who is accountable for the result."
          caption="Staff augmentation compared with outsourcing and consulting"
          head={["Model", "Who manages the work", "You get"]}
          rows={[
            ["Staff augmentation", "You do", "A specialist inside your team"],
            ["Outsourcing", "The vendor does", "A function or project run for you"],
            ["Consulting", "Shared, with us accountable for the output", "A recommendation or a build"],
          ]}
        />

        <SmartSection id="sf" tone="night" grid heading={{ id: "h-sf", title: "Salesforce roles, where our record is", lede: "We provide ongoing Salesforce development for a lending company, and have done since April 2026." }}>
          <div className="sf-c5">
            <CaseCard title="Salesforce development for a lending company" built="Ongoing since April 2026. Development inside the client's org and process. Client name kept private." />
          </div>
          <Statement className="sf-c7">Our developer, their org, their priorities.</Statement>
          <div className="sf-c12">
            <div className="sf-links">{L("/services/hire-salesforce-developers", "Hire Salesforce developers, admins and architects")}</div>
            <GoDeeper label="what Salesforce augmentation looks like">
              <p className="sf-rule">The client is a lending company and stays unnamed; we publish no figures from the work. The model is the one this page describes: our person, working to the client's backlog under the client's lead.</p>
              <p>Salesforce administrators and architects follow the same model. Our {L("/services/salesforce", "Salesforce consulting")} practice also holds Salesforce's AppExchange record of 16 people and 53 certifications.</p>
            </GoDeeper>
          </div>
        </SmartSection>

        <EnterpriseRow id="cost" tone="paper" units={COST_COMPLIANCE} />

        <SmartSection id="market" tone="surface" heading={{ id: "h-market", title: "The labor market around the role", lede: "BLS publishes no staff-augmentation series; these are the nearest occupation counts, not the size of the market." }}>
          <Readouts
            withEvidence={false}
            className="ev-r2"
            items={[
              { value: 7360, label: "computer occupations, all other, in the Philadelphia area, May 2025", source: <>Bureau of Labor Statistics</> },
              { value: 435370, label: "computer occupations, all other, across the United States, May 2025", source: <>Bureau of Labor Statistics</> },
            ]}
          />
        </SmartSection>

        <OfferBand heading="Tell us about the role" line="The skill you need for three months, or the seat open too long." label="Talk to a consultant" />

        <EnterpriseFaq title="Staff augmentation questions" items={FAQS} />
        <EnterpriseSources id="bls-sa" text="Bureau of Labor Statistics, read October 31, 2026." />
        <SourcesDialog id="bls-sa" title="Where these figures come from" intro="The labor-market counts on this page are from the U.S. Bureau of Labor Statistics, read by a person at OneAlgorithm on 31 October 2026." sources={SOURCES} />
        <DeskCTA
          heading="Tell us about the role you cannot fill"
          lede="The skill you need for three months, the seat open too long, or the deadline that needs two more pairs of hands."
          covers={["The system, the stack and who they report to", "How long you need the person", "The start window", "Whether we have the right person"]}
          coversLabel="What to have ready"
          next={["Send the short form on the contact page, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you whether we have the person."]}
          hcLink={false}
          form={{ topic: "staff-augmentation", topicLabel: "Staff augmentation", need: "staff-augmentation", heading: "Talk to an expert", prompt: "What is the role, and how long do you need it?", submitLabel: "Talk to an expert" }}
        />
      </SfPage>
    </Layout>
  );
}
