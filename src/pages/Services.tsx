import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Smile, Sparkles, Heart, Shield, Wrench, Syringe, Scan } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

const treatments = [
  {
    title: "Reabilitação Oral",
    description: "Planejamento completo para devolver função e estética ao sorriso, com próteses e restaurações personalizadas.",
    icon: Sparkles,
  },
  {
    title: "Lentes de Contato Dental",
    description: "Lâminas ultrafinas de porcelana que transformam o sorriso com naturalidade e harmonia.",
    icon: Smile,
  },
  {
    title: "Clareamento Dental",
    description: "Tratamento seguro e eficaz para devolver a brancura natural aos dentes.",
    icon: Stethoscope,
  },
  {
    title: "Restaurações Estéticas",
    description: "Restaurações em resina ou porcelana que devolvem forma, cor e função aos dentes.",
    icon: Wrench,
  },
  {
    title: "Prótese Dentária",
    description: "Soluções modernas e confortáveis para substituição de dentes perdidos, devolvendo função mastigatória e estética.",
    icon: Shield,
  },
  {
    title: "Placa de Bruxismo",
    description: "Proteção personalizada contra o desgaste dental causado pelo apertamento e ranger dos dentes.",
    icon: Scan,
  },
  {
    title: "Implantodontia",
    description: "Implantes dentários com tecnologia avançada para substituição definitiva de dentes perdidos.",
    icon: Syringe,
  },
  {
    title: "Endodontia",
    description: "Tratamento de canal moderno e confortável, preservando o dente natural com segurança.",
    icon: Heart,
  },
  {
    title: "Periodontia",
    description: "Tratamento especializado para saúde gengival, prevenção e controle de doenças periodontais.",
    icon: Stethoscope,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 px-4">
          <div className="container mx-auto">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-16">
                <p className="text-accent font-inter text-sm uppercase tracking-[0.2em] mb-3 inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
                  Tratamentos
                </p>
                <h1 className="font-kiona text-4xl md:text-5xl font-bold mb-4 text-foreground mt-4">
                  Nossos Tratamentos
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Oferecemos uma gama completa de tratamentos odontológicos avançados,
                  combinando técnica, experiência e cuidado humanizado.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatments.map((treatment, index) => {
                const IconComponent = treatment.icon;
                return (
                  <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
                    <Card className="hover-lift h-full border-border hover:border-accent/30 transition-all duration-300">
                      <CardHeader>
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/80 via-accent/60 to-primary/40 flex items-center justify-center mb-4 shadow-lg">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg">{treatment.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          {treatment.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
