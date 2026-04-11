import { NextRequest, NextResponse } from "next/server";
import { SessionPayload, BasicError } from "@/types";
import { decryptSession } from "./lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/home", "/login", "/signup"];

/**
 * Gestiona el acceso a rutas públicas y protegidas según la sesión del usuario.
 * Redirige a `login` cuando una ruta protegida no tiene sesión válida,
 * y envía al `dashboard` si un usuario autenticado intenta acceder a rutas públicas.
 *
 * @param req Solicitud entrante de Next.js.
 * @returns Una respuesta que continúa la navegación o redirige al usuario.
 */

async function proxy(req: NextRequest): Promise<NextResponse> {
  const path: string = req.nextUrl.pathname;
  const isProtectedRoute: boolean = protectedRoutes.includes(path);
  const isPublicRoute: boolean = publicRoutes.includes(path);

  const cookie: string | undefined = (await cookies()).get("session")?.value;
  const session: SessionPayload | BasicError = await decryptSession(cookie);

  if (isProtectedRoute && "error" in session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && "userID" in session && !req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Expresión regular para excluir rutas de API, recursos estáticos y archivos de imagen
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};

export default proxy;
