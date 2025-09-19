import "server-only";
import { BasicError, SessionPayload, UserRole } from "@/types";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret: string | undefined = process.env.SESSION_SECRET;
const encodedKey: Uint8Array<ArrayBufferLike> = new TextEncoder().encode(secret);

async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decrypt(session: string | undefined = ""): Promise<SessionPayload | BasicError> {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, { algorithms: ["HS256"] });
    return payload;
  } catch (error) {
    return { error: "session error", message: error as string };
  }
}

async function createSession(userID: string, role: UserRole): Promise<void> {
  const expiresAt = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userID, role, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  });
}

export { encrypt, decrypt, createSession };
