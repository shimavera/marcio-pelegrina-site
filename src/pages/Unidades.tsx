import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Clock, Building2 } from "lucide-react";

const Unidades = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-accent font-inter text-sm uppercase tracking-wider mb-3 inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
              Consultório
            </p>
            <h1 className="font-kiona text-4xl md:text-5xl lg:text-6xl font-bold text-primary mt-4 mb-4">
              Dr. Luan Maciel
            </h1>
            <p className="text-muted-foreground font-inter text-lg max-w-2xl mx-auto">
              Odontologia Avançada com foco em Estética Dental e Endodontia. 
              Atendimento personalizado no Jardim Anália Franco, São Paulo.
            </p>
          </div>

          {/* Clinic Info Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl overflow-hidden animate-fade-in-up shadow-elevated">
              {/* Image Placeholder */}
              <div className="aspect-[21/9] bg-gradient-to-br from-primary/10 via-secondary to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-primary mx-auto mb-3" />
                  <p className="text-muted-foreground font-inter">Consultório Dr. Luan Maciel</p>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Info Column */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-kiona text-3xl font-bold text-primary mb-4">
                        Localização
                      </h2>
                      <p className="text-foreground/80 font-inter mb-6 leading-relaxed">
                        Consultório moderno e equipado com tecnologia de última geração para oferecer 
                        os melhores tratamentos em estética dental e endodontia.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                          <MapPin className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-inter text-sm text-accent mb-1">Endereço</p>
                          <p className="font-semibold text-foreground">
                            R. Emília Marengo, 1040<br />
                            Jardim Anália Franco (Tatuapé), São Paulo - SP<br />
                            CEP: 03336-000
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                          <Phone className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="font-inter text-sm text-accent mb-1">Contato</p>
                          <p className="font-semibold text-foreground">
                            WhatsApp: (11) 98338-5832
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                          <Clock className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-inter text-sm text-accent mb-1">Horário</p>
                          <p className="font-semibold text-foreground">
                            Segunda a Sexta<br />
                            das 9h às 18h
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Button */}
                    <a
                      href="https://api.whatsapp.com/send/?phone=5511983385832&text=Ol%C3%A1%21+Acabei+de+visitar+seu+site.+Pode+me+passar+mais+informa%C3%A7%C3%B5es%3F&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-inter font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover-lift shadow-gold"
                    >
                      Agendar Consulta
                    </a>
                  </div>

                  {/* Map Column */}
                  <div className="order-first md:order-last">
                    <div className="aspect-square rounded-xl overflow-hidden shadow-gold border border-border sticky top-24">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unidades;
