-- CreateEnum
CREATE TYPE "TipoRegistro" AS ENUM ('ingreso', 'gasto');

-- CreateTable
CREATE TABLE "RegistroFinanciero" (
    "id" SERIAL NOT NULL,
    "comunidad" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "importe" DECIMAL(12,2) NOT NULL,
    "tipo" "TipoRegistro" NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroFinanciero_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RegistroFinanciero_comunidad_tipo_creadoEn_idx" ON "RegistroFinanciero"("comunidad", "tipo", "creadoEn");

-- AddForeignKey
ALTER TABLE "RegistroFinanciero" ADD CONSTRAINT "RegistroFinanciero_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
