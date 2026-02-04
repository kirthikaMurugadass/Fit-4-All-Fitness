"use client"

import { motion, MotionProps } from "framer-motion"
import { ReactNode } from "react"

// Reduced Motion Detection - Documentation Section 5.6
export function useReducedMotion() {
  if (typeof window === "undefined") return false
  
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  return mediaQuery.matches
}

// Animation wrapper that respects reduced motion
interface AnimateOnScrollProps extends MotionProps {
  children: ReactNode
  variant?: "fadeUp" | "scaleUp" | "slideIn" | "slideInRight"
  delay?: number
  className?: string
}

export function AnimateOnScroll({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  ...props
}: AnimateOnScrollProps) {
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    slideIn: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[variant]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
