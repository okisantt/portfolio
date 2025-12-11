import Section from "@/components/ui/Section";
import FadeIn from "@/components/motion/FadeIn";

export default function About() {
  return (
    <Section
      id="sobre"
      eyebrow="Identidade"
      title="Direto ao ponto, sem teatro"
      subtitle="Uma narrativa curta focada em impacto real."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FadeIn>
          <div className="glass-surface rounded-xl p-6">
            <p className="text-sm text-muted">
              Tenho uma obsessão prática por interfaces que parecem simples,
              mas são construídas com disciplina: boas decisões de grid,
              estados claros, acessibilidade real e performance que não depende
              de sorte.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="rounded-xl border hairline p-6">
            <p className="text-sm text-muted">
              Meu objetivo é transformar complexidade em experiência suave —
              especialmente em mobile — criando produtos que funcionam bem
              com uma mão, em poucos toques, e com feedback visual preciso.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
