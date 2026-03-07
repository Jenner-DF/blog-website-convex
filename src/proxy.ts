// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/auth-server";

export async function proxy(req: NextRequest) {
  const protectedPaths = ["/create", "/blog/"];
  const user = await isAuthenticated();
  // const user = await stackServerApp.getUser({
  //   tokenStore: req, // In Next.js Middleware, req acts as the token store
  // });
  const pathname = req.nextUrl.pathname;
  // console.log("ta");
  // if (user && pathname === "/") {
  //   return NextResponse.redirect(new URL("/trips", req.url));Z
  // }
  console.log(pathname);
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!user) {
      const url = new URL("/auth/login", req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create", "/blog/:path+"],
};
