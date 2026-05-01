/*
  Warnings:

  - The primary key for the `Solicitud` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Solicitud" DROP CONSTRAINT "Solicitud_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Solicitud_usuario_comunidad_idx" ON "Solicitud"("usuario", "comunidad");
