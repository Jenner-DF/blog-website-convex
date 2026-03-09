// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/auth-server";

export async function proxy(req: NextRequest) {
  const user = await isAuthenticated();
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  // 1. If user is logged in and tries to go to Login/Sign-up -> Send to Home
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/create", "/blog/:path+", "/my-blog", "/auth/:path*"],
};
