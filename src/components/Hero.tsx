import { MessageCircle, Star, ShieldCheck } from "lucide-react";
import drMarcioHero from "@/assets/marcio/dr-marcio-hero.webp";
import { Button } from "@/components/ui/button";
import { trackWorkingLead } from "@/lib/utils";

const Hero = () => {
  const whatsappUrl = "https://wa.me/5519974135932?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o";

  const handleWhatsAppClick = () => {
    trackWorkingLead();
  };

  return (
    <>
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-28 lg:pt-32">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)_/_0.05),transparent_70%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)_/_0.08),transparent_50%)] z-0" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
            {/* Content Section */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6 text-center lg:text-left order-1">
              <div className="space-y-3 sm:space-y-4 animate-fade-in-up">
                <p className="text-xs sm:text-sm text-accent uppercase tracking-wider font-medium">
                  Dr. Márcio Pelegrina • CROSP 116495
                </p>

                <div className="space-y-2">
                  <h1 className="font-kiona text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                    Seu Sorriso Merece Cuidado e Excelência
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-foreground/80 font-inter">
                    Prótese Dentária e Reabilitação Oral com atendimento humano e acolhedor
                  </p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-2 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Pacientes atendidos com excelência
                </span>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center lg:items-start gap-2 animate-fade-in-up pt-1" style={{ animationDelay: '0.25s' }}>
                <Button 
                  size="lg" 
                  className="hover-lift shadow-gold bg-gradient-gold hover:opacity-90 text-sm sm:text-base font-medium h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto max-w-xs sm:max-w-none" 
                  asChild
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Agendar Avaliação
                  </a>
                </Button>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Resposta em até 5 minutos • Sem compromisso
                </p>
                <p className="flex items-center justify-center lg:justify-start gap-1 text-[10px] sm:text-xs text-muted-foreground/70 tracking-wide">
                  <ShieldCheck className="w-3 h-3" />
                  Canal exclusivo para pacientes e agendamentos.
                </p>
              </div>
            </div>

            {/* Image Section - Placeholder */}
            <div className="relative animate-fade-in-up order-2" style={{ animationDelay: '0.3s' }}>
              <div className="relative group max-w-sm sm:max-w-md mx-auto lg:max-w-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-xl sm:rounded-2xl lg:rounded-3xl" />
                <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-gold-lg overflow-hidden aspect-[3/4] transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-gold">
                  <img
                    src={drMarcioHero}
                    alt="Dr. Márcio Pelegrina - Cirurgião-Dentista"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl ring-1 ring-primary/20 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
