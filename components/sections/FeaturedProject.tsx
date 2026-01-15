"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

export default function FeaturedProject() {
  const [revealMobile, setRevealMobile] = useState(false);

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="flex items-center gap-3 mb-10 sm:mb-14">
        <span className="whitespace-nowrap font-mono text-base md:text-lg text-accent">
          03.
        </span>

        <span className="whitespace-nowrap text-lg md:text-xl font-semibold tracking-tight text-text/90">
          Projeto em Destaque
        </span>

        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="hidden md:grid grid-cols-12 items-center gap-6">
        <div className="relative col-span-7">
          <div className="group relative w-full max-w-[640px] aspect-[16/10]">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-accent/60 pointer-events-none" />

            <div
              className="
                relative h-full w-full overflow-hidden rounded-sm
                bg-gradient-to-br from-[#64ffda] to-[#64ff8d]
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda] to-[#64ff8d]" />

              <Image
                src="/projects/image-port.png"
                alt="Preview do projeto"
                fill
                priority
                className="
                  object-cover transform-gpu
                  transition duration-700 ease-out
                  mix-blend-multiply grayscale contrast-125
                  group-hover:scale-[1.03]
                  group-hover:grayscale-0
                  group-hover:contrast-100
                  group-hover:mix-blend-normal
                "
                sizes="(min-width: 1024px) 640px, 92vw"
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

        <div className="relative col-span-5 text-right">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">
            Featured Project
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text">
            Portfólio — Isaac Santt
          </h3>

          <div className="mt-4 rounded-lg border hairline bg-white/0 p-5 sm:p-6 text-sm text-muted leading-relaxed md:max-w-[360px] md:mx-auto">
            Um portfólio minimalista construído com Next.js, TypeScript,
            Tailwind e Framer Motion, pensado para apresentar meus projetos com
            clareza, consistência visual e uma experiência fluida do desktop ao
            mobile.
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-muted/80 justify-end">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind</li>
            <li>Framer Motion</li>
          </ul>

          <div className="mt-5 flex items-center gap-3 justify-end">
            <a
              href="https://github.com/okisantt/portfolio"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex h-9 w-9 items-center justify-center rounded-full
                border border-white/10 text-muted transition
                hover:text-text hover:border-white/20 hover:bg-white/5
              "
              aria-label="GitHub do projeto"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href="#"
              className="
                inline-flex h-9 w-9 items-center justify-center rounded-full
                border border-white/10 text-muted transition
                hover:text-text hover:border-white/20 hover:bg-white/5
              "
              aria-label="Abrir projeto"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="relative w-full aspect-[16/10]">
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-accent/60" />

          <button
            type="button"
            onClick={() => setRevealMobile((v) => !v)}
            className="relative h-full w-full overflow-hidden rounded-sm block"
            aria-label="Alternar cor da imagem"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda] to-[#64ff8d]" />

            <Image
              src="/projects/image-port.png"
              alt="Preview do projeto"
              fill
              sizes="92vw"
              className={
                revealMobile
                  ? "object-cover transform-gpu transition duration-700 ease-out mix-blend-normal grayscale-0 contrast-100 scale-[1.02]"
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

        <div className="mt-6">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">
            Featured Project
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text">
            Portfólio — Isaac Santt
          </h3>

          <div className="mt-4 rounded-lg border hairline bg-white/0 p-5 text-sm text-muted leading-relaxed">
            Um portfólio minimalista construído com Next.js, TypeScript,
            Tailwind e Framer Motion, pensado para apresentar meus projetos com
            clareza, consistência visual e uma experiência fluida do desktop ao
            mobile.
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-muted/80">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind</li>
            <li>Framer Motion</li>
          </ul>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://github.com/okisantt/portfolio"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex h-9 w-9 items-center justify-center rounded-full
                border border-white/10 text-muted transition
                hover:text-text hover:border-white/20 hover:bg-white/5
              "
              aria-label="GitHub do projeto"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href="#"
              className="
                inline-flex h-9 w-9 items-center justify-center rounded-full
                border border-white/10 text-muted transition
                hover:text-text hover:border-white/20 hover:bg-white/5
              "
              aria-label="Abrir projeto"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
