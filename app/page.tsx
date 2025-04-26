"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

// Component for fixed position koala emojis
const FixedKoala = ({ position }) => {
  return (
    <motion.div
      className="absolute text-2xl cursor-pointer z-10"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: position.delay }}
      whileHover={{
        scale: 1.5,
        transition: { duration: 0.3 },
      }}
    >
      🐨
    </motion.div>
  )
}

export default function Home() {
  const router = useRouter()
  const [koalaPositions, setKoalaPositions] = useState([])

  // Generate koala positions in a more structured way
  useEffect(() => {
    // Create a grid of positions
    const positions = [
      { x: 10, y: 15, delay: 0.1 },
      { x: 20, y: 85, delay: 0.2 },
      { x: 30, y: 40, delay: 0.3 },
      { x: 40, y: 65, delay: 0.4 },
      { x: 50, y: 25, delay: 0.5 },
      { x: 60, y: 75, delay: 0.6 },
      { x: 70, y: 35, delay: 0.7 },
      { x: 80, y: 60, delay: 0.8 },
      { x: 90, y: 20, delay: 0.9 },
      { x: 15, y: 50, delay: 1.0 },
      { x: 25, y: 10, delay: 1.1 },
      { x: 35, y: 90, delay: 1.2 },
      { x: 45, y: 30, delay: 1.3 },
      { x: 55, y: 70, delay: 1.4 },
      { x: 65, y: 15, delay: 1.5 },
      { x: 75, y: 45, delay: 1.6 },
      { x: 85, y: 80, delay: 1.7 },
      { x: 95, y: 55, delay: 1.8 },
    ]
    setKoalaPositions(positions)
  }, [])

  return (
    <main className="min-h-screen bg-[#f0ece8] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fixed position koalas */}
      {koalaPositions.map((position, index) => (
        <FixedKoala key={index} position={position} />
      ))}

      {/* Main content */}
      <div className="z-20 flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col md:flex-row items-center justify-between w-full px-8 mb-16 mt-8 md:mt-0 md:absolute md:top-[15%]">
          <motion.div
            className="text-5xl md:text-7xl font-bold text-black mx-8 cursor-pointer"
            whileHover={{
              scale: 1.1,
              color: "#6d4848",
              rotate: [-1, 1, -1, 1, 0],
              transition: {
                duration: 0.3,
                rotate: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
              },
            }}
            onClick={() => router.push("/cozy")}
          >
            cozy bear
          </motion.div>

          <motion.div
            className="text-5xl md:text-7xl font-bold text-black mx-8 cursor-pointer mt-4 md:mt-0"
            whileHover={{
              scale: 1.1,
              color: "#6d4848",
              rotate: [-1, 1, -1, 1, 0],
              transition: {
                duration: 0.3,
                rotate: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
              },
            }}
            onClick={() => router.push("/bean")}
          >
            bean
          </motion.div>
        </div>

        <motion.div
          className="text-6xl md:text-9xl font-black text-black mb-4 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1 },
          }}
          onClick={() => {
            // Pop animation
            const element = document.getElementById("berni-text")
            if (element) {
              element.animate(
                [
                  { transform: "scale(1)" },
                  { transform: "scale(1.2)" },
                  { transform: "scale(0.9)" },
                  { transform: "scale(1.1)" },
                  { transform: "scale(1)" },
                ],
                { duration: 500, easing: "ease-in-out" },
              )
            }
          }}
          id="berni-text"
        >
          berni bean
        </motion.div>

        <motion.div
          className="text-xl md:text-2xl text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{
            letterSpacing: "0.1em",
            transition: { duration: 0.3 },
          }}
        >
          Køålå Beå®
        </motion.div>
      </div>
    </main>
  )
}
