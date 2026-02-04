import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Training Offers | Fit 4All Fitness",
  description: "Discover our comprehensive training offers designed to match your goals and fitness level. Muscle Building, Endurance Training, Body Toning, Cardio (Fat Burning), Personal Trainer, and Nutritional Advice.",
  openGraph: {
    title: "Training Offers | Fit 4All Fitness",
    description: "Discover our comprehensive training offers designed to match your goals and fitness level.",
    type: "website",
  },
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
