import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Prose,
  Split,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { siteConfig } from "../../../shared/companyProfile";
import {
  procurementRegistrations,
  complianceProfile,
  jointVenturePartner,
} from "../../../shared/capabilities-data";

/* ---------------------------------------------------------------------------
   Government - copy rewritten 2026-08-12, read with a contracting officer's eye.

   ELIGIBILITY IS NOT PAST PERFORMANCE. The 2026 refresh had already reframed
   the headline claims; this pass removed what was left of the implied record.

   WHAT WENT, AND WHY

   1. "Empowering Government Transformation Through Data, AI, and Intelligent
      Automation." The hero lede. Four abstractions and a verb that describes
      work being done for agencies. Replaced with the eligibility statement and
      an explicit sentence saying no contract has been awarded. A CO who reads
      that and then finds an award in FPDS has been told the truth; a CO who
      reads the old lede and finds nothing has been misled.

   2. THE "WHO WE SERVE" SECTION - deleted entirely. Six cards naming buyer
      segments and the work supposedly done for each: "Program modernization,
      mission systems, and interagency integration", "contact tracing
      workflows", "Real-time operations, dispatching, and incident analytics".
      Not one of those is a capability this repository can evidence, and a list
      of agency types with delivery language beside them reads as a client list
      to anybody scanning quickly. It has no honest replacement, so nothing
      replaces it.

   3. In its place: WHERE WE ARE ACTUALLY REGISTERED - the procurement portals
      and reference numbers from shared/capabilities-data.ts. This is the true
      answer to "who do you serve": whoever buys through the vehicles we are
      registered on. It is checkable, it is the reason a CO is on this page, and
      it was previously buried on /capabilities.

   4. "Unlock the potential of your data ... elevate public services",
      "modernization framework", "Legacy-to-cloud data transformation" -
      category filler, rewritten as plain descriptions of offered work.

   5. ADDED: teaming and subcontracting. A firm with no award and a real JV
      partner should be talking to primes, and Irongrove, the bonding capacity
      and the mentor-protege posture are all already in the repo. This is the
      one section on the page with a live commercial ask behind it.

   Kept exactly as they were: the identifier grid, the NAICS/PSC lists, and the
   capability-statement download. Those are what the page is for.

   This is still the one industry page with no StructuredData. Left as it was.
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

/** What we are offering to do. Every one of these is a service with its own
 *  page on this site - nothing here is a government-specific practice we do not
 *  have. The wording is deliberately "we do" and never "we have delivered for
 *  agencies". */
