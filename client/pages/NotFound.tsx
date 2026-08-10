import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { PageHero, Section, SectionHeading, Card, CardGrid } from "../components/site";
import { useSEO } from "../hooks/use-seo";

/* 404 - 2026 refresh.
 *
 * The real fix here is not the styling. This page did not render inside
 * <Layout>, so a visitor who mistyped a URL got no nav, no footer and exactly
 * one text link out - on the page where a person is by definition already lost.
 * It is now wrapped like every other page, and carries a short set of routes
 * back into the site so it works as a recovery page rather than a dead end.
 */

const RECOVERY_LINKS = [
  { title: "Services", to: "/services" },
  { title: "Industries We Serve", to: "/industries" },
  { title: "Contact", to: "/contact" },
];

const NotFound = () => {
  // noindex, and an explicit description. Setting only a title left the previous
  // page's description, canonical and social tags in place, so a mistyped URL
  // could be indexed wearing the homepage's metadata.
  useSEO({
    title: "404 — Page Not Found | OneAlgorithm",
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
        eyebrow="404"
        title="404 — Page Not Found at OneAlgorithm"
        lede="Oops! Page not found"
        primary={{ label: "Return to Home", to: "/" }}
      />

      <Section tone="paper">
        <SectionHeading title="Where to go next" />
        <CardGrid columns={3} className="mt-10">
          {RECOVERY_LINKS.map((link) => (
            <Card key={link.to} title={link.title} to={link.to} />
          ))}
        </CardGrid>
      </Section>
    </Layout>
  );
};

export default NotFound;
