import "./global.css";

// Initialize Sentry (loaded dynamically from CDN) when DSN is available at runtime
(function initSentryClient() {
  try {
    var SENTRY_DSN = (window as any).__SENTRY_DSN__;
    if (!SENTRY_DSN) return;
    var script = document.createElement("script");
    script.src = "https://browser.sentry-cdn.com/7.49.0/bundle.min.js";
    script.crossOrigin = "anonymous";
    script.onload = function () {
      try {
        if ((window as any).Sentry && SENTRY_DSN) {
          // @ts-ignore
          (window as any).Sentry.init({
            dsn: SENTRY_DSN,
            integrations: [
              new (window as any).Sentry.BrowserTracing() &&
                new (window as any).Sentry.BrowserTracing(),
            ],
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { NotificationProvider } from "@/components/SimpleNotifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Direct import for Index to debug loading issues
import Index from "./pages/Index";
// const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Careers = lazy(() => import("./pages/Careers"));
const Events = lazy(() => import("./pages/Events"));
const Construction = lazy(() => import("./pages/industries/Construction"));
const Manufacturing = lazy(() => import("./pages/industries/Manufacturing"));
const ECommerce = lazy(() => import("./pages/industries/ECommerce"));
const IndustryMarketing = lazy(() => import("./pages/industries/Marketing"));
const IndustryWebsiteDevelopment = lazy(
  () => import("./pages/industries/WebsiteDevelopment"),
);
const WebsiteDevelopment = lazy(
  () => import("./pages/services/WebsiteDevelopment"),
);
const Marketing = lazy(() => import("./pages/services/Marketing"));
const Seo = lazy(() => import("./pages/services/Seo"));
const Martech = lazy(() => import("./pages/services/Martech"));
const GoogleAds = lazy(() => import("./pages/services/GoogleAds"));
const Nonprofit = lazy(() => import("./pages/services/Nonprofit"));
const StaffAugmentation = lazy(
  () => import("./pages/services/StaffAugmentation"),
);
const ITConsulting = lazy(() => import("./pages/services/ITConsulting"));
const OperationsTechnology = lazy(
  () => import("./pages/services/OperationsTechnology"),
);
const Blog = lazy(() => import("./pages/Blog"));
const AiInfo = lazy(() => import("./pages/AiInfo"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-onealgo-blue-950"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
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
              <Route path="/services/marketing" element={<Marketing />} />
              <Route path="/services/seo" element={<Seo />} />
              <Route path="/services/martech" element={<Martech />} />
              <Route path="/services/google-ads" element={<GoogleAds />} />
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
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/ai-info" element={<AiInfo />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/events" element={<Events />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
      {/* </NotificationProvider> */}
    </QueryClientProvider>
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
