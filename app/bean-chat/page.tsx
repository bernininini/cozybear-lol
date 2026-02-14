"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Loader2 } from "lucide-react"

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export default function BeanChatPage() {
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/bean-chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleQuickPrompt = (prompt: string) => {
    if (isLoading) return
    sendMessage({ text: prompt })
  }

  return (
    <main className="min-h-screen bg-[#e8dada] flex flex-col">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <motion.button
          className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white px-4 py-2 rounded-lg text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
        >
          Back
        </motion.button>
      </div>

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4 pt-16">
        {/* Header */}
        <motion.div
          className="bg-[#d8c0c0] rounded-t-3xl p-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-1">
            <Bot className="w-7 h-7 mr-2 text-[#6d4848]" />
            <h1 className="text-3xl font-bold text-[#6d4848]">bean</h1>
          </div>
          <p className="text-[#6d4848]/70 text-sm">your calculus buddy</p>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 bg-[#f5eeee] border-x-4 border-[#d8c0c0] overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
          <div className="p-6 space-y-4">
            {messages.length === 0 && (
              <motion.div
                className="text-center py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-5xl mb-3">🧮</div>
                <h3 className="text-lg font-medium text-[#6d4848] mb-1">Hi! I'm bean, your calculus buddy</h3>
                <p className="text-[#6d4848]/60 text-sm max-w-sm mx-auto mb-6">
                  Ask me anything about limits, derivatives, integrals, and more!
                </p>
                <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                  {[
                    "Explain the chain rule",
                    "How do I find limits?",
                    "Help me with integrals",
                    "What is a derivative?",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="border border-[#6d4848] text-[#6d4848] rounded-lg px-3 py-2 text-sm hover:bg-[#6d4848] hover:text-white transition-colors"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((message) => {
                const text = getMessageText(message)
                if (!text) return null

                return (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-[#6d4848] text-white"
                          : "bg-[#f5eeee] text-[#6d4848] border-2 border-[#d8c0c0]"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.role === "assistant" && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                        {message.role === "user" && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{text}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-[#f5eeee] text-[#6d4848] border-2 border-[#d8c0c0] rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">bean is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input */}
        <motion.div
          className="bg-[#d8c0c0] rounded-b-3xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about calculus..."
              className="flex-1 border-2 border-white bg-white text-[#6d4848] placeholder:text-[#6d4848]/50 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#6d4848]"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#6d4848] hover:bg-[#5a3a3a] disabled:opacity-50 text-white rounded-lg px-5 py-2 transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
          <p className="text-xs text-[#6d4848]/50 mt-2 text-center">
            Powered by Gemini
          </p>
        </motion.div>
      </div>
    </main>
  )
}
