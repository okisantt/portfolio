"use client";

import FeaturedProject from "./FeaturedProject";
import { useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import Pressable from "@/components/motion/Pressable";
import { CATEGORIES, PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProjectCard({ p }: { p: Project }) {
  const CardTag = p.href ? "a" : "div";

  const base =
    "group block rounded-lg border hairline bg-white/0 p-5 sm:p-6 transition " +
    "hover:bg-white/3 hover:border-white/10";

  return (
    <Pressable>
      <CardTag
        {...(p.href
          ? { href: p.href, target: "_blank", rel: "noreferrer" }
          : {})}
        className={cn(base, p.highlight && "border-white/12 bg-white/2")}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-medium tracking-tightish">
            {p.title}
          </h3>
          <Tag subtle>{p.category}</Tag>
        </div>

        <p className="mt-3 text-sm text-muted">{p.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <Tag key={t} subtle>
              {t}
            </Tag>
          ))}
        </div>

        <div className="mt-5 h-px w-full bg-white/5" />

        <p className="mt-3 text-[11px] text-muted group-hover:text-text transition">
          {p.href ? "Abrir projeto" : "Detalhes internos"}
        </p>
      </CardTag>
    </Pressable>
  );
}

export default function Projects() {
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]>("Todos");

  const filtered = useMemo(() => {
    if (category === "Todos") return PROJECTS;
    return PROJECTS.filter((p) => p.category === category);
  }, [category]);

  return (
    <Section
      id="projetos"
      eyebrow="Seleção"
      title="Projetos com foco em clareza, eficiência e estética silenciosa"
      subtitle="Filtros simples, cards honestos e microinterações contidas. No toque, a resposta visual é imediata; no desktop, o hover é leve."
    >
      <FeaturedProject />

      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] border transition",
                active
                  ? "border-accent/35 bg-accent/12 text-text"
                  : "border-white/8 text-muted hover:text-text hover:bg-white/4"
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </Section>
  );
}
