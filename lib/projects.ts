import type { Section } from "@/lib/content";

export type Project = {
  slug: string;
  name: string;
  category: string;
  status: string;
  summary: string;
  stack: readonly string[];
  /** Screenshot used on the stack and at the top of the project page. */
  cover?: { src: string; alt: string };
  gallery?: readonly { src: string; alt: string; label: string }[];
  links: readonly { href: string; label: string }[];
  sections: readonly Section[];
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "portfolio",
    name: "Portfólio",
    category: "Site pessoal",
    status: "No ar em santt.dev",
    summary:
      "Portfólio autoral com layout minimalista e navegação fluida, criado para reunir experiências, projetos, competências e contato em um único lugar.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    cover: {
      src: "/projects/portfolio-capa.jpg",
      alt: "Capa do portfólio: papel vinho rasgado revelando o retrato de Isaac",
    },
    links: [
      { href: "https://santt.dev", label: "Visitar o site" },
      { href: "https://github.com/okisantt/portfolio", label: "Ver o código" },
    ],
    sections: [
      {
        title: "Contexto",
        kicker: "Por que existe",
        paragraphs: [
          "Eu precisava de um lugar só para a minha apresentação profissional: experiências, projetos, competências e contato, com leitura rápida no computador e no celular.",
          "O site também funciona como vitrine viva das minhas evoluções e entregas.",
        ],
      },
      {
        title: "Solução",
        kicker: "O que foi construído",
        paragraphs: [
          "Uma capa em papel rasgado com animação de entrada, um menu que abre cada seção em página própria e páginas numeradas para leitura em sequência, com foco em performance, tipografia e consistência visual.",
          "O currículo não fica exposto: o visitante solicita acesso, confirma o e-mail com um código e aguarda aprovação manual antes de receber um link temporário.",
        ],
      },
      {
        title: "Tecnologias",
        kicker: "Como foi feito",
        list: [
          "Next.js (App Router), React e TypeScript",
          "Tailwind CSS e animações em CSS, respeitando quem prefere menos movimento",
          "PostgreSQL para solicitações, limite de tentativas e auditoria",
          "Armazenamento privado para o documento e envio de e-mails transacionais",
        ],
      },
    ],
  },
  {
    slug: "epi-sentinel",
    name: "EPI Sentinel",
    category: "Sistema operacional",
    status: "Em desenvolvimento (MVP)",
    summary:
      "Sistema para controle de equipamentos de proteção individual, com cadastro de colaboradores e itens, validade, alertas e histórico de entregas para auditoria.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    cover: { src: "/projects/epi-sentinel02.png", alt: "Dashboard de controle de EPIs do EPI Sentinel" },
    gallery: [
      { src: "/projects/epi-sentinel01.png", alt: "Tela de autenticação do EPI Sentinel", label: "Autenticação" },
      { src: "/projects/epi-sentinel02.png", alt: "Dashboard de controle de EPIs", label: "Dashboard" },
      { src: "/projects/epi-sentinel03.png", alt: "Tela de auditoria e histórico do EPI Sentinel", label: "Auditoria" },
    ],
    links: [],
    sections: [
      {
        title: "O problema",
        kicker: "Contexto",
        paragraphs: [
          "Em muitos ambientes o controle de EPIs ainda é manual. Fica difícil saber o que foi entregue, o que está vencendo e o que precisa de reposição, e mais difícil ainda comprovar isso em uma auditoria.",
        ],
      },
      {
        title: "Solução",
        kicker: "O que faz",
        list: [
          "Controle de entrega, validade e reposição de EPIs",
          "Alertas para o que está pendente",
          "Histórico de ações e trilha de auditoria",
          "Visibilidade operacional por colaborador e por setor",
        ],
      },
      {
        title: "Tecnologias",
        kicker: "Como está sendo feito",
        paragraphs: [
          "Next.js, TypeScript e Tailwind CSS. O MVP já tem a base pronta para virar uma solução web completa.",
        ],
      },
    ],
  },
  {
    slug: "painel-hacking",
    name: "Painel Hacking",
    category: "Cibersegurança",
    status: "Código aberto",
    summary:
      "Roteiro interativo de aprendizado em hacking ético e cibersegurança, que organiza uma lista curada de recursos em um caminho guiado.",
    stack: ["Next.js", "React", "TypeScript"],
    links: [{ href: "https://github.com/okisantt/Painel-Hacking", label: "Ver o código" }],
    sections: [
      {
        title: "Contexto",
        kicker: "Por que existe",
        paragraphs: [
          "Material bom de cibersegurança não falta, mas costuma estar espalhado em listas longas. Eu queria estudar seguindo uma ordem, sem perder de vista o que já tinha visto.",
        ],
      },
      {
        title: "Solução",
        kicker: "O que faz",
        list: [
          "Painel com métricas do guia e recursos em destaque",
          "Roteiro com etapas recomendadas, que filtram a biblioteca",
          "Biblioteca com filtro por seção, por tipo e busca por texto",
          "Favoritos para guardar recursos",
          "Layout responsivo, com barra lateral no computador e navegação inferior no celular",
        ],
      },
      {
        title: "Tecnologias e créditos",
        kicker: "Como foi feito",
        paragraphs: [
          "Next.js, React e TypeScript, com scripts que processam e validam os dados dos recursos.",
          "Os recursos vêm do Guia de Cyber Security, mantido publicamente por arthurspk, a quem pertence todo o crédito pela curadoria. O projeto tem fins educacionais.",
        ],
      },
    ],
  },
  {
    slug: "bloco-de-afazeres",
    name: "Bloco de Afazeres",
    category: "Produtividade",
    status: "Código aberto",
    summary:
      "Organizador pessoal com interface inspirada no Notion, que reúne tarefas, metas e hábitos.",
    stack: ["React", "Vite", "TypeScript", "Node.js", "Express", "SQLite"],
    links: [{ href: "https://github.com/okisantt/bloco_afazeres", label: "Ver o código" }],
    sections: [
      {
        title: "Contexto",
        kicker: "Por que existe",
        paragraphs: [
          "Um projeto para praticar o caminho completo de uma aplicação: da interface à API e ao banco de dados, em algo que eu mesmo usaria no dia a dia.",
        ],
      },
      {
        title: "Solução",
        kicker: "O que faz",
        list: [
          "Tarefas com prioridade e prazo",
          "Metas com alvo numérico, progresso em porcentagem e data limite",
          "Hábitos diários ou semanais, com registro por data e sequências automáticas",
        ],
      },
      {
        title: "Tecnologias",
        kicker: "Como foi feito",
        list: [
          "Interface em React, Vite, TypeScript e Tailwind CSS",
          "API REST em Node.js, Express e TypeScript",
          "Persistência em SQLite",
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((project) => project.slug === slug);

export function nextProject(slug: string) {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}
