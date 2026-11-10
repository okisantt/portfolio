"use client";

import { useEffect, useRef, useState } from "react";

const HOBBIES = [
  { name: "Jogos", note: "Uma boa partida para desligar do dia." },
  { name: "Livros", note: "Leitura para aprender e para descansar." },
  { name: "Academia", note: "Treino como parte da rotina." },
  { name: "Futebol", note: "Para jogar e para assistir." },
  { name: "Laboratórios de Pentest", note: "Ambientes isolados para praticar testes de intrusão." },
  { name: "Animes", note: "Boas histórias, um episódio por vez." },
  { name: "Manhwas", note: "Quadrinhos coreanos, capítulo a capítulo." },
  { name: "Viajar", note: "Conhecer lugares e outras rotinas." },
] as const;

// Where a word may land, as [x, y] in percent of the stage, measured from its
// centre. One set for wide screens, one for portrait screens.
const WIDE = [[-31, -25], [-9, -34], [15, -30], [34, -16], [-36, 7], [-20, 28], [8, 32], [31, 21]] as const;
const TALL = [[-23, -37], [22, -31], [-21, -23], [23, -16], [-23, 18], [22, 24], [-19, 31], [21, 37]] as const;

const initialOrder = HOBBIES.map((_, index) => index);

function shuffled(order: number[]) {
  const next = [...order];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/**
 * A small round character alone on the stage. Press it and it tosses the
 * hobbies into the air, where they drift; point at one (or tap it) for a
 * one-line note. Press it again and it gathers them back.
 */
export default function HobbyStage() {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(initialOrder);
  const [active, setActive] = useState<number | null>(null);
  const [pops, setPops] = useState(0);
  const blob = useRef<HTMLButtonElement>(null);
  const pointer = useRef("mouse");

  // The eyes follow the pointer.
  useEffect(() => {
    const follow = (event: PointerEvent) => {
      const element = blob.current;
      if (!element) return;
      const box = element.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, distance / 240);
      const travel = box.width * 0.075;
      element.style.setProperty("--look-x", `${((dx / distance) * reach * travel).toFixed(1)}px`);
      element.style.setProperty("--look-y", `${((dy / distance) * reach * travel).toFixed(1)}px`);
    };
    window.addEventListener("pointermove", follow, { passive: true });
    return () => window.removeEventListener("pointermove", follow);
  }, []);

  const toggle = () => {
    setActive(null);
    setPops((count) => count + 1);
    if (!open) setOrder((current) => shuffled(current));
    setOpen(!open);
  };

  return (
    <div
      className="hob-field"
      data-open={open}
      onPointerDown={(event) => {
        pointer.current = event.pointerType;
      }}
      onClick={(event) => {
        if (!(event.target as Element).closest(".hob-chip, .hob-blob")) setActive(null);
      }}
    >
      <ul className="hob-words" aria-label="Hobbies">
        {HOBBIES.map((hobby, index) => {
          const slot = order[index];
          return (
            <li
              key={hobby.name}
              className="hob-word"
              data-active={active === index}
              data-above={WIDE[slot][1] > 0}
              style={
                {
                  "--x": WIDE[slot][0],
                  "--y": WIDE[slot][1],
                  "--tx": TALL[slot][0],
                  "--ty": TALL[slot][1],
                  "--i": index,
                  "--dur": `${8 + ((index * 1.37) % 5)}s`,
                } as React.CSSProperties
              }
            >
              <div className="hob-drift">
                <button
                  type="button"
                  className="hob-chip"
                  tabIndex={open ? 0 : -1}
                  aria-describedby={`hobby-${index}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setActive(index);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") setActive(null);
                  }}
                  onFocus={() => setActive(index)}
                  onBlur={() => setActive(null)}
                  onClick={() => {
                    // A mouse already shows the note on hover; touch and pen toggle it.
                    if (pointer.current !== "mouse") setActive(active === index ? null : index);
                  }}
                >
                  {hobby.name}
                </button>
                <p id={`hobby-${index}`} className="hob-card" role="tooltip">
                  {hobby.note}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <button
        ref={blob}
        type="button"
        className="hob-blob"
        aria-expanded={open}
        aria-label={open ? "Guardar os hobbies" : "Mostrar os hobbies"}
        onClick={toggle}
      >
        <span key={pops} className="hob-body">
          <span className="hob-eye" />
          <span className="hob-eye" />
        </span>
      </button>

      <p className="hob-hint" aria-hidden="true">
        {open ? (
          <>
            <span className="hob-hint-mouse">passe o mouse sobre uma palavra</span>
            <span className="hob-hint-touch">toque em uma palavra</span>
          </>
        ) : (
          <>
            <span className="hob-hint-mouse">clique</span>
            <span className="hob-hint-touch">toque</span>
          </>
        )}
      </p>
    </div>
  );
}
