// Grid layout helpers - Documentation Section 2.4
// Responsive grid system: 1 col (mobile), 2 col (tablet), 3-4 col (desktop)

import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    mobile?: 1 | 2
    tablet?: 2 | 3
    desktop?: 3 | 4
  }
  gap?: "sm" | "md" | "lg" // 16px, 24px, 32px
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = { mobile: 1, tablet: 2, desktop: 3 }, gap = "md", ...props }, ref) => {
    const gapClasses = {
      sm: "gap-4", // 16px
      md: "gap-6 md:gap-8", // 24px mobile, 32px desktop
      lg: "gap-8 md:gap-10", // 32px mobile, 40px desktop
    }

    // Map column counts to Tailwind grid classes
    const mobileCols = cols.mobile === 1 ? "grid-cols-1" : "grid-cols-2"
    const tabletCols = cols.tablet === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
    const desktopCols = cols.desktop === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          mobileCols,
          tabletCols,
          desktopCols,
          gapClasses[gap],
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid }
