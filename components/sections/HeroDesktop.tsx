import { Github, Linkedin, Mail } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import Tag from "@/components/ui/Tag";
import FadeIn from "@/components/motion/FadeIn";

export default function HeroDesktop() {
  return (
    <div className="md:-mt-8">
      <FadeIn>
        <p className="text-xs font-mono md:-mt-12 text-accent mb-1">
          Hi, my name is
        </p>
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

          {/* Redes sociais — SOMENTE PC */}
          <div className="mt-6 hidden md:flex flex-col gap-2 md:!mt-24">
            {/* GitHub */}
            <a
              href="https://github.com/isaacsantt"
              target="_blank"
              rel="noreferrer"
              className="
                group inline-flex items-center gap-3
                text-xs text-muted
                transition
                hover:text-text
              "
            >
              <span
                className="
                  inline-flex h-9 w-9 items-center justify-center rounded-full
                  border border-white/10
                  transition
                  group-hover:border-white/20 group-hover:bg-white/5
                "
              >
                <Github className="h-4 w-4" />
              </span>

              <span className="transition group-hover:translate-x-0.5">
                GitHub
              </span>

              <span
                className="
                  ml-auto text-[10px] text-muted/70
                  opacity-0 translate-x-1
                  transition
                  group-hover:opacity-100 group-hover:translate-x-0
                "
              >
                Abrir
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/SEU-USUARIO/"
              target="_blank"
              rel="noreferrer"
              className="
                group inline-flex items-center gap-3
                text-xs text-muted
                transition
                hover:text-text
              "
            >
              <span
                className="
                  inline-flex h-9 w-9 items-center justify-center rounded-full
                  border border-white/10
                  transition
                  group-hover:border-white/20 group-hover:bg-white/5
                "
              >
                <Linkedin className="h-4 w-4" />
              </span>

              <span className="transition group-hover:translate-x-0.5">
                LinkedIn
              </span>

              <span
                className="
                  ml-auto text-[10px] text-muted/70
                  opacity-0 translate-x-1
                  transition
                  group-hover:opacity-100 group-hover:translate-x-0
                "
              >
                Abrir
              </span>
            </a>

            {/* E-mail */}
            <a
              href="mailto:SEUEMAIL@DOMINIO.COM"
              className="
                group inline-flex items-center gap-3
                text-xs text-muted
                transition
                hover:text-text
              "
            >
              <span
                className="
                  inline-flex h-9 w-9 items-center justify-center rounded-full
                  border border-white/10
                  transition
                  group-hover:border-white/20 group-hover:bg-white/5
                "
              >
                <Mail className="h-4 w-4" />
              </span>

              <span className="transition group-hover:translate-x-0.5">
                E-mail
              </span>

              <span
                className="
                  ml-auto text-[10px] text-muted/70
                  opacity-0 translate-x-1
                  transition
                  group-hover:opacity-100 group-hover:translate-x-0
                "
              >
                Abrir
              </span>
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}