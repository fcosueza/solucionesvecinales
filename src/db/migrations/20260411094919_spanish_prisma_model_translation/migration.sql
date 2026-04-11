/*
  Warnings:

  - You are about to drop the `Area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Community` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Credentials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Incident` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_tenant` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoIncidencia" AS ENUM ('creado', 'en_proceso', 'resuelto');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('pendiente', 'aprobada', 'denegada');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('inquilino', 'admin', 'adminWeb');

-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_community_fkey";

-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_adminID_fkey";

-- DropForeignKey
ALTER TABLE "Credentials" DROP CONSTRAINT "Credentials_user_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_community_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_user_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_community_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_community_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_user_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_area_community_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_user_fkey";

-- DropForeignKey
ALTER TABLE "_tenant" DROP CONSTRAINT "_tenant_A_fkey";

-- DropForeignKey
ALTER TABLE "_tenant" DROP CONSTRAINT "_tenant_B_fkey";

-- DropTable
DROP TABLE "Area";

-- DropTable
DROP TABLE "Community";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Credentials";

-- DropTable
DROP TABLE "Incident";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "Reservation";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_tenant";

-- DropEnum
DROP TYPE "IncidentState";

-- DropEnum
DROP TYPE "RequestState";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Comunidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "ciudad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "adminID" TEXT NOT NULL,

    CONSTRAINT "Comunidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("nombre","correo","creadoEn")
);

-- CreateTable
CREATE TABLE "Credenciales" (
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Credenciales_pkey" PRIMARY KEY ("usuario")
);

-- CreateTable
CREATE TABLE "Incidencia" (
    "comunidad" INTEGER NOT NULL,
    "usuario" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT NOT NULL,
    "estado" "EstadoIncidencia" NOT NULL DEFAULT 'creado',

    CONSTRAINT "Incidencia_pkey" PRIMARY KEY ("comunidad","usuario","fecha")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "comunidad" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("creadoEn","comunidad")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "usuario" TEXT NOT NULL,
    "comunidad" INTEGER NOT NULL,
    "zona" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora_inicio" TIME NOT NULL,
    "hora_fin" TIME NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("usuario","comunidad","zona")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "usuario" TEXT NOT NULL,
    "comunidad" INTEGER NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'pendiente',

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("usuario","comunidad")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Rol" NOT NULL DEFAULT 'inquilino',
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zona" (
    "nombre" TEXT NOT NULL,
    "comunidad" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "hora_inicio" TIME NOT NULL,
    "hora_fin" TIME NOT NULL,
    "imagen" TEXT,

    CONSTRAINT "Zona_pkey" PRIMARY KEY ("nombre","comunidad")
);

-- CreateTable
CREATE TABLE "_inquilino" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_inquilino_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comunidad_adminID_key" ON "Comunidad"("adminID");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "_inquilino_B_index" ON "_inquilino"("B");

-- AddForeignKey
ALTER TABLE "Comunidad" ADD CONSTRAINT "Comunidad_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credenciales" ADD CONSTRAINT "Credenciales_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_zona_comunidad_fkey" FOREIGN KEY ("zona", "comunidad") REFERENCES "Zona"("nombre", "comunidad") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zona" ADD CONSTRAINT "Zona_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_inquilino" ADD CONSTRAINT "_inquilino_A_fkey" FOREIGN KEY ("A") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_inquilino" ADD CONSTRAINT "_inquilino_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
