import { Link, useLocation } from "react-router-dom";
import OneAlgorithmText from "./OneAlgorithmText";
import TrustedPartnerships from "./TrustedPartnerships";
import { offerFor } from "./v2/shared-offers";
import { StickyCallBar } from "./v2/shared-StickyCallBar";
import { FRAME, FrameContext, PrimaryCTA } from "./site";
import { RailSeenContext, StructuredData, createBreadcrumbSchema } from "./StructuredData";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { SF_CITY_LINKS } from "../data/salesforceShared";
import * as React from "react";

/*
  Footer link tap target.

  These links were the height of their own text and nothing else - 20px,
  measured on a 390px iPhone viewport. WCAG 2.5.5 and Apple's HIG both want 44.
  The fix is padding on the anchor, not a bigger font: the footer reads as small
  print by design and inflating the type to reach 44px would change how it looks
  as well as how it taps.

  `md:py-0` keeps the desktop footer exactly as it was - a mouse does not need
  the slack, and 20 links each 24px taller would have added ~250px of dead space
  to a wide layout. On mobile the spacing between links moves INTO the padding
  (`space-y-0 md:space-y-1.5` on the wrapper) so the list does not grow by the
  gap as well as the padding. Contiguous 44px rows, no overlap: negative margins
  would have kept the visual rhythm but made neighbouring hit areas overlap by
  18px, which turns a near-miss tap into the wrong page.
*/
const footerLink =
  "block py-3 md:py-0 text-sm text-oa-nightInk2 hover:text-oa-nightInk transition-colors";
const footerLinkList = "space-y-0 md:space-y-1.5";

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} onClick={scrollTop} className={footerLink}>
      {children}
    </Link>
  );
}

