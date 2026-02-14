"use client"

import { MapPin, Thermometer, Music } from "lucide-react"
import { motion } from "framer-motion"

export function StatusFooter() {
  return (
    <motion.footer
      className="border-t border-border py-8 transition-colors duration-500"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-6 px-6 text-xs text-muted-foreground md:gap-10">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{"Chillin' in Edmonton"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="h-3.5 w-3.5" />
          <span>{"Probably cold outside"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Music className="h-3.5 w-3.5" />
          <span>{"Sabotage - Beastie Boys"}</span>
        </div>
        <div className="ml-auto text-muted-foreground/60">
          <span>{"Bernice Qiu"} &mdash; 2025</span>
        </div>
      </div>
    </motion.footer>
  )
}
