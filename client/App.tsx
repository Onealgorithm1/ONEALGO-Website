import "./global.css";

// Initialize Sentry (loaded dynamically from CDN) when DSN is available at runtime
(function initSentryClient() {
  try {
    var SENTRY_DSN = (window as any).__SENTRY_DSN__;
    if (!SENTRY_DSN) return;
    var script = document.createElement("script");
    script.src = "https://browser.sentry-cdn.com/7.49.0/bundle.min.js";
    script.crossOrigin = "anonymous";
    // Subresource integrity. This is someone else's code, fetched from someone
    // else's CDN, and it runs with full access to every page. The hash pins the
    // exact bundle, so a swapped or tampered file is refused by the browser
    // instead of executing as first-party script.
    //
    // Computed from the 7.49.0 bundle itself. It is tied to that version - bump
    // the URL and this must be recomputed, or the SDK will silently stop loading:
    //   curl -s <url> | openssl dgst -sha384 -binary | openssl base64 -A
    script.integrity =
      "sha384-Lpv5DY+MKevqNvQYw6msQkBal57DT2ZZPXgeYCTjIKdyTFCLbsAdTmpL0oqj7Yyi";
    script.onload = function () {
      try {
        if ((window as any).Sentry && SENTRY_DSN) {
          // One integration, not two. This previously read
          // `new BrowserTracing() && new BrowserTracing()`, which constructs the
          // first, discards it, and keeps the second.
          // @ts-ignore
          (window as any).Sentry.init({
            dsn: SENTRY_DSN,
            integrations: [new (window as any).Sentry.BrowserTracing()],
            tracesSampleRate: 0.0,
          });
        }
      } catch (e) {
        try {
          console.error("Sentry init failed", e);
        } catch (e) {}
      }
    };
    script.onerror = function () {
      try {
        console.warn("Sentry SDK failed to load");
      } catch (e) {}
    };
    document.head.appendChild(script);
  } catch (e) {}
})();

import { createRoot, hydrateRoot } from "react-dom/client";
// import { NotificationProvider } from "@/components/SimpleNotifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

import Index from "./pages/Index";
import { PLACES } from "./data/wd-local/places";
import { SVC_PLACES } from "./data/svc-local/index";
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogAuthor = lazy(() => import("./pages/Blog").then((m) => ({ default: m.BlogAuthor })));
const Careers = lazy(() => import("./pages/Careers"));
const Terms = lazy(() => import("./pages/Terms"));
const Construction = lazy(() => import("./pages/industries/Construction"));
const Manufacturing = lazy(() => import("./pages/industries/Manufacturing"));
const ECommerce = lazy(() => import("./pages/industries/ECommerce"));
const IndustryMarketing = lazy(() => import("./pages/industries/Marketing"));
const Government = lazy(() => import("./pages/industries/Government"));
const WebsiteDevelopment = lazy(
  () => import("./pages/services/WebsiteDevelopment"),
);
const ApplicationDevelopment = lazy(
  () => import("./pages/services/ApplicationDevelopment"),
);
const Marketing = lazy(() => import("./pages/services/Marketing"));
const Seo = lazy(() => import("./pages/services/Seo"));
const Martech = lazy(() => import("./pages/services/Martech"));
const GoogleAds = lazy(() => import("./pages/services/GoogleAds"));
const SeoChesterCounty = lazy(
  () => import("./pages/services/SeoChesterCounty"),
);
const WebDesignChesterCounty = lazy(
  () => import("./pages/services/WebDesignChesterCounty"),
);
const WebDesignPhiladelphia = lazy(
  () => import("./pages/services/WebDesignPhiladelphia"),
);
/* Website-development wave 1-2 + rev 4 (2026-10-24): three service pages and the generated place pages
   (scripts/wd-local-gen.mjs -> data/wd-local/places.ts; one lazy chunk per place inside LocalRoute). */
const WebsiteCost = lazy(() => import("./pages/services/WebsiteCost"));
const SmallBusinessWebsiteDesign = lazy(() => import("./pages/services/SmallBusinessWebsiteDesign"));
const WebsiteRedesign = lazy(() => import("./pages/services/WebsiteRedesign"));
const WebDesignPlace = lazy(() => import("./components/wd/LocalRoute"));
const ServicePlace = lazy(() => import("./components/wd/SvcLocalRoute"));
const GoogleAdsPhiladelphia = lazy(
  () => import("./pages/services/GoogleAdsPhiladelphia"),
);
/* Salesforce local trio, added 2026-09-01. ⛔ Adding a route here is only half
   the job — it must also go into scripts/prerender.mjs ROUTES and
   public/sitemap.xml, or Cloudflare has no file to serve and it 404s live.
   /services/application-development shipped routed-but-unlisted and did
   exactly that on 2026-08-29. */
