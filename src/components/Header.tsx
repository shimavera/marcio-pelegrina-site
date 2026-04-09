import { Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { trackWorkingLead } from "@/lib/utils";
import logoHeader from "@/assets/marcio/logo-header.webp";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Quem Sou", path: "/doutores" },
    { name: "Especialidade", path: "/especialidade" },
    { name: "Tratamentos", path: "/servicos" },
    { name: "Galeria", path: "/galeria" },
    { name: "Blog", path: "/blog" }
  ];

  const isActive = (path: string) => location.pathname === path;
  
  const handleWhatsAppClick = () => {
    trackWorkingLead();
  };

  return (
    <header className="fixed top-8 sm:top-9 left-0 right-0 z-50 glass-effect border-b border-border/50 shadow-elevated">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center animate-fade-in">
            <img src={logoHeader} alt="PLGRN - Márcio Pelegrina Reabilitação Oral" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive(item.path) ? "text-foreground font-semibold" : "text-foreground/70"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Right (Desktop) */}
          <div className="hidden lg:flex flex-col items-center">
            <Button className="hover-lift bg-[#25D366] hover:bg-[#1fb855] text-white shadow-[0_6px_20px_rgba(37,211,102,0.3)]" asChild>
              <a href="https://wa.me/5519974135932?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta" target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
                Agendar Consulta
              </a>
            </Button>
            <p className="flex items-center gap-1 text-[10px] text-muted-foreground/70 tracking-wide mt-1">
              <ShieldCheck className="w-3 h-3" />
              Canal exclusivo para pacientes e agendamentos.
            </p>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu de navegação">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full border-b">
              <div className="flex flex-col gap-6 mt-8 pb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-all duration-300 hover:text-foreground hover:translate-x-2 ${
                      isActive(item.path) ? "text-foreground font-semibold" : "text-foreground/70"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="hover-lift bg-[#25D366] hover:bg-[#1fb855] text-white shadow-[0_6px_20px_rgba(37,211,102,0.3)] w-full" asChild>
                  <a href="https://wa.me/5519974135932?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta" target="_blank" rel="noopener noreferrer" onClick={() => { setIsOpen(false); handleWhatsAppClick(); }}>
                    Agendar Consulta
                  </a>
                </Button>
                <p className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground/70 tracking-wide">
                  <ShieldCheck className="w-3 h-3" />
                  Canal exclusivo para pacientes e agendamentos.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
