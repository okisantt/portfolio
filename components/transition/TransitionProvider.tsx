"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HOBBIES_SCENE } from "@/lib/data";

/** Where on screen the wine band starts growing from, in viewport pixels. */
export type TransitionOrigin = { top: number; bottom: number };

type Phase = "idle" | "cover" | "reveal";
/** "hobbies" opens with artwork behind the band and needs longer on screen. */
type Scene = "plain" | "hobbies";

type TransitionContextValue = {
  go: (href: string, word: string, origin?: TransitionOrigin) => void;
};

const TransitionContext = createContext<TransitionContextValue>({ go: () => {} });

export const usePageTransition = () => useContext(TransitionContext);

/** Shortest time the transition screen stays up, so the word can be read. */
const MIN_COVER_MS: Record<Scene, number> = { plain: 1500, hobbies: 4200 };
const REVEAL_MS = 850;
/** The page is swapped only once the band has covered the old one. */
const SWAP_AFTER_MS = 800;
const GIVE_UP_MS = 8000;

/**
 * Page transition: a band of wine paper grows from the clicked item until it
 * fills the screen, shows the destination's name with a loading counter, and
 * lifts once the new page is ready underneath.
 */
export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [word, setWord] = useState("");
  const [scene, setScene] = useState<Scene>("plain");
  // Once the artwork has been used it stays mounted, so later visits start instantly.
  const [artwork, setArtwork] = useState(false);
  const [geometry, setGeometry] = useState({ top: 0, bottom: 0, shift: 0 });
  const counter = useRef<HTMLSpanElement>(null);
  const current = useRef(pathname);
  const target = useRef<string | null>(null);

  useEffect(() => {
    current.current = pathname;
  }, [pathname]);

  const go = useCallback(
    (href: string, label: string, origin?: TransitionOrigin) => {
      const path = href.split("#")[0] || "/";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (target.current || reduced || path === current.current) {
        if (!target.current) router.push(href);
        return;
      }

      const height = window.innerHeight;
      const from = origin ?? { top: height / 2, bottom: height / 2 };
      setGeometry({
        top: Math.max(0, from.top),
        bottom: Math.max(0, height - from.bottom),
        shift: (from.top + from.bottom) / 2 - height / 2,
      });
      setWord(label);
      const next: Scene = path === "/hobbies" ? "hobbies" : "plain";
      setScene(next);
      if (next === "hobbies") setArtwork(true);
      target.current = path;
      document.documentElement.dataset.transit = "cover";
      setPhase("cover");
      router.prefetch(href);
      window.setTimeout(() => router.push(href), SWAP_AFTER_MS);
    },
    [router],
  );

  // While covered: run the counter and wait for the destination to mount.
  useEffect(() => {
    if (phase !== "cover") return;
    const started = performance.now();
    const minimum = MIN_COVER_MS[scene];
    let frame = 0;
    let timer = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      const arrived = current.current === target.current;

      if (arrived && elapsed >= minimum) {
        if (counter.current) counter.current.textContent = "100";
        timer = window.setTimeout(() => setPhase("reveal"), 220);
        return;
      }
      if (!arrived && elapsed > GIVE_UP_MS && target.current) {
        window.location.assign(target.current);
        return;
      }
      const eased = 1 - Math.exp(-elapsed / (minimum * 0.42));
      if (counter.current) counter.current.textContent = String(Math.min(96, Math.round(eased * 100)));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [phase, scene]);

  // Lift the band, then return to rest.
  useEffect(() => {
    if (phase !== "reveal") return;
    document.documentElement.dataset.transit = "reveal";
    const timer = window.setTimeout(() => {
      delete document.documentElement.dataset.transit;
      target.current = null;
      setPhase("idle");
    }, REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      <div
        className="transit"
        data-phase={phase}
        data-scene={scene}
        role="status"
        aria-hidden={phase === "idle"}
        style={
          {
            "--from-top": `${geometry.top}px`,
            "--from-bottom": `${geometry.bottom}px`,
            "--from-shift": `${geometry.shift}px`,
          } as React.CSSProperties
        }
      >
        {artwork && (
          <div className="transit-art" aria-hidden="true">
            <Image src={HOBBIES_SCENE} alt="" fill sizes="100vw" />
          </div>
        )}
        <span className="transit-word">{word}</span>
        <span className="transit-count">
          {scene === "hobbies" && <strong>{word}</strong>}
          <span>
            Carregando — <span ref={counter}>0</span>%
          </span>
        </span>
      </div>
    </TransitionContext.Provider>
  );
}
