import "server-only";
import postgres from "postgres";
import { requiredEnv } from "./env";

declare global {
  var __resumeDatabase: ReturnType<typeof postgres> | undefined;
}

export function getDb() {
  if (!globalThis.__resumeDatabase) {
    const databaseUrl = requiredEnv("DATABASE_URL");
    const local = /localhost|127\.0\.0\.1/.test(databaseUrl);
    globalThis.__resumeDatabase = postgres(databaseUrl, {
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
      ssl: local ? false : "require",
    });
  }

  return globalThis.__resumeDatabase;
}
