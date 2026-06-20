import { authClient } from "@/features/auth/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session?.data?.session) {
    redirect("/sign-in");
  }

  const { user } = session.data;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="font-bold">Devolio Dashboard</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Signed in as {user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        {children}
      </main>
    </div>
  );
}
