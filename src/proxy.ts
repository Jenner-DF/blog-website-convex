// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/auth-server";

export async function proxy(req: NextRequest) {
  const user = await isAuthenticated();
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/create", "/blog/:path+", "/my-blog"],
};
