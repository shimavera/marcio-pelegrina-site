import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Sparkles, Heart } from "lucide-react";
import drMarcioMesa from "@/assets/marcio/dr-marcio-mesa.webp";

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
                    CROSP 116495
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary font-kiona">
                  Dr. Márcio Pelegrina
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  Cirurgião-Dentista especializado em <span className="text-primary font-semibold">Prótese Dentária</span> e
                  <span className="text-primary font-semibold"> Reabilitação Oral</span>
                </p>
                <p className="text-base text-muted-foreground">
                  Formado pela PUC-Campinas e especialista pela FOP-Unicamp, com mais de 10 anos dedicados a oferecer
                  um atendimento próximo, humano e acolhedor em Perdizes, São Paulo.
                </p>
              </div>
              
              <div className="relative animate-fade-in">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift aspect-[3/4]">
                  <img
                    src={drMarcioMesa}
                    alt="Dr. Márcio Pelegrina"
                    className="w-full h-full object-cover"
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
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">+10</div>
                  <div className="text-sm text-muted-foreground">Anos de Experiência</div>
                </CardContent>
              </Card>

              <Card className="border-accent/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">Prótese</div>
                  <div className="text-sm text-muted-foreground">e Reabilitação Oral</div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover-lift col-span-2 lg:col-span-1">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">FOP</div>
                  <div className="text-sm text-muted-foreground">Unicamp</div>
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
                        <strong>Graduação:</strong> Odontologia pela PUC-Campinas
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1 font-bold">•</span>
                      <p className="text-foreground/80">
                        <strong>Especialização:</strong> Prótese Dentária pela FOP-Unicamp
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1 font-bold">•</span>
                      <p className="text-foreground/80">
                        <strong>Especialização:</strong> Reabilitação Oral pela FOP-Unicamp
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent mt-1 font-bold">•</span>
                      <p className="text-foreground/80">
                        <strong>Experiência:</strong> Mais de 10 anos de atuação clínica
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
                      <CardTitle className="text-2xl md:text-3xl text-foreground">Reabilitação Oral</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <p className="text-foreground/80 text-lg leading-relaxed mb-4">
                      Especialista em reabilitação oral e prótese dentária, devolvendo função e estética ao sorriso:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Reabilitação Oral Completa</strong> - Planejamento personalizado</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Lentes de Contato Dental</strong> - Naturalidade e harmonia</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Prótese Dentária</strong> - Soluções modernas e confortáveis</span>
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
                      <CardTitle className="text-2xl md:text-3xl text-foreground">Tratamentos Complementares</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <p className="text-foreground/80 text-lg leading-relaxed mb-4">
                      Equipe de profissionais parceiros especialistas em diversas áreas:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Endodontia</strong> - Tratamento de canal</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Periodontia</strong> - Saúde gengival</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Implantodontia</strong> - Implantes dentários</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/80"><strong>Placa de Bruxismo</strong> - Proteção e conforto</span>
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
                        <span className="text-foreground/80">Localização privilegiada em Perdizes, São Paulo</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-foreground/80">Tecnologia de ponta em odontologia</span>
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
