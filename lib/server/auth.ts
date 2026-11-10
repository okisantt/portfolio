import "server-only";
import { cookies } from "next/headers";
import { hmac, verifyDigest, verifyScryptPassword } from "./crypto";
import { requiredEnv } from "./env";

export const ADMIN_COOKIE = "portfolio_admin";
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

function signPayload(payload: string) {
  return hmac(payload, "SESSION_SECRET");
}

function createSessionValue() {
  const payload = Buffer.from(
    JSON.stringify({ expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000 }),
  ).toString("base64url");
  return `${payload}.${signPayload(payload)}`;
}

function isValidSession(value: string | undefined) {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature || !verifyDigest(payload, signature, "SESSION_SECRET")) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      expiresAt?: number;
    };
    return typeof parsed.expiresAt === "number" && parsed.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  try {
    const cookieStore = await cookies();
    return isValidSession(cookieStore.get(ADMIN_COOKIE)?.value);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string) {
  return verifyScryptPassword(password, requiredEnv("ADMIN_PASSWORD_HASH"));
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
