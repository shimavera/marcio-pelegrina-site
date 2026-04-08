import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
const patientTestimonials = [
  {
    name: "Paciente 1",
    text: "Atendimento incrível! O Dr. Márcio é extremamente atencioso e cuidadoso. Me senti acolhido desde a primeira consulta. O resultado do tratamento superou todas as minhas expectativas.",
    rating: 5,
    image: null,
  },
  {
    name: "Paciente 2",
    text: "Profissional excepcional! O consultório é lindo e o atendimento é muito humanizado. Recomendo de olhos fechados para quem busca qualidade e confiança no tratamento odontológico.",
    rating: 5,
    image: null,
  },
  {
    name: "Paciente 3",
    text: "Encontrei no Dr. Márcio um profissional dedicado e competente. O ambiente do consultório transmite tranquilidade e segurança. Estou muito satisfeito com o resultado da minha reabilitação oral.",
    rating: 5,
    image: null,
  },
];

const Testimonials = () => {
  const [testimonialsApi, setTestimonialsApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!testimonialsApi) {
      return;
    }

    setCurrent(testimonialsApi.selectedScrollSnap());

    testimonialsApi.on("select", () => {
      setCurrent(testimonialsApi.selectedScrollSnap());
    });
  }, [testimonialsApi]);

  useEffect(() => {
    if (!testimonialsApi || !isAutoPlayActive || isHovering) {
      return;
    }

    const autoplay = setInterval(() => {
      testimonialsApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [testimonialsApi, isAutoPlayActive, isHovering]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 overflow-x-hidden bg-secondary">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
        <div className="text-center mb-16">
          <p className="text-accent font-inter text-sm uppercase tracking-wider mb-3 inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
            Depoimentos
          </p>
          <h2 className="font-kiona text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-4 uppercase">
            O Que Dizem Nossos Pacientes
          </h2>
          <p className="text-muted-foreground font-inter text-lg max-w-2xl mx-auto">
            Histórias reais de transformação e satisfação com lentes dentais e tratamentos
          </p>
        </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
        <Carousel
          setApi={setTestimonialsApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <CarouselContent className="-ml-4">
            {patientTestimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-card backdrop-blur-sm border-border/50 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="w-8 h-8 text-accent mb-4 opacity-50" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-6 flex-grow">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-3">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <p className="text-foreground font-semibold font-inter">
                        {testimonial.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious 
              className="static translate-x-0 translate-y-0"
            />
            <div className="flex gap-2">
              {patientTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlayActive(false);
                    testimonialsApi?.scrollTo(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 p-2 ${
                    index === current 
                      ? 'bg-accent w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
            <CarouselNext 
              className="static translate-x-0 translate-y-0"
            />
          </div>
        </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
