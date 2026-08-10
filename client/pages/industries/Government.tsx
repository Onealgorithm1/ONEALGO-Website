import React from "react";
import Layout from "../../components/Layout";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { siteConfig } from "../../../shared/companyProfile";

/* ---------------------------------------------------------------------------
   Government industry page - 2026 refresh.

   ELIGIBILITY IS NOT EXPERIENCE. The firm is SBA-certified WOSB/EDWOSB, SAM
   registered, and has published NAICS and PSC codes - but it has NOT yet been
   awarded a government contract. Every statement below is therefore phrased as
   eligibility, registration or offered capability. Nothing claims a client
   agency, a past award, or federal delivery experience.

   What that audit changed on this page:
     - "we enable government agencies to modernize, automate and innovate"
       became a statement of certification and registration status.
     - "We partner with federal, state, and local government entities to
       deliver..." became "registered and eligible to contract with...".
     - "We provide mission-critical technology professionals to federal, state
       and local agencies" became a description of the workforce model offered.
     - "Cleared technical specialists" was dropped. An active clearance is
       normally sponsored by an awarded contract, so the phrase reads as past
       federal performance. Flagged for the business.
     - "trusted Salesforce implementation partner" became "listed Salesforce
       Consulting Partner", which is the form a buyer can verify on AppExchange
       and the wording used on the homepage.

   Two other fixes: the hero rendered "Talk to an Expert" twice, side by side,
   two different button styles pointing at the same route - one survives. And a
   five-item `features` array was declared and never rendered; it duplicated the
   service blocks below, so it is deleted rather than surfaced.

   This is the one industry page with no StructuredData. That is left as it was.
--------------------------------------------------------------------------- */

/** Titles for the six codes the page already published. The codes themselves
 *  come from shared/companyProfile so SAM and the site cannot drift apart. */
const NAICS_TITLES: Record<string, string> = {
  "541511": "Custom Computer Programming Services",
  "541512": "Computer Systems Design Services",
  "541519": "Other Computer Related Services",
  "518210": "Computing Infrastructure Providers",
  "541611": "Administrative Management Consulting",
  "541613": "Marketing Consulting Services",
};

const NAICS_PRIMARY = siteConfig.codes.naics.filter((c) => NAICS_TITLES[c]);
const NAICS_OTHER = siteConfig.codes.naics.filter((c) => !NAICS_TITLES[c]);

const AUDIENCES = [
  {
    title: "Federal agencies and commissions",
    body: "Program modernization, mission systems, and interagency integration.",
  },
  {
    title: "State departments and regional authorities",
    body: "Digital services, case management, and statewide analytics.",
  },
  {
    title: "County and city governments",
    body: "Public-facing portals, permitting, and citizen engagement tools.",
  },
  {
    title: "Public safety & emergency response",
    body: "Real-time operations, dispatching, and incident analytics.",
  },
  {
    title: "Public health & medical agencies",
    body: "Secure health data integration, dashboards, and contact tracing workflows.",
  },
  {
    title: "Education, transportation, courts & utilities",
    body: "Solutions for K–12, higher education, transport planning, and utilities management.",
  },
];

const SERVICES = [
  {
    title: "AI & Data Intelligence",
    body: "Unlock the potential of your data with secure, ethical, and explainable AI. We design machine learning models, data pipelines, and predictive analytics systems that strengthen decision-making, streamline operations, and elevate public services.",
    items: [
      "AI-driven data automation and analytics",
      "Predictive modeling for resource and budget planning",
      "Natural language processing for citizen engagement",
      "Secure data integration and governance",
    ],
  },
  {
    title: "Salesforce for Government",
    body: "As a listed Salesforce Consulting Partner, One Algorithm customizes CRM and workflow solutions that align with public sector needs—from permitting and licensing to grants and case management.",
    items: [
      "CRM for citizen and constituent management",
      "Workflow automation and service delivery optimization",
      "Analytics and performance dashboards",
      "System integration with existing government infrastructure",
    ],
  },
  {
    title: "IT Modernization",
    body: "We help agencies retire outdated systems and transition to cloud-enabled, resilient, and compliant architectures. Our modernization framework focuses on operational efficiency, data security, and mission readiness.",
    items: [
      "Cloud migration and infrastructure automation",
      "Application refactoring and platform upgrades",
      "Cybersecurity and compliance integration",
      "Legacy-to-cloud data transformation",
    ],
  },
  {
    title: "Strategic Workforce & Staffing Solutions",
    body: "We place mission-critical technology professionals. Our workforce model is built for the agility, scalability, and public sector compliance a government program requires.",
    items: [
      "Technical specialists and program managers",
      "Data scientists, AI engineers, and Salesforce experts",
      "Contract, contract-to-hire, and project-based talent",
      "Workforce planning and digital upskilling",
    ],
  },
];

/** Facts a contracting officer verifies during market research. All of these
 *  attest to certification and registration status - not to any award. */
