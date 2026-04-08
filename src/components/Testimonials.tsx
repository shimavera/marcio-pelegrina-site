import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import patientRodrigo from "@/assets/patient-rodrigo.webp";
import patientAlyne from "@/assets/patient-alyne.webp";
import patientBruna from "@/assets/patient-bruna.webp";
import patientFernando from "@/assets/patient-fernando.webp";
import patientAnderson from "@/assets/patient-anderson.webp";
import patientVitor from "@/assets/patient-vitor.webp";

const patientTestimonials = [
  {
    name: "Rodrigo Alaminos",
    text: "Estou muito contente com o meu novo sorriso! As lentes de resina ficaram maravilhosas, super naturais e do jeitinho que eu sempre quis! Muito obrigada Dr Luan por transformar meu sorriso com tanto carinho e profissionalismo!",
    rating: 5,
    image: patientRodrigo,
  },
  {
    name: "Alyne Oliveira",
    text: "Amei meu resultado!!! Obrigada pela paciência e atenção que teve comigo em um momento tão delicado de dor. Mãos abençoadas!",
    rating: 5,
    image: patientAlyne,
  },
  {
    name: "Bruna Grilli",
    text: "O Dr. Luan é excelente e super cuidadoso! Ele cuida de toda a minha profilaxia, fez meu clareamento e sempre faz minha limpeza. Todo mundo elogia a naturalidade das minhas resinas, ficou muito lindo e natural. Recomendo e confio!",
    rating: 5,
    image: patientBruna,
  },
  {
    name: "Fernando Souza",
    text: "Procurei o Dr. Luan para melhorar meu sorriso. Ele elaborou todo o protocolo de tratamento para uma reabilitação oral completa. Estamos em tratamento e já estou ansioso para finalizar e poder sorrir com conforto.",
    rating: 5,
    image: patientFernando,
  },
  {
    name: "Anderson Morpheus",
    text: "Atendimento primoroso bem como toda atenção desde a avaliação como as sugestões que nos esclareceram absurdamente, de paciente a fã, com toda certeza todos meus familiares terão o prazer de serem atendidos por um profissional deste porte. Gratidão eterna.",
    rating: 5,
    image: patientAnderson,
  },
  {
    name: "Vitor Andrade",
    text: "Ficou muito bom, não tenho palavras pra expressar o quão grato eu fiquei pelo trabalho que você fez nos meus dentes, realizou um sonho muito antigo. Obrigado de verdade!!!",
    rating: 5,
    image: patientVitor,
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
    <section className="py-6 sm:py-8 lg:py-10 overflow-x-hidden" style={{ backgroundColor: '#F6F5F5' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
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
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
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
      </div>
    </section>
  );
};

export default Testimonials;
