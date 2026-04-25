import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  CheckCircle,
  Shield,
  Handshake,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  coreCompetencies,
  differentiators,
  projectHighlights,
  federalExperience,
  complianceProfile,
  strategicPartnerships,
  keyPersonnel,
  mentorProtegeHighlights,
  pastPerformanceClients,
} from "../../shared/capabilities-data";
import type { IconName } from "../../shared/capabilities-data";
import { siteConfig } from "../lib/siteConfig";
import {
  Target,
  Lightbulb,
  Users,
} from "lucide-react";

const iconComponents: Record<IconName, LucideIcon> = {
  target: Target,
  lightbulb: Lightbulb,
  users: Users,
  shield: Shield,
  checkCircle: CheckCircle,
};

export default function CapabilitiesMainContent() {
  return (
    <div className="space-y-20">
      {/* Company Overview */}
      <section className="py-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Company Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Founded in 2020, One Algorithm LLC is a woman- and minority-owned small business
            providing secure cloud modernization, Salesforce platform engineering, AI-driven automation,
            cybersecurity compliance, and accessibility solutions for federal and state agencies.
            Headquartered in Malvern, Pennsylvania, One Algorithm delivers agile, compliant, and cost-effective IT services.
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
        {federalExperience.length > 0 && (
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
        )}

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
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
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

        {/* Procurement Registrations */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
            Procurement Registrations
          </h3>
          <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
            <CardHeader>
              <CardTitle className="text-onealgo-blue-950">
                Active Government Procurement Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="font-semibold text-onealgo-blue-950 mb-3">Federal</p>
                  <ul className="space-y-2 text-sm">
                    <li>• SAM.gov UEI: W8DYK38MEKP3</li>
                    <li>• FedConnect: Active</li>
                    <li>• GSA eBuy: Pending</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-onealgo-blue-950 mb-3">State & Local</p>
                  <ul className="space-y-2 text-sm">
                    <li>• COSTARS (PA): #4400033848</li>
                    <li>• EVA (VA): SUP347430</li>
                    <li>• OhioBuys: ID 00341565-0</li>
                    <li>• Bid Net: 3063593</li>
                    <li>• Cal eProcure: BID126344</li>
                    <li>• Florida: F-----9444</li>
                    <li>• commbuys: ID 00085083</li>
                    <li>• Jaggaer: 0000561511</li>
                    <li>• Euna: Nation Wide</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
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

        {/* NAICS / PSC Codes */}
        <div className="mb-16 py-8 border-y border-gray-200">
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

        {/* Past Performance */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
            Past Performance
          </h3>
          <p className="text-center text-gray-600 mb-12">
            One Algorithm has partnered with leading organizations to deliver transformative IT solutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pastPerformanceClients.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-onealgo-orange-500 transition-colors"
              >
                <div className="text-center">
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="h-16 max-w-full mx-auto mb-2 object-contain"
                    />
                  ) : null}
                  <p className="text-sm font-semibold text-gray-800">
                    {client.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Personnel */}
        <div className="mb-16">
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

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 to-onealgo-blue-800 text-white rounded-lg p-12 text-center">
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
      </section>
    </div>
  );
}
