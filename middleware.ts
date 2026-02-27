import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "jitwise_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (!isProtectedRoute) return NextResponse.next();

  const isLoggedIn = request.cookies.get(AUTH_COOKIE)?.value === "1";
  if (isLoggedIn) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
