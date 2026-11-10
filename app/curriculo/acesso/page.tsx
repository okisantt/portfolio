import type { Metadata } from "next";
import Link from "next/link";
import { FileLock2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Acesso temporário",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function ResumeAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const validShape = /^[A-Za-z0-9_-]{43}$/.test(token);

  return (
    <main id="conteudo" className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-xl items-center px-5 py-32 sm:px-8">
      <div className="surface w-full rounded-3xl p-7 text-center sm:p-10">
        <FileLock2 className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-text">
          Acesso temporário
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Este link é individual, expira em 24 horas e possui uso limitado. O
          endereço real do arquivo não é exposto ao navegador.
        </p>
        {validShape ? (
          <a
            href={`/api/resume/access?token=${encodeURIComponent(token)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-text px-6 text-sm font-semibold text-wine"
          >
            Abrir currículo
          </a>
        ) : (
          <p className="mt-7 rounded-xl border border-white/10 p-4 text-sm text-rose-300">
            Link inválido ou incompleto.
          </p>
        )}
        <Link href="/" className="mt-6 block text-xs text-muted underline underline-offset-4">
          Voltar ao portfólio
        </Link>
      </div>
    </main>
  );
}
