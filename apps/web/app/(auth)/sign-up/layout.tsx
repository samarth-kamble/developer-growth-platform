import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Sign Up",
  description: "Sign up to your account to access your dashboard and manage your projects",
})

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
