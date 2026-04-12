import "server-only";

import cifrarSesion from "./cifrarSesion";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

/**
 * Crea una nueva sesión de usuario y la almacena en una cookie segura.
 * La sesión contiene la información básica del usuario y expira después de 7 días.
 *
 * @param idUsuario El ID único del usuario
 * @param rol El rol del usuario (admin, inquilino, etc.)
 *
 * @returns Promesa sin valor devuelto
 */
async function crearSesion(idUsuario: string, rol: UserRole): Promise<void> {
  const diasEnMs: number = 7 * 24 * 60 * 60 * 1000;
  const expiraEn: Date = new Date(Date.now() + diasEnMs);
  const token: string = await cifrarSesion({ userID: idUsuario, role: rol }, expiraEn);
  const almacenCookies = await cookies();

  almacenCookies.set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiraEn,
    sameSite: "lax",
    path: "/"
  });
}

export default crearSesion;
