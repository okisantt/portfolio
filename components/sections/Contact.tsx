import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import ButtonLink from "@/components/ui/ButtonLink";
import FadeIn from "@/components/motion/FadeIn";
import { SOCIALS } from "@/lib/data";

export default function Contact() {
  return (
    <Section
      id="contato"
      eyebrow="Conexão"
      title="Contato simples, objetivo e funcional"
      subtitle="Sem formulários pesados: links diretos e acionáveis."
      className="pb-28 md:pb-section-y"
    >
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <FadeIn>
          <div className="glass-surface rounded-xl p-6">
            <p className="text-sm text-muted">
              Aberto a projetos de front-end, landing pages premium
              e construção de interfaces com padrão de produto.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag subtle>Resposta rápida</Tag>
              <Tag subtle>Escopo claro</Tag>
              <Tag subtle>Entrega com métricas</Tag>
            </div>
            <div className="mt-6">
              <ButtonLink href="mailto:seuemail@dominio.com">
                Enviar email
              </ButtonLink>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="rounded-xl border hairline p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              Links
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <ButtonLink key={s.label} href={s.href} variant="ghost" external>
                  {s.label}
                </ButtonLink>
              ))}
              <ButtonLink
                href="/cv-isaac-santana-muniz.pdf"
                variant="ghost"
                external
              >
                Currículo
              </ButtonLink>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
