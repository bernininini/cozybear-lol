"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function BeanPage() {
  const [beans, setBeansCount] = useState(0)
  const [message, setMessage] = useState("")

  // Increment bean count
  const incrementBeans = () => {
    setBeansCount(beans + 1)

    // Update message based on bean count
    if (beans + 1 >= 10) {
      setMessage("Bean collector extraordinaire!")
    } else if (beans + 1 >= 5) {
      setMessage("You're getting quite a collection!")
    } else if (beans + 1 >= 1) {
      setMessage("First bean collected!")
    }
  }

  return (
    <main className="min-h-screen bg-[#f0ece8] flex flex-col items-center justify-center p-8">
      <div className="absolute top-4 left-4">
        <motion.button
          className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white px-4 py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
        >
          Back
        </motion.button>
      </div>

      <motion.h1
        className="text-5xl md:text-7xl font-bold text-[#6d4848] mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Bean Collection
      </motion.h1>

      <motion.div
        className="text-9xl mb-12 cursor-pointer"
        whileHover={{
          scale: 1.2,
          rotate: 10,
          transition: { duration: 0.3 },
        }}
        whileTap={{
          scale: 0.9,
          rotate: -10,
          transition: { duration: 0.2 },
        }}
        onClick={incrementBeans}
      >
        🫘
      </motion.div>

      <motion.div
        className="text-2xl font-medium text-[#6d4848] mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Beans collected: {beans}
      </motion.div>

      {message && (
        <motion.div
          className="text-xl text-[#6d4848]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.div>
      )}

      <motion.div
        className="mt-16 max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-[#6d4848]">
          Click the bean to collect more beans. What do they do? Nothing! But it's fun to collect them.
        </p>
      </motion.div>
    </main>
  )
}
