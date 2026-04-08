import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/hooks/use-scroll-reveal';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/effect-coverflow';
// @ts-ignore
import 'swiper/css/pagination';

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

const caseImages = [
  { src: caso01, alt: 'Reabilitação oral completa - antes e depois' },
  { src: caso08, alt: 'Lentes de contato dental - antes e depois' },
  { src: caso13, alt: 'Reabilitação estética - antes e depois' },
  { src: caso05, alt: 'Transformação do sorriso - antes e depois' },
  { src: caso12, alt: 'Reabilitação oral feminina - antes e depois' },
  { src: caso11, alt: 'Prótese dentária - antes e depois' },
  { src: caso06, alt: 'Restauração estética - antes e depois' },
  { src: caso09, alt: 'Caso clínico de reabilitação' },
  { src: caso14, alt: 'Resultado de tratamento estético' },
  { src: caso02, alt: 'Prótese sobre implante' },
  { src: caso03, alt: 'Caso clínico de prótese' },
  { src: caso07, alt: 'Restauração dental' },
  { src: caso04, alt: 'Caso clínico de restauração' },
  { src: caso10, alt: 'Reabilitação oral' },
];

const CasesGallery = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = caseImages.length;

  useEffect(() => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  }, []);

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
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                const realIndex = swiper.realIndex % totalSlides;
                setCurrentSlide(realIndex + 1);
              }}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 15 },
                480: { slidesPerView: 1.5, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 25 },
                768: { slidesPerView: 2.5, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 35 },
                1280: { slidesPerView: 3.5, spaceBetween: 40 },
              }}
              modules={[EffectCoverflow, Autoplay, Pagination]}
              className="cases-swiper py-8"
            >
              {caseImages.map((image, index) => (
                <SwiperSlide key={`case-${index}`} className="cases-slide">
                  <Card className="overflow-hidden bg-card border-0 shadow-lg group cursor-pointer transition-all duration-500 hover:shadow-xl rounded-2xl">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
        .cases-slide {
          transition: all 0.5s ease;
        }
        .cases-slide.swiper-slide-active {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default CasesGallery;
