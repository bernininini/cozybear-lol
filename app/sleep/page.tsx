"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Minus } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

export default function SleepPage() {
  const [duration, setDuration] = useState(6) // Default 6 hours
  const [sleepLogs, setSleepLogs] = useState([])
  const [currentDate, setCurrentDate] = useState("")
  const [logCount, setLogCount] = useState(1)
  const now = useMemo(() => {
    return new Date();
  }, []);

  // Initialize sleep logs from local storage
  useEffect(() => {
    const savedLogs = localStorage.getItem("sleepLogs")
    if (savedLogs) {
      setSleepLogs(JSON.parse(savedLogs))
      setLogCount(JSON.parse(savedLogs).length + 1)
    }

    // Set current date
    const now = new Date()
    setCurrentDate(`${now.toLocaleString("default", { month: "long" })} ${now.getDate()}`)
  }, [])

  // Save logs to local storage when they change
  useEffect(() => {
    localStorage.setItem("sleepLogs", JSON.stringify(sleepLogs))
  }, [sleepLogs])

  // Handle duration change
  const handleDurationChange = (value) => {
    setDuration(value[0])
  }

  // Add a new sleep log
  const addSleepLog = () => {
    const now = new Date()
    const newLog = {
      id: Date.now(),
      month: now.toLocaleString("default", { month: "short" }).toUpperCase(),
      day: now.getDate(),
      hours: duration,
    }
    setSleepLogs([newLog, ...sleepLogs])
    setLogCount(logCount + 1)
  }

  // Remove a sleep log
  const removeLog = (id) => {
    setSleepLogs(sleepLogs.filter((log) => log.id !== id))
  }

  // Calculate progress percentage based on duration (assuming 12 hours is 100%)
  const calculateProgress = (hours) => {
    return (hours / 12) * 100
  }

  return (
    <main className="min-h-screen bg-[#e8dada] flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button type="button" className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white">
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 mt-16">
        {/* Left Panel - Sleep Tracker */}
        <div className="w-full md:w-1/2 bg-[#b89a9a] rounded-3xl p-8 flex flex-col items-center">
          {/* Circular Progress */}
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#d8c0c0" strokeWidth="12" />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#6d4848"
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={(2 * Math.PI * 40 * (100 - calculateProgress(duration))) / 100}
                transform="rotate(-90 50 50)"
                initial={false}
                animate={{
                  strokeDashoffset: (2 * Math.PI * 40 * (100 - calculateProgress(duration))) / 100,
                }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            {/* Hours display in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-2xl font-medium text-white"
                key={duration}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {duration}HR
              </motion.span>
            </div>
          </div>

          {/* Slider */}
          <div className="w-full max-w-xs mb-12 sleep-slider">
            <Slider
              defaultValue={[duration]}
              value={[duration]}
              min={1}
              max={12}
              step={1}
              onValueChange={handleDurationChange}
            />
          </div>

          {/* Date Display */}
          <div className="text-center mb-8">
            <h2 className="text-5xl font-light text-[#d8c0c0]">
              <span className="font-normal">{now.toLocaleString("default", { month: "long" })}</span>
            </h2>
            <h3 className="text-5xl font-light text-white">
              <span className="text-[#6d4848]">{now.getDate()}</span>
            </h3>
          </div>

          {/* Add Sleep Log Button */}
          <button
            onClick={addSleepLog}
            className="w-full max-w-xs bg-[#e8dada] hover:bg-white text-[#6d4848] font-medium py-3 px-4 rounded-full transition-colors flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            sleeping log #{logCount}
          </button>
        </div>

        {/* Right Panel - Sleep Logs */}
        <div className="w-full md:w-1/2 bg-[#b89a9a] rounded-3xl p-6">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              <AnimatePresence>
                {sleepLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex-1 text-center">
                      <span className="text-white text-lg">
                        {log.month} - {log.day} - {log.hours}HR
                      </span>
                    </div>

                    <button
                      onClick={() => removeLog(log.id)}
                      className="w-8 h-8 flex items-center justify-center text-white"
                      aria-label="Remove log"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {sleepLogs.length === 0 && (
                <div className="text-center py-12 text-white text-opacity-70">
                  No sleep logs yet. Add your first log!
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </main>
  )
}
