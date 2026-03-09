"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function LogoutButton({ isMobile }: { isMobile?: boolean }) {
  const router = useRouter();

  return (
    <Button
      variant={isMobile ? "destructive" : "ghost"}
      size="sm"
      className={isMobile ? "w-full" : ""}
      onClick={async () => {
        toast.promise(authClient.signOut(), {
          success: () => {
            router.refresh();
            router.push("/");
            return "You have logged out";
          },
          error: (e) => `Error: ${e}`,
        });
      }}
    >
      Logout
    </Button>
  );
}
