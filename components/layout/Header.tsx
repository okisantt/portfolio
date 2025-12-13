import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-bg/70 backdrop-blur">
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-24 w-full">
        <a
          href="#topo"
          className="group inline-flex items-center"
          aria-label="Voltar ao topo"
        >
              <Image
                src="/avatar-logo-isaac.png"
                alt="Foto de Isaac Santt"
                width={100}
                height={100}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
                priority
              />
        </a>

        {/* DIREITA – links + botão Currículo */}
        <div className="flex items-center gap-6">
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

          <ButtonLink href="#curriculo">Currículo</ButtonLink>
        </div>
      </div>
    </header>
  );
}
