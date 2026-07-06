import "server-only";

import encodeSession from "./encodeSession";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

/**
 * Creates a new user session and stores it in a secure cookie.
 * The session contains the user's basic information and expires after 7 days.
 *
 * @param idUsuario The user's unique ID
 * @param rol Role of the user (admin, tenant, etc.)
 *
 * @returns Promise<void> indicating the completion of the session creation process
 */
async function createSession(idUsuario: string, rol: UserRole): Promise<void> {
  const daysInMilliseconds: number = 7 * 24 * 60 * 60 * 1000;
  const expireAt: Date = new Date(Date.now() + daysInMilliseconds);
  const token: string = await encodeSession({ userID: idUsuario, role: rol }, expireAt);
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expireAt,
    sameSite: "lax",
    path: "/"
  });
}

export default createSession;
