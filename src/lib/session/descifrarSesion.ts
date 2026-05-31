import "server-only";

import { SessionPayload, BasicError } from "@/types";
import { jwtVerify } from "jose";

/**
 * Decrypts a JWT session token and validates its cryptographic integrity.
 * If the token is invalid or verification fails, an error is returned.
 *
 * @param token Token JWT cifrado, o indefinido
 *
 * @throws {Error} If an error occurs during token verification
 * @returns Session data if valid, or an error object
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
