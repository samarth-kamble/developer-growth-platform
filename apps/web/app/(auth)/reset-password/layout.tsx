import { constructMetadata } from "@/features/core/lib/metadata"

export const metadata = constructMetadata({
  title: "Reset Password",
  description: "Set a new password for your Devolio account.",
})

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
