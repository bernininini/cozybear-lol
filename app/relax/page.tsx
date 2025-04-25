"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Coffee } from "lucide-react"

export default function RelaxPage() {
  return (
    <main className="min-h-screen bg-[#e8dada] flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button type="button" className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white">
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <Coffee className="w-16 h-16 mx-auto mb-4 text-[#6d4848]" />
          <h1 className="text-3xl font-bold text-[#6d4848] mb-4">Relaxation Zone</h1>
          <p className="text-lg text-[#6d4848] mb-6">Take a break and recharge. Your mind needs rest too.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-[#f5eeee] p-4 rounded-lg">
              <h3 className="font-medium text-[#6d4848] mb-2">Mood Today</h3>
              <p className="text-sm text-[#6d4848]">How are you feeling?</p>
            </div>

            <div className="bg-[#f5eeee] p-4 rounded-lg">
              <h3 className="font-medium text-[#6d4848] mb-2">Last Break</h3>
              <p className="text-sm text-[#6d4848]">No breaks recorded</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
