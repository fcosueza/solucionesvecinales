import { NextRequest, NextResponse } from "next/server";
import { SessionPayload, BasicError } from "@/types";
import { descifrarSesion } from "./lib/session";
import { cookies } from "next/headers";

const rutasProtegidas = ["/communities", "/communities/add", "/communities/search", "/profile"];
const rutasPublicas = ["/home", "/login", "/signup"];

/**
 * Manages access to public and protected routes based on the user session.
 * Redirect to `login` when a protected route does not have a valid session,
 * and sends to `communities` if an authenticated user attempts to access public routes.
 *
 * @param req Solicitud entrante de Next.js.
 *
 * @returns Una response that continues navigation or redirects the user.
 */

async function proxy(req: NextRequest): Promise<NextResponse> {
  const ruta: string = req.nextUrl.pathname;
  const esRutaProtegida: boolean = rutasProtegidas.includes(ruta);
  const esRutaPublica: boolean = rutasPublicas.includes(ruta);

  const valorCookie: string | undefined = (await cookies()).get("session")?.value;
  const sesion: SessionPayload | BasicError = await descifrarSesion(valorCookie);

  if (esRutaProtegida && "error" in sesion) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (esRutaPublica && "userID" in sesion && !req.nextUrl.pathname.startsWith("/communities")) {
    return NextResponse.redirect(new URL("/communities", req.nextUrl));
  }

  return NextResponse.next();
}

// Regular expression to exclude API routes, static resources and image files
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};

export default proxy;
