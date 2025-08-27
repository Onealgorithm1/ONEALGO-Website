import React from "react";
import { Link } from "react-router-dom";
import OneAlgorithmText from "./OneAlgorithmText";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <OneAlgorithmText size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
              >
                About
              </Link>
              <Link
                to="/industries"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
              >
                Industries
              </Link>
              <Link
                to="/contact"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
              >
                Contact
              </Link>
              <Button className="bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-900 hover:text-onealgo-blue-950"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-900 hover:text-onealgo-blue-950"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-gray-900 hover:text-onealgo-blue-950"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/industries"
                  className="block px-3 py-2 text-gray-900 hover:text-onealgo-blue-950"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Industries
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-gray-900 hover:text-onealgo-blue-950"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="px-3 py-2">
                  <Button className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-onealgo-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <OneAlgorithmText size="lg" className="text-white mb-4" />
              <p className="text-blue-200 mb-6 max-w-md">
                We streamline operations, automate the busywork, and build tools that let you focus on what matters: growing your business.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/onealgorithmllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.tiktok.com/@one.algorithm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  TikTok
                </a>
                <a
                  href="https://youtube.com/@onealgorithm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  YouTube
                </a>
                <a
                  href="https://www.facebook.com/share/1694s7Yy3p/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/onealgorithm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-blue-200 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/about" className="block text-blue-200 hover:text-white transition-colors">
                  About
                </Link>
                <Link to="/industries" className="block text-blue-200 hover:text-white transition-colors">
                  Industries
                </Link>
                <Link to="/contact" className="block text-blue-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-blue-200">
                <p>service@onealgorithm.com</p>
                <p>(610) 298-9069</p>
                <p>625 Swedesford Rd<br />Malvern, PA 19355</p>
              </div>
            </div>
          </div>

          {/* Trusted Partnerships */}
          <div className="border-t border-blue-800 mt-8 pt-8">
            <h3 className="text-lg font-semibold mb-4">Trusted Partnerships</h3>
            <p className="text-blue-200 text-sm">
              Certified expertise across leading platforms: Salesforce, Monday.com, HubSpot, Zoho, Zapier, MuleSoft, Microsoft Dynamics, Twilio, Aircall, QuickBooks, DocuSign, OneFlow, Hootsuite, and Metricool.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">
              © 2025 OneAlgorithm. All rights reserved.
            </p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link
                to="/privacy"
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <a
                href="mailto:careers@onealgorithm.com"
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                Careers
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
