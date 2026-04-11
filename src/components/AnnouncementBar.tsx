import { useState, useEffect } from "react";
import { ShieldCheck, AlertTriangle, Info } from "lucide-react";

const announcements = [
  { text: "Atendimento exclusivamente particular", icon: ShieldCheck },
];

const AnnouncementBar = () => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % announcements.length);
        setFading(false);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { text, icon: Icon } = announcements[current];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-black border-b border-white/10">
      <div className="flex items-center justify-center h-8 sm:h-9 px-3">
        <p
          className={`flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-foreground/80 transition-opacity duration-400 text-center leading-tight ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Icon className="w-3.5 h-3.5 flex-shrink-0 text-foreground/60" />
          <span>{text}</span>
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
