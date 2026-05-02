DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'EstadoIncidencia' AND e.enumlabel = 'creado'
  ) THEN
    ALTER TYPE "EstadoIncidencia" RENAME VALUE 'creado' TO 'reportado';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'EstadoIncidencia' AND e.enumlabel = 'en_proceso'
  ) THEN
    ALTER TYPE "EstadoIncidencia" RENAME VALUE 'en_proceso' TO 'procesandose';
  END IF;
END $$;
