import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import SocialShare from "../../components/SocialShare";
import {
  Briefcase,
  Users,
  Zap,
  LifeBuoy,
  CheckCircle,
  TrendingUp,
  ChevronDown,
  Award,
} from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";
import { cn } from "../../lib/utils";

export default function Salesforce() {
  useSEO({
    title: "OneAlgorithm — Salesforce Implementation & Consulting Services",
    description:
      "Full-lifecycle Salesforce implementation services including strategic consulting, CRM deployment, custom development, data migration, and ongoing support. Expert Salesforce consultants for your business transformation.",
    canonical: getCanonicalUrl("/services/salesforce"),
    keywords:
      "Salesforce implementation, Salesforce consulting, Salesforce CRM, Salesforce development, Salesforce migration, Salesforce administration, Salesforce optimization",
    ogTitle: "OneAlgorithm — Salesforce Implementation & Consulting Services",
    ogDescription:
      "Full-lifecycle Salesforce implementation services from strategy to post-go-live support. Expert Salesforce consultants dedicated to your success.",
    ogUrl: getCanonicalUrl("/services/salesforce"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
    twitterTitle: "Salesforce Implementation & Consulting - OneAlgorithm",
    twitterDescription:
      "Full-lifecycle Salesforce implementation services from strategy to post-go-live support.",
    twitterImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
  });

  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const servicePillars = [
    {
      id: "strategic",
      icon: <Briefcase className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Strategic Consulting",
      description:
        "Business requirements analysis and roadmap development to align Salesforce with corporate goals.",
      details: [
        "Current state assessment and gap analysis",
        "Salesforce edition and product roadmapping",
        "Organizational adoption and change management strategy",
        "ROI modeling and business case development",
        "Integration and data strategy planning",
      ],
    },
    {
      id: "implementation",
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Core Implementation",
      description:
        "End-to-end Salesforce deployment including Sales Cloud, Service Cloud, and custom applications.",
      details: [
        "Salesforce org setup and configuration",
        "Sales Cloud and Service Cloud deployment",
        "Custom object and field design",
        "Workflow automation and process builder setup",
        "Integration with third-party applications",
      ],
    },
    {
      id: "migration",
      icon: <Users className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Data Migration & Integration",
      description:
        "Secure data migration from legacy systems and seamless integration with your existing tech stack.",
      details: [
        "Data extraction and transformation",
        "Salesforce data loading and validation",
        "System integration using APIs and middleware",
        "Ongoing data synchronization setup",
        "Data quality assurance and reconciliation",
      ],
    },
    {
      id: "support",
      icon: <LifeBuoy className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Post-Implementation Support",
      description:
        "Managed services, optimization, and Hypercare support following go-live.",
      details: [
        "30-90 day Hypercare support with dedicated resources",
        "User training and enablement programs",
        "Performance monitoring and optimization",
        "Ongoing administration and maintenance",
        "Continuous improvement and roadmap evolution",
      ],
    },
  ];

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Implementation & Consulting Services",
          "Expert Salesforce implementation, consulting, and support services for Sales Cloud, Service Cloud, and custom applications. Full-lifecycle expertise.",
          "CRM & Salesforce Solutions",
          "https://onealgorithm.com/services/salesforce",
        )}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="text-onealgo-orange-500">Salesforce</span>
                <span className="text-white"> Implementation & Consulting</span>
              </h1>
              <p className="text-xl text-blue-200 max-w-3xl mb-8">
                End-to-end Salesforce expertise that drives adoption, delivers results, and accelerates business growth.
              </p>
              <div className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3 font-bold">✓</span>
                  Expert team of Salesforce-certified consultants and developers.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3 font-bold">✓</span>
                  Proven approach across Sales Cloud, Service Cloud, and custom applications.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3 font-bold">✓</span>
                  Post-implementation Hypercare and ongoing optimization.
                </li>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <Link to="/contact">Start Your Salesforce Journey</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-lg bg-white/5 flex items-center justify-center ring-1 ring-white/10 shadow-md">
                <Award className="w-28 h-28 text-onealgo-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Four Pillars of Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive full-lifecycle approach to Salesforce implementation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {servicePillars.map((pillar) => (
              <div key={pillar.id}>
                <Card
                  className="border-2 hover:border-onealgo-blue-950 transition-colors cursor-pointer h-full"
                  onClick={() =>
                    setExpandedPillar(
                      expandedPillar === pillar.id ? null : pillar.id
                    )
                  }
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {pillar.icon}
                        <div className="flex-1">
                          <CardTitle className="text-xl text-onealgo-blue-950">
                            {pillar.title}
                          </CardTitle>
                        </div>
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-onealgo-orange-500 flex-shrink-0 transition-transform",
                          expandedPillar === pillar.id && "rotate-180",
                        )}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{pillar.description}</p>
                  </CardContent>
                </Card>
                {expandedPillar === pillar.id && (
                  <Card className="border-2 border-onealgo-orange-500/30 bg-onealgo-light mt-4">
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {pillar.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-onealgo-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OneAlgorithm for Salesforce?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine Salesforce expertise with deep business transformation knowledge to deliver implementations that drive measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-onealgo-orange-500 mb-4" />
                <CardTitle className="text-onealgo-blue-950">
                  Proven Track Record
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Successful Salesforce implementations across industries with strong adoption and ROI metrics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <Users className="w-10 h-10 text-onealgo-orange-500 mb-4" />
                <CardTitle className="text-onealgo-blue-950">
                  Expert Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Certified Salesforce architects and developers who stay current with platform innovations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <Zap className="w-10 h-10 text-onealgo-orange-500 mb-4" />
                <CardTitle className="text-onealgo-blue-950">
                  End-to-End Partnership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  From strategy through post-implementation support, we're with you every step of the way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-16 bg-gradient-to-r from-onealgo-blue-950 to-onealgo-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform with Salesforce?
          </h3>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Let's discuss how Salesforce can drive growth and efficiency for your organization.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
          >
            <Link to="/contact">Get a Free Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Social Share */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SocialShare />
        </div>
      </section>
    </Layout>
  );
}
