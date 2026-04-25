import React from "react";
import Layout from "../components/Layout";
import { FileText, Shield } from "lucide-react";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createOrganizationSchema,
} from "../components/StructuredData";
import { siteConfig } from "../lib/siteConfig";
import CapabilitiesSidebar from "../components/CapabilitiesSidebar";
import CapabilitiesMainContent from "../components/CapabilitiesMainContent";

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
                Economically Disadvantaged Women-Owned Small Business (EDWOSB) and Minority Business Enterprise (MBE) certified
                delivering secure, standards-aligned technology and compliance
                solutions to federal and commercial clients nationwide.
              </p>
              <p>
                Mission: enable government and enterprise customers to modernize
                securely, efficiently, and accessibly—meeting all compliance and
                mission objectives.
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
          </div>
        </div>
      </section>

      {/* Main Content Section with Two-Column Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar - Left Column */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <CapabilitiesSidebar />
              </div>
            </div>

            {/* Main Content - Right Column */}
            <div className="md:col-span-3">
              <CapabilitiesMainContent />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
