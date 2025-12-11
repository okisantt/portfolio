import ButtonLink from "@/components/ui/ButtonLink";
import Tag from "@/components/ui/Tag";
import FadeIn from "@/components/motion/FadeIn";

export default function HeroDesktop() {
  return (
    <div>
      <FadeIn>
        <div className="flex flex-wrap items-center gap-2">
          <Tag subtle>Minimal premium • Dark-only</Tag>
          <Tag subtle>Isaac Santana Muniz • 23</Tag>
          <Tag subtle>Engenharia de Software</Tag>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <h1 className="mt-6 text-4xl font-medium tracking-tightish text-balance font-hero">
          Interfaces precisas, limpas e feitas para converter sem ruído.
        </h1>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-4 text-sm text-muted">
          Eu construo experiências digitais com foco em produto, performance e
          uma estética silenciosa que transmite confiança.
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

      <FadeIn delay={0.2}>
        <div className="mt-10 rounded-xl border hairline p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">
            Perfil
          </p>
          <p className="mt-3 text-sm text-muted">
            Estudante de Engenharia de Software com foco em front-end moderno,
            design de interfaces e experiências mobile de padrão premium.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
