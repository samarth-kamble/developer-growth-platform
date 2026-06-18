import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Forgot Password",
  description: "Reset your Devolio account password.",
})

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
