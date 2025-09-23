import "server-only";

import { cookies } from "next/headers";
import decryptSession from "./decryptSession";

async function updateSession(): Promise<null | void> {
  const session = (await cookies()).get("session")?.value;
  const payload = await decryptSession(session);

  if (!session || payload.error != undefined) return null;

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: true,
    path: "/"
  });
}

export default updateSession;
