import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import {
  Boxes,
  Code,
  Users,
  Megaphone,
  Brain,
  Cpu,
  Database,
  Cloud,
  LifeBuoy,
  Search,
  BarChart3,
  Layers,
  MapPin,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  ProcessSteps,
  CTABand,
} from "../components/site";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createWebPageSchema,
} from "../components/StructuredData";

/* Services hub - 2026 refresh.
 *
 * Two substantive changes beyond the visual system:
 *
 *  1. All ELEVEN services are listed. The hub previously showed six while the
 *     nav and footer linked eleven, so MarTech, Google Ads, SEO, Salesforce and
 *     Zendesk had no route in from the hub a visitor actually browses.
 *  2. Staff augmentation and website development lead, because that is where
 *     revenue comes from today.
 *
 * Copy is carried over from the previous version. The one claim dropped is the
 * "Proven implementations | Strong track record of client satisfaction" pill -
 * it was a proof-shaped box containing no proof, and it sat where a buyer looks
 * for evidence. See REDESIGN-NOTES.md.
 */

const SERVICES = [
  // The three local pages lead the grid deliberately: they are the pages this
  // site most needs Google to find, and until 2026-08-31 they had exactly one
  // internal link each, sitewide.
  {
    icon: MapPin,
    title: "Web Design — Philadelphia",
    body: "Website design and development for Philadelphia businesses, from the team in Malvern — sites built to be found and to bring in work.",
    to: "/services/web-design-philadelphia",
  },
  {
    icon: MapPin,
    title: "Web Design — Chester County",
    body: "Local web design for Chester County businesses: Malvern, West Chester, Exton and the towns between. We are based here.",
    to: "/services/web-design-chester-county",
  },
  {
    icon: MapPin,
    title: "Google Ads — Philadelphia",
    body: "Google Ads management for Philadelphia-area businesses — campaigns run by the same team that builds the landing pages.",
    to: "/services/google-ads-philadelphia",
  },
  {
    icon: Users,
    title: "Staff Augmentation",
    body: "Scale your team with expert developers and technical professionals. Flexible engagement models to meet your project needs.",
    to: "/services/staff-augmentation",
  },
  {
    icon: Code,
    title: "Website Development",
    body: "Modern, responsive websites built for performance and user experience. From corporate sites to complex web applications.",
    to: "/services/website-development",
  },
  {
    icon: Boxes,
    title: "Application Development",
    body: "Internal control panels, iOS and Android apps, customer portals and Salesforce applications — built so your company owns the code, the cloud accounts and the signing keys.",
    to: "/services/application-development",
  },
  {
    icon: Database,
    title: "Oracle ERP Implementation",
    body: "Full-lifecycle Oracle Cloud ERP implementation services from strategic consulting through post-implementation support.",
    to: "/services/oracle-erp",
  },
  {
    icon: Cloud,
    title: "Salesforce",
    body: "Sales, Service and Marketing Cloud implementation and consulting, delivered by a listed Salesforce Consulting Partner.",
    to: "/services/salesforce",
  },
  {
    icon: Brain,
    title: "IT Consulting",
    body: "Strategic technology planning and expert guidance for digital transformation. Optimize your IT infrastructure and processes.",
    to: "/services/it-consulting",
  },
  {
    icon: Cpu,
    title: "Operations Technology",
    body: "Industrial automation, SCADA systems, and IoT integration. Optimize operations with smart technology solutions.",
    to: "/services/operations-technology",
  },
  {
    icon: Megaphone,
    title: "Marketing & Social Media",
    body: "Social media management for the Facebook Pages and Instagram business accounts our clients own, plus campaigns that adapt to customer behavior.",
    to: "/services/marketing",
  },
  {
    icon: Layers,
    title: "MarTech",
    body: "Marketing platforms selected, connected and configured so campaign data lands where your team can act on it.",
    to: "/services/martech",
  },
  {
    icon: Search,
    title: "SEO Services",
    body: "Technical SEO, content structure and search visibility work aimed at sustainable organic growth.",
    to: "/services/seo",
  },
  {
    icon: BarChart3,
    title: "Google Ads",
    body: "Paid search management focused on qualified traffic and measurable cost per acquisition.",
    to: "/services/google-ads",
  },
  {
    icon: LifeBuoy,
    title: "Zendesk",
    body: "Support-desk implementation, migration and ongoing optimization for teams that live in their ticket queue.",
    to: "/services/zendesk",
  },
];

