import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import FadeIn from "@/components/motion/FadeIn";
import { SKILLS } from "@/lib/data";

export default function Skills() {
  return (
    <Section
      id="habilidades"
      eyebrow="Ferramentas e domínio"
      title="Habilidades organizadas por contexto de uso"
      subtitle="Nada de lista solta: cada bloco explica o papel real do conjunto."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {SKILLS.map((s, i) => (
          <FadeIn key={s.group} delay={i * 0.04}>
            <div className="rounded-xl border hairline p-6 hover:bg-white/3 transition">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                {s.group}
              </p>
              <p className="mt-2 text-sm text-muted">{s.note}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <Tag key={it} subtle>
                    {it}
                  </Tag>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
