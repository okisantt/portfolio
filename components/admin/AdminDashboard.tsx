"use client";

import { useState } from "react";
import { Check, LoaderCircle, LogOut, Trash2, X } from "lucide-react";

export type AdminRequest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
  emailVerifiedAt: string | null;
  reviewedAt: string | null;
};

const statusLabels: Record<string, string> = {
  pending_verification: "Aguardando e-mail",
  pending_approval: "Aguardando análise",
  approved: "Aprovada",
  rejected: "Recusada",
  expired: "Expirada",
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

export default function AdminDashboard({ initialRequests }: { initialRequests: AdminRequest[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function updateRequest(id: string, action: "approve" | "reject") {
    setWorkingId(id);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
        emailSent?: boolean;
      };
      if (!response.ok) {
        setMessage(body.error ?? "Não foi possível concluir.");
        return;
      }
      setRequests((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status: action === "approve" ? "approved" : "rejected",
                reviewedAt: new Date().toISOString(),
              }
            : item,
        ),
      );
      setMessage(
        body.message ??
          (action === "approve" ? "Solicitação aprovada e link enviado." : "Solicitação recusada."),
      );
    } catch {
      setMessage("Não foi possível concluir.");
    } finally {
      setWorkingId(null);
    }
  }

  async function deleteRequest(id: string) {
    if (!window.confirm("Excluir permanentemente esta solicitação e seus registros?")) return;
    setWorkingId(id);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/requests/${id}`, { method: "DELETE" });
      if (!response.ok) {
        setMessage("Não foi possível excluir.");
        return;
      }
      setRequests((current) => current.filter((item) => item.id !== id));
      setMessage("Solicitação e dados associados excluídos.");
    } catch {
      setMessage("Não foi possível excluir.");
    } finally {
      setWorkingId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Painel protegido</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-text sm:text-4xl">
            Solicitações de currículo
          </h1>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 px-5 text-xs text-muted hover:text-text"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sair
        </button>
      </div>

      <p className="mt-5 min-h-6 text-sm text-accent" role="status" aria-live="polite">{message}</p>

      {requests.length === 0 ? (
        <div className="surface mt-6 rounded-2xl p-7 text-sm text-muted">Nenhuma solicitação encontrada.</div>
      ) : (
        <div className="mt-6 space-y-4">
          {requests.map((item) => {
            const working = workingId === item.id;
            const canReview = item.status === "pending_approval";
            return (
              <article key={item.id} className="surface rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-semibold text-text">{item.firstName} {item.lastName}</h2>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-accent">
                        {statusLabels[item.status] ?? item.status}
                      </span>
                    </div>
                    <p className="mt-2 break-all text-sm text-muted">{item.email}</p>
                    <dl className="mt-5 grid gap-3 text-xs text-muted sm:grid-cols-3">
                      <div><dt className="text-text/50">Solicitada</dt><dd className="mt-1">{formatDate(item.createdAt)}</dd></div>
                      <div><dt className="text-text/50">E-mail verificado</dt><dd className="mt-1">{formatDate(item.emailVerifiedAt)}</dd></div>
                      <div><dt className="text-text/50">Analisada</dt><dd className="mt-1">{formatDate(item.reviewedAt)}</dd></div>
                    </dl>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {(canReview || item.status === "approved") && (
                      <button
                        type="button"
                        disabled={working}
                        onClick={() => updateRequest(item.id, "approve")}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-text px-4 text-xs font-semibold text-wine disabled:opacity-50"
                      >
                        {working ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        {item.status === "approved" ? "Reemitir link" : "Aprovar"}
                      </button>
                    )}
                    {canReview && (
                      <button
                        type="button"
                        disabled={working}
                        onClick={() => updateRequest(item.id, "reject")}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-xs text-text disabled:opacity-50"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                        Recusar
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={working}
                      onClick={() => deleteRequest(item.id)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-rose-300/15 px-4 text-xs text-rose-200 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Excluir dados
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
