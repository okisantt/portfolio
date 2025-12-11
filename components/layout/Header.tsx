import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-bg/70 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <a
          href="#topo"
          className="group inline-flex items-center gap-2"
          aria-label="Voltar ao topo"
        >
          <span className="h-6 w-6 rounded-md bg-white/5 border border-white/10 grid place-items-center">
            <span className="text-[10px] text-muted group-hover:text-text transition">
              IS
            </span>
          </span>
          <span className="text-xs sm:text-sm text-muted group-hover:text-text transition">
            Isaac Santana Muniz
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-muted hover:text-text transition"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/cv-isaac-santana-muniz.pdf"
            variant="ghost"
            className="px-3 py-1.5 text-[11px]"
            external
          >
            Currículo
          </ButtonLink>
          <a
            href="#contato"
            className="hidden md:inline-flex text-xs text-muted hover:text-text transition"
          >
            Disponível para projetos
          </a>
        </div>
      </Container>
    </header>
  );
}
