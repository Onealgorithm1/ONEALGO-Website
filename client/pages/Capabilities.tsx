import React from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Building2,
  FileText,
  Target,
  Users,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Shield,
  Lightbulb,
  ExternalLink,
  Briefcase,
  CalendarDays,
  ClipboardList,
  Handshake,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
import type { IconName } from "../../shared/capabilities-data";
import { siteConfig } from "../lib/siteConfig";

const iconComponents: Record<IconName, LucideIcon> = {
  target: Target,
  lightbulb: Lightbulb,
  users: Users,
  shield: Shield,
  checkCircle: CheckCircle,
};

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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-blue-100">
              Capabilities Statement
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              One Algorithm LLC — Capabilities Statement
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Modernizing Federal Systems Securely and Intelligently
            </p>
            <div className="space-y-4 text-lg text-blue-100 max-w-5xl mx-auto">
              <p>
                Woman- and Minority-Owned Small Business (WOSB/MBE pending)
                delivering secure, standards-aligned technology and compliance
                solutions to federal and commercial clients nationwide.
              </p>
              <p>
                Mission: enable government and enterprise customers to
                modernize securely, efficiently, and accessibly—meeting all
                compliance and mission objectives.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-blue-100">
              <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm">
                <Shield className="w-4 h-4" />
                CAGE: {siteConfig.identifiers.cage}
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm">
                <FileText className="w-4 h-4" />
                UEI: {siteConfig.identifiers.uei}
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm">
                <FileText className="w-4 h-4" />
                D-U-N-S: {siteConfig.identifiers.duns}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 text-left text-blue-100 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                <MapPin className="w-5 h-5" />
                <span>
                  {siteConfig.address.street} {siteConfig.address.streetUnit}, {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                <Building2 className="w-5 h-5" />
                <a
                  href={siteConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-onealgo-orange-300 transition-colors"
                >
                  {siteConfig.url}
                </a>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                <Mail className="w-5 h-5" />
                <a
                  href={`mailto:${siteConfig.contact.emailPrimary}`}
                  className="hover:text-onealgo-orange-300 transition-colors"
                >
                  {siteConfig.contact.emailPrimary}
                </a>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                <Phone className="w-5 h-5" />
                <a
                  href={`tel:${siteConfig.contact.phonePrimary}`}
                  className="hover:text-onealgo-orange-300 transition-colors"
                >
                  {siteConfig.contact.phonePrimary}
                </a>
              </div>
            </div>
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
              >
                <a
                  href="/api/capabilities.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  aria-label="Download the One Algorithm capabilities statement"
                  className="inline-flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Download Capabilities Statement (PDF)
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
              {coreCompetencies.map((competency) => {
                const Icon = iconComponents[competency.icon];
                return (
                  <Card
                    key={competency.title}
                    className="border-2 hover:border-onealgo-orange-500 transition-colors"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-onealgo-blue-950">
                        <Icon className="w-8 h-8 text-onealgo-orange-500" />
                        {competency.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-gray-700">
                        {competency.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Differentiators */}
          <div className="bg-onealgo-light rounded-2xl p-8 mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Differentiators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((item) => {
                const Icon = iconComponents[item.icon];
                return (
                  <div key={item.title} className="text-center">
                    <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                      <Icon className="w-12 h-12 text-onealgo-orange-500 mx-auto mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Federal Contract Experience */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Federal Contract Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {federalExperience.map((item) => (
                <Card
                  key={`${item.title}-${item.rfq}`}
                  className="border-2 hover:border-onealgo-orange-500 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-onealgo-blue-950">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{item.rfq}</p>
                  </CardHeader>
                  <CardContent className="space-y-3 text-gray-700">
                    <p className="font-medium text-onealgo-blue-900">
                      {item.role}
                    </p>
                    {item.partner && (
                      <p className="text-sm text-gray-600">{item.partner}</p>
                    )}
                    <p className="text-sm leading-relaxed">{item.scope}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-2 border-t border-gray-100">
                      <span className="font-semibold text-gray-900">
                        {item.submissionDate}
                      </span>
                      <span className="text-onealgo-orange-600">
                        {item.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
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
                <Card
                  key={item.title}
                  className="border-2 hover:border-onealgo-orange-500 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-onealgo-blue-950">
                      <Handshake className="w-6 h-6 text-onealgo-orange-500" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Joint Venture Spotlight */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Active SBA-Compliant Joint Venture
            </h3>
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-onealgo-blue-950">
                  <Layers className="w-6 h-6 text-onealgo-orange-500" />
                  {jointVenturePartner.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{jointVenturePartner.summary}</p>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="font-semibold">Address</p>
                    <p>{jointVenturePartner.address}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold">Registration</p>
                    <p>{jointVenturePartner.cage}</p>
                    <p>{jointVenturePartner.uei}</p>
                    <p>{jointVenturePartner.samStatus}</p>
                    <p>{jointVenturePartner.certifications}</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2">Core Services</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {jointVenturePartner.services.map((service) => (
                      <li key={service} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <a
                    href={jointVenturePartner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-onealgo-orange-500 font-semibold hover:underline"
                  >
                    Visit {jointVenturePartner.website.replace("https://", "")}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance & Credentials */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Compliance & Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-onealgo-blue-950">
                    Pending Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    {complianceProfile.pendingCertifications.map((cert) => (
                      <li key={cert} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-onealgo-blue-950">
                    Federal Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    {complianceProfile.federalCompliance.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-onealgo-blue-950">
                    Quality & Security Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    {complianceProfile.qualityAndSecurity.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {siteConfig.certifications?.length ? (
                <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-onealgo-blue-950">
                      Industry Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      {siteConfig.certifications.map((cert) => (
                        <li key={cert} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
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
                <Card
                  key={project.title}
                  className="border-2 hover:border-onealgo-orange-500 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-onealgo-blue-950">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      {project.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
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
            <Card>
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">
                  NAICS Codes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 sm:grid-cols-3">
                  {siteConfig.codes.naics.map((code) => (
                    <div
                      key={code}
                      className="bg-onealgo-light px-3 py-2 rounded text-center font-mono"
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">
                  PSC Codes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 sm:grid-cols-3">
                  {siteConfig.codes.psc.map((code) => (
                    <div
                      key={code}
                      className="bg-onealgo-light px-3 py-2 rounded text-center font-mono"
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
              <Card
                key={person.name}
                className="border-2 hover:border-onealgo-orange-500 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-onealgo-blue-950">
                    {person.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{person.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{person.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
