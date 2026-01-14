"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Shot = {
  src: string;
  alt: string;
  label: string;
};

function IconGitHub(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.29 9.42 7.86 10.95.58.11.8-.26.8-.57v-2.2c-3.2.7-3.88-1.3-3.88-1.3-.53-1.4-1.29-1.78-1.29-1.78-1.05-.74.08-.73.08-.73 1.16.08 1.77 1.23 1.77 1.23 1.03 1.82 2.7 1.29 3.36.99.11-.77.4-1.29.73-1.58-2.56-.3-5.25-1.32-5.25-5.87 0-1.3.45-2.36 1.2-3.19-.12-.3-.52-1.52.11-3.16 0 0 .97-.32 3.18 1.22a10.7 10.7 0 0 1 2.9-.4c.98 0 1.97.14 2.9.4 2.2-1.54 3.17-1.22 3.17-1.22.63 1.64.23 2.86.11 3.16.75.83 1.2 1.9 1.2 3.19 0 4.56-2.7 5.56-5.27 5.86.41.37.78 1.1.78 2.22v3.29c0 .32.2.69.8.57A11.3 11.3 0 0 0 23.25 12C23.25 5.62 18.27.5 12 .5Z"
      />
    </svg>
  );
}

function IconExternal(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h7v2H7v10h10v-5h2v7H5V5Z"
      />
    </svg>
  );
}

function IconChevronLeft(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
      <path
        fill="currentColor"
        d="M15.5 19a1 1 0 0 1-.7-.3l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 1 1 1.4 1.4L10.9 12l5.3 5.3A1 1 0 0 1 15.5 19Z"
      />
    </svg>
  );
}

function IconChevronRight(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
      <path
        fill="currentColor"
        d="M8.5 19a1 1 0 0 1-.7-1.7l5.3-5.3-5.3-5.3a1 1 0 1 1 1.4-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-.7.3Z"
      />
    </svg>
  );
}

function LinkCircle({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted hover:text-text hover:border-white/20 transition"
    >
      {children}
    </a>
  );
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 14 : -14,
    opacity: 0,
    scale: 0.998,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -14 : 14,
    opacity: 0,
    scale: 0.998,
  }),
};

