"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { User, MapPin, Award, Briefcase, FileText, Code } from "lucide-react"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#f0ece8] flex flex-col items-center p-8">
      <div className="absolute top-4 left-4">
        <Button
          type="button"
          className="bg-[#6d4848] hover:bg-[#5a3a3a] text-white"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>

      <div className="w-full max-w-4xl mt-16">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8 space-y-6 md:space-y-0">
            <motion.div
              className="w-32 h-32 bg-[#6d4848] rounded-full flex items-center justify-center text-6xl"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              🐨
            </motion.div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-[#6d4848] mb-2">BERNICE QIU</h1>
              <p className="text-xl text-[#6d4848] flex items-center justify-center md:justify-start mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                Toronto, Canada 🇨🇦
              </p>
              <div className="bg-[#f5eeee] p-4 rounded-lg">
                <p className="text-[#6d4848] italic">"Code by day, ski by weekend 💻🎿❤️"</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-[#6d4848] mb-6 flex items-center">
            <Code className="w-6 h-6 mr-2" />
            Skills & Technologies
          </h2>

          {/* Programming Languages */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#6d4848] mb-3">Programming Languages</h3>
            <div className="flex flex-wrap gap-3">
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">🐍</span>
                <span className="font-medium">Python</span>
              </motion.div>
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">✨</span>
                <span className="font-medium">C</span>
              </motion.div>
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">✚</span>
                <span className="font-medium">C++</span>
              </motion.div>
            </div>
          </div>

          {/* Design & CAD */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#6d4848] mb-3">Design & CAD</h3>
            <div className="flex flex-wrap gap-3">
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">📐</span>
                <span className="font-medium">AutoCAD</span>
              </motion.div>
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">🔮</span>
                <span className="font-medium">Fusion 360</span>
              </motion.div>
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">⚡</span>
                <span className="font-medium">KiCad</span>
              </motion.div>
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">🎨</span>
                <span className="font-medium">Design</span>
              </motion.div>
            </div>
          </div>

          {/* Video & Media */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#6d4848] mb-3">Video & Media</h3>
            <div className="flex flex-wrap gap-3">
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">🎬</span>
                <span className="font-medium">Final Cut Pro</span>
              </motion.div>
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">🎥</span>
                <span className="font-medium">iMovie</span>
              </motion.div>
            </div>
          </div>

          {/* Adobe Creative Suite */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#6d4848] mb-3">Adobe Creative Suite</h3>
            <div className="flex flex-wrap gap-3">
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">✨</span>
                <span className="font-medium">Adobe Express</span>
              </motion.div>
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">🖼️</span>
                <span className="font-medium">Adobe Photoshop</span>
              </motion.div>
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-lg font-semibold text-[#6d4848] mb-3">Professional Skills</h3>
            <div className="flex flex-wrap gap-3">
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">🎿</span>
                <span className="font-medium">Skiing Instruting</span>
              </motion.div>
              <motion.div
                className="bg-[#f5eeee] px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: "#6d4848", color: "white" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl mr-2">🚑</span>
                <span className="font-medium">CPR/FIRST AID</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Hobbies Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[#6d4848] mb-6 flex items-center">
            <User className="w-6 h-6 mr-2" />
            Hobbies & Interests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-3">🎿</div>
              <h3 className="text-xl font-bold text-[#6d4848]">Skiing</h3>
              <p className="text-[#6d4848]">Passionate about hitting the slopes!</p>
            </motion.div>
            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-bold text-[#6d4848]">Learning</h3>
              <p className="text-[#6d4848]">Always exploring new knowledge</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-[#6d4848] mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🚑</div>
                <h3 className="text-lg font-bold text-[#6d4848]">CPR First Aid</h3>
              </div>
              <p className="text-[#6d4848]">Certified in emergency response and life-saving techniques</p>
            </motion.div>
            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🎿</div>
                <h3 className="text-lg font-bold text-[#6d4848]">CSIA Level 1</h3>
              </div>
              <p className="text-[#6d4848]">Canadian Ski Instructors' Alliance certification</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Work Experience Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#6d4848] mb-6 flex items-center">
            <Briefcase className="w-6 h-6 mr-2" />
            Work Experience
          </h2>
          <div className="space-y-6">
            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">👨‍🏫</div>
                <h3 className="text-lg font-bold text-[#6d4848]">Tutor</h3>
              </div>
              <p className="text-[#6d4848]">Providing personalized learning support and academic guidance</p>
            </motion.div>
            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🎓</div>
                <h3 className="text-lg font-bold text-[#6d4848]">Assistant Teaching</h3>
              </div>
              <p className="text-[#6d4848]">Supporting classroom instruction and student development</p>
            </motion.div>
            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">⛷️</div>
                <h3 className="text-lg font-bold text-[#6d4848]">Skiing Instructor Assistant</h3>
              </div>
              <p className="text-[#6d4848]">Helping others discover the joy of skiing on the slopes</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-[#6d4848] mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2" />
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🥉</div>
                <h3 className="text-lg font-bold text-[#6d4848]">3rd Place - Scrapyard Toronto</h3>
              </div>
              <p className="text-[#6d4848]">Bronze medal achievement in competitive hackathon</p>
            </motion.div>

            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🥈</div>
                <h3 className="text-lg font-bold text-[#6d4848]">2nd Place - Hack the Ridge</h3>
              </div>
              <p className="text-[#6d4848]">Silver medal in innovative technology competition</p>
            </motion.div>

            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🤖</div>
                <h3 className="text-lg font-bold text-[#6d4848]">Gen AI Award - UTRA Hacks</h3>
              </div>
              <p className="text-[#6d4848]">Recognition for excellence in AI innovation</p>
            </motion.div>

            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🏆</div>
                <h3 className="text-lg font-bold text-[#6d4848]">Top 10 - Undercity</h3>
              </div>
              <p className="text-[#6d4848]">Elite performance in competitive programming</p>
            </motion.div>

            <motion.div
              className="bg-[#f5eeee] p-6 rounded-xl md:col-span-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🎖️</div>
                <h3 className="text-lg font-bold text-[#6d4848]">CCC Distinction - Top 25%</h3>
              </div>
              <p className="text-[#6d4848]">Canadian Computing Competition distinction for outstanding performance</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
