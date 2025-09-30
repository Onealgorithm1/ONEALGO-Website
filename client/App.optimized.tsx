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

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Import Index immediately (most critical page)
import Index from "./pages/Index";

// Lazy load all other pages
const About = lazy(() => import("./pages/About"));
const Industries = lazy(() => import("./pages/Industries"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Careers = lazy(() => import("./pages/Careers"));
const Events = lazy(() => import("./pages/Events"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load industry pages
const Construction = lazy(() => import("./pages/industries/Construction"));
const Manufacturing = lazy(() => import("./pages/industries/Manufacturing"));
const Marketing = lazy(() => import("./pages/industries/Marketing"));
const ECommerce = lazy(() => import("./pages/industries/ECommerce"));
const WebsiteDevelopment = lazy(
  () => import("./pages/industries/WebsiteDevelopment"),
);

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-onealgo-blue-950"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/construction" element={<Construction />} />
            <Route
              path="/industries/manufacturing"
              element={<Manufacturing />}
            />
            <Route path="/industries/marketing" element={<Marketing />} />
            <Route path="/industries/ecommerce" element={<ECommerce />} />
            <Route
              path="/industries/website-development"
              element={<WebsiteDevelopment />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/events" element={<Events />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
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
