"use client";

import { authClient } from "@/features/auth/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/sign-in");
            },
          },
        });
      }}
    >
      Sign out
    </button>
  );
}
