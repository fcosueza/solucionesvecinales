import "server-only";

import { cookies } from "next/headers";
import decodeSession from "./decodeSession";

/**
 * Updates the expiration date of the current session, extending its duration by 7 days.
 * This ensures that active users remain connected without interruptions.
 *
 * @returns Null if there is no valid session, or void if it was updated successfully
 */

async function updateSession(): Promise<null | void> {
  const token = (await cookies()).get("session")?.value;
  const data = await decodeSession(token);

  if (!token || data.error != undefined) return null;

  const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expirationDate,
    sameSite: true,
    path: "/"
  });
}

export default updateSession;
