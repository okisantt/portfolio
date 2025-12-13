import ButtonLink from "@/components/ui/ButtonLink";
import Tag from "@/components/ui/Tag";
import FadeIn from "@/components/motion/FadeIn";

export default function HeroDesktop() {
  return (
    <div>
      <FadeIn>
        <p className="text-xs font-mono text-accent mb-1">Hi, my name is</p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-1 space-y-1">
          <h1 className="text-4xl lg:text-[2.9rem] font-semibold leading-tight tracking-tightish text-balance font-hero">
            Isaac Santt.
          </h1>
          <p className="text-xl lg:text-[1.6rem] font-medium text-text/75">
            I build things for the web.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-8 space-y-2 text-sm text-muted leading-relaxed">
          <p className="text-[0.7rem] tracking-[0.35em] text-muted/70">
            PERFIL
          </p>
          <p>
            Estudante de Engenharia de Software com foco em back-end. Atuando em
            banco de dados, deploy, correção de bugs e automação de sistemas.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
