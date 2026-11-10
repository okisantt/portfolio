import "server-only";
import {
  createHmac,
  randomBytes,
  randomInt,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { requiredEnv } from "./env";

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function hmac(value: string, secretName: string) {
  return createHmac("sha256", requiredEnv(secretName))
    .update(value)
    .digest("base64url");
}

export function createOtp() {
  return String(randomInt(100000, 1000000));
}

export function createAccessToken() {
  return randomBytes(32).toString("base64url");
}

export function verifyDigest(value: string, expected: string, secretName: string) {
  return safeEqual(hmac(value, secretName), expected);
}

export function verifyScryptPassword(password: string, encodedHash: string) {
  const [algorithm, salt, expected] = encodedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !expected) return false;

  try {
    const derived = scryptSync(password, Buffer.from(salt, "base64url"), 64).toString(
      "base64url",
    );
    return safeEqual(derived, expected);
  } catch {
    return false;
  }
}
