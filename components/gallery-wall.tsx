"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface GalleryWallProps {
  title: string
  subtitle?: string
  children: ReactNode
  index?: number
}

export function GalleryWall({ title, subtitle, children, index = 0 }: GalleryWallProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-16">
      {/* Wall entrance animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      <div className="relative z-10">
        {/* Wall label */}
        <div className="mb-10 flex items-end gap-4">
          <motion.h2
            className="font-serif text-3xl font-black text-foreground text-glow sm:text-4xl"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.span
              className="mb-1 text-xs uppercase tracking-widest text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {subtitle}
            </motion.span>
          )}
        </div>

        {/* Divider wire */}
        <motion.div
          className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[rgba(var(--glow-rgb),0.3)] to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {children}
      </div>
    </section>
  )
}
