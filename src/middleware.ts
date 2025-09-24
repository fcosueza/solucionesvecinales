import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "./lib/session";
import { cookies } from "next/headers";

const protecetedRoutes = ["dashboard"];
const publicRoutes = ["/home", "/login", "/signin"];

async function middleware(req: NextRequest): Promise<NextResponse> {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protecetedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decryptSession(cookie);

  if (isProtectedRoute && "error" in session) {
    return NextResponse.redirect("/login");
  }

  if (isPublicRoute && "userID" in session && !req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export default middleware;
