import "server-only";

import { cookies } from "next/headers";
import descifrarSesion from "./descifrarSesion";

/**
 * Actualiza la fecha de expiración de la sesión actual, extendiendo su duración por 7 días.
 * Esto asegura que usuarios activos permanezcan conectados sin interrupciones.
 *
 * @returns Null si no hay sesión válida, o void si se actualizó correctamente
 */

async function actualizarSesion(): Promise<null | void> {
  const token = (await cookies()).get("session")?.value;
  const datos = await descifrarSesion(token);

  if (!token || datos.error != undefined) return null;

  const expiracion = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const almacenCookies = await cookies();

  almacenCookies.set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiracion,
    sameSite: true,
    path: "/"
  });
}

export default actualizarSesion;
