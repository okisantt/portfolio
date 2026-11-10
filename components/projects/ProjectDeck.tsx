"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCover from "@/components/projects/ProjectCover";
import TransitionLink from "@/components/transition/TransitionLink";
import type { Project } from "@/lib/projects";

/**
 * Projects as a stack of leaning sheets. The one under the pointer stands up
 * to face the visitor and its name appears on the left; on touch screens each
 * sheet straightens as it reaches the middle of the screen.
 */
export default function ProjectDeck({ projects }: { projects: readonly Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [inView, setInView] = useState<number | null>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLUListElement>(null);

  // Touch screens: straighten the sheet that crosses the middle of the viewport.
  useEffect(() => {
    const items = Array.from(list.current?.children ?? []);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setInView(items.indexOf(entry.target));
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const shown = active !== null ? projects[active] : null;

  return (
    <div className="deck-wrap">
      <p className="deck-label" aria-live="polite">
        <span>{shown ? shown.category : "Selecione"}</span>
        <strong>{shown ? shown.name : `${projects.length} projetos`}</strong>
      </p>

      <ul
        ref={list}
        className="deck"
        data-hover={active !== null}
        onPointerMove={(event) => {
          if (cursor.current) {
            cursor.current.style.translate = `${event.clientX}px ${event.clientY}px`;
          }
        }}
        onPointerLeave={() => setActive(null)}
      >
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="deck-item"
            data-active={active === index}
            data-inview={inView === index}
          >
            <TransitionLink
              href={`/projetos/${project.slug}`}
              word={project.name}
              className="deck-card"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(index);
              }}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              <ProjectCover
                project={project}
                sizes="(max-width: 767px) 92vw, 46rem"
                priority={index < 2}
              />
              <span className="deck-caption">
                <span>{project.category}</span>
                <strong>{project.name}</strong>
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>

      <span ref={cursor} className="deck-cursor" data-on={active !== null} aria-hidden="true">
        Ver projeto
      </span>
    </div>
  );
}
