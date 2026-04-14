import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/hooks/use-scroll-reveal';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';

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

// Casos novos - WhatsApp
import novo01 from '@/assets/marcio/casos-novos/novo-01.webp';
import novo02 from '@/assets/marcio/casos-novos/novo-02.webp';
import novo03 from '@/assets/marcio/casos-novos/novo-03.webp';
import novo04 from '@/assets/marcio/casos-novos/novo-04.webp';
import novo05 from '@/assets/marcio/casos-novos/novo-05.webp';
import novo06 from '@/assets/marcio/casos-novos/novo-06.webp';
import novo08 from '@/assets/marcio/casos-novos/novo-08.webp';
import novo09 from '@/assets/marcio/casos-novos/novo-09.webp';
import novo10 from '@/assets/marcio/casos-novos/novo-10.webp';
import novo12 from '@/assets/marcio/casos-novos/novo-12.webp';
import novo13 from '@/assets/marcio/casos-novos/novo-13.webp';
import novo14 from '@/assets/marcio/casos-novos/novo-14.webp';
import novo15 from '@/assets/marcio/casos-novos/novo-15.webp';
import novo16 from '@/assets/marcio/casos-novos/novo-16.webp';
import novo17 from '@/assets/marcio/casos-novos/novo-17.webp';
import novo18 from '@/assets/marcio/casos-novos/novo-18.webp';
import novo19 from '@/assets/marcio/casos-novos/novo-19.webp';
import novo20 from '@/assets/marcio/casos-novos/novo-20.webp';
import novo21 from '@/assets/marcio/casos-novos/novo-21.webp';
import novo22 from '@/assets/marcio/casos-novos/novo-22.webp';
import novo23 from '@/assets/marcio/casos-novos/novo-23.webp';
import novo24 from '@/assets/marcio/casos-novos/novo-24.webp';
import novo25 from '@/assets/marcio/casos-novos/novo-25.webp';
import novo26 from '@/assets/marcio/casos-novos/novo-26.webp';
import novo27 from '@/assets/marcio/casos-novos/novo-27.webp';
import novo28 from '@/assets/marcio/casos-novos/novo-28.webp';
import novo29 from '@/assets/marcio/casos-novos/novo-29.webp';
import novo30 from '@/assets/marcio/casos-novos/novo-30.webp';
import novo31 from '@/assets/marcio/casos-novos/novo-31.webp';
import novo32 from '@/assets/marcio/casos-novos/novo-32.webp';
import novo33 from '@/assets/marcio/casos-novos/novo-33.webp';
import novo34 from '@/assets/marcio/casos-novos/novo-34.webp';
import novo35 from '@/assets/marcio/casos-novos/novo-35.webp';
import novo36 from '@/assets/marcio/casos-novos/novo-36.webp';
import novo37 from '@/assets/marcio/casos-novos/novo-37.webp';
import novo38 from '@/assets/marcio/casos-novos/novo-38.webp';

// Casos Instagram
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

