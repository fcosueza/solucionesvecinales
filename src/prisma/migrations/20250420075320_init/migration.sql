-- AlterTable
ALTER TABLE "Zona" ALTER COLUMN "hora_inicio" SET DATA TYPE TIME,
ALTER COLUMN "hora_fin" SET DATA TYPE TIME;

-- CreateTable
CREATE TABLE "Contacto" (
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("nombre","correo","createdAt")
);
