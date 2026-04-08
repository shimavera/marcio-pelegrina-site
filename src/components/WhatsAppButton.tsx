import whatsappIcon from "@/assets/whatsapp-icon.png";
import { trackWorkingLead } from "@/lib/utils";

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/5519974135932?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta";

  const handleClick = () => {
    trackWorkingLead();
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-4 z-50 animate-fade-in hover:scale-110 transition-all duration-300"
      aria-label="Fale conosco no WhatsApp"
    >
      <img 
        src={whatsappIcon} 
        alt="WhatsApp" 
        className="h-14 w-14 drop-shadow-lg"
      />
    </a>
  );
};

export default WhatsAppButton;
