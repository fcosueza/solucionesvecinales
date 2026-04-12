import "server-only";

import cifrarSesion from "./cifrarSesion";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

/**
 * Crea una nueva sesion de usuario y la almacena en una cookie segura.
 * La sesion contiene la informacion basica del usuario y expira despues de 7 dias.
 *
 * @param idUsuario El ID unico del usuario
 * @param rol El rol del usuario (admin, inquilino, etc.)
 * @returns Promesa sin valor de retorno
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
