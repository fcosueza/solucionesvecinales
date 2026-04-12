import "server-only";

import { cookies } from "next/headers";

/**
 * Elimina la cookie de sesión del usuario, efectivamente cerrando su sesión.
 *
 * @returns Promesa sin valor devuelto
 */
async function eliminarSesion(): Promise<void> {
  const almacenCookies = await cookies();

  almacenCookies.delete("session");
}

export default eliminarSesion;
