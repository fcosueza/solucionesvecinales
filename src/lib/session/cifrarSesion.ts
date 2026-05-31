import "server-only";

import { SignJWT } from "jose";
import { SessionPayload } from "@/types";

/**
 * Encrypts a session object into a cryptographically signed JWT token.
 * The token includes user information and an expiration date.
 *
 * @param payload Object with user session data
 * @param expiraEn Date on which the token should expire
 *
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
