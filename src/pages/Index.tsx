import { lazy, Suspense } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutLenses from "@/components/AboutLenses";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy load componentes pesados (abaixo do fold)
const CasesGallery = lazy(() => import("@/components/CasesGallery"));
const ClinicCarousel = lazy(() => import("@/components/ClinicCarousel"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const SectionFallback = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

const Index = () => {
  return <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Services />
        <AboutLenses />
        <Suspense fallback={<SectionFallback />}>
          <CasesGallery />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ClinicCarousel />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>;
};
export default Index;