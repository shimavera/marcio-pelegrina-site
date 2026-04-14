import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
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

const avatarColors = [
  "bg-blue-500", "bg-green-600", "bg-purple-500",
  "bg-orange-500", "bg-rose-500", "bg-teal-500",
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const patientTestimonials = [
  {
    name: "Ana Carolina S.",
    time: "há 2 semanas",
    text: "Atendimento incrível! O Dr. Márcio é extremamente atencioso e cuidadoso. Me senti acolhida desde a primeira consulta. O resultado das lentes de contato dental superou todas as minhas expectativas.",
    rating: 5,
  },
  {
    name: "Rafael Mendonça",
    time: "há 1 mês",
    text: "Profissional excepcional! O consultório é lindo e o atendimento é muito humanizado. Fiz minha reabilitação oral completa e o resultado ficou perfeito. Recomendo de olhos fechados.",
    rating: 5,
  },
  {
    name: "Fernanda Oliveira",
    time: "há 3 semanas",
    text: "Encontrei no Dr. Márcio um profissional dedicado e competente. O ambiente transmite tranquilidade e segurança. Estou muito satisfeita com o resultado do meu tratamento!",
    rating: 5,
  },
  {
    name: "Lucas Teixeira",
    time: "há 2 meses",
    text: "Fiz facetas de porcelana com o Dr. Márcio e o resultado foi transformador. Ele explicou todo o processo com muita clareza e paciência. Consultório moderno e atendimento de alto nível.",
    rating: 5,
  },
  {
    name: "Mariana Costa",
    time: "há 1 semana",
    text: "Super indico o Dr. Márcio! Fui para uma avaliação e saí com um plano de tratamento completo e personalizado. Profissional excelente, consultório impecável em Perdizes.",
    rating: 5,
  },
  {
    name: "Thiago Albuquerque",
    time: "há 5 semanas",
    text: "Realizei minha reabilitação oral completa e o acompanhamento foi impecável do início ao fim. O resultado estético e funcional superou o que eu esperava. Muito obrigado, Dr. Márcio!",
    rating: 5,
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
                  <CardContent className="p-5 flex flex-col h-full gap-3">
                    {/* Header: avatar + nome + tempo */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-semibold text-sm">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-foreground font-semibold font-inter text-sm leading-tight">
                            {testimonial.name}
                          </p>
                          <p className="text-muted-foreground font-inter text-xs">
                            {testimonial.time}
                          </p>
                        </div>
                      </div>
                      <GoogleIcon />
                    </div>

                    {/* Estrelas */}
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                      ))}
                    </div>

                    {/* Texto */}
                    <p className="text-muted-foreground font-inter text-sm leading-relaxed flex-grow">
                      {testimonial.text}
                    </p>

                    {/* Footer: via Google */}
                    <div className="flex items-center gap-1.5 pt-1 border-t border-border/30">
                      <GoogleIcon />
                      <span className="text-muted-foreground/60 font-inter text-xs">Avaliação via Google</span>
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
