import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Tag from "@/components/ui/Tag";
import FadeIn from "@/components/motion/FadeIn";

export default function Hero() {
  return (
    <section id="topo" className="pt-16 sm:pt-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <FadeIn>
              <div className="flex flex-wrap items-center gap-2">
                <Tag subtle>Minimal premium • Dark-only</Tag>
                <Tag subtle>Isaac Santana Muniz • 23</Tag>
                <Tag subtle>Engenharia de Software</Tag>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tightish text-balance">
                Interfaces precisas, limpas e feitas para converter sem ruído.
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-4 max-w-xl text-sm sm:text-base text-muted">
                Eu construo experiências digitais com foco em produto,
                performance e uma estética silenciosa que transmite confiança.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="#projetos">Ver projetos</ButtonLink>
                <ButtonLink href="#contato" variant="ghost">
                  Falar comigo
                </ButtonLink>
                <ButtonLink
                  href="/cv-isaac-santana-muniz.pdf"
                  variant="ghost"
                  external
                >
                  Currículo
                </ButtonLink>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.08}>
            <div className="glass-surface rounded-xl p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Foco atual
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/70" />
                  Portfólios e landing pages de alto padrão.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/70" />
                  Experiências mobile com navegação pensada para uma mão.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/70" />
                  UI com tokens sólidos e consistência de produto.
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
