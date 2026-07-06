import "server-only";

import { cookies } from "next/headers";

/**
 * Delete the user's session cookie, closing their session.
 *
 * @returns Promise<void> return value
 */
async function deleteSession(): Promise<void> {
  const cookiesStore = await cookies();

  cookiesStore.delete("session");
}

export default deleteSession;
