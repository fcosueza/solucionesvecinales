import { NextRequest, NextResponse } from "next/server";
import { SessionPayload, BasicError } from "@/types";
import { decryptSession } from "./lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/home", "/login", "/signup"];

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

export default proxy;
