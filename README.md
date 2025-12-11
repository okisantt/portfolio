# Portfolio Minimal Premium (Dark-only)

Portfólio autoral com estética minimalista de alto padrão, microinterações contidas e experiência mobile dedicada.

## O que mudou nesta versão
- **Desktop**: a coluna da esquerda agora é **fixa de verdade** (não sticky),
  eliminando o “salto” no fim da rolagem.
- **Centralização refinada** do conteúdo da esquerda (texto continua alinhado à esquerda,
  mas o bloco ganha mais equilíbrio visual dentro da coluna).
- **Fonte display exclusiva** aplicada somente ao título do herói no desktop.
- **Mobile**: fluxo preservado.

## Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS com design tokens via CSS variables
- Framer Motion
- next/font (Google)

## Requisitos
- Node 18+ (recomendado 20+)

## Instalação
```bash
npm install
npm run dev
```

## Build / Produção
```bash
npm run build
npm run start
```

## Personalização rápida
Edite:
- `lib/data.ts` (projetos, skills, timeline, links)
- `app/layout.tsx` (metadata, domínio)
- `app/globals.css` (tokens)
- Substitua o PDF em `public/cv-isaac-santana-muniz.pdf` pelo seu currículo final.

## SEO
Inclui:
- Metadata completa
- Open Graph / Twitter
- `sitemap.ts`
- `robots.ts`

## Observações de design
Este layout é inspirado apenas em princípios de minimalismo premium e navegação precisa.
Nenhum texto, ícone, imagem, estrutura ou código de terceiros foi reproduzido.
