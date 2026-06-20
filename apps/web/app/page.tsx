import { Button } from "@workspace/ui/components/button"
import { BarChart3, Bot, Sparkles, User, BrainCircuit } from "lucide-react"
import { ThemeSwitcher } from "@/features/core/components/theme-switcher"
import { constructMetadata } from "@/features/core/lib/metadata"

export const metadata = constructMetadata({
  title: "Dashboard | Devolio",
  description: "View your AI-generated career roadmap and skill analytics.",
})

export default function Page() {
  return (
    <div className="min-h-screen p-6 font-sans text-foreground md:p-12">
      <header className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">Devolio</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            className="glass-card border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/20"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Analytics Panel */}
        <div className="space-y-8 lg:col-span-2">
          <div className="glass-card rounded-3xl border-black/10 p-8 dark:border-white/10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-semibold">
                  Developer Dashboard
                </h2>
                <p className="text-sm text-muted-foreground">
                  Performance & Skill Analysis
                </p>
              </div>
              <Button
                variant="outline"
                className="border-black/10 bg-transparent text-foreground hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Full Report
              </Button>
            </div>

            {/* Mock Chart Area */}
            <div className="flex h-64 items-center justify-center rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
              <p className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                Skill Gap Radar Chart will render here
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
                <h3 className="text-lg font-medium">Role Readiness</h3>
                <p className="mt-2 text-3xl font-bold text-primary">82%</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Senior AI Engineer
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
                <h3 className="text-lg font-medium">Code Quality</h3>
                <p className="mt-2 text-3xl font-bold text-cyan-600 dark:text-cyan-500">
                  A+
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on latest commits
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Career Advisor Panel */}
        <div className="lg:col-span-1">
          <div className="glass-card flex h-150 flex-col rounded-3xl border-black/10 p-8 dark:border-white/10">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full border border-primary/20 bg-primary/10 p-3 text-primary dark:border-primary/30 dark:bg-primary/20">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Co-Pilot</h3>
                <p className="text-xs text-muted-foreground">Nexus-AI Online</p>
              </div>
            </div>

            <div className="relative flex flex-1 flex-col gap-4 rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="max-w-[85%] self-start rounded-2xl rounded-tl-sm border border-black/5 bg-white/60 p-3 text-sm dark:border-white/10 dark:bg-black/20">
                Hi there! Based on your recent GitHub commits, you are doing
                great with Next.js, but I noticed a gap in MLOps. Want me to
                generate a learning path?
              </div>
              <div className="max-w-[85%] self-end rounded-2xl rounded-tr-sm border border-primary/20 bg-primary/10 p-3 text-sm dark:bg-primary/20">
                Yes, please focus on Docker and Kubernetes.
              </div>

              <div className="absolute right-4 bottom-4 left-4 mt-auto">
                <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 p-2 shadow-inner dark:border-white/10 dark:bg-black/20">
                  <input
                    type="text"
                    placeholder="Ask AI..."
                    className="flex-1 border-none bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                  <Button
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full border-black/10 bg-transparent text-foreground hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/20"
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
