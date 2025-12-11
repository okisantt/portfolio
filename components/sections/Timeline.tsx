import Section from "@/components/ui/Section";
import FadeIn from "@/components/motion/FadeIn";
import { TIMELINE } from "@/lib/data";

export default function Timeline() {
  return (
    <Section
      id="experiencia"
      eyebrow="Caminho"
      title="Experiência e estudos em ritmo discreto"
      subtitle="Uma timeline limpa, sem inflar narrativa."
    >
      <div className="space-y-3">
        {TIMELINE.map((t, i) => (
          <FadeIn key={t.title} delay={i * 0.04}>
            <div className="rounded-lg border hairline p-5 sm:p-6">
              <p className="text-[11px] text-muted">{t.period}</p>
              <h3 className="mt-1 text-base font-medium">{t.title}</h3>
              <p className="mt-2 text-sm text-muted">{t.detail}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
