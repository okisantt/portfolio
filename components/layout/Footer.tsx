import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <Container className="py-10">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Isaac Santana Muniz. Construído com foco em
          clareza, performance e estética minimal premium.
        </p>
      </Container>
    </footer>
  );
}
