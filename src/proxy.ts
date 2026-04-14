import { NextRequest, NextResponse } from "next/server";
import { SessionPayload, BasicError } from "@/types";
import { descifrarSesion } from "./lib/session";
import { cookies } from "next/headers";

const rutasProtegidas = ["/dashboard"];
const rutasPublicas = ["/home", "/login", "/signup"];

/**
 * Gestiona el acceso a rutas públicas y protegidas según la sesión del usuario.
 * Redirige a `login` cuando una ruta protegida no tiene sesión válida,
 * y envía al `dashboard` si un usuario autenticado intenta acceder a rutas públicas.
 *
 * @param req Solicitud entrante de Next.js.
 * @returns Una respuesta que continúa la navegación o redirige al usuario.
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

  if (esRutaPublica && "userID" in sesion && !req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Expresión regular para excluir rutas de API, recursos estáticos y archivos de imagen
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};

export default proxy;
