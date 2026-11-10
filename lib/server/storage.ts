import "server-only";
import { requiredEnv } from "./env";

export async function fetchPrivateResume() {
  const baseUrl = requiredEnv("SUPABASE_URL").replace(/\/$/, "");
  const bucket = encodeURIComponent(requiredEnv("RESUME_BUCKET"));
  const objectPath = requiredEnv("RESUME_OBJECT_PATH")
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  const serviceKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  return fetch(`${baseUrl}/storage/v1/object/authenticated/${bucket}/${objectPath}`, {
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
    },
    cache: "no-store",
  });
}
