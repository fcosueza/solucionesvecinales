import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { descifrarSesion } from "@/lib/session";
import { BasicError, SessionPayload, SessionVerification } from "@/types";

const verifySession = cache(async (): Promise<SessionVerification> => {
  const valorCookie: string | undefined = (await cookies()).get("session")?.value;
  const sesion: SessionPayload | BasicError = await descifrarSesion(valorCookie);

  if ("error" in sesion) {
    return { isAuth: false };
  }

  return { isAuth: true, session: sesion };
});

export default verifySession;
