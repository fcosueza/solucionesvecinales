ALTER TABLE "Reserva"
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_pkey";

ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id");

CREATE TABLE "ReservaFranja" (
    "id" SERIAL NOT NULL,
    "reservaId" INTEGER NOT NULL,
    "comunidad" INTEGER NOT NULL,
    "zona" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TIME NOT NULL,

    CONSTRAINT "ReservaFranja_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Reserva_usuario_fecha_idx" ON "Reserva"("usuario", "fecha");
CREATE INDEX "Reserva_comunidad_zona_fecha_idx" ON "Reserva"("comunidad", "zona", "fecha");
CREATE INDEX "ReservaFranja_reservaId_idx" ON "ReservaFranja"("reservaId");
CREATE UNIQUE INDEX "ReservaFranja_comunidad_zona_fecha_hora_key" ON "ReservaFranja"("comunidad", "zona", "fecha", "hora");

INSERT INTO "ReservaFranja" ("reservaId", "comunidad", "zona", "fecha", "hora")
SELECT
  reserva."id",
  reserva."comunidad",
  reserva."zona",
  reserva."fecha",
  franja."hora"::time
FROM "Reserva" AS reserva
JOIN LATERAL generate_series(
  TIMESTAMP '1970-01-01 00:00:00' + (reserva."hora_inicio" - TIME '00:00:00'),
  TIMESTAMP '1970-01-01 00:00:00' + (reserva."hora_fin" - TIME '00:00:00') - INTERVAL '1 hour',
  INTERVAL '1 hour'
) AS franja("hora") ON true;

ALTER TABLE "ReservaFranja" ADD CONSTRAINT "ReservaFranja_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReservaFranja" ADD CONSTRAINT "ReservaFranja_zona_comunidad_fkey" FOREIGN KEY ("zona", "comunidad") REFERENCES "Zona"("nombre", "comunidad") ON DELETE CASCADE ON UPDATE CASCADE;