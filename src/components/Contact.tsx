import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { trackWorkingLead } from "@/lib/utils";

const Contact = () => {
  const whatsappUrl = "https://wa.me/5519974135932?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta";
  
  const handleWhatsAppClick = () => {
    trackWorkingLead();
  };

  return (
    <section id="contato" className="py-16 sm:py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-gold opacity-5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title and Description */}
        <ScrollReveal animation="fade-up">
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <p className="text-accent font-inter text-sm uppercase tracking-wider inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
              Entre em Contato
            </p>
            <h2 className="font-kiona text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Agende sua Consulta
            </h2>
          </div>

          <p className="text-muted-foreground font-inter text-lg leading-relaxed max-w-3xl mx-auto">
            Entre em contato e agende sua consulta com o Dr. Márcio Pelegrina
          </p>
        </div>
        </ScrollReveal>

        {/* Grid with Map and Contact Info */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Google Maps */}
          <ScrollReveal animation="slide-left" delay={100}>
          <div>
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-gold border border-border/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0!2d-46.6850!3d-23.5250!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUnVhIFR1cmlhc3N1LCA1NzggLSBQZXJkaXplcywgU8OjbyBQYXVsbw!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do consultório"
              />
            </div>
          </div>
          </ScrollReveal>

          {/* Contact Information */}
          <ScrollReveal animation="slide-right" delay={250}>
          <div className="space-y-4">

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all hover-lift">
                <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-inter text-sm text-accent mb-1">Endereço</p>
                  <p className="font-semibold text-foreground text-lg">Rua Turiassu, 578</p>
                  <p className="font-semibold text-foreground text-base">Perdizes – São Paulo, SP - 05005-000</p>
                  <p className="text-muted-foreground text-sm mt-1">Segunda a Sexta, das 08h às 19h</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all hover-lift">
                <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-inter text-sm text-accent mb-1">WhatsApp</p>
                  <p className="font-semibold text-foreground text-lg">(19) 97413-5932</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-start pt-4 gap-2">
              <Button 
                size="lg" 
                className="hover-lift shadow-gold bg-gradient-gold hover:opacity-90 text-primary-foreground text-xs sm:text-sm font-medium h-10 sm:h-12 px-5 sm:px-6 w-full sm:w-auto max-w-xs sm:max-w-none" 
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Agendar pelo WhatsApp
                </a>
              </Button>
              <p className="flex items-center justify-center lg:justify-start gap-1 text-[10px] sm:text-xs text-muted-foreground/70 tracking-wide">
                <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                Canal exclusivo para pacientes e agendamentos.
              </p>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
