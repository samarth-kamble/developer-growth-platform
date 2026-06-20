import { Metadata } from "next"

export function constructMetadata({
  title = "Devolio | AI Developer Growth Platform",
  description = "Track your coding journey across LeetCode, GeeksforGeeks, Codeforces, CodeChef, and GitHub. Analyze your skills and get AI-powered career guidance.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@devolio",
    },
    icons,
    metadataBase: new URL("https://devolio.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
