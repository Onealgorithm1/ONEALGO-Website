import { Link } from "react-router-dom";
import OneAlgorithmText from "./OneAlgorithmText";
import TrustedPartnerships from "./TrustedPartnerships";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import * as React from "react";
import LeadConnectorWidget from "./LeadConnectorWidget";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] =
    React.useState(false);
  const [careersDropdownOpen, setCareersDropdownOpen] = React.useState(false);
  const servicesDropdownRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const careersDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close all dropdowns when mobile menu closes
  React.useEffect(() => {
    if (!mobileMenuOpen) {
      setServicesDropdownOpen(false);
      setIndustriesDropdownOpen(false);
      setCareersDropdownOpen(false);
    }
  }, [mobileMenuOpen]);

  // Handle window resize to close dropdowns when switching between mobile/desktop
  React.useEffect(() => {
    const handleResize = () => {
      // Close all dropdowns on resize to prevent state sync issues
      setServicesDropdownOpen(false);
      setIndustriesDropdownOpen(false);
      setCareersDropdownOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIndustriesDropdownOpen(false);
      }
      if (
        careersDropdownRef.current &&
        !careersDropdownRef.current.contains(event.target as Node)
      ) {
        setCareersDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <OneAlgorithmText size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                About
              </Link>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesDropdownRef}>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="flex items-center gap-1 text-gray-900 hover:text-onealgo-blue-950 transition-colors"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <Link
                        to="/services/website-development"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Website Development
                      </Link>
                      <Link
                        to="/services/marketing"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Marketing
                      </Link>
                      <Link
                        to="/services/staff-augmentation"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Staff Augmentation
                      </Link>
                      <Link
                        to="/services/it-consulting"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        IT Consulting
                      </Link>
                      <Link
                        to="/services/operations-technology"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Operations Technology
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setIndustriesDropdownOpen(!industriesDropdownOpen)
                  }
                  className="flex items-center gap-1 text-gray-900 hover:text-onealgo-blue-950 transition-colors"
                >
                  Industries We Serve
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${industriesDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {industriesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <Link
                        to="/industries/construction"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setIndustriesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Construction
                      </Link>
                      <Link
                        to="/industries/manufacturing"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setIndustriesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Manufacturing
                      </Link>
                      <Link
                        to="/industries/ecommerce"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setIndustriesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        E-Commerce
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Careers & Insights Dropdown */}
              <div className="relative" ref={careersDropdownRef}>
                <button
                  onClick={() => setCareersDropdownOpen(!careersDropdownOpen)}
                  className="flex items-center gap-1 text-gray-900 hover:text-onealgo-blue-950 transition-colors"
                >
                  Careers & Insights
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${careersDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {careersDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <Link
                        to="/careers"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setCareersDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Careers
                      </Link>
                      <Link
                        to="/blog"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setCareersDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Blog
                      </Link>
                      <Link
                        to="/events"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setCareersDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Events
                      </Link>
                      <div className="px-4 py-2 border-t block md:hidden">
                        <Link
                          to="/contact"
                          className="block text-center bg-onealgo-orange-500 text-white rounded-md px-3 py-2 font-semibold mt-2"
                          onClick={() => {
                            setCareersDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Contact
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/contact"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Contact
              </Link>
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
            <div className="md:hidden fixed inset-0 z-50 bg-white">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <Link
                  to="/"
                  className="flex items-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <OneAlgorithmText size="md" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-gray-900"
                >
                  <X size={24} />
                </button>
              </div>

              <div
                className="px-4 py-4 overflow-auto"
                style={{ maxHeight: "calc(100vh - 64px)" }}
              >
                <nav className="space-y-1">
                  <Link
                    to="/"
                    className="block px-3 py-2 text-gray-900 hover:text-onealgo-blue-950 text-sm"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Home
                  </Link>

                  <Link
                    to="/about"
                    className="block px-3 py-2 text-gray-900 hover:text-onealgo-blue-950 text-sm"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    About
                  </Link>

                  <Link
                    to="/contact"
                    className="block w-full text-center bg-onealgo-orange-500 text-white rounded-md px-3 py-2 font-semibold"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Contact
                  </Link>

                  <div className="pt-2 border-t">
                    <button
                      onClick={() =>
                        setServicesDropdownOpen(!servicesDropdownOpen)
                      }
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-700 font-medium text-sm"
                      aria-expanded={servicesDropdownOpen}
                      aria-controls="mobile-services"
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {servicesDropdownOpen && (
                      <div id="mobile-services" className="pl-4">
                        <Link
                          to="/services/website-development"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Website Development
                        </Link>
                        <Link
                          to="/services/marketing"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Marketing
                        </Link>
                        <Link
                          to="/services/staff-augmentation"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Staff Augmentation
                        </Link>
                        <Link
                          to="/services/it-consulting"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          IT Consulting
                        </Link>
                        <Link
                          to="/services/operations-technology"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Operations Technology
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <button
                      onClick={() =>
                        setIndustriesDropdownOpen(!industriesDropdownOpen)
                      }
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-700 font-medium text-sm"
                      aria-expanded={industriesDropdownOpen}
                      aria-controls="mobile-industries"
                    >
                      <span>Industries We Serve</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${industriesDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {industriesDropdownOpen && (
                      <div id="mobile-industries" className="pl-4">
                        <Link
                          to="/industries/construction"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setIndustriesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Construction
                        </Link>
                        <Link
                          to="/industries/manufacturing"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setIndustriesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Manufacturing
                        </Link>
                        <Link
                          to="/industries/ecommerce"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setIndustriesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          E-Commerce
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <button
                      onClick={() =>
                        setCareersDropdownOpen(!careersDropdownOpen)
                      }
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-700 font-medium text-sm"
                      aria-expanded={careersDropdownOpen}
                      aria-controls="mobile-careers"
                    >
                      <span>Careers & Insights</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${careersDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {careersDropdownOpen && (
                      <div id="mobile-careers" className="pl-4">
                        <Link
                          to="/careers"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setCareersDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Careers
                        </Link>
                        <Link
                          to="/blog"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setCareersDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Blog
                        </Link>
                        <Link
                          to="/events"
                          className="block px-3 py-2 text-gray-600 hover:text-onealgo-blue-950 text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setCareersDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Events
                        </Link>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main aria-hidden={mobileMenuOpen}>{children}</main>

      {/* Footer */}
      <footer
        className="bg-onealgo-blue-950 text-white"
        aria-hidden={mobileMenuOpen}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Trusted Partnerships Carousel */}
          <TrustedPartnerships />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <OneAlgorithmText size="lg" className="text-white mb-4" />
              <p className="text-blue-200 mb-6 max-w-md">
                We streamline operations, automate the busywork, and build tools
                that let you focus on what matters: growing your business.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/onealgorithmllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-blue-800 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  title="LinkedIn"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:text-blue-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@one.algorithm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-blue-800 hover:bg-black p-3 rounded-full transition-all duration-300 hover:scale-110"
                  title="TikTok"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com/@onealgorithm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-blue-800 hover:bg-red-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  title="YouTube"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:text-red-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/share/1694s7Yy3p/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-blue-800 hover:bg-blue-500 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  title="Facebook"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:text-blue-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/onealgorithm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-blue-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  title="Instagram"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:text-pink-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://maps.app.goo.gl/kVEeTz9dCyB64CGk6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-blue-800 hover:bg-red-500 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  title="Google Business Profile"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:text-red-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/industries"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Industries We Serve
                </Link>
                <Link
                  to="/careers"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Careers
                </Link>
                <Link
                  to="/blog"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Blog
                </Link>
                <Link
                  to="/events"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Events
                </Link>
                <Link
                  to="/contact"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <Link
                  to="/services/website-development"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Website Development
                </Link>
                <Link
                  to="/services/marketing"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Marketing
                </Link>
                <Link
                  to="/services/staff-augmentation"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Staff Augmentation
                </Link>
                <Link
                  to="/services/it-consulting"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  IT Consulting
                </Link>
                <Link
                  to="/services/operations-technology"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Operations Technology
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-blue-200">
                <p>service@onealgorithm.com</p>
                <p>(610) 298-9069</p>
                <p>
                  625 Swedesford Rd
                  <br />
                  Malvern, PA 19355
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-blue-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-200 text-sm">
                © 2025 OneAlgorithm. All rights reserved.
              </p>
              <div className="flex gap-4 mt-2 md:mt-0">
                <Link
                  to="/privacy"
                  className="text-blue-200 hover:text-white transition-colors text-sm"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-blue-200 hover:text-white transition-colors text-sm"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 pt-4 border-t border-blue-800/50">
              <p className="text-blue-300/80 text-xs leading-relaxed text-center max-w-4xl mx-auto">
                All product names, logos, and brands are property of their
                respective owners. Use of these names, logos, and brands does
                not imply endorsement.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <LeadConnectorWidget />
          </div>
        </div>
      </footer>
    </div>
  );
}
