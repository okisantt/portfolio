import Image from "next/image";

const screenshots = [
  {
    src: "/projects/epi-sentinel01.png",
    label: "Autenticação",
    alt: "Tela de autenticação do EPI Sentinel",
  },
  {
    src: "/projects/epi-sentinel02.png",
    label: "Dashboard",
    alt: "Dashboard de controle de EPIs",
  },
  {
    src: "/projects/epi-sentinel03.png",
    label: "Auditoria",
    alt: "Tela de auditoria e histórico do EPI Sentinel",
  },
] as const;

const highlights = [
  "Controle de entrega, validade e reposição de EPIs",
  "Histórico de ações e trilha de auditoria",
  "Visibilidade operacional por colaborador e setor",
] as const;

export default function EpiSentinelShots() {
  return (
    <article className="surface overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
        <div>
          <p className="eyebrow">Sistema operacional • estudo de caso</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-text">
            EPI Sentinel
          </h3>
          <p className="mt-4 text-sm leading-7 text-muted">
            Uma solução para substituir controles manuais de equipamentos de
            proteção por um fluxo rastreável, com regras claras, alertas e visão
            rápida do que está pendente.
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-text/70">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
          <p className="mt-7 font-mono text-[11px] text-muted">Next.js • TypeScript • Tailwind CSS</p>
        </div>

        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0"
          aria-label="Telas do projeto EPI Sentinel"
        >
          {screenshots.map((screenshot, index) => (
            <figure
              key={screenshot.src}
              className={`min-w-[86%] snap-center sm:min-w-0 ${index === 0 ? "sm:col-span-2" : ""}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-bg">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  className="object-cover object-top transition duration-500 hover:scale-[1.02]"
                  sizes={index === 0 ? "(min-width: 1280px) 48vw, 90vw" : "(min-width: 1280px) 24vw, 45vw"}
                />
              </div>
              <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {String(index + 1).padStart(2, "0")} — {screenshot.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </article>
  );
}
