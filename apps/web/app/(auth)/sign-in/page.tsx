"use client"

import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { toast } from "sonner"
import { authClient } from "@/features/auth/lib/auth-client"

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)
  const router = useRouter()

  const handleSocialSignIn = async (provider: "google" | "github") => {
    if (provider === "google") setIsGoogleLoading(true)
    if (provider === "github") setIsGithubLoading(true)

    const { error } = await authClient.signIn.social({ provider })

    if (error) {
      toast.error(error.message || `Failed to sign in with ${provider}`)
      if (provider === "google") setIsGoogleLoading(false)
      if (provider === "github") setIsGithubLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = signInSchema.safeParse({ email, password })
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Invalid input")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      })

      if (error) {
        toast.error(error.message || "Failed to sign in")
      } else {
        toast.success("Signed in successfully")
        router.push("/dashboard") // Redirect to a protected page on success
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-slate-50 lg:w-1/2 dark:bg-slate-950">
      {/* Colorful background glow effects */}
      <div className="pointer-events-none absolute top-0 -left-1/4 h-125 w-125 rounded-full bg-purple-500/30 mix-blend-multiply blur-[120px] dark:bg-purple-600/20 dark:mix-blend-screen" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-100 w-100 rounded-full bg-cyan-500/30 mix-blend-multiply blur-[100px] dark:bg-cyan-600/20 dark:mix-blend-screen" />

      <div className="relative z-10 mx-6 w-full max-w-md rounded-[2rem] border border-white/50 bg-white/70 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl sm:p-10 dark:border-white/10 dark:bg-slate-950/50 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-semibold text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Please log in to your account.
          </p>
        </div>


        <form className="space-y-6" onSubmit={handleSignIn}>
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                className="text-sm font-medium text-slate-700 dark:text-gray-300"
                htmlFor="password"
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                Forgot password?
              </Link>
            </div>
            <div className="group relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="h-auto w-full rounded-xl border border-slate-200 bg-white/50 py-3.5 pr-12 pl-12 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || isGoogleLoading || isGithubLoading}
            className="mt-6 w-full cursor-pointer rounded-xl border border-primary/50 bg-primary py-6 text-base font-semibold text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : (
              <>Sign In <ArrowRight className="ml-2 h-5 w-5" /></>
            )}
          </Button>
        </form>

        <div className="mt-8 flex items-center justify-center space-x-4">
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
          <p className="text-xs font-medium tracking-wider text-slate-400 uppercase dark:text-gray-500">
            Or continue with
          </p>
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            type="button"
            disabled={isLoading || isGoogleLoading || isGithubLoading}
            onClick={() => handleSocialSignIn("google")}
            className="cursor-pointer rounded-xl border-slate-200 bg-white/50 py-6 text-slate-600 shadow-sm transition-all hover:bg-white/80 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-transparent dark:border-gray-300 dark:border-t-transparent" />
            ) : (
              <FcGoogle className="mr-2 h-5 w-5" />
            )}
            Google
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading || isGoogleLoading || isGithubLoading}
            onClick={() => handleSocialSignIn("github")}
            className="cursor-pointer rounded-xl border-slate-200 bg-white/50 py-6 text-slate-600 shadow-sm transition-all hover:bg-white/80 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGithubLoading ? (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-transparent dark:border-gray-300 dark:border-t-transparent" />
            ) : (
              <FaGithub className="mr-2 h-5 w-5" />
            )}
            GitHub
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-slate-900 transition-colors hover:text-primary hover:underline dark:text-white dark:hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
