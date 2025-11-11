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
import { Users, Shield, Zap, Clock } from "lucide-react";

// Inline U.S. Capitol icon SVG — styled via className prop
function CapitolIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2c1.657 0 3 1.567 3 3.5v.5H9v-.5C9 3.567 10.343 2 12 2z" />
      <path d="M5 11c0-1.657 3.134-3 7-3s7 1.343 7 3v2H5v-2z" />
      <path d="M3 13h18v2a2 2 0 0 1-2 2h-2v3H8v-3H6a2 2 0 0 1-2-2v-2z" />
      <path d="M7 20v-2m10 2v-2" />
    </svg>
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
      icon: <CapitolIcon className="w-8 h-8 text-onealgo-orange-500" />,
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
            <CapitolIcon className="w-24 h-24 text-onealgo-orange-500 mx-auto mb-6 animate-bounce-slow" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Government <span className="text-onealgo-orange-500">Solutions</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-4">
              Empowering Government Transformation Through Data, AI, and
              Intelligent Automation.
            </p>

            <p className="text-sm text-white max-w-3xl mx-auto mb-6">
              One Algorithm LLC (LLC) — UEI: W8DYK38MEKP3 • CAGE Code: 14G18 • D-U-N-S: 118835343
            </p>

            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              At One Algorithm LLC, we enable government agencies to modernize,
              automate, and innovate responsibly. From upgrading legacy
              infrastructure to deploying secure AI systems that enhance citizen
              services, our solutions are engineered to help public institutions
              achieve their mission with speed, transparency, and impact.
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Who We Serve</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We partner with federal, state, and local government entities to
              deliver secure, scalable, and results-driven technology solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">Federal agencies and commissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Program modernization, mission systems, and interagency integration.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">State departments and regional authorities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Digital services, case management, and statewide analytics.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">County and city governments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Public-facing portals, permitting, and citizen engagement tools.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">Public safety & emergency response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Real-time operations, dispatching, and incident analytics.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">Public health & medical agencies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Secure health data integration, dashboards, and contact tracing workflows.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="text-onealgo-blue-950">Education, transportation, courts & utilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Solutions for K–12, higher education, transport planning, and utilities management.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Government-Focused Services */}
      <section className="py-16 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Government-Focused Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">An integrated suite of technology and staffing services designed to help agencies operate smarter, faster, and more securely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-onealgo-blue-950 mb-3">AI & Data Intelligence</h3>
              <p className="text-gray-700 mb-3">Unlock the potential of your data with secure, ethical, and explainable AI. We design machine learning models, data pipelines, and predictive analytics systems that strengthen decision-making, streamline operations, and elevate public services.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>AI-driven data automation and analytics</li>
                <li>Predictive modeling for resource and budget planning</li>
                <li>Natural language processing for citizen engagement</li>
                <li>Secure data integration and governance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-onealgo-blue-950 mb-3">Salesforce for Government</h3>
              <p className="text-gray-700 mb-3">As a trusted Salesforce implementation partner, One Algorithm customizes CRM and workflow solutions that align with public sector needs—from permitting and licensing to grants and case management.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>CRM for citizen and constituent management</li>
                <li>Workflow automation and service delivery optimization</li>
                <li>Analytics and performance dashboards</li>
                <li>System integration with existing government infrastructure</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-onealgo-blue-950 mb-3">IT Modernization</h3>
              <p className="text-gray-700 mb-3">We help agencies retire outdated systems and transition to cloud-enabled, resilient, and compliant architectures. Our modernization framework focuses on operational efficiency, data security, and mission readiness.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Cloud migration and infrastructure automation</li>
                <li>Application refactoring and platform upgrades</li>
                <li>Cybersecurity and compliance integration</li>
                <li>Legacy-to-cloud data transformation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-onealgo-blue-950 mb-3">Strategic Workforce & Staffing Solutions</h3>
              <p className="text-gray-700 mb-3">We provide mission-critical technology professionals to federal, state, and local agencies. Our workforce model ensures agility, scalability, and full compliance with public sector regulations.</p>
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

      {/* Trusted & Compliance */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Trusted by the Public Sector</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">One Algorithm LLC supports digital transformation across government, education, and regulated sectors. Our work reflects a commitment to performance, compliance, and long-term collaboration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold text-onealgo-blue-950 mb-2">Compliance & Frameworks</h3>
              <p className="text-gray-700">Deep understanding of FedRAMP, FISMA, CJIS, HIPAA, FERPA, NIST, and Section 508 frameworks.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold text-onealgo-blue-950 mb-2">Mission Focus</h3>
              <p className="text-gray-700">We align technology outcomes with policy goals and citizen needs to deliver measurable impact.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold text-onealgo-blue-950 mb-2">Ethical & Transparent AI</h3>
              <p className="text-gray-700">Every solution is designed with accountability, explainability, and public trust in mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NAICS / Services Codes and Partner CTA */}
      <section className="py-12 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Partner With One Algorithm</h3>
              <p className="text-gray-700 mb-4">Whether your agency is modernizing IT infrastructure, implementing AI for public services, or scaling your technical workforce, One Algorithm brings the expertise, innovation, and reliability you can trust.</p>
              <Button asChild className="bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white w-full">
                <Link to="/contact">Get Started Today</Link>
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Company Identifiers</h3>
              <ul className="text-gray-700 space-y-2">
                <li><strong>Legal Name:</strong> One Algorithm LLC</li>
                <li><strong>UEI:</strong> W8DYK38MEKP3</li>
                <li><strong>CAGE Code:</strong> 14G18</li>
                <li><strong>D-U-N-S:</strong> 118835343</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">NAICS & Service Codes</h3>
              <ul className="text-gray-700 space-y-2">
                <li>518210 — Computing Infrastructure Providers, Data Processing, Web Hosting</li>
                <li>519210 — Libraries and Archives</li>
                <li>519290 — Web Search Portals and All Other Information Services</li>
                <li>541511 — Custom Computer Programming Services</li>
                <li>541512 — Computer Systems Design Services</li>
                <li>541519 — Other Computer Related Services / Information Technology Value Added Resellers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Benefits CTA retained */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Government Agencies Choose One Algorithm</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Compliance-driven, mission-focused, secure, and scalable solutions with ethical AI and measurable outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 border rounded-lg">
              <h4 className="font-semibold text-onealgo-blue-950 mb-2">Compliance-Driven</h4>
              <p className="text-gray-700">Deep experience with FedRAMP, FISMA, CJIS, HIPAA, FERPA, NIST, and Section 508 compliance.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <h4 className="font-semibold text-onealgo-blue-950 mb-2">Mission-Focused</h4>
              <p className="text-gray-700">We align technology outcomes with policy goals and citizen needs.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <h4 className="font-semibold text-onealgo-blue-950 mb-2">Secure & Scalable</h4>
              <p className="text-gray-700">Solutions adapt to the needs of small municipalities and large agencies alike.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
