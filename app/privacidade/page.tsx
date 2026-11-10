import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidade",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main id="conteudo" className="mx-auto min-h-[calc(100svh-5rem)] w-full max-w-3xl px-5 pb-20 pt-32 sm:px-8">
      <p className="eyebrow">Privacidade e currículo</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-text sm:text-5xl">
        Seus dados, sem excessos.
      </h1>
      <div className="mt-10 space-y-7 text-sm leading-7 text-muted sm:text-base">
        <p>
          Nome, sobrenome e e-mail são solicitados somente para verificar sua
          identidade, permitir a análise manual do pedido e controlar o acesso
          temporário ao currículo profissional.
        </p>
        <p>
          Os dados não são vendidos nem usados para marketing. Solicitações
          recusadas, expiradas ou sem atividade são removidas em até 90 dias.
          Registros técnicos mínimos são mantidos pelo mesmo período para
          prevenir abuso e investigar tentativas indevidas.
        </p>
        <p>
          O processamento usa fornecedores de infraestrutura e e-mail
          configurados pelo responsável pelo site. Você pode solicitar correção
          ou exclusão dos seus dados pelo LinkedIn informado no portfólio.
        </p>
      </div>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 items-center rounded-full border border-white/10 px-5 text-sm font-semibold text-text transition-colors hover:border-accent/35"
      >
        Voltar ao portfólio
      </Link>
    </main>
  );
}
