import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const technologies = ["Next.js", "TypeScript", "Tailwind CSS", "Acessibilidade"];

export default function FeaturedProject() {
  return (
    <article className="surface group overflow-hidden rounded-3xl">
      <div className="grid md:grid-cols-[1.12fr_0.88fr]">
        <div className="relative min-h-64 overflow-hidden border-b border-white/[0.07] md:min-h-[26rem] md:border-b-0 md:border-r">
          <Image
            src="/projects/portfolio-capa.jpg"
            alt="Capa do portfólio de Isaac Santt: papel vinho rasgado revelando seu retrato"
            fill
            className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.025]"
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" aria-hidden="true" />
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="eyebrow">Projeto em destaque</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-text">
              Portfólio — Isaac Santt
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted">
              Portfólio construído para apresentar trajetória e projetos com
              leitura clara, navegação acessível e uma experiência consistente
              em diferentes dispositivos.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias do projeto">
              {technologies.map((technology) => (
                <li key={technology} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-text/70">
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/okisantt/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-semibold text-text transition-colors hover:border-accent/35"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Código
            </a>
            <a
              href="https://santt.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-semibold text-text transition-colors hover:border-accent/35"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Visitar
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
