import { Fira_Code, } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/features/core/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { Toaster } from "@workspace/ui/components/sonner"


const fontFira = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontFira.className,
        "font-fira",
      )}
    >
      <body className="ethereal-bg" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
