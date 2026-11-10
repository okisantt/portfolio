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

export const SKILL_GROUPS = [
  {
    title: "Back-end",
    description: "APIs, regras de negócio e serviços preparados para evoluir.",
    items: ["Node.js", "Python", "APIs REST", "Banco de dados"],
  },
  {
    title: "Front-end",
    description: "Interfaces responsivas para dar forma e clareza aos produtos.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Operação & dados",
    description: "Automação e visibilidade para reduzir trabalho manual e falhas.",
    items: ["VBA", "Power BI", "Excel", "Deploy"],
  },
] as const;

export const EXPERIENCES = [
  {
    company: "G4S Vanguarda",
    href: "https://www.g4s.com/pt-br",
    role: "Vigilante Patrimonial",
    period: "Jan 2024 — presente",
    description:
      "Atuação em ambiente industrial com controle de acesso, CFTV, rondas preventivas e resposta a ocorrências. Também elaboro relatórios operacionais em Excel, Word e Power BI, conectando rotina, análise e melhoria de processo.",
  },
  {
    company: "AATEC",
    href: "https://www.aatec.com.br/",
    role: "Parceiro Administrativo",
    period: "Set 2024 — dez 2024",
    description:
      "Apoio administrativo e participação em discussões e workshops sobre tecnologia, ampliando repertório técnico e relacionamento com profissionais da área.",
  },
  {
    company: "Madil Carreiras",
    href: "https://www.linkedin.com/company/lumiicarreiras/",
    role: "Moderador",
    period: "Mai 2024 — nov 2024",
    description:
      "Organização e moderação de uma comunidade voltada ao mercado de trabalho e à tecnologia, promovendo troca de conhecimento e suporte aos membros.",
  },
] as const;

export const TECHNOLOGIES = [
  "JavaScript",
  "React",
  "Node.js",
  "C++",
  "VBA",
  "Python",
] as const;