/*
  Footer link group. From 768px up: a real <h3> and the list, always shown -
  the <summary> is display:none, so there is no focusable control that does
  nothing. Below 768px: the h3 is hidden and the native <details>/<summary> is a
  44px disclosure row. The <details> is rendered OPEN so prerendered HTML
  (desktop, no-JS, crawlers) carries every link; the effect closes it on phones.
  ponytail: phones see it open for one frame before hydration closes it - it is
  below the fold, so no visible shift; upgrade is a CSS-only ::details-content
  rule once Safari < 18.4 no longer matters.
*/
const desktopQuery = "(min-width: 768px)";
function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDetailsElement>(null);
  React.useEffect(() => {
    const mq = window.matchMedia(desktopQuery);
    const sync = () => {
      if (ref.current) ref.current.open = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return (
    <div>
      <h3 className="mb-4 hidden text-xs font-semibold uppercase tracking-wide text-oa-nightInk3 md:block">
        {title}
      </h3>
      <details ref={ref} open className="group border-t border-white/10 md:border-0">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between rounded text-xs font-semibold uppercase tracking-wide text-oa-nightInk3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oa-nightInk md:hidden [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-open:rotate-180"
          />
        </summary>
        <div className={`${footerLinkList} pb-2 md:pb-0`}>{children}</div>
      </details>
    </div>
  );
}


/*
  Mobile dropdown rows.

  Measured open on a 390px viewport: 42.5px tall, a pixel and a half under the
  44 WCAG 2.5.5 asks for, on the sixteen links that make up the whole Services
  and Industries menus. `min-h-[44px]` with the padding left alone raises the
  floor without loosening the list - bumping py- instead would have added ~4px
  to every row and made the drawer scroll further for the same content.

  Extracted because the identical string was written out sixteen times, which is
  how it drifted from the 44px target rows above it in the first place.
*/
const mobileSubLink =
  "flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950";
const mobileSubLinkNested =
  "flex min-h-[44px] items-center rounded-lg px-3 pl-8 py-2.5 text-[14px] text-gray-500 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950";

/* NAVIGATION DATA - added 2026-08-27.
 *
 * The Services menu used to be eleven <Link> blocks written out by hand, TWICE
 * (once for desktop, once for the mobile drawer). That duplication is why the
 * menu drifted away from the router: /industries/marketing and
 * /industries/website-development are real routes that no menu ever linked to,
 * so the only way to reach them was a search result. Both menus now render from
 * this one array, so a page cannot be added to the site and forgotten in the
 * navigation again.
 *
 * WHY ONLY SIX. The homepage was repositioned on 2026-08-26 to "websites, SEO,
 * Google Ads, marketing and CRM for small business in Chester County and the
 * Philadelphia area", but the navigation still led with Zendesk and
 * Staff Augmentation - so a small-business visitor opened the menu and found an
 * enterprise IT firm. This list is now exactly the five services named in that
 * approved positioning, plus Application Development.
 *
 * THE ENTERPRISE PAGES ARE NOT DELETED. Zendesk, IT Consulting,
 * MarTech and Staff Augmentation are still sold, still
 * live at their own URLs, and still linked from the /services index and from
 * the sibling wire under every service hero - so no URL breaks and no ranking
 * is lost. They are simply no longer the first thing a local business reads.
 * Louis's call, 2026-08-27.
 *
 * Labels are deliberately short ("Websites", not "Website Development"). The
 * long form made the sibling wire under the hero reflow as it loaded, measured
 * at CLS 0.166 against a 0.1 budget on a page whose siblings measured 0.000.
 */
const SERVICE_ITEMS: { to: string; label: string }[] = [
  { to: "/services/website-development", label: "Websites" },
  { to: "/services/application-development", label: "App Development" },
  { to: "/services/seo", label: "SEO" },
  { to: "/services/google-ads", label: "Google Ads" },
  { to: "/services/marketing", label: "Marketing" },
  { to: "/services/salesforce", label: "Salesforce & CRM" },
];

/* NAV_GROUPS - one source for the header mega-menu and mobile drawer (spec 3).
   Only live routes; add seo-philadelphia / ai-seo / marketing-automation-consulting the day each ships. */
const NAV_GROUPS: { title: string; to: string; links: { to: string; label: string }[] }[] = [
  { title: "Websites", to: "/services/website-development", links: [
    { to: "/services/website-development", label: "Website Development" },
    { to: "/services/small-business-website-design", label: "Small Business Website Design" },
    { to: "/services/website-redesign", label: "Website Redesign" },
    { to: "/services/website-cost", label: "What a Website Costs" },
    { to: "/services/web-design-philadelphia", label: "Web Design Philadelphia" },
    { to: "/services/web-design-chester-county", label: "Web Design Chester County" },
  ] },
  { title: "SEO, Ads and Marketing", to: "/services", links: [
    { to: "/services/seo", label: "SEO Services" },
    { to: "/services/seo-chester-county", label: "SEO Chester County" },
    { to: "/services/google-ads", label: "Google Ads Management" },
    { to: "/services/google-ads-philadelphia", label: "Google Ads Philadelphia" },
    { to: "/services/marketing", label: "Marketing and Social Media" },
  ] },
  { title: "Salesforce and CRM", to: "/services/salesforce", links: [
    { to: "/services/salesforce", label: "Salesforce Consulting" },
    { to: "/services/salesforce-health-check", label: "Free Health Check" },
    { to: "/services/salesforce-data-migration", label: "Data Migration" },
    { to: "/services/salesforce-integration", label: "Integration" },
    { to: "/services/salesforce-managed-services", label: "Managed Services" },
    { to: "/services/salesforce-marketing-cloud-consulting", label: "Marketing Cloud" },
    { to: "/services/salesforce-implementation-cost", label: "Implementation Cost" },
    { to: "/services/zendesk", label: "Zendesk" },
  ] },
  { title: "Software, IT and Operations", to: "/services/application-development", links: [
    { to: "/services/application-development", label: "Custom App Development" },
    { to: "/services/martech", label: "MarTech" },
    { to: "/services/it-consulting", label: "IT Consulting" },
    { to: "/services/staff-augmentation", label: "Staff Augmentation" },
    { to: "/services/operational-transformation-consulting", label: "Operational Transformation" },
  ] },
];
const INDUSTRY_LINKS: { to: string; label: string }[] = [
  { to: "/industries/construction", label: "Construction" },
  { to: "/industries/manufacturing", label: "Manufacturing" },
  { to: "/industries/ecommerce", label: "E-Commerce" },
  { to: "/industries/government", label: "Government" },
  { to: "/industries/marketing", label: "Marketing" },
  { to: "/industries", label: "All industries" },
];

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
  const mobilePanelRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLElement>(null);
  const firstRender = React.useRef(true);
  const location = useLocation();
  // One BreadcrumbList per page: HeroRail flips `seen`, SfPage then stays quiet (see RailSeenContext).
  const railSeen = React.useRef({ path: "", seen: false });
  if (railSeen.current.path !== location.pathname) railSeen.current = { path: location.pathname, seen: false };
  // Careers job page has no rail of its own: Home > Careers > role (title from the slug).
  const jobSlug = /^\/careers\/([a-z0-9-]+)\/?$/i.exec(location.pathname)?.[1];
  // Salesforce pages exist to make the office phone ring or the contact form
  // fill. On a phone the CTAs scroll away, so these pages carry a fixed bar.
  const isSalesforce = location.pathname.startsWith("/services/salesforce");
  const pageOffer = offerFor(location.pathname);
  // v2-kit routes (Salesforce + website-development set) carry the AA "contrast" logo tone: orange-500 "One" is 1.86:1 on the white header.
  const contrastLogo = isSalesforce || location.pathname === "/services/website-development" || location.pathname.startsWith("/services/web-design-");
  // Salesforce pages use the wide frame (addendum 2026-10-23). Header, footer
  // and every Section/PageHero inside <main> read this one value, so their
  // left edges cannot drift apart. Every other route keeps the 1200px frame.
  const frame = isSalesforce ? "wide" : "default";
  // Salesforce link policy (owner rule 2026-10-23): every off-site text link shows the external mark and says
  // it opens a new tab. Footer only, Salesforce routes only; every other page's footer is unchanged.
  const newTab = isSalesforce ? " (opens in a new tab)" : "";
  const extMark = isSalesforce ? (
    <>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className="ml-1 inline-block align-[-1px]"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  ) : null;
  // Shown once the hero's own buttons have scrolled away, so a phone's first
  // screen never carries the same two buttons twice.
  const [showSfBar, setShowSfBar] = React.useState(false);
  React.useEffect(() => {
    if (!isSalesforce) return;
    const onScroll = () => setShowSfBar(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSalesforce]);

  /* Salesforce plate system (spec 2.16, 2026-10-23). Every page gets one Desk
     (`#start`, the page's form). Until a page has been rebuilt with one, the
     header CTA and the call bar keep pointing at /contact?need=salesforce, so
     no link ever lands on a missing anchor. The Desk mounts with the lazy route
     chunk, so it is looked for for ~1s rather than once. */
  const [hasDesk, setHasDesk] = React.useState(false);
  const [deskInView, setDeskInView] = React.useState(false);
  const [fieldFocused, setFieldFocused] = React.useState(false);
  React.useEffect(() => {
    setHasDesk(false);
    setDeskInView(false);
    if (!isSalesforce) return;
    let raf = 0;
    let tries = 0;
    let io: IntersectionObserver | null = null;
    const seek = () => {
      const desk = document.getElementById("start");
      if (desk) {
        setHasDesk(true);
        io = new IntersectionObserver(([e]) => setDeskInView(e.isIntersecting), {
          rootMargin: "0px 0px -10% 0px",
        });
        io.observe(desk);
      } else if (tries++ < 60) {
        raf = window.requestAnimationFrame(seek);
      }
    };
    seek();
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [isSalesforce, location.pathname]);
  React.useEffect(() => {
    if (!isSalesforce) return;
    const isField = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("input,textarea,select");
    const onIn = (e: FocusEvent) => setFieldFocused(isField(e.target));
    const onOut = (e: FocusEvent) => {
      if (!isField(e.relatedTarget)) setFieldFocused(false);
    };
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
      setFieldFocused(false);
    };
  }, [isSalesforce]);
  // The bar stays mounted and slides; hidden = aria-hidden AND inert, so a
  // keyboard user can never tab into a bar that is off screen.
  const sfBarVisible = isSalesforce && showSfBar && !deskInView && !fieldFocused && !mobileMenuOpen;
  // Same cast as backgroundInert below: React 18 has no typed `inert` prop.
  // As an attribute (not a ref effect) so the prerendered HTML carries it too.
  const sfBarInert = (sfBarVisible ? {} : { inert: "" }) as React.HTMLAttributes<HTMLElement>;

  /* Salesforce pages: `html` scroll-padding so an anchor jump, and the browser
     scrolling a focused field into view, both clear the 64px sticky header
     and the ~72px call bar. Removed again on every other page. */
  React.useEffect(() => {
    if (!isSalesforce) return;
    const html = document.documentElement.style;
    html.scrollPaddingTop = "6rem";
    html.scrollPaddingBottom = "6rem";
    return () => {
      html.scrollPaddingTop = "";
      html.scrollPaddingBottom = "";
    };
  }, [isSalesforce]);

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

      // ...and the drawer itself once past the md breakpoint. Turning a phone
      // to landscape crosses 768px, which hides the drawer with `md:hidden`
      // while leaving mobileMenuOpen true - so the scroll lock and the `inert`
      // on the rest of the page stayed on with nothing on screen to switch them
      // off. Driven at 390x844 -> 844x390: the page froze completely, no scroll,
      // nothing clickable, no visible way out. 768 is Tailwind's `md`; if that
      // breakpoint moves, this moves with it.
      // 1024 is Tailwind's `lg`. The desktop nav moved from md to lg on
      // 2026-08-25 because at 768-1023px its seven items overflowed the bar
      // by 54px; the drawer now covers that range, so this threshold moved too.
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
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
  //
  // The Tab handler is the second half of that, and it was missing: `inert` on
  // <main> and <footer> only covers what those elements contain. Driven on a
  // 390px viewport, Tab from the drawer's last item landed on the skip link in
  // index.html, then the header logo, then the burger - all of them behind the
  // overlay, none of them visible. Wrapping focus at both ends is what actually
  // traps it, and it also catches focus that has already fallen out to <body>.
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = mobilePanelRef.current;
      if (!panel) return;
      // Every focusable in the drawer is a link or a button, and the collapsed
      // dropdowns are not rendered at all rather than hidden, so there is
      // nothing here that needs a visibility filter.
      const items = panel.querySelectorAll<HTMLElement>("a[href], button");
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const inside = panel.contains(document.activeElement);

      if (event.shiftKey) {
        if (!inside || document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (!inside || document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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

    // A URL carrying a fragment is a promise to land on that section, so honour
    // it instead of jumping to the top. Without this the footer's "We
    // participate in E-Verify" link drops the visitor on Company Overview and
    // leaves them to scroll seven sections to reach the evidence.
    //
    // The target usually does NOT exist yet: every route is a lazy chunk, so on
    // a cross-page jump this effect runs before the destination has mounted.
    // Hence the retry — a single getElementById here silently fell back to the
    // top of the page. It gives up after ~1s so a stale fragment still lands
    // somewhere sensible rather than leaving the visitor mid-document.
    let frame = 0;
    let raf = 0;
    const deadline = 60; // frames, ~1s at 60fps
    const toTop = () => {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (_) {
        window.scrollTo(0, 0);
      }
    };

    if (!location.hash) {
      toTop();
    } else {
      const id = decodeURIComponent(location.hash.slice(1));
      const seek = () => {
        const target = document.getElementById(id);
        if (target) {
          // Instant, not smooth: a verification link should arrive, and a
          // smooth scroll across a long page reads as the link having failed.
          target.scrollIntoView({ behavior: "auto", block: "start" });
          // Salesforce pages (spec 2.16): focus follows the jump, to the form
          // heading for #start (never straight into an input), else the target.
          if (isSalesforce) {
            const focusEl = id === "start" ? document.getElementById("start-title") ?? target : target;
            if (!focusEl.hasAttribute("tabindex")) focusEl.setAttribute("tabindex", "-1");
            // Next frame, not now: on an in-page <a href="#…"> click this runs
            // inside popstate, and Chrome's own fragment navigation then blurs
            // the active element to <body> (measured 2026-10-23).
            raf = window.requestAnimationFrame(() => focusEl.focus({ preventScroll: true }));
          }
        } else if (frame++ < deadline) {
          raf = window.requestAnimationFrame(seek);
        } else {
          toTop();
        }
      };
      seek();
    }

    // Move focus to the new page. In a single-page app the browser does not do
    // this for you: without it the page scrolls to the top while keyboard focus
    // stays on the nav link that was just clicked, so the next Tab continues
    // through the menu rather than into the content, and a screen reader is
    // never told the page changed. Skipped on first mount so arriving at a URL
    // directly does not yank focus out of the address bar.
    if (firstRender.current) {
      firstRender.current = false;
    } else if (!(isSalesforce && location.hash)) {
      // On Salesforce pages a hash arrival focuses its own target (above).
      mainRef.current?.focus();
    }

    // Cancel a seek still in flight, or navigating away mid-retry leaves a loop
    // running that will yank the NEXT page to an element that is not on it.
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
    };
    // location.hash is a dependency too: navigating from /capabilities to
    // /capabilities#verify-credentials changes only the fragment, and without it
    // the effect never runs and the link appears to do nothing.
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {/*
        The one place glass earns its keep: a sticky bar that content scrolls
        under. Used as a general card treatment it is a 2021 relic, but here it
        gives the bar depth without a shadow and keeps the page feeling
        continuous.

        Two details that matter:
        - The fallback is bg-white/90. `backdrop-filter` is unsupported or
          disabled often enough (older browsers, some privacy settings, forced
          reduced-transparency) that a bar relying on blur for legibility fails
          open. Where blur IS supported we drop to /70 and let it do the work.
        - Even at /70 over the dark hero the bar resolves near-white, so the
          ink nav links stay well above 4.5:1. Anything more transparent and
          the links start to swim.

        Container width changed from max-w-7xl (1280px) to 1200px so the logo
        lines up with the page content below it - they were 40px out of step.
      */}
      {/* The bar itself goes inert with the rest of the page while the drawer is
          open. Its logo and burger sit behind the overlay but stayed in the tab
          order and in the accessibility tree - the same bug <main> and <footer>
          were already fixed for. */}
      <nav
        className={`sticky top-0 z-50 border-b border-oa-hairline backdrop-blur-xl ${
          isSalesforce ? "bg-white/95" : "bg-white/90 supports-[backdrop-filter]:bg-white/70"
        }`}
        aria-hidden={mobileMenuOpen}
        {...backgroundInert}
      >
        {isSalesforce && <div aria-hidden="true" className="oa-progress-sf" />}
        <div className={`mx-auto ${FRAME[frame]}`}>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex min-h-11 flex-shrink-0 items-center"
              aria-label="OneAlgorithm home"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <OneAlgorithmText size="md" oneTone={contrastLogo ? "contrast" : "brand"} />
            </Link>

            {/* Desktop Navigation */}
            {/*
              No "Home" item. The logo to the left of this nav already links to
              "/", which is the convention every visitor knows, so the item was
              a duplicate taking up space next to About. The homepage stays
              reachable by crawlers through that logo link.
            */}
            <div className="hidden lg:flex items-center space-x-8">
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
                href="/blog"
                className="text-gray-900 hover:text-onealgo-blue-950 transition-colors"
              >
                Blog
              </a>
              <a
                href="/careers"
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
                  /*
                    No aria-label. The button says "Services" on screen, and an
                    aria-label REPLACES that as the accessible name - so it read
                    as "Open services menu", which is a WCAG 2.5.3 (Label in
                    Name) failure: someone using voice control says the words
                    they can see, "Services", and nothing matches. The state is
                    already carried by aria-expanded, which is what "Open" was
                    trying to say and says badly - it never changed to "Close".
                  */
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {/* Always in the DOM (prerendered); `hidden` = display:none until opened. */}
                <div
                  hidden={!servicesDropdownOpen}
                  className="absolute top-full left-0 z-50 mt-2 w-[44rem] max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white p-5 shadow-lg"
                  id="services-menu"
                >
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                    {NAV_GROUPS.map((g) => (
                      <div key={g.title}>
                        <Link
                          to={g.to}
                          className="block text-xs font-semibold uppercase tracking-wide text-onealgo-blue-950 hover:underline"
                          onClick={() => {
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          {g.title}
                        </Link>
                        <ul className="mt-1">
                          {g.links.map((item) => (
                            <li key={item.to}>
                              <Link
                                to={item.to}
                                className="block py-1.5 text-sm text-gray-700 transition-colors hover:text-onealgo-blue-950"
                                onClick={() => {
                                  setServicesDropdownOpen(false);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/services"
                    className="mt-4 block border-t border-gray-100 pt-3 text-sm font-medium text-onealgo-blue-950 hover:underline"
                    onClick={() => {
                      setServicesDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    All services
                  </Link>
                </div>
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
                  /* Same as Services above - the visible text is the name. */
                >
                  Industries We Serve
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${industriesDropdownOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  hidden={!industriesDropdownOpen}
                  className="absolute top-full left-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg"
                  id="industries-menu"
                >
                  <ul className="py-2">
                    {INDUSTRY_LINKS.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="block px-4 py-2 text-gray-700 transition-colors hover:bg-onealgo-light hover:text-onealgo-blue-950"
                          onClick={() => {
                            setIndustriesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/*
                Contact CTA. This was removed once as visual clutter, on the
                reasoning that "Contact is still reachable from the footer, from
                the Services menu, and from the CTA sections". Two thirds of that
                was wrong: Contact is NOT in the Services menu, and the CTA
                sections are page content, not navigation. That left the one
                thing that follows the visitor down every page - this bar - with
                no route to the form at all, on the only breakpoint that has no
                pinned CTA (mobile keeps one at the bottom of its drawer).

                Same PrimaryCTA the pages use, so there is one primary button
                treatment on the site rather than a header-only variant. Sized
                down to h-10 to sit inside the 64px bar; #ffa634 is a fill under
                dark ink here, never a text or border colour.
              */}
              {isSalesforce ? (
                <>
                  {/* Salesforce pages (spec 2.16): the office number in the
                      bar. Full number at 1280+; a 44px icon at 1024-1279. */}
                  <a
                    href="tel:+16108909711"
                    data-cta="header"
                    className="group hidden min-h-11 min-w-11 items-center justify-center gap-2 font-mono text-[15px] tabular-nums text-oa-ink transition-colors duration-150 hover:text-oa-blue lg:inline-flex"
                  >
                    <span
                      aria-hidden="true"
                      className="hidden h-[7px] w-[7px] border border-oa-blue transition-colors duration-150 group-hover:bg-oa-blue xl:inline-block"
                    />
                    <span className="hidden xl:inline">(610) 890-9711</span>
                    <Phone className="h-5 w-5 xl:hidden" aria-hidden="true" />
                    <span className="sr-only xl:hidden">Call (610) 890-9711</span>
                  </a>
                  {hasDesk ? (
                    <PrimaryCTA href="#start" cta="header" tone="light" className="h-10 px-5">
                      Free health check
                    </PrimaryCTA>
                  ) : (
                    <PrimaryCTA to="/contact?need=salesforce" cta="header" tone="light" className="h-10 px-5">
                      Free health check
                    </PrimaryCTA>
                  )}
                </>
              ) : (
                <PrimaryCTA to={pageOffer.href} cta="header" tone="light" className="h-10 px-5">
                  {pageOffer.label}
                </PrimaryCTA>
              )}
            </div>

            {/* Mobile menu button */}
            {/* Measured open at 390x844: the hit area was the glyph and nothing
                else, 24x24, against the 44 that WCAG 2.5.5 and the iOS HIG both
                ask for. h-11 w-11 is 44; the negative margin keeps the icon
                optically where it already sat rather than shunting the bar. */}
            <div className="lg:hidden">
              <button
                ref={burgerButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-900 hover:text-onealgo-blue-950"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
                aria-label={
                  mobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
              >
                {mobileMenuOpen ? (
                  <X size={24} aria-hidden="true" />
                ) : (
                  <Menu size={24} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {/*
        This lives OUTSIDE <nav>, and that is load-bearing rather than tidiness.

        The drawer is `fixed inset-0`, and it used to be a child of the sticky
        bar - which carries `backdrop-blur-xl`. An element with a backdrop-filter
        becomes the containing block for its fixed-position descendants, so
        `inset-0` resolved to the 64px-tall bar, not the viewport. Measured on a
        390x844 iPhone viewport before this change: the panel was 390x64, the
        scrolling link area was 24px tall, and elementFromPoint over the middle
        of the "About" row returned the orange Contact button underneath it. A
        finger aiming at the first nav item hit the CTA. The menu had been
        screenshotted but never opened.

        Nothing between here and <body> has a filter, transform or containing
        `contain`, so `fixed` now means the viewport. Keep it that way.
      */}
      {mobileMenuOpen && (
        <div
          ref={mobilePanelRef}
          id="mobile-nav"
          className="lg:hidden fixed inset-0 z-[100] flex flex-col overscroll-contain bg-white"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
            <Link
              to="/"
              className="flex min-h-[44px] items-center"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <OneAlgorithmText size="md" oneTone={contrastLogo ? "contrast" : "brand"} />
            </Link>
            <button
              ref={closeButtonRef}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-900"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          {/* flex-1 inside a flex column, rather than the old
                  max-h-[calc(100vh-64px)]. The 64px was a guess at the header's
                  real height, and on a phone the visible area is shorter than
                  100vh because the browser's own chrome overlaps it - so the
                  bottom of the menu sat off screen with no way to scroll to it.

                  overscroll-contain so reaching the end of this list does not
                  hand the gesture to the page behind. body{overflow:hidden} is
                  not enough on its own - iOS Safari happily scroll-chains past
                  it, which is what makes an overlay feel like it is sliding
                  around on top of a live page. */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
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
                href="/blog"
                className="block rounded-lg px-3 py-3.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="/careers"
                className="block rounded-lg px-3 py-3.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-onealgo-blue-950"
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </a>

              <div className="mt-2 border-t border-gray-100 pt-2">
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50"
                  aria-expanded={servicesDropdownOpen}
                  aria-controls="mobile-services"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                <div id="mobile-services" hidden={!servicesDropdownOpen} className="pl-4">
                  {NAV_GROUPS.map((g) => (
                    <div key={g.title}>
                      <Link
                        to={g.to}
                        className="flex min-h-[44px] items-center px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-onealgo-blue-950"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setServicesDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {g.title}
                      </Link>
                      {g.links.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={mobileSubLink}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
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
                    aria-hidden="true"
                  />
                </button>

                <div id="mobile-industries" hidden={!industriesDropdownOpen} className="pl-4">
                  {INDUSTRY_LINKS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={mobileSubLink}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIndustriesDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
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
              className="block w-full rounded-xl bg-oa-orange px-4 py-3.5 text-center text-base font-semibold text-oa-ink transition-colors hover:bg-[#ffb757]"
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
        <RailSeenContext.Provider value={railSeen.current}>
          {jobSlug && (
            <StructuredData
              data={createBreadcrumbSchema([
                { label: "Home", to: "/" },
                { label: "Careers", to: "/careers" },
                { label: jobSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") },
              ])}
            />
          )}
          <FrameContext.Provider value={frame}>{children}</FrameContext.Provider>
        </RailSeenContext.Provider>
      </main>

      {/* Footer */}
      <footer
        className={`bg-oa-night text-oa-nightInk${isSalesforce ? " pb-20 lg:pb-0" : location.pathname !== "/contact" ? " pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0" : ""}`}
        aria-hidden={mobileMenuOpen}
        {...backgroundInert}
      >
        {/* The footer now shares the dark ground with the closing section above
            it, so the boundary needs a hairline rather than a colour change,
            and the top padding is trimmed - two stacked sections of the same
            colour were reading as one long empty band. */}
        <div className={`mx-auto ${FRAME[frame]} border-t border-white/10 pt-10 pb-8`}>
          {/* Not on Salesforce pages (spec 2.16, INT-17): a strip of other
              vendors' logos under a Salesforce page reads as claimed partners. */}
          {!isSalesforce && location.pathname !== "/contact" && <TrustedPartnerships />}

          {/* Footer reorganised 2026-10-09 (Louis: "our footer is unorganized
              looking"). One 21-link Services column became three groups;
              every href is unchanged. Mobile: brand, contact and
              certifications stay visible; the three link groups are native
              <details> disclosures (see FooterSection). */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.4fr_repeat(5,1fr)] lg:gap-6">
            {/* Brand, contact, certifications */}
            <div className="mb-6 md:mb-0">
              <OneAlgorithmText size="md" className="text-white mb-3" />
              <p className="mb-5 max-w-md text-sm leading-relaxed text-oa-nightInk2">
                We streamline operations, automate the busywork, and build tools
                that let you focus on what matters: growing your business.
              </p>

              {/* Social Media Icons. p-3.5 around a 16px glyph is a 44px
                  target on a phone; desktop keeps the tighter 36px circle. */}
              <div className="flex flex-wrap gap-2.5 lg:gap-2">
                <a
                  href="https://www.linkedin.com/company/onealgorithmllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/[0.06] hover:bg-oa-blue p-3.5 md:p-2.5 rounded-full transition-colors duration-200"
                  title="LinkedIn"
                  aria-label={`LinkedIn${newTab}`}
                >
                  <svg
                    className="w-4 h-4 text-oa-nightInk2 group-hover:text-white"
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
                  className="group bg-white/[0.06] hover:bg-oa-blue p-3.5 md:p-2.5 rounded-full transition-colors duration-200"
                  title="TikTok"
                  aria-label={`TikTok${newTab}`}
                >
                  <svg
                    className="w-4 h-4 text-oa-nightInk2 group-hover:text-white"
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
                  className="group bg-white/[0.06] hover:bg-oa-blue p-3.5 md:p-2.5 rounded-full transition-colors duration-200"
                  title="YouTube"
                  aria-label={`YouTube${newTab}`}
                >
                  <svg
                    className="w-4 h-4 text-oa-nightInk2 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/people/One-Algorithm/61578073689046/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/[0.06] hover:bg-oa-blue p-3.5 md:p-2.5 rounded-full transition-colors duration-200"
                  title="Facebook"
                  aria-label={`Facebook${newTab}`}
                >
                  <svg
                    className="w-4 h-4 text-oa-nightInk2 group-hover:text-white"
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
                  className="group bg-white/[0.06] hover:bg-oa-blue p-3.5 md:p-2.5 rounded-full transition-colors duration-200"
                  title="Instagram"
                  aria-label={`Instagram${newTab}`}
                >
                  <svg
                    className="w-4 h-4 text-oa-nightInk2 group-hover:text-white"
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
                  className="group bg-white/[0.06] hover:bg-oa-blue p-3.5 md:p-2.5 rounded-full transition-colors duration-200"
                  title="Google Business Profile"
                  aria-label={`Google Business Profile${newTab}`}
                >
                  <svg
                    className="w-4 h-4 text-oa-nightInk2 group-hover:text-white"
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

              {/* A contact block was removed here earlier at the client's
                  request. Louis 2026-10-09 asked for phone + town back; 2026-10-31
                  reversed it for local SEO: the full NAP must match the Google
                  Business Profile exactly. No email: the site publishes none. */}
              <p className="mt-4 text-sm text-oa-nightInk2">
                OneAlgorithm, 625 Swedesford Rd, Unit B, Malvern, PA 19355
                <span aria-hidden="true"> · </span>
                <a
                  href="tel:+16108909711"
                  className="inline-block py-3 md:py-0 hover:text-oa-nightInk transition-colors"
                >
                  (610) 890-9711
                </a>
                <span aria-hidden="true"> · </span>
                Mon–Fri 9–5
              </p>

              {/* Certifications. SBA WOSB/EDWOSB, PA COSTARS and Virginia SWaM
                  were removed from here 2026-08-25 - they say "set-aside
                  vendor" to commercial buyers - and stay on
                  /industries/government and /capabilities. WBENC/NMSDC have no
                  public verification page, so they point at /capabilities. */}
              <h3 className="mt-4 mb-1 md:mt-6 md:mb-3 text-xs font-semibold uppercase tracking-wide text-oa-nightInk3">
                Partners &amp; certifications
              </h3>
              <p className="text-sm text-oa-nightInk2">
                <a
                  href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000EV7SwUAL"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center hover:text-oa-nightInk md:min-h-0"
                >
                  Salesforce Consulting Partner{extMark}
                </a>
                <span aria-hidden="true"> · </span>
                <Link to="/capabilities" className="inline-flex min-h-11 items-center hover:text-oa-nightInk md:min-h-0">
                  WBENC Certified WBE
                </Link>
                <span aria-hidden="true"> · </span>
                <Link to="/capabilities" className="inline-flex min-h-11 items-center hover:text-oa-nightInk md:min-h-0">
                  NMSDC Certified MBE
                </Link>
              </p>
            </div>

            {/* Footer per site-architecture spec 2.3: one heading per service family, keyword anchors. */}
            <FooterSection title="Services">
              <FooterLink to="/services">All services</FooterLink>
              <FooterLink to="/services/website-development">Website Development</FooterLink>
              <FooterLink to="/services/seo">SEO Services</FooterLink>
              <FooterLink to="/services/google-ads">Google Ads Management</FooterLink>
              <FooterLink to="/services/marketing">Marketing and Social Media</FooterLink>
              <FooterLink to="/services/application-development">Custom App Development</FooterLink>
              <FooterLink to="/services/martech">MarTech and Marketing Automation</FooterLink>
              <FooterLink to="/services/it-consulting">IT Consulting</FooterLink>
              <FooterLink to="/services/staff-augmentation">Staff Augmentation</FooterLink>
              <FooterLink to="/services/operational-transformation-consulting">Operational Transformation Consulting</FooterLink>
              <FooterLink to="/services/zendesk">Zendesk Implementation</FooterLink>
            </FooterSection>

            <FooterSection title="Websites and locations">
              <FooterLink to="/services/web-design-philadelphia">Web Design Philadelphia</FooterLink>
              <FooterLink to="/services/web-design-chester-county">Web Design Chester County</FooterLink>
              <FooterLink to="/services/small-business-website-design">Small Business Website Design</FooterLink>
              <FooterLink to="/services/website-redesign">Website Redesign</FooterLink>
              <FooterLink to="/services/website-cost">How Much Does a Website Cost</FooterLink>
              <FooterLink to="/services/seo-chester-county">Chester County SEO</FooterLink>
              <FooterLink to="/services/google-ads-philadelphia">Google Ads Philadelphia</FooterLink>
              <FooterLink to="/services/website-development#locations">Web Design by City and State</FooterLink>
            </FooterSection>

            {/* The 13 city pages are NOT here (a blind review on 2026-10-22 read city links site-wide
                as stuffing); on Salesforce pages they get their own row below. */}
            <FooterSection title="Salesforce">
              <FooterLink to="/services/salesforce">Salesforce Consulting</FooterLink>
              <FooterLink to="/services/salesforce-health-check">Free Salesforce Health Check</FooterLink>
              <FooterLink to="/services/salesforce-data-migration">Salesforce Data Migration</FooterLink>
              <FooterLink to="/services/salesforce-integration">Salesforce Integration</FooterLink>
              <FooterLink to="/services/salesforce-managed-services">Salesforce Managed Services</FooterLink>
              <FooterLink to="/services/salesforce-marketing-cloud-consulting">Marketing Cloud Consulting</FooterLink>
              <FooterLink to="/services/salesforce-implementation-cost">Salesforce Implementation Cost</FooterLink>
              <FooterLink to="/services/salesforce-consultant-philadelphia">Salesforce Consultant Philadelphia</FooterLink>
              <FooterLink to="/services/salesforce-consulting-partner-pennsylvania">Salesforce Partner in Pennsylvania</FooterLink>
              <FooterLink to="/services/hire-salesforce-developers">Hire Salesforce developers</FooterLink>
            </FooterSection>

            <FooterSection title="Industries">
              <FooterLink to="/industries/construction">Construction Software Integration</FooterLink>
              <FooterLink to="/industries/manufacturing">Manufacturing ERP Integration</FooterLink>
              <FooterLink to="/industries/ecommerce">E-Commerce Website Development</FooterLink>
              <FooterLink to="/industries/government">Government IT Services</FooterLink>
              <FooterLink to="/industries/marketing">Marketing Agencies and Teams</FooterLink>
            </FooterSection>

            <FooterSection title="Company">
              <FooterLink to="/about">About OneAlgorithm</FooterLink>
              <FooterLink to="/capabilities">Capabilities and Certifications</FooterLink>
              {/* Ghost at /blog - not an SPA route, so a plain <a>. */}
              <a href="/blog" className={footerLink}>
                Blog
              </a>
              <a href="/careers" className={footerLink}>
                Careers
              </a>
              <FooterLink to="/contact">Contact</FooterLink>
              {/* Firm's own GBP listing. Louis 2026-08-25: "add our google business review link". */}
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJnQw01SfzxokRJhcvpzCljCE"
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                Review Us on Google{extMark}
              </a>
              <FooterLink to="/ai-info">AI Information</FooterLink>
            </FooterSection>
          </div>

          {/* Bottom bar. Previously three separately bordered blocks stacked on
              top of each other - copyright, trademark disclaimer, E-Verify -
              each with its own 16px margin and 16px padding. That alone was
              roughly 180px of footer. All three still say exactly the same
              thing; they now share one row and one rule. */}
          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
            {/* "We participate in E-Verify" was a bare assertion on all 26
                pages. It now lands on the verification block at the foot of
                /capabilities — the company ID, the enrollment date and the DHS
                search tool — rather than the top of that page, which is why the
                route effect above honours the fragment. The link is internal on
                purpose: the proof is worth reaching, but 26 pages of outbound
                links to a federal site hand that site the authority instead of
                earning us any. */}
            <p className="text-xs text-oa-nightInk3">
              © {new Date().getFullYear()} OneAlgorithm LLC. All rights reserved. ·{" "}
              <Link
                to="/capabilities#verify-credentials"
                className="inline-block py-3 underline decoration-white/25 underline-offset-2 transition-colors hover:text-oa-nightInk"
              >
                Our own employees are verified through E-Verify.
              </Link>
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                to="/privacy"
                className="inline-flex min-h-11 items-center text-xs text-oa-nightInk2 transition-colors hover:text-oa-nightInk"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="inline-flex min-h-11 items-center text-xs text-oa-nightInk2 transition-colors hover:text-oa-nightInk"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Terms &amp; Conditions
              </Link>
              <a
                href="/sitemap.xml"
                className="inline-flex min-h-11 items-center text-xs text-oa-nightInk2 transition-colors hover:text-oa-nightInk"
              >
                Sitemap
              </a>
            </div>
          </div>

          {/* Salesforce Trademark & Copyright Usage Guidelines: the attribution
              belongs in the credit/end section, so on the 22 Salesforce pages it
              lives here (moved from the hub body 2026-10-23), naming every mark
              those pages use. Inside the footer, never below it. */}
          {isSalesforce && (
            <nav aria-label="Salesforce consultants by city" className="mt-6 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-oa-nightInk3">Salesforce consultants by city</p>
              <ul className="mt-1 flex flex-wrap gap-x-5">
                {SF_CITY_LINKS.filter((c) => !c.to.endsWith("-houston")).map((c) => ( /* Houston: routed, not linked until its gate (spec D9) */
                  <li key={c.to}>
                    <Link to={c.to} className="inline-flex min-h-11 min-w-11 items-center text-sm text-oa-nightInk2 transition-colors hover:text-oa-nightInk">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {isSalesforce && (
            <p className="mt-4 max-w-[75ch] text-[11px] leading-relaxed text-oa-nightInk3">
              Salesforce, AppExchange, Sales Cloud, Service Cloud, Marketing
              Cloud, Experience Cloud, Commerce Cloud, Field Service, Account
              Engagement, Pardot, CRM Analytics, Data 360, Hyperforce,
              Salesforce Connect, MuleSoft, Trailhead, Trailblazer and Agentforce
              are trademarks of Salesforce, Inc., as are other Salesforce marks
              named on this page. One Algorithm LLC is an independent consulting
              partner and is not affiliated with or endorsed by Salesforce
              beyond its listed partnership.
            </p>
          )}
          <p className="mt-4 max-w-[75ch] text-[11px] leading-relaxed text-oa-nightInk3/70">
            All product names, logos, and brands are property of their
            respective owners. Use of these names, logos, and brands does not
            imply endorsement.
          </p>
        </div>
      </footer>
      {!isSalesforce && location.pathname !== "/contact" && <StickyCallBar />}
      {/* Fixed, so it overlays rather than renders below the footer; the
          footer's own pb-20 on these pages keeps its last line clear of it. */}
      {isSalesforce && (
        <div
          data-sf-bar=""
          aria-hidden={!sfBarVisible}
          {...sfBarInert}
          className={`fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-white/10 bg-oa-night/95 px-4 pt-3 backdrop-blur transition-transform duration-200 [transition-timing-function:cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none lg:hidden ${
            sfBarVisible ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <a
            href="tel:+16108909711"
            data-cta="bar"
            className="flex min-h-12 flex-1 items-center justify-center rounded-lg border border-white/25 text-sm font-semibold text-oa-nightInk"
          >
            Call (610) 890-9711
          </a>
          {hasDesk ? (
            <a
              href="#start"
              data-cta="bar"
              className="flex min-h-12 flex-1 items-center justify-center rounded-lg bg-oa-orange text-sm font-semibold text-oa-ink"
            >
              Free health check
            </a>
          ) : (
            <Link
              to="/contact?need=salesforce"
              data-cta="bar"
              className="flex min-h-12 flex-1 items-center justify-center rounded-lg bg-oa-orange text-sm font-semibold text-oa-ink"
            >
              Free health check
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(Layout);
