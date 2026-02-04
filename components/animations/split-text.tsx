"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface SplitTextProps {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  delay?: number
  stagger?: number
}

export function SplitText({
  children,
  className = "",
  as: Component = "span",
  delay = 0,
  stagger = 0.05,
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion()

  // Split text into words
  const words = children.split(" ")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
      aria-label={children}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block"
          style={{ marginRight: index < words.length - 1 ? "0.25em" : "0" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
