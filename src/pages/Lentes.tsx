import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Microscope,
  HeartHandshake,
  ClipboardCheck,
  MonitorSmartphone,
  Scissors,
  Smile,
  ChevronDown,
  MapPin,
  Clock,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { trackWorkingLead } from "@/lib/utils";

// Mensagem dedicada para rastrear a origem (campanha de lentes)
const WHATSAPP_URL =
  "https://wa.me/5519974135932?text=" +
  encodeURIComponent(
    "Olá! Vim pelo site e quero saber sobre as Lentes de Contato Dental. Pode me ajudar?"
  );

const handleClick = () => trackWorkingLead();

const CTA = ({
  label = "Quero avaliar meu sorriso",
  className = "",
}: {
  label?: string;
  className?: string;
}) => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={handleClick}
    className={
      "inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm sm:text-base font-semibold text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-all hover:bg-[#1fb855] hover:-translate-y-0.5 " +
      className
    }
  >
    <WhatsAppIcon className="h-5 w-5" />
    {label}
  </a>
);

const cases = [
  { src: "/lentes/caso-1.webp", alt: "Antes e depois de lentes de contato dental — sorriso transformado" },
  { src: "/lentes/caso-2.webp", alt: "Antes e depois de lentes de contato dental — dentes alinhados e brancos" },
  { src: "/lentes/caso-3.webp", alt: "Reabilitação completa com lentes e porcelana — antes e depois" },
  { src: "/lentes/caso-4.webp", alt: "Reabilitação oral com lentes de porcelana — antes e depois" },
];

const steps = [
  {
    icon: ClipboardCheck,
    title: "Avaliação e diagnóstico",
    text: "Entendemos o que te incomoda no sorriso e avaliamos o seu caso de perto, sem compromisso.",
  },
  {
    icon: MonitorSmartphone,
    title: "Planejamento digital do sorriso",
    text: "Você vê a prévia do seu novo sorriso antes de começar. Nada é feito no improviso.",
  },
  {
    icon: Scissors,
    title: "Preparo minimamente invasivo",
    text: "Técnica conservadora, preservando ao máximo a estrutura natural do seu dente.",
  },
  {
    icon: Smile,
    title: "Seu novo sorriso",
    text: "Instalação das lentes de porcelana sob medida — natural, branco e alinhado.",
  },
];

const reasons = [
  {
    icon: HeartHandshake,
    title: "Especialista em reabilitação",
    text: "Casos simples ou complexos: dentes desgastados, manchados, separados ou tortos.",
  },
  {
    icon: MonitorSmartphone,
    title: "Planejamento digital",
    text: "Você aprova a prévia do seu sorriso antes de qualquer procedimento.",
  },
  {
    icon: Sparkles,
    title: "Porcelana de alta estética",
    text: "Lentes finas e resistentes, com brilho que imita o dente real — sem aparência artificial.",
  },
  {
    icon: ShieldCheck,
    title: "Técnica conservadora",
    text: "Procedimento seguro, respeitando ao máximo a estrutura do seu dente.",
  },
];

const faqs = [
  {
    q: "Lentes de contato dental estragam o dente?",
    a: "Não. A técnica é minimamente invasiva e preserva ao máximo a estrutura natural. Todo o planejamento é feito para proteger o seu dente.",
  },
  {
    q: "Dói para colocar?",
    a: "O procedimento é confortável e, na maioria dos casos, dispensa anestesia profunda. Você é acompanhado de perto em cada etapa.",
  },
  {
    q: "Qual a diferença entre lente e faceta?",
    a: "As lentes de contato dental são mais finas e exigem menos preparo do dente. Na sua avaliação, o Dr. Márcio indica o que faz mais sentido para o seu caso.",
  },
  {
    q: "Quanto tempo demora para ficar pronto?",
    a: "Depende do caso, mas a maioria das transformações é concluída em poucas sessões. Tudo é definido na sua avaliação.",
  },
  {
    q: "As lentes duram quanto tempo?",
    a: "Com os cuidados corretos, as lentes de porcelana têm grande durabilidade e mantêm o brilho por muitos anos.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Na avaliação apresentamos o plano de tratamento e as condições de pagamento de forma transparente, sem compromisso.",
  },
];

