import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { TECHNOLOGIES } from "@/lib/data";

export default function About() {
  return (
    <section id="sobre" className="py-section-y">
      <SectionHeading number="01" title="Sobre mim" />

      <div className="grid items-start gap-10 sm:grid-cols-[minmax(0,1fr)_13rem] xl:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 text-[0.95rem] leading-7 text-muted">
          <div className="space-y-5">
            <p>
              Me chamo Isaac Santana Muniz, tenho 23 anos e atuo com foco em
              back-end, desenvolvendo APIs e serviços com atenção à modelagem de
              dados, segurança e manutenção.
            </p>
            <p>
              Trabalho com regras de negócio, integrações e automações, buscando
              consistência, organização de código e entregas confiáveis.
            </p>
            <p>
              Tenho forte interesse em Cybersecurity e pretendo aprofundar
              práticas de hardening, análise de vulnerabilidades e engenharia
              segura ao longo da minha trajetória.
            </p>
          </div>

          <p className="mt-8 text-sm text-text/70">Tecnologias usadas recentemente</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-xs sm:max-w-md">
            {TECHNOLOGIES.map((technology) => (
              <li key={technology} className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">↗</span>
                {technology}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-[15rem] sm:mx-0">
          <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-xl border border-accent/40" aria-hidden="true" />
          <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-surface">
            <Image
              src="/projects/editsantt.png"
              alt="Retrato de Isaac Santana Muniz"
              fill
              className="object-cover grayscale transition duration-500 hover:grayscale-0"
              sizes="(min-width: 1280px) 240px, (min-width: 640px) 208px, 75vw"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
