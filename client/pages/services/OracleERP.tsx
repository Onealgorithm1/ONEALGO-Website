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
  Database,
  Zap,
  LifeBuoy,
  CheckCircle,
  TrendingUp,
  Shield,
  Users,
  ChevronDown,
  Target,
  Lightbulb,
  Award,
} from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";
import { cn } from "../../lib/utils";

export default function OracleERP() {
  useSEO({
    title: "OneAlgorithm — Oracle ERP Implementation Services",
    description:
      "Full-lifecycle Oracle Cloud ERP implementation services including strategic consulting, end-to-end deployment, data migration, and post-implementation support. Position your enterprise for success with OneAlgorithm.",
    canonical: getCanonicalUrl("/services/oracle-erp"),
    keywords:
      "Oracle ERP implementation, Oracle Cloud ERP, Oracle Financials, Oracle SCM, Oracle HCM, ERP data migration, Oracle integration, enterprise resource planning",
    ogTitle: "OneAlgorithm — Oracle ERP Implementation Services",
    ogDescription:
      "Full-lifecycle Oracle Cloud ERP implementation services including strategic consulting, end-to-end deployment, data migration, and post-implementation support.",
    ogUrl: getCanonicalUrl("/services/oracle-erp"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
    twitterTitle: "Oracle ERP Implementation Services - OneAlgorithm",
    twitterDescription:
      "Full-lifecycle Oracle Cloud ERP implementation services from strategy to post-implementation support.",
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
        "Business process re-engineering and roadmap development to align Oracle Cloud ERP with corporate goals.",
      details: [
        "Assessment of current systems and processes",
        "Alignment with corporate strategic goals",
        "Detailed roadmap and timeline development",
        "Risk mitigation planning",
        "ROI projections and business case development",
      ],
    },
    {
      id: "implementation",
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "End-to-End Implementation",
      description:
        "Full-scale deployment including Financials, Supply Chain Management (SCM), and Human Capital Management (HCM).",
      details: [
        "Oracle Financials module implementation",
        "Supply Chain Management (SCM) setup and configuration",
        "Human Capital Management (HCM) deployment",
        "Change management and training programs",
        "Go-live coordination and cutover planning",
      ],
    },
    {
      id: "migration",
      icon: <Database className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Data Migration & Integration",
      description:
        "Securely moving legacy data and connecting Oracle with existing third-party applications using OIC (Oracle Integration Cloud).",
      details: [
        "Legacy system data extraction and validation",
        "Data transformation and cleansing",
        "Oracle Integration Cloud (OIC) setup and configuration",
        "Third-party application connectors and integrations",
        "Data integrity verification and reconciliation",
      ],
    },
    {
      id: "support",
      icon: <LifeBuoy className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Post-Implementation Support",
      description:
        "Managed services, performance tuning, and 'Hypercare' support following go-live.",
      details: [
        '"Hypercare" support following go-live (typically 30-90 days)',
        "Performance tuning and system optimization",
        "User support and ticket resolution",
        "Ongoing training and documentation",
        "System monitoring and preventive maintenance",
      ],
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Strategic Alignment",
      description:
        "Align your Oracle ERP investment with business objectives for maximum value and ROI.",
    },
    {
      icon: TrendingUp,
      title: "Business Transformation",
      description:
        "Optimize processes and unlock new capabilities to drive competitive advantage.",
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description:
        "Proven methodologies minimize implementation risks and ensure smooth go-live.",
    },
    {
      icon: Users,
      title: "Expert Partnership",
      description:
        "Work with Oracle-certified experts who understand your industry and challenges.",
    },
  ];

  const process = [
    {
      step: "1",
      title: "Discovery & Assessment",
      description:
        "Comprehensive evaluation of current systems, processes, and business requirements.",
    },
    {
      step: "2",
      title: "Strategy & Planning",
      description:
        "Development of detailed implementation roadmap with clear milestones and deliverables.",
    },
    {
      step: "3",
      title: "Implementation & Deployment",
      description:
        "Execute configuration, customization, data migration, and user training.",
    },
    {
      step: "4",
      title: "Support & Optimization",
      description:
        "Post-go-live support, optimization, and continuous improvement for sustained success.",
    },
  ];

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Oracle ERP Implementation Services",
          "Full-lifecycle Oracle Cloud ERP implementation including strategic consulting, end-to-end deployment, data migration, and post-implementation support.",
          "Oracle ERP Implementation",
          "https://onealgorithm.com/services/oracle-erp",
        )}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Oracle ERP <span className="text-onealgo-orange-500">Implementation</span> &
                Transformation
              </h1>
              <ul className="text-xl text-blue-200 mb-8 space-y-3">
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Strategic consulting aligned with corporate goals.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Full-scale deployment across Financials, SCM, and HCM.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Secure data migration with OIC integration.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Post-implementation Hypercare and ongoing optimization.
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <Link to="/contact">Start Your ERP Journey</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <Award className="w-24 h-24 text-onealgo-orange-500 mx-auto mb-4" />
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Enterprise-Grade Expertise
                  </h3>
                  <p className="text-blue-200">
                    Full-lifecycle Oracle Cloud ERP leadership
                  </p>
                </div>
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
              A comprehensive full-lifecycle approach to Oracle ERP implementation
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

      {/* Benefits Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OneAlgorithm for Oracle ERP?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partner with Oracle implementation experts to maximize your ERP investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-2 hover:border-onealgo-blue-950 transition-colors h-full"
              >
                <CardHeader className="text-center">
                  <benefit.icon className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4" />
                  <CardTitle className="text-xl text-onealgo-blue-950">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Section */}
      <section className="py-16 bg-blue-50 border-y border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-onealgo-orange-500">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your ERP Transformation?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get expert guidance on your specific situation. Our consultants will assess your current systems and develop a personalized roadmap for Oracle ERP success.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4 text-lg"
            >
              <Link to="/contact">Request Your Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Proven Implementation Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured methodology that ensures successful Oracle ERP deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-onealgo-blue-950 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-onealgo-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Partner with OneAlgorithm to implement Oracle ERP and position your
            organization for digital transformation and sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
            >
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-onealgo-blue-950 px-8 py-4"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Sharing */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialShare
            title="Oracle ERP Implementation Services - OneAlgorithm"
            className="justify-center"
          />
        </div>
      </section>
    </Layout>
  );
}
