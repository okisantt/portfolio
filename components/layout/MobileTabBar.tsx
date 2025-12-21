"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "#topo", label: "Início" },
  { href: "#projetos", label: "Projetos" },
  { href: "#habilidades", label: "Skills" },
  { href: "#experiencia", label: "Histórico" },
  { href: "#contato", label: "Contato" }
];

export default function MobileTabBar() {
  const [active, setActive] = useState<string>("#topo");
  const [hide, setHide] = useState(false);

  // 1) Esconder a barra quando o footer entrar na tela
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const obs = new IntersectionObserver(
      ([entry]) => setHide(entry.isIntersecting),
      { threshold: 0.1 }
    );

    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  // 2) Marcar aba ativa por seção visível
  useEffect(() => {
    const ids = tabs.map((t) => t.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      className={cn(
        "md:hidden fixed bottom-3 left-0 right-0 z-50 transition duration-200",
        hide && "opacity-0 translate-y-2 pointer-events-none"
      )}
    >
      <div className="mx-auto w-[94%] max-w-md glass-surface-dark rounded-xl px-2 py-1 backdrop-blur-md">
        <nav className="grid grid-cols-5">
          {tabs.map((t) => {
            const isActive = active === t.href;

            return (
              <a
                key={t.href}
                href={t.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] transition",
                  isActive
                    ? "bg-white/3 text-text"
                    : "text-muted active:bg-white/3"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={cn(
                    "h-1 w-6 rounded-full transition",
                    isActive ? "bg-accent/60" : "bg-white/10"
                  )}
                />
                <span>{t.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
