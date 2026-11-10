"use client";

import Link from "next/link";
import Script from "next/script";
import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

type Stage = "request" | "verify" | "pending";

async function responseMessage(response: Response) {
  try {
    const body = (await response.json()) as { error?: string; requestId?: string };
    return body;
  } catch {
    return { error: "Não foi possível concluir. Tente novamente." };
  }
}

export default function ResumeRequestForm({
  turnstileSiteKey,
  turnstileRequired,
}: {
  turnstileSiteKey?: string;
  turnstileRequired: boolean;
}) {
  const [stage, setStage] = useState<Stage>("request");
  const [requestId, setRequestId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/resume/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.get("firstName"),
          lastName: form.get("lastName"),
          email: form.get("email"),
          website: form.get("website"),
          acceptedPrivacy: form.get("acceptedPrivacy") === "on",
          turnstileToken: form.get("cf-turnstile-response"),
        }),
      });
      const body = await responseMessage(response);
      if (!response.ok || !body.requestId) {
        setMessage(body.error ?? "Não foi possível enviar a solicitação.");
        window.turnstile?.reset();
        return;
      }
      setRequestId(body.requestId);
      setStage("verify");
    } catch {
      setMessage("Não foi possível conectar ao serviço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/resume/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, code: form.get("code") }),
      });
      const body = await responseMessage(response);
      if (!response.ok) {
        setMessage(body.error ?? "Código inválido ou expirado.");
        return;
      }
      setStage("pending");
    } catch {
      setMessage("Não foi possível conectar ao serviço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (stage === "pending") {
    return (
      <div className="surface rounded-3xl p-6 sm:p-9" role="status">
        <CheckCircle2 className="h-9 w-9 text-accent" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-text">
          E-mail confirmado.
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted">
          Sua solicitação aguarda análise manual. A confirmação do e-mail não
          libera o documento automaticamente. Se o acesso for aprovado, você
          receberá um link individual e temporário no e-mail informado.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center rounded-full border border-white/10 px-5 text-sm font-semibold text-text hover:border-accent/35"
        >
          Voltar ao portfólio
        </Link>
      </div>
    );
  }

  return (
    <>
      {turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      )}

      <div className="surface rounded-3xl p-6 sm:p-9">
        {stage === "request" ? (
          <form onSubmit={submitRequest} noValidate>
            <div className="flex items-start gap-3 border-b border-white/[0.07] pb-6">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-xs leading-5 text-muted">
                Os dados são usados somente para verificar o e-mail e controlar
                o acesso ao documento. Solicitações antigas são excluídas em até
                90 dias.
              </p>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm text-text">
                Nome
                <input
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  minLength={1}
                  maxLength={60}
                  className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-bg/60 px-4 text-base text-text placeholder:text-muted/50"
                />
              </label>
              <label className="block text-sm text-text">
                Sobrenome
                <input
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  minLength={1}
                  maxLength={60}
                  className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-bg/60 px-4 text-base text-text"
                />
              </label>
            </div>

            <label className="mt-5 block text-sm text-text">
              E-mail profissional ou pessoal
              <input
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                maxLength={254}
                className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-bg/60 px-4 text-base text-text"
              />
            </label>

            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label>
                Site
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-5 text-muted">
              <input
                name="acceptedPrivacy"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--accent))]"
              />
              <span>
                Li a explicação acima e a política de privacidade.
              </span>
            </label>
            <Link href="/privacidade" className="mt-2 inline-block text-xs text-accent underline underline-offset-2">
              Ler política de privacidade
            </Link>

            {turnstileSiteKey ? (
              <div
                className="cf-turnstile mt-6"
                data-sitekey={turnstileSiteKey}
                data-theme="dark"
                data-size="flexible"
              />
            ) : turnstileRequired ? (
              <p className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs text-amber-100">
                O formulário está temporariamente indisponível porque a proteção
                contra automação ainda não foi configurada.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading || (turnstileRequired && !turnstileSiteKey)}
              className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-text px-6 text-sm font-semibold text-wine transition-opacity disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
            >
              {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Enviar código de verificação
            </button>
          </form>
        ) : (
          <form onSubmit={submitCode}>
            <p className="eyebrow">Verificação de e-mail</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-text">
              Digite o código recebido
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              O código possui seis dígitos, expira em 10 minutos e aceita no
              máximo cinco tentativas. Verifique também a caixa de spam.
            </p>
            <label className="mt-7 block text-sm text-text">
              Código de verificação
              <input
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                autoFocus
                className="mt-2 min-h-14 w-full rounded-xl border border-white/10 bg-bg/60 px-4 text-center font-mono text-2xl tracking-[0.35em] text-text sm:max-w-xs"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-text px-6 text-sm font-semibold text-wine disabled:opacity-50 sm:w-auto"
            >
              {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Confirmar e-mail
            </button>
          </form>
        )}

        <p className="mt-5 min-h-5 text-sm text-rose-300" role="alert" aria-live="polite">
          {message}
        </p>
      </div>
    </>
  );
}
