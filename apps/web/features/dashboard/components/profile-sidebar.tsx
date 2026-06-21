"use client";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { User } from "lucide-react";
import Image from "next/image";

interface ProfileSidebarProps {
  user: any;
  profileData?: any;
}

export function ProfileSidebar({ user, profileData }: ProfileSidebarProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 gap-6 text-foreground">
      {/* Top Action Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Public Profile</span>
        {/* Switch for public profile can go here */}
        <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
      </div>

      {/* Identity Section */}
      <div className="flex flex-col items-center gap-3 text-center mt-2">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border-2 border-primary/20 flex items-center justify-center p-1">
          <div className="h-full w-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {/* Placeholder for real avatar image */}
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">{user.name || "Developer"}</h2>
          <p className="text-sm text-primary">{profileData?.username ? `@${profileData.username}` : "@setup_username"}</p>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          <p>{user.role || "Full Stack Developer"}</p>
        </div>
      </div>

      {/* Get Devolio Card Button */}
      <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all shadow-[0_0_15px_rgba(var(--primary),0.1)]">
        Get your Devolio Card 🔒
      </Button>

      {/* Divider */}
      <div className="h-px w-full bg-border" />

      {/* Platforms Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold tracking-tight">Connected Platforms</h3>
        
        {/* Platform List */}
        <div className="flex flex-col gap-2">
          {/* GitHub Placeholder */}
          <Card className="bg-card shadow-sm border-border hover:bg-muted/50 transition-colors">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center overflow-hidden p-1.5 border border-border">
                  <Image src="/platform/github_icon.png" alt="GitHub" width={24} height={24} className="object-contain dark:invert" />
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </div>
              <Badge variant="secondary" className="text-[10px] bg-green-500/10 text-green-500 border-transparent">Connected</Badge>
            </CardContent>
          </Card>

          {/* LeetCode Placeholder */}
          <Card className="bg-card shadow-sm border-border hover:bg-muted/50 transition-colors">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center overflow-hidden p-1.5 border border-border">
                  {/* Using dark icon by default, we can adjust logic for theme switching later if needed */}
                  <Image src="/platform/leetcode_dark.png" alt="LeetCode" width={24} height={24} className="object-contain dark:block hidden" />
                  <Image src="/platform/leetcode_light.png" alt="LeetCode" width={24} height={24} className="object-contain dark:hidden block" />
                </div>
                <span className="text-sm font-medium">LeetCode</span>
              </div>
              <Badge variant="outline" className="text-[10px]">Add</Badge>
            </CardContent>
          </Card>

          {/* Codeforces Placeholder */}
          <Card className="bg-card shadow-sm border-border hover:bg-muted/50 transition-colors">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center overflow-hidden p-1.5 border border-border">
                  <Image src="/platform/codeforces.png" alt="Codeforces" width={24} height={24} className="object-contain" />
                </div>
                <span className="text-sm font-medium">Codeforces</span>
              </div>
              <Badge variant="outline" className="text-[10px]">Add</Badge>
            </CardContent>
          </Card>
          
          {/* GeeksForGeeks Placeholder */}
          <Card className="bg-card shadow-sm border-border hover:bg-muted/50 transition-colors">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center overflow-hidden p-1.5 border border-border">
                  <Image src="/platform/gfg.png" alt="GeeksForGeeks" width={24} height={24} className="object-contain" />
                </div>
                <span className="text-sm font-medium">GeeksForGeeks</span>
              </div>
              <Badge variant="outline" className="text-[10px]">Add</Badge>
            </CardContent>
          </Card>
        </div>

        <Button variant="outline" className="w-full mt-2 border-dashed border-border text-xs">
          + Add Platform
        </Button>
      </div>
    </div>
  );
}