export default function EpiSentinelShots() {
  const shots: Shot[] = useMemo(
    () => [
      {
        src: "/projects/epi-sentinel01.png",
        alt: "EPI Sentinel - Login",
        label: "Tela 01 — Login (edite depois)",
      },
      {
        src: "/projects/epi-sentinel02.png",
        alt: "EPI Sentinel - Dashboard",
        label: "Tela 02 — Dashboard (edite depois)",
      },
      {
        src: "/projects/epi-sentinel03.png",
        alt: "EPI Sentinel - Auditoria",
        label: "Tela 03 — Auditoria (edite depois)",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // mobile: toque alterna cor
  const [revealMobile, setRevealMobile] = useState(false);

  const shot = shots[index];

  function paginate(dir: number) {
    setDirection(dir);
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return shots.length - 1;
      if (next >= shots.length) return 0;
      return next;
    });
    setRevealMobile(false);
  }

  function onDragEnd(
    _: any,
    info: { offset: { x: number }; velocity: { x: number } }
  ) {
    const swipe = info.offset.x;
    const v = info.velocity.x;

    if (swipe < -60 || v < -500) paginate(1);
    else if (swipe > 60 || v > 500) paginate(-1);
  }

  return (
    <div className="mt-8 md:mt-10">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="group relative">
          <div className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 rounded-sm border border-accent/18" />

          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            {/* topo */}
            <div className="px-4 pt-4 pb-3 md:px-5 md:pt-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-accent/85 uppercase">
                    Case Study
                  </p>
                  <p className="mt-1 text-sm md:text-[15px] text-text/90 truncate">
                    EPI Sentinel — telas principais (edite depois)
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-muted/80">
                    Next.js • TypeScript • Tailwind • (placeholder)
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <LinkCircle href="#" label="Repositório no GitHub">
                    <IconGitHub className="h-4 w-4" />
                  </LinkCircle>
                  <LinkCircle href="#" label="Abrir projeto">
                    <IconExternal className="h-4 w-4" />
                  </LinkCircle>
                </div>
              </div>
            </div>

            {/* carrossel */}
            <div className="relative px-4 pb-4 md:px-5 md:pb-5">
              <div className="relative overflow-hidden rounded-sm border border-white/10">
                {/* base mint/teal suave */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0b2a25] via-[#071e1a] to-[#050b0a]" />
                <div className="absolute inset-0 opacity-70 bg-gradient-to-tr from-accent/10 via-transparent to-white/5" />

                {/* setas */}
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Imagem anterior"
                  className="absolute left-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg/40 backdrop-blur text-muted hover:text-text hover:border-white/20 transition"
                >
                  <IconChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Próxima imagem"
                  className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg/40 backdrop-blur text-muted hover:text-text hover:border-white/20 transition"
                >
                  <IconChevronRight className="h-4 w-4" />
                </button>

                {/* bolinhas */}
                <div className="absolute right-3 bottom-3 z-20 flex items-center gap-2">
                  {shots.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                        setRevealMobile(false);
                      }}
                      aria-label={`Ir para imagem ${i + 1}`}
                      className={[
                        "h-1.5 rounded-full transition-all duration-500 ease-out",
                        i === index
                          ? "w-6 bg-accent/80"
                          : "w-2.5 bg-white/20 hover:bg-white/30",
                      ].join(" ")}
                    />
                  ))}
                </div>

                {/* altura do preview */}
                <div className="relative aspect-[16/9] md:aspect-[16/8]">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={shot.src}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.12}
                      onDragEnd={onDragEnd}
                      onClick={() => setRevealMobile((v) => !v)}
                    >
                      {/* ✅ CAMADA TINT (sempre) */}
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        quality={100}
                        sizes="(min-width: 1024px) 980px, (min-width: 768px) 760px, 92vw"
                        className={[
                          "object-cover",
                          "transform-gpu transition duration-[1400ms] ease-out",
                          // visual “tint”
                          "mix-blend-multiply grayscale contrast-125",
                          "group-hover:scale-[1.01]",
                        ].join(" ")}
                      />

                      {/* ✅ CAMADA NORMAL (fade suave) */}
                      <div
                        className={[
                          "absolute inset-0",
                          "opacity-0 transition-opacity duration-[1400ms] ease-out",
                          // desktop: hover
                          "group-hover:opacity-100",
                          // mobile: toggle
                          revealMobile ? "opacity-100" : "",
                        ].join(" ")}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          quality={100}
                          sizes="(min-width: 1024px) 980px, (min-width: 768px) 760px, 92vw"
                          className="object-cover transform-gpu transition duration-[1400ms] ease-out"
                        />
                      </div>

                      {/* overlay “screen” animado suave */}
                      <div
                        className={[
                          "absolute inset-0 bg-[#0a2a24] mix-blend-screen",
                          "transition-opacity duration-[1400ms] ease-out",
                          "opacity-55 group-hover:opacity-0",
                          revealMobile ? "opacity-0" : "",
                        ].join(" ")}
                      />

                      {/* legenda */}
                      <div className="absolute left-3 bottom-3 z-20">
                        <div className="rounded-full border border-white/10 bg-bg/40 backdrop-blur px-3 py-1">
                          <p className="font-mono text-[11px] text-text/80">
                            {shot.label}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5" />
              </div>

              {/* texto abaixo */}
              <div className="mt-4 md:mt-5">
                <p className="text-[12px] leading-relaxed text-muted/85">
                  Texto curto aqui (placeholder) — descreva a ideia do sistema e
                  o que essas telas demonstram. No mobile: deslize para trocar
                  ou toque para revelar a cor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
