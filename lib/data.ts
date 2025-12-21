export type Project = {
  id: string;
  title: string;
  summary: string;
  category: "Web" | "Automação" | "Data" | "Design";
  tags: string[];
  href?: string;
  highlight?: boolean;
};

export const CATEGORIES: Array<Project["category"] | "Todos"> = [
  "Todos",
  "Web",
  "Automação",
  "Data",
  "Design"
];

export const PROJECTS: Project[] = [
  {
    id: "atlas",
    title: "Atlas UI",
    summary:
      "Sistema de componentes com tokens sólidos, foco em consistência e performance real.",
    category: "Web",
    tags: ["Design System", "Next.js", "A11y"],
    highlight: true
  },
  {
    id: "northstar",
    title: "Northstar CRM Lite",
    summary:
      "CRM enxuto para negócios locais com automações inteligentes e onboarding rápido.",
    category: "Automação",
    tags: ["Automations", "UX", "SaaS"]
  },
  {
    id: "argon",
    title: "Argon Dashboard",
    summary:
      "Painéis objetivos com narrativa visual limpa e métricas acionáveis.",
    category: "Data",
    tags: ["BI", "Storytelling", "Produto"]
  },
  {
    id: "mono",
    title: "Mono Posters",
    summary:
      "Exploração de tipografia e composição minimalista com regras estritas de contraste.",
    category: "Design",
    tags: ["Typography", "Grid", "Brand"]
  }
];

export const SKILLS = [
  {
    group: "Front-end",
    note: "Construção de interfaces escaláveis e precisas.",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"]
  },
  {
    group: "Produto",
    note: "Decisões guiadas por clareza, conversão e retenção.",
    items: ["UX Writing", "Design Systems", "Acessibilidade", "Pesquisa leve"]
  },
  {
    group: "Automação / Dados",
    note: "Fluxos simples que viram vantagem competitiva.",
    items: ["APIs", "Dashboards", "ETL leve", "Integrações"]
  }
];

export const TIMELINE = [
  {
    period: "2024 — Hoje",
    title: "Estudante de Engenharia de Software",
    detail:
      "Evolução intensa em front-end moderno, arquitetura de componentes e experiências mobile."
  },
  {
    period: "2021 — 2024",
    title: "Experiências operacionais e disciplina de execução",
    detail:
      "Rotina intensa, responsabilidade e visão prática de risco, processo e consistência."
  }
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/isaacsantt" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Email", href: "mailto:seuemail@dominio.com" }
];
