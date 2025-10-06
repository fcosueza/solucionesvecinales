import "server-only";

import encryptSession from "./encryptSession";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

async function createSession(userID: string, role: UserRole): Promise<void> {
  const daysInMiliseconds: number = 7 * 24 * 60 * 60 * 1000;
  const expiresAt: Date = new Date(Date.now() + daysInMiliseconds);
  const session: string = await encryptSession({ userID, role }, expiresAt);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  });
}

export default createSession;