const caseImages = [
  // Novos em destaque primeiro
  { src: novo01, alt: 'Lentes de contato dental antes e depois - Dr. Márcio Pelegrina Perdizes SP' },
  { src: insta01, alt: 'Reabilitação oral completa antes e depois - odontologia estética São Paulo' },
  { src: novo03, alt: 'Transformação do sorriso com facetas de porcelana - Dr. Márcio Pelegrina' },
  { src: insta03, alt: 'Facetas de porcelana antes e depois - reabilitação estética Perdizes SP' },
  { src: novo08, alt: 'Resultado de lentes de contato dental - sorriso harmonioso São Paulo' },
  { src: insta04, alt: 'Sorriso transformado com facetas de porcelana - odontologia estética SP' },
  { src: insta05, alt: 'Resultado de reabilitação oral - prótese dentária Dr. Márcio Pelegrina' },
  { src: novo14, alt: 'Clareamento dental e lentes de contato - resultado antes e depois SP' },
  { src: insta06, alt: 'Reabilitação oral antes e depois - especialista em prótese Perdizes SP' },
  { src: novo18, alt: 'Transformação estética dental - facetas e reabilitação oral São Paulo' },
  // Originais
  { src: caso01, alt: 'Reabilitação oral completa antes e depois - Dr. Márcio Pelegrina Perdizes SP' },
  { src: caso08, alt: 'Lentes de contato dental antes e depois - resultado sorriso harmonioso SP' },
  { src: caso13, alt: 'Facetas de porcelana antes e depois - odontologia estética São Paulo' },
  { src: caso05, alt: 'Transformação do sorriso com facetas - antes e depois Dr. Márcio Pelegrina' },
  { src: caso12, alt: 'Reabilitação oral feminina antes e depois - lentes de contato dental SP' },
  { src: caso11, alt: 'Prótese dentária antes e depois - reabilitação oral Perdizes São Paulo' },
  // Mais novos
  { src: novo21, alt: 'Facetas de porcelana resultado - odontologia estética Dr. Márcio Pelegrina SP' },
  { src: insta09, alt: 'Resultado sorriso harmonioso - lentes de contato dental São Paulo' },
  { src: novo24, alt: 'Reabilitação oral antes e depois - prótese dentária Perdizes SP' },
  { src: insta10, alt: 'Estética dental antes e depois - facetas de porcelana São Paulo' },
  { src: novo27, alt: 'Transformação do sorriso com reabilitação oral - Dr. Márcio Pelegrina SP' },
  { src: insta11, alt: 'Resultado de reabilitação oral completa - odontologia estética Perdizes' },
  { src: novo30, alt: 'Lentes de contato dental resultado - especialista em prótese São Paulo' },
  { src: insta12, alt: 'Reabilitação oral completa - antes e depois sorriso harmonioso SP' },
  { src: novo33, alt: 'Sorriso transformado com facetas de porcelana - Dr. Márcio Pelegrina SP' },
  { src: insta13, alt: 'Estética dental antes e depois - lentes de contato Perdizes São Paulo' },
  { src: novo36, alt: 'Resultado dental com reabilitação oral - odontologia estética SP' },
  { src: insta14, alt: 'Reabilitação oral final antes e depois - prótese dentária São Paulo' },
  // Restantes originais
  { src: caso06, alt: 'Restauração estética dental antes e depois - facetas Dr. Márcio Pelegrina' },
  { src: caso09, alt: 'Reabilitação oral antes e depois - especialista prótese Perdizes SP' },
  { src: caso14, alt: 'Resultado tratamento estético dental - lentes de contato São Paulo' },
  { src: caso02, alt: 'Prótese sobre implante antes e depois - reabilitação oral SP' },
  { src: caso03, alt: 'Prótese dentária antes e depois - odontologia estética Perdizes São Paulo' },
  { src: caso07, alt: 'Restauração dental com facetas de porcelana - Dr. Márcio Pelegrina SP' },
  { src: caso04, alt: 'Restauração oral antes e depois - reabilitação estética São Paulo' },
  { src: caso10, alt: 'Reabilitação oral completa - prótese dentária Perdizes SP' },
  // Restantes novos
  { src: novo02, alt: 'Facetas de porcelana resultado antes e depois - odontologia estética SP' },
  { src: novo04, alt: 'Lentes de contato dental antes e depois - Dr. Márcio Pelegrina Perdizes' },
  { src: novo05, alt: 'Transformação sorriso com facetas - reabilitação oral São Paulo' },
  { src: novo06, alt: 'Resultado reabilitação oral antes e depois - prótese dentária SP' },
  { src: novo09, alt: 'Sorriso harmonioso com lentes de contato dental - Perdizes São Paulo' },
  { src: novo10, alt: 'Reabilitação oral estética antes e depois - Dr. Márcio Pelegrina SP' },
  { src: novo12, alt: 'Facetas de porcelana antes e depois - odontologia Perdizes SP' },
  { src: novo13, alt: 'Prótese dentária resultado - reabilitação oral São Paulo' },
  { src: novo15, alt: 'Transformação dental com facetas - antes e depois Perdizes SP' },
  { src: novo16, alt: 'Lentes de contato dental resultado - sorriso harmonioso São Paulo' },
  { src: novo17, alt: 'Reabilitação oral antes e depois - odontologia estética Dr. Márcio SP' },
  { src: novo19, alt: 'Facetas de porcelana antes e depois - clínica Perdizes São Paulo' },
  { src: novo20, alt: 'Restauração estética dental - prótese dentária resultado SP' },
  { src: novo22, alt: 'Sorriso transformado com reabilitação oral - Perdizes São Paulo' },
  { src: novo23, alt: 'Lentes de contato dental antes e depois - odontologia estética SP' },
  { src: novo25, alt: 'Facetas de porcelana resultado - Dr. Márcio Pelegrina Perdizes SP' },
  { src: novo26, alt: 'Reabilitação oral completa antes e depois - prótese dentária SP' },
  { src: novo28, alt: 'Estética dental antes e depois - transformação sorriso São Paulo' },
  { src: novo29, alt: 'Resultado dental com facetas de porcelana - Perdizes SP' },
  { src: novo31, alt: 'Sorriso harmonioso antes e depois - reabilitação oral São Paulo' },
  { src: novo32, alt: 'Prótese dentária antes e depois - odontologia estética Perdizes SP' },
  { src: novo34, alt: 'Facetas de porcelana resultado antes e depois - Dr. Márcio Pelegrina' },
  { src: novo35, alt: 'Lentes de contato dental resultado - clínica odontologia São Paulo' },
  { src: novo37, alt: 'Transformação sorriso antes e depois - reabilitação oral Perdizes SP' },
  { src: novo38, alt: 'Reabilitação oral estética resultado - facetas de porcelana São Paulo' },
  { src: insta02, alt: 'Facetas de porcelana antes e depois - odontologia estética Perdizes SP' },
  { src: insta07, alt: 'Lentes de contato dental antes e depois - Dr. Márcio Pelegrina São Paulo' },
];

