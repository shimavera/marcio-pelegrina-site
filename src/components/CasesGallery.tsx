import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Card } from '@/components/ui/card';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/effect-coverflow';
// @ts-ignore
import 'swiper/css/pagination';

import caso1 from '@/assets/caso-1.webp';
import caso2 from '@/assets/caso-2.webp';
import caso3 from '@/assets/caso-3.webp';
import caso4 from '@/assets/caso-4.webp';
import caso5 from '@/assets/caso-5.webp';
import caso6 from '@/assets/caso-6.webp';

const caseImages = [
  { src: caso1, alt: 'Caso de transformação do sorriso - antes e depois', title: 'Transformação do Sorriso' },
  { src: caso2, alt: 'Resultado de lentes de contato dental', title: 'Lentes de Contato' },
  { src: caso3, alt: 'Harmonização do sorriso completa', title: 'Harmonização Dental' },
  { src: caso4, alt: 'Tratamento estético dental', title: 'Estética Dental' },
  { src: caso5, alt: 'Reabilitação oral com facetas', title: 'Facetas de Porcelana' },
  { src: caso6, alt: 'Transformação completa do sorriso', title: 'Sorriso Renovado' },
];

const extendedCaseImages = [...caseImages, ...caseImages, ...caseImages];

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
    <section className="py-16 md:py-24 bg-[#F6F5F5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-sm font-medium border border-accent text-accent rounded-full mb-4">
            RESULTADOS REAIS
          </span>
          <h2 className="font-kiona text-3xl md:text-4xl lg:text-5xl text-primary mb-4 uppercase tracking-wide">
            Veja Alguns Casos
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Milhares de sorrisos renovados!
          </p>
        </div>

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
              320: {
                slidesPerView: 1.2,
                spaceBetween: 15,
              },
              480: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 35,
              },
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 40,
              },
            }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="cases-swiper py-8"
          >
            {extendedCaseImages.map((image, index) => (
              <SwiperSlide key={`case-${index}`} className="cases-slide">
                <Card className="overflow-hidden bg-card border-0 shadow-lg group cursor-pointer transition-all duration-500 hover:shadow-xl rounded-2xl">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-medium text-lg">{image.title}</h3>
                    </div>
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
