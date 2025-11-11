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
import { Globe, Users, Shield, Zap, Clock } from "lucide-react";

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
      icon: <Globe className="w-8 h-8 text-onealgo-orange-500" />,
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
            <Globe className="w-24 h-24 text-onealgo-orange-500 mx-auto mb-6 animate-bounce-slow" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Government <span className="text-onealgo-orange-500">Solutions</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Secure, citizen-first technology solutions that modernize services,
              improve transparency, and accelerate digital delivery.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Government Technology Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solutions tailored for public sector needs: security, compliance,
              accessibility, and reliable citizen services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-onealgo-orange-500 transition-colors"
              >
                <CardHeader>
                  {feature.icon}
                  <CardTitle className="text-onealgo-blue-950">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose OneAlgorithm for Government?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Compliance-first design:</strong> We embed security
                    and auditability in every project phase.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Citizen-centric services:</strong> We focus on fast,
                    accessible, and user-friendly experiences for all users.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Risk-managed modernization:</strong> Phased
                    migrations reduce disruption to critical services.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Modernize Public Services?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact our public sector team to discuss secure, compliant
                modernization strategies and pilot programs.
              </p>
              <Button
                asChild
                className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white"
              >
                <Link to="/contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
