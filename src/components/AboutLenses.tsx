import { GraduationCap, Award, Heart, User } from "lucide-react";
import lentesIcon from "@/assets/lentes-icon.png";

const AboutLenses = () => {
  return (
    <section id="quem-sou" className="py-12 sm:py-16 lg:py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-70" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-gold opacity-5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block">
              <span className="text-accent font-inter text-sm uppercase tracking-wider px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
                CRO [CROSP]
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-kiona text-foreground font-bold">
              Quem Sou
            </h2>
            <p className="text-foreground/80 font-inter text-lg leading-relaxed max-w-3xl mx-auto">
              Cirurgião-Dentista especializado em <span className="text-foreground font-semibold">Estética Dental</span> e <span className="text-foreground font-semibold">Endodontia</span>
            </p>
          </div>

          {/* Formação */}
          <div className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all hover-lift">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
                    <GraduationCap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-foreground text-xl mb-2">
                      Formação e Especialização
                    </h3>
                  </div>
                </div>
                <ul className="space-y-3 text-foreground/80 font-inter text-sm md:text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Graduação em <strong>Odontologia</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Especialização em <strong>Dentística / Estética Dental</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Especialização em <strong>Endodontia</strong> (Tratamento de Canal)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Formação avançada em <strong>Lentes Dentais</strong> (Resina e Porcelana)</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-64 lg:w-80 flex-shrink-0">
                <div className="aspect-square bg-muted/30 rounded-xl shadow-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <User className="w-16 h-16 text-muted-foreground/40 mx-auto" />
                    <p className="text-xs text-muted-foreground/60 font-inter">Foto do Doutor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Atuação */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-accent/30 transition-all hover-lift">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
                  <img src={lentesIcon} alt="Foco em Estética" className="w-[50px] h-[50px]" />
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-foreground text-xl">
                    Foco em Estética
                  </h3>
                </div>
              </div>
              <p className="text-foreground/80 font-inter text-sm md:text-base leading-relaxed">
                Especialista em <strong>lentes dentais em resina e porcelana</strong>, proporcionando sorrisos naturais e harmônicos com planejamento personalizado para cada paciente.
              </p>
            </div>

            <div className="bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-accent/30 transition-all hover-lift">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-foreground text-xl">
                    Atendimento
                  </h3>
                </div>
              </div>
              <p className="text-foreground/80 font-inter text-sm md:text-base leading-relaxed">
                Consultório em <strong>[CIDADE]</strong>. Atendimento personalizado com foco em conforto, previsibilidade e acompanhamento completo.
              </p>
            </div>
          </div>

          {/* Diferenciais */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-inter font-semibold text-foreground text-xl mb-2">
                  Diferenciais
                </h3>
                <ul className="text-foreground/80 font-inter text-sm md:text-base leading-relaxed space-y-2">
                  <li>✓ Atendimento personalizado e humanizado</li>
                  <li>✓ Planejamento técnico e estético detalhado</li>
                  <li>✓ Foco em naturalidade e segurança</li>
                  <li>✓ Experiência do paciente: conforto e previsibilidade</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutLenses;
