"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GalleryWallProps {
  title: string
  subtitle?: string
  children: ReactNode
  index?: number
}

export function GalleryWall({ title, subtitle, children, index = 0 }: GalleryWallProps) {
  return (
    <motion.section
      className="relative mx-auto max-w-6xl px-6 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Wall background */}
      <div className="absolute inset-0 rounded-2xl bg-[var(--wall-color)] backdrop-blur-[1px]" />

      <div className="relative z-10">
        {/* Wall label */}
        <div className="mb-10 flex items-end gap-4">
          <motion.h2
            className="font-serif text-3xl font-black text-foreground text-glow sm:text-4xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.span
              className="mb-1 text-xs uppercase tracking-widest text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subtitle}
            </motion.span>
          )}
        </div>

        {/* Divider wire */}
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[rgba(var(--glow-rgb),0.3)] to-transparent" />

        {children}
      </div>
    </motion.section>
  )
}
