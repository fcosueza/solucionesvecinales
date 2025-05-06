/*
  Warnings:

  - You are about to drop the `Comunidad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Credenciales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Incidencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inscripcion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mensaje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Solicitud` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zona` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "IncidentState" AS ENUM ('created', 'processing', 'solved');

-- CreateEnum
CREATE TYPE "RequestState" AS ENUM ('pending', 'approved', 'denied');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('tenant', 'admin', 'webAdmin');

-- DropForeignKey
ALTER TABLE "Credenciales" DROP CONSTRAINT "Credenciales_correoUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Incidencia" DROP CONSTRAINT "Incidencia_comunidad_fkey";

-- DropForeignKey
ALTER TABLE "Incidencia" DROP CONSTRAINT "Incidencia_usuario_fkey";

-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_comunidad_fkey";

-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_usuario_fkey";

-- DropForeignKey
ALTER TABLE "Mensaje" DROP CONSTRAINT "Mensaje_comunidad_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_usuario_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_zona_comunidad_fkey";

-- DropForeignKey
ALTER TABLE "Solicitud" DROP CONSTRAINT "Solicitud_comunidad_fkey";

-- DropForeignKey
ALTER TABLE "Solicitud" DROP CONSTRAINT "Solicitud_usuario_fkey";

-- DropForeignKey
ALTER TABLE "Zona" DROP CONSTRAINT "Zona_comunidad_fkey";

-- DropTable
DROP TABLE "Comunidad";

-- DropTable
DROP TABLE "Contacto";

-- DropTable
DROP TABLE "Credenciales";

-- DropTable
DROP TABLE "Incidencia";

-- DropTable
DROP TABLE "Inscripcion";

-- DropTable
DROP TABLE "Mensaje";

-- DropTable
DROP TABLE "Reserva";

-- DropTable
DROP TABLE "Solicitud";

-- DropTable
DROP TABLE "Usuario";

-- DropTable
DROP TABLE "Zona";

-- DropEnum
DROP TYPE "Estado_Incidencia";

-- DropEnum
DROP TYPE "Estado_Solicitud";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Area" (
    "name" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("name","community")
);

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "town" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("name","email","createdAt")
);

-- CreateTable
CREATE TABLE "Credentials" (
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("user")
);

-- CreateTable
CREATE TABLE "Incident" (
    "community" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "state" "IncidentState" NOT NULL DEFAULT 'created',

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("community","user","date")
);

-- CreateTable
CREATE TABLE "Message" (
    "community" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("createdAt","community")
);

-- CreateTable
CREATE TABLE "Registration" (
    "user" TEXT NOT NULL,
    "community" INTEGER NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("user","community")
);

-- CreateTable
CREATE TABLE "Request" (
    "user" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "state" "RequestState" NOT NULL DEFAULT 'pending',

    CONSTRAINT "Request_pkey" PRIMARY KEY ("user","community")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "user" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "area" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("user","community","area")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'tenant',
    "username" TEXT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "floor" INTEGER,
    "letter" CHAR(1),
    "town" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_area_community_fkey" FOREIGN KEY ("area", "community") REFERENCES "Area"("name", "community") ON DELETE CASCADE ON UPDATE CASCADE;
