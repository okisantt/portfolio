import Container from "@/components/ui/Container";

const DESKTOP_ASIDE_WIDTH = "clamp(360px, 42vw, 520px)";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      {/* Mobile: footer normal, ocupando toda a largura */}
      <div className="md:hidden">
        <Container className="py-10">
          <p className="w-full text-center font-mono text-[11px] tracking-[0.22em] text-text/70 font-medium">
  © 2026 Isaac Santana Muniz.
</p>

        </Container>
      </div>

      {/* Desktop: alinhado com a coluna da direita */}
      <div className="hidden md:block" style={{ marginLeft: DESKTOP_ASIDE_WIDTH }}>
        <Container className="py-10">
          <p className="w-full text-center font-mono text-[11px] tracking-[0.22em] text-text/70 font-medium">
  © 2026 Isaac Santana Muniz.
</p>

        </Container>
      </div>
    </footer>
  );
}
