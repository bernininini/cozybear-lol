"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { ReactNode } from "react"

interface PortraitFrameProps {
  children: ReactNode
  index?: number
  image?: string
  alt?: string
  wide?: boolean
}

export function PortraitFrame({ children, index = 0, image, alt, wide }: PortraitFrameProps) {
  return (
    <motion.div
      className={`group relative ${wide ? "sm:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      {/* Outer frame */}
      <div className="relative rounded-lg border-2 border-[var(--frame-color)] bg-card p-1 transition-all duration-500 group-hover:border-[var(--frame-highlight)] group-hover:box-glow-hover box-glow">
        {/* Inner bevel */}
        <div className="overflow-hidden rounded border border-border/50">
          {/* Image if provided */}
          {image && (
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
              <Image
                src={image}
                alt={alt || ""}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
            </div>
          )}

          {/* Content plaque */}
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>

      {/* Frame shadow */}
      <div className="absolute -inset-1 -z-10 rounded-xl bg-black/20 blur-md" />
    </motion.div>
  )
}