const SalesforceCity = lazy(() => import("./pages/services/SalesforceCity"));
const SalesforceDataMigration = lazy(() => import("./pages/services/SalesforceDataMigration"));
const SalesforceIntegration = lazy(() => import("./pages/services/SalesforceIntegration"));
const SalesforceManagedServices = lazy(() => import("./pages/services/SalesforceManagedServices"));
const SalesforceHealthCheck = lazy(() => import("./pages/services/SalesforceHealthCheck"));
const SalesforceMarketingCloud = lazy(() => import("./pages/services/SalesforceMarketingCloud"));
const SalesforceConsultantPhiladelphia = lazy(
  () => import("./pages/services/SalesforceConsultantPhiladelphia"),
);
const SalesforceImplementationCost = lazy(
  () => import("./pages/services/SalesforceImplementationCost"),
);
const OperationalTransformationConsulting = lazy(
  () => import("./pages/services/OperationalTransformationConsulting"),
);
const SalesforceConsultantChesterCounty = lazy(
  () => import("./pages/services/SalesforceConsultantChesterCounty"),
);
const SalesforcePartnerPennsylvania = lazy(
  () => import("./pages/services/SalesforcePartnerPennsylvania"),
);
const StaffAugmentation = lazy(
  () => import("./pages/services/StaffAugmentation"),
);
const ITConsulting = lazy(() => import("./pages/services/ITConsulting"));
const Salesforce = lazy(() => import("./pages/services/Salesforce"));
const Zendesk = lazy(() => import("./pages/services/Zendesk"));
const Capabilities = lazy(() => import("./pages/Capabilities"));
const AiInfo = lazy(() => import("./pages/AiInfo"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component. role="status" with a name, because a bare spinning div is
// invisible to a screen reader - it announced nothing at all while a page loaded.
// The label is visually hidden so sighted users still just see the spinner.
const PageLoader = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    role="status"
    aria-live="polite"
  >
    <div
      className="animate-spin rounded-full h-8 w-8 border-b-2 border-onealgo-blue-950"
      aria-hidden="true"
    ></div>
    <span className="sr-only">Loading page</span>
  </div>
);

const App = () => (
  <ErrorBoundary>
      {/* <NotificationProvider> */}
      <BrowserRouter>
        <ErrorBoundary
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Page Loading Error
                </h1>
                <p className="text-gray-600 mb-4">
                  Unable to load the requested page.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-onealgo-blue-950 text-white rounded hover:bg-onealgo-blue-800"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          }
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route
                path="/services/website-development"
                element={<WebsiteDevelopment />}
              />
              <Route
                path="/services/application-development"
                element={<ApplicationDevelopment />}
              />
              <Route path="/services/marketing" element={<Marketing />} />
              <Route path="/services/seo" element={<Seo />} />
              <Route path="/services/martech" element={<Martech />} />
              <Route path="/services/google-ads" element={<GoogleAds />} />
              <Route
                path="/services/seo-chester-county"
                element={<SeoChesterCounty />}
              />
              <Route
                path="/services/web-design-chester-county"
                element={<WebDesignChesterCounty />}
              />
              <Route
                path="/services/web-design-philadelphia"
                element={<WebDesignPhiladelphia />}
              />
              <Route path="/services/website-cost" element={<WebsiteCost />} />
              <Route path="/services/small-business-website-design" element={<SmallBusinessWebsiteDesign />} />
              <Route path="/services/website-redesign" element={<WebsiteRedesign />} />
              {PLACES.map((p) => (
                <Route key={p.slug} path={p.path} element={<WebDesignPlace slug={p.slug} />} />
              ))}
              {SVC_PLACES.map((p) => (
                <Route key={p.id} path={p.path} element={<ServicePlace id={p.id} />} />
              ))}
              <Route
                path="/services/google-ads-philadelphia"
                element={<GoogleAdsPhiladelphia />}
              />
              <Route
                path="/services/salesforce-consultant-philadelphia"
                element={<SalesforceConsultantPhiladelphia />}
              />
              {/* Salesforce service pages, 2026-10-22 */}
              <Route path="/services/salesforce-data-migration" element={<SalesforceDataMigration />} />
              <Route path="/services/salesforce-integration" element={<SalesforceIntegration />} />
              <Route path="/services/salesforce-managed-services" element={<SalesforceManagedServices />} />
              <Route path="/services/salesforce-health-check" element={<SalesforceHealthCheck />} />
              <Route path="/services/salesforce-marketing-cloud-consulting" element={<SalesforceMarketingCloud />} />
              {/* Wave-2 Salesforce city pages, 2026-10-22 — data in client/data/salesforceCities.ts */}
              <Route
                path="/services/salesforce-consultant-new-york"
                element={<SalesforceCity slug="new-york" />}
              />
              <Route
                path="/services/salesforce-consultant-washington-dc"
                element={<SalesforceCity slug="washington-dc" />}
              />
              <Route
                path="/services/salesforce-consultant-dallas"
                element={<SalesforceCity slug="dallas" />}
              />
              <Route
                path="/services/salesforce-consultant-denver"
                element={<SalesforceCity slug="denver" />}
              />
              <Route
                path="/services/salesforce-consultant-atlanta"
                element={<SalesforceCity slug="atlanta" />}
              />
              <Route
                path="/services/salesforce-consultant-boston"
                element={<SalesforceCity slug="boston" />}
              />
              <Route
                path="/services/salesforce-consultant-seattle"
                element={<SalesforceCity slug="seattle" />}
              />
              <Route
                path="/services/salesforce-consultant-san-francisco"
                element={<SalesforceCity slug="san-francisco" />}
              />
              <Route
                path="/services/salesforce-consultant-los-angeles"
                element={<SalesforceCity slug="los-angeles" />}
              />
              <Route
                path="/services/salesforce-consultant-austin"
                element={<SalesforceCity slug="austin" />}
              />
              <Route
                path="/services/salesforce-consultant-miami"
                element={<SalesforceCity slug="miami" />}
              />
              <Route
                path="/services/salesforce-consultant-chicago"
                element={<SalesforceCity slug="chicago" />}
              />
              <Route
                path="/services/salesforce-consultant-houston"
                element={<SalesforceCity slug="houston" />}
              />
              <Route
                path="/services/salesforce-implementation-cost"
                element={<SalesforceImplementationCost />}
              />
              <Route
                path="/services/operational-transformation-consulting"
                element={<OperationalTransformationConsulting />}
              />
              <Route
                path="/services/salesforce-consultant-chester-county"
                element={<SalesforceConsultantChesterCounty />}
              />
              <Route
                path="/services/salesforce-consulting-partner-pennsylvania"
                element={<SalesforcePartnerPennsylvania />}
              />
              <Route
                path="/services/staff-augmentation"
                element={<StaffAugmentation />}
              />
              <Route
                path="/services/it-consulting"
                element={<ITConsulting />}
              />
              <Route path="/services/salesforce" element={<Salesforce />} />
              <Route path="/services/zendesk" element={<Zendesk />} />
              <Route path="/industries" element={<Industries />} />
              <Route
                path="/industries/construction"
                element={<Construction />}
              />
              <Route
                path="/industries/manufacturing"
                element={<Manufacturing />}
              />
              <Route path="/industries/ecommerce" element={<ECommerce />} />
              <Route
                path="/industries/marketing"
                element={<IndustryMarketing />}
              />
              <Route path="/industries/government" element={<Government />} />
              <Route path="/contact" element={<Contact />} />
              {/* No /blog route here on purpose. Ghost serves onealgorithm.com/blog
                  itself, via a Cloudflare Worker route that runs ahead of Pages, so
                  the request never reaches this router. Adding a Route for it would
                  make in-app navigation render a 404 over a page that works. */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/author/:slug" element={<BlogAuthor />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:slug" element={<Careers />} />
              <Route path="/capabilities" element={<Capabilities />} />
              <Route path="/ai-info" element={<AiInfo />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
      {/* </NotificationProvider> */}
  </ErrorBoundary>
);

// Prevent multiple root creation in development mode
const container = document.getElementById("root")!;

// Check if root already exists on the container
let root = (container as any)._reactRoot;

/* PERF-1 / UX-1 (2026-10-23 fix round): a page that scripts/prerender.mjs wrote
   with React's hydration markers (today: the /services/salesforce* routes; the
   first child of #root is the <!--$--> that opens the <Suspense> boundary below)
   is HYDRATED: React adopts the static DOM instead of replacing it. createRoot
   threw the painted page away, showed the PageLoader spinner while the route's
   lazy chunk loaded, then built the page again, so the LCP element was always
   the React-made copy (mobile LCP 3.5-3.6s) and the page blinked white for
   ~200ms. With the marker, React treats the Suspense boundary as already
   rendered: while the chunk loads the static page stays on screen, and if
   anything on the page does not match, React re-renders that boundary itself,
   which is the old behaviour minus the spinner. Every other route still
   createRoot()s its shell, unchanged. */
const prerendered =
  container.firstChild?.nodeType === Node.COMMENT_NODE && (container.firstChild as Comment).data === "$";

if (!root) {
  if (prerendered) {
    root = hydrateRoot(container, <App />);
  } else {
    root = createRoot(container);
    root.render(<App />);
  }
  (container as any)._reactRoot = root;
} else {
  root.render(<App />);
}
