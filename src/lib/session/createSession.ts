import "server-only";

import encryptSession from "./encryptSession";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

export async function createSession(userID: string, role: UserRole): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encryptSession({ userID, role }, expiresAt);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  });
}
