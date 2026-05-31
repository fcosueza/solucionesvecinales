import "server-only";

import { cookies } from "next/headers";
import descifrarSesion from "./descifrarSesion";

/**
 * Updates the expiration date of the current session, extending its duration by 7 days.
 * This ensures that active users remain connected without interruptions.
 *
 * @returns Null if there is no valid session, or void if it was updated successfully
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
