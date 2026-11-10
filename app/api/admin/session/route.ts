import { NextResponse } from "next/server";
import {
  clearAdminSession,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/server/auth";
import { consumeRateLimit, getIpDigest, hasValidOrigin } from "@/lib/server/security";
import { parseAdminPassword, readSmallJson } from "@/lib/server/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ error: "Não foi possível autenticar." }, { status: 403 });
    }

    const ipDigest = getIpDigest(request);
    if (!(await consumeRateLimit(`admin-login:${ipDigest}`, 5, 15 * 60))) {
      return NextResponse.json({ error: "Não foi possível autenticar." }, { status: 429 });
    }

    const password = parseAdminPassword(await readSmallJson(request));
    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin login failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Não foi possível autenticar." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  if (!hasValidOrigin(request)) {
    return NextResponse.json({ error: "Operação não permitida." }, { status: 403 });
  }
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
