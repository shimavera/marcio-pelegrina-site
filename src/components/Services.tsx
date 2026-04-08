import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import esteticaIcon from "@/assets/estetica-icon.png";
import saudeIcon from "@/assets/saude-icon.png";
const Services = () => {
  const aestheticServices = ["Lentes dentais em resina", "Lentes dentais em porcelana", "Reabilitação estética do sorriso", "Clareamento dental", "Restaurações estéticas"];
  const healthServices = ["Endodontia (tratamento de canal)", "Gengivectomia / plástica gengival", "Limpeza e profilaxia"];
  return <section className="py-6 sm:py-8 lg:py-12 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-gold opacity-5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-accent font-inter text-sm uppercase tracking-wider mb-3 inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
            Tratamentos
          </p>
          <h2 className="font-kiona text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-4">
            Odontologia Avançada<br />
            <span className="text-accent"></span>
          </h2>
          <p className="text-muted-foreground font-inter text-lg max-w-3xl mx-auto leading-relaxed">
            Oferecemos tratamentos odontológicos de alta qualidade com foco em <strong>estética dental</strong> e <strong>saúde bucal</strong>, 
            proporcionando resultados naturais e duradouros.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Estética */}
          <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 animate-fade-in-up">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:rounded-full">
                  <img src={esteticaIcon} alt="Estética Dental" className="w-[50px] h-[50px] relative z-10" />
                </div>
                <div>
                  <h3 className="font-kiona text-2xl font-semibold text-foreground mb-2">
                    Estética Dental
                  </h3>
                  <p className="text-sm text-accent font-inter">Transforme seu sorriso</p>
                </div>
              </div>
              
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

          {/* Saúde e Dor */}
          <Card className="bg-card border-border hover:border-accent/30 transition-all duration-300 animate-fade-in-up" style={{
          animationDelay: '0.1s'
        }}>
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:rounded-full">
                  <img src={saudeIcon} alt="Saúde Bucal" className="w-[50px] h-[50px] relative z-10" />
                </div>
                <div>
                  <h3 className="font-kiona text-2xl font-semibold text-foreground mb-2">
                    Saúde Bucal
                  </h3>
                  <p className="text-sm text-accent font-inter">Tratamentos especializados</p>
                </div>
              </div>
              
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

        <div className="flex justify-center mt-12 animate-fade-in-up" style={{
        animationDelay: '0.2s'
      }}>
          <Link to="/servicos">
            <button className="px-8 py-4 bg-gradient-gold hover:opacity-90 text-accent-foreground font-inter font-semibold text-base rounded-lg transition-all duration-300 hover-lift shadow-gold flex items-center gap-2">
              Ver todos os tratamentos
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>;
};
export default Services;