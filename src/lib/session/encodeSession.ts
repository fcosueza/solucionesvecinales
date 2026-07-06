import "server-only";

import { SignJWT } from "jose";
import { SessionPayload } from "@/types";

/**
 * Encrypts a session object into a cryptographically signed JWT token.
 * The token includes user information and an expiration date.
 *
 * @param payload Object with user session data
 * @param expireAt Date on which the token should expire
 *
 * @returns Token JWT cifrado y firmado
 */
async function encodeSession(payload: SessionPayload, expireAt: Date): Promise<string> {
  const secret: string | undefined = process.env.SESSION_SECRET;
  const encodeKey: Uint8Array = new TextEncoder().encode(secret);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expireAt)
    .sign(encodeKey);
}

export default encodeSession;
