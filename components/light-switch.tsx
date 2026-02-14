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
      {/* Ceiling mount plate */}
      <div
        className="h-4 w-8"
        style={{ backgroundColor: isLight ? "#777" : "#444" }}
      />

      {/* Wire to socket */}
      <div
        className="w-[2px] h-5 transition-colors duration-500"
        style={{ backgroundColor: isLight ? "#888" : "#555" }}
      />

      {/* Socket base */}
      <div
        className="w-7 h-3 transition-colors duration-500"
        style={{
          backgroundColor: isLight ? "#555" : "#333",
          borderLeft: "2px solid",
          borderRight: "2px solid",
          borderColor: isLight ? "#666" : "#444",
        }}
      />

      {/* Edison Bulb */}
      <motion.div
        className="relative cursor-pointer select-none flex flex-col items-center"
        animate={{ y: isPulled ? 12 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        onClick={handlePull}
        whileHover={{ y: 3 }}
        role="button"
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        tabIndex={0}
      >
        {/* Bulb glass shape */}
        <svg width="52" height="72" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glass bulb outline */}
          <path
            d="M18 0 C18 0 16 2 16 4 L16 18 C16 18 4 24 4 40 C4 52 12 62 20 66 L20 72 L32 72 L32 66 C40 62 48 52 48 40 C48 24 36 18 36 18 L36 4 C36 2 34 0 34 0 Z"
            fill={isLight ? "rgba(255,220,120,0.15)" : "rgba(255,255,255,0.04)"}
            stroke={isLight ? "rgba(200,170,80,0.5)" : "rgba(255,255,255,0.12)"}
            strokeWidth="1"
          />

          {/* Spiral filament */}
          <motion.path
            d="M24 58 C20 54 22 48 26 46 C30 44 28 38 24 36 C20 34 22 28 26 26 C30 24 28 18 24 16 C22 14 26 10 28 12"
            fill="none"
            stroke={isLight ? "#f59e0b" : "#555"}
            strokeWidth={isLight ? "2.5" : "1.5"}
            strokeLinecap="round"
            style={{
              filter: isLight
                ? "drop-shadow(0 0 4px rgba(245,158,11,0.8)) drop-shadow(0 0 12px rgba(245,158,11,0.4))"
                : "none",
            }}
            animate={{
              opacity: isLight ? [0.7, 1, 0.7] : 0.4,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Second filament strand */}
          <motion.path
            d="M28 58 C32 54 30 48 26 46 C22 44 24 38 28 36 C32 34 30 28 26 26 C22 24 24 18 28 16 C30 14 26 10 24 12"
            fill="none"
            stroke={isLight ? "#fbbf24" : "#444"}
            strokeWidth={isLight ? "2" : "1"}
            strokeLinecap="round"
            style={{
              filter: isLight
                ? "drop-shadow(0 0 3px rgba(251,191,36,0.6)) drop-shadow(0 0 8px rgba(251,191,36,0.3))"
                : "none",
            }}
            animate={{
              opacity: isLight ? [0.6, 0.9, 0.6] : 0.3,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />

          {/* Bulb glow overlay when lit */}
          {isLight && (
            <motion.ellipse
              cx="26"
              cy="38"
              rx="14"
              ry="18"
              fill="rgba(251,191,36,0.08)"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Screw base lines */}
          <line x1="20" y1="64" x2="32" y2="64" stroke={isLight ? "#666" : "#444"} strokeWidth="1" />
          <line x1="20" y1="67" x2="32" y2="67" stroke={isLight ? "#666" : "#444"} strokeWidth="1" />
          <line x1="20" y1="70" x2="32" y2="70" stroke={isLight ? "#666" : "#444"} strokeWidth="1" />
        </svg>

        {/* Overall glow effect when lit */}
        {isLight && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center 45%, rgba(251,191,36,0.25) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {/* Pull cord below bulb */}
      <motion.div
        className="flex flex-col items-center cursor-pointer select-none"
        animate={{ y: isPulled ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        onClick={handlePull}
      >
        <div
          className="w-[1px] transition-colors duration-500"
          style={{
            height: 28,
            backgroundColor: isLight ? "#999" : "#555",
          }}
        />
        <div
          className="w-2 h-2"
          style={{ backgroundColor: isLight ? "#a08868" : "#444" }}
        />
      </motion.div>
    </div>
  )
}
