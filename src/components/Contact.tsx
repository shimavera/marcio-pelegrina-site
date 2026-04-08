import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Phone, ShieldCheck } from "lucide-react";
import { trackWorkingLead } from "@/lib/utils";

const Contact = () => {
  const whatsappUrl = "#";
  
  const handleWhatsAppClick = () => {
    trackWorkingLead();
  };

  return (
    <section id="contato" className="py-6 sm:py-8 lg:py-10 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-gold opacity-5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title and Description */}
        <div className="text-center space-y-6 mb-16 animate-fade-in">
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

        {/* Grid with Map and Contact Info */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Google Maps Placeholder */}
          <div className="animate-fade-in">
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-gold border border-border/30 bg-muted/30 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                <p className="text-sm text-muted-foreground/60 font-inter">[MAPA - INSERIR ENDEREÇO]</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 animate-slide-in-left">

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all hover-lift">
                <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-inter text-sm text-accent mb-1">Endereço</p>
                  <p className="font-semibold text-foreground text-lg">[ENDEREÇO]</p>
                  <p className="font-semibold text-foreground text-base">[CIDADE] – [ESTADO], [CEP]</p>
                  <p className="text-muted-foreground text-sm mt-1">Segunda a Sexta, das 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all hover-lift">
                <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-inter text-sm text-accent mb-1">WhatsApp</p>
                  <p className="font-semibold text-foreground text-lg">[TELEFONE]</p>
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
