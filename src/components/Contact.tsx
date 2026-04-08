import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Phone, ShieldCheck } from "lucide-react";
import { trackWorkingLead } from "@/lib/utils";

const Contact = () => {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=5511983385832&text=Ol%C3%A1%21+Acabei+de+visitar+seu+site.+Pode+me+passar+mais+informa%C3%A7%C3%B5es%3F&type=phone_number&app_absent=0";
  
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
            Entre em contato e agende sua consulta com o Dr. Luan Maciel
          </p>
        </div>

        {/* Grid with Map and Contact Info */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Google Maps */}
          <div className="animate-fade-in">
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-gold border border-border/30">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.3644777353416!2d-46.56061866438073!3d-23.555349752288475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5ff3d82ea343%3A0x36c1bdd8c8edfa62!2sCl%C3%ADnica%20Dr.%20Luan%20Maciel%20-%20Odontologia%20e%20Est%C3%A9tica!5e0!3m2!1sen!2sbr!4v1767620441525!5m2!1sen!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Dr. Luan Maciel - R. Emília Marengo, 1040 - Jardim Anália Franco"
              />
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
                  <p className="font-semibold text-foreground text-lg">R. Emília Marengo, 1040</p>
                  <p className="font-semibold text-foreground text-base">Jardim Anália Franco (Tatuapé) – São Paulo/SP, 03336-000</p>
                  <p className="text-muted-foreground text-sm mt-1">Segunda a Sexta, das 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all hover-lift">
                <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-inter text-sm text-accent mb-1">WhatsApp</p>
                  <p className="font-semibold text-foreground text-lg">(11) 98338-5832</p>
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
