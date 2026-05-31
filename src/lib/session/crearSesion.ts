import "server-only";

import cifrarSesion from "./cifrarSesion";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

/**
 * Creates a new user session and stores it in a secure cookie.
 * The session contains the user's basic information and expires after 7 days.
 *
 * @param idUsuario The user's unique ID
 * @param rol Role of the user (admin, tenant, etc.)
 *
 * @returns Promesa no return value
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
