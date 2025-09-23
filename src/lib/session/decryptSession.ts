import "server-only";

import { SessionPayload, BasicError } from "@/types";
import { jwtVerify } from "jose";

async function decryptSession(session: string | undefined = ""): Promise<SessionPayload | BasicError> {
  const secret: string | undefined = process.env.SESSION_SECRET;
  const encodedKey: Uint8Array = new TextEncoder().encode(secret);

  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, { algorithms: ["HS256"] });

    return payload;
  } catch (error) {
    return { error: "session error", message: "Session can't be verified." };
  }
}

export default decryptSession;
