import "server-only";
import { BasicError, SessionPayload } from "@/types";
import { SignJWT, jwtVerify } from "jose";

const secret: string | undefined = process.env.SESSION_SECRET;
const encodedKey: Uint8Array<ArrayBufferLike> = new TextEncoder().encode(secret);

async function encryptSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decryptSession(session: string | undefined = ""): Promise<SessionPayload | BasicError> {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, { algorithms: ["HS256"] });
    return payload;
  } catch (error) {
    return { error: "session error", message: error as string };
  }
}

export { encryptSession, decryptSession };
