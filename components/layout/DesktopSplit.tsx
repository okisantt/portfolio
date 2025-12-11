import HeroDesktop from "@/components/sections/HeroDesktop";

const ASIDE_WIDTH = "clamp(360px, 42vw, 520px)";

export default function DesktopSplit({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Coluna esquerda fixa (desktop) */}
      <aside
        className="hidden md:block fixed left-0 bottom-0 border-r border-white/5 bg-bg/90 backdrop-blur-sm"
        style={{ width: ASIDE_WIDTH, top: "56px" }}
      >
        <div className="h-full flex items-center">
          <div className="w-full px-10">
            <div className="mx-auto max-w-lg">
              <HeroDesktop />
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo à direita com espaço correspondente */}
      <div
        className="hidden md:block"
        style={{ marginLeft: ASIDE_WIDTH }}
      >
        {children}
      </div>
    </>
  );
}
