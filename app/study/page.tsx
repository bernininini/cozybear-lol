"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Minus, AtSign, X, ArrowLeft, ArrowRight, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function StudyPage() {
  // Timer state
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [studyLogs, setStudyLogs] = useState([])

  // Flashcard state
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [flashcards, setFlashcards] = useState([])
  const [showAddCard, setShowAddCard] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  // Initialize study logs from local storage
  useEffect(() => {
    const savedLogs = localStorage.getItem("studyLogs")
    if (savedLogs) {
      setStudyLogs(JSON.parse(savedLogs))
    }
    // Load flashcards
    const savedFlashcards = localStorage.getItem("flashcards")
    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards))
    }
  }, [])

  // Save logs to local storage when they change
  useEffect(() => {
    localStorage.setItem("studyLogs", JSON.stringify(studyLogs))
  }, [studyLogs])

  // Save flashcards to local storage when they change
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards))
  }, [flashcards])

  // Timer effect
  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 59) {
          setMinutes(minutes + 1)
          setSeconds(0)
        } else {
          setSeconds(seconds + 1)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, minutes, seconds])

  // Start/stop timer
  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false)
    setMinutes(0)
    setSeconds(0)
  }

  // Add a new study log
  const addStudyLog = () => {
    if (minutes === 0 && seconds === 0) return

    const now = new Date()
    const hours = Math.max(Math.round(((minutes + seconds / 60) / 60) * 10) / 10, 0.1) // Convert to hours with 1 decimal, minimum 0.1

    const newLog = {
      id: Date.now(),
      month: now.toLocaleString("default", { month: "short" }).toUpperCase(),
      day: now.getDate(),
      hours: hours,
    }

    setStudyLogs([newLog, ...studyLogs])
    resetTimer()
  }

  // Remove a study log
  const removeLog = (id) => {
    setStudyLogs(studyLogs.filter((log) => log.id !== id))
  }

  // Add a new flashcard
  const addFlashcard = () => {
    if (question.trim() && answer.trim()) {
      const newCard = {
        id: Date.now(),
        question,
        answer,
      }
      setFlashcards([...flashcards, newCard])
      setQuestion("")
      setAnswer("")
      setShowAddCard(false)
    }
  }

  // Delete a flashcard
  const deleteFlashcard = (id) => {
    const updatedCards = flashcards.filter((card) => card.id !== id)
    setFlashcards(updatedCards)
    if (activeCardIndex >= updatedCards.length && updatedCards.length > 0) {
      setActiveCardIndex(updatedCards.length - 1)
    }
    setIsFlipped(false)
  }

  // Navigate to next card
  const nextCard = () => {
    if (flashcards.length > 0) {
      setActiveCardIndex((activeCardIndex + 1) % flashcards.length)
      setIsFlipped(false)
    }
  }

  // Navigate to previous card
  const prevCard = () => {
    if (flashcards.length > 0) {
      setActiveCardIndex((activeCardIndex - 1 + flashcards.length) % flashcards.length)
      setIsFlipped(false)
    }
  }

  // Flip the current card
  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <main className="min-h-screen bg-[#e8dada] flex flex-col p-8">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button type="button" className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white">
            Back to Home
          </Button>
        </Link>
      </div>

      <h1 className="text-4xl font-medium text-[#6d4848] mt-12 mb-6 ml-4">study</h1>

      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {/* Timer */}
          <div className="bg-[#d8c0c0] rounded-3xl p-4 flex items-center justify-between">
            <button onClick={addStudyLog} className="text-[#6d4848] p-2" aria-label="Add study log">
              <Plus className="w-5 h-5" />
            </button>

            <div className="font-mono text-2xl text-[#6d4848]">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>

            <button
              onClick={toggleTimer}
              className="text-[#6d4848] p-2"
              aria-label={isRunning ? "Pause timer" : "Start timer"}
            >
              <AtSign className="w-5 h-5" />
            </button>
          </div>

          {/* Study Logs */}
          <div className="bg-[#d8c0c0] rounded-3xl p-4 flex-grow">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                <AnimatePresence>
                  {studyLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex-1">
                        <span className="text-white">
                          {log.month} - {log.day} - {log.hours}HR
                        </span>
                      </div>

                      <button onClick={() => removeLog(log.id)} className="text-white p-1" aria-label="Remove log">
                        <Minus className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right Column - Flashcards */}
        <div className="w-full md:w-2/3 bg-[#d8c0c0] rounded-3xl p-6">
          {!showFlashcards ? (
            <div className="w-full h-full flex items-center justify-center">
              <button
                onClick={() => setShowFlashcards(true)}
                className="text-[#6d4848] text-xl font-medium flex items-center"
              >
                <Plus className="w-6 h-6 mr-2" />
                FLASHCARDS
              </button>
            </div>
          ) : (
            <div className="w-full h-full">
              {flashcards.length > 0 ? (
                <div className="flex flex-col items-center">
                  {/* Flashcard */}
                  <div
                    className="w-full h-64 bg-white rounded-lg mb-4 flex items-center justify-center cursor-pointer relative"
                    onClick={flipCard}
                  >
                    <motion.div
                      className="absolute w-full h-full flex items-center justify-center p-6 text-center"
                      initial={false}
                      animate={{ rotateY: isFlipped ? 180 : 0, opacity: isFlipped ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-medium text-[#6d4848]">
                        {flashcards[activeCardIndex]?.question || "No question"}
                      </h3>
                    </motion.div>
                    <motion.div
                      className="absolute w-full h-full flex items-center justify-center p-6 text-center"
                      initial={{ rotateY: 180, opacity: 0 }}
                      animate={{ rotateY: isFlipped ? 0 : 180, opacity: isFlipped ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-lg text-[#6d4848]">{flashcards[activeCardIndex]?.answer || "No answer"}</p>
                    </motion.div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between w-full mb-4">
                    <button onClick={prevCard} className="text-[#6d4848] p-2" disabled={flashcards.length <= 1}>
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="text-sm text-[#6d4848]">
                      {activeCardIndex + 1} / {flashcards.length}
                    </div>
                    <button onClick={nextCard} className="text-[#6d4848] p-2" disabled={flashcards.length <= 1}>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddCard(true)}
                      className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Card
                    </button>
                    <button
                      onClick={() => deleteFlashcard(flashcards[activeCardIndex]?.id)}
                      className="bg-white hover:bg-[#e8dada] text-[#6d4848] px-4 py-2 rounded-md flex items-center"
                      disabled={flashcards.length === 0}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-white mb-4">No Flashcards Yet</h3>
                  <p className="text-white mb-6">Create your first flashcard to get started!</p>
                  <button
                    onClick={() => setShowAddCard(true)}
                    className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white px-4 py-2 rounded-md flex items-center mx-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Flashcard
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Flashcard Modal */}
      <AnimatePresence>
        {showAddCard && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddCard(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-8 w-full max-w-md mx-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#6d4848]">Add Flashcard</h2>
                <button onClick={() => setShowAddCard(false)} className="p-1 rounded-full hover:bg-gray-100">
                  <X size={24} className="text-[#6d4848]" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="question" className="text-[#6d4848]">
                    Question
                  </Label>
                  <Input
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter question..."
                    className="border-[#d8c0c0] focus:border-[#6d4848] focus:ring-[#6d4848]"
                  />
                </div>

                <div>
                  <Label htmlFor="answer" className="text-[#6d4848]">
                    Answer
                  </Label>
                  <Textarea
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter answer..."
                    rows={4}
                    className="border-[#d8c0c0] focus:border-[#6d4848] focus:ring-[#6d4848]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddCard(false)}
                    className="border-[#6d4848] text-[#6d4848]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addFlashcard}
                    className="bg-[#6d4848] hover:bg-[#5a3a3a]"
                    disabled={!question.trim() || !answer.trim()}
                  >
                    Add Card
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
