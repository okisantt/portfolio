"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/motion/FadeIn";

type Experience = {
  company: string;
  href?: string;
  role: string;
  period: string;
  bullets: string[];
};

const EXPERIENCES: Experience[] = [
  {
    company: "G4S Vanguarda",
    href: "https://www.g4s.com/pt-br",
    role: "Vigilante Patrimonial",
    period: "Jan 2024 — Presente",
    bullets: [
      "Controle de acesso de pessoas e veículos, conferência de credenciais e registro de entradas/saídas.",
      "Rondas preventivas em áreas operacionais, identificação de anomalias e acionamento conforme procedimentos.",
      "Atendimento e registro de ocorrências, comunicação via rádio e elaboração de relatórios.",
      "Cumprimento de normas internas e apoio à rotina de segurança patrimonial em ambiente industrial.",
      "Elaboração e atualização de relatórios operacionais em Excel/Word/PowerBI, com padronização de registros e controle de ocorrências.",
      "Monitoramento ativo de CFTV (câmeras e pontos críticos), identificação de desvios e acionamento conforme protocolo.",
    ],
  },
  {
    company: "AATEC",
    href: "https://www.aatec.com.br/",
    role: "Parceiro Administrativo",
    period: "Set 2024 — Dez 2024",
    bullets: [
      "Participação no evento da AATEC, com envolvimento em discussões e workshops focados em avanços e tendências tecnológicas, ampliando conhecimentos e networking com profissionais da área.",
    ],
  },
  {
    company: "Madil Carreiras",
    href: "https://www.linkedin.com/company/lumiicarreiras/",
    role: "Moderador",
    period: "Mai 2024 — Nov 2024",
    bullets: [
      "Gerenciamento e organização de uma comunidade voltada para o mercado de trabalho e T.I., promovendo debates, compartilhamento de conhecimento e suporte aos membros.",
    ],
  },
];

function ExperienceContent({ exp }: { exp: Experience }) {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-medium text-text">
        {exp.role}{" "}
        <span className="text-text/70">
          @{" "}
          {exp.href ? (
            <a
              href={exp.href}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              {exp.company}
            </a>
          ) : (
            <span className="text-accent">{exp.company}</span>
          )}
        </span>
      </h3>

      <p className="mt-2 text-xs sm:text-sm font-mono text-muted">{exp.period}</p>

      <ul className="mt-5 space-y-3 text-sm text-muted leading-relaxed">
        {exp.bullets.map((b) => (
          <li key={b} className="relative pl-6">
            <span className="absolute left-0 top-[2px] text-accent">▸</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Timeline() {
  const [active, setActive] = useState(0);
  const exp = EXPERIENCES[active];

  const tallest = useMemo(() => {
    const score = (e: Experience) =>
      e.company.length +
      e.role.length +
      e.period.length +
      e.bullets.reduce((s, b) => s + b.length, 0);

    return EXPERIENCES.reduce(
      (best, cur) => (score(cur) > score(best) ? cur : best),
      EXPERIENCES[0]
    );
  }, []);

  return (
    <section id="experiencia" className="py-section-y scroll-mt-24 md:scroll-mt-28">
      <Container>
        {/* ✅ ÚNICO lugar que controla o “empurrão” do 02 + conteúdo (desktop) */}
        <div className="md:pl-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="whitespace-nowrap font-mono tabular-nums text-base md:text-lg text-accent">
              02.
            </span>

            <h2 className="whitespace-nowrap text-lg md:text-xl font-semibold tracking-tight text-text/90">
              Experiência
            </h2>

            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Conteúdo */}
          <div className="grid gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
            {/* Tabs mobile */}
            <div className="md:hidden -mx-4 px-4 overflow-x-auto">
              <div className="flex min-w-max border-b border-white/10">
                {EXPERIENCES.map((e, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={e.company}
                      type="button"
                      onClick={(ev) => {
                        (ev.currentTarget as HTMLButtonElement).focus({
                          preventScroll: true,
                        });
                        setActive(i);
                      }}
                      className={cn(
                        "relative px-4 py-3 text-sm font-mono transition",
                        isActive ? "text-accent" : "text-muted hover:text-text"
                      )}
                    >
                      <span>{e.company}</span>
                      <span
                        className={cn(
                          "absolute left-0 right-0 -bottom-[1px] h-[2px] transition",
                          isActive ? "bg-accent" : "bg-transparent"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lista desktop */}
            <div className="hidden md:block">
              <div className="relative pl-3">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

                <div className="flex flex-col">
                  {EXPERIENCES.map((e, i) => {
                    const isActive = i === active;
                    return (
                      <button
                        key={e.company}
                        type="button"
                        onClick={(ev) => {
                          (ev.currentTarget as HTMLButtonElement).focus({
                            preventScroll: true,
                          });
                          setActive(i);
                        }}
                        className={cn(
                          "group relative w-full text-left pl-4 pr-3 py-3 text-sm font-mono transition",
                          isActive
                            ? "text-accent bg-white/5"
                            : "text-muted hover:text-text"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-0 h-full w-[2px] transition",
                            isActive
                              ? "bg-accent"
                              : "bg-transparent group-hover:bg-white/20"
                          )}
                        />
                        {e.company}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Painel direito */}
            <FadeIn>
              <div className="relative overflow-hidden">
                <div aria-hidden="true" className="invisible pointer-events-none">
                  <ExperienceContent exp={tallest} />
                </div>

                <div className="absolute inset-0">
                  <ExperienceContent exp={exp} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
