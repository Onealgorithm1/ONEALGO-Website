import React from "react";
import Layout from "../components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          
          <div className="text-gray-600 space-y-8">
            <div>
              <p className="text-lg">
                <strong>OneAlgorithm</strong><br />
                Last updated: 8/27/2025
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p>
                At OneAlgorithm, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Contact us through our website or email</li>
                <li>Request information about our services</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or feedback forms</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
              <p className="mb-4">
                We automatically collect certain technical information when you visit our website, including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Website usage patterns and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide and improve our Salesforce consulting services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you relevant information about our services</li>
                <li>Analyze website usage to enhance user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>With trusted service providers who assist in our operations</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In connection with a business transaction (merger, acquisition, etc.)</li>
                <li>With your explicit consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access and obtain a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Data portability (where applicable)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-onealgo-light p-6 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> service@onealgorithm.com</p>
                <p className="mb-2"><strong>Phone:</strong> (610) 298-9069</p>
                <p><strong>Address:</strong> 625 Swedesford Rd, Malvern, PA 19355</p>
              </div>
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
