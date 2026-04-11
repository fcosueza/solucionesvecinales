/*
  Warnings:

  - The primary key for the `Contacto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `correo` on the `Contacto` table. All the data in the column will be lost.
  - Added the required column `email` to the `Contacto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contacto" DROP CONSTRAINT "Contacto_pkey",
DROP COLUMN "correo",
ADD COLUMN     "email" TEXT NOT NULL,
ADD CONSTRAINT "Contacto_pkey" PRIMARY KEY ("nombre", "email", "creadoEn");
