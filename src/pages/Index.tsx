import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutLenses from "@/components/AboutLenses";
import ClinicCarousel from "@/components/ClinicCarousel";
import Testimonials from "@/components/Testimonials";
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
        <ClinicCarousel />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>;
};
export default Index;