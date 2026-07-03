import React from "react";
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
  Settings,
  LifeBuoy,
  Zap,
  BookOpen,
  BarChart3,
  Share2,
  Workflow,
  CheckCircle,
  Award,
} from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

const capabilities = [
  {
    icon: Settings,
    title: "Zendesk setup and configuration",
    desc: "Stand up and configure Zendesk Support, agent workspaces, groups, and business rules aligned to how your team actually works.",
  },
  {
    icon: LifeBuoy,
    title: "Support workflow design",
    desc: "Design ticket lifecycles, SLAs, triggers, and escalation paths that keep support responsive and organized.",
  },
  {
    icon: Zap,
    title: "Automation and routing",
    desc: "Automate ticket routing, macros, and business rules to reduce manual work and speed resolution.",
  },
  {
    icon: BookOpen,
    title: "Knowledge base structure",
    desc: "Structure help-center content and categories so customers can self-serve and agents resolve faster.",
  },
  {
    icon: BarChart3,
    title: "Reporting and dashboards",
    desc: "Build reports and dashboards for visibility into ticket volume, response times, and team performance.",
  },
  {
    icon: Share2,
    title: "Salesforce / CRM integration",
    desc: "Connect Zendesk with Salesforce or your CRM so support and sales share a single view of the customer.",
  },
  {
    icon: Workflow,
    title: "Microsoft 365 & operational workflow alignment",
    desc: "Align Zendesk with Microsoft 365 and your operational workflows for a connected support operation.",
  },
];

export default function Zendesk() {
  useSEO({
    title: "OneAlgorithm — Zendesk Implementation & Support",
    description:
      "Zendesk Implementation & Support from OneAlgorithm — setup, configuration, support workflow design, automation, knowledge base, reporting, and Salesforce/CRM integration. One Algorithm is a certified Zendesk partner.",
    canonical: getCanonicalUrl("/services/zendesk"),
    keywords:
      "Zendesk implementation, Zendesk support, Zendesk configuration, Zendesk automation, Zendesk Salesforce integration, customer support software, help desk setup",
    ogTitle: "OneAlgorithm — Zendesk Implementation & Support",
    ogDescription:
      "Implement, configure, integrate, and optimize Zendesk for customer support and service operations. Certified Zendesk partner.",
    ogUrl: getCanonicalUrl("/services/zendesk"),
    ogImage: "https://onealgorithm.com/og-image.png",
    twitterTitle: "Zendesk Implementation & Support — OneAlgorithm",
    twitterDescription:
      "Implement, configure, integrate, and optimize Zendesk for customer support and service operations.",
    twitterImage: "https://onealgorithm.com/og-image.png",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Zendesk Implementation & Support",
          "OneAlgorithm helps organizations implement, configure, integrate, and optimize Zendesk for customer support, service operations, workflow automation, reporting, and CRM alignment.",
          "Customer Support & Service Operations",
          "https://onealgorithm.com/services/zendesk",
        )}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-100 ring-1 ring-white/15 mb-6">
                <Award className="w-4 h-4 text-onealgo-orange-500" />
                Certified Zendesk partner
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="text-onealgo-orange-500">Zendesk</span>
                <span className="text-white"> Implementation &amp; Support</span>
              </h1>
              <p className="text-xl text-blue-200 max-w-3xl mb-8">
                One Algorithm helps organizations implement, configure,
                integrate, and optimize Zendesk for customer support, service
                operations, workflow automation, reporting, and CRM alignment.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-lg bg-white/5 flex items-center justify-center ring-1 ring-white/10 shadow-md">
                <LifeBuoy className="w-28 h-28 text-onealgo-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What we help you do with Zendesk
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From first setup to ongoing optimization — a connected, efficient
              support operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <Card
                key={cap.title}
                className="border-2 hover:border-onealgo-orange-500 transition-colors h-full"
              >
                <CardHeader>
                  <cap.icon className="w-10 h-10 text-onealgo-orange-500 mb-4" />
                  <CardTitle className="text-onealgo-blue-950 text-lg">
                    {cap.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{cap.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A certified Zendesk partner that connects your systems
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              One Algorithm is a certified Zendesk partner. We pair Zendesk
              expertise with deep integration experience across Salesforce, CRM,
              and Microsoft 365 — so your support platform fits into the rest of
              your operation instead of standing alone.
            </p>
            <ul className="text-left inline-block space-y-3">
              {[
                "Configuration aligned to your real support workflows",
                "Automation that reduces manual, repetitive work",
                "Integration with Salesforce / CRM and Microsoft 365",
                "Reporting that gives leadership real visibility",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-onealgo-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-onealgo-blue-950 to-onealgo-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get more out of Zendesk?
          </h3>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Let's talk about implementing, integrating, or optimizing Zendesk for
            your team.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
          >
            <Link to="/contact">Talk to an Expert</Link>
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
