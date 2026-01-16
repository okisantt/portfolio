import HeroDesktop from "@/components/sections/HeroDesktop";

const HEADER_H = 56;

export default function DesktopSplit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        w-full overflow-x-hidden

        /* PADRÃO (monitor): igual ao seu clamp original */
        [--aside-w:clamp(360px,42vw,520px)]

        /* NOTEBOOK: aside menor (pega menos espaço da direita) */
        [@media(max-width:1440px)]:[--aside-w:clamp(300px,34vw,440px)]
        [@media(max-height:900px)]:[--aside-w:clamp(300px,34vw,440px)]
      "
    >
      <aside
        className="hidden md:block fixed left-0 bottom-0 border-r border-white/5 bg-bg/90 backdrop-blur-sm"
        style={{ width: "var(--aside-w)", top: `${HEADER_H}px` }}
      >
        <div className="h-full flex items-center">
          <div className="w-full pl-20 pr-10 xl:pl-24">
            <div className="mx-auto max-w-lg">
              <HeroDesktop />
            </div>
          </div>
        </div>
      </aside>

      <div
        className="
          w-full
          md:ml-[var(--aside-w)]

          /* PADRÃO (monitor): mantém seu comportamento */
          md:-translate-x-16
          lg:-translate-x-64

          /* NOTEBOOK: MENOS shift (pra não ficar estranho/comprimido) */
          [@media(max-width:1440px)]:md:-translate-x-8
          [@media(max-width:1440px)]:lg:-translate-x-10
          [@media(max-height:900px)]:md:-translate-x-56
          [@media(max-height:900px)]:lg:-translate-x-120

          /* NOTEBOOK: sobe o bloco (ajuste fino de centralização vertical) */
          [@media(max-width:1440px)]:md:-translate-y-20
          [@media(max-height:900px)]:md:-translate-y-20
        "
      >
        {children}
      </div>
    </div>
  );
}
