import "server-only";

import { cookies } from "next/headers";

/**
 * Elimina la cookie de sesion del usuario, efectivamente cerrando su sesion.
 *
 * @returns Promesa sin valor de retorno
 */
async function eliminarSesion(): Promise<void> {
  const almacenCookies = await cookies();

  almacenCookies.delete("session");
}

export default eliminarSesion;
