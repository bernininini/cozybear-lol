"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface LightSwitchProps {
  isLight: boolean
  onToggle: () => void
}

export function LightSwitch({ isLight, onToggle }: LightSwitchProps) {
  const [isPulled, setIsPulled] = useState(false)

  const handlePull = () => {
    setIsPulled(true)
    setTimeout(() => {
      setIsPulled(false)
      onToggle()
    }, 300)
  }

  return (
    <div className="fixed top-0 right-8 z-50 flex flex-col items-center">
      {/* Ceiling mount */}
      <div
        className="h-3 w-6 rounded-b-sm"
        style={{ backgroundColor: isLight ? "#888" : "#555" }}
      />

      {/* Cord */}
      <motion.div
        className="flex flex-col items-center cursor-pointer select-none"
        animate={{ y: isPulled ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        onClick={handlePull}
        whileHover={{ y: 4 }}
        role="button"
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        tabIndex={0}
      >
        {/* String */}
        <div
          className="w-[2px] transition-colors duration-500"
          style={{
            height: isPulled ? 56 : 40,
            backgroundColor: isLight ? "#999" : "#666",
          }}
        />

        {/* Bulb / pull handle */}
        <motion.div
          className="flex items-center justify-center rounded-full border-2 transition-all duration-500"
          style={{
            width: 28,
            height: 28,
            borderColor: isLight ? "#333" : "#aaa",
            backgroundColor: isLight ? "#fbbf24" : "#1a1a1a",
            boxShadow: isLight
              ? "0 0 16px 4px rgba(251,191,36,0.5)"
              : "0 0 8px 2px rgba(255,255,255,0.05)",
          }}
          animate={{
            scale: isPulled ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          {/* Light rays or dot */}
          <div
            className="rounded-full transition-all duration-500"
            style={{
              width: isLight ? 10 : 6,
              height: isLight ? 10 : 6,
              backgroundColor: isLight ? "#fff" : "#444",
            }}
          />
        </motion.div>

        {/* Small bead at bottom */}
        <div
          className="w-[2px] transition-colors duration-500"
          style={{
            height: 8,
            backgroundColor: isLight ? "#999" : "#666",
          }}
        />
        <div
          className="w-2 h-2 rounded-full transition-colors duration-500"
          style={{
            backgroundColor: isLight ? "#666" : "#444",
          }}
        />
      </motion.div>
    </div>
  )
}
