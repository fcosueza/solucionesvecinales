-- Añade campos opcionales de imagen para usuario y comunidad.
ALTER TABLE "Usuario" ADD COLUMN IF NOT EXISTS "imagen" TEXT;
ALTER TABLE "Comunidad" ADD COLUMN IF NOT EXISTS "imagen" TEXT;
