export const SITE = {
  name: "Isaac Santana Muniz",
  shortName: "Isaac Santt",
  handle: "dev_santt",
  role: "Desenvolvedor back-end em formação",
  description:
    "Portfólio de Isaac Santana Muniz, estudante de Engenharia de Software com foco em back-end, automação e segurança.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://santt.dev",
  github: "https://github.com/okisantt",
  linkedin: "https://www.linkedin.com/in/isaac-santt-560227379/",
} as const;

/**
 * The destinations of the site. `word` is the single word shown in large type
 * on the menu band and on the transition screen. A `symbol` item shows a
 * glyph instead of a written label, so `name` carries its spoken name.
 */
export const NAV = [
  { href: "/biografia", label: "Biografia", short: "Biografia", word: "Biografia", name: "Biografia", symbol: false },
  { href: "/experiencia-tecnologia", label: "Experiência Tecnologia", short: "Tecnologia", word: "Tecnologia", name: "Experiência Tecnologia", symbol: false },
  { href: "/experiencia-operacional", label: "Experiência Operacional", short: "Operacional", word: "Operacional", name: "Experiência Operacional", symbol: false },
  { href: "/projetos", label: "Projetos", short: "Projetos", word: "Projetos", name: "Projetos", symbol: false },
  { href: "/ciberseguranca", label: "Cibersegurança", short: "Cibersegurança", word: "Cibersegurança", name: "Cibersegurança", symbol: false },
  { href: "/hobbies", label: "∞", short: "∞", word: "Hobbies", name: "Hobbies", symbol: true },
] as const;

export type NavItem = (typeof NAV)[number];
