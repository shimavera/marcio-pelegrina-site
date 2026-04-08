import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Sparkles, Heart } from "lucide-react";
import drLuanMicroscopio from "@/assets/dr-luan-microscopio.webp";

const Doctors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
              <div className="text-center md:text-left animate-fade-in space-y-6">
                <div>
                  <span className="text-accent font-inter text-sm uppercase tracking-wider px-4 py-2 rounded-full border border-accent/30 bg-accent/5 inline-block mb-4">
                    CROSP 158810
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary font-kiona">
                  Dr. Luan Maciel
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  Cirurgião-Dentista especializado em <span className="text-primary font-semibold">Estética Dental</span> e 
                  <span className="text-primary font-semibold"> Endodontia</span>
                </p>
                <p className="text-base text-muted-foreground">
                  Profissional dedicado à excelência no atendimento, com foco em lentes dentais e tratamento de canal. 
                  Atendimento personalizado no Jardim Anália Franco, São Paulo.
                </p>
              </div>
              
              <div className="relative animate-fade-in">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift">
                  <img 
                    src={drLuanMicroscopio} 
                    alt="Dr. Luan Maciel - Odontologia Avançada" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-2">
                Experiência que Transforma Sorrisos
              </h2>
              <p className="text-muted-foreground font-inter">
                Dedicação à excelência em odontologia estética e endodontia
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto animate-fade-in-up">
              <Card className="border-primary/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">+2000</div>
                  <div className="text-sm text-muted-foreground">Sorrisos Renovados</div>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">Lentes</div>
                  <div className="text-sm text-muted-foreground">Resina e Porcelana</div>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 hover-lift col-span-2 lg:col-span-1">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">Endo</div>
                  <div className="text-sm text-muted-foreground">Tratamento de Canal</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Formação Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-12 animate-fade-in">
              <Card className="hover-lift border-primary/20 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                      <GraduationCap className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl text-primary">Formação e Especialização</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1 font-bold">•</span>
                      <p className="text-foreground/80">
                        <strong>Graduação:</strong> Odontologia
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1 font-bold">•</span>
                      <p className="text-foreground/80">
                        <strong>Especialização:</strong> Dentística / Estética Dental
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1 font-bold">•</span>
                      <p className="text-foreground/80">
                        <strong>Especialização:</strong> Endodontia (Tratamento de Canal)
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1 font-bold">•</span>
                      <p className="text-foreground/80">
                        <strong>Formação Avançada:</strong> Lentes Dentais em Resina e Porcelana
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Especialidades */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="animate-fade-in">
                <Card className="hover-lift border-accent/20 overflow-hidden h-full">
                  <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-gold flex-shrink-0">
                        <Sparkles className="w-7 h-7 text-accent-foreground" />
                      </div>
                      <CardTitle className="text-2xl md:text-3xl text-foreground">Estética Dental</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <p className="text-foreground/80 text-lg leading-relaxed mb-4">
                      Especialista em lentes dentais, proporcionando sorrisos naturais e harmônicos:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Lentes em Resina</strong> - Opção versátil e econômica</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Lentes em Porcelana</strong> - Durabilidade e naturalidade</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Reabilitação Estética</strong> - Transformação completa</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Clareamento Dental</strong> - Sorriso mais branco</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="animate-fade-in">
                <Card className="hover-lift border-primary/20 overflow-hidden h-full">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-gold flex-shrink-0">
                        <Heart className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-2xl md:text-3xl text-foreground">Endodontia</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <p className="text-foreground/80 text-lg leading-relaxed mb-4">
                      Tratamento de canal moderno e confortável:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Técnicas Avançadas</strong> - Precisão e eficácia</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Conforto</strong> - Procedimento indolor</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Preservação</strong> - Mantém seu dente natural</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Acompanhamento</strong> - Suporte pós-tratamento</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Diferenciais */}
            <div className="mb-12 animate-fade-in">
              <Card className="hover-lift border-accent/20 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-gold flex-shrink-0">
                      <Award className="w-7 h-7 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl text-foreground">Diferenciais</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-foreground/80">Atendimento personalizado e humanizado</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-foreground/80">Planejamento técnico e estético detalhado</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-foreground/80">Foco em naturalidade e segurança</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-foreground/80">Experiência do paciente: conforto e previsibilidade</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-foreground/80">Localização privilegiada no Jardim Anália Franco</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-foreground/80">+2.000 sorrisos renovados</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Doctors;
