import "server-only";
import { getDb } from "./db";
import { hmac } from "./crypto";
import { optionalEnv } from "./env";

export function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export function getIpDigest(request: Request) {
  return hmac(getClientIp(request), "RATE_LIMIT_SECRET");
}

export function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";

  const allowed = new Set([new URL(request.url).origin]);
  const configuredSite = optionalEnv("NEXT_PUBLIC_SITE_URL");
  if (configuredSite) allowed.add(new URL(configuredSite).origin);
  return allowed.has(origin);
}

export async function consumeRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
) {
  const sql = getDb();
  const keyDigest = hmac(key, "RATE_LIMIT_SECRET");
  const rows = await sql<{ hits: number }[]>`
    insert into resume_rate_limits (key_digest, window_started_at, hits)
    values (${keyDigest}, now(), 1)
    on conflict (key_digest) do update set
      hits = case
        when resume_rate_limits.window_started_at < now() - (${windowSeconds} * interval '1 second') then 1
        else resume_rate_limits.hits + 1
      end,
      window_started_at = case
        when resume_rate_limits.window_started_at < now() - (${windowSeconds} * interval '1 second') then now()
        else resume_rate_limits.window_started_at
      end
    returning hits
  `;
  return Number(rows[0]?.hits ?? limit + 1) <= limit;
}

export async function verifyTurnstile(token: unknown, request: Request) {
  const secret = optionalEnv("TURNSTILE_SECRET_KEY");
  if (!secret) return process.env.NODE_ENV !== "production";
  if (typeof token !== "string" || !token) return false;

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: getClientIp(request),
      }),
      cache: "no-store",
    },
  );
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export function safeUserAgent(request: Request) {
  return (request.headers.get("user-agent") ?? "unknown").slice(0, 300);
}
