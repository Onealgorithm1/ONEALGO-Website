import { Link, useLocation } from "react-router-dom";
import OneAlgorithmText from "./OneAlgorithmText";
import TrustedPartnerships from "./TrustedPartnerships";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] =
    React.useState(false);
  const servicesDropdownRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const burgerButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const mainRef = React.useRef<HTMLElement>(null);
  const firstRender = React.useRef(true);
  const location = useLocation();

  // Close all dropdowns when mobile menu closes
  React.useEffect(() => {
    if (!mobileMenuOpen) {
      setServicesDropdownOpen(false);
      setIndustriesDropdownOpen(false);
    }
  }, [mobileMenuOpen]);

  // Handle window resize to close dropdowns when switching between mobile/desktop
  React.useEffect(() => {
    const handleResize = () => {
      // Close all dropdowns on resize to prevent state sync issues
      setServicesDropdownOpen(false);
      setIndustriesDropdownOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // When mobile menu is open, don't auto-close dropdowns on outside click
      if (mobileMenuOpen) return;

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

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

  // Keyboard handling for the full-screen mobile menu. Escape is the expected way
  // out of any overlay and there was none, and focus stayed on the burger behind
  // the panel, so a keyboard user opened the menu and then tabbed through content
  // they could not see. aria-hidden on the page behind does not help: it hides
  // things from screen readers but leaves them in the tab order. `inert` below is
  // what actually removes them.
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Only pull focus back if it is nowhere useful - on a route change the new
      // page should keep whatever focus it sets rather than having it yanked to
      // a hamburger the visitor never touched.
      if (!document.activeElement || document.activeElement === document.body) {
        burgerButtonRef.current?.focus();
      }
    };
  }, [mobileMenuOpen]);

  // React 18 has no typed `inert` prop, so it is spread in through a cast. An
  // empty string is the attribute's present-and-true form in the DOM.
  const backgroundInert = (
    mobileMenuOpen ? { inert: "" } : {}
  ) as React.HTMLAttributes<HTMLElement>;

  // Close mobile menu and dropdowns on route change, and scroll to top
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setIndustriesDropdownOpen(false);
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (_) {
      window.scrollTo(0, 0);
    }

    // Move focus to the new page. In a single-page app the browser does not do
    // this for you: without it the page scrolls to the top while keyboard focus
    // stays on the nav link that was just clicked, so the next Tab continues
    // through the menu rather than into the content, and a screen reader is
    // never told the page changed. Skipped on first mount so arriving at a URL
    // directly does not yank focus out of the address bar.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus();
  }, [location.pathname]);

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
            {/*
              No "Home" item. The logo to the left of this nav already links to
              "/", which is the convention every visitor knows, so the item was
              a duplicate taking up space next to About. The homepage stays
              reachable by crawlers through that logo link.
            */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/about"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                About
              </Link>
              {/* Capabilities moved into the Industries menu, under Government. */}
              {/* Same-origin now that Ghost is served at /blog, but still a plain
                  <a>: these are not routes in this SPA, so <Link> would hand them
                  to the router and render a 404 instead of loading the blog. */}
              <a
                href="/blog/"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
              >
                Blog
              </a>
              <a
                href="/blog/careers/"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
              >
                Careers
              </a>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesDropdownRef}>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="flex items-center gap-1 text-gray-900 hover:text-onealgo-blue-950 transition-colors"
                  aria-expanded={servicesDropdownOpen}
                  aria-controls="services-menu"
                  aria-label="Open services menu"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50" id="services-menu">
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
                        to="/services/martech"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        MarTech
                      </Link>
                      <Link
                        to="/services/google-ads"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Google Ads
                      </Link>
                      <Link
                        to="/services/seo"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        SEO Services
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
                      <Link
                        to="/services/oracle-erp"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Oracle ERP
                      </Link>
                      <Link
                        to="/services/salesforce"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Salesforce
                      </Link>
                      <Link
                        to="/services/zendesk"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Zendesk
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
                  aria-expanded={industriesDropdownOpen}
                  aria-controls="industries-menu"
                  aria-label="Open industries menu"
                >
                  Industries We Serve
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${industriesDropdownOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {industriesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50" id="industries-menu">
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
                      <Link
                        to="/industries/government"
                        className="block px-4 py-2 text-gray-700 hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setIndustriesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Government
                      </Link>
                      {/*
                        Capabilities sits under Government rather than in the
                        top-level nav. A capability statement is a government
                        contracting artefact — the people who look for one are
                        already in this part of the site, and everyone else was
                        being shown a term that means nothing to them.
                      */}
                      <Link
                        to="/capabilities"
                        className="block px-4 py-2 pl-8 text-gray-600 text-sm hover:bg-onealgo-light hover:text-onealgo-blue-950 transition-colors"
                        onClick={() => {
                          setIndustriesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Capability Statement
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* The "Talk to an Expert" button used to sit here. With Home,
                  About, Capabilities, Blog and a Services dropdown already in the
                  bar, a solid orange block on the end made it read as crowded.
                  Contact is still reachable from the footer, from the Services
                  menu, and from the CTA sections on the pages themselves - which
                  is where it converts anyway. */}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                ref={burgerButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-900 hover:text-onealgo-blue-950"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-[100] flex flex-col bg-white" id="mobile-nav">
              <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
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
                  ref={closeButtonRef}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-gray-900"
                >
                  <X size={24} />
                </button>
              </div>

              {/* flex-1 inside a flex column, rather than the old
                  max-h-[calc(100vh-64px)]. The 64px was a guess at the header's
                  real height, and on a phone the visible area is shorter than
                  100vh because the browser's own chrome overlaps it - so the
                  bottom of the menu sat off screen with no way to scroll to it. */}
              <div className="flex-1 overflow-y-auto px-3 py-3">
                {/*
                  No "Home" here either, matching the desktop nav. The logo at
                  the top of this drawer already links to "/", so the item was
                  the same duplicate.
                */}
                <nav className="space-y-0.5">
                  <Link
                    to="/about"
                    className="block rounded-lg px-3 py-3.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    About
                  </Link>

                  {/* Capabilities moved into the Industries menu, under Government. */}

                  {/* The blog was reachable from the desktop bar but missing here
                      entirely, so on a phone there was no way to find it. */}
                  <a
                    href="/blog/"
                    className="block rounded-lg px-3 py-3.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </a>
                  <a
                    href="/blog/careers/"
                    className="block rounded-lg px-3 py-3.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Careers
                  </a>

                  <div className="mt-2 border-t border-gray-100 pt-2">
                    <button
                      onClick={() =>
                        setServicesDropdownOpen(!servicesDropdownOpen)
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50"
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
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
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
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Marketing
                        </Link>
                        <Link
                          to="/services/martech"
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          MarTech
                        </Link>
                        <Link
                          to="/services/google-ads"
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Google Ads
                        </Link>
                        <Link
                          to="/services/seo"
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          SEO Services
                        </Link>
                        <Link
                          to="/services/staff-augmentation"
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
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
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
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
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Operations Technology
                        </Link>
                        <Link
                          to="/services/oracle-erp"
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Oracle ERP
                        </Link>
                        <Link
                          to="/services/salesforce"
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Salesforce
                        </Link>
                        <Link
                          to="/services/zendesk"
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Zendesk
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="mt-2 border-t border-gray-100 pt-2">
                    <button
                      onClick={() =>
                        setIndustriesDropdownOpen(!industriesDropdownOpen)
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50"
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
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
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
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
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
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setIndustriesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          E-Commerce
                        </Link>
                        <Link
                          to="/industries/government"
                          className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setIndustriesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Government
                        </Link>
                        {/* Same placement as the desktop menu. */}
                        <Link
                          to="/capabilities"
                          className="block rounded-lg px-3 py-2.5 pl-8 text-[14px] text-gray-500 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setIndustriesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Capability Statement
                        </Link>
                      </div>
                    )}
                  </div>

                </nav>
              </div>

              {/* The CTA used to sit between Capabilities and Services, so a
                  solid orange slab cut the link list in half. Pinned to its own
                  bottom bar it stays visible while the list scrolls and reads as
                  deliberate rather than wedged in. pb + safe-area keeps it clear
                  of the home indicator on a notched phone. */}
              <div
                className="shrink-0 border-t border-gray-100 px-4 pt-3"
                style={{
                  paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
                }}
              >
                <Link
                  to="/contact"
                  className="block w-full rounded-xl bg-onealgo-orange-500 px-4 py-3.5 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-onealgo-orange-600"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      {/* tabindex="-1" so the skip link in index.html can actually move focus
          here, and so route changes can too. It is not in the tab order - -1
          only makes it programmatically focusable. */}
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        aria-hidden={mobileMenuOpen}
        {...backgroundInert}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        className="bg-onealgo-blue-950 text-white"
        aria-hidden={mobileMenuOpen}
        {...backgroundInert}
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
                  to="/capabilities"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Capabilities
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
                {/* Ghost, served at /blog on this domain. Still a plain <a> -
                    it is not a route in this SPA, so <Link> would 404. */}
                <a
                  href="/blog/"
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Blog
                </a>
                <Link
                  to="/contact"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Contact
                </Link>
                {/*
                  Careers now lives on the blog, so this points there rather
                  than at a page on this site. AI Information stays local.

                  The careers PAGE, not the blog homepage - this used to drop
                  candidates on the latest-posts feed and leave them to hunt.
                */}
                <a
                  href="/blog/careers/"
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Careers
                </a>
                <Link
                  to="/ai-info"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  AI Information
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {/*
                  The heading links to the services hub.

                  /services was an ORPHAN: the only navigation to it was the
                  header dropdown trigger, which is a <button>, not a link — and
                  the dropdown's contents are conditionally rendered, so on a
                  prerendered page none of those links exist in the HTML at all.
                  Google reported /services as "URL is unknown to Google": never
                  discovered, because nothing a crawler can read pointed at it.
                */}
                <Link
                  to="/services"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="hover:text-blue-200 transition-colors"
                >
                  Services
                </Link>
              </h3>
              <div className="space-y-2">
                <Link
                  to="/services/martech"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  MarTech
                </Link>
                <Link
                  to="/services/google-ads"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Google Ads
                </Link>
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
                  to="/services/seo"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  SEO Services
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
                <Link
                  to="/services/oracle-erp"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Oracle ERP
                </Link>
                <Link
                  to="/services/salesforce"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Salesforce
                </Link>
                <Link
                  to="/services/zendesk"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Zendesk
                </Link>
              </div>
            </div>

            {/*
              Certifications.

              These are trust signals for federal, state and local buyers, who
              routinely filter suppliers by set-aside status before reading
              anything else. They are NOT backlinks — a link from this site to
              the SBA gives authority to the SBA, not to us. What earns
              authority is those directories linking back, which is handled
              separately; two of them already do.

              Every URL here was fetched and confirmed to exist and to list this
              company. The Virginia SWaM directory is a single-page app with no
              per-record permalink, so it links to the directory itself rather
              than implying a deep link that does not exist.

              rel="noopener" on every target="_blank": without it the opened
              page can reach back through window.opener.
            */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Certifications</h3>
              <div className="space-y-2">
                {[
                  [
                    "https://search.certifications.sba.gov/profile/W8DYK38MEKP3/14G18",
                    "SBA Certified WOSB / EDWOSB",
                  ],
                  [
                    "https://www.dgs.internet.state.pa.us/suppliersearch/Home/Details/35896",
                    "PA DGS Registered Supplier",
                  ],
                  [
                    "https://directory.sbsd.virginia.gov/#/directory",
                    "Virginia SWaM Certified",
                  ],
                  [
                    "https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000EV7SwUAL",
                    "Salesforce Consulting Partner",
                  ],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="block text-blue-200 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
                {/*
                  The UEI and SWaM numbers are no longer printed here. They stay
                  in the Organization structured data as identifiers, which is
                  where they do the work — search engines and AI assistants can
                  still tie this company to its federal registration.
                */}
              </div>
            </div>


            {/*
              Contact block removed at the client's request.

              Worth recording: a visible name, address and phone number is a
              local search signal, and the footer was the only place all three
              appeared on every page. They remain in the LocalBusiness
              structured data in index.html, so machines can still read them —
              but a person now has to reach /contact to find them.
            */}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-blue-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-200 text-sm">
                © {new Date().getFullYear()} OneAlgorithm. All rights reserved.
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

            {/* E-Verify Statement */}
            <div className="mt-4 pt-4 border-t border-blue-800/50">
              <p className="text-blue-300/80 text-xs text-center">
                We participate in E-Verify
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default React.memo(Layout);
