"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: form.get("password") }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Não foi possível autenticar.");
        return;
      }
      window.location.reload();
    } catch {
      setError("Não foi possível autenticar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="surface rounded-3xl p-7 sm:p-9">
      <LockKeyhole className="h-8 w-8 text-accent" aria-hidden="true" />
      <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-text">Área administrativa</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Acesso restrito ao responsável pelo portfólio.
      </p>
      <form onSubmit={submit} className="mt-7">
        <label className="block text-sm text-text">
          Senha administrativa
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-bg/60 px-4 text-base text-text"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-text px-6 text-sm font-semibold text-wine disabled:opacity-50"
        >
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Entrar
        </button>
        <p className="mt-4 min-h-5 text-sm text-rose-300" role="alert">{error}</p>
      </form>
    </div>
  );
}
