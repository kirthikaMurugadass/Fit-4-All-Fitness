"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Button component - Documentation Section 6.1 & 5.4
// Variants: Primary, Secondary, Ghost, Icon
// Hover states: scale transform, shadow elevation per Documentation Section 5.4
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-200 ease-out cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        // Primary: Bold fill, subtle shadow, lifts on hover - Documentation Section 6.2
        default: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        // Secondary: Outlined or light fill - Documentation Section 6.2
        secondary:
          "bg-secondary text-secondary-foreground border border-border shadow-sm hover:bg-secondary/80 hover:scale-[1.01] hover:shadow-md active:scale-[0.99]",
        // Ghost: Text-only, minimal - Documentation Section 6.2
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        // Destructive: Error states
        destructive:
          "bg-destructive text-white shadow-md hover:bg-destructive/90 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        // Outline variant
        outline:
          "border border-border bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:scale-[1.01] active:scale-[0.99]",
        // Link variant
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Button sizes - Documentation Section 2.3 & 7.4: Minimum 44x44px touch target
        default: "h-11 px-6 py-3 text-sm md:text-base min-h-[44px]", // Medium: 44px height (touch-friendly)
        sm: "h-10 px-5 py-2.5 text-sm min-h-[44px]", // Small: 40px but with min-height for touch
        lg: "h-12 px-8 py-4 text-base md:text-lg min-h-[44px]", // Large: 48px height (mobile-friendly)
        icon: "size-11 p-0 min-h-[44px] min-w-[44px]", // Icon button: 44px square (touch-friendly)
        "icon-sm": "size-10 p-0 min-h-[44px] min-w-[44px]", // Small icon: 44px minimum
        "icon-lg": "size-12 p-0 min-h-[44px] min-w-[44px]", // Large icon: 48px
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
