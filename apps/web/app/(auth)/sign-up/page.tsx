"use client"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Mail, Lock, ArrowRight, User, Eye, EyeOff } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import Link from "next/link"
import { useState } from "react"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-slate-50 lg:w-1/2 dark:bg-slate-950">
      {/* Colorful background glow effects */}
      <div className="pointer-events-none absolute top-0 -left-1/4 h-125 w-125 rounded-full bg-purple-500/30 mix-blend-multiply blur-[120px] dark:bg-purple-600/20 dark:mix-blend-screen" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-100 w-100 rounded-full bg-cyan-500/30 mix-blend-multiply blur-[100px] dark:bg-cyan-600/20 dark:mix-blend-screen" />

      <div className="relative z-10 mx-6 w-full max-w-md rounded-[2rem] border border-white/50 bg-white/70 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl sm:p-10 dark:border-white/10 dark:bg-slate-950/50 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-semibold text-slate-900 dark:text-white">
            Create an Account
          </h1>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Join us and start building today.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-slate-700 dark:text-gray-300"
              htmlFor="name"
            >
              Full Name
            </Label>
            <div className="group relative">
              <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-gray-500" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="h-auto w-full rounded-xl border border-slate-200 bg-white/50 py-3.5 pr-4 pl-12 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
              />
            </div>
          </div>

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
                placeholder="john.doe@email.com"
                className="h-auto w-full rounded-xl border border-slate-200 bg-white/50 py-3.5 pr-4 pl-12 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-slate-700 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </Label>
            <div className="group relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
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

          <Button className="mt-6 w-full rounded-xl border border-primary/50 bg-primary py-6 text-base font-semibold text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]">
            Sign Up <ArrowRight className="ml-2 h-5 w-5" />
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
            className="rounded-xl border-slate-200 bg-white/50 py-6 text-slate-600 shadow-sm transition-all hover:bg-white/80 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 bg-white/50 py-6 text-slate-600 shadow-sm transition-all hover:bg-white/80 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <FaGithub className="mr-2 h-5 w-5" />
            GitHub
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-gray-400">
          Already have an account?{" "}
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
