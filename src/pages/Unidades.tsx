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
              Dr. Márcio Pelegrina
            </h1>
            <p className="text-muted-foreground font-inter text-lg max-w-2xl mx-auto">
              Odontologia Avançada com foco em Estética Dental e Endodontia. 
              Atendimento personalizado em [CIDADE].
            </p>
          </div>

          {/* Clinic Info Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl overflow-hidden animate-fade-in-up shadow-elevated">
              {/* Image Placeholder */}
              <div className="aspect-[21/9] bg-gradient-to-br from-primary/10 via-secondary to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-primary mx-auto mb-3" />
                  <p className="text-muted-foreground font-inter">Consultório Dr. Márcio Pelegrina</p>
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
                            [ENDEREÇO]<br />
                            [CIDADE] – [ESTADO]<br />
                            CEP: [CEP]
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
                            WhatsApp: [TELEFONE]
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
                      href="#"
                      className="inline-flex items-center justify-center gap-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-inter font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover-lift shadow-gold"
                    >
                      Agendar Consulta
                    </a>
                  </div>

                  {/* Map Column - Placeholder */}
                  <div className="order-first md:order-last">
                    <div className="aspect-square rounded-xl overflow-hidden shadow-gold border border-border sticky top-24 bg-muted/30 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <MapPin className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                        <p className="text-sm text-muted-foreground/60 font-inter">[MAPA - INSERIR ENDEREÇO]</p>
                      </div>
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
