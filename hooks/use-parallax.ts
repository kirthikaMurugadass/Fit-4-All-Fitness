"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

// Parallax Hook - Documentation Section 5.2
// Subtle parallax effect (15-20% speed differential) on scroll

export function useParallax(value: number, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

// Parallax Component for Hero Background
export function ParallaxElement({
  children,
  speed = 0.15,
  className,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const ySpring = useSpring(y, springConfig)
  const yTransform = useTransform(ySpring, [0, 1], [0, speed * 100])

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      y.set(scrollProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [y])

  return (
    <motion.div ref={ref} style={{ y: yTransform }} className={className}>
      {children}
    </motion.div>
  )
}
