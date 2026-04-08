import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import mediserviLogo from "@/assets/mediservice-logo.png";
import amilLogo from "@/assets/amil-logo.png";
import sulamericaLogo from "@/assets/sulamerica-logo.png";
import omintLogo from "@/assets/omint-logo.png";
import bradescoLogo from "@/assets/bradesco-saude-logo.png";
import unimedLogo from "@/assets/unimed-logo.png";

const MedicalInsurance = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ul = containerRef.current.querySelector('ul');
      if (ul) {
        const clone = ul.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        containerRef.current.appendChild(clone);
      }
    }
  }, []);

  const convenios = [
    { name: "Mediservice", logo: mediserviLogo },
    { name: "Amil", logo: amilLogo },
    { name: "SulAmérica", logo: sulamericaLogo },
    { name: "Omint Saúde", logo: omintLogo },
    { name: "Bradesco Saúde", logo: bradescoLogo },
    { name: "Unimed", logo: unimedLogo },
  ];

  return (
    <section className="py-6 sm:py-8 bg-background border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-kiona font-bold text-foreground mb-4">
            Convênios Médicos
          </h2>
          <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
            Atendemos os principais planos de saúde e também consultas particulares
          </p>
        </div>

        <div 
          ref={containerRef}
          className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        >
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {convenios.map((convenio, index) => (
              <li key={index}>
                <img 
                  src={convenio.logo} 
                  alt={convenio.name}
                  className="h-16 w-auto object-contain transition-all duration-300 hover:scale-110"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground font-inter">
            Entre em contato para verificar cobertura do seu plano
          </p>
          <div className="mt-4 inline-flex items-center gap-3 bg-amber-50 border-2 border-amber-300 rounded-lg px-6 py-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm font-inter">
              <strong className="text-amber-900">Importante:</strong>{" "}
              <span className="text-amber-800">Não aceitamos convênios odontológicos</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalInsurance;
