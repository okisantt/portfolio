import type { Metadata } from "next";
import AdminDashboard, { type AdminRequest } from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import { isAdminAuthenticated } from "@/lib/server/auth";
import { getDb } from "@/lib/server/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Solicitações de currículo",
  robots: { index: false, follow: false, nocache: true },
};

type RequestRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  created_at: Date;
  email_verified_at: Date | null;
  reviewed_at: Date | null;
};

export default async function AdminRequestsPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return (
      <main id="conteudo" className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-md items-center px-5 py-32 sm:px-8">
        <AdminLogin />
      </main>
    );
  }

  let requests: AdminRequest[] = [];
  let configurationError = false;
  try {
    const sql = getDb();
    const rows = await sql<RequestRow[]>`
      select id, first_name, last_name, email, status,
             created_at, email_verified_at, reviewed_at
      from resume_requests
      order by created_at desc
      limit 200
    `;
    requests = rows.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      status: row.status,
      createdAt: row.created_at.toISOString(),
      emailVerifiedAt: row.email_verified_at?.toISOString() ?? null,
      reviewedAt: row.reviewed_at?.toISOString() ?? null,
    }));
  } catch (error) {
    configurationError = true;
    console.error("admin dashboard query failed", error instanceof Error ? error.message : "unknown");
  }

  return (
    <main id="conteudo" className="mx-auto min-h-[calc(100svh-5rem)] w-full max-w-6xl px-5 pb-20 pt-32 sm:px-8">
      {configurationError ? (
        <div className="surface rounded-2xl p-6 text-sm leading-6 text-rose-200">
          O banco de dados ainda não foi configurado ou a migração não foi aplicada.
        </div>
      ) : (
        <AdminDashboard initialRequests={requests} />
      )}
    </main>
  );
}
