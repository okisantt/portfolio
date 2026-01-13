import HeroDesktop from "@/components/sections/HeroDesktop";

const ASIDE_WIDTH = "clamp(360px, 42vw, 520px)";
const HEADER_H = 56;

/**
 * Desktop:
 * - Coluna esquerda fixa com o HeroDesktop
 * - Conteúdo à direita com margin-left (scroll do WINDOW)
 *
 * Mobile:
 * - Não renderiza a coluna esquerda
 * - Não aplica margin-left (layout fica exatamente como antes)
 */
export default function DesktopSplit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ ["--aside-w" as any]: ASIDE_WIDTH }}>
      {/* Coluna esquerda fixa (apenas desktop) */}
      <aside
        className="hidden md:block fixed left-0 bottom-0 border-r border-white/5 bg-bg/90 backdrop-blur-sm"
        style={{ width: "var(--aside-w)", top: `${HEADER_H}px` }}
      >
        <div className="h-full flex items-center">
          <div className="w-full pl-16 pr-10 xl:pl-20">
            <div className="mx-auto max-w-lg">
              <HeroDesktop />
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo (mobile + desktop). No desktop ganha espaço da coluna esquerda */}
      <div className="w-full md:ml-[var(--aside-w)] md:-translate-x-16 lg:-translate-x-56">
  {children}
</div>

    </div>
  );
}
