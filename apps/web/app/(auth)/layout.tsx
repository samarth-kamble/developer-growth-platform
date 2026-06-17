"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, LineChart, Share2, BadgeCheck } from "lucide-react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { SiLeetcode } from "react-icons/si"

const SignInFeaturePanel = () => (
  <div className="mx-auto flex h-full max-w-lg flex-col justify-center p-12 text-white">
    <h2 className="mb-12 text-center text-4xl font-bold tracking-tight">
      Welcome to Devolio
    </h2>

    <div className="space-y-10">
      <div className="flex items-start gap-6">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-lg">
          <LayoutDashboard className="h-8 w-8 text-[#FF9736]" />
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">
            Unified Developer Profile
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Showcase your complete coding portfolio, track all stats, and share
            your progress effortlessly in one place.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-lg">
          <LineChart className="h-8 w-8 text-[#FF9736]" />
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">Track Your Progress</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Organize projects, monitor coding streaks, and view your skill
            growth over time for seamless review.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-lg">
          <Share2 className="h-8 w-8 text-[#FF9736]" />
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">Connect & Share</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Stay on top of your dev journey by sharing articles and connecting
            with other developers effortlessly.
          </p>
        </div>
      </div>
    </div>
  </div>
)

const SignUpProfileMockup = () => (
  <div className="relative mx-auto flex h-full max-w-lg flex-col items-center justify-center p-12 text-white">
    <div className="z-10 mb-10 text-center">
      <h2 className="mb-3 text-4xl font-bold tracking-tight">
        Share your Progress
      </h2>
      <p className="text-lg font-medium text-gray-400">
        Your Ultimate Developer Portfolio
      </p>
    </div>

    {/* Phone Mockup Card */}
    <div className="relative z-10 w-85 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111111]/80 pb-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      {/* Top Header */}
      <div className="flex items-center gap-2 border-b border-white/5 p-5">
        <Image
          src="/logo.svg"
          alt="Devolio Logo"
          width={60}
          height={24}
          className="h-5 w-auto drop-shadow-[0_0_10px_rgba(255,122,0,0.4)]"
        />
        <span className="ml-auto text-xs font-medium tracking-widest text-gray-500">
          CARD
        </span>
      </div>

      {/* Avatar Section */}
      <div className="mt-8 flex flex-col items-center">
        <div className="relative">
          <div className="h-28 w-28 rounded-full border-4 border-[#FF9736] bg-linear-to-br from-[#FF7A00] to-[#FFBC7D] p-1 shadow-[0_0_20px_rgba(255,151,54,0.3)]">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-800">
              {/* Abstract placeholder gradient */}
              <div className="absolute inset-0 bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-80" />
            </div>
          </div>
          <div className="absolute -right-2 -bottom-2 rounded-full border border-white/10 bg-[#111111] p-1.5">
            <span className="block text-lg leading-none">🦉</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <h3 className="text-2xl font-semibold">Alex Developer</h3>
          <BadgeCheck className="h-5 w-5 text-green-500" />
        </div>
        <div className="mt-2 rounded-full border border-[#FF9736]/30 bg-[#FF9736]/20 px-4 py-1 text-xs font-semibold text-[#FFBC7D]">
          @alexdeveloper
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-8 flex gap-4 px-6">
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="mb-2 text-[10px] font-bold tracking-wider text-[#FF9736] uppercase">
            Projects
          </p>
          <p className="text-3xl font-light">124</p>
        </div>
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="mb-2 text-[10px] font-bold tracking-wider text-green-400 uppercase">
            Active Days
          </p>
          <p className="text-3xl font-light">348</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="mx-6 mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
        <p className="mb-4 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
          You can find me on ...
        </p>
        <div className="flex justify-center gap-4 text-gray-300">
          <FaGithub className="h-5 w-5 cursor-pointer transition-colors hover:text-white" />
          <SiLeetcode className="h-5 w-5 cursor-pointer transition-colors hover:text-[#FFA116]" />
          <FaLinkedin className="h-5 w-5 cursor-pointer transition-colors hover:text-[#0A66C2]" />
          <FaTwitter className="h-5 w-5 cursor-pointer transition-colors hover:text-[#1DA1F2]" />
        </div>
      </div>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 px-6">
        {["#React", "#NextJS", "#TypeScript", "#Tailwind"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
)

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isSignIn = pathname === "/sign-in"

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground dark:bg-black">
      {/* Left Side: Dark, grid, gradients and dynamic content */}
      <div className="relative hidden overflow-hidden bg-[#0A0A0A] lg:block lg:w-1/2">
        {/* SVG Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>

        {/* Subtle glow circles */}
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#FF9736]/10 mix-blend-screen blur-[100px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#FF7A00]/10 mix-blend-screen blur-[100px]" />

        {/* Dynamic Content Panel */}
        <div className="relative z-20 h-full pt-16">
          {isSignIn ? <SignInFeaturePanel /> : <SignUpProfileMockup />}
        </div>
      </div>

      {/* Right Side: Auth Form (Injected via Children) */}
      {children}
    </div>
  )
}
