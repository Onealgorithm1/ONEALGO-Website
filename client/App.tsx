import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Industries from "./pages/Industries";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Careers from "./pages/Careers";
import Construction from "./pages/industries/Construction";
import Manufacturing from "./pages/industries/Manufacturing";
import Marketing from "./pages/industries/Marketing";
import ECommerce from "./pages/industries/ECommerce";
import WebsiteDevelopment from "./pages/industries/WebsiteDevelopment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/construction" element={<Construction />} />
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route path="/industries/marketing" element={<Marketing />} />
          <Route path="/industries/ecommerce" element={<ECommerce />} />
          <Route path="/industries/website-development" element={<WebsiteDevelopment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/careers" element={<Careers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
