"use client";

import { useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_DURATION_MS = 2000; // quanto tempo o overlay fica na tela
const SPLASH_ANIM_DURATION = 1.6; // tempo da animação do logo (em segundos)
const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false); // menu mobile
  const [splash, setSplash] = useState(true); // splash de carregamento

  // animação automática ao carregar a página
  useEffect(() => {
    // Só em DESKTOP (ex.: a partir de 1024px) a gente força começar no topo
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => setSplash(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  // clique no logo "S": toca a animação e só depois faz scroll para o topo
  function scrollToTopRespectingDevice() {
    if (typeof window === "undefined") return;

    // DESKTOP: topo absoluto da página
    if (window.innerWidth >= 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById("topo")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleLogoClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setSplash(true);

    setTimeout(() => {
      scrollToTopRespectingDevice();

      setSplash(false);
    }, SPLASH_DURATION_MS);
  }

    function handleDesktopNavClick(
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    // só queremos tratar links tipo "#id" em telas de desktop
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return; // garante que é PC
    if (!href.startsWith("#")) return;

    const id = href.slice(1); // "#projetos" -> "projetos"
    const el = document.getElementById(id);

    // Se NÃO achar a seção, não chama preventDefault.
    // Assim o <a href="#..."> continua funcionando do jeito padrão.
    if (!el) return;

    // Aqui sim, a gente toma controle do scroll
    e.preventDefault();

    const headerOffset = 64; // altura aproximada do header
    const rect = el.getBoundingClientRect();
    const offset = rect.top + window.scrollY - headerOffset;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  } 

  return (
    <>
      {/* HEADER fixo no topo */}
      <header className="fixed top-0 inset-x-0 z-40 bg-bg/80 backdrop-blur md:border-b md:border-white/5">
        <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-24 w-full">
          {/* ESQUERDA – avatar/ícone S */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="group inline-flex items-center"
            aria-label="Ir para o topo com animação"
          >
            <Image
              src="/avatar-logo-isaac.png"
              alt="Foto de Isaac Santt"
              width={40}
              height={40}
              className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
              priority
            />
          </button>

          {/* DIREITA – navegação desktop + botão Currículo + hambúrguer */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* nav desktop */}
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

            {/* botão Currículo (desktop + tablets) */}
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

      {/* OVERLAY MOBILE MENU (já com animação suave) */}
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
              {/* topo do overlay: avatar + X */}
              <div className="flex items-center justify-between px-4 pt-4">
                <button
                  type="button"
                  onClick={handleLogoClick}
                  className="inline-flex items-center"
                  aria-label="Ir para o topo com animação"
                >
                  <Image
                    src="/avatar-logo-isaac.png"
                    alt="Foto de Isaac Santt"
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

              {/* links centralizados estilo Brittany */}
              <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
                {links.map((l, index) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-base text-muted hover:text-text transition"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.15 + index * 0.05,
                    }}
                  >
                    <span className="block text-xs text-accent mb-1">
                      {`0${index + 1}.`}
                    </span>
                    <span>{l.label}</span>
                  </motion.a>
                ))}

                {/* Resume → PDF do currículo/portfólio */}
                <motion.a
                  href="/cv-isaac-santana-muniz.pdf" // ajusta o nome do arquivo se for outro
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center rounded-full border border-accent px-10 py-2 text-xs font-medium text-accent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + links.length * 0.05,
                  }}
                >
                  Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPLASH SCREEN – animação de carregamento/retorno ao topo */}
      {/* SPLASH SCREEN – animação de carregamento/retorno ao topo */}
      <AnimatePresence>
        {splash && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-bg"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Logo “S” com cantos, animando no centro da tela */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{
                duration: SPLASH_ANIM_DURATION,
                ease: "easeInOut",
              }}
            >
              <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                {/* quatro cantos do ícone */}
                <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent rounded-tl-md" />
                <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-accent rounded-tr-md" />
                <span className="absolute left-0 bottom-0 h-6 w-6 border-l-2 border-b-2 border-accent rounded-bl-md" />
                <span className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-accent rounded-br-md" />

                {/* letra S central */}
                <span className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-semibold text-accent">
                  s
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
