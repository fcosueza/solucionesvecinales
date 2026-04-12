import "server-only";

import { SignJWT } from "jose";
import { SessionPayload } from "@/types";

/**
 * Cifra un objeto de sesion en un token JWT con firma criptografica.
 * El token incluye informacion del usuario y una fecha de expiracion.
 *
 * @param payload Objeto con los datos de sesion del usuario
 * @param expiraEn Fecha en la que el token debera expirar
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
