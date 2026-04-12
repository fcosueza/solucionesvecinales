import "server-only";

import { SignJWT } from "jose";
import { SessionPayload } from "@/types";

/**
 * Cifra un objeto de sesión en un token JWT con firma criptográfica.
 * El token incluye informacion del usuario y una fecha de expiración.
 *
 * @param payload Objeto con los datos de sesión del usuario
 * @param expiraEn Fecha en la que el token deberá expirar
 * @returns Token JWT cifrado y firmado
 */
async function cifrarSesion(payload: SessionPayload, expiraEn: Date): Promise<string> {
  const secreto: string | undefined = process.env.SESSION_SECRET;
  const claveCodificada: Uint8Array = new TextEncoder().encode(secreto);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiraEn)
    .sign(claveCodificada);
}

export default cifrarSesion;
