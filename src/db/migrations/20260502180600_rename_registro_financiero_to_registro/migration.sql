/*
  Warnings:

  - You are about to drop the `RegistroFinanciero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RegistroFinanciero" DROP CONSTRAINT "RegistroFinanciero_comunidad_fkey";

-- DropTable
DROP TABLE "RegistroFinanciero";

-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "comunidad" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "importe" DECIMAL(12,2) NOT NULL,
    "tipo" "TipoRegistro" NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Registro_comunidad_tipo_creadoEn_idx" ON "Registro"("comunidad", "tipo", "creadoEn");

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
