import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Zap, Database, User2, Megaphone, Target, Plug } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Split,
  PrimaryCTA,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* MarTech services - 2026 refresh.
 *
 * Converted onto the shared primitives in components/site.tsx.
 *
 *  1. The closing "MarTech Success Stories" section is DELETED. A heading that
 *     announces its own absent content ("available on request") reads as "we
 *     have none", and it sat exactly where a buyer looks for evidence. Nothing
 *     was invented in its place. See REDESIGN-NOTES.md.
 *  2. The bouncing alert glyph above the H1 is gone, along with the orange
 *     card borders and drop shadows.
 *  3. This page argues first and lists second - the case for us opens, the
 *     stack capabilities follow on the dark ground, and the audit offer is its
 *     own band. That is deliberately not the order used on /services/seo or
 *     /services/google-ads, which were clones of this same template.
 *
 * COPY REWRITE 2026-08-12. The body copy was NOT carried over unchanged this
 * time. "End-to-end MarTech solutions - automation, customer data,
 * personalization, paid media, and integrations that deliver measurable ROI"
 * was the section lede, and it describes every agency on earth.
 *
 * The replacement names the tools (HubSpot, Salesforce, Google, Meta,
 * LinkedIn), the actual tasks (UTM discipline, list hygiene, suppression rules,
 * deduplication) and the failure it prevents (the same person existing three
 * times in three systems). No client, number or outcome was added - none exists
 * in this repository to add.
 */

const CAPABILITIES = [
  {
    icon: Zap,
    title: "Marketing Automation",
    body: "Journeys and lead nurture built inside the tool you already pay for — HubSpot, Salesforce, or whatever came with the CRM — triggered by what someone did rather than by a send date.",
  },
  {
    icon: Database,
    title: "Customer Data & Insights",
    body: "One customer record assembled from the CRM, the website, the email tool and the ad platforms, with duplicates resolved rather than counted three times.",
  },
  {
    icon: User2,
    title: "Personalization & CX",
    body: "Content and offers that change based on what someone has already done. We start with the two or three rules that matter, not a matrix nobody will maintain.",
  },
  {
    icon: Megaphone,
    title: "Digital Advertising & Media",
    body: "Campaign setup and optimization on Google, Meta and LinkedIn, wired to conversion tracking that reports the same numbers your CRM does.",
  },
  {
    icon: Target,
    title: "Campaign Management",
    body: "Planning, building and running multi-channel campaigns — including the unglamorous parts: UTM discipline, list hygiene, suppression rules.",
  },
  {
    icon: Plug,
    title: "Integration & Enablement",
    body: "APIs and middleware between marketing, CRM, e-commerce and support systems, plus written documentation so your team can run it after we go.",
  },
];

const WHY_US = [
  "We do the engineering as well as the strategy, so an integration doesn't become somebody else's ticket.",
  "One customer record, so the same person isn't three contacts in three tools.",
  "Automation for the manual steps — list uploads, lead assignment, the Monday report.",
  "Reporting that reconciles with the CRM, including the months when the CRM number is the worse one.",
];

export default function Martech() {
  useSEO({
    title: "MarTech Consulting & Stack Integration | OneAlgorithm",
    description:
      "MarTech: connecting your CRM, email, ad platforms, analytics and website so customer data is in one place and the reporting actually reconciles.",
    canonical: getCanonicalUrl("/services/martech"),
    keywords:
      "MarTech, marketing technology, marketing automation, customer data platform, personalization, digital advertising, campaign management, marketing integration",
    ogTitle: "MarTech Consulting & Stack Integration | OneAlgorithm",
    ogDescription:
      "Connect your CRM, email, ad platforms and analytics so customer data lives in one place, follow-up is automated, and the reporting reconciles with the CRM.",
    ogUrl: getCanonicalUrl("/services/martech"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — MarTech Services",
    twitterDescription:
      "Connecting the CRM, email, ad platforms and analytics you already own, so the customer data is in one place and the reporting adds up.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "MarTech Services",
          "Marketing technology services: integrating CRM, email, advertising, analytics and e-commerce systems, unifying customer records, automating campaigns and lead nurture, and reporting that reconciles with the CRM.",
          "Marketing",
          "https://onealgorithm.com/services/martech",
        )}
      />

      <PageHero
        eyebrow="MarTech"
        title={
          <>
            MarTech services —{" "}
            <span className="text-oa-orange">
              the wiring between your marketing tools
            </span>
          </>
        }
        lede="Most marketing stacks are five tools that don't talk to each other and one person exporting spreadsheets between them. We connect them — CRM, email, ads, analytics, the website — so a lead's history follows it and the reporting adds up."
        // Panel items are the CAPABILITIES card titles from further down this
        // page, verbatim. No hero bullets existed here and nothing new was
        // written. No platform credential exists for MarTech, so the footer
        // carries only the company-wide SBA line.
        panel={{
          title: "What we deliver",
          items: [
            "Marketing Automation",
            "Customer Data & Insights",
            "Personalization & CX",
            "Digital Advertising & Media",
            "Integration & Enablement",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Request a MarTech Consultation", to: "/contact" }}
        secondary={{ label: "View Services", to: "/services" }}
      />

      {/* Argument first: heading on the left, the claims on the right, so the
          page opens with a position rather than another icon grid. */}
      <Section tone="paper">
        <Split
          left={
            <SectionHeading
              eyebrow="Why OneAlgorithm"
              title="Why OneAlgorithm for MarTech?"
            />
          }
          right={<CheckList items={WHY_US} />}
        />
      </Section>

      <Section tone="night" grid>
        <SectionHeading
          tone="dark"
          eyebrow="What we do"
          title="What we build, and what we connect it to"
          lede="Six things. Every one of them happens inside a platform you already license, because a stack with a seventh tool in it is rarely the answer."
        />
        <CardGrid columns={3} className="mt-12">
          {CAPABILITIES.map((c) => (
            <Card
              key={c.title}
              tone="dark"
              icon={c.icon}
              title={c.title}
              body={c.body}
            />
          ))}
        </CardGrid>
      </Section>

      {/* Low-commitment second CTA, given its own band rather than a boxed
          card, so it does not read as a third capability. */}
      <Section tone="surface" bordered>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <h2 className="text-h3 font-semibold text-oa-ink">
              Get a MarTech Audit
            </h2>
            <p className="mt-4 leading-relaxed text-oa-ink2">
              We map what you own, what it costs, what is actually connected and
              what is duplicated. You get a prioritized list — usually including
              a tool or two you can cancel.
            </p>
          </div>
          <PrimaryCTA to="/contact">Request Audit</PrimaryCTA>
        </div>
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand
        secondary={{ label: "Explore marketing", to: "/services/marketing" }}
      />
    </Layout>
  );
}
