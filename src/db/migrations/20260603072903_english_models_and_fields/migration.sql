/*
  Warnings:

  - You are about to drop the `Comunidad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Credenciales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Incidencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inscripcion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mensaje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReservaFranja` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Solicitud` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zona` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('income', 'expense');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('reported', 'inProgress', 'resolved');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('tenant', 'admin', 'adminWeb');

-- DropForeignKey
ALTER TABLE "Comunidad" DROP CONSTRAINT "Comunidad_adminID_fkey";

-- DropForeignKey
ALTER TABLE "Credenciales" DROP CONSTRAINT "Credenciales_usuario_fkey";

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
ALTER TABLE "Registro" DROP CONSTRAINT "Registro_comunidad_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_usuario_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_zona_comunidad_fkey";

-- DropForeignKey
ALTER TABLE "ReservaFranja" DROP CONSTRAINT "ReservaFranja_reservaId_fkey";

-- DropForeignKey
ALTER TABLE "ReservaFranja" DROP CONSTRAINT "ReservaFranja_zona_comunidad_fkey";

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
DROP TABLE "Registro";

-- DropTable
DROP TABLE "Reserva";

-- DropTable
DROP TABLE "ReservaFranja";

-- DropTable
DROP TABLE "Solicitud";

-- DropTable
DROP TABLE "Usuario";

-- DropTable
DROP TABLE "Zona";

-- DropEnum
DROP TYPE "EstadoIncidencia";

-- DropEnum
DROP TYPE "EstadoSolicitud";

-- DropEnum
DROP TYPE "Rol";

-- DropEnum
DROP TYPE "TipoRegistro";

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

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
CREATE TABLE "FinancialRecord" (
    "id" SERIAL NOT NULL,
    "community" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "type" "RecordType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinancialRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "community" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "description" TEXT NOT NULL,
    "status" "IncidentStatus" NOT NULL DEFAULT 'reported',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("community","user","date")
);

-- CreateTable
CREATE TABLE "Membership" (
    "user" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("user","community")
);

-- CreateTable
CREATE TABLE "Message" (
    "community" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("createdAt","community")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "zone" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationSlot" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "community" INTEGER NOT NULL,
    "zone" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIME NOT NULL,

    CONSTRAINT "ReservationSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'tenant',
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "name" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "image" TEXT,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("name","community")
);

-- CreateIndex
CREATE INDEX "FinancialRecord_community_type_createdAt_idx" ON "FinancialRecord"("community", "type", "createdAt");

-- CreateIndex
CREATE INDEX "Request_user_community_idx" ON "Request"("user", "community");

-- CreateIndex
CREATE INDEX "Reservation_user_date_idx" ON "Reservation"("user", "date");

-- CreateIndex
CREATE INDEX "Reservation_community_zone_date_idx" ON "Reservation"("community", "zone", "date");

-- CreateIndex
CREATE INDEX "ReservationSlot_reservationId_idx" ON "ReservationSlot"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "ReservationSlot_community_zone_date_time_key" ON "ReservationSlot"("community", "zone", "date", "time");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialRecord" ADD CONSTRAINT "FinancialRecord_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_zone_community_fkey" FOREIGN KEY ("zone", "community") REFERENCES "Zone"("name", "community") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationSlot" ADD CONSTRAINT "ReservationSlot_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationSlot" ADD CONSTRAINT "ReservationSlot_zone_community_fkey" FOREIGN KEY ("zone", "community") REFERENCES "Zone"("name", "community") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
