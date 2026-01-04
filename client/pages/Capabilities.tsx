import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createOrganizationSchema,
} from "../components/StructuredData";
import {
  coreCompetencies,
  differentiators,
  projectHighlights,
  federalExperience,
  complianceProfile,
  strategicPartnerships,
  keyPersonnel,
  mentorProtegeHighlights,
  jointVenturePartner,
} from "../../shared/capabilities-data";
import { siteConfig } from "../lib/siteConfig";
import { CapabilitiesHero } from "../components/capabilities/CapabilitiesHero";
import {
  CompetencyCard,
  DifferentiatorCard,
  ExperienceCard,
  MentorProtegeCard,
  JointVentureCard,
  ComplianceCard,
  ProjectCard,
  KeyPersonCard,
  CodesCard,
} from "../components/capabilities/cards";

const pdfHref = "/api/capabilities.pdf";

export default function Capabilities() {
  useSEO({
    title: "Company Capabilities & Federal Contracting Profile | OneAlgorithm",
    description:
      "Cloud modernization, cybersecurity compliance, and systems integration for federal and commercial clients. CAGE: 14G18 | UEI: W8DYK38MEKP3 | NIST 800-171 Compliant",
    canonical: getCanonicalUrl("/capabilities"),
    keywords:
      "OneAlgorithm capabilities, federal contracting, cloud modernization, DevSecOps, NIST 800-171, DFARS, ISO 9001, cybersecurity compliance, CAGE 14G18, UEI W8DYK38MEKP3, NAICS 541511",
    ogTitle:
      "Company Capabilities & Federal Contracting Profile | OneAlgorithm",
    ogDescription:
      "Cloud modernization, cybersecurity compliance, and systems integration for federal and commercial clients. NIST 800-171 | DFARS Compliant.",
    ogUrl: getCanonicalUrl("/capabilities"),
  });

  return (
    <Layout>
      <StructuredData data={createOrganizationSchema()} />
      
      <CapabilitiesHero site={siteConfig} pdfHref={pdfHref} />

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Company Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {siteConfig.description}
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4 leading-relaxed">
              Our mission is to enable organizations to operate securely,
              efficiently, and at scale—across mission-critical and enterprise
              environments. Our ISO 9001–compliant quality management and NIST
              800-171 cybersecurity practices ensure every engagement meets the
              highest standards of reliability, traceability, and security.
            </p>
          </div>

          {/* Core Competencies */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Core Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreCompetencies.map((competency) => (
                <CompetencyCard key={competency.title} competency={competency} />
              ))}
            </div>
          </div>

          {/* Differentiators */}
          <div className="bg-onealgo-light rounded-2xl p-8 mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Differentiators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((item) => (
                <DifferentiatorCard key={item.title} differentiator={item} />
              ))}
            </div>
          </div>

          {/* Federal Contract Experience */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Federal Contract Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {federalExperience.map((item) => (
                <ExperienceCard
                  key={`${item.title}-${item.rfq}`}
                  experience={item}
                />
              ))}
            </div>
          </div>

          {/* Mentor-Protégé & Partnerships */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Mentor-Protégé & Partnership Readiness
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mentorProtegeHighlights.map((item) => (
                <MentorProtegeCard key={item.title} note={item} />
              ))}
            </div>
          </div>

          {/* Joint Venture Spotlight */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Active SBA-Compliant Joint Venture
            </h3>
            <JointVentureCard partner={jointVenturePartner} />
          </div>

          {/* Compliance & Credentials */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Compliance & Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ComplianceCard
                title="Pending Certifications"
                items={complianceProfile.pendingCertifications}
              />
              <ComplianceCard
                title="Federal Compliance"
                items={complianceProfile.federalCompliance}
              />
              <ComplianceCard
                title="Quality & Security Programs"
                items={complianceProfile.qualityAndSecurity}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {siteConfig.certifications?.length ? (
                <ComplianceCard
                  title="Industry Certifications"
                  items={siteConfig.certifications}
                />
              ) : null}

              <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-onealgo-blue-950">
                    Bonding & Registration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-700">
                  <p>
                    <strong>Bonding Capacity:</strong>{" "}
                    {complianceProfile.bondingCapacity}
                  </p>
                  <p>
                    <strong>SAM Registration:</strong>{" "}
                    {complianceProfile.samRegistration}
                  </p>
                  <p>
                    <strong>CAGE Code:</strong> {siteConfig.identifiers.cage}
                  </p>
                  <p>
                    <strong>UEI:</strong> {siteConfig.identifiers.uei}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Strategic Partnerships */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Strategic Partnerships
            </h3>
            <div className="bg-onealgo-light rounded-2xl p-8 space-y-4">
              {strategicPartnerships.map((note, index) => (
                <p
                  key={index}
                  className="text-gray-700 text-lg leading-relaxed"
                >
                  {note}
                </p>
              ))}
            </div>
          </div>

          {/* Project Highlights */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Commercial Project Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectHighlights.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NAICS / PSC Codes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
            NAICS / PSC Codes
          </h3>
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-700">
              <strong>Primary NAICS:</strong> 541511 – Custom Computer
              Programming Services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CodesCard title="NAICS Codes" codes={siteConfig.codes.naics} />
            <CodesCard title="PSC Codes" codes={siteConfig.codes.psc} />
          </div>
        </div>
      </section>

      {/* Key Personnel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
            Key Personnel
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyPersonnel.map((person) => (
              <KeyPersonCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-onealgo-blue-950 to-onealgo-blue-800 text-white mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center border-t border-blue-700 pt-8 -mt-1">
            <p className="text-lg text-blue-200 mb-4">
              <strong>CAGE Code:</strong> {siteConfig.identifiers.cage} |{" "}
              <strong>UEI:</strong> {siteConfig.identifiers.uei} |{" "}
              <strong>D-U-N-S:</strong> {siteConfig.identifiers.duns}
            </p>
            <p className="text-blue-200 mb-8">
              <a
                href={siteConfig.sbaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-onealgo-orange-500 hover:underline inline-flex items-center gap-2"
              >
                View SBA Certification Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </p>

            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