const APPROACH = [
  {
    title: "Expert Team",
    body: "Our team consists of seasoned professionals with deep expertise in modern technologies and methodologies.",
  },
  {
    title: "Agile Approach",
    body: "We use agile methodologies to ensure rapid delivery, continuous improvement, and adaptability to changing requirements.",
  },
  {
    title: "Long-term Partnership",
    body: "We're not just service providers — we're your technology partners, committed to your long-term success.",
  },
  {
    title: "Support That Stays",
    body: "Hypercare immediately after go-live, then ongoing technical support and maintenance around the clock.",
  },
];

export default function Services() {
  useSEO({
    title: "Websites, SEO, Salesforce & Oracle ERP Services | OneAlgorithm",
    description:
      "Web development, SEO, Google Ads, Salesforce, Oracle ERP, IT consulting and staff augmentation. A consultancy in Malvern, Pennsylvania.",
    canonical: getCanonicalUrl("/services"),
    keywords:
      "technology services, staff augmentation, IT consulting services, website development services, operations technology, Oracle ERP implementation, Salesforce consulting, marketing services, business technology solutions",
    ogTitle: "Websites, SEO, Salesforce & Oracle ERP Services | OneAlgorithm",
    ogDescription:
      "Staff augmentation, website development, IT consulting, Oracle ERP, Salesforce, operations technology and marketing solutions.",
    ogUrl: getCanonicalUrl("/services"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle:
      "Technology Services - OneAlgorithm | IT Consulting, Website Development, Oracle ERP & More",
    twitterDescription:
      "Staff augmentation, website development, IT consulting, Oracle ERP, Salesforce, operations technology and marketing solutions.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createWebPageSchema(
          "Technology Services - OneAlgorithm | IT Consulting, Website Development & More",
          "Comprehensive technology services including website development, IT consulting, operations technology, staff augmentation, and marketing solutions.",
          "https://onealgorithm.com/services",
        )}
      />

      <PageHero
        eyebrow="Services"
        title={
          <>
            Expert technology services —{" "}
            <span className="text-oa-orange">consulting, implementation</span>{" "}
            and support
          </>
        }
        lede={
          <>
            From strategy through execution and beyond. We deliver expert
            consulting and implementation across website development, IT
            consulting, operations technology and enterprise systems —
            specialized for{" "}
            <Link
              to="/industries/construction"
              className="text-oa-nightBlue underline underline-offset-4 hover:text-oa-nightInk"
            >
              construction
            </Link>
            ,{" "}
            <Link
              to="/industries/manufacturing"
              className="text-oa-nightBlue underline underline-offset-4 hover:text-oa-nightInk"
            >
              manufacturing
            </Link>{" "}
            and{" "}
            <Link
              to="/industries/ecommerce"
              className="text-oa-nightBlue underline underline-offset-4 hover:text-oa-nightInk"
            >
              e-commerce
            </Link>
            .
          </>
        }
        // The panel is the "Why OneAlgorithm" list further down the page, by
        // title, read straight off APPROACH so the two can never drift.
        panel={{
          title: "Why OneAlgorithm",
          items: APPROACH.map((a) => a.title),
          /* ⛔ "SBA Certified WOSB / EDWOSB" removed 2026-09-01. Louis:
             "on all our commercial pages, we don't need to state woman owned.
             It's not a selling point." It sat in this panel on 19 commercial
             pages at once. It stays on /capabilities and
             /industries/government, where a buyer is actively looking for it. */
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Learn about our approach", to: "/about" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="Our core services"
          lede="Full-stack technology delivery across eleven service areas. Whether you need to modernize operations, implement enterprise systems, or add senior people to your team — not sure which you need? Talk to us and we will tell you."
        />

        <CardGrid columns={3} className="mt-12">
          {SERVICES.map((s) => (
            <Card
              key={s.title}
              icon={s.icon}
              title={s.title}
              body={s.body}
              to={s.to}
            />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Technical depth, and people who stay"
          lede="We combine technical expertise with business acumen to deliver solutions that drive real results."
        />
        <div className="mt-12">
          <ProcessSteps steps={APPROACH} />
        </div>
      </Section>

      <CTABand
        title="Ready to get started?"
        body="Let's discuss how our services can help accelerate your business goals and digital transformation."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View capabilities", to: "/capabilities" }}
      />
    </Layout>
  );
}
