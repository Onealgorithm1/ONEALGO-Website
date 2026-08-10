import React from "react";
import Layout from "../components/Layout";
import { siteConfig } from "../../shared/companyProfile";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createOrganizationSchema,
  createWebPageSchema,
} from "../components/StructuredData";
import TeamSection from "../components/TeamSection";
import {
  PageHero,
  Section,
  SectionHeading,
  Split,
  Prose,
  CTABand,
} from "../components/site";

/* About - 2026 refresh.
 *
 * The page was a gradient hero, one mission paragraph, the team grid and a CTA
 * band - thin for the page a buyer opens to decide whether the firm is real.
 * The restructure adds no claims. The facts panel is read straight from
 * shared/companyProfile.ts (founding date, headquarters, area served), so the
 * page and the Organization schema can never drift apart, and the ownership
 * line is the same one already carried in that file's description.
 *
 * Removed: two inline `style={{ fontSize }}` overrides that sat on top of the
 * responsive classes and locked the heading and lede at desktop size on a
 * phone. Headings now use the fluid text-h2 scale like every other page.
 */

const { address, areaServed, foundingDate } = siteConfig;

const OWNERSHIP = "Woman- and minority-owned small business";

const FACTS: [string, string][] = [
  ["Founded", foundingDate],
  [
    "Headquarters",
    `${address.street}, ${address.streetUnit}, ${address.city}, ${address.region} ${address.postalCode}`,
  ],
  ["Ownership", OWNERSHIP],
  ["Areas served", areaServed.join(" · ")],
];

/* Hero panel: the same registry facts as FACTS, one line each. Same single
   source (shared/companyProfile.ts) - no new claims. */
const HERO_FACTS = [
  `Founded ${foundingDate}`,
  `Headquartered in ${address.city}, ${address.region}`,
  OWNERSHIP,
  `Serving ${areaServed.join(", ")}`,
];

export default function About() {
  useSEO({
    title: "OneAlgorithm — About Us",
    description:
      "Learn how OneAlgorithm transforms struggling businesses into thriving enterprises through intelligent technology solutions and expert consulting.",
    canonical: getCanonicalUrl("/about"),
    keywords:
      "about OneAlgorithm, business technology experts, automation specialists, IT consulting company, digital transformation, business process improvement",
    ogTitle: "OneAlgorithm — About Us",
    ogDescription:
      "Learn about OneAlgorithm's mission to transform struggling businesses into thriving enterprises through intelligent technology solutions, business automation, and expert consulting services.",
    ogUrl: getCanonicalUrl("/about"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — About Us",
    twitterDescription:
      "Learn about OneAlgorithm's mission to transform struggling businesses into thriving enterprises through intelligent technology solutions, business automation, and expert consulting services.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });
  return (
    <Layout>
      <StructuredData data={createOrganizationSchema()} />
      <StructuredData
        data={createWebPageSchema(
          "About OneAlgorithm - Business Technology & Automation Experts",
          "Learn about OneAlgorithm's mission to transform struggling businesses into thriving enterprises through intelligent technology solutions, business automation, and expert consulting services.",
          "https://onealgorithm.com/about",
        )}
      />

      <PageHero
        eyebrow="About us"
        title={
          <>
            About <span className="text-oa-orange">One Algorithm</span>
          </>
        }
        lede="We transform struggling businesses into thriving enterprises. With deep expertise across multiple industries, we design and execute technology solutions that simplify operations, reduce costs, and accelerate growth."
        panel={{
          title: "The firm, in short",
          items: HERO_FACTS,
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Explore services", to: "/services" }}
      />

      {/* ================= MISSION + FACTS =================
          The mission paragraph is unchanged. What is new beside it is the
          firm's own registry detail, which previously appeared only in the
          footer and inside JSON-LD - where no human reads it. */}
      <Section tone="paper">
        <Split
          left={
            <>
              <SectionHeading
                eyebrow="Why we exist"
                title="Our Mission"
              />
              <Prose className="mt-6">
                <p>
                  Our mission is to help organizations modernize, automate, and
                  grow. We deliver practical technology solutions that simplify
                  operations, improve efficiency, and create lasting business
                  value.
                </p>
              </Prose>
            </>
          }
          right={
            <dl className="grid gap-px overflow-hidden rounded-xl border border-oa-hairline bg-oa-hairline">
              {FACTS.map(([label, value]) => (
                <div key={label} className="bg-oa-surface p-6">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-oa-ink3">
                    {label}
                  </dt>
                  <dd className="mt-1.5 leading-snug text-oa-ink">{value}</dd>
                </div>
              ))}
            </dl>
          }
        />
      </Section>

      <TeamSection />

      <CTABand
        title="Think Bigger. Build Smarter. Move Faster."
        body="Partner with One Algorithm to modernize operations, automate processes, and accelerate growth."
        primary={{ label: "Start Your Transformation", to: "/contact" }}
        secondary={{ label: "View capabilities", to: "/capabilities" }}
      />
    </Layout>
  );
}
