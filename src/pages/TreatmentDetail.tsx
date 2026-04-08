import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Phone, MessageCircle, CheckCircle2, Clock, Users, TrendingUp, Star, Info, AlertCircle, Award, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User } from "lucide-react";
import { trackWorkingLead } from "@/lib/utils";

interface Treatment {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  benefits?: string[];
}

const TreatmentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const whatsappUrl = "#";
  
  const handleWhatsAppClick = () => {
    trackWorkingLead();
  };

  const { data: treatment, isLoading } = useQuery<Treatment | null>({
    queryKey: ['treatment', slug],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('treatments')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return (data ?? null) as Treatment | null;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded"></div>
          <div className="h-4 w-48 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-kiona text-3xl md:text-4xl font-bold text-foreground mb-6">
            Tratamento não encontrado
          </h1>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/servicos">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver Todos os Tratamentos
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 md:pt-20">
        {/* Compact Hero Section */}
        <section className="relative py-8 md:py-12 border-b border-border/50 bg-gradient-to-br from-primary/3 via-background to-background overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.03]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-4 animate-fade-in">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-muted -ml-2"
                asChild
              >
                <Link to="/servicos">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="text-sm">Voltar</span>
                </Link>
              </Button>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-[1fr,300px] gap-8 items-start">
                <div className="space-y-3 animate-fade-in-up">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Tratamento Premium
                    </Badge>
                  </div>
                  <h1 className="font-kiona text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    {treatment.title}
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {treatment.short_description}
                  </p>
                </div>

                {/* Quick Action Card */}
                <Card className="border-primary/20 shadow-[var(--shadow-blue)] sticky top-20">
                  <CardContent className="p-5 space-y-3">
                    <div className="text-center pb-2 border-b border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">Entre em Contato</div>
                      <div className="text-lg font-bold text-foreground">Agende Agora</div>
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 shadow-[var(--shadow-blue)]"
                      asChild
                    >
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/5"
                      asChild
                    >
                      <a href="tel:[TELEFONE]">
                        <Phone className="w-4 h-4 mr-2" />
                        Ligar
                      </a>
                    </Button>
                    <div className="pt-2 text-center text-xs text-muted-foreground">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>Resposta em até 5 minutos</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-3 h-3" />
                        <span>+2000 sorrisos renovados</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground/70 tracking-wide">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Canal exclusivo para pacientes e agendamentos.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* About Treatment */}
                  <Card className="border-border/50">
                    <CardContent className="p-5 md:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Info className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="font-kiona text-xl md:text-2xl font-bold text-foreground">
                          Sobre o Tratamento
                        </h2>
                      </div>
                      <Separator className="mb-4" />
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {treatment.full_description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Benefits Grid */}
                  {treatment.benefits && treatment.benefits.length > 0 && (
                    <Card className="border-border/50">
                      <CardContent className="p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                          </div>
                          <h2 className="font-kiona text-xl md:text-2xl font-bold text-foreground">
                            Benefícios do Tratamento
                          </h2>
                        </div>
                        <Separator className="mb-4" />
                        <div className="grid sm:grid-cols-2 gap-3">
                          {treatment.benefits.map((benefit: string, index: number) => (
                            <div 
                              key={index}
                              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                            >
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                              </div>
                              <p className="text-foreground text-sm leading-snug flex-1">
                                {benefit}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* About Dr. Luan Section */}
                  <Card className="border-border/50">
                    <CardContent className="p-5 md:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="font-kiona text-xl md:text-2xl font-bold text-foreground">
                          Sobre o Dr. Márcio Pelegrina
                        </h2>
                      </div>
                      <Separator className="mb-4" />
                      
                        <div className="grid md:grid-cols-[200px,1fr] gap-6">
                        <div className="relative rounded-lg overflow-hidden shadow-[var(--shadow-elevated)] h-[200px] md:h-auto bg-muted/30 flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <User className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                            <p className="text-xs text-muted-foreground/60">Foto do Doutor</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                          <p>
                            <strong className="text-foreground">Dr. Luan Maciel</strong> é especialista em Lentes de Porcelana, Endodontia e Estética Dental, com atuação precisa e olhar estético apurado. Dedica-se a transformar sorrisos com naturalidade e sofisticação.
                          </p>
                          <p>
                            Com formação sólida e experiência em procedimentos estéticos de alta complexidade, o Dr. Luan Maciel é reconhecido pela excelência técnica, atendimento humanizado e uso de tecnologias de última geração para proporcionar resultados excepcionais.
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Lentes de Porcelana
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Endodontia
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Estética Dental
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Info Cards */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="border-border/50 hover:border-primary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground text-sm mb-1">Duração</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              O procedimento varia conforme complexidade do caso. Consulta inicial para avaliação completa.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 hover:border-primary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground text-sm mb-1">Resultados</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Resultados progressivos e duradouros com acompanhamento profissional adequado.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Info Box */}
                  <Card className="border-accent/20 bg-accent/5">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-accent" />
                        <h3 className="font-semibold text-foreground text-sm">Importante Saber</h3>
                      </div>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                          <span>Plano de tratamento personalizado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                          <span>Acompanhamento pós-tratamento</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                          <span>Tecnologia de última geração</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                          <span>Equipe especializada e experiente</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Contact Info */}
                  <Card className="border-border/50">
                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-semibold text-foreground text-sm mb-3">Informações de Contato</h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-foreground">Telefone</div>
                            <div className="text-muted-foreground">(11) 98338-5832</div>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start gap-2">
                          <MessageCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-foreground">WhatsApp</div>
                            <div className="text-muted-foreground">(11) 98338-5832</div>
                          </div>
                        </div>
                        <Separator />
                        <div className="text-muted-foreground">
                          <strong className="text-foreground">Endereço:</strong><br />
                          R. Emília Marengo, 1040<br />
                          Jardim Anália Franco – São Paulo/SP<br />
                          CEP: 03336-000
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats */}
                  <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardContent className="p-5">
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-2xl font-bold text-foreground">+2000</div>
                          <div className="text-xs text-muted-foreground">Sorrisos Renovados</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-foreground">5+</div>
                          <div className="text-xs text-muted-foreground">Anos</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-foreground">Lentes</div>
                          <div className="text-xs text-muted-foreground">Resina e Porcelana</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-foreground">Endo</div>
                          <div className="text-xs text-muted-foreground">Tratamento de Canal</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact CTA Section */}
        <section className="py-8 md:py-10 bg-gradient-to-br from-primary/3 via-background to-background border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-primary/30 shadow-[var(--shadow-blue)] bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center space-y-4">
                    <h2 className="font-kiona text-xl md:text-2xl font-bold text-foreground">
                      Agende sua Consulta de Avaliação
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                      Entre em contato e receba um plano de tratamento personalizado
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <Button 
                        size="lg" 
                        className="bg-primary hover:bg-primary/90 shadow-[var(--shadow-blue)] w-full sm:w-auto"
                        asChild
                      >
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Falar no WhatsApp
                        </a>
                      </Button>
                      
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/5 w-full sm:w-auto"
                        asChild
                      >
                        <a href="tel:+5511983385832">
                          <Phone className="w-4 h-4 mr-2" />
                          (11) 98338-5832
                        </a>
                      </Button>
                    </div>
                    <p className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-muted-foreground/70 tracking-wide">
                      <ShieldCheck className="w-3 h-3" />
                      Canal exclusivo para pacientes e agendamentos.
                    </p>
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

export default TreatmentDetail;