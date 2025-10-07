import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/session";
import { BasicError, SessionPayload, SessionVerification } from "@/types";

const verifySession = cache(async (): Promise<SessionVerification> => {
  const cookie: string | undefined = (await cookies()).get("session")?.value;
  const session: SessionPayload | BasicError = await decryptSession(cookie);

  if ("error" in session) {
    return { isAuth: false };
  }

  return { isAuth: true, userID: session.userID };
});

export default verifySession;
