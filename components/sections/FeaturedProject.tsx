"use client";

import { useState } from "react";
import Image from "next/image";

export default function FeaturedProject() {
  // ✅ Hook NO lugar certo: dentro do componente
  const [revealMobile, setRevealMobile] = useState(false);

  return (
    <div className="mx-auto max-w-[1000px] px-4 sm:px-8 lg:px-0 py-10">
      {/* =========================
          DESKTOP (AGORA COM O MESMO FRAME DO MOBILE)
          - Hover do PC continua funcionando (cor real + animação e volta)
          ========================= */}
      <div className="hidden md:grid grid-cols-12 grid-rows-6 gap-3 items-center">
        {/* IMAGEM DESKTOP */}
        <div
          className="
            relative col-span-12 row-start-1 row-end-7
            md:col-start-6 md:col-end-13
            min-h-[260px] md:min-h-[360px]
          "
        >
          {/* frame atrás (igual mobile/Brittany) */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-accent/60 pointer-events-none" />

          {/* bloco da imagem em cima */}
          <div
            className="
              group absolute inset-0 overflow-hidden rounded-sm
              bg-[#0a192f]
              transform-gpu transition-transform duration-700 ease-out
            "
          >
            {/* base gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda] to-[#64ff8d]" />

            <Image
              src="/projects/santtdev.jpeg"
              alt="Imagem do projeto em destaque"
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
              sizes="(min-width: 1024px) 640px, (min-width: 768px) 520px, 100vw"
            />

            {/* overlay “screen” (some no hover do PC) */}
            <div
              className="
                absolute inset-0
                bg-[#0a192f] mix-blend-screen opacity-70
                transition-opacity duration-700 ease-out
                group-hover:opacity-0
              "
            />
          </div>
        </div>

        {/* CONTEÚDO DESKTOP (não mexi) */}
        <div
          className="
            relative z-20 col-span-12 row-start-1 row-end-7
            md:col-start-1 md:col-end-7
            p-6 sm:p-8 md:p-0
          "
        >
          <div className="text-accent font-mono text-sm">01. Sobre Mim</div>

          <h4 className="mt-2 mb-6 text-3xl md:text-4xl font-semibold text-text">
            Fullstack
          </h4>

          <div className="text-[15px] leading-relaxed text-muted">
            <p className="rounded-sm bg-[#252525] px-6 py-5">
              Me chamo Isaac Santana Muniz, tenho 23 anos e atuo com foco em
              back-end, criando APIs e serviços com atenção a dados, segurança e
              manutenção. Trabalho com regras de negócio, integrações e
              automações, buscando sempre consistência, boa organização de
              código e entregas confiáveis.
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm text-muted">
              <li>APIs (REST)</li>
              <li>Banco de Dados</li>
              <li>Design System</li>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE (IGUAL AO QUE ESTÁ)
          + AGORA: clique liga/desliga cor real com animação
          ========================= */}
      <div className="md:hidden">
        {/* TEXTO */}
        <div className="px-1">
          <div className="text-accent font-mono text-sm">01. Sobre Mim</div>

          <h4 className="mt-2 mb-4 text-3xl font-semibold text-text">
            Fullstack
          </h4>

          <div className="text-[15px] leading-relaxed text-muted">
            <p className="rounded-sm bg-[#252525] px-6 py-5">
              Me chamo Isaac Santana Muniz, tenho 23 anos e atuo com foco em
              back-end, criando APIs e serviços com atenção a dados, segurança e
              manutenção. Trabalho com regras de negócio, integrações e
              automações, buscando sempre consistência, boa organização de
              código e entregas confiáveis.
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm text-muted">
              <li>APIs (REST)</li>
              <li>Banco de Dados</li>
              <li>Design System</li>
            </ul>
          </div>
        </div>

        {/* FOTO (Brittany style) */}
        <div className="mt-10 flex justify-center">
          <div className="relative w-[280px] max-w-[82vw] aspect-square">
            {/* frame atrás */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-accent/60" />

            {/* imagem (clicável) */}
            <button
              type="button"
              onClick={() => setRevealMobile((v) => !v)}
              className="relative h-full w-full overflow-hidden rounded-sm block"
              aria-label="Alternar cor da imagem"
            >
              {/* base gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda] to-[#64ff8d]" />

              <Image
                src="/projects/santtdev.jpeg"
                alt="Foto do Isaac"
                fill
                sizes="280px"
                className={
                  revealMobile
                    ? "object-cover transform-gpu transition duration-700 ease-out mix-blend-normal grayscale-0 contrast-100 scale-[1.04]"
                    : "object-cover transform-gpu transition duration-700 ease-out mix-blend-multiply grayscale contrast-125"
                }
              />

              {/* overlay screen (some quando revealMobile = true) */}
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
  );
}
