-- Permite que un administrador gestione varias comunidades eliminando el indice unico de adminID.
DROP INDEX IF EXISTS "Comunidad_adminID_key";