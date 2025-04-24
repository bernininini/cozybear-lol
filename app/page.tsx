"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock } from "lucide-react"

export default function Home() {
  const [showStudyPage, setShowStudyPage] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(0)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [popAnimationIndex, setPopAnimationIndex] = useState(null)

  const studyOptions = [
    { text: "study", duration: 15, label: "15 min" },
    { text: "study", duration: 30, label: "30 min" },
    { text: "study", duration: 45, label: "45 min" },
    { text: "study", duration: 60, label: "1 hour" },
  ]

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle study button click with pop animation
  const handleStudyClick = (index, duration) => {
    // Trigger pop animation
    setPopAnimationIndex(index)

    // Open timer after animation completes
    setTimeout(() => {
      setSelectedDuration(duration)
      setTime(duration * 60) // Convert minutes to seconds
      setIsRunning(false)
      setShowTimer(true)
      setPopAnimationIndex(null)
    }, 400) // Delay matches animation duration
  }

  // Start/pause timer
  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  // Reset timer
  const resetTimer = () => {
    setTime(selectedDuration * 60)
    setIsRunning(false)
  }

  // Timer effect
  useEffect(() => {
    let interval
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0 && isRunning) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, time])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-[#e8dada]">
      {!showStudyPage ? (
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-[#6d4848]">
            berni<span className="mx-1">🐨</span>bean
          </h1>
          <h2 className="text-xl md:text-2xl text-[#6d4848]">✨ berni bean koala bear ✨</h2>
          <Button
            type="button"
            onClick={() => setShowStudyPage(true)}
            className="mt-8 bg-[#6d4848] hover:bg-[#5a3a3a] text-white px-8 py-6 uppercase tracking-wider font-medium"
          >
            welcome to the stash
          </Button>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center">
          <div className="absolute top-4 left-4">
            <Button
              type="button"
              onClick={() => setShowStudyPage(false)}
              className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white"
            >
              Back to Home
            </Button>
          </div>

          <div className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-20">
            {studyOptions.map((option, index) => (
              <motion.div
                key={index}
                className="cursor-pointer text-4xl md:text-6xl font-bold relative group"
                onClick={() => handleStudyClick(index, option.duration)}
                whileHover={{
                  scale: 1.1,
                  rotate: [-1, 1, -1, 1, 0],
                  transition: {
                    duration: 0.3,
                    rotate: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
                  },
                }}
                animate={
                  popAnimationIndex === index
                    ? {
                        scale: [1, 1.3, 0.9, 1.1, 1],
                        transition: { duration: 0.4, times: [0, 0.2, 0.5, 0.8, 1] },
                      }
                    : {}
                }
              >
                {option.text}
                <motion.div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#6d4848] text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {option.label}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Timer Modal */}
          <AnimatePresence>
            {showTimer && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTimer(false)}
              >
                <motion.div
                  className="bg-white rounded-xl p-8 w-full max-w-md mx-4"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center">
                      <Clock className="mr-2" size={20} />
                      {selectedDuration === 60 ? "1 hour" : `${selectedDuration} min`} Timer
                    </h2>
                    <button onClick={() => setShowTimer(false)} className="p-1 rounded-full hover:bg-gray-100">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="text-center mb-8">
                    <div className="text-6xl font-mono font-bold mb-6">{formatTime(time)}</div>

                    <div className="flex justify-center gap-4">
                      <Button onClick={toggleTimer} className="bg-[#6d4848] hover:bg-[#5a3a3a] px-6">
                        {isRunning ? "Pause" : "Start"}
                      </Button>
                      <Button onClick={resetTimer} variant="outline" className="border-[#6d4848] text-[#6d4848] px-6">
                        Reset
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 text-center">
                    {time === 0 ? (
                      <span className="text-green-600 font-medium">Time's up! Great job!</span>
                    ) : (
                      <span>Focus on your task until the timer ends!</span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  )
}
