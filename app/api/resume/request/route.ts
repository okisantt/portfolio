import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createOtp, hmac } from "@/lib/server/crypto";
import { getDb } from "@/lib/server/db";
import { sendVerificationEmail } from "@/lib/server/email";
import {
  consumeRateLimit,
  getIpDigest,
  hasValidOrigin,
  safeUserAgent,
  verifyTurnstile,
} from "@/lib/server/security";
import { parseResumeRequest, readSmallJson } from "@/lib/server/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ error: "Não foi possível processar a solicitação." }, { status: 403 });
    }

    const raw = await readSmallJson(request);
    const parsed = parseResumeRequest(raw);
    if (!parsed) {
      return NextResponse.json({ error: "Confira os dados informados." }, { status: 400 });
    }

    if (parsed.website) {
      return NextResponse.json({ requestId: randomUUID() }, { status: 202 });
    }

    const turnstileToken = (raw as Record<string, unknown>).turnstileToken;
    if (!(await verifyTurnstile(turnstileToken, request))) {
      return NextResponse.json({ error: "Não foi possível validar a solicitação." }, { status: 400 });
    }

    const ipDigest = getIpDigest(request);
    const [ipAllowed, emailAllowed] = await Promise.all([
      consumeRateLimit(`resume-request:ip:${ipDigest}`, 5, 60 * 60),
      consumeRateLimit(`resume-request:email:${parsed.email}`, 3, 60 * 60),
    ]);
    if (!ipAllowed || !emailAllowed) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde antes de tentar novamente." },
        { status: 429 },
      );
    }

    const sql = getDb();
    const publicId = randomUUID();
    const otp = createOtp();
    const otpDigest = hmac(`${publicId}:${otp}`, "OTP_SECRET");
    const rows = await sql<{ id: string }[]>`
      insert into resume_requests (
        public_id, first_name, last_name, email, email_normalized,
        otp_digest, otp_expires_at, otp_sent_at
      ) values (
        ${publicId}, ${parsed.firstName}, ${parsed.lastName}, ${parsed.email}, ${parsed.email},
        ${otpDigest}, now() + interval '10 minutes', now()
      )
      returning id
    `;

    const requestRecordId = rows[0].id;
    await sql`
      insert into resume_security_events (request_id, event_type, ip_digest, user_agent)
      values (${requestRecordId}, 'request_created', ${ipDigest}, ${safeUserAgent(request)})
    `;

    try {
      await sendVerificationEmail(parsed.email, parsed.firstName, otp);
    } catch (error) {
      await sql`delete from resume_requests where id = ${requestRecordId}`;
      throw error;
    }

    return NextResponse.json({ requestId: publicId }, { status: 201 });
  } catch (error) {
    console.error("resume request failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Serviço temporariamente indisponível. Tente novamente mais tarde." },
      { status: 503 },
    );
  }
}
