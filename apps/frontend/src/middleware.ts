import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Paths requiring authentication
  const isDashboardPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/complaints") ||
    pathname.startsWith("/customers") ||
    pathname.startsWith("/staff") ||
    pathname.startsWith("/settings");

  // Authentication paths
  const isAuthPath = pathname.startsWith("/login");

  if (isDashboardPath && !token) {
    // Redirect to login page if no token
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPath && token) {
    // Redirect to dashboard if token exists and trying to visit login
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (pathname === "/") {
    // Root route redirects to dashboard if authenticated, or login if not
    const targetPath = token ? "/dashboard" : "/login";
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/complaints/:path*",
    "/customers/:path*",
    "/staff/:path*",
    "/settings/:path*",
  ],
};
