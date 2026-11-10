export const SITE = {
  name: "Isaac Santana Muniz",
  shortName: "Isaac Santt",
  role: "Desenvolvedor back-end em formação",
  description:
    "Portfólio de Isaac Santana Muniz, estudante de Engenharia de Software com foco em back-end, automação e segurança.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://santt.dev",
  github: "https://github.com/okisantt",
  linkedin: "https://www.linkedin.com/in/isaac-santt-560227379/",
} as const;

/**
 * The five destinations of the site. `word` is the single word shown in large
 * type on the menu band and on the transition screen.
 */
export const NAV = [
  { href: "/biografia", label: "Biografia", short: "Biografia", word: "Biografia" },
  { href: "/experiencia-tecnologia", label: "Experiência Tecnologia", short: "Tecnologia", word: "Tecnologia" },
  { href: "/experiencia-operacional", label: "Experiência Operacional", short: "Operacional", word: "Operacional" },
  { href: "/projetos", label: "Projetos", short: "Projetos", word: "Projetos" },
  { href: "/ciberseguranca", label: "Cibersegurança", short: "Cibersegurança", word: "Cibersegurança" },
] as const;

export type NavItem = (typeof NAV)[number];
