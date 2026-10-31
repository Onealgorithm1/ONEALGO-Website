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
  Calculator,
  Compass,
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
import { ServicesIndexBody } from "../components/v2/home-ServicesIndex";
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
    title: "Websites, SEO, Google Ads & Salesforce Services | OneAlgorithm",
    description:
      "Web development, SEO, Google Ads, Salesforce, IT consulting and staff augmentation. A consultancy in Malvern, Pennsylvania.",
    canonical: getCanonicalUrl("/services"),
    keywords:
      "technology services, staff augmentation, IT consulting services, website development services, Salesforce consulting, marketing services, business technology solutions",
    ogTitle: "Websites, SEO, Google Ads & Salesforce Services | OneAlgorithm",
    ogDescription:
      "Staff augmentation, website development, IT consulting, Salesforce and marketing solutions.",
    ogUrl: getCanonicalUrl("/services"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle:
      "Technology Services - OneAlgorithm | IT Consulting, Website Development, Salesforce & More",
    twitterDescription:
      "Staff augmentation, website development, IT consulting, Salesforce and marketing solutions.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createWebPageSchema(
          "Technology Services - OneAlgorithm | IT Consulting, Website Development & More",
          "Comprehensive technology services including website development, IT consulting, Salesforce, staff augmentation, and marketing solutions.",
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
            consulting, Salesforce and enterprise systems —
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
            </Link>
            ,{" "}
            <Link
              to="/industries/ecommerce"
              className="text-oa-nightBlue underline underline-offset-4 hover:text-oa-nightInk"
            >
              e-commerce
            </Link>{" "}
            and{" "}
            {/* Added 2026-09-14: Semrush found /industries/marketing with one
                inbound link (the /industries hub) - the nav dropdowns only
                render when opened, so crawlers never see them. */}
            <Link
              to="/industries/marketing"
              className="text-oa-nightBlue underline underline-offset-4 hover:text-oa-nightInk"
            >
              marketing teams
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

      <ServicesIndexBody />
    </Layout>
  );
}
