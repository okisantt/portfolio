export type Section = {
  title: string;
  /** Small line under the title: role, period or theme. */
  kicker: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
  link?: { href: string; label: string; word: string };
};

export type PageContent = {
  href: string;
  eyebrow: string;
  title: string;
  intro: string;
  description: string;
  sections: readonly Section[];
  closing: string;
};

export const BIOGRAFIA: PageContent = {
  href: "/biografia",
  eyebrow: "Do começo até aqui",
  title: "Biografia",
  intro:
    "Estudante de Engenharia de Software, com a rotina na operação e o foco no back-end.",
  description:
    "Quem é Isaac Santana Muniz: apresentação, forma de trabalhar, formação e habilidades.",
  sections: [
    {
      title: "Quem sou",
      kicker: "Apresentação",
      paragraphs: [
        "Me chamo Isaac Santana Muniz, tenho 23 anos e curso Engenharia de Software. Atuo com foco em back-end, desenvolvendo APIs e serviços com atenção à modelagem de dados, à segurança e à manutenção.",
        "Minha trajetória junta dois mundos: a tecnologia e a operação. Trabalho em ambiente industrial como vigilante patrimonial, onde aprendi a seguir protocolo, registrar o que acontece e enxergar processo em tudo.",
      ],
    },
    {
      title: "Como trabalho",
      kicker: "Método",
      paragraphs: [
        "Gosto de entender o problema antes de escrever a primeira linha de código. Trabalho com regras de negócio, integrações e automações, buscando consistência, organização de código e entregas confiáveis.",
        "No dia a dia transformo rotina em dado: relatórios e indicadores em Excel e Power BI, registros padronizados e apresentações de resultado. É o mesmo raciocínio que levo para o software.",
      ],
    },
    {
      title: "Formação",
      kicker: "Estudos",
      list: [
        "Engenharia de Software — Uninter (cursando)",
        "Técnico em Segurança do Trabalho — Unicorp",
        "Bombeiro Civil — Garra",
        "Formação de Vigilante — E. Brasil",
        "Informática básica, média e avançada — Academia do Hardware",
        "Inglês intermediário, com leitura técnica",
      ],
    },
    {
      title: "Habilidades",
      kicker: "Ferramentas",
      list: [
        "Linguagens — JavaScript (ES6), TypeScript, Python, C++, VBA, HTML e CSS",
        "Web — React, Next.js, Node.js, Tailwind CSS, APIs REST e banco de dados",
        "Dados — Power BI, Excel e PowerPoint",
        "Plataformas — Git, Docker, Netlify e WordPress",
        "Design — InDesign e Canva",
      ],
    },
  ],
  closing: "Transformo regras, dados e processos em software confiável.",
};

export const TECNOLOGIA: PageContent = {
  href: "/experiencia-tecnologia",
  eyebrow: "Experiência na área de tecnologia",
  title: "Experiência Tecnologia",
  intro:
    "Eventos, comunidade e projetos próprios: onde a prática de tecnologia aconteceu até aqui.",
  description:
    "Experiências de Isaac Santana Muniz na área de tecnologia: AATEC, Madil Carreiras e projetos autorais.",
  sections: [
    {
      title: "AATEC",
      kicker: "Parceiro Administrativo · set – dez 2024 · Manaus (AM), remoto",
      paragraphs: [
        "Apoiei a execução de atividades e rotinas administrativas ligadas a eventos e iniciativas com foco em tecnologia, participando de discussões e workshops sobre tendências e avanços da área.",
        "Dei suporte à organização, à comunicação e ao acompanhamento de demandas, consolidei informações e elaborei materiais e relatórios em Excel e PowerPoint, em contato direto com participantes e profissionais de TI.",
      ],
    },
    {
      title: "Madil Carreiras",
      kicker: "Moderador · mai – nov 2024 · remoto",
      paragraphs: [
        "Conduzi a organização de uma comunidade voltada a carreira e TI: mediação de debates, suporte aos membros, orientação sobre boas práticas e cuidado para manter o ambiente produtivo.",
        "Apoiei a curadoria e o compartilhamento de conteúdos, alinhando os temas às tendências do mercado e incentivando a participação, com atenção à comunicação clara e à resolução de conflitos.",
      ],
    },
    {
      title: "Projetos autorais",
      kicker: "Prática · em andamento",
      paragraphs: [
        "Em paralelo, construo meus próprios projetos para fortalecer os fundamentos: este portfólio, o EPI Sentinel, o Painel Hacking e o Bloco de Afazeres.",
        "Cada um exercita uma parte do caminho, de APIs e banco de dados a interface, segurança e publicação.",
      ],
      link: { href: "/projetos", label: "Ver os projetos", word: "Projetos" },
    },
  ],
  closing: "Aprendo tecnologia construindo, um projeto de cada vez.",
};

