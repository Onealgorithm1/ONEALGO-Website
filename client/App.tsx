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

import { createRoot } from "react-dom/client";
// import { NotificationProvider } from "@/components/SimpleNotifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

import Index from "./pages/Index";
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Construction = lazy(() => import("./pages/industries/Construction"));
const Manufacturing = lazy(() => import("./pages/industries/Manufacturing"));
const ECommerce = lazy(() => import("./pages/industries/ECommerce"));
const IndustryMarketing = lazy(() => import("./pages/industries/Marketing"));
const IndustryWebsiteDevelopment = lazy(
  () => import("./pages/industries/WebsiteDevelopment"),
);
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
const WebDesignChesterCounty = lazy(
  () => import("./pages/services/WebDesignChesterCounty"),
);
const WebDesignPhiladelphia = lazy(
  () => import("./pages/services/WebDesignPhiladelphia"),
);
const GoogleAdsPhiladelphia = lazy(
  () => import("./pages/services/GoogleAdsPhiladelphia"),
);
const StaffAugmentation = lazy(
  () => import("./pages/services/StaffAugmentation"),
);
const ITConsulting = lazy(() => import("./pages/services/ITConsulting"));
const OperationsTechnology = lazy(
  () => import("./pages/services/OperationsTechnology"),
);
const OracleERP = lazy(() => import("./pages/services/OracleERP"));
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
                path="/services/web-design-chester-county"
                element={<WebDesignChesterCounty />}
              />
              <Route
                path="/services/web-design-philadelphia"
                element={<WebDesignPhiladelphia />}
              />
              <Route
                path="/services/google-ads-philadelphia"
                element={<GoogleAdsPhiladelphia />}
              />
              <Route
                path="/services/staff-augmentation"
                element={<StaffAugmentation />}
              />
              <Route
                path="/services/it-consulting"
                element={<ITConsulting />}
              />
              <Route
                path="/services/operations-technology"
                element={<OperationsTechnology />}
              />
              <Route path="/services/oracle-erp" element={<OracleERP />} />
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
              <Route
                path="/industries/website-development"
                element={<IndustryWebsiteDevelopment />}
              />
              <Route path="/industries/government" element={<Government />} />
              <Route path="/contact" element={<Contact />} />
              {/* No /blog route here on purpose. Ghost serves onealgorithm.com/blog
                  itself, via a Cloudflare Worker route that runs ahead of Pages, so
                  the request never reaches this router. Adding a Route for it would
                  make in-app navigation render a 404 over a page that works. */}
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

if (!root) {
  root = createRoot(container);
  (container as any)._reactRoot = root;
}

root.render(<App />);
