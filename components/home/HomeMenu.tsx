"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePageTransition } from "@/components/transition/TransitionProvider";
import { HOBBIES_SCENE, NAV } from "@/lib/data";

/**
 * The row of destinations under the cover. Pointing at an item opens a band of
 * wine paper with its name in large type; choosing it lets the band take over
 * the whole screen before the page opens.
 */
export default function HomeMenu() {
  const [active, setActive] = useState<number | null>(null);
  const [word, setWord] = useState<string>(NAV[0].word);
  const band = useRef<HTMLDivElement>(null);
  const leaving = useRef(false);
  const { go } = usePageTransition();

  const open = (index: number) => {
    if (leaving.current) return;
    // Warm up the artwork of the hobbies transition before it is needed.
    if (NAV[index].symbol) new window.Image().src = HOBBIES_SCENE;
    setActive(index);
    setWord(NAV[index].word);
  };
  const close = () => {
    if (!leaving.current) setActive(null);
  };

  const choose = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (leaving.current) return;

    const item = NAV[index];
    const link = event.currentTarget;
    const wasOpen = active === index;
    leaving.current = true;
    setActive(index);
    setWord(item.word);

    const start = () => {
      // Wide screens grow from the band; on phones the band is hidden and the row itself is the origin.
      const bandVisible = band.current && getComputedStyle(band.current).display !== "none";
      const box = (bandVisible ? band.current! : link).getBoundingClientRect();
      go(item.href, item.word, { top: box.top, bottom: box.bottom });
      window.setTimeout(() => {
        leaving.current = false;
      }, 1200);
    };
    // Touch screens have no hover: give the band a moment to open first.
    if (wasOpen) start();
    else window.setTimeout(start, 320);
  };

  return (
    <nav
      id="menu"
      className="menu"
      data-open={active !== null}
      aria-label="Seções do portfólio"
      onMouseLeave={close}
    >
      <div ref={band} className="menu-band" aria-hidden="true">
        <span key={word} className="menu-ghost">
          {word}
        </span>
      </div>

      <ul className="menu-list">
        {NAV.map((item, index) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="menu-item"
              data-active={active === index}
              data-symbol={item.symbol}
              aria-label={item.symbol ? item.name : undefined}
              onMouseEnter={() => open(index)}
              onFocus={() => open(index)}
              onBlur={close}
              onClick={(event) => choose(event, index)}
            >
              <span className="menu-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="menu-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
