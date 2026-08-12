import React from "react";
import Layout from "../components/Layout";
import { PageHero, Section, Prose, Card } from "../components/site";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";

/* Privacy Policy - 2026 refresh.
 *
 * Presentational only. Not one word of the policy has been changed: this is a
 * legal document, and rewriting it is not a design decision. What changed:
 *
 *  1. The body now sits in <Prose>, which caps the measure at 68 characters.
 *     Full-width legal text across a 1200px container is the hardest thing on
 *     the site to actually read, and this is the page where people give up.
 *  2. The hard-coded "© 2025" is now the current year, matching the footer.
 *     It was a bug, not copy.
 *
 * The "Last updated" date is left exactly as it was found. It is stale, but
 * changing it is a legal statement, not a restyle - flag it, do not touch it.
 */

/* One legal document, eight section headings. The page h1 lives in the hero,
 * so these are h2 at the h3 size - a document outline, not eight page titles. */
const HEADING = "text-h3 font-semibold text-oa-ink";
const SUBHEADING = "text-lg font-semibold text-oa-ink";
const LIST = "list-disc space-y-2 pl-5 marker:text-oa-ink3";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy — OneAlgorithm",
    description:
      "Read OneAlgorithm's Privacy Policy detailing how we collect, use, and protect your information.",
    canonical: getCanonicalUrl("/privacy"),
    ogTitle: "Privacy Policy — OneAlgorithm",
    ogDescription: "Learn about our data practices and your privacy rights.",
    ogUrl: getCanonicalUrl("/privacy"),
    twitterTitle: "Privacy Policy — OneAlgorithm",
    twitterDescription:
      "Learn about our data practices and your privacy rights.",
  });

  return (
    <Layout>
      {/* The date moved from the first line of the body into the hero's meta
          record. It is the single most useful fact about a legal document and
          it was the fifth thing on the page. The date itself is untouched -
          still stale, still not ours to change. */}
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy — How We Protect Your Data"
        meta={[
          { label: "Document", value: "OneAlgorithm Privacy Policy" },
          { label: "Last updated", value: "8/27/2025" },
        ]}
      />

      <Section tone="paper">
        <Prose>
          <h2 className={HEADING}>Introduction</h2>
          <p>
            At OneAlgorithm, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <h2 className={`${HEADING} pt-6`}>Information We Collect</h2>

          <h3 className={SUBHEADING}>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to
            us when you:
          </p>
          <ul className={LIST}>
            <li>Contact us through our website or email</li>
            <li>Request information about our services</li>
            <li>Subscribe to our newsletter</li>
            <li>Participate in surveys or feedback forms</li>
          </ul>

          <h3 className={`${SUBHEADING} pt-2`}>Technical Information</h3>
          <p>
            We automatically collect certain technical information when you
            visit our website, including:
          </p>
          <ul className={LIST}>
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Website usage patterns and preferences</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h3 className={`${SUBHEADING} pt-2`}>Analytics</h3>
          <p>
            We use Google Analytics to understand how visitors use our website
            and blog. Google Analytics sets cookies that collect information
            such as the pages you view, how long you spend on them, and the
            approximate geographic region you are visiting from. This
            information is aggregated and is not used to identify you
            personally. You can opt out of Google Analytics at any time by
            installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-oa-blue underline underline-offset-4 hover:text-oa-blue700"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
          <p>
            We also use Cloudflare Web Analytics, which does not use cookies and
            does not track visitors across websites.
          </p>

          <h2 className={`${HEADING} pt-6`}>How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className={LIST}>
            <li>Provide and improve our Salesforce consulting services</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you relevant information about our services</li>
            <li>Analyze website usage to enhance user experience</li>
            <li>Comply with legal obligations and protect our rights</li>
          </ul>

          <h2 className={`${HEADING} pt-6`}>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except in the
            following circumstances:
          </p>
          <ul className={LIST}>
            <li>With trusted service providers who assist in our operations</li>
            <li>When required by law or to protect our legal rights</li>
            <li>
              In connection with a business transaction (merger, acquisition,
              etc.)
            </li>
            <li>With your explicit consent</li>
          </ul>

          <h2 className={`${HEADING} pt-6`}>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security
            measures to protect your personal information against unauthorized
            access, alteration, disclosure, or destruction. However, no method
            of transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2 className={`${HEADING} pt-6`}>Your Rights</h2>
          <p>
            Depending on your location, you may have the following rights
            regarding your personal information:
          </p>
          <ul className={LIST}>
            <li>Access and obtain a copy of your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to or restrict processing of your information</li>
            <li>Data portability (where applicable)</li>
          </ul>

          <h2 className={`${HEADING} pt-6`}>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <Card>
            <p>
              <strong className="text-oa-ink">Email:</strong>{" "}
              service@onealgorithm.com
            </p>
            <p className="mt-2">
              <strong className="text-oa-ink">Phone:</strong> 1 (610) 890-9711
            </p>
            <p className="mt-2">
              <strong className="text-oa-ink">Address:</strong> 625 Swedesford
              Rd, Malvern, PA 19355
            </p>
          </Card>

          <div className="border-t border-oa-hairlineStrong pt-8">
            <p className="text-sm text-oa-ink3">
              © {new Date().getFullYear()} OneAlgorithm. All rights reserved.
            </p>
          </div>
        </Prose>
      </Section>
    </Layout>
  );
}
