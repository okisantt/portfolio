import { NextResponse } from "next/server";
import { hmac } from "@/lib/server/crypto";
import { getDb } from "@/lib/server/db";
import { consumeRateLimit, getIpDigest, safeUserAgent } from "@/lib/server/security";
import { fetchPrivateResume } from "@/lib/server/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const token = new URL(request.url).searchParams.get("token") ?? "";
    if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
      return new NextResponse("Acesso indisponível.", { status: 404 });
    }

    const ipDigest = getIpDigest(request);
    if (!(await consumeRateLimit(`resume-access:ip:${ipDigest}`, 15, 60 * 60))) {
      return new NextResponse("Acesso temporariamente indisponível.", { status: 429 });
    }

    const sql = getDb();
    const tokenDigest = hmac(token, "ACCESS_TOKEN_SECRET");
    const rows = await sql<{ request_id: string }[]>`
      update resume_access_tokens as access_token
      set use_count = access_token.use_count + 1
      from resume_requests as resume_request
      where access_token.request_id = resume_request.id
        and access_token.token_digest = ${tokenDigest}
        and access_token.revoked_at is null
        and access_token.expires_at > now()
        and access_token.use_count < access_token.max_uses
        and resume_request.status = 'approved'
      returning access_token.request_id
    `;
    const requestId = rows[0]?.request_id;
    if (!requestId) return new NextResponse("Acesso indisponível.", { status: 404 });

    const storageResponse = await fetchPrivateResume();
    if (!storageResponse.ok || !storageResponse.body) {
      await sql`
        update resume_access_tokens
        set use_count = greatest(use_count - 1, 0)
        where request_id = ${requestId}
      `;
      throw new Error(`private storage returned ${storageResponse.status}`);
    }

    await sql`
      insert into resume_security_events (request_id, event_type, ip_digest, user_agent)
      values (${requestId}, 'document_accessed', ${ipDigest}, ${safeUserAgent(request)})
    `;

    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="curriculo-isaac-santana-muniz.pdf"',
      "Cache-Control": "private, no-store, max-age=0",
      Pragma: "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    const contentLength = storageResponse.headers.get("content-length");
    if (contentLength) headers.set("Content-Length", contentLength);

    return new NextResponse(storageResponse.body, { status: 200, headers });
  } catch (error) {
    console.error("resume access failed", error instanceof Error ? error.message : "unknown");
    return new NextResponse("Acesso temporariamente indisponível.", { status: 503 });
  }
}
