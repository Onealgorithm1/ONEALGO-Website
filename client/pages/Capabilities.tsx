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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { StructuredData, createOrganizationSchema } from "../components/StructuredData";
import { siteConfig, getFullAddress } from "../lib/siteConfig";

export default function Capabilities() {
  useSEO({
    title: "OneAlgorithm — Company Capabilities & Profile",
    description:
      "ONE ALGORITHM LLC provides technology and compliance solutions, software development, digital transformation, and small business consulting. CAGE: 14G18 | UEI: W8DYK38MEKP3",
    canonical: getCanonicalUrl("/capabilities"),
    keywords:
      "OneAlgorithm capabilities, CAGE 14G18, UEI W8DYK38MEKP3, software development, digital transformation, small business consulting, NAICS codes, PSC codes",
    ogTitle: "OneAlgorithm — Company Capabilities & Profile",
    ogDescription:
      "Technology and compliance solutions firm offering secure software development, digital transformation, and small business consulting services.",
    ogUrl: getCanonicalUrl("/capabilities"),
  });

  return (
    <Layout>
      <StructuredData data={createOrganizationSchema()} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Company Capabilities
            </h1>
            <p className="text-xl text-blue-200 max-w-4xl mx-auto mb-8">
              {siteConfig.legalName} — Technology & Compliance Solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-blue-100">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>CAGE Code: {siteConfig.identifiers.cage}</span>
              </div>
              <div className="hidden sm:block text-blue-300">|</div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>UEI: {siteConfig.identifiers.uei}</span>
              </div>
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
          </div>

          {/* Core Competencies */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Core Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-onealgo-blue-950">
                    <Target className="w-8 h-8 text-onealgo-orange-500" />
                    Technology & Digital Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Custom web and mobile application development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Cloud platforms, API integrations, and enterprise automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Cybersecurity, data integrity, and compliance solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>CRM implementation, workflow optimization, and AI-driven solutions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-onealgo-blue-950">
                    <Users className="w-8 h-8 text-onealgo-orange-500" />
                    Small Business Consulting & Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Strategic planning, business development, and market expansion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Financial planning, operational efficiency, and risk assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Project management and IT consulting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Marketing strategy and client acquisition</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Differentiators */}
          <div className="bg-onealgo-light rounded-2xl p-8 mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Differentiators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                  <Lightbulb className="w-12 h-12 text-onealgo-orange-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Integrated Expertise</h4>
                  <p className="text-sm text-gray-600">
                    Combines technology, operations, and small business consulting in one firm.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                  <Users className="w-12 h-12 text-onealgo-orange-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Experienced Leadership</h4>
                  <p className="text-sm text-gray-600">
                    Executives with strong experience in tech, operations, and business growth.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                  <Target className="w-12 h-12 text-onealgo-orange-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Scalable Solutions</h4>
                  <p className="text-sm text-gray-600">
                    Able to manage multiple projects, digital platforms, and consulting engagements simultaneously.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                  <CheckCircle className="w-12 h-12 text-onealgo-orange-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Client-Centric Approach</h4>
                  <p className="text-sm text-gray-600">
                    Focused on reliability, performance-driven outcomes, and measurable results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Highlights */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-onealgo-blue-950 mb-8 text-center">
              Commercial Project Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-onealgo-blue-950">Technology Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Developed enterprise SaaS platforms, CRM systems, and workflow automation tools for private clients.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Built secure compliance and monitoring solutions to support operational efficiency.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-onealgo-blue-950">Small Business Consulting Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Provided strategic planning, IT project management, and business analyst services for small businesses.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Developed marketing strategies, CRM systems, and operational process improvements to scale client operations.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">NAICS Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
                  {siteConfig.codes.naics.map((code) => (
                    <div key={code} className="bg-onealgo-light px-3 py-2 rounded text-center font-mono">
                      {code}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">PSC Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
                  {siteConfig.codes.psc.map((code) => (
                    <div key={code} className="bg-onealgo-light px-3 py-2 rounded text-center font-mono">
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
            Key Personnel / Consultants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">Swapna Amirisetti</CardTitle>
                <p className="text-sm text-gray-600">CEO / President</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Leads strategy, operations, and business growth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">Sreenivas Amirisetti</CardTitle>
                <p className="text-sm text-gray-600">Secretary / CTO</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Oversees IT project management, business analysis, and technology strategy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">Louis Rubino</CardTitle>
                <p className="text-sm text-gray-600">COO</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Manages small business consulting, construction & business development, and marketing initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-onealgo-blue-950 to-onealgo-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-3 text-onealgo-orange-500" />
              <h4 className="font-semibold mb-2">Phone</h4>
              <p className="text-blue-200">{siteConfig.contact.phonePrimary}</p>
              {siteConfig.contact.phoneAlt && (
                <p className="text-blue-200 text-sm mt-1">{siteConfig.contact.phoneAlt}</p>
              )}
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-3 text-onealgo-orange-500" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-blue-200">{siteConfig.contact.emailPrimary}</p>
              {siteConfig.contact.emailAlt && (
                <p className="text-blue-200 text-sm mt-1">{siteConfig.contact.emailAlt}</p>
              )}
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-onealgo-orange-500" />
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-blue-200">
                {siteConfig.address.street} {siteConfig.address.streetUnit}
                <br />
                {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-blue-200 mb-2">
              <strong>Website:</strong>{" "}
              <a href={siteConfig.url} className="text-onealgo-orange-500 hover:underline">
                {siteConfig.url}
              </a>
            </p>
            <p className="text-lg text-blue-200 mb-6">
              <strong>CAGE Code:</strong> {siteConfig.identifiers.cage} |{" "}
              <strong>UEI:</strong> {siteConfig.identifiers.uei}
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
