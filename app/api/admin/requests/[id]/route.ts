import { NextResponse } from "next/server";
import { SITE } from "@/lib/data";
import { isAdminAuthenticated } from "@/lib/server/auth";
import { createAccessToken, hmac } from "@/lib/server/crypto";
import { getDb } from "@/lib/server/db";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/server/email";
import { getIpDigest, hasValidOrigin, safeUserAgent } from "@/lib/server/security";
import { readSmallJson } from "@/lib/server/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };
type RequestOwner = { id: string; first_name: string; email: string; status: string };

function validId(id: string) {
  return /^[0-9a-f-]{36}$/i.test(id);
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ error: "Operação não permitida." }, { status: 403 });
    }

    const { id } = await context.params;
    const body = (await readSmallJson(request)) as Record<string, unknown>;
    const action = body.action;
    if (!validId(id) || (action !== "approve" && action !== "reject")) {
      return NextResponse.json({ error: "Solicitação inválida." }, { status: 400 });
    }

    const sql = getDb();
    const rows = await sql<RequestOwner[]>`
      select id, first_name, email, status
      from resume_requests
      where id = ${id}
      limit 1
    `;
    const owner = rows[0];
    if (!owner || !["pending_approval", "approved"].includes(owner.status)) {
      return NextResponse.json({ error: "Solicitação indisponível." }, { status: 409 });
    }

    const ipDigest = getIpDigest(request);
    const userAgent = safeUserAgent(request);
    if (action === "approve") {
      const token = createAccessToken();
      const tokenDigest = hmac(token, "ACCESS_TOKEN_SECRET");

      await sql.begin(async (transaction) => {
        await transaction`
          update resume_requests set
            status = 'approved', reviewed_at = now(), updated_at = now()
          where id = ${id}
        `;
        await transaction`
          insert into resume_access_tokens (
            request_id, token_digest, expires_at, max_uses, use_count, revoked_at
          ) values (
            ${id}, ${tokenDigest}, now() + interval '24 hours', 3, 0, null
          )
          on conflict (request_id) do update set
            token_digest = excluded.token_digest,
            expires_at = excluded.expires_at,
            max_uses = excluded.max_uses,
            use_count = 0,
            revoked_at = null,
            created_at = now()
        `;
        await transaction`
          insert into resume_security_events (request_id, event_type, ip_digest, user_agent)
          values (${id}, 'request_approved', ${ipDigest}, ${userAgent})
        `;
      });

      const accessUrl = `${SITE.url}/curriculo/acesso?token=${encodeURIComponent(token)}`;
      try {
        await sendApprovalEmail(owner.email, owner.first_name, accessUrl);
        return NextResponse.json({ ok: true, emailSent: true });
      } catch (error) {
        console.error("approval email failed", error instanceof Error ? error.message : "unknown");
        return NextResponse.json({
          ok: true,
          emailSent: false,
          message: "Aprovado, mas o e-mail falhou. Use Aprovar novamente para emitir outro link.",
        });
      }
    }

    await sql.begin(async (transaction) => {
      await transaction`
        update resume_requests set
          status = 'rejected', reviewed_at = now(), updated_at = now()
        where id = ${id}
      `;
      await transaction`
        update resume_access_tokens set revoked_at = now() where request_id = ${id}
      `;
      await transaction`
        insert into resume_security_events (request_id, event_type, ip_digest, user_agent)
        values (${id}, 'request_rejected', ${ipDigest}, ${userAgent})
      `;
    });

    let emailSent = true;
    try {
      await sendRejectionEmail(owner.email, owner.first_name);
    } catch (error) {
      emailSent = false;
      console.error("rejection email failed", error instanceof Error ? error.message : "unknown");
    }
    return NextResponse.json({ ok: true, emailSent });
  } catch (error) {
    console.error("admin request action failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Não foi possível concluir a operação." }, { status: 503 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ error: "Operação não permitida." }, { status: 403 });
    }

    const { id } = await context.params;
    if (!validId(id)) {
      return NextResponse.json({ error: "Solicitação inválida." }, { status: 400 });
    }

    const sql = getDb();
    await sql`delete from resume_requests where id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin request delete failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Não foi possível excluir." }, { status: 503 });
  }
}
