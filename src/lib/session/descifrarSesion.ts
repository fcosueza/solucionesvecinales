import "server-only";

import { SessionPayload, BasicError } from "@/types";
import { jwtVerify } from "jose";

/**
 * Descifra un token JWT de sesión y valida su integridad criptográfica.
 * Si el token no es válido o falla la verificación, retorna un error.
 *
 * @param token Token JWT cifrado, o indefinido
 * @returns Los datos de sesión si es válido, o un objeto de error
 */
async function descifrarSesion(token: string | undefined = ""): Promise<SessionPayload | BasicError> {
  const secreto: string | undefined = process.env.SESSION_SECRET;
  const claveCodificada: Uint8Array = new TextEncoder().encode(secreto);

  try {
    const { payload } = await jwtVerify<SessionPayload>(token, claveCodificada, { algorithms: ["HS256"] });

    return payload;
  } catch (_error) {
    return { error: "session error", message: "Session can't be decrypted." };
  }
}

export default descifrarSesion;
