"use client";

import { useState } from "react";
import Image from "next/image";

export default function About() {
  const [revealMobile, setRevealMobile] = useState(false);

  return (
    <section id="sobre" className="py-section-y scroll-mt-[56px]">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-8 lg:px-0">
        <div className="hidden md:grid grid-cols-12 grid-rows-6 gap-3 items-center">
          {/* IMAGEM DESKTOP */}
          <div className="relative col-span-12 row-start-1 row-end-7 md:col-start-10 md:col-end-13 justify-self-end md:mr-[-26px]">
            <div className="group relative w-[280px] lg:w-[320px] aspect-square">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-accent/60 pointer-events-none" />

              <div
                className="
                  relative h-full w-full overflow-hidden rounded-sm
                  bg-gradient-to-br from-[#64ffda] to-[#64ff8d]
                  transform-gpu transition-transform duration-700 ease-out
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda] to-[#64ff8d]" />

                <Image
                  src="/projects/editsantt.png"
                  alt="Foto do Isaac"
                  fill
                  priority
                  className="
                    object-cover transform-gpu
                    transition duration-700 ease-out
                    mix-blend-multiply grayscale contrast-125
                    group-hover:scale-[1.06]
                    group-hover:grayscale-0
                    group-hover:contrast-100
                    group-hover:mix-blend-normal
                  "
                  sizes="(min-width: 1024px) 320px, 82vw"
                />

                <div
                  className="
                    absolute inset-0
                    bg-[#0a192f] mix-blend-screen
                    opacity-70
                    transition-opacity duration-700 ease-out
                    group-hover:opacity-0
                  "
                />
              </div>
            </div>
          </div>

          {/* CONTEÚDO DESKTOP */}
          <div
            className="
              relative z-20 col-span-12 row-start-1 row-end-7
              md:col-start-1 md:col-end-9
              p-6 sm:p-8 md:p-0 md:pl-0
            "
          >
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <span className="whitespace-nowrap font-mono text-base md:text-lg text-accent">
                01.
              </span>

              <span className="whitespace-nowrap text-lg md:text-xl font-semibold tracking-tight text-text/90">
                Sobre Mim
              </span>

              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="text-[15px] leading-relaxed text-muted">
              <div className="space-y-4">
                <p>
                  Me chamo Isaac Santana Muniz, tenho 23 anos e atuo com foco em
                  back-end, desenvolvendo APIs e serviços com atenção a modelagem
                  de dados, segurança e manutenção.
                </p>

                <p>
                  Trabalho com regras de negócio, integrações e automações,
                  buscando sempre consistência, boa organização de código e
                  entregas confiáveis.
                </p>

                <p>
                  Tenho interesse forte em Cybersecurity e pretendo migrar para
                  essa área no futuro, aprofundando práticas de hardening, análise
                  de vulnerabilidades e engenharia segura.
                </p>
              </div>

              <p className="mt-8 text-sm text-muted/80">
                Tecnologias que venho usando recentemente:
              </p>

              <ul className="mt-3 grid grid-cols-2 gap-x-10 gap-y-2 font-mono text-xs text-muted">
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> JavaScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> React
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> Node.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> C++
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> VBA
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> Python
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/*MOBILE*/}
        <div className="md:hidden">
          <div className="px-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="whitespace-nowrap font-mono text-base text-accent">
                01.
              </span>

              <span className="whitespace-nowrap text-lg font-semibold tracking-tight text-text/90">
                Sobre Mim
              </span>

              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="text-[15px] leading-relaxed text-muted">
              <div className="space-y-4">
                <p>
                  Me chamo Isaac Santana Muniz, tenho 23 anos e atuo com foco em
                  back-end, desenvolvendo APIs e serviços com atenção a modelagem
                  de dados, segurança e manutenção.
                </p>

                <p>
                  Trabalho com regras de negócio, integrações e automações,
                  buscando sempre consistência, boa organização de código e
                  entregas confiáveis.
                </p>

                <p>
                  Tenho interesse forte em Cybersecurity e pretendo migrar para
                  essa área no futuro, aprofundando práticas de hardening, análise
                  de vulnerabilidades e engenharia segura.
                </p>
              </div>

              <p className="mt-8 text-sm text-muted/80">
                Tecnologias que venho usando recentemente:
              </p>

              <ul className="mt-3 grid grid-cols-2 gap-x-10 gap-y-2 font-mono text-xs text-muted">
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> JavaScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> React
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> Node.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> C++
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> VBA
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> Python
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="relative w-[280px] max-w-[82vw] aspect-square">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-accent/60" />

              <button
                type="button"
                onClick={() => setRevealMobile((v) => !v)}
                className="relative h-full w-full overflow-hidden rounded-sm block"
                aria-label="Alternar cor da imagem"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda] to-[#64ff8d]" />

                <Image
                  src="/projects/editsantt.png"
                  alt="Foto do Isaac"
                  fill
                  sizes="280px"
                  className={
                    revealMobile
                      ? "object-cover transform-gpu transition duration-700 ease-out mix-blend-normal grayscale-0 contrast-100 scale-[1.04]"
                      : "object-cover transform-gpu transition duration-700 ease-out mix-blend-multiply grayscale contrast-125"
                  }
                />

                <div
                  className={
                    revealMobile
                      ? "absolute inset-0 bg-[#0a192f] mix-blend-screen opacity-0 transition-opacity duration-700 ease-out"
                      : "absolute inset-0 bg-[#0a192f] mix-blend-screen opacity-70 transition-opacity duration-700 ease-out"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