const Faq = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-colors hover:bg-white/[0.06]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-inter text-sm sm:text-base font-medium text-foreground">{q}</span>
        <ChevronDown
          className={"h-5 w-5 shrink-0 text-accent transition-transform " + (open ? "rotate-180" : "")}
        />
      </div>
      {open && <p className="mt-3 font-inter text-sm leading-relaxed text-foreground/70">{a}</p>}
    </button>
  );
};

const Lentes = () => {
  useEffect(() => {
    document.title = "Lentes de Contato Dental em São Paulo | Dr. Márcio Pelegrina";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow"; // LP de tráfego pago — não competir no orgânico
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header minimal — sem navegação para não dar saída */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          <span className="font-kiona text-sm sm:text-base font-bold tracking-wide">
            Dr. Márcio Pelegrina
          </span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#1fb855]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">Falar</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--accent)_/_0.08),transparent_60%)]" />
        <div className="container relative mx-auto grid items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              Lentes de Contato Dental • São Paulo
            </p>
            <h1 className="font-kiona text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              Volte a sorrir <span className="text-accent">sem pensar duas vezes</span>
            </h1>
            <p className="mx-auto max-w-xl font-inter text-base text-foreground/80 lg:mx-0">
              Lentes de porcelana sob medida que devolvem a naturalidade — e a confiança —
              do seu sorriso. Planejadas digitalmente por um especialista em reabilitação oral.
            </p>

            <div className="flex flex-col items-center gap-2 lg:items-start">
              <CTA label="Quero avaliar meu sorriso" className="w-full sm:w-auto" />
              <p className="text-[11px] text-muted-foreground">
                Resposta em até 5 minutos • Atendimento humano e sem compromisso
              </p>
            </div>
          </div>

          {/* Caso de destaque no hero */}
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/10 to-transparent blur-2xl" />
            <img
              src="/lentes/caso-1.webp"
              alt="Antes e depois de lentes de contato dental do Dr. Márcio Pelegrina"
              className="relative w-full rounded-3xl border border-white/10 shadow-gold-lg"
              loading="eager"
              width={800}
              height={800}
            />
            <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur">
              Caso real
            </span>
          </div>
        </div>
      </section>

      {/* FAIXA DE CONFIANÇA */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto grid grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4">
          {[
            { k: "CROSP 116495", v: "Registro ativo" },
            { k: "Especialista", v: "Reabilitação Oral" },
            { k: "Perdizes • SP", v: "Atendimento presencial" },
            { k: "Porcelana", v: "Alta estética" },
          ].map((item) => (
            <div key={item.k} className="text-center">
              <p className="font-kiona text-sm font-bold text-foreground sm:text-base">{item.k}</p>
              <p className="text-[11px] text-muted-foreground">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA — processo */}
      <section className="container mx-auto px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Passo a passo</p>
          <h2 className="mt-2 font-kiona text-2xl font-bold sm:text-3xl">
            Como funciona o seu tratamento
          </h2>
          <p className="mt-3 font-inter text-sm text-foreground/70">
            Um processo transparente e acolhedor, do primeiro contato ao novo sorriso.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="font-kiona text-3xl font-bold text-accent/30">0{i + 1}</span>
              <s.icon className="mt-2 h-7 w-7 text-accent" />
              <h3 className="mt-3 font-kiona text-base font-bold">{s.title}</h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-foreground/70">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRANSFORMAÇÕES — prova central */}
      <section className="bg-white/[0.02] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Resultados reais</p>
            <h2 className="mt-2 font-kiona text-2xl font-bold sm:text-3xl">
              Transformações feitas pelo Dr. Márcio
            </h2>
            <p className="mt-3 font-inter text-sm text-foreground/70">
              Casos reais de pacientes. Veja o antes e o depois.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cases.map((c) => (
              <div
                key={c.src}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <img
                  src={c.src}
                  alt={c.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <CTA label="Quero um resultado assim" />
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="container mx-auto px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Diferenciais</p>
          <h2 className="mt-2 font-kiona text-2xl font-bold sm:text-3xl">
            Por que tratar com o Dr. Márcio
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
            >
              <r.icon className="mx-auto h-8 w-8 text-accent" />
              <h3 className="mt-4 font-kiona text-base font-bold">{r.title}</h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-foreground/70">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA INTERMEDIÁRIO */}
      <section className="bg-white/[0.02] py-14">
        <div className="container mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-kiona text-xl font-bold sm:text-2xl">
            Cada sorriso é único e precisa ser avaliado individualmente
          </h2>
          <p className="mt-3 font-inter text-sm text-foreground/70">
            Tem dúvida se as lentes são indicadas para o seu caso? Fale com a gente — explicamos
            tudo, sem compromisso.
          </p>
          <div className="mt-6 flex justify-center">
            <CTA label="Conversar no WhatsApp" />
          </div>
        </div>
      </section>

      {/* AUTORIDADE */}
      <section className="container mx-auto grid items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="relative mx-auto max-w-sm">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/10 to-transparent blur-2xl" />
          <img
            src="/lentes/dr-marcio.webp"
            alt="Dr. Márcio Pelegrina, especialista em reabilitação oral"
            loading="lazy"
            className="relative w-full rounded-3xl border border-white/10"
          />
        </div>
        <div className="space-y-5 text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Quem vai cuidar de você</p>
          <h2 className="font-kiona text-2xl font-bold sm:text-3xl">Dr. Márcio Pelegrina</h2>
          <p className="font-inter text-sm leading-relaxed text-foreground/80">
            Cirurgião-dentista especialista em Prótese Dentária e Reabilitação Oral
            (CROSP 116495). Une técnica avançada e um atendimento humano e acolhedor para
            devolver não só o sorriso, mas a confiança de cada paciente.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground/70 lg:justify-start">
            <MapPin className="h-4 w-4 text-accent" />
            Perdizes, São Paulo
          </div>
          <div className="flex justify-center lg:justify-start">
            <CTA label="Agendar minha avaliação" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white/[0.02] py-16">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Dúvidas comuns</p>
            <h2 className="mt-2 font-kiona text-2xl font-bold sm:text-3xl">
              Antes de dar o próximo passo
            </h2>
          </div>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <Faq key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)_/_0.1),transparent_65%)]" />
        <div className="container relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <Clock className="mx-auto h-8 w-8 text-accent" />
          <h2 className="mt-4 font-kiona text-2xl font-bold leading-tight sm:text-4xl">
            Seu novo sorriso pode começar hoje
          </h2>
          <p className="mt-4 font-inter text-base text-foreground/80">
            Fale agora no WhatsApp e agende sua avaliação. Atendimento humano, sem compromisso.
          </p>
          <div className="mt-8 flex justify-center">
            <CTA label="Quero avaliar meu sorriso" className="w-full sm:w-auto" />
          </div>
          <p className="mt-4 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3 w-3" />
            Canal exclusivo para pacientes e agendamentos
          </p>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-white/10 py-8 text-center">
        <p className="font-kiona text-sm font-bold">Dr. Márcio Pelegrina</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Prótese Dentária e Reabilitação Oral • CROSP 116495 • Perdizes, São Paulo
        </p>
        <a
          href="https://sp3company.com/assessoria-clinica"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Site Desenvolvido Por SP3"
          className="mt-5 inline-block transition-opacity hover:opacity-80"
        >
          <img
            src={new URL("../assets/sp3-logo-new.webp", import.meta.url).href}
            alt="Site Desenvolvido Por SP3"
            className="mx-auto h-10 w-auto"
          />
        </a>
      </footer>
      {/* O botão flutuante de WhatsApp (com popup) é global, renderizado pelo App */}
    </div>
  );
};

export default Lentes;
