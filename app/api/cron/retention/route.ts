import { NextResponse } from "next/server";
import { getDb } from "@/lib/server/db";
import { requiredEnv } from "@/lib/server/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  if (authorization !== `Bearer ${requiredEnv("CRON_SECRET")}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const sql = getDb();
    const deleted = await sql<{ id: string }[]>`
      delete from resume_requests
      where retention_until < now()
      returning id
    `;
    await sql`
      delete from resume_rate_limits
      where window_started_at < now() - interval '48 hours'
    `;
    return NextResponse.json({ ok: true, deletedRequests: deleted.length });
  } catch (error) {
    console.error("retention cleanup failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Falha na limpeza." }, { status: 503 });
  }
}
