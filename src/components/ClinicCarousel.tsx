import clinica1 from "@/assets/clinica-1.webp";
import clinica3 from "@/assets/clinica-3.webp";
import clinica5 from "@/assets/clinica-5.webp";
import clinica8 from "@/assets/clinica-8.webp";
import clinica9 from "@/assets/clinica-9.webp";
import clinica11 from "@/assets/clinica-11.webp";

const galleryImages = [
  {
    src: clinica3,
    alt: "Recepção elegante com iluminação premium",
    title: "Recepção Premium",
    size: "large",
  },
  {
    src: clinica5,
    alt: "Sala de espera confortável com vista panorâmica",
    title: "Sala de Espera",
    size: "large",
  },
  {
    src: clinica9,
    alt: "Consultório odontológico com cadeira de última geração",
    title: "Consultório Moderno",
    size: "small",
  },
  {
    src: clinica11,
    alt: "Consultório com cadeira odontológica e parede de mármore",
    title: "Consultório Premium",
    size: "small",
  },
  {
    src: clinica1,
    alt: "Porta de entrada do consultório",
    title: "Entrada do Consultório",
    size: "small",
  },
  {
    src: clinica8,
    alt: "Área de esterilização com equipamentos modernos",
    title: "Área de Esterilização",
    size: "small",
  },
];

const ClinicCarousel = () => {
  const largeImages = galleryImages.filter((img) => img.size === "large");
  const smallImages = galleryImages.filter((img) => img.size === "small");

  return (
    <section className="py-8 lg:py-12" style={{ backgroundColor: '#F6F5F5' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
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
      </div>
    </section>
  );
};

export default ClinicCarousel;
