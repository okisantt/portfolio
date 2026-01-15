"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

type Shot = { src: string; label: string; alt: string };

export default function EpiSentinelShots() {
  const shots: Shot[] = useMemo(
    () => [
      {
        src: "/projects/epi-sentinel01.png",
        label: "Tela 01 — Login",
        alt: "EPI Sentinel - Tela de Login",
      },
      {
        src: "/projects/epi-sentinel02.png",
        label: "Tela 02 — Dashboard",
        alt: "EPI Sentinel - Dashboard",
      },
      {
        src: "/projects/epi-sentinel03.png",
        label: "Tela 03 — Auditoria",
        alt: "EPI Sentinel - Auditoria",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [revealMobile, setRevealMobile] = useState(false);

  const startX = useRef<number | null>(null);
  const dragging = useRef(false);

  function clampIndex(i: number) {
    const n = shots.length;
    return ((i % n) + n) % n;
  }

  function go(next: number) {
    setRevealMobile(false);
    setActive((v) => clampIndex(v + next));
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "touch") return;
    dragging.current = true;
    startX.current = e.clientX;
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "touch") return;
    if (!dragging.current || startX.current == null) return;

    const dx = e.clientX - startX.current;
    dragging.current = false;
    startX.current = null;

    if (Math.abs(dx) < 44) return;
    if (dx < 0) go(1);
    else go(-1);
  }

  return (
    <div className="mx-auto max-w-[1000px] mt-12 sm:mt-16">
      {/* Layout: card à esquerda + texto só no desktop */}
      <div className="md:grid md:grid-cols-[minmax(0,720px)_minmax(0,1fr)] md:gap-12 lg:gap-14 md:items-start">
        {/* CARD */}
        <div>
          <div className="rounded-2xl border border-white/10 glass-surface-dark p-4 sm:p-5">
            {/* topo */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent/85">
                  Projeto Pessoal
                </p>
                <h3 className="mt-2 text-base sm:text-lg font-semibold tracking-tight text-text/95">
                  EPI Sentinel — telas principais
                </h3>
                <p className="mt-1 font-mono text-[11px] text-muted/80">
                  Next.js • TypeScript • Tailwind
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex h-9 w-9 items-center justify-center rounded-full
                    border border-white/10 text-muted transition
                    hover:text-text hover:border-white/20 hover:bg-white/5
                  "
                  aria-label="Repositório no GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex h-9 w-9 items-center justify-center rounded-full
                    border border-white/10 text-muted transition
                    hover:text-text hover:border-white/20 hover:bg-white/5
                  "
                  aria-label="Abrir site"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* frame */}
            <div
              className="
                group relative mt-4 overflow-hidden rounded-xl
                border border-white/10
                bg-gradient-to-br from-[#64ffda]/14 to-[#64ff8d]/10
                touch-pan-y
              "
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <div className="relative w-full aspect-[16/10]">
                {/* base gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda]/35 to-[#64ff8d]/25" />

                {/* slide */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={shots[active].src}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                  >
                    <Image
                      src={shots[active].src}
                      alt={shots[active].alt}
                      fill
                      quality={95}
                      className={`
                        object-cover transform-gpu
                        transition-[transform,filter,opacity] duration-1000 ease-out
                        ${
                          revealMobile
                            ? "mix-blend-normal grayscale-0 contrast-100 scale-[1.02]"
                            : "mix-blend-multiply grayscale contrast-125 scale-[1.01]"
                        }
                        md:group-hover:mix-blend-normal
                        md:group-hover:grayscale-0
                        md:group-hover:contrast-100
                        md:group-hover:scale-[1.02]
                      `}
                      sizes="(min-width: 1024px) 720px, 92vw"
                      priority={active === 0}
                    />

                    {/* overlay screen */}
                    <div
                      className={`
                        absolute inset-0 bg-[#0a192f] mix-blend-screen
                        transition-opacity duration-1000 ease-out
                        ${revealMobile ? "opacity-0" : "opacity-70"}
                        md:group-hover:opacity-0
                      `}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* arrows */}
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="
                    absolute left-3 top-3 z-10
                    inline-flex h-10 w-10 items-center justify-center
                    rounded-full border border-white/10 bg-black/20 text-text/80
                    backdrop-blur-sm transition
                    hover:bg-black/30 hover:border-white/20 hover:text-text
                  "
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => go(1)}
                  className="
                    absolute right-3 top-3 z-10
                    inline-flex h-10 w-10 items-center justify-center
                    rounded-full border border-white/10 bg-black/20 text-text/80
                    backdrop-blur-sm transition
                    hover:bg-black/30 hover:border-white/20 hover:text-text
                  "
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* legenda */}
                <div className="absolute left-3 bottom-3 z-10">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-mono text-text/85 backdrop-blur-sm">
                    {shots[active].label}
                  </span>
                </div>

                {/* dots */}
                <div className="absolute right-3 bottom-3 z-10 flex items-center gap-2">
                  {shots.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setRevealMobile(false);
                        setActive(i);
                      }}
                      className={`
                        h-2 rounded-full transition-all duration-500 ease-out
                        ${
                          i === active
                            ? "w-7 bg-accent/85"
                            : "w-2 bg-white/25 hover:bg-white/40"
                        }
                      `}
                      aria-label={`Ir para imagem ${i + 1}`}
                    />
                  ))}
                </div>

                {/* click-to-reveal no mobile */}
                <button
                  type="button"
                  onClick={() => setRevealMobile((v) => !v)}
                  className="md:hidden absolute inset-0"
                  aria-label="Alternar cor da imagem"
                />
              </div>
            </div>

            {/* texto inferior do card */}
            <p className="mt-4 text-sm text-muted/85 leading-relaxed">
              Centraliza controle de EPIs (entrega, validade e reposição) e
              reduz falhas de conformidade com alertas, trilha de auditoria e
              visibilidade por setor/custo.
            </p>

            {/* ✅ ADIÇÃO: Notas rápidas abaixo do quadrado (SOMENTE MOBILE) */}
            <div className="md:hidden mt-5">
              <details className="rounded-xl border border-white/10 bg-white/0">
                <summary
                  className="
                    cursor-pointer list-none select-none
                    px-4 py-4 flex items-center justify-between
                    font-mono text-[11px] tracking-[0.22em] uppercase
                    text-accent/85
                  "
                >
                  Notas rápidas
                  <span className="text-muted/60">+</span>
                </summary>

                <div className="px-4 pb-4 pt-1">
                  <h4 className="mt-1 text-sm font-semibold tracking-tight text-text/90">
                    Detalhes da case
                  </h4>

                  <p className="mt-3 text-sm leading-relaxed text-muted/85">
                    Consigo transformar um processo manual e sujeito a falhas
                    (controle de EPIs) em um fluxo rastreável, com regras de
                    negócio claras, dados consistentes e auditoria. O foco foi
                    reduzir risco de não conformidade e deixar a operação
                    rápida: saber quem recebeu, o que vence, o que está pendente
                    e por quê — em poucos cliques.
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted/80">
                      Highlights
                    </p>

                    <ul className="mt-3 space-y-2 text-sm text-muted/85">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">▹</span>
                        <span>Controle de EPIs, validade e rastreabilidade.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">▹</span>
                        <span>Auditoria e histórico de ações.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">▹</span>
                        <span>UX objetiva, foco em operação.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">▹</span>
                        <span>
                          Validade e reposição com alertas e visão por colaborador/setor.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* TEXTO DO LADO (SÓ DESKTOP) */}
        <aside className="hidden md:block pt-4">
          <div className="max-w-[360px]">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent/85">
              Notas rápidas
            </p>

            <h4 className="mt-2 text-sm font-semibold tracking-tight text-text/90">
              Detalhes da case
            </h4>

            <p className="mt-3 text-sm leading-relaxed text-muted/85">
              Consigo transformar um processo manual e sujeito a falhas
              (controle de EPIs) em um fluxo rastreável, com regras de negócio
              claras, dados consistentes e auditoria. O foco foi reduzir risco
              de não conformidade e deixar a operação rápida: saber quem
              recebeu, o que vence, o que está pendente e por quê — em poucos
              cliques.
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted/80">
                Highlights
              </p>

              <ul className="mt-3 space-y-2 text-sm text-muted/85">
                <li className="flex items-start gap-2">
                  <span className="text-accent">▹</span>
                  <span>Controle de EPIs, validade e rastreabilidade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">▹</span>
                  <span>Auditoria e histórico de ações.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">▹</span>
                  <span>UX objetiva, foco em operação.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">▹</span>
                  <span>Validade e reposição com alertas e visão por colaborador/setor.</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
