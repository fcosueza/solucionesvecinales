import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { descifrarSesion } from "@/lib/session";
import { BasicError, SessionPayload, SessionVerification } from "@/types";

/**
 * Función para verificar la sesión del usuario en el servidor. Se ejecuta cuando se accede a rutas protegidas
 * y comprueba que el usuario tenga una sesión válida. Devuelve un objeto con el estado de autenticación y los datos de la sesión si es válida.
 *
 * @returns Un objeto con la propiedad isAuth indicando si el usuario está autenticado, y opcionalmente los datos de la sesión.
 */

const verifySession = cache(async (): Promise<SessionVerification> => {
  const valorCookie: string | undefined = (await cookies()).get("session")?.value;
  const sesion: SessionPayload | BasicError = await descifrarSesion(valorCookie);

  if ("error" in sesion) {
    return { isAuth: false };
  }

  return { isAuth: true, session: sesion };
});

export default verifySession;
