import { useState, useEffect } from "react";
import { X } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp-icon.webp";
import drMarcioAvatar from "@/assets/marcio/dr-marcio-avatar.webp";
import { trackWorkingLead } from "@/lib/utils";

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/5519974135932?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta";
  const [showPopup, setShowPopup] = useState(false);
  const [shake, setShake] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Vibrar após 10s
    const shakeTimer = setTimeout(() => {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
    }, 10000);

    // Mostrar popup após 12s (apenas se não dispensado)
    const popupTimer = setTimeout(() => {
      setShowPopup((prev) => (dismissed ? prev : true));
    }, 12000);

    // Vibrar periodicamente a cada 30s
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
    }, 30000);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(popupTimer);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    trackWorkingLead();
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopup(false);
    setDismissed(true);
  };

  return (
    <>
      {/* Popup mensagem */}
      {showPopup && !dismissed && (
        <div className="fixed bottom-6 right-20 z-50 animate-fade-in-up max-w-[280px]">
          <div className="bg-white rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
              <img
                src={drMarcioAvatar}
                alt="Dr. Márcio"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">Dr. Márcio Pelegrina</p>
                <p className="text-green-200 text-xs">Online agora</p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="block p-4 hover:bg-gray-50 transition-colors"
            >
              <p className="text-foreground text-sm leading-relaxed">
                Olá! Agende sua avaliação comigo.
              </p>
              <p className="text-[#25D366] text-xs font-semibold mt-2 flex items-center gap-1">
                Responder no WhatsApp <span className="text-base leading-none">→</span>
              </p>
            </a>
          </div>
        </div>
      )}

      {/* Botão WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`fixed bottom-6 right-4 z-50 hover:scale-110 transition-all duration-300 ${
          shake ? "animate-whatsapp-shake" : ""
        }`}
        aria-label="Fale conosco no WhatsApp"
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="h-14 w-14 drop-shadow-lg"
        />
      </a>

      <style>{`
        @keyframes whatsapp-shake {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-12deg) scale(1.1); }
          20% { transform: rotate(12deg) scale(1.1); }
          30% { transform: rotate(-8deg) scale(1.05); }
          40% { transform: rotate(8deg) scale(1.05); }
          50% { transform: rotate(-4deg); }
          60% { transform: rotate(4deg); }
          70% { transform: rotate(0deg); }
        }
        .animate-whatsapp-shake {
          animation: whatsapp-shake 1s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
