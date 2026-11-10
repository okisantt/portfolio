"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TransitionLink from "@/components/transition/TransitionLink";
import { NAV } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  // On the cover of the home page the header floats over the torn paper.
  const overCover = home && !scrolled;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        overCover ? "border-transparent bg-transparent" : "border-white/[0.06] bg-bg/85 backdrop-blur-xl"
      }`}
    >
      <div className="flex h-20 w-full items-center justify-between px-5 sm:px-8 lg:px-[4.6%]">
        <TransitionLink
          href="/"
          word="Início"
          className={`inline-flex min-h-11 items-center gap-3 rounded-full pr-2 text-sm font-semibold tracking-tight text-text transition-opacity duration-300 ${
            overCover ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-label="Voltar ao início"
          aria-hidden={overCover}
          tabIndex={overCover ? -1 : undefined}
        >
          <Image
            src="/avatar-logo-isaac.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-white/10 object-cover"
            priority
          />
          <span className="hidden sm:inline">Isaac Santt</span>
        </TransitionLink>

        <div className="hidden items-center gap-7 xl:flex">
          {/* On the home page the row under the cover is the navigation. */}
          {!home && (
            <nav aria-label="Navegação principal">
              <ul className="flex items-center gap-6">
                {NAV.map((item) => {
                  const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <TransitionLink
                        href={item.href}
                        word={item.word}
                        aria-current={current ? "page" : undefined}
                        className={`rounded-sm py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-text ${
                          current ? "text-text" : "text-text/60"
                        }`}
                      >
                        {item.short}
                      </TransitionLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          <Link
            href="/curriculo"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 text-xs font-semibold text-text transition-colors hover:border-white/60 hover:bg-white/[0.06]"
          >
            Solicitar currículo
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 items-center px-1 text-[11px] font-medium uppercase tracking-[0.26em] text-text/85 transition-colors hover:text-text xl:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div
          id="menu-mobile"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-50 min-h-dvh bg-bg px-5 py-5 xl:hidden"
        >
          <div className="mx-auto flex h-full max-w-2xl flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.26em] text-text/70">
                Navegação
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-text"
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 items-center" aria-label="Navegação mobile">
              <ul className="w-full">
                {[{ href: "/", label: "Início", word: "Início" }, ...NAV].map((item, index) => (
                  <li key={item.href} className="border-b border-white/[0.07]">
                    <TransitionLink
                      href={item.href}
                      word={item.word}
                      onNavigate={() => setOpen(false)}
                      className="flex min-h-16 items-center gap-4 text-lg font-light text-text"
                    >
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-accent">
                        {String(index).padStart(2, "0")}
                      </span>
                      {item.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href="/curriculo"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-text px-6 text-sm font-semibold text-wine"
            >
              Solicitar currículo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
