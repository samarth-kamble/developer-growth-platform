"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render a placeholder of the exact same size to prevent hydration mismatch layout shift
  if (!mounted) {
    return (
      <div className="glass-card h-10 w-26 rounded-full border-black/10 opacity-50 dark:border-white/10" />
    )
  }

  const options = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "system", icon: Monitor, label: "System" },
    { value: "dark", icon: Moon, label: "Dark" },
  ]

  // Calculate position for the sliding thumb (w-8 is 32px)
  const activeIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === theme)
  )
  const translateX = activeIndex * 32

  return (
    <div className="glass-card relative inline-flex items-center rounded-full border-black/10 bg-black/5 p-1 shadow-inner dark:border-white/10 dark:bg-white/5">
      {/* Sliding Background Thumb */}
      <div
        className="cubic-bezier(0.4, 0, 0.2, 1) absolute top-1 left-1 h-8 w-8 rounded-full border border-black/5 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 dark:border-white/10 dark:bg-black dark:shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
        style={{ transform: `translateX(${translateX}px)` }}
      />

      {options.map((option) => {
        const Icon = option.icon
        const isActive = theme === option.value

        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={cn(
              "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300",
              isActive
                ? "text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.3)] dark:text-cyan-400"
                : "text-muted-foreground hover:scale-110 hover:text-foreground"
            )}
            aria-label={`Switch to ${option.label} theme`}
            title={option.label}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        )
      })}
    </div>
  )
}
