import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Membership Plans | Fit 4All Fitness",
  description: "Choose the plan that fits your fitness journey. Essential, Premium, and Elite memberships with 7-day free trial. Compare features and pricing.",
  openGraph: {
    title: "Membership Plans | Fit 4All Fitness",
    description: "Choose the plan that fits your fitness journey. All plans include a 7-day free trial.",
    type: "website",
  },
}

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
