"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Card component - Documentation Section 6.1 & 6.2
// Feel: Clean, spacious, content-focused
// Padding: 24-32px per Documentation Section 2.3
// Border radius: 12px (radius-lg) per Documentation Section 2.5
// Hover: translateY(-4px), shadow-lg per Documentation Section 5.4
// Now includes Magic Bento border glow animation (no stars, no spotlight)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
      cardRef.current = node
    },
    [ref]
  )

  React.useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Initialize CSS custom properties
    card.style.setProperty("--glow-x", "50%")
    card.style.setProperty("--glow-y", "50%")
    card.style.setProperty("--glow-intensity", "0")

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const relativeX = (x / rect.width) * 100
      const relativeY = (y / rect.height) * 100

      card.style.setProperty("--glow-x", `${relativeX}%`)
      card.style.setProperty("--glow-y", `${relativeY}%`)
      card.style.setProperty("--glow-intensity", "1")
    }

    const handleMouseLeave = () => {
      card.style.setProperty("--glow-intensity", "0")
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={combinedRef}
    className={cn(
        "magic-bento-card rounded-lg border border-border bg-card text-card-foreground shadow-md transition-all duration-300 ease-out",
      className
    )}
    {...props}
  />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 md:p-8", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 md:p-8 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 md:p-8 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
