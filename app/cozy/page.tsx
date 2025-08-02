"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Moon, Coffee, MessageCircle } from "lucide-react"

export default function CozyPage() {
  const [showTabs, setShowTabs] = useState(false)

  const tabs = [
    { name: "study", icon: <BookOpen className="w-5 h-5 mr-2" />, href: "/study" },
    { name: "chat", icon: <MessageCircle className="w-5 h-5 mr-2" />, href: "/chat" },
    { name: "sleep", icon: <Moon className="w-5 h-5 mr-2" />, href: "/sleep" },
    { name: "relax", icon: <Coffee className="w-5 h-5 mr-2" />, href: "/relax" },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-[#e8dada]">
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

      <div className="flex flex-col items-center justify-center space-y-8">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-center text-[#6d4848]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          cozy<span className="mx-1">🐨</span>bear
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl text-[#6d4848]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          🖤 berni bean koala bear 🖤
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            type="button"
            onClick={() => setShowTabs(!showTabs)}
            className="mt-8 bg-[#6d4848] hover:bg-[#5a3a3a] text-white px-8 py-6 uppercase tracking-wider font-medium"
          >
            welcome to the stash
          </Button>
        </motion.div>

        <AnimatePresence>
          {showTabs && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md justify-center"
            >
              {tabs.map((tab) => (
                <Link href={tab.href} key={tab.name}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center cursor-pointer text-[#6d4848] font-medium capitalize hover:bg-[#f5eeee] transition-colors"
                  >
                    {tab.icon}
                    {tab.name}
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
