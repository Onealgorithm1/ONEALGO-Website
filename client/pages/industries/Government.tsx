import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Users, Shield, Zap, Clock, ExternalLink } from "lucide-react";
import { siteConfig } from "../../lib/siteConfig";

// GovernmentIcon — raster-based mask using provided asset so it inherits currentColor (brand color)
const GOV_ICON_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F20b6adccade9436b84c4533a7665043f?format=webp&width=800";
function GovernmentIcon({ className }: { className?: string }) {
  return (
    <div
      className={className}
      role="img"
      aria-hidden="true"
      style={{
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${GOV_ICON_URL})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center",
        maskImage: `url(${GOV_ICON_URL})`,
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "inline-block",
      }}
    />
  );
}

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

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Security & Compliance",
      description:
        "Hardened systems with audit trails, role-based access, and compliance with federal/state regulations.",
    },
    {
      icon: <GovernmentIcon className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Citizen Services",
      description:
        "Modern web and mobile services that improve access, transparency, and satisfaction for constituents.",
    },
    {
      icon: <Users className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Collaboration & Casework",
      description:
        "Integrated workflows and case management tools to streamline inter-department coordination and service delivery.",
    },
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Process Automation",
      description:
        "Automate repetitive tasks, approvals, and notifications to reduce manual effort and speed response times.",
    },
    {
      icon: <Clock className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Legacy Modernization",
      description:
        "Migrate legacy systems safely with minimal service disruption and phased modernization planning.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <GovernmentIcon className="w-24 h-24 text-onealgo-orange-500 mx-auto mb-6 animate-bounce-slow" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Government{" "}
              <span className="text-onealgo-orange-500">Solutions</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-4">
              Empowering Government Transformation Through Data, AI, and
              Intelligent Automation.
            </p>

            <p className="text-sm text-white max-w-3xl mx-auto mb-6">
              {siteConfig.legalName} — UEI: {siteConfig.identifiers.uei} • CAGE Code: {siteConfig.identifiers.cage}
            </p>

            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              At {siteConfig.legalName}, we enable government agencies to
              modernize, automate, and innovate responsibly. From upgrading
              legacy infrastructure to deploying secure AI systems that enhance
              citizen services, our solutions are engineered to help public
              institutions achieve their mission with speed, transparency, and
              impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-transparent border-2 border-onealgo-orange-500 text-onealgo-orange-500 hover:bg-onealgo-orange-500 hover:text-white px-8 py-4"
              >
                <Link to="/contact">Contact Our Public Sector Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Who We Serve
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We partner with federal, state, and local government entities to
              deliver secure, scalable, and results-driven technology solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">
                  Federal agencies and commissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Program modernization, mission systems, and interagency
                  integration.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">
                  State departments and regional authorities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Digital services, case management, and statewide analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">
                  County and city governments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Public-facing portals, permitting, and citizen engagement
                  tools.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">
                  Public safety & emergency response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Real-time operations, dispatching, and incident analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">
                  Public health & medical agencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Secure health data integration, dashboards, and contact
                  tracing workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">
                  Education, transportation, courts & utilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Solutions for K–12, higher education, transport planning, and
                  utilities management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Government-Focused Services */}
      <section className="py-16 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Government-Focused Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              An integrated suite of technology and staffing services designed
              to help agencies operate smarter, faster, and more securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-onealgo-blue-950 mb-3">
                AI & Data Intelligence
              </h3>
              <p className="text-gray-700 mb-3">
                Unlock the potential of your data with secure, ethical, and
                explainable AI. We design machine learning models, data
                pipelines, and predictive analytics systems that strengthen
                decision-making, streamline operations, and elevate public
                services.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>AI-driven data automation and analytics</li>
                <li>Predictive modeling for resource and budget planning</li>
                <li>Natural language processing for citizen engagement</li>
                <li>Secure data integration and governance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-onealgo-blue-950 mb-3">
                Salesforce for Government
              </h3>
              <p className="text-gray-700 mb-3">
                As a trusted Salesforce implementation partner, One Algorithm
                customizes CRM and workflow solutions that align with public
                sector needs—from permitting and licensing to grants and case
                management.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>CRM for citizen and constituent management</li>
                <li>Workflow automation and service delivery optimization</li>
                <li>Analytics and performance dashboards</li>
                <li>
                  System integration with existing government infrastructure
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-onealgo-blue-950 mb-3">
                IT Modernization
              </h3>
              <p className="text-gray-700 mb-3">
                We help agencies retire outdated systems and transition to
                cloud-enabled, resilient, and compliant architectures. Our
                modernization framework focuses on operational efficiency, data
                security, and mission readiness.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Cloud migration and infrastructure automation</li>
                <li>Application refactoring and platform upgrades</li>
                <li>Cybersecurity and compliance integration</li>
                <li>Legacy-to-cloud data transformation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-onealgo-blue-950 mb-3">
                Strategic Workforce & Staffing Solutions
              </h3>
              <p className="text-gray-700 mb-3">
                We provide mission-critical technology professionals to federal,
                state, and local agencies. Our workforce model ensures agility,
                scalability, and full compliance with public sector regulations.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Cleared technical specialists and program managers</li>
                <li>Data scientists, AI engineers, and Salesforce experts</li>
                <li>Contract, contract-to-hire, and project-based talent</li>
                <li>Workforce planning and digital upskilling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NAICS / Services Codes and Partner CTA */}
      <section className="py-12 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Partner With One Algorithm
              </h3>
              <p className="text-gray-700 mb-4">
                Whether your agency is modernizing IT infrastructure,
                implementing AI for public services, or scaling your technical
                workforce, One Algorithm brings the expertise, innovation, and
                reliability you can trust.
              </p>
              <Button
                asChild
                className="bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white w-full"
              >
                <Link to="/contact">Get Started Today</Link>
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Company Identifiers
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>
                  <strong>Legal Name:</strong> {siteConfig.legalName}
                </li>
                <li>
                  <strong>UEI:</strong> {siteConfig.identifiers.uei}
                </li>
                <li>
                  <strong>CAGE Code:</strong> {siteConfig.identifiers.cage}
                </li>
                <li>
                  <strong>D-U-N-S:</strong> {siteConfig.identifiers.duns}
                </li>
              </ul>
              <div className="mt-4">
                <Link
                  to="/capabilities"
                  className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline text-sm"
                >
                  View Full Company Capabilities →
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                NAICS Codes (Primary)
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>541511 — Custom Computer Programming Services</li>
                <li>541512 — Computer Systems Design Services</li>
                <li>541519 — Other Computer Related Services</li>
                <li>518210 — Computing Infrastructure Providers</li>
                <li>541611 — Administrative Management Consulting</li>
                <li>541613 — Marketing Consulting Services</li>
              </ul>
              <div className="mt-3">
                <Link
                  to="/capabilities"
                  className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline text-sm"
                >
                  View All NAICS & PSC Codes →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
