import * as React from "react"
import { cn } from "@/lib/utils"

// Container component - Documentation Section 2.3 & 2.4
// Max-width: 1280px for most content, 1440px for wide content
// Padding: 24px (mobile), 48px (tablet), 64px (desktop)

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  wide?: boolean // Use 1440px max-width instead of 1280px
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, wide = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full",
        wide ? "max-w-[1440px]" : "max-w-[1280px]",
        "px-6 md:px-12 lg:px-16", // 24px, 48px, 64px
        className
      )}
      {...props}
    />
  )
)
Container.displayName = "Container"

// Section component - Documentation Section 2.3
// Vertical padding: 80-128px (desktop), 48-80px (mobile)
// Used for page sections with consistent spacing

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div"
  spacing?: "sm" | "md" | "lg" // Small: 48-64px, Medium: 64-96px, Large: 80-128px
  fullWidth?: boolean // Full-bleed section (edge-to-edge)
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Component = "section", spacing = "md", fullWidth = false, ...props }, ref) => {
    const spacingClasses = {
      sm: "py-12 md:py-16", // 48px mobile, 64px desktop
      md: "py-16 md:py-20 lg:py-24", // 64px mobile, 80px tablet, 96px desktop
      lg: "py-20 md:py-24 lg:py-32", // 80px mobile, 96px tablet, 128px desktop
    }

    return (
      <Component
        ref={ref as any}
        className={cn(
          fullWidth ? "w-full" : "w-full",
          spacingClasses[spacing],
          className
        )}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

export { Container, Section }
