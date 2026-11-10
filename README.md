# Portfólio — Isaac Santana Muniz

Portfólio em Next.js com apresentação responsiva, navegação acessível e um fluxo
server-side para solicitar acesso ao currículo profissional.

## Stack

- Next.js 16 (App Router), React 19 e TypeScript
- Tailwind CSS e Framer Motion com `prefers-reduced-motion`
- PostgreSQL para solicitações, rate limiting e auditoria
- Supabase Storage em bucket privado para o PDF
- Resend para códigos e notificações por e-mail
- Cloudflare Turnstile contra automações

## Desenvolvimento local

Requer Node.js 20.9 ou superior.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Sem variáveis de back-end, a home funciona normalmente. Em desenvolvimento, o
Turnstile pode ficar sem configuração, mas os endpoints de currículo ainda
exigem banco e e-mail. Em produção, a ausência das chaves do Turnstile bloqueia
o formulário de maneira segura.

## Configurar o acesso privado ao currículo

1. Crie um projeto no Supabase e execute `db/migrations/001_resume_access.sql`
   no SQL Editor.
2. Crie um bucket **privado** (não público), por exemplo `private-resume`.
3. Envie manualmente o PDF para esse bucket. Não coloque o documento em
   `public/`, no repositório ou no bundle.
4. Crie uma chave do Cloudflare Turnstile para o domínio.
5. Verifique o domínio remetente no Resend.
6. Copie `.env.example` para `.env.local` e preencha todos os valores.
7. Gere quatro segredos independentes com pelo menos 32 bytes aleatórios para
   `OTP_SECRET`, `ACCESS_TOKEN_SECRET`, `RATE_LIMIT_SECRET` e `SESSION_SECRET`.
8. Gere o hash da senha administrativa:

```bash
npm run security:hash-password -- "uma-senha-longa-e-unica"
```

Use a saída em `ADMIN_PASSWORD_HASH`. A senha em texto puro nunca deve ser salva
em arquivo de ambiente, banco ou repositório.

## Fluxo de segurança

1. O visitante envia nome, sobrenome, e-mail, consentimento e desafio Turnstile.
2. O servidor valida, limita solicitações por IP/e-mail e envia OTP de seis
   dígitos, válido por 10 minutos e até cinco tentativas.
3. A confirmação muda o pedido apenas para `pending_approval`.
4. A área `/admin/solicitacoes` exige senha com scrypt e sessão assinada em
   cookie `HttpOnly`, `SameSite=Strict` e `Secure` em produção.
5. A aprovação emite token aleatório armazenado somente como HMAC, com validade
   de 24 horas e três usos. O link aponta para este site, nunca para o storage.
6. O endpoint autorizado busca o PDF com credencial server-side e faz streaming
   com `Cache-Control: no-store`.
7. O administrador pode recusar ou excluir cada pedido. A rota de retenção
   remove automaticamente dados vencidos após 90 dias.

Para automatizar a retenção, agende `POST /api/cron/retention` diariamente com:

```text
Authorization: Bearer <CRON_SECRET>
```

## Custos e limitações

O fluxo pode começar nos planos gratuitos: Supabase (500 MB de banco e 1 GB de
storage), Resend (3.000 e-mails/mês, até 100/dia) e Turnstile. Projetos gratuitos
do Supabase podem pausar após uma semana sem atividade. O Resend exige domínio
verificado para entrega em produção. O código não provisiona essas contas nem
faz upload do PDF, pois ambos exigem credenciais do proprietário.

## Verificação

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```
