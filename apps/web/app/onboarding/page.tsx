"use client"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { ArrowRight, Briefcase, Code, Star, Target, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { submitOnboarding } from "@/features/onboarding/actions/onboarding-actions"
import { TagInput } from "@/features/onboarding/components/tag-input"

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [techStack, setTechStack] = useState<string[]>([])
  const [goals, setGoals] = useState<string[]>([])

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    const result = await submitOnboarding(formData)
    
    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 p-4 dark:bg-slate-950">
      {/* Colorful background glow effects */}
      <div className="pointer-events-none absolute top-0 -left-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/30 mix-blend-multiply blur-[120px] dark:bg-purple-600/20 dark:mix-blend-screen" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/30 mix-blend-multiply blur-[100px] dark:bg-cyan-600/20 dark:mix-blend-screen" />

      <div className="relative z-10 mx-auto w-full max-w-xl rounded-[2rem] border border-white/50 bg-white/70 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl sm:p-12 dark:border-white/10 dark:bg-slate-950/50 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome to Devolio
          </h1>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Let's personalize your experience. We'll set up the rest later.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-gray-300" htmlFor="role">
              What is your primary role?
            </Label>
            <div className="group relative">
              <Briefcase className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-gray-500" />
              <Input
                id="role"
                name="role"
                type="text"
                required
                placeholder="e.g. Frontend Engineer, Product Manager"
                className="h-auto w-full rounded-xl border border-slate-200 bg-white/50 py-3.5 pr-4 pl-12 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-gray-300" htmlFor="experienceLevel">
              Experience Level
            </Label>
            <div className="group relative">
              <Star className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-gray-500" />
              <select
                id="experienceLevel"
                name="experienceLevel"
                required
                defaultValue=""
                className="h-auto w-full appearance-none rounded-xl border border-slate-200 bg-white/50 py-3.5 pr-4 pl-12 text-slate-900 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <option value="" disabled>Select level</option>
                <option value="Junior">Junior (0-2 years)</option>
                <option value="Mid">Mid-Level (2-5 years)</option>
                <option value="Senior">Senior (5+ years)</option>
                <option value="Lead">Lead / Manager</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-gray-300">
              Tech Stack & Skills
            </Label>
            <TagInput 
              name="techStack"
              placeholder="React, Node.js, Python (Press Enter)"
              icon={Code}
              tags={techStack}
              setTags={setTechStack}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-gray-300">
              Primary Goals
            </Label>
            <TagInput 
              name="goals"
              placeholder="Job Hunting, Networking, Learning (Press Enter)"
              icon={Target}
              tags={goals}
              setTags={setGoals}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full cursor-pointer rounded-xl border border-primary/50 bg-primary py-6 text-base font-semibold text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Saving..." : (
              <>Complete Setup <ArrowRight className="ml-2 h-5 w-5" /></>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
