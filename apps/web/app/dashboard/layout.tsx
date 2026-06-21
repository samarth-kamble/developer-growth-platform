import { authClient } from "@/features/auth/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { ThemeSwitcher } from "@/features/core/components/theme-switcher";
import { ProfileSidebar } from "@/features/dashboard/components/profile-sidebar";
import { UserNav } from "@/features/dashboard/components/user-nav";
import { getProfileData } from "@/features/dashboard/server/profile";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const session = await authClient.getSession({
    fetchOptions: {
      headers: headersList,
    },
  });

  if (!session?.data?.session) {
    redirect("/sign-in");
  }

  const { user } = session.data;
  const profileData = await getProfileData(headersList);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Left Sidebar Profile Card */}
      <aside className="w-[300px] flex-shrink-0 border-r border-border bg-card/50 backdrop-blur-3xl hidden md:block z-10">
        <ProfileSidebar user={user} profileData={profileData} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-0">
        <header className="h-14 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0 z-20">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <span className="font-bold tracking-tight text-foreground">Devolio Hub</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              Overview
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <UserNav user={user} profileData={profileData} />
          </div>
        </header>

        {/* Scrollable Bento Canvas */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 scrollbar-hide">
          <div className="max-w-[1400px] mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
