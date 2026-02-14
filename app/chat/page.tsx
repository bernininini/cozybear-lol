"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Loader2, Bold, Italic, Underline, FileText } from "lucide-react"
import Link from "next/link"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const notesRef = useRef<HTMLDivElement>(null)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("beanNotes")
    if (savedNotes) {
      setNotes(savedNotes)
      if (notesRef.current) {
        notesRef.current.innerHTML = savedNotes
      }
    }
  }, [])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("beanNotes", notes)
  }, [notes])

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.message) {
        setMessages([...newMessages, { role: "assistant", content: data.message }])
      } else {
        throw new Error("No message in response")
      }
    } catch (error) {
      console.error("Error:", error)
      const fallbackMessage =
        "🐨 I'm having a little trouble connecting right now, but I'm still here to help! Ask me anything and I'll do my best to assist you! ✨"
      setMessages([...newMessages, { role: "assistant", content: fallbackMessage }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
    setTimeout(() => {
      const submitEvent = new Event("submit", { cancelable: true, bubbles: true })
      const form = document.querySelector("form")
      if (form) {
        form.dispatchEvent(submitEvent)
      }
    }, 50)
  }

  // Text formatting functions
  const formatText = (command: string) => {
    document.execCommand(command, false, "")
    if (notesRef.current) {
      setNotes(notesRef.current.innerHTML)
    }
  }

  const handleNotesInput = () => {
    if (notesRef.current) {
      setNotes(notesRef.current.innerHTML)
    }
  }

  return (
    <main className="min-h-screen bg-[#e8dada] flex flex-col p-4">
      <div className="absolute top-4 left-4">
        <Button
          type="button"
          className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>

      <div className="absolute top-4 right-4">
        <Link href="/notes">
          <Button type="button" className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Notes Page
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex gap-4 max-w-7xl mx-auto w-full mt-16">
        {/* Left Side - Chat */}
        <div className="flex-1 flex flex-col">
          <motion.div
            className="bg-[#d8c0c0] rounded-t-3xl p-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Bot className="w-8 h-8 mr-3 text-[#6d4848]" />
              <h1 className="text-3xl font-bold text-[#6d4848]">bean</h1>
            </div>
            <p className="text-[#6d4848] opacity-80">your helpful assistant 🐨</p>
          </motion.div>

          {/* Chat Messages */}
          <div className="flex-1 bg-[#f5eeee] rounded-none border-x-4 border-[#d8c0c0]">
            <ScrollArea className="h-[500px] p-6">
              <div className="space-y-4" ref={scrollAreaRef}>
                {messages.length === 0 && (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="text-6xl mb-4">🐨</div>
                    <h3 className="text-xl font-medium text-[#6d4848] mb-2">Hi! I'm bean</h3>
                    <p className="text-[#6d4848] opacity-70 max-w-md mx-auto">
                      I'm here to help with anything you need - studying, questions, coding, or just chatting!
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
                      <Button
                        variant="outline"
                        className="border-[#6d4848] text-[#6d4848] hover:bg-[#6d4848] hover:text-white bg-transparent"
                        onClick={() => handleQuickPrompt("Help me understand a concept")}
                      >
                        Explain something
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#6d4848] text-[#6d4848] hover:bg-[#6d4848] hover:text-white bg-transparent"
                        onClick={() => handleQuickPrompt("Help me with coding")}
                      >
                        Coding help
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#6d4848] text-[#6d4848] hover:bg-[#6d4848] hover:text-white bg-transparent"
                        onClick={() => handleQuickPrompt("Give me study tips")}
                      >
                        Study tips
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#6d4848] text-[#6d4848] hover:bg-[#6d4848] hover:text-white bg-transparent"
                        onClick={() => handleQuickPrompt("Let's just chat")}
                      >
                        Just chat
                      </Button>
                    </div>
                  </motion.div>
                )}

                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          message.role === "user"
                            ? "bg-[#6d4848] text-white"
                            : "bg-[#f5eeee] text-[#6d4848] border-2 border-[#d8c0c0]"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.role === "assistant" && <Bot className="w-5 h-5 mt-1 flex-shrink-0" />}
                          {message.role === "user" && <User className="w-5 h-5 mt-1 flex-shrink-0" />}
                          <div className="flex-1">
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-[#f5eeee] text-[#6d4848] border-2 border-[#d8c0c0] rounded-2xl p-4">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5" />
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>bean is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Input */}
          <motion.div
            className="bg-[#d8c0c0] rounded-b-3xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 border-2 border-white bg-white text-[#6d4848] placeholder:text-[#6d4848]/60 focus:border-[#6d4848] focus:ring-[#6d4848]"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white px-6"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
            <p className="text-xs text-[#6d4848] opacity-60 mt-2 text-center">
              Press Enter to send • bean is here to help! 🐨
            </p>
          </motion.div>
        </div>

        {/* Right Side - Notepad */}
        <div className="flex-1 flex flex-col">
          <motion.div
            className="bg-[#d8c0c0] rounded-t-3xl p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#6d4848]">Notes</h2>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-[#6d4848] text-[#6d4848] hover:bg-[#6d4848] hover:text-white bg-transparent"
                  onClick={() => formatText("bold")}
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-[#6d4848] text-[#6d4848] hover:bg-[#6d4848] hover:text-white bg-transparent"
                  onClick={() => formatText("italic")}
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-[#6d4848] text-[#6d4848] hover:bg-[#6d4848] hover:text-white bg-transparent"
                  onClick={() => formatText("underline")}
                >
                  <Underline className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 bg-white border-x-4 border-[#d8c0c0] rounded-b-3xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ScrollArea className="h-[580px]">
              <div
                ref={notesRef}
                contentEditable
                onInput={handleNotesInput}
                className="w-full p-6 outline-none text-[#6d4848] min-h-[580px] leading-relaxed"
                style={{ wordWrap: "break-word" }}
                suppressContentEditableWarning={true}
                placeholder="Start taking notes here... You can use the formatting buttons above!"
              />
            </ScrollArea>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
