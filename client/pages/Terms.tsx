import React from "react";
import Layout from "../components/Layout";
import { PageHero, Section, Prose } from "../components/site";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";

/* Terms & Conditions - 2026 refresh.
 *
 * Same treatment as Privacy, and the same constraint: the terms themselves are
 * untouched. Only the presentation moved onto the shared system, and the
 * hard-coded "© 2025" became the current year to match the footer.
 *
 * The "Last updated" date is left exactly as found. It is stale, but changing
 * the date on a legal document is not a restyle.
 */

const HEADING = "text-h3 font-semibold text-oa-ink";

export default function Terms() {
  useSEO({
    title: "Terms & Conditions — OneAlgorithm",
    description:
      "Review OneAlgorithm's Terms & Conditions governing use of our website and services.",
    canonical: getCanonicalUrl("/terms"),
    ogTitle: "Terms & Conditions — OneAlgorithm",
    ogDescription:
      "Understand the terms governing use of our website and services.",
    ogUrl: getCanonicalUrl("/terms"),
    twitterTitle: "Terms & Conditions — OneAlgorithm",
    twitterDescription:
      "Understand the terms governing use of our website and services.",
  });

  return (
    <Layout>
      {/* Date moved into the hero's meta record - same reasoning as Privacy.
          The date itself is untouched. */}
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions — Using the OneAlgorithm Website"
        meta={[
          { label: "Document", value: "OneAlgorithm Terms & Conditions" },
          { label: "Last updated", value: "1/16/2025" },
        ]}
      />

      <Section tone="paper">
        <Prose>
          <h2 className={HEADING}>Acceptance of Terms</h2>
          <p>
            By accessing or using the OneAlgorithm website (the "Site"), you
            agree to be bound by these Terms &amp; Conditions and all applicable
            laws and regulations. If you do not agree with any of these terms,
            you are prohibited from using or accessing this Site.
          </p>

          <h2 className={`${HEADING} pt-6`}>Use of the Site</h2>
          <p>
            You agree to use the Site only for lawful purposes and in a way that
            does not infringe the rights of others or restrict their use of the
            Site. Prohibited activities include, but are not limited to,
            unauthorized access, distributing malware, or interfering with the
            normal operation of the Site.
          </p>

          <h2 className={`${HEADING} pt-6`}>Intellectual Property</h2>
          <p>
            All content on the Site, including text, graphics, logos, images,
            and software, is the property of OneAlgorithm or its content
            suppliers and is protected by intellectual property laws. You may
            not reproduce, distribute, modify, or create derivative works from
            this content without prior written consent.
          </p>

          <h2 className={`${HEADING} pt-6`}>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, OneAlgorithm will not be
            liable for any direct, indirect, incidental, consequential, or
            punitive damages arising out of your access to or use of the Site or
            any linked services.
          </p>

          <h2 className={`${HEADING} pt-6`}>Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. OneAlgorithm is
            not responsible for the content or practices of third-party sites,
            and these links do not imply endorsement.
          </p>

          <h2 className={`${HEADING} pt-6`}>Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of the Commonwealth of Pennsylvania, without regard to its
            conflict of law principles.
          </p>

          <h2 className={`${HEADING} pt-6`}>Contact</h2>
          <p>
            If you have questions about these Terms &amp; Conditions, please
            contact us at service@onealgorithm.com.
          </p>

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
