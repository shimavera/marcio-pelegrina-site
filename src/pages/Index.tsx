import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutLenses from "@/components/AboutLenses";
import CasesGallery from "@/components/CasesGallery";
import ClinicCarousel from "@/components/ClinicCarousel";
import Testimonials from "@/components/Testimonials";
import RecentBlogPosts from "@/components/RecentBlogPosts";
import MedicalInsurance from "@/components/MedicalInsurance";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Services />
        <AboutLenses />
        <CasesGallery />
        <ClinicCarousel />
        <Testimonials />
        <RecentBlogPosts />
        
        <Contact />
      </main>
      <Footer />
    </div>;
};
export default Index;