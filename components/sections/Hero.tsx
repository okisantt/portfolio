import Image from "next/image";
import Link from "next/link";
import { FileText, Github, Linkedin } from "lucide-react";
import HeroClock from "@/components/hero/HeroClock";
import TransitionLink from "@/components/transition/TransitionLink";
import { SITE } from "@/lib/data";
import { tornEdge } from "@/lib/torn";

// Where the tear runs, as [y%, x%]. Wide screens get a tear that swings from
// 61% to 47% and back; portrait screens split the screen roughly in half.
const WIDE = [[0, 61], [10, 58], [24, 52], [38, 47.5], [52, 49], [64, 54], [78, 58], [90, 61], [100, 64]] as const;
const TALL = [[0, 54], [12, 50], [28, 45], [45, 43], [60, 44], [75, 47], [90, 51], [100, 53]] as const;

const tearStyles = `
.hero{--tear-sheet:${tornEdge({ points: WIDE, offset: 1.9, amp: 2, seed: 21 })};--tear-shadow:${tornEdge({ points: WIDE, offset: 3.6, amp: 2.25, seed: 7 })}}
@media (max-width:767px),(max-aspect-ratio:1/1){.hero{--tear-sheet:${tornEdge({ points: TALL, offset: 2, amp: 2.6, seed: 21 })};--tear-shadow:${tornEdge({ points: TALL, offset: 3.8, amp: 2.8, seed: 7 })}}}
`;

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

const socials = [
  { href: SITE.github, label: "GitHub de Isaac (abre em nova aba)", Icon: Github, external: true },
  { href: SITE.linkedin, label: "LinkedIn de Isaac (abre em nova aba)", Icon: Linkedin, external: true },
  { href: "/curriculo", label: "Solicitar currículo", Icon: FileText, external: false },
] as const;

export default function Hero() {
  return (
    <section id="topo" className="hero" aria-label="Apresentação">
      <style dangerouslySetInnerHTML={{ __html: tearStyles }} />

      <div className="hero-stage">
        <Image
          src="/isaac-portrait.jpg"
          alt="Retrato em preto e branco de Isaac Santana Muniz"
          width={3840}
          height={3902}
          priority
          sizes="(max-width: 767px) 115vw, (max-aspect-ratio: 1/1) 115vw, 62vw"
          className="hero-photo"
        />

        <div className="hero-paper" aria-hidden="true">
          <div className="hero-shadow" />
          <div className="hero-sheet" />
        </div>

        <p className="hero-c hero-hi" style={delay(0.75)}>
          Olá
        </p>
        <a
          href="#menu"
          className="hero-c hero-arrow"
          style={delay(0.9)}
          aria-label="Ir para o menu"
        >
          ↓
        </a>
        <HeroClock />

        <h1 className="hero-c hero-vert" style={delay(1.1)}>
          <span className="hero-v-main">
            <span className="hero-v-pre" aria-hidden="true">
              2026 —{" "}
            </span>
            {SITE.shortName}.
          </span>
          <span className="hero-v-sub">Back-end · Automação · Segurança</span>
        </h1>

        <div className="hero-c hero-copy" style={delay(1.2)}>
          <p className="hero-eyebrow">Engenharia de software</p>
          <p className="hero-statement">
            Transformo regras, dados e processos em software confiável.
          </p>
          <p className="hero-para">
            Foco em back-end, banco de dados, automação e segurança. Gosto de
            entender o problema antes de escrever a primeira linha de código.
          </p>
          <div className="hero-ctas">
            <TransitionLink href="/projetos" word="Projetos" className="hero-btn hero-btn-solid">
              Ver projetos
            </TransitionLink>
            <Link href="/curriculo" className="hero-btn hero-btn-ghost">
              Solicitar currículo
            </Link>
          </div>
        </div>

        <ul className="hero-c hero-icons" style={delay(1.35)}>
          {socials.map(({ href, label, Icon, external }) => (
            <li key={href}>
              {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon aria-hidden="true" />
                </a>
              ) : (
                <Link href={href} aria-label={label}>
                  <Icon aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ul>

        <p className="hero-c hero-sig" style={delay(1.5)}>
          <b>{SITE.name}</b>
          <span>desenvolvedor back-end em formação</span>
        </p>
      </div>
    </section>
  );
}
