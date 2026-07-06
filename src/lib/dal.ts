import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { decodeSession } from "@/lib/session";
import { BasicError, SessionPayload, SessionVerification } from "@/types";

/**
 * Function to verify the user's session on the server. Runs when accessing protected routes
 * and checks that the user has a valid session. Returns an object with the authentication status and session data if valid.
 *
 * @returns An object with the isAuth property indicating whether the user is authenticated, and optionally the session data.
 */

const verifySession = cache(async (): Promise<SessionVerification> => {
  const sessionCookie: string | undefined = (await cookies()).get("session")?.value;
  const session: SessionPayload | BasicError = await decodeSession(sessionCookie);

  if ("error" in session) {
    return { isAuth: false };
  }

  return { isAuth: true, session: session };
});

export default verifySession;