const CasesGallery = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = caseImages.length;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-sm font-medium border border-accent/30 text-accent rounded-full mb-4 uppercase tracking-[0.2em]">
              Resultados Reais
            </span>
            <h2 className="font-kiona text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 uppercase tracking-wide">
              Casos Clínicos
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Transformações reais realizadas pelo Dr. Márcio Pelegrina
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="cases-swiper-container relative">
            <Swiper
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              onSlideChange={(swiper) => {
                setCurrentSlide((swiper.realIndex % totalSlides) + 1);
              }}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              speed={500}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                320:  { slidesPerView: 1.3, spaceBetween: 12 },
                480:  { slidesPerView: 1.6, spaceBetween: 16 },
                640:  { slidesPerView: 2,   spaceBetween: 20 },
                768:  { slidesPerView: 2.5, spaceBetween: 24 },
                1024: { slidesPerView: 3,   spaceBetween: 28 },
                1280: { slidesPerView: 3.5, spaceBetween: 32 },
              }}
              modules={[Autoplay, Pagination]}
              className="cases-swiper py-8"
            >
              {caseImages.map((image, index) => (
                <SwiperSlide key={`case-${index}`}>
                  <Card className="overflow-hidden bg-card border-0 shadow-lg rounded-2xl">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="text-center mt-6">
              <span className="text-muted-foreground font-medium">
                {currentSlide} / {totalSlides}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .cases-swiper-container .swiper-pagination {
          position: relative;
          margin-top: 1.5rem;
        }
        .cases-swiper-container .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: hsl(var(--muted-foreground) / 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .cases-swiper-container .swiper-pagination-bullet-active {
          background: hsl(var(--accent));
          width: 24px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
};

export default CasesGallery;
