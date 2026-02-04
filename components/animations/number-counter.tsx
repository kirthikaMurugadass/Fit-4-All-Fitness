"use client"

import { useCountUp } from "@/hooks/use-animations"
import { motion } from "framer-motion"

// Number Counter Component - Documentation Section 5.3
// Displays animated number that counts up when in viewport

interface NumberCounterProps {
  value: number | string // Can be number or string like "5000+"
  label: string
  duration?: number
  decimals?: number
  suffix?: string // Dynamic suffix from Sanity (+, %, yrs, etc.)
  className?: string
}

export function NumberCounter({
  value,
  label,
  duration = 2000,
  decimals = 0,
  suffix = "",
  className = "",
}: NumberCounterProps) {
  // Parse string values like "5000+", "95%", "4.9" (backward compatibility)
  let numericValue = 0
  let displaySuffix = suffix // Use prop suffix first
  let shouldAnimate = true
  
  if (typeof value === "string") {
    const match = value.match(/(\d+\.?\d*)([+%]?)/)
    if (match) {
      numericValue = parseFloat(match[1])
      // Only use parsed suffix if prop suffix is not provided
      if (!displaySuffix) {
        displaySuffix = match[2] || ""
      }
    } else {
      // If can't parse, don't animate
      shouldAnimate = false
    }
  } else {
    numericValue = value
  }

  const { count, ref } = useCountUp(numericValue, duration, decimals)

  return (
    <motion.div
      ref={shouldAnimate ? ref : undefined}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`text-center ${className}`}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {shouldAnimate ? count.toFixed(decimals) : value}
        {displaySuffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground">
        {label}
      </div>
    </motion.div>
  )
}
