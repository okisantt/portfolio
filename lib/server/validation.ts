import "server-only";

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' -]{0,59}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function parseResumeRequest(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const body = input as Record<string, unknown>;
  const firstName = cleanText(body.firstName, 60);
  const lastName = cleanText(body.lastName, 60);
  const email = cleanText(body.email, 254).toLowerCase();
  const website = cleanText(body.website, 200);
  const acceptedPrivacy = body.acceptedPrivacy === true;

  if (
    !NAME_PATTERN.test(firstName) ||
    !NAME_PATTERN.test(lastName) ||
    !EMAIL_PATTERN.test(email) ||
    !acceptedPrivacy
  ) {
    return null;
  }

  return { firstName, lastName, email, website };
}

export function parseVerification(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const body = input as Record<string, unknown>;
  const requestId = cleanText(body.requestId, 64);
  const code = cleanText(body.code, 6);
  if (!/^[0-9a-f-]{36}$/i.test(requestId) || !/^\d{6}$/.test(code)) return null;
  return { requestId, code };
}

export function parseAdminPassword(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const password = (input as Record<string, unknown>).password;
  return typeof password === "string" && password.length <= 256 ? password : null;
}

export async function readSmallJson(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 8_192) throw new Error("PAYLOAD_TOO_LARGE");
  return request.json();
}
