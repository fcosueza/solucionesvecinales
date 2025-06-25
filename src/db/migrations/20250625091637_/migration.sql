/*
  Warnings:

  - You are about to drop the column `town` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `town` on the `User` table. All the data in the column will be lost.
  - Added the required column `city` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "town",
ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "town",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
