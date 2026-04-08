import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import interno1 from "@/assets/marcio/consultorio-interno1.webp";
import interno2 from "@/assets/marcio/consultorio-interno2.webp";
import interno3 from "@/assets/marcio/consultorio-interno3.webp";
import interno4 from "@/assets/marcio/consultorio-interno4.webp";
import fachada from "@/assets/marcio/consultorio-fachada.webp";
import ext2 from "@/assets/marcio/consultorio-ext2.webp";

const galleryImages = [
  {
    src: interno1,
    alt: "Sala de atendimento com acabamento em madeira e mármore",
    title: "Sala de Atendimento",
    size: "large",
  },
  {
    src: interno3,
    alt: "Consultório com design moderno e iluminação acolhedora",
    title: "Consultório",
    size: "large",
  },
  {
    src: interno2,
    alt: "Ambiente do consultório com detalhes em madeira",
    title: "Ambiente Premium",
    size: "small",
  },
  {
    src: interno4,
    alt: "Espaço de atendimento com acabamento sofisticado",
    title: "Espaço de Atendimento",
    size: "small",
  },
  {
    src: fachada,
    alt: "Fachada da Klinikí Odontologia",
    title: "Fachada",
    size: "small",
  },
  {
    src: ext2,
    alt: "Vista externa do consultório",
    title: "Vista Externa",
    size: "small",
  },
];

const ClinicCarousel = () => {
  const largeImages = galleryImages.filter((img) => img.size === "large");
  const smallImages = galleryImages.filter((img) => img.size === "small");

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
        <div className="text-center mb-12">
          <p className="text-accent font-inter text-sm uppercase tracking-wider mb-3 inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
            Nossa Clínica
          </p>
          <h2 className="font-kiona text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-4 uppercase">
            Ambiente Premium
          </h2>
          <p className="text-muted-foreground font-inter text-lg max-w-2xl mx-auto">
            Conheça nosso espaço moderno e confortável, projetado para sua melhor experiência
          </p>
        </div>
        </ScrollReveal>

        <ScrollReveal animation="scale-in" delay={200}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {largeImages.map((image, index) => (
              <div
                key={`large-${index}`}
                className="col-span-1 md:col-span-2 group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-kiona text-lg md:text-xl font-semibold text-white uppercase">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}

            {smallImages.map((image, index) => (
              <div
                key={`small-${index}`}
                className="col-span-1 group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-kiona text-sm md:text-base font-semibold text-white uppercase">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ClinicCarousel;
