import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function DashboardPage() {
  // Session is guaranteed to exist here because of the layout protection
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const { user } = session!.data!;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name || "User"}!</h1>
        <p className="text-muted-foreground mt-2">
          This is your protected dashboard. You can only see this page if you are successfully authenticated.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight">Your Profile</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {user.name || "Not provided"}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight">Quick Actions</h3>
          </div>
          <div className="p-6 pt-0 flex flex-col gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
