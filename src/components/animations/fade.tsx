"use client"

import { motion, type Variants } from "motion/react"

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 19,
      mass: 1.2,
    },
  },
}

function FadeContainer({
  children,
  className,
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FadeDiv({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}
function FadeSpan({
  children,
  className,
  variants = item
}: {
  children: React.ReactNode
  className?: string,
  variants?: Variants | undefined
}) {
  return (
    <motion.span variants={variants} className={className}>
      {children}
    </motion.span>
  )
}

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

export function Fade({ 
  children, 
  className, 
  as = 'div',
  delay 
}: { 
  className?: string, 
  children?: React.ReactNode, 
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number,
}) {
  const VARIATIONS = INTERNAL__getVariation(delay)
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      initial="offscreen"
      whileInView="onscreen"
      variants={VARIATIONS}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

export { FadeContainer, FadeDiv, FadeSpan }
