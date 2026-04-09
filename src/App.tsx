import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import WebVitals from "./components/WebVitals";

// Lazy load route components for better performance
const Services = lazy(() => import("./pages/Services"));
const Especialidade = lazy(() => import("./pages/Especialidade"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Unidades = lazy(() => import("./pages/Unidades"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TreatmentDetail = lazy(() => import("./pages/TreatmentDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const AnalyticsDashboard = lazy(() => import("./pages/AnalyticsDashboard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const LinkBio = lazy(() => import("./pages/LinkBio"));
const Galeria = lazy(() => import("./pages/Galeria"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WebVitals />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/especialidade" element={<Especialidade />} />
            <Route path="/doutores" element={<Doctors />} />
            <Route path="/unidades" element={<Unidades />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/tratamentos/:slug" element={<TreatmentDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/blog" element={<BlogAdmin />} />
            <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
            <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/link-bio" element={<LinkBio />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <WhatsAppButton />
        <ScrollToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
