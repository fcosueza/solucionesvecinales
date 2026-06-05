import { NextRequest, NextResponse } from "next/server";
import { SessionPayload, BasicError } from "@/types";
import { descifrarSesion } from "./lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/communities", "/communities/add", "/communities/search", "/profile"];
const publicRoutes = ["/home", "/login", "/signup"];

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
  const route: string = req.nextUrl.pathname;
  const isProtectedRoute: boolean = protectedRoutes.includes(route);
  const isPublicRoute: boolean = publicRoutes.includes(route);

  const cookieValue: string | undefined = (await cookies()).get("session")?.value;
  const session: SessionPayload | BasicError = await descifrarSesion(cookieValue);

  if (isProtectedRoute && "error" in session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && "userID" in session && !req.nextUrl.pathname.startsWith("/communities")) {
    return NextResponse.redirect(new URL("/communities", req.nextUrl));
  }

  return NextResponse.next();
}

// Regular expression to exclude API routes, static resources and image files
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};

export default proxy;
