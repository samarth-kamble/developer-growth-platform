"use client"

import { useState } from "react"
import { z } from "zod"
import { toast } from "sonner"
import { Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

import { authClient } from "@/lib/auth-client"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = forgotPasswordSchema.safeParse({ email })
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Invalid input")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      })

      if (error) {
        toast.error(error.message || "Failed to send reset link")
      } else {
        toast.success("Reset link sent to your email")
        setIsSubmitted(true)
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-slate-50 lg:w-1/2 dark:bg-slate-950">
      <div className="pointer-events-none absolute top-0 -left-1/4 h-125 w-125 rounded-full bg-purple-500/30 mix-blend-multiply blur-[120px] dark:bg-purple-600/20 dark:mix-blend-screen" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-100 w-100 rounded-full bg-cyan-500/30 mix-blend-multiply blur-[100px] dark:bg-cyan-600/20 dark:mix-blend-screen" />

      <div className="relative z-10 mx-6 w-full max-w-md rounded-[2rem] border border-white/50 bg-white/70 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl sm:p-10 dark:border-white/10 dark:bg-slate-950/50 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-semibold text-slate-900 dark:text-white">
            Forgot Password
          </h1>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            {isSubmitted 
              ? "We've sent a recovery link to your email." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>

        {!isSubmitted ? (
          <form className="space-y-6" onSubmit={handleResetRequest}>
            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-slate-700 dark:text-gray-300"
                htmlFor="email"
              >
                Email Address
              </Label>
              <div className="group relative">
                <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john.doe@email.com"
                  className="h-auto w-full rounded-xl border border-slate-200 bg-white/50 py-3.5 pr-4 pl-12 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-xl border border-primary/50 bg-primary py-6 text-base font-semibold text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : (
                <>Send Reset Link <ArrowRight className="ml-2 h-5 w-5" /></>
              )}
            </Button>
          </form>
        ) : (
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="w-full rounded-xl border-slate-200 bg-white/50 py-6 text-slate-600 shadow-sm transition-all hover:bg-white/80 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Try another email address
          </Button>
        )}

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-gray-400">
          Remember your password?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-slate-900 transition-colors hover:text-primary hover:underline dark:text-white dark:hover:text-primary"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
