import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Casos originais
import caso01 from '@/assets/marcio/casos/caso-01.webp';
import caso02 from '@/assets/marcio/casos/caso-02.webp';
import caso03 from '@/assets/marcio/casos/caso-03.webp';
import caso04 from '@/assets/marcio/casos/caso-04.webp';
import caso05 from '@/assets/marcio/casos/caso-05.webp';
import caso06 from '@/assets/marcio/casos/caso-06.webp';
import caso07 from '@/assets/marcio/casos/caso-07.webp';
import caso08 from '@/assets/marcio/casos/caso-08.webp';
import caso09 from '@/assets/marcio/casos/caso-09.webp';
import caso10 from '@/assets/marcio/casos/caso-10.webp';
import caso11 from '@/assets/marcio/casos/caso-11.webp';
import caso12 from '@/assets/marcio/casos/caso-12.webp';
import caso13 from '@/assets/marcio/casos/caso-13.webp';
import caso14 from '@/assets/marcio/casos/caso-14.webp';

// Casos novos — 1 representativo por caso (sem duplicatas)
import novo03 from '@/assets/marcio/casos-novos/novo-03.webp';
import novo08 from '@/assets/marcio/casos-novos/novo-08.webp';
import novo10 from '@/assets/marcio/casos-novos/novo-10.webp';
import novo14 from '@/assets/marcio/casos-novos/novo-14.webp';
import novo18 from '@/assets/marcio/casos-novos/novo-18.webp';
import novo21 from '@/assets/marcio/casos-novos/novo-21.webp';
import novo25 from '@/assets/marcio/casos-novos/novo-25.webp';
import novo28 from '@/assets/marcio/casos-novos/novo-28.webp';
import novo31 from '@/assets/marcio/casos-novos/novo-31.webp';
import novo34 from '@/assets/marcio/casos-novos/novo-34.webp';
import novo38 from '@/assets/marcio/casos-novos/novo-38.webp';

// Instagram
import insta01 from '@/assets/marcio/casos-novos/insta-01.webp';
import insta02 from '@/assets/marcio/casos-novos/insta-02.webp';
import insta03 from '@/assets/marcio/casos-novos/insta-03.webp';
import insta04 from '@/assets/marcio/casos-novos/insta-04.webp';
import insta05 from '@/assets/marcio/casos-novos/insta-05.webp';
import insta06 from '@/assets/marcio/casos-novos/insta-06.webp';
import insta07 from '@/assets/marcio/casos-novos/insta-07.webp';
import insta09 from '@/assets/marcio/casos-novos/insta-09.webp';
import insta10 from '@/assets/marcio/casos-novos/insta-10.webp';
import insta11 from '@/assets/marcio/casos-novos/insta-11.webp';
import insta12 from '@/assets/marcio/casos-novos/insta-12.webp';
import insta13 from '@/assets/marcio/casos-novos/insta-13.webp';
import insta14 from '@/assets/marcio/casos-novos/insta-14.webp';

const allImages = [
  // Instagram (compostos antes/depois com marca PELEGRINA)
  insta01, insta02, insta03, insta04, insta05, insta06, insta07,
  insta09, insta10, insta11, insta12, insta13, insta14,
  // Casos novos (1 por caso)
  novo03, novo08, novo10, novo14, novo18, novo21,
  novo25, novo28, novo31, novo34, novo38,
  // Casos originais
  caso01, caso02, caso03, caso04, caso05, caso06, caso07,
  caso08, caso09, caso10, caso11, caso12, caso13, caso14,
];

const Galeria = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
  };

  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % allImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero section */}
        <section className="py-12 md:py-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 text-sm font-medium border border-accent/30 text-accent rounded-full mb-4 uppercase tracking-[0.2em]">
              Resultados Reais
            </span>
            <h1 className="font-kiona text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 uppercase tracking-wide">
              Galeria de Casos
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Transformações realizadas pelo Dr. Márcio Pelegrina.
              Cada sorriso é único — veja os resultados reais dos nossos pacientes.
            </p>
            <p className="text-accent font-medium mt-3 text-sm">
              {allImages.length} casos documentados
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="container mx-auto px-4">
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 space-y-3">
            {allImages.map((src, index) => (
              <div
                key={index}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer bg-muted"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={src}
                  alt={`Caso clínico ${index + 1} - Dr. Márcio Pelegrina`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 mt-16 text-center">
          <div className="bg-secondary/40 rounded-2xl p-8 md:p-12">
            <h2 className="font-kiona text-2xl md:text-3xl text-foreground mb-3 uppercase tracking-wide">
              Quer transformar seu sorriso?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Agende uma avaliação e descubra o tratamento ideal para você.
            </p>
            <a
              href="https://wa.me/5519974135932?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] hover:-translate-y-0.5"
            >
              Agendar Avaliação Gratuita
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </span>

          {/* Prev */}
          <button
            className="absolute left-4 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-[85vh] px-20" onClick={(e) => e.stopPropagation()}>
            <img
              src={allImages[lightboxIndex]}
              alt={`Caso clínico ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Galeria;