export const OPERACIONAL: PageContent = {
  href: "/experiencia-operacional",
  eyebrow: "Experiência na área operacional",
  title: "Experiência Operacional",
  intro:
    "A rotina de segurança em ambiente industrial, onde disciplina e registro vêm antes de tudo.",
  description:
    "Experiência operacional de Isaac Santana Muniz: vigilância patrimonial, relatórios e indicadores e formação técnica.",
  sections: [
    {
      title: "G4S Vanguarda",
      kicker: "Vigilante Patrimonial · jan 2024 – presente · ambiente industrial, MG",
      paragraphs: [
        "Realizo o controle de acesso de pessoas e veículos, a conferência de credenciais e o registro de entradas e saídas, além de rondas preventivas e do atendimento e registro de ocorrências com comunicação via rádio, sempre seguindo os protocolos do ambiente industrial.",
        "Faço também o monitoramento ativo de CFTV em pontos críticos, para identificar desvios e acionar a resposta conforme o procedimento.",
      ],
    },
    {
      title: "Dados na operação",
      kicker: "Relatórios e indicadores",
      paragraphs: [
        "Com uma rotina orientada a dados, elaboro e atualizo relatórios operacionais e indicadores: Excel para organizar e padronizar registros e controles, Power BI para dashboards e acompanhamento de ocorrências, PowerPoint para apresentar resultados.",
        "É onde a operação encontra a análise: o que foi registrado no turno vira informação para melhorar o processo.",
      ],
    },
    {
      title: "Formação operacional",
      kicker: "Base técnica",
      list: [
        "Técnico em Segurança do Trabalho — Unicorp",
        "Bombeiro Civil — Garra",
        "Formação de Vigilante — E. Brasil",
        "Carteira de motorista — categoria B",
      ],
      paragraphs: [
        "Essa base fortaleceu disciplina operacional, comunicação e visão de processo, que hoje levo também para o desenvolvimento de software.",
      ],
    },
  ],
  closing: "Disciplina operacional, comunicação e visão de processo.",
};

export const CIBERSEGURANCA: PageContent = {
  href: "/ciberseguranca",
  eyebrow: "Uma área em estudo",
  title: "Cibersegurança",
  intro:
    "A área que mais me interessa aprofundar, tanto do lado da defesa quanto do lado do ataque.",
  description:
    "Cibersegurança na trajetória de Isaac Santana Muniz: interesse, estudos em andamento, o projeto Painel Hacking e segurança aplicada neste site.",
  sections: [
    {
      title: "Por que segurança",
      kicker: "Interesse",
      paragraphs: [
        "Tenho forte interesse em cibersegurança e pretendo aprofundar práticas de hardening, análise de vulnerabilidades e engenharia segura ao longo da minha trajetória.",
        "A rotina de segurança patrimonial me ensinou a pensar em controle de acesso, monitoramento e resposta a ocorrências. A lógica é parecida no mundo digital: saber quem entra, registrar o que acontece e agir conforme o procedimento.",
      ],
    },
    {
      title: "O que estou estudando",
      kicker: "Em estudo",
      list: [
        "Fundamentos de Blue Team, Red Team e testes de intrusão",
        "Automação de segurança",
        "Hardening e análise de vulnerabilidades",
        "Práticas de engenharia de software: testes, documentação e estrutura de projeto",
      ],
    },
    {
      title: "Painel Hacking",
      kicker: "Projeto",
      paragraphs: [
        "Para organizar os estudos, construí o Painel Hacking: um roteiro interativo de aprendizado em hacking ético e cibersegurança, com etapas recomendadas, biblioteca pesquisável e lista de favoritos.",
        "Os recursos vêm do Guia de Cyber Security, mantido publicamente por arthurspk. O projeto apenas os reorganiza em uma interface interativa, para fins educacionais.",
      ],
      link: { href: "/projetos/painel-hacking", label: "Ver o projeto", word: "Painel Hacking" },
    },
    {
      title: "Segurança na prática",
      kicker: "Neste site",
      paragraphs: [
        "O pedido de currículo deste portfólio foi pensado com segurança em primeiro lugar: verificação de e-mail por código de uso único, limite de tentativas por IP e por e-mail, proteção contra automação e aprovação manual.",
        "O documento fica em armazenamento privado e só é entregue por um link temporário, cujo token é guardado apenas como HMAC. A área administrativa usa senha com scrypt e sessão em cookie HttpOnly.",
      ],
      link: { href: "/curriculo", label: "Conhecer o fluxo", word: "Currículo" },
    },
  ],
  closing: "Saber quem entra, registrar o que acontece e responder com método.",
};

/** Reading order of the numbered pages, used for the "next" link at the end of each one. */
export const READING_ORDER = [
  { href: BIOGRAFIA.href, label: "Biografia", word: "Biografia" },
  { href: TECNOLOGIA.href, label: "Experiência Tecnologia", word: "Tecnologia" },
  { href: OPERACIONAL.href, label: "Experiência Operacional", word: "Operacional" },
  { href: "/projetos", label: "Projetos", word: "Projetos" },
  { href: CIBERSEGURANCA.href, label: "Cibersegurança", word: "Cibersegurança" },
] as const;

export function nextAfter(href: string) {
  const index = READING_ORDER.findIndex((item) => item.href === href);
  return READING_ORDER[(index + 1) % READING_ORDER.length];
}
