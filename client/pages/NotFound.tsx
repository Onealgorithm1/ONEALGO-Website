import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CTABand,
} from "../components/site";
import { useSEO } from "../hooks/use-seo";

/* 404 - 2026 refresh.
 *
 * The first fix here was structural: this page did not render inside <Layout>,
 * so a visitor who mistyped a URL got no nav, no footer and exactly one text
 * link out - on the page where a person is by definition already lost.
 *
 * The second was the copy. Driven in a browser at 390x844 it read:
 * "404 - Page Not Found at OneAlgorithm" as the h1, "Oops! Page not found" as
 * the lede, then three cards - Services, Industries We Serve, Contact - each
 * carrying a title and nothing else. That is the page title said three times
 * and then a menu, which is what the header already is. Someone arriving here
 * followed a link that used to work; they have a specific thing in mind.
 *
 * So: say what happened in a sentence, then offer the four service areas that
 * lead the services hub with the same one-line descriptions they carry there,
 * one line out to the full list, and the standard contact band. Every
 * description below is copied verbatim from client/pages/Services.tsx - a 404
 * is not the place to write new claims about what the company does.
 */

const LIKELY_DESTINATIONS = [
  {
    title: "Staff Augmentation",
    body: "Scale your team with expert developers and technical professionals. Flexible engagement models to meet your project needs.",
    to: "/services/staff-augmentation",
  },
  {
    title: "Website Development",
    body: "Modern, responsive websites built for performance and user experience. From corporate sites to complex web applications.",
    to: "/services/website-development",
  },
  {
    title: "Oracle ERP Implementation",
    body: "Full-lifecycle Oracle Cloud ERP implementation services from strategic consulting through post-implementation support.",
    to: "/services/oracle-erp",
  },
  {
    title: "Salesforce",
    body: "Sales, Service and Marketing Cloud implementation and consulting, delivered by a listed Salesforce Consulting Partner.",
    to: "/services/salesforce",
  },
];

const NotFound = () => {
  // noindex, and an explicit description. Setting only a title left the previous
  // page's description, canonical and social tags in place, so a mistyped URL
  // could be indexed wearing the homepage's metadata.
  useSEO({
    title: "Page not found | OneAlgorithm",
    description: "This page could not be found.",
    noindex: true,
  });
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <PageHero
        title="That page is not here"
        lede="The link you followed is out of date, or the address has a typo in it. Nothing is broken on your end - here is the way back in."
        primary={{ label: "Go to the homepage", to: "/" }}
        secondary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          title="What you were probably looking for"
          lede="The four service areas people arrive here from most directly."
        />
        <CardGrid columns={4} className="mt-10">
          {LIKELY_DESTINATIONS.map((item) => (
            <Card
              key={item.to}
              title={item.title}
              body={item.body}
              to={item.to}
            />
          ))}
        </CardGrid>

        {/* One line rather than a second grid. The full list is eleven services
            and four industries; reprinting all fifteen here would rebuild the
            nav menu underneath the nav menu. */}
        <p className="mt-8 text-base text-oa-ink2">
          Something else?{" "}
          <Link
            to="/services"
            className="font-medium text-oa-blue underline underline-offset-4 hover:text-onealgo-blue-950"
          >
            See all services
          </Link>{" "}
          or{" "}
          <Link
            to="/industries"
            className="font-medium text-oa-blue underline underline-offset-4 hover:text-onealgo-blue-950"
          >
            browse by industry
          </Link>
          .
        </p>
      </Section>

      <CTABand
        title="Tell us what you were trying to find"
        body="If you followed a link from an email, a proposal or a search result and it landed here, send it over - we will point you at the right page, or answer the question directly."
      />
    </Layout>
  );
};

export default NotFound;
