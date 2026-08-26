import React from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardGrid, CheckList, Prose, SectionHeading } from "./site";
import {
  coreCompetencies,
  differentiators,
  projectHighlights,
  federalExperience,
  complianceProfile,
  strategicPartnerships,
  keyPersonnel,
  pastPerformanceClients,
  procurementRegistrations,
} from "../../shared/capabilities-data";
import { siteConfig } from "../lib/siteConfig";

/* Capability-statement body - 2026 refresh.
 *
 * Two defects fixed alongside the restyle:
 *
 *  1. The procurement registrations were hard-coded here AND held in
 *     shared/capabilities-data.ts (which the sidebar reads). Two copies of a
 *     list of registry numbers on the same page is a drift bug waiting to
 *     happen, and the hard-coded copy had already lost the SAM.gov UEI row.
 *     This component now reads the shared data only.
 *  2. Sections backed by an array rendered their heading even when the array
 *     was empty, leaving bare headings with nothing under them. Every section
 *     is now guarded by a length check.
 *
 * Nothing on this page may be typed by hand if it exists in
 * shared/companyProfile.ts or shared/capabilities-data.ts.
 */

/* The icon map that used to live here is gone with the cards it fed. The five
   Lucide glyphs were decorative — a "users" icon over "SBA-certified EDWOSB and
   WOSB" carries no information a contracting officer can use — and `icon` is
   still a field on the shared data for other pages that render these lists. */

/* Enrollment date, rendered from the one ISO value in companyProfile so the page
   and the JSON-LD cannot drift apart. Pinned to UTC midday and formatted with an
   explicit timeZone, or a browser west of UTC renders the previous day. */
const everifyEnrolled = new Date(
  `${siteConfig.everifyEnrolledDate}T12:00:00Z`,
).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** Hairline identifier grid. Mono type, real <dl>, no colour-only meaning.
 *
 *  3-up on desktop, 2-up on tablet, because the six rows it is called with
 *  divide evenly into both. It was 4-up, which orphaned a lone cell once
 *  E-Verify was added — and an unfilled track paints as a solid grey block,
 *  since the rules are drawn with gap-px over a hairline background. Change the
 *  row count and check the last row still fills, or stretch the final cell the
 *  way the grid on /industries/government does.
 */
