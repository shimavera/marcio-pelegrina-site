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
  { src: novo01, alt: 'Caso clínico - resultado' },
  { src: insta01, alt: 'Reabilitação oral - antes e depois' },
  { src: novo03, alt: 'Transformação do sorriso' },
  { src: insta03, alt: 'Reabilitação estética - antes e depois' },
  { src: novo08, alt: 'Caso clínico - resultado estético' },
  { src: insta04, alt: 'Sorriso transformado' },
  { src: insta05, alt: 'Resultado de tratamento' },
  { src: novo14, alt: 'Caso clínico - sorriso' },
  { src: insta06, alt: 'Reabilitação oral - caso clínico' },
  { src: novo18, alt: 'Transformação estética' },
  // Originais
  { src: caso01, alt: 'Reabilitação oral completa - antes e depois' },
  { src: caso08, alt: 'Lentes de contato dental - antes e depois' },
  { src: caso13, alt: 'Reabilitação estética - antes e depois' },
  { src: caso05, alt: 'Transformação do sorriso - antes e depois' },
  { src: caso12, alt: 'Reabilitação oral feminina - antes e depois' },
  { src: caso11, alt: 'Prótese dentária - antes e depois' },
  // Mais novos
  { src: novo21, alt: 'Caso clínico novo' },
  { src: insta09, alt: 'Resultado dental' },
  { src: novo24, alt: 'Reabilitação oral' },
  { src: insta10, alt: 'Caso estético dental' },
  { src: novo27, alt: 'Transformação do sorriso' },
  { src: insta11, alt: 'Resultado de reabilitação' },
  { src: novo30, alt: 'Caso clínico - resultado' },
  { src: insta12, alt: 'Reabilitação completa' },
  { src: novo33, alt: 'Sorriso transformado' },
  { src: insta13, alt: 'Caso estético' },
  { src: novo36, alt: 'Resultado dental' },
  { src: insta14, alt: 'Reabilitação oral final' },
  // Restantes originais
  { src: caso06, alt: 'Restauração estética - antes e depois' },
  { src: caso09, alt: 'Caso clínico de reabilitação' },
  { src: caso14, alt: 'Resultado de tratamento estético' },
  { src: caso02, alt: 'Prótese sobre implante' },
  { src: caso03, alt: 'Caso clínico de prótese' },
  { src: caso07, alt: 'Restauração dental' },
  { src: caso04, alt: 'Caso clínico de restauração' },
  { src: caso10, alt: 'Reabilitação oral' },
  // Restantes novos
  { src: novo02, alt: 'Caso novo 2' },
  { src: novo04, alt: 'Caso novo 4' },
  { src: novo05, alt: 'Caso novo 5' },
  { src: novo06, alt: 'Caso novo 6' },
  { src: novo09, alt: 'Caso novo 9' },
  { src: novo10, alt: 'Caso novo 10' },
  { src: novo12, alt: 'Caso novo 12' },
  { src: novo13, alt: 'Caso novo 13' },
  { src: novo15, alt: 'Caso novo 15' },
  { src: novo16, alt: 'Caso novo 16' },
  { src: novo17, alt: 'Caso novo 17' },
  { src: novo19, alt: 'Caso novo 19' },
  { src: novo20, alt: 'Caso novo 20' },
  { src: novo22, alt: 'Caso novo 22' },
  { src: novo23, alt: 'Caso novo 23' },
  { src: novo25, alt: 'Caso novo 25' },
  { src: novo26, alt: 'Caso novo 26' },
  { src: novo28, alt: 'Caso novo 28' },
  { src: novo29, alt: 'Caso novo 29' },
  { src: novo31, alt: 'Caso novo 31' },
  { src: novo32, alt: 'Caso novo 32' },
  { src: novo34, alt: 'Caso novo 34' },
  { src: novo35, alt: 'Caso novo 35' },
  { src: novo37, alt: 'Caso novo 37' },
  { src: novo38, alt: 'Caso novo 38' },
  { src: insta02, alt: 'Caso Instagram 2' },
  { src: insta07, alt: 'Caso Instagram 7' },
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
