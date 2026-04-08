import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackWorkingLead } from "@/lib/utils";
import especialidadeIcon from "@/assets/especialidade-icon.png";
import saudeBucalIcon from "@/assets/saude-bucal-icon.png";
const Especialidade = () => {
  const handleWhatsAppClick = () => {
    trackWorkingLead();
  };
  const aestheticServices = ["Lentes dentais em resina", "Lentes dentais em porcelana", "Reabilitação estética do sorriso", "Clareamento dental", "Limpeza e profilaxia"];
  const healthServices = ["Endodontia (tratamento de canal)", "Gengivectomia / plástica gengival", "Restaurações estéticas"];
  return <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-12 sm:py-16 lg:py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-gold opacity-5 blur-[120px] rounded-full" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <p className="text-accent font-inter text-sm uppercase tracking-wider mb-3 inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
                Especialidades
              </p>
              <h1 className="font-kiona text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
                Odontologia Avançada<br />
                
              </h1>
              <p className="text-muted-foreground font-inter text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-8">
                Tratamentos odontológicos de alta qualidade com foco em estética dental e saúde bucal, 
                proporcionando resultados naturais e duradouros.
              </p>
              <p className="text-foreground/90 font-inter text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Oferecemos <strong className="text-accent">lentes dentais</strong> em resina e porcelana para transformar seu sorriso, 
                além de <strong className="text-accent">tratamento de canal</strong> com técnicas modernas e confortáveis.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              {/* Estética Dental */}
              <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
                      <img src={especialidadeIcon} alt="Estética Dental" className="w-[50px] h-[50px]" />
                    </div>
                    <div>
                      <h2 className="font-kiona text-2xl font-semibold text-foreground mb-2">
                        Estética Dental
                      </h2>
                      <p className="text-sm text-accent font-inter">Transforme seu sorriso</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground font-inter mb-6 leading-relaxed">
                    Lentes dentais são finas lâminas aplicadas sobre os dentes para corrigir cor, forma, tamanho e alinhamento, 
                    proporcionando um sorriso natural e harmonioso.
                  </p>
                  
                  <ul className="space-y-3">
                    {aestheticServices.map((service, index) => <li key={index} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-foreground/80 font-inter leading-relaxed group-hover:text-foreground transition-colors">
                          {service}
                        </span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>

              {/* Saúde Bucal */}
              <Card className="bg-card border-border hover:border-accent/30 transition-all duration-300 animate-fade-in-up" style={{
              animationDelay: '0.1s'
            }}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center flex-shrink-0 shadow-gold">
                      <img src={saudeBucalIcon} alt="Saúde Bucal" className="w-[50px] h-[50px]" />
                    </div>
                    <div>
                      <h2 className="font-kiona text-2xl font-semibold text-foreground mb-2">
                        Saúde Bucal
                      </h2>
                      <p className="text-sm text-accent font-inter">Tratamentos especializados</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground font-inter mb-6 leading-relaxed">
                    Tratamento de canal moderno e confortável, utilizando técnicas avançadas para preservar seu dente natural 
                    e eliminar a dor de forma eficaz.
                  </p>
                  
                  <ul className="space-y-3">
                    {healthServices.map((service, index) => <li key={index} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-foreground/80 font-inter leading-relaxed group-hover:text-foreground transition-colors">
                          {service}
                        </span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center animate-fade-in-up" style={{
            animationDelay: '0.2s'
          }}>
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                <h3 className="font-kiona text-2xl md:text-3xl font-bold text-foreground mb-4">
                  +2.000 Sorrisos Renovados
                </h3>
                <p className="text-muted-foreground font-inter text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Dr. Luan Maciel oferece atendimento personalizado no Jardim Anália Franco, 
                  com foco em naturalidade, segurança e resultados excepcionais.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/servicos">
                    <button className="px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-inter font-semibold text-base rounded-lg transition-all duration-300 hover-lift shadow-gold flex items-center gap-2 w-full sm:w-auto justify-center">
                      Ver Todos os Tratamentos
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <a href="https://api.whatsapp.com/send/?phone=5511983385832&text=Ol%C3%A1%21+Acabei+de+visitar+seu+site.+Pode+me+passar+mais+informa%C3%A7%C3%B5es%3F&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
                    <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-semibold text-base rounded-lg transition-all duration-300 hover-lift shadow-gold flex items-center gap-2 w-full sm:w-auto justify-center">
                      Agendar Consulta
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Especialidade;