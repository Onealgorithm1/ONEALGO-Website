import React from "react";
import {
  CheckCircle,
  ExternalLink,
  Shield,
  Target,
  Lightbulb,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
import type { IconName } from "../../shared/capabilities-data";
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

const iconComponents: Record<IconName, LucideIcon> = {
  target: Target,
  lightbulb: Lightbulb,
  users: Users,
  shield: Shield,
  checkCircle: CheckCircle,
};

/** Hairline identifier grid. Mono type, real <dl>, no colour-only meaning. */
function IdentifierGrid({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-xl border border-oa-hairline bg-oa-hairline sm:grid-cols-2 lg:grid-cols-4">
      {rows.map(([label, value]) => (
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
  const federalProcurement: [string, string][] = [
    ["SAM.gov UEI", procurementRegistrations.federal.sam_gov],
    ["FedConnect", procurementRegistrations.federal.fedConnect],
    ["GSA eBuy", procurementRegistrations.federal.gsa_ebuy],
  ];
  const stateProcurement: [string, string][] =
    procurementRegistrations.stateAndLocal.map((item) => [
      item.label,
      item.value,
    ]);

  return (
    <div className="space-y-20">
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
          <CardGrid columns={2} className="mt-10">
            {coreCompetencies.map((competency) => {
              const Icon = iconComponents[competency.icon];
              return (
                <Card key={competency.title} icon={Icon} title={competency.title}>
                  <div className="mt-5">
                    <CheckList items={competency.items} />
                  </div>
                </Card>
              );
            })}
          </CardGrid>
        </section>
      )}

      {differentiators.length > 0 && (
        <section>
          <SectionHeading title="Differentiators" />
          <CardGrid columns={3} className="mt-10">
            {differentiators.map((item) => (
              <Card
                key={item.title}
                icon={iconComponents[item.icon]}
                title={item.title}
                body={item.description}
              />
            ))}
          </CardGrid>
        </section>
      )}

      {/* Empty as of 2026-08-10: the company has not been awarded a government
          contract. The guard is what keeps this from rendering an empty
          "Federal Contract Experience" heading, which reads worse than
          nothing at all. */}
      {federalExperience.length > 0 && (
        <section>
          <SectionHeading title="Federal Contract Experience" />
          <CardGrid columns={2} className="mt-10">
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

      <section>
        <SectionHeading title="Compliance & Credentials" />

        <div className="mt-10">
          <IdentifierGrid
            rows={[
              ["SAM.gov", "Active"],
              ["UEI", siteConfig.identifiers.uei],
              ["CAGE", siteConfig.identifiers.cage],
              ["D-U-N-S", siteConfig.identifiers.duns],
            ]}
          />
        </div>

        {(complianceProfile.pendingCertifications.length > 0 ||
          (siteConfig.certifications?.length ?? 0) > 0) && (
          <CardGrid columns={2} className="mt-5">
            {complianceProfile.pendingCertifications.length > 0 && (
              <Card title="Certifications & Registrations">
                <div className="mt-5">
                  <CheckList items={complianceProfile.pendingCertifications} />
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
            <div className="mt-10">
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

      {projectHighlights.length > 0 && (
        <section>
          <SectionHeading title="Commercial Project Highlights" />
          <CardGrid columns={2} className="mt-10">
            {projectHighlights.map((project) => (
              <Card key={project.title} title={project.title}>
                <div className="mt-5">
                  <CheckList items={project.items} />
                </div>
              </Card>
            ))}
          </CardGrid>
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
                className="flex flex-col items-center justify-center gap-2 bg-oa-surface p-6 text-center"
              >
                {client.logoUrl ? (
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    loading="lazy"
                    className="h-12 max-w-full object-contain"
                  />
                ) : null}
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
          <CardGrid columns={3} className="mt-10">
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
      <section className="rounded-xl border border-oa-hairline bg-oa-surface p-8">
        <h2 className="sr-only">Verify these credentials</h2>
        <dl className="flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm">
          {(
            [
              ["CAGE Code", siteConfig.identifiers.cage],
              ["UEI", siteConfig.identifiers.uei],
              ["D-U-N-S", siteConfig.identifiers.duns],
            ] as [string, string][]
          ).map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] uppercase tracking-wider text-oa-ink3">
                {label}
              </dt>
              <dd className="mt-1 text-oa-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <a
          href={siteConfig.sbaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-oa-blue hover:underline"
        >
          View SBA Certification Profile
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
