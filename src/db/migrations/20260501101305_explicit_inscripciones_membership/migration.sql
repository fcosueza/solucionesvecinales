/*
  Warnings:

  - You are about to drop the `_inquilino` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_inquilino" DROP CONSTRAINT "_inquilino_A_fkey";

-- DropForeignKey
ALTER TABLE "_inquilino" DROP CONSTRAINT "_inquilino_B_fkey";

-- DropTable
DROP TABLE "_inquilino";

-- CreateTable
CREATE TABLE "Inscripcion" (
    "usuario" TEXT NOT NULL,
    "comunidad" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("usuario","comunidad")
);

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
