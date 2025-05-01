-- CreateEnum
CREATE TYPE "Estado_Incidencia" AS ENUM ('creada', 'procesandose', 'solucionada');

-- CreateEnum
CREATE TYPE "Estado_Solicitud" AS ENUM ('pendiente', 'aprobada', 'denegada');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('inquilino', 'administrador', 'webAdmin');

-- CreateTable
CREATE TABLE "Comunidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "localidad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "pais" TEXT NOT NULL,

    CONSTRAINT "Comunidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("nombre","correo","createdAt")
);

-- CreateTable
CREATE TABLE "Credenciales" (
    "correoUsuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Credenciales_pkey" PRIMARY KEY ("correoUsuario")
);

-- CreateTable
CREATE TABLE "Incidencia" (
    "comunidad" INTEGER NOT NULL,
    "usuario" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT NOT NULL,
    "estado" "Estado_Incidencia" NOT NULL DEFAULT 'solucionada',

    CONSTRAINT "Incidencia_pkey" PRIMARY KEY ("comunidad","usuario","fecha")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "usuario" TEXT NOT NULL,
    "comunidad" INTEGER NOT NULL,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("usuario","comunidad")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "horaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comunidad" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("horaCreacion","comunidad")
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
    "estado" "Estado_Solicitud" NOT NULL DEFAULT 'pendiente',

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("usuario","comunidad")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "correo" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'inquilino',
    "nombre_usuario" TEXT,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "piso" INTEGER,
    "letra" CHAR(1),
    "localidad" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("correo")
);

-- CreateTable
CREATE TABLE "Zona" (
    "nombre" TEXT NOT NULL,
    "comunidad" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT,
    "hora_inicio" TIME NOT NULL,
    "hora_fin" TIME NOT NULL,

    CONSTRAINT "Zona_pkey" PRIMARY KEY ("nombre","comunidad")
);

-- AddForeignKey
ALTER TABLE "Credenciales" ADD CONSTRAINT "Credenciales_correoUsuario_fkey" FOREIGN KEY ("correoUsuario") REFERENCES "Usuario"("correo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "Usuario"("correo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "Usuario"("correo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "Usuario"("correo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_zona_comunidad_fkey" FOREIGN KEY ("zona", "comunidad") REFERENCES "Zona"("nombre", "comunidad") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "Usuario"("correo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zona" ADD CONSTRAINT "Zona_comunidad_fkey" FOREIGN KEY ("comunidad") REFERENCES "Comunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
