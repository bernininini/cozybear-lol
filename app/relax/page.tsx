"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Coffee, SmilePlus, Smile, MinusIcon as SmileMinus } from "lucide-react"
import { motion } from "framer-motion"
import { format } from "date-fns"

export default function RelaxPage() {
  const [books, setBooksCount] = useState(0)
  const [message, setMessage] = useState("")
  const [lastBreak, setLastBreak] = useState("No breaks recorded")
  const [selectedMood, setSelectedMood] = useState(null)

  // Load data from local storage
  useEffect(() => {
    // Load books count
    const savedBooks = localStorage.getItem("relaxBooks")
    if (savedBooks) {
      setBooksCount(Number.parseInt(savedBooks, 10))
      updateMessage(Number.parseInt(savedBooks, 10))
    }

    // Load selected mood
    const savedMood = localStorage.getItem("relaxMood")
    if (savedMood) {
      setSelectedMood(savedMood)
    }

    // Record current visit as last break
    const now = new Date()
    const formattedDate = format(now, "MMM d, yyyy '@' h:mm a")
    setLastBreak(formattedDate)
    localStorage.setItem("lastBreakTime", formattedDate)

    // Load previous last break time if it exists
    const previousBreak = localStorage.getItem("lastBreakTime")
    if (previousBreak) {
      setLastBreak(previousBreak)
    }
  }, [])

  // Save books count to local storage when it changes
  useEffect(() => {
    localStorage.setItem("relaxBooks", books.toString())
  }, [books])

  // Save selected mood to local storage when it changes
  useEffect(() => {
    if (selectedMood) {
      localStorage.setItem("relaxMood", selectedMood)
    }
  }, [selectedMood])

  // Update message based on book count
  const updateMessage = (count) => {
    if (count >= 20) {
      setMessage("You're a literary genius!")
    } else if (count >= 10) {
      setMessage("What a wonderful collection!")
    } else if (count >= 5) {
      setMessage("You're becoming quite the reader!")
    } else if (count >= 1) {
      setMessage("First book collected!")
    } else {
      setMessage("")
    }
  }

  // Increment book count
  const incrementBooks = () => {
    const newCount = books + 1
    setBooksCount(newCount)
    updateMessage(newCount)
  }

  // Select mood
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
  }

  // Render mood icon based on selection
  const renderMoodIcon = (mood, icon) => {
    const isSelected = selectedMood === mood
    return (
      <motion.div
        className={`cursor-pointer p-3 rounded-full transition-colors ${
          isSelected ? "bg-[#6d4848] text-white" : "text-[#6d4848] hover:bg-[#f5eeee]"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleMoodSelect(mood)}
      >
        {icon}
      </motion.div>
    )
  }

  return (
    <main className="min-h-screen bg-[#e8dada] flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Button
          type="button"
          className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <Coffee className="w-16 h-16 mx-auto mb-4 text-[#6d4848]" />
          <h1 className="text-3xl font-bold text-[#6d4848] mb-4">Relaxation Zone</h1>
          <p className="text-lg text-[#6d4848] mb-6">Take a break and recharge. Your mind needs rest too.</p>

          <div className="flex flex-col items-center justify-center my-8">
            <motion.div
              className="text-9xl mb-6 cursor-pointer"
              whileHover={{
                scale: 1.2,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
              whileTap={{
                scale: 0.9,
                rotate: -5,
                transition: { duration: 0.2 },
              }}
              onClick={incrementBooks}
            >
              📚
            </motion.div>

            <motion.div
              className="text-2xl font-medium text-[#6d4848] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Books collected: {books}
            </motion.div>

            {message && (
              <motion.div
                className="text-xl text-[#6d4848]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={message}
                transition={{ duration: 0.5 }}
              >
                {message}
              </motion.div>
            )}

            <motion.p
              className="mt-4 text-sm text-[#6d4848] max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Click the books to grow your collection. Reading is a wonderful way to relax!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-[#f5eeee] p-4 rounded-lg">
              <h3 className="font-medium text-[#6d4848] mb-4">Mood Today</h3>
              <div className="flex justify-center space-x-4">
                {renderMoodIcon("happy", <SmilePlus size={32} />)}
                {renderMoodIcon("neutral", <Smile size={32} />)}
                {renderMoodIcon("sad", <SmileMinus size={32} />)}
              </div>
              <p className="text-sm text-[#6d4848] mt-3">
                {selectedMood
                  ? `You're feeling ${selectedMood === "happy" ? "great" : selectedMood === "neutral" ? "okay" : "down"} today.`
                  : "How are you feeling?"}
              </p>
            </div>

            <div className="bg-[#f5eeee] p-4 rounded-lg">
              <h3 className="font-medium text-[#6d4848] mb-2">Last Break</h3>
              <p className="text-sm text-[#6d4848]">{lastBreak}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
