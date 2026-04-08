import whatsappIcon from "@/assets/whatsapp-icon.png";
import { trackWorkingLead } from "@/lib/utils";

const WhatsAppButton = () => {
  const whatsappUrl = "#";

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