const SERVICES = [
  {
    title: "Salesforce for public sector",
    body: "We are a listed Salesforce Consulting Partner — AppExchange listing a0N3A00000EV7SwUAL, which you can open and check. Licensing, permitting, grants and case management are Salesforce configuration problems before they are anything else.",
    items: [
      "Constituent and case records in one place",
      "Workflow automation for service delivery",
      "Dashboards for program and queue performance",
      "Integration with systems already in place",
    ],
  },
  {
    title: "IT modernization",
    body: "Moving systems off ageing infrastructure and into cloud environments, in stages, without a cutover weekend nobody can survive. This is the same work described on our IT consulting and Oracle ERP pages.",
    items: [
      "Cloud migration and infrastructure automation",
      "Application refactoring and platform upgrades",
      "Security and compliance built into the migration",
      "Moving data off legacy stores into current ones",
    ],
  },
  {
    title: "Data and AI work",
    body: "Data pipelines, reporting and machine learning where there is enough recorded history to support it. Where there is not, the honest first project is instrumentation, and we will say so before a statement of work is written.",
    items: [
      "Data integration, quality and governance",
      "Predictive models for resource and budget planning",
      "Natural language interfaces over public information",
      "Explainable outputs rather than a black box",
    ],
  },
  {
    title: "Technical staffing",
    body: "Named practitioners embedded in a program team on contract, contract-to-hire or project terms. We make no claim about cleared staff on this page — a clearance is normally sponsored by an awarded contract, and we have not held one.",
    items: [
      "Developers, integration engineers and program managers",
      "Salesforce, Oracle and data specialists",
      "Contract, contract-to-hire and project-based terms",
      "Named people, not a rotating bench",
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

/** Federal vehicles, read off shared data so a status change lands here too.
 *  GSA eBuy really is pending and is shown as pending. */
const FEDERAL: [string, string][] = [
  ["SAM.gov", procurementRegistrations.federal.sam_gov],
  ["FedConnect", procurementRegistrations.federal.fedConnect],
  ["GSA eBuy", procurementRegistrations.federal.gsa_ebuy],
];

export default function Government() {
  useSEO({
    title:
      "Government Contracting — OneAlgorithm | WOSB/EDWOSB, SAM registered",
    description:
      "Set-aside eligible and registered to receive award: SBA-certified WOSB/EDWOSB, active SAM registration, UEI W8DYK38MEKP3, CAGE 14G18, published NAICS and PSC codes, and state procurement registrations. No contract has been awarded yet, and we say so.",
    canonical: getCanonicalUrl("/industries/government"),
    keywords:
      "WOSB EDWOSB contractor, SAM registered small business, UEI W8DYK38MEKP3, CAGE 14G18, set-aside eligible IT contractor, COSTARS eVA registered supplier, small business teaming partner",
    ogTitle:
      "Government Contracting — OneAlgorithm | WOSB/EDWOSB, SAM registered",
    ogDescription:
      "The eligibility record a contracting officer can verify — certifications, identifiers, codes and procurement registrations. No award claimed.",
    ogUrl: getCanonicalUrl("/industries/government"),
  });

  return (
    <Layout>
      <PageHero
        title={
          <>
            Government contracting:{" "}
            <span className="text-oa-orange">eligibility you can verify</span>
          </>
        }
        lede="One Algorithm is an SBA-certified WOSB/EDWOSB with an active SAM registration, published NAICS and PSC codes, and registrations on the procurement portals listed below. We have not yet been awarded a government contract, and nothing on this page is written to suggest otherwise."
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
        // Opens rather than downloads. A contracting officer doing market
        // research wants to read it now, not find it in a downloads folder
        // afterwards; the PDF viewer's own save control handles the rest.
        secondary={{
          label: "Open capability statement",
          href: "/docs/capability-statement.pdf",
        }}
      />

      {/* The identifiers, first, because they are what the visit is for. */}
      <Section tone="paper">
        <SectionHeading
          title="Set-aside eligible and registered to receive award"
          lede="Six fields, so market research takes a minute rather than an email. Each one is held in a registry outside this company, and the SBA record is linked from our about page."
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

        <p className="mt-8 max-w-[68ch] text-oa-ink2">
          A certification makes a firm eligible to bid on set-aside work. It is
          not a contract award, and we do not present it as one. The full
          statement, with the SBA and state records linked, is on our{" "}
          <Link
            className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
            to="/about"
          >
            about page
          </Link>
          .
        </p>
      </Section>

      {/* Replaces the six invented buyer segments. Same question answered
          truthfully: you can buy from us through these. */}
      <Section tone="surface" bordered>
        <SectionHeading
          title="Where we are registered to be found"
          lede="If your agency buys through one of these, we are already in it. Reference numbers included, so a buyer can search by number rather than by name."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr]">
          <div>
            <h3 className="text-lg font-semibold text-oa-ink">Federal</h3>
            <dl className="mt-4 divide-y divide-oa-hairline border-y border-oa-hairline">
              {FEDERAL.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 py-3.5 sm:grid-cols-[8rem_1fr] sm:gap-4"
                >
                  <dt className="text-sm text-oa-ink3">{label}</dt>
                  <dd className="font-mono text-sm text-oa-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-oa-ink">
              State, local and cooperative
            </h3>
            <dl className="mt-4 grid gap-px overflow-hidden rounded-xl border border-oa-hairline bg-oa-hairline sm:grid-cols-2 lg:grid-cols-3">
              {procurementRegistrations.stateAndLocal.map((r) => (
                <div key={r.label} className="bg-oa-surface p-5">
                  <dt className="text-sm text-oa-ink3">{r.label}</dt>
                  <dd className="mt-1 break-words font-mono text-sm text-oa-ink">
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-oa-ink3">
              Also a Pennsylvania DGS registered supplier (35896) and Virginia
              SWaM certified.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          title="What we are offering to do"
          lede="These are capabilities, described as capabilities. Each has its own service page on this site, and none of them is a government practice we hold separately from the commercial one."
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

      {/* The section with an actual ask in it. A firm with no award and a real
          JV partner should be reaching primes, not only COs. */}
      <Section tone="surface" bordered>
        <Split
          left={
            <SectionHeading
              title="Teaming and subcontracting"
              lede="If you are a prime looking for a small-business partner on a set-aside or a subcontracting plan, this is the part of the page for you."
            />
          }
          right={
            <Prose>
              {/* NOT a joint venture, and not SBA-compliant. Both words were
                  wrong and both were hard-coded here rather than read from the
                  data, so correcting the data file did not reach this page.

                  The signed agreement (Dec 2025 / Jan 2026) says the opposite
                  in two places -- "Nothing in this Agreement creates a
                  partnership, joint venture entity..." -- and there is no JV
                  entity, no JV UEI or CAGE, none of the 13 CFR 125.8 machinery,
                  and a default 50/50 split where SBA requires at least 51% to
                  the small business. Calling it an SBA-compliant JV to a
                  contracting officer is a misrepresentation, not a wording
                  preference. It is a teaming agreement, which is a real and
                  useful thing to have. */}
              <p>
                We have a teaming agreement with {jointVenturePartner.name}, a
                veteran-owned small business ({jointVenturePartner.cage},{" "}
                {jointVenturePartner.uei}, SAM registration active), covering
                federal IT modernization, cybersecurity, AI/ML integration and
                infrastructure support alongside us. It is a teaming agreement
                rather than a joint venture: there is no separate JV entity.
              </p>
              <p>
                Bonding capacity is {complianceProfile.bondingCapacity}. We are
                open to mentor-protégé arrangements and to teaming as a
                subcontractor, and we would rather have that conversation before
                a solicitation drops than three days before it closes.
              </p>
              <p>
                The full record — certifications, personnel, codes and
                registrations — is on the{" "}
                <Link
                  className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
                  to="/capabilities"
                >
                  capability statement
                </Link>
                , which is also downloadable as a PDF from the top of this page.
              </p>
            </Prose>
          }
        />
      </Section>

      {/* Codes stay on the page. They are the reason a contracting officer
          lands here at all, and they come from shared/companyProfile so a SAM
          update does not leave the site stale. */}
      <Section tone="paper" compact>
        <SectionHeading title="Registered codes" />

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
        title="Doing market research?"
        body="The identifiers and codes above are the fast answer. If you have a specific solicitation or a subcontracting plan to fill, send it over and we will tell you plainly whether we would bid it."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View capability statement", to: "/capabilities" }}
      />
    </Layout>
  );
}
