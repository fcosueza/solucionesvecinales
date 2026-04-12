import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalParaPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const prisma = globalParaPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalParaPrisma.prisma = prisma;

export default prisma;
