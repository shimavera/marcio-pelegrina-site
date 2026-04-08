import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";

// Import images
import drLuanMicroscopio from "@/assets/dr-luan-microscopio.webp";
import drLuanMacielLogo from "@/assets/dr-luan-maciel-logo-new.webp";

const LinkBio = () => {
  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=5511983385832&text=Ol%C3%A1%21+Acabei+de+visitar+seu+site.+Pode+me+passar+mais+informa%C3%A7%C3%B5es%3F&type=phone_number&app_absent=0', '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Dr. Luan Maciel - Odontologia Avançada',
          text: 'Especialista em Lentes Dentais e Endodontia',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="max-w-md mx-auto px-4 py-8">
        
        {/* Header com Background */}
        <div className="relative mb-20 -mx-4 -mt-8">
          <div className="h-48 overflow-hidden relative">
            <img 
              src={drLuanMicroscopio}
              alt="Dr. Luan Maciel - Odontologia Avançada"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          {/* Logo - metade dentro, metade fora */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
            <div className="w-32 h-32 rounded-full bg-background shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 flex items-center justify-center p-2">
              <img 
                src={drLuanMacielLogo}
                alt="Dr. Luan Maciel - Odontologia Avançada"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="px-2">
          {/* Description */}
          <h1 className="text-center text-foreground mb-1 font-medium text-sm">
            Dr. Luan Maciel - Odontologia Avançada
          </h1>
          <p className="text-center text-muted-foreground mb-6 text-xs">
            Especialista em Lentes Dentais e Endodontia. +2.000 sorrisos renovados no Jardim Anália Franco, São Paulo.
          </p>

          {/* Action Buttons */}
          <div className="grid gap-3 md:gap-4 mb-6">
            <button 
              onClick={handleWhatsAppClick}
              className="block w-full group"
            >
              <Button className="w-full h-12 bg-card hover:bg-muted text-foreground border-2 border-border hover:border-primary rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg">
                <FaWhatsapp className="mr-2 text-lg text-[#25D366]" />
                Agende sua Consulta!
              </Button>
            </button>

            <a 
              href="https://drluanmaciel.com"
              target="_blank" 
              rel="noopener noreferrer" 
              className="block group"
            >
              <Button className="w-full h-12 bg-card hover:bg-muted text-foreground border-2 border-border hover:border-primary rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg">
                <IoMdGlobe className="mr-2 text-lg text-[#0077B5]" />
                Acesse Nosso Site
              </Button>
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-8 mb-6">
            <a 
              href="https://www.instagram.com/drluanmaciel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-3xl text-muted-foreground hover:text-[#E4405F] hover:scale-110 transition-all duration-300"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="flex items-center justify-center gap-2 mx-auto text-muted-foreground hover:text-primary transition-colors duration-300 py-2 px-4 rounded-full hover:bg-muted"
          >
            <Share2 size={16} />
            <span className="text-xs font-medium">Compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkBio;
