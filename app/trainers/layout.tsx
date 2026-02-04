import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Trainers | Fit 4All Fitness",
  description: "Meet your expert coaches. Certified trainers committed to your success with proven results and personalized guidance.",
  openGraph: {
    title: "Our Trainers | Fit 4All Fitness",
    description: "Meet your expert coaches. Certified trainers committed to your success.",
    type: "website",
  },
}

export default function TrainersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
