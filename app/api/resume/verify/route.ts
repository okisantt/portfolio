import { NextResponse } from "next/server";
import { verifyDigest } from "@/lib/server/crypto";
import { getDb } from "@/lib/server/db";
import { sendAdminNotification } from "@/lib/server/email";
import {
  consumeRateLimit,
  getIpDigest,
  hasValidOrigin,
  safeUserAgent,
} from "@/lib/server/security";
import { parseVerification, readSmallJson } from "@/lib/server/validation";

export const runtime = "nodejs";

type PendingRequest = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  otp_digest: string | null;
  otp_expires_at: Date | null;
  otp_attempts: number;
};

export async function POST(request: Request) {
  try {
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ error: "Não foi possível processar a solicitação." }, { status: 403 });
    }

    const parsed = parseVerification(await readSmallJson(request));
    if (!parsed) {
      return NextResponse.json({ error: "Código inválido ou expirado." }, { status: 400 });
    }

    const ipDigest = getIpDigest(request);
    const [ipAllowed, requestAllowed] = await Promise.all([
      consumeRateLimit(`resume-verify:ip:${ipDigest}`, 12, 60 * 60),
      consumeRateLimit(`resume-verify:request:${parsed.requestId}`, 6, 15 * 60),
    ]);
    if (!ipAllowed || !requestAllowed) {
      return NextResponse.json({ error: "Muitas tentativas. Aguarde e tente novamente." }, { status: 429 });
    }

    const sql = getDb();
    const rows = await sql<PendingRequest[]>`
      select id, first_name, last_name, email, status, otp_digest, otp_expires_at, otp_attempts
      from resume_requests
      where public_id = ${parsed.requestId}
      limit 1
    `;
    const pending = rows[0];
    const expired = !pending?.otp_expires_at || pending.otp_expires_at.getTime() < Date.now();
    const unavailable =
      !pending ||
      pending.status !== "pending_verification" ||
      pending.otp_attempts >= 5 ||
      expired ||
      !pending.otp_digest;

    if (unavailable) {
      if (pending?.id && pending.status === "pending_verification") {
        await sql`
          update resume_requests
          set status = 'expired', otp_digest = null, updated_at = now()
          where id = ${pending.id}
        `;
      }
      return NextResponse.json({ error: "Código inválido ou expirado." }, { status: 400 });
    }

    const otpDigest = pending.otp_digest;
    if (!otpDigest) {
      return NextResponse.json({ error: "Código inválido ou expirado." }, { status: 400 });
    }
    const matches = verifyDigest(
      `${parsed.requestId}:${parsed.code}`,
      otpDigest,
      "OTP_SECRET",
    );
    if (!matches) {
      await sql`
        update resume_requests set
          otp_attempts = least(otp_attempts + 1, 5),
          status = case when otp_attempts + 1 >= 5 then 'expired'::resume_request_status else status end,
          otp_digest = case when otp_attempts + 1 >= 5 then null else otp_digest end,
          updated_at = now()
        where id = ${pending.id}
      `;
      await sql`
        insert into resume_security_events (request_id, event_type, ip_digest, user_agent)
        values (${pending.id}, 'otp_failed', ${ipDigest}, ${safeUserAgent(request)})
      `;
      return NextResponse.json({ error: "Código inválido ou expirado." }, { status: 400 });
    }

    await sql`
      update resume_requests set
        status = 'pending_approval',
        email_verified_at = now(),
        otp_digest = null,
        otp_expires_at = null,
        updated_at = now()
      where id = ${pending.id}
    `;
    await sql`
      insert into resume_security_events (request_id, event_type, ip_digest, user_agent)
      values (${pending.id}, 'email_verified', ${ipDigest}, ${safeUserAgent(request)})
    `;

    try {
      await sendAdminNotification(pending.first_name, pending.last_name, pending.email);
    } catch (error) {
      console.error("admin notification failed", error instanceof Error ? error.message : "unknown");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("resume verification failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Serviço temporariamente indisponível. Tente novamente mais tarde." },
      { status: 503 },
    );
  }
}
