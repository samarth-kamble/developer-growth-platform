import { authClient } from "@/features/auth/lib/auth-client";
import { headers } from "next/headers";
import { EditProfileModal } from "@/features/dashboard/components/edit-profile-modal";
import { Briefcase, Code, Star, Target } from "lucide-react";
import { apiClient } from "@/features/core/lib/api-client";

async function getProfileData(headersList: Headers) {
  try {
    // Forward the cookie to the API Gateway
    const cookie = headersList.get("cookie") || "";
    const res = await apiClient("/api/users/me", {
      headers: { cookie },
      cache: "no-store"
    });
    
    if (!res.ok) {
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch profile from microservice:", error);
    return null;
  }
}

export default async function DashboardPage() {
  const headersList = await headers();
  const session = await authClient.getSession({
    fetchOptions: {
      headers: headersList,
    },
  });

  const { user } = session!.data!;
  const profileData = await getProfileData(headersList);

  return (
    <div className="relative flex flex-col gap-8 w-full">
      {/* Colorful background glow effects */}
      <div className="pointer-events-none absolute top-10 -left-10 h-[300px] w-[300px] rounded-full bg-purple-500/20 mix-blend-screen blur-[100px] dark:bg-purple-600/10" />
      <div className="pointer-events-none absolute -right-10 top-40 h-[300px] w-[300px] rounded-full bg-cyan-500/20 mix-blend-screen blur-[100px] dark:bg-cyan-600/10" />

      <div className="relative z-10">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">
          Welcome back, {user.name || "Developer"}!
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your developer command center. Everything you need to grow and showcase your skills.
        </p>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-12">
        {/* Profile Overview Card */}
        <div className="col-span-12 md:col-span-8 rounded-[2rem] border border-white/20 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Profile Overview</h2>
            <EditProfileModal initialData={profileData || {}} />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{profileData?.role || "Not set"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Star className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Experience</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{profileData?.experienceLevel || "Not set"}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200 font-medium">
                  <Code className="h-4 w-4" /> Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData?.techStack?.length ? (
                    profileData.techStack.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No skills added</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200 font-medium">
                  <Target className="h-4 w-4" /> Current Goals
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData?.goals?.length ? (
                    profileData.goals.map((goal: string) => (
                      <span key={goal} className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 dark:text-cyan-400">
                        {goal}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No goals added</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats / Secondary Card */}
        <div className="col-span-12 md:col-span-4 rounded-[2rem] border border-white/20 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40">
          <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-100">Account Details</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Email Address</p>
              <p className="font-medium text-slate-900 dark:text-white truncate">{user.email}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Member Since</p>
              <p className="font-medium text-slate-900 dark:text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 text-center">Microservice Architecture Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
