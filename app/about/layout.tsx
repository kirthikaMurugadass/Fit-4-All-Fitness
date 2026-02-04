import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Fit 4All Fitness",
  description: "Discover our story, mission, and world-class facilities. Learn why Fit 4All Fitness is the premier choice for serious fitness enthusiasts.",
  openGraph: {
    title: "About Us | Fit 4All Fitness",
    description: "Discover our story, mission, and world-class facilities. Learn why Fit 4All Fitness is the premier choice for serious fitness enthusiasts.",
    type: "website",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
