"use client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { capitalize } from "radash";
import LogoutButton from "./LogoutButton"; // Separate client component for the action

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const user = useQuery(api.auth.getUser);
  // const user = session?.user;

  return (
    <nav className="border-b px-6 py-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur z-50">
      <Link href="/" className="font-bold text-xl tracking-tight leading-none">
        The Blog
      </Link>

      {/* --- DESKTOP NAV --- */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              Read
            </Button>
          </Link>
          <Link href="/create">
            <Button variant="ghost" size="sm">
              Write
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 border-l pl-4">
          {user ? (
            <>
              <Link
                href="/my-blog"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                {capitalize(user.name)}&apos;s Blog
              </Link>
              {/* Use a small client component for the logout trigger */}
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Login
              </Link>
              <Link
                href="/auth/sign-up"
                className={buttonVariants({ size: "sm" })}
              >
                Sign up
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* --- MOBILE NAV --- */}
      <div className="flex md:hidden items-center gap-2">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left">Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8 px-4">
              <Link href="/blog" className="text-lg font-medium">
                Read
              </Link>
              <Link
                href="/create"
                className="text-lg font-medium border-b pb-4"
              >
                Write
              </Link>

              {user ? (
                <div className="flex flex-col gap-4">
                  <Link href="/my-blog" className="text-lg font-medium italic">
                    {capitalize(user.name)}&apos;s Blog
                  </Link>
                  <LogoutButton isMobile />
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4">
                  <Link
                    href="/auth/login"
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
