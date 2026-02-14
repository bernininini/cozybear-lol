"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef, type ReactNode } from "react"

interface PortraitFrameProps {
  children: ReactNode
  index?: number
  image?: string
  alt?: string
  wide?: boolean
  objectContain?: boolean
}

export function PortraitFrame({ children, index = 0, image, alt, wide, objectContain }: PortraitFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      className={`group relative ${wide ? "sm:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Outer frame - sharp edges */}
      <div className="relative border-2 border-[var(--frame-color)] bg-card p-1 transition-all duration-500 group-hover:border-[var(--frame-highlight)] group-hover:box-glow-hover box-glow">
        {/* Inner bevel - sharp edges */}
        <div className="overflow-hidden border border-border/50">
          {/* Image if provided */}
          {image && (
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
              <Image
                src={image}
                alt={alt || ""}
                fill
                className={`transition-transform duration-700 group-hover:scale-105 ${objectContain ? "object-contain p-4" : "object-cover"}`}
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
      <div className="absolute -inset-1 -z-10 bg-black/20 blur-md" />
    </motion.div>
  )
}
