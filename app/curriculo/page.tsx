import type { Metadata } from "next";
import ResumeRequestForm from "@/components/resume/ResumeRequestForm";

export const metadata: Metadata = {
  title: "Solicitar currículo",
  description: "Solicitação segura de acesso ao currículo profissional de Isaac Santana Muniz.",
  robots: { index: false, follow: false },
};

export default function ResumeRequestPage() {
  return (
    <main id="conteudo" className="mx-auto min-h-[calc(100svh-5rem)] w-full max-w-3xl px-5 pb-20 pt-32 sm:px-8">
      <p className="eyebrow">Currículo profissional</p>
      <h1 className="mt-4 max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-[-0.05em] text-text sm:text-5xl">
        Solicite acesso ao documento.
      </h1>
      <p className="mb-9 mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
        O processo confirma a propriedade do e-mail e envia a solicitação para
        aprovação manual. Nenhum código libera o PDF automaticamente.
      </p>
      <ResumeRequestForm
        turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        turnstileRequired={process.env.NODE_ENV === "production"}
      />
    </main>
  );
}
