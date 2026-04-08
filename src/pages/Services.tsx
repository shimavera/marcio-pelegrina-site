import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Smile, Sparkles, Activity, Heart, Scissors, Syringe, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import lentesIcon from "@/assets/lentes-icon.png";
import canalIcon from "@/assets/canal-icon.png";
import profilaxiaIcon from "@/assets/profilaxia-icon.png";
import proteseIcon from "@/assets/protese-icon.png";
import resinaIcon from "@/assets/resina-icon.png";
import remocaoLentesIcon from "@/assets/remocao-lentes-icon.png";
import gengivoplastiaIcon from "@/assets/gengivoplastia-icon.png";
import implantesIcon from "@/assets/implantes-icon.png";

// Map icon names to components
const iconMap: Record<string, any> = {
  Stethoscope,
  Smile,
  Sparkles,
  Activity,
  Heart,
  Scissors,
  Syringe,
  Users,
};

// Map custom image icons by treatment slug
const customIconMap: Record<string, string> = {
  "lentes-de-porcelana": lentesIcon,
  "tratamento-de-canal": canalIcon,
  "profilaxia-limpeza": profilaxiaIcon,
  "protese-protocolo": proteseIcon,
  "lentes-de-resina": resinaIcon,
  "remocao-de-lentes": remocaoLentesIcon,
  "gengivoplastia": gengivoplastiaIcon,
  "implantes-dentarios": implantesIcon,
};

interface Treatment {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  icon_name: string;
}

const Services = () => {
  const { data: treatments, isLoading } = useQuery<Treatment[]>({
    queryKey: ['all-treatments'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('treatments')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return (data || []) as Treatment[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-muted-foreground">Carregando tratamentos...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                Nossos Tratamentos
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Oferecemos uma gama completa de tratamentos odontológicos avançados,
                combinando tecnologia de ponta com excelência clínica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatments?.map((treatment, index) => {
                const IconComponent = iconMap[treatment.icon_name] || Stethoscope;
                const customIcon = customIconMap[treatment.slug];
                return (
                  <Link
                    key={treatment.id}
                    to={`/tratamentos/${treatment.slug}`}
                    className="group"
                  >
                    <Card className="hover-lift animate-fade-in h-full relative" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardHeader>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground absolute top-6 right-6 group-hover:text-foreground transition-colors" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 flex items-center justify-center mb-4 shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:rounded-full">
                          {customIcon ? (
                            <img src={customIcon} alt={treatment.title} className="w-[50px] h-[50px] relative z-10" />
                          ) : (
                            <IconComponent className="w-6 h-6 text-white relative z-10" />
                          )}
                        </div>
                        <CardTitle>{treatment.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {treatment.short_description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
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
