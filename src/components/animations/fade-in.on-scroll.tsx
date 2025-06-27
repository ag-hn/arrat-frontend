"use client"

import { type Variants, motion } from "motion/react";
import { type ReactNode } from "react";

const EASE = [0.08, 0.37, 0.45, 0.89];
function INTERNAL__getVariation(delay = 0) {
  return {
    offscreen: {
      y: 8,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        delay: delay,
        y: { ease: EASE, duration: 1 },
      }
    }
  } satisfies Variants
}

export function FadeInOnScroll({ children, className, delay }: { className?: string, children?: ReactNode, delay?: number }) {
  const VARIATIONS = INTERNAL__getVariation(delay)
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8, }}
      variants={VARIATIONS}
      className={className}
    >
      {children}
    </motion.div>
  )
}

