"use client"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Briefcase, Code, Star, Target, ArrowRight } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { TagInput } from "@/features/onboarding/components/tag-input"
import { useRouter } from "next/navigation"
import { apiClient } from "@/features/core/lib/api-client"

interface EditProfileModalProps {
  initialData: {
    role: string | null;
    experienceLevel: string | null;
    techStack: string[];
    goals: string[];
  }
}

export function EditProfileModal({ initialData }: EditProfileModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [techStack, setTechStack] = useState<string[]>(initialData.techStack || [])
  const [goals, setGoals] = useState<string[]>(initialData.goals || [])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      role: formData.get("role"),
      experienceLevel: formData.get("experienceLevel"),
      techStack,
      goals,
    }

    try {
      const response = await apiClient("/api/users/me", {
        method: "PUT",
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }

      toast.success("Profile updated successfully")
      setOpen(false)
      // Refresh the server component to fetch new data
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-9 px-4 py-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-slate-950/95 backdrop-blur-xl text-slate-100 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Profile</DialogTitle>
          <DialogDescription className="text-slate-400">
            Make changes to your developer profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-300" htmlFor="role">
              Primary Role
            </Label>
            <div className="group relative">
              <Briefcase className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary" />
              <Input
                id="role"
                name="role"
                defaultValue={initialData.role || ""}
                required
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-primary/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-300" htmlFor="experienceLevel">
              Experience Level
            </Label>
            <div className="group relative">
              <Star className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary" />
              <select
                id="experienceLevel"
                name="experienceLevel"
                required
                defaultValue={initialData.experienceLevel || ""}
                className="flex h-10 w-full appearance-none rounded-md border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              >
                <option value="" disabled className="bg-slate-900">Select level</option>
                <option value="Junior" className="bg-slate-900">Junior (0-2 years)</option>
                <option value="Mid" className="bg-slate-900">Mid-Level (2-5 years)</option>
                <option value="Senior" className="bg-slate-900">Senior (5+ years)</option>
                <option value="Lead" className="bg-slate-900">Lead / Manager</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-300">
              Tech Stack & Skills
            </Label>
            <TagInput 
              name="techStack"
              placeholder="React, Node.js (Press Enter)"
              icon={Code}
              tags={techStack}
              setTags={setTechStack}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-300">
              Primary Goals
            </Label>
            <TagInput 
              name="goals"
              placeholder="Learning, Networking (Press Enter)"
              icon={Target}
              tags={goals}
              setTags={setGoals}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.2)]"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
