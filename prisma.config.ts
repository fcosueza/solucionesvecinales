import * as dotenv from "dotenv";
import { expand } from "dotenv-expand";
import { defineConfig, env } from "prisma/config";

expand(dotenv.config());

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