function IdentifierGrid({ rows }: { rows: [string, string][] }) {
  return (
    /* 2-up from 390px, not from 640px. These cells hold a short label and one
       short value, so one-per-row on a phone was six near-empty boxes and about
       600px of scroll; the longest value here, a 12-character UEI in mono, fits
       a 195px column with room to spare. Padding steps up with the width. */
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-oa-hairline bg-oa-hairline lg:grid-cols-3">
      {/* The rules are gap-px over a hairline ground, so any track the last row
          does not fill paints as a solid grey block — three federal rows over
          two columns left one. The final cell stretches across whatever the row
          has left, derived from the count so it holds for any list length. */}
      {rows.map(([label, value], i) => (
        <div
          key={label}
          className={[
            "bg-oa-surface p-4 sm:p-6",
            i === rows.length - 1 && rows.length % 2 === 1 ? "col-span-2" : "",
            i === rows.length - 1 && rows.length % 3 === 1 ? "lg:col-span-3" : "",
            i === rows.length - 1 && rows.length % 3 === 2 ? "lg:col-span-2" : "",
            i === rows.length - 1 && rows.length % 3 === 0 ? "lg:col-span-1" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <dt className="font-mono text-[11px] uppercase tracking-wider text-oa-ink3">
            {label}
          </dt>
          <dd className="mt-1.5 break-words font-mono text-sm text-oa-ink">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Rule-separated definition rows. Term, then its body, with a hairline between
 * — no box, no icon, no per-item border.
 *
 * This replaced two `CardGrid`s of icon cards. Measured at 390px, one
 * differentiator card was 192px tall to carry 161 characters, and a competency
 * card 234px for 117; six and four of them came to 2,580px, 22% of the page, to
 * say about a thousand words. The icons were decoration — a "users" glyph over
 * "SBA-certified EDWOSB and WOSB" tells a contracting officer nothing — and a
 * bordered box per claim is the SaaS feature grid this page's own design
 * contract rules out. A capability statement is a dense document; rules do the
 * separating that boxes were doing, at a fraction of the height.
 */
function DefinitionRows({
  rows,
  columns = 1,
}: {
  rows: { term: string; body: React.ReactNode }[];
  columns?: 1 | 2;
}) {
  return (
    <dl
      className={`border-t border-oa-hairline ${
        columns === 2 ? "sm:grid sm:grid-cols-2 sm:gap-x-10" : ""
      }`}
    >
      {rows.map(({ term, body }) => (
        <div key={term} className="border-b border-oa-hairline py-4">
          <dt className="font-semibold text-oa-ink">{term}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-oa-ink2">{body}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Hairline grid of codes - same treatment as the homepage. */
function CodeGrid({ codes }: { codes: string[] }) {
  return (
    <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-oa-hairline bg-oa-hairline sm:grid-cols-4">
      {codes.map((code) => (
        <li
          key={code}
          className="bg-oa-surface px-3 py-3 text-center font-mono text-sm text-oa-ink"
        >
          {code}
        </li>
      ))}
    </ul>
  );
}

export default function CapabilitiesMainContent() {
  /* The "SAM.gov UEI" row is gone. It printed the UEI a fourth time on one
     page — hero rail, Compliance & Credentials, here, and the verification
     block — and it was the odd one out: FedConnect and GSA eBuy are the STATE
     of a registration, which is what this section is about, while the UEI is an
     identifier and is listed as one two sections above. */
  const federalProcurement: [string, string][] = [
    ["FedConnect", procurementRegistrations.federal.fedConnect],
    ["GSA eBuy", procurementRegistrations.federal.gsa_ebuy],
  ];
  const stateProcurement: [string, string][] =
    procurementRegistrations.stateAndLocal.map((item) => [
      item.label,
      item.value,
    ]);

  return (
    /* 80px between eleven sections is 880px of empty page on a phone, and this
       document's genre — the one-page capability statement — is dense by
       convention. Tightened on mobile, kept generous once there is width to
       spend. */
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      <section>
        <SectionHeading title="Company Overview" />
        <Prose className="mt-6">
          <p>
            Founded in 2020, One Algorithm LLC is a woman- and minority-owned
            small business providing secure cloud modernization, Salesforce
            platform engineering, AI-driven automation, cybersecurity
            compliance, and accessibility solutions for federal and state
            agencies. Headquartered in Malvern, Pennsylvania, One Algorithm
            delivers agile, compliant, and cost-effective IT services.
          </p>
        </Prose>
      </section>

      {coreCompetencies.length > 0 && (
        <section>
          <SectionHeading title="Core Competencies" />
          <div className="mt-6 md:mt-8">
            {/* The three bullets under each competency were a CheckList — a
                ticked <ul>, one line each. Set as a sentence they read the same
                and cost a third of the height, and a tick beside a capability
                we are asserting rather than evidencing was overclaiming
                anyway. */}
            <DefinitionRows
              columns={2}
              rows={coreCompetencies.map((c) => ({
                term: c.title,
                body: c.items.join(" · "),
              }))}
            />
          </div>
        </section>
      )}

      {differentiators.length > 0 && (
        <section>
          <SectionHeading title="Differentiators" />
          <div className="mt-6 md:mt-8">
            <DefinitionRows
              columns={2}
              rows={differentiators.map((d) => ({
                term: d.title,
                body: d.description,
              }))}
            />
          </div>
        </section>
      )}

      {/* Empty as of 2026-08-10: the company has not been awarded a government
          contract. The guard is what keeps this from rendering an empty
          "Federal Contract Experience" heading, which reads worse than
          nothing at all. */}
      {federalExperience.length > 0 && (
        <section>
          <SectionHeading title="Federal Contract Experience" />
          <CardGrid columns={2} className="mt-6 md:mt-10">
            {federalExperience.map((item) => (
              <Card key={`${item.title}-${item.rfq}`} title={item.title}>
                <p className="mt-1.5 font-mono text-sm text-oa-ink3">
                  {item.rfq}
                </p>
                <p className="mt-4 font-medium text-oa-ink">{item.role}</p>
                {item.partner && (
                  <p className="mt-1.5 text-sm text-oa-ink2">{item.partner}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-oa-ink2">
                  {item.scope}
                </p>
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-oa-hairline pt-4 font-mono text-sm">
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-oa-ink3">
                      Submitted
                    </dt>
                    <dd className="mt-0.5 text-oa-ink">{item.submissionDate}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-oa-ink3">
                      Status
                    </dt>
                    <dd className="mt-0.5 text-oa-ink">{item.status}</dd>
                  </div>
                </dl>
              </Card>
            ))}
          </CardGrid>
        </section>
      )}

      {/* This section and the old "Verify these credentials" block at the foot
          of the page were the same four numbers printed twice, about 2,000px
          apart, and splitting the numbers from their verification links meant
          neither half was complete. They are now one section: the identifiers,
          then the registries that hold them. `id` moved here with the content,
          so the footer's "We participate in E-Verify" still lands on it. */}
      <section id="verify-credentials" className="scroll-mt-28">
        <SectionHeading title="Compliance & Credentials" />

        <div className="mt-6 md:mt-10">
          <IdentifierGrid
            rows={[
              ["SAM.gov", "Active"],
              ["UEI", siteConfig.identifiers.uei],
              ["CAGE", siteConfig.identifiers.cage],
              ["D-U-N-S", siteConfig.identifiers.duns],
              ["E-Verify Company ID", siteConfig.identifiers.everify],
              ["E-Verify enrolled", everifyEnrolled],
            ]}
          />
        </div>

        {/* A link only where the registry actually resolves one. The SBA record
            is a true per-company permalink; D&B publishes a directory page.
            SAM.gov has no working per-entity permalink — sam.gov/entity/{UEI}
            404s and the search deep-link does not run the query (checked
            2026-08-26) — and the E-Verify tool is a dashboard searched by NAME,
            which is why the legal name is spelled out below.

            py-2 -mx-1 px-1 is not decoration: as bare text-sm links these were
            20px tall, under half the 44px minimum and below even the 24px WCAG
            2.2 floor, on the page that sells Section 508 competence. */}
        <div className="mt-5 flex flex-wrap gap-x-6">
          {[
            ["View SBA certification profile", siteConfig.sbaUrl],
            ["Check our E-Verify enrollment", siteConfig.everifyUrl],
            ["View our D&B Business Directory profile", siteConfig.dunsUrl],
          ]
            .filter(([, href]) => href)
            .map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="-mx-1 inline-flex min-h-[44px] items-center gap-1.5 px-1 py-2 text-sm font-medium text-oa-blue hover:underline"
              >
                {label}
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            ))}
        </div>
        <p className="mt-1 max-w-prose text-sm leading-relaxed text-oa-ink2">
          Registered under{" "}
          <span className="font-mono">{siteConfig.legalName}</span> — search that
          name, not our trading name.
        </p>

        {(complianceProfile.certifications.length > 0 ||
          (siteConfig.certifications?.length ?? 0) > 0) && (
          <CardGrid columns={2} className="mt-5">
            {complianceProfile.certifications.length > 0 && (
              /* Each row carries its number and expiry. A certification with
                 neither is not something a contracting officer can check, and
                 this list previously read "Certified" seven times under a field
                 literally named `pendingCertifications`. */
              <Card title="Certifications & Registrations">
                <div className="mt-5">
                  <CheckList
                    items={complianceProfile.certifications.map(
                      (cert) => `${cert.name} — ${cert.detail}`,
                    )}
                  />
                </div>
              </Card>
            )}
            {(siteConfig.certifications?.length ?? 0) > 0 && (
              <Card title="Industry Certifications">
                <div className="mt-5">
                  <CheckList items={siteConfig.certifications ?? []} />
                </div>
              </Card>
            )}
          </CardGrid>
        )}
      </section>

      {(federalProcurement.length > 0 || stateProcurement.length > 0) && (
        <section>
          <SectionHeading
            title="Procurement Registrations"
            lede="Active government procurement listings."
          />
          {federalProcurement.length > 0 && (
            <div className="mt-6 md:mt-10">
              <h3 className="font-mono text-eyebrow uppercase text-oa-ink3">
                Federal
              </h3>
              <div className="mt-4">
                <IdentifierGrid rows={federalProcurement} />
              </div>
            </div>
          )}
          {stateProcurement.length > 0 && (
            <div className="mt-8">
              <h3 className="font-mono text-eyebrow uppercase text-oa-ink3">
                State &amp; Local
              </h3>
              <div className="mt-4">
                <IdentifierGrid rows={stateProcurement} />
              </div>
            </div>
          )}
        </section>
      )}

      {strategicPartnerships.length > 0 && (
        <section>
          <SectionHeading title="Strategic Partnerships" />
          <Prose className="mt-6">
            {strategicPartnerships.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </Prose>
        </section>
      )}

      {/*
        Corporate Contract Experience — RENAMED and RE-SOURCED 2026-08-12.

        This ran as "Commercial Project Highlights" over three cards, two of
        which were not One Algorithm contracts at all: BMC Software (individual
        prior employment, listed again further down this same page as exactly
        that) and Republic Services (likewise, and bracketed with an unrelated
        radius180 engagement). The dollar values on all three were wrong.

        A contracting officer reads a card with a customer name and a dollar
        figure as a contract. So the heading now says contract, the rows are
        the company's own corporate contract table, and the footnote states the
        two things that stop a reader over-reading them: these are
        subcontracts, and there is no federal prime work behind them.
      */}
      {projectHighlights.length > 0 && (
        <section>
          <SectionHeading
            title="Corporate Contract Experience"
            lede="Contracts held by One Algorithm LLC. All are commercial and all were performed as a subcontractor on a time-and-materials basis."
          />
          <CardGrid columns={2} className="mt-6 md:mt-10">
            {projectHighlights.map((project) => (
              <Card key={project.title} title={project.title}>
                <div className="mt-5">
                  <CheckList items={project.items} />
                </div>
              </Card>
            ))}
          </CardGrid>
          <p className="mt-8 text-sm leading-relaxed text-oa-ink2">
            One Algorithm holds no federal prime contracts and has no CPARS
            record to date. Contract values and customer references are
            available on request.
          </p>
        </section>
      )}

      {(siteConfig.codes.naics.length > 0 || siteConfig.codes.psc.length > 0) && (
        <section>
          <SectionHeading title="NAICS / PSC Codes" />
          {siteConfig.codes.naics.length > 0 && (
            <>
              <p className="mt-6 text-oa-ink2">
                <span className="font-semibold text-oa-ink">Primary NAICS:</span>{" "}
                <span className="font-mono">{siteConfig.codes.naics[0]}</span> –
                Custom Computer Programming Services
              </p>
              <h3 className="mt-8 font-mono text-eyebrow uppercase text-oa-ink3">
                NAICS Codes
              </h3>
              <div className="mt-4">
                <CodeGrid codes={siteConfig.codes.naics} />
              </div>
            </>
          )}
          {siteConfig.codes.psc.length > 0 && (
            <>
              <h3 className="mt-8 font-mono text-eyebrow uppercase text-oa-ink3">
                PSC Codes
              </h3>
              <div className="mt-4">
                <CodeGrid codes={siteConfig.codes.psc} />
              </div>
            </>
          )}
        </section>
      )}

      {/*
        Key Personnel Experience — RELABELLED, and the label matters.

        This block previously ran under the heading "Past Performance" with
        the line "One Algorithm has partnered with leading organizations to
        deliver transformative IT solutions." above 17 company names. Those
        organizations are the PRIOR EMPLOYMENT of members of the leadership
        team, not engagements held by One Algorithm LLC. On a capability
        statement, a contracting officer reads "Past Performance" as
        corporate past performance, so the old framing overstated the
        company's record.

        Individual experience is legitimate and useful here — FAR 15.305
        allows the relevant experience of key personnel to be evaluated where
        corporate past performance is limited — but it has to be presented AS
        individual experience. That is all this change does.
      */}
      {pastPerformanceClients.length > 0 && (
        <section>
          <SectionHeading
            title="Key Personnel Experience"
            lede="Organizations where members of our leadership team delivered technology programs earlier in their careers. These reflect the individual professional experience of our key personnel, not contracts held by One Algorithm LLC."
          />
          <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-oa-hairline bg-oa-hairline sm:grid-cols-3 lg:grid-cols-4">
            {pastPerformanceClients.map((client) => (
              <li
                key={client.name}
                className="flex items-center justify-center bg-oa-surface p-6 text-center"
              >
                <span className="text-sm font-medium text-oa-ink">
                  {client.name}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {keyPersonnel.length > 0 && (
        <section>
          <SectionHeading title="Key Personnel" />
          <CardGrid columns={3} className="mt-6 md:mt-10">
            {keyPersonnel.map((person) => (
              <Card key={person.name} title={person.name}>
                <p className="mt-1.5 text-sm text-oa-ink3">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-oa-ink2">
                  {person.summary}
                </p>
              </Card>
            ))}
          </CardGrid>
        </section>
      )}

      {/* Verification footer. A capability statement ends with the numbers a
          reader will check, and a link to the registry that holds them. */}
    </div>
  );
}
