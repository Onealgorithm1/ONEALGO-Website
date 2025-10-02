import Layout from "../components/Layout";

import Layout from "../components/Layout";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";

export default function Terms() {
  useSEO({
    title: "Terms & Conditions — OneAlgorithm",
    description: "Review OneAlgorithm's Terms & Conditions governing use of our website and services.",
    canonical: getCanonicalUrl("/terms"),
    ogTitle: "Terms & Conditions — OneAlgorithm",
    ogDescription: "Understand the terms governing use of our website and services.",
    ogUrl: getCanonicalUrl("/terms"),
    twitterTitle: "Terms & Conditions — OneAlgorithm",
    twitterDescription: "Understand the terms governing use of our website and services."
  });
  return (
    <Layout>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Terms & Conditions
          </h1>

          <div className="text-gray-600 space-y-8">
            <div>
              <p className="text-lg">
                <strong>OneAlgorithm</strong>
                <br />
                Last updated: 1/16/2025
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Acceptance of Terms
              </h2>
              <p>
                By accessing or using the OneAlgorithm website (the "Site"), you
                agree to be bound by these Terms & Conditions and all applicable
                laws and regulations. If you do not agree with any of these
                terms, you are prohibited from using or accessing this Site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Use of the Site
              </h2>
              <p>
                You agree to use the Site only for lawful purposes and in a way
                that does not infringe the rights of others or restrict their
                use of the Site. Prohibited activities include, but are not
                limited to, unauthorized access, distributing malware, or
                interfering with the normal operation of the Site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Intellectual Property
              </h2>
              <p>
                All content on the Site, including text, graphics, logos,
                images, and software, is the property of OneAlgorithm or its
                content suppliers and is protected by intellectual property
                laws. You may not reproduce, distribute, modify, or create
                derivative works from this content without prior written
                consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, OneAlgorithm will not be
                liable for any direct, indirect, incidental, consequential, or
                punitive damages arising out of your access to or use of the
                Site or any linked services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Third-Party Links
              </h2>
              <p>
                The Site may contain links to third-party websites. OneAlgorithm
                is not responsible for the content or practices of third-party
                sites, and these links do not imply endorsement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Governing Law
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the
                laws of the Commonwealth of Pennsylvania, without regard to its
                conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p>
                If you have questions about these Terms & Conditions, please
                contact us at service@onealgorithm.com.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500">
                © 2025 OneAlgorithm. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
