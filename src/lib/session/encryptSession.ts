import "server-only";

import { SignJWT } from "jose";
import { SessionPayload } from "@/types";

async function encryptSession(payload: SessionPayload, expiresAt: Date): Promise<string> {
  const secret: string | undefined = process.env.SESSION_SECRET;
  const encodedKey: Uint8Array = new TextEncoder().encode(secret);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);
}

export default encryptSession;
