/*
  Warnings:

  - Added the required column `texto` to the `Mensaje` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mensaje" ADD COLUMN     "texto" TEXT NOT NULL;
