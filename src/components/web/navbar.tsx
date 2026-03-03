"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { api } from "../../../convex/_generated/api";
import { useConvexAuth } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth(); // FOR CLIENT COMPONENTS
  const router = useRouter();
  return (
    <nav className="w-full py-5 flex  items-center  justify-between">
      <div className="flex items-center  gap-8">
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-bold">
            Next<span className="text-blue-500">Pro</span>
          </h1>
        </Link>
        <div className="flex items-center  gap-2">
          <Link href={"/home"} className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Link href={"/blog"} className={buttonVariants({ variant: "ghost" })}>
            Blog
          </Link>
          <Link
            href={"/create"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button
            variant={"ghost"}
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/");
                  },
                  onError: (e) => {
                    toast.error(e.error.message);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link href={"/auth/sign-up"} className={buttonVariants()}>
              Sign up
            </Link>
            <Link
              href={"/auth/login"}
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
