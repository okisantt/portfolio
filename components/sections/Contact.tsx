import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks";
import { tornRect } from "@/lib/torn";

const paperOutline = tornRect(73);

export default function Contact() {
  return (
    <section id="contato" className="py-section-y">
      <SectionHeading number="05" title="Vamos conversar" />
      <div className="sheet-panel">
        <div className="sheet-panel-paper" style={{ clipPath: paperOutline }} aria-hidden="true" />
        <div className="relative px-6 py-10 sm:px-10 sm:py-14">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-text/70">
            Disponível para oportunidades
          </p>
          <h3 className="mt-4 max-w-xl text-balance text-2xl font-light leading-tight text-text sm:text-4xl">
            Procuro desafios onde software, processo e segurança caminhem juntos.
          </h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-text/80 sm:text-base">
            Para contato profissional, você pode me encontrar no LinkedIn ou
            solicitar acesso ao meu currículo completo. O documento é liberado
            somente após verificação do e-mail e aprovação manual.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/curriculo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-text px-6 text-sm font-semibold text-wine transition-colors hover:bg-white"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Solicitar currículo
            </Link>
            <a
              href="https://www.linkedin.com/in/isaac-santt-560227379/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold text-text transition-colors hover:border-white/70"
            >
              Falar no LinkedIn
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 border-t border-white/15 pt-6">
            <SocialLinks onPaper />
          </div>
        </div>
      </div>
    </section>
  );
}
