import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Sign In",
  description: "Sign in to your account to access your dashboard and manage your projects.",
})

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