const IDENTIFIERS: [string, string][] = [
  ["UEI", siteConfig.identifiers.uei],
  ["CAGE", siteConfig.identifiers.cage],
  ["D-U-N-S", siteConfig.identifiers.duns],
  ["SAM.gov", "Active"],
  ["Primary NAICS", siteConfig.codes.naics[0]],
  ["Legal name", siteConfig.legalName],
];

export default function Government() {
  useSEO({
    title: "Government Technology Solutions — OneAlgorithm",
    description:
      "Secure, compliant digital services and infrastructure modernization for government agencies and public sector organizations.",
    canonical: getCanonicalUrl("/industries/government"),
    ogTitle: "Government Technology Solutions — OneAlgorithm",
    ogDescription:
      "Secure, citizen-focused digital services, legacy modernization, and compliance-first solutions for government organizations.",
    ogUrl: getCanonicalUrl("/industries/government"),
  });

  return (
    <Layout>
      <PageHero
        eyebrow="Industries — Government"
        title={
          <>
            Government <span className="text-oa-orange">Solutions</span>
          </>
        }
        lede="Empowering Government Transformation Through Data, AI, and Intelligent Automation."
        // The hero bullets moved into the panel rather than being duplicated,
        // plus the section heading below. Every line is eligibility,
        // certification or registration status - none of it implies an award.
        // UEI and CAGE come from shared/companyProfile, never hard-coded.
        panel={{
          title: "Eligibility and registration",
          items: [
            "Set-aside eligible and registered to receive award",
            "SBA-certified WOSB / EDWOSB",
            "SAM.gov registration active",
            `${siteConfig.codes.naics.length} NAICS and ${siteConfig.codes.psc.length} PSC codes published`,
            "PA DGS registered supplier, Virginia SWaM certified",
          ],
          footer: [
            `UEI ${siteConfig.identifiers.uei}`,
            `CAGE ${siteConfig.identifiers.cage}`,
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{
          label: "Download Capability Statement",
          href: "/docs/capability-statement.pdf",
          download: "OneAlgorithm-Capability-Statement.pdf",
        }}
      />

      {/* Eligibility, stated plainly, before anything else. The old page opened
          with a paragraph about enabling agencies to modernize, which reads as
          work already being done for them. */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="For government buyers"
          title="Set-aside eligible and registered to receive award"
          lede={
            <>
              {siteConfig.legalName} is an SBA-certified WOSB/EDWOSB with an
              active SAM registration, published NAICS and PSC codes, and state
              procurement registrations across Pennsylvania, Virginia and others
              — so a contracting officer can verify eligibility during market
              research. From upgrading legacy infrastructure to deploying secure
              AI systems that enhance citizen services, our solutions are
              engineered to help public institutions achieve their mission with
              speed, transparency, and impact.
            </>
          }
        />

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-oa-hairline bg-oa-hairline sm:grid-cols-2 lg:grid-cols-3">
          {IDENTIFIERS.map(([label, value]) => (
            <div key={label} className="bg-oa-surface p-6">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-oa-ink3">
                {label}
              </dt>
              <dd className="mt-1.5 break-words font-mono text-sm text-oa-ink">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Who this is for"
          title="Who We Serve"
          lede="We are registered and set-aside eligible to contract with federal, state, and local government entities, offering secure, scalable, and results-driven technology solutions."
        />

        <CardGrid columns={3} className="mt-12">
          {AUDIENCES.map((a) => (
            <Card key={a.title} title={a.title} body={a.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we offer"
          title="Government-Focused Services"
          lede="An integrated suite of technology and staffing services designed to help agencies operate smarter, faster, and more securely."
        />

        <CardGrid columns={2} className="mt-12">
          {SERVICES.map((s) => (
            <Card key={s.title} title={s.title} body={s.body}>
              <div className="mt-5">
                <CheckList items={s.items} />
              </div>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Codes stay on the page. They are the reason a contracting officer
          lands here at all, and they now come from shared/companyProfile so a
          SAM update does not leave the site stale. */}
      <Section tone="surface" bordered compact>
        <SectionHeading
          eyebrow="Market research"
          title="Registered codes"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-oa-ink">
              NAICS Codes (Primary)
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-sm text-oa-ink2">
              {NAICS_PRIMARY.map((code) => (
                <li key={code}>
                  {code} — {NAICS_TITLES[code]}
                </li>
              ))}
            </ul>
            {NAICS_OTHER.length > 0 && (
              <p className="mt-4 text-sm text-oa-ink3">
                Also registered: {NAICS_OTHER.join(", ")}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-oa-ink">
              PSC / Product Service Codes
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-sm text-oa-ink2">
              {siteConfig.codes.psc.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTABand
        title="Partner With One Algorithm"
        body="Whether your agency is modernizing IT infrastructure, implementing AI for public services, or scaling your technical workforce, One Algorithm brings the expertise, innovation, and reliability you can trust."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View capability statement", to: "/capabilities" }}
      />
    </Layout>
  );
}
