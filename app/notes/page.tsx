"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Bold, Italic, Underline, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function NotesPage() {
  const [notes, setNotes] = useState("")
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

  const clearNotes = () => {
    if (notesRef.current) {
      notesRef.current.innerHTML = ""
      setNotes("")
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
        <Link href="/chat">
          <Button type="button" className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat with bean
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full mt-16">
        <motion.div
          className="bg-[#d8c0c0] rounded-t-3xl p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#6d4848] mb-2">My Notes</h1>
              <p className="text-[#6d4848] opacity-80">Synced with your chat sessions 📝</p>
            </div>
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
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={clearNotes}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Clear
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 bg-white border-x-4 border-b-4 border-[#d8c0c0] rounded-b-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            ref={notesRef}
            contentEditable
            onInput={handleNotesInput}
            className="w-full h-full p-8 outline-none text-[#6d4848] min-h-[600px] leading-relaxed text-lg"
            style={{ wordWrap: "break-word" }}
            suppressContentEditableWarning={true}
            placeholder="Start taking notes here... You can use the formatting buttons above!"
          />

          {notes === "" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-[#6d4848] opacity-50">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-xl">Start taking notes here...</p>
                <p className="text-sm mt-2">Your notes sync automatically with the chat page!</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
