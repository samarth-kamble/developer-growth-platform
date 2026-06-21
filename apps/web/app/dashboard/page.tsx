import { authClient } from "@/features/auth/lib/auth-client";
import { headers } from "next/headers";
import { CheckCircle, GitCommit, Trophy, Medal } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { getProfileData } from "@/features/dashboard/server/profile";

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
    <div className="relative flex flex-col gap-6 w-full">
      {/* Verification Banner */}
      <div className="w-full rounded-2xl border border-green-500 bg-green-500/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-green-500 text-lg">✓</span>
          </div>
          <div>
            <h3 className="font-semibold text-green-700 dark:text-green-500">You aren't verified yet</h3>
            <p className="text-sm text-green-700/80 dark:text-green-500/80">Get verified to unlock your exclusive Devolio card and leaderboard access.</p>
          </div>
        </div>
        <Button variant="outline" className="border-green-500/30 text-green-700 dark:text-green-500 hover:bg-green-500/10">
          Verify Profile →
        </Button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Total Problem Solved */}
        <div className="col-span-12 md:col-span-3 rounded-2xl border border-border bg-card text-card-foreground p-4 shadow-sm flex flex-col justify-between hover:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Problem Solved</span>
            <CheckCircle className="h-4 w-4" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold tracking-tighter">0</span>
          </div>
        </div>

        {/* Total Commit */}
        <div className="col-span-12 md:col-span-3 rounded-2xl border border-border bg-card text-card-foreground p-4 shadow-sm flex flex-col justify-between hover:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Total Commit</span>
            <GitCommit className="h-4 w-4" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold tracking-tighter">0</span>
          </div>
        </div>

        {/* Total Contest Attend */}
        <div className="col-span-12 md:col-span-3 rounded-2xl border border-border bg-card text-card-foreground p-4 shadow-sm flex flex-col justify-between hover:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Contest Attend</span>
            <Trophy className="h-4 w-4" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold tracking-tighter">0</span>
          </div>
        </div>

        {/* Total Awards */}
        <div className="col-span-12 md:col-span-3 rounded-2xl border border-border bg-card text-card-foreground p-4 shadow-sm flex flex-col justify-between hover:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Total Awards</span>
            <Medal className="h-4 w-4" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold tracking-tighter">0</span>
          </div>
        </div>

        {/* Contribution Heatmap Placeholder */}
        <div className="col-span-12 md:col-span-8 rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm flex flex-col min-h-[320px]">
          <div className="flex items-center justify-between text-muted-foreground mb-4">
            <span className="text-sm font-medium">GitHub Contributions</span>
            <span className="text-xs bg-muted text-foreground px-2 py-1 rounded">2026</span>
          </div>
          <div className="flex-1 rounded-xl bg-muted/50 border border-border flex items-center justify-center border-dashed">
            <span className="text-muted-foreground text-sm">Heatmap Component Coming Soon</span>
          </div>
        </div>

        {/* Problems Solved Donut Chart Placeholder */}
        <div className="col-span-12 md:col-span-4 rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm flex flex-col min-h-[320px]">
          <h3 className="font-semibold text-lg mb-4">Problems Solved</h3>
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="h-48 w-48 shrink-0 rounded-full border-[16px] border-primary/20 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-r-transparent rotate-45" />
               <div className="text-center">
                 <span className="text-4xl font-bold">69</span>
                 <p className="text-sm text-muted-foreground">Total</p>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
