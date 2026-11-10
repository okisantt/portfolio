"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/data";

const NAME = SITE.name;

/**
 * Opening sequence: the name is typed, erased, and then the torn paper slides
 * in. It only runs when the inline script in the root layout has set
 * `data-intro="play"` on <html> (first visit of the session, no reduced motion).
 */
export default function Intro() {
  const [typed, setTyped] = useState("");
  const finish = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      timers.forEach(window.clearTimeout);
      root.dataset.intro = "reveal";
      window.setTimeout(() => {
        if (root.dataset.intro === "reveal") delete root.dataset.intro;
      }, 2800);
    };
    finish.current = reveal;

    let at = 350;
    for (let i = 1; i <= NAME.length; i++) {
      later(() => setTyped(NAME.slice(0, i)), at);
      at += NAME[i - 1] === " " ? 105 : 55;
    }
    at += 650;
    for (let i = NAME.length - 1; i >= 0; i--) {
      later(() => setTyped(NAME.slice(0, i)), at);
      at += 22;
    }
    later(reveal, at + 200);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        reveal();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="intro" onClick={() => finish.current()}>
      <p className="intro-line" aria-hidden="true">
        <span>{typed}</span>
        <span className="intro-caret" />
      </p>
      <button type="button" className="intro-skip" onClick={() => finish.current()}>
        Pular
      </button>
    </div>
  );
}
