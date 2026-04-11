import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { trackWorkingLead } from "@/lib/utils";
import logoFooter from "@/assets/marcio/logo-footer.webp";
import { WhatsAppIcon as MessageCircle } from "@/components/icons/WhatsAppIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-gold opacity-5 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 py-12 md:py-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-4 items-start">
            <img src={logoFooter} alt="Márcio Pelegrina - Reabilitação Oral" className="h-12 w-auto" />
            <p className="text-muted-foreground font-inter text-sm leading-relaxed max-w-xs">
              Especialista em Prótese Dentária e Reabilitação Oral.
              Atendimento humano, acolhedor e de excelência.
            </p>
            <div className="text-muted-foreground/70 font-inter text-xs space-y-1">
              <p className="font-semibold text-foreground">Rua Turiassu, 578</p>
              <p>Perdizes – São Paulo, SP - 05005-000</p>
              <p className="mt-2 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-foreground" />
                <span className="font-semibold text-foreground">WhatsApp:</span> (19) 97413-5932
              </p>
              <p className="mt-2 text-accent font-semibold">Segunda a Sexta, das 08h às 19h</p>
            </div>
          </div>

          {/* Navigation Column - Tratamentos */}
          <div className="flex flex-col gap-4">
            <h3 className="text-foreground font-semibold text-lg font-inter">Tratamentos</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-muted-foreground text-sm font-inter">Reabilitação Oral</span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm font-inter">Lentes de Contato Dental</span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm font-inter">Clareamento Dental</span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm font-inter">Implantodontia</span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm font-inter">Prótese Dentária</span>
              </li>
              <li>
                <Link to="/servicos" className="text-accent hover:text-accent/80 transition-colors duration-300 text-sm font-inter font-semibold">
                  Ver Todos
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column - Institucional & Social */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-foreground font-semibold text-lg font-inter">Institucional</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-inter">
                    Início
                  </Link>
                </li>
                <li>
                  <Link to="/doutores" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-inter">
                    Quem Sou
                  </Link>
                </li>
                <li>
                  <Link to="/servicos" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-inter">
                    Tratamentos
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-inter">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/politica-privacidade" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-inter">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <a 
                    href="/functions/v1/rss" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-inter inline-flex items-center gap-2"
                  >
                    RSS Feed
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={trackWorkingLead} 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-inter"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Colaboradores Button */}
            <div className="flex flex-col gap-3">
            <Link 
              to="/admin/blog" 
              className="inline-flex items-center justify-center px-5 py-2.5 border border-primary/30 text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 text-sm font-inter w-fit"
              style={{ borderRadius: '15px' }}
            >
              Colaboradores
            </Link>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-3">
              <h3 className="text-foreground font-semibold text-sm font-inter">Redes Sociais</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/5519974135932"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/marciopelegrina?igsh=eXU2amxibGJzZTJt"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4">
            <div className="text-muted-foreground font-inter text-xs text-center lg:text-left">
              <p className="font-semibold text-foreground">Dr. Márcio Pelegrina - Prótese Dentária e Reabilitação Oral</p>
              <p className="mt-1">CROSP: 116495</p>
            </div>
            
            {/* SP3 Logo - Centered */}
            <div className="flex items-center justify-center">
              <a 
                href="https://sp3company.com/assessoria-clinica" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80 duration-300"
                aria-label="Site Desenvolvido Por SP3"
              >
                <img 
                  src={new URL('../assets/sp3-logo-new.png', import.meta.url).href}
                  alt="Site Desenvolvido Por SP3" 
                  className="h-16 w-auto"
                />
              </a>
            </div>
            
            <p className="text-muted-foreground font-inter text-xs text-center lg:text-right">
              © {currentYear} Dr. Márcio Pelegrina. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
