"use client";

import { useEffect, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_DURATION_MS = 3500; // tempo que o overlay fica na tela
const SPLASH_ANIM_DURATION = 1.9; // duração do "pop" do símbolo

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
];

/** acha o pai scrollável mais próximo (funciona se o scroll for em div, não só no window) */
function findScrollableParent(el: HTMLElement | null) {
  if (!el || typeof window === "undefined") return null;

  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const canScroll =
      (overflowY === "auto" || overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight;

    if (canScroll) return node;
    node = node.parentElement;
  }
  return null;
}

function SplashSMark() {
  const corners = [
    "M18 10 H10 V26", // topo-esq
    "M82 10 H90 V26", // topo-dir
    "M18 90 H10 V74", // baixo-esq
    "M82 90 H90 V74", // baixo-dir
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-24 w-24 sm:h-28 sm:w-28 text-accent"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {corners.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}

      <motion.text
        x="50"
        y="54"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        style={{
          fontSize: 60,
          fontWeight: 600,
          letterSpacing: 1,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: 2.0,
        }}
      >
        s
      </motion.text>
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    // em desktop, força iniciar no topo do window (se estiver usando window scroll)
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => setSplash(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  function scrollToTop() {
    if (typeof window === "undefined") return;

    // tenta pelo id primeiro (funciona melhor quando o scroll é em container)
    const topo = document.getElementById("topo");
    if (topo) {
      topo.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // fallback pro window
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogoClick(e: ReactMouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setSplash(true);

    setTimeout(() => {
      scrollToTop();
      setSplash(false);
    }, SPLASH_DURATION_MS);
  }

  function handleDesktopNavClick(
    e: ReactMouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (typeof window === "undefined") return;
    if (!href.startsWith("#")) return;

    // só intercepta no PC (do jeito que você pediu)
    if (window.innerWidth < 1024) return;

    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    e.preventDefault();

    const headerOffset = 64;

    const scrollParent = findScrollableParent(el);

    if (scrollParent) {
      // scroll dentro do container
      const parentRect = scrollParent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const top = elRect.top - parentRect.top + scrollParent.scrollTop - headerOffset;

      scrollParent.scrollTo({ top, behavior: "smooth" });
      return;
    }

    // fallback: scroll no window
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <>
      {/* HEADER fixo */}
      <header className="fixed top-0 inset-x-0 z-40 bg-bg/80 backdrop-blur md:border-b md:border-white/5">
        <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-24 w-full">
          {/* ESQUERDA – ícone */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="group inline-flex items-center"
            aria-label="Ir para o topo com animação"
          >
            <Image
              src="/avatar-logo-isaac.png"
              alt="Logo Isaac"
              width={40}
              height={40}
              className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
              priority
            />
          </button>

          {/* DIREITA */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleDesktopNavClick(e, l.href)}
                  className="text-xs text-muted hover:text-text transition"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden sm:block">
              <ButtonLink href="#curriculo">Currículo</ButtonLink>
            </div>

            {/* hambúrguer – só mobile */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted md:hidden"
              aria-label="Abrir navegação"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Abrir navegação</span>
              <span className="relative block h-4 w-4">
                <span className="absolute inset-x-0 top-0 h-[1px] bg-white" />
                <span className="absolute inset-x-0 top-1/2 h-[1px] bg-white" />
                <span className="absolute inset-x-0 bottom-0 h-[1px] bg-white" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur md:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-4 pt-4">
                <button
                  type="button"
                  onClick={handleLogoClick}
                  className="inline-flex items-center"
                  aria-label="Ir para o topo com animação"
                >
                  <Image
                    src="/avatar-logo-isaac.png"
                    alt="Logo Isaac"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </button>

                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted"
                  aria-label="Fechar navegação"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Fechar navegação</span>
                  <span className="relative block h-4 w-4">
                    <span className="absolute inset-x-0 top-1/2 h-[1px] bg-white rotate-45" />
                    <span className="absolute inset-x-0 top-1/2 h-[1px] bg-white -rotate-45" />
                  </span>
                </button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
                {links.map((l, index) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-base text-muted hover:text-text transition"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                  >
                    <span className="block text-xs text-accent mb-1">
                      {`0${index + 1}.`}
                    </span>
                    <span>{l.label}</span>
                  </motion.a>
                ))}

                <motion.a
                  href="/cv-isaac-santana-muniz.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center rounded-full border border-accent px-10 py-2 text-xs font-medium text-accent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + links.length * 0.05 }}
                >
                  Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPLASH */}
      <AnimatePresence>
        {splash && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-bg"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* 1 wrapper + 1 símbolo (SEM duplicar) */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: SPLASH_ANIM_DURATION, ease: "easeInOut" }}
            >
              <SplashSMark />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
