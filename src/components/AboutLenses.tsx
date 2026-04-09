import { GraduationCap, Award, Heart } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import lentesIcon from "@/assets/lentes-icon.png";
import drMarcioAtendimento from "@/assets/marcio/dr-marcio-atendimento.webp";

const AboutLenses = () => {
  return (
    <section id="quem-sou" className="py-16 sm:py-20 lg:py-28 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-70" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-gold opacity-5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="space-y-8">
          <ScrollReveal animation="fade-up">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block">
              <span className="text-accent font-inter text-sm uppercase tracking-wider px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
                CROSP 116495
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-kiona text-foreground font-bold">
              Quem Sou
            </h2>
            <p className="text-foreground/80 font-inter text-lg leading-relaxed max-w-3xl mx-auto">
              Cirurgião-Dentista especializado em <span className="text-foreground font-semibold">Prótese Dentária</span> e <span className="text-foreground font-semibold">Reabilitação Oral</span>
            </p>
          </div>
          </ScrollReveal>

          {/* Formação */}
          <ScrollReveal animation="fade-up" delay={150}>
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
                    <span>Graduação em <strong>Odontologia</strong> pela PUC-Campinas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Especialista em <strong>Prótese Dentária</strong> pela FOP-Unicamp</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Especialista em <strong>Reabilitação Oral</strong> pela FOP-Unicamp</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Mais de <strong>10 anos</strong> de experiência clínica</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Diversos cursos e atualizações em <strong>oclusão, dentística</strong> e <strong>reabilitação oral</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Formado em <strong>Fotografia</strong></span>
                  </li>
                </ul>
              </div>
              <div className="md:w-64 lg:w-80 flex-shrink-0">
                <div className="aspect-square rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={drMarcioAtendimento}
                    alt="Dr. Márcio Pelegrina atendendo paciente"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Atuação */}
          <ScrollReveal animation="fade-up" delay={200}>
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
                Especialista em <strong>lentes de contato dental</strong> e <strong>reabilitação oral completa</strong>, proporcionando sorrisos naturais e harmônicos com planejamento personalizado para cada paciente.
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
                Consultório em <strong>Perdizes, São Paulo</strong>. Atendimento personalizado com foco em conforto, previsibilidade e acompanhamento completo.
              </p>
            </div>
          </div>
          </ScrollReveal>

          {/* Diferenciais */}
          <ScrollReveal animation="fade-up" delay={250}>
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
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default AboutLenses;
