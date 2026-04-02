import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "src/db",
  migrations: {
    path: "src/db/migrations",
    seed: "tsx src/db/seed.ts"
  },
  datasource: {
    url: env("DATABASE_URL")
  }
});
