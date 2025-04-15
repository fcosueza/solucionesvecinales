/**
 * Archivo que crea el cliente de Prisma y lo liga al objeto global, para
 * que solo se cree una instancia del cliente en la aplicación.
 */

import { PrismaClient } from "@/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV == "production") globalForPrisma.prisma = prisma;

export default prisma;
