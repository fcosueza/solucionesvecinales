import "server-only";

import { cookies } from "next/headers";

/**
 * Delete the user's session cookie, closing their session.
 *
 * @returns Promesa no return value
 */
async function eliminarSesion(): Promise<void> {
  const almacenCookies = await cookies();

  almacenCookies.delete("session");
}

export default eliminarSesion;
