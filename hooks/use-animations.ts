"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

// Number Counter Hook - Documentation Section 5.3
// Animates numbers from 0 to target value when in viewport
// Duration: 1.5-2 seconds, Easing: ease-out

export function useCountUp(
  end: number,
  duration: number = 2000,
  decimals: number = 0
) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView) return

    let startTime: number | null = null
    const startValue = 0
    const endValue = end

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // Ease-out easing
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (endValue - startValue) * easeOut

      setCount(parseFloat(currentValue.toFixed(decimals)))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, end, duration, decimals])

  return { count, ref }
}

// Scroll Reveal Variants - Documentation Section 5.3
// Reusable animation variants for consistent scroll reveals

export const scrollRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier(0.16, 1, 0.3, 1)
    },
  },
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Viewport settings for consistent scroll triggers
export const viewportSettings = {
  once: true,
  margin: "-100px",
} as const

export const viewportSettingsCard = {
  once: true,
  margin: "-50px",
} as const
