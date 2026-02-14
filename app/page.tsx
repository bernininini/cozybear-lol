"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LightSwitch } from "@/components/light-switch"
import { ProjectCard } from "@/components/project-card"
import { StatusFooter } from "@/components/status-footer"
import { Github, Linkedin, Mail } from "lucide-react"

const projects = [
  {
    title: "BayLee",
    description:
      "AI-powered health assistant robot. Built with Python, Vercel AI SDK, Redis microservices, and OpenAI Whisper for voice control.",
    tags: ["Python", "AI SDK", "Redis", "Whisper"],
    image: "/images/project-baylee.jpg",
    link: "#",
  },
  {
    title: "Snow Pea",
    description:
      "Top 10 finalist at Hack Club Undercity. Integrated hardware and software systems with collaborative GitHub workflows.",
    tags: ["Hardware", "Full Stack", "GitHub"],
    image: "/images/project-snowpea.jpg",
    link: "#",
  },
  {
    title: "Neo=Alert",
    description:
      "Medical alert platform using a custom ML model to detect bradycardia in infants. 2nd Place at Hack The Ridge.",
    tags: ["Machine Learning", "Healthcare", "Python"],
    image: "/images/project-neoalert.jpg",
    link: "#",
  },
  {
    title: "Bean Cake",
    description:
      "High-speed tank-drive spy robot with real-time camera streaming. Chassis designed in Fusion 360, powered by ESP32 and Arduino.",
    tags: ["ESP32", "Arduino", "Fusion 360", "Robotics"],
    image: "/images/project-beancake.jpg",
    link: "#",
  },
]

const links = [
  {
    label: "GitHub",
    href: "https://github.com/bernininini",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/bernice-qiu",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:berniceqiu31@gmail.com",
    icon: Mail,
  },
]

export default function Home() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
    }
  }, [isLight])

  return (
    <div className="relative min-h-screen transition-colors duration-500">
      <LightSwitch isLight={isLight} onToggle={() => setIsLight((p) => !p)} />

      {/* Hero */}
      <header className="mx-auto flex min-h-[85vh] max-w-5xl flex-col justify-center px-6 py-20">
        <motion.p
          className="mb-4 text-sm uppercase tracking-widest text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Making ideas click
        </motion.p>

        <motion.h1
          className="font-serif text-5xl font-black leading-tight text-foreground sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-balance">
            Bernice Qiu
          </span>
        </motion.h1>

        <motion.p
          className="mt-2 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          CS Student @ UAlberta &mdash; transferring to UofT 2029
        </motion.p>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {"I'm Bernice (but you can call me "}
          <span className="font-serif italic">Berni</span>
          {" or "}
          <span className="font-serif italic">Bean</span>
          {"). I'm obsessed with CS, cool UI, and live event AV tech. I build robots, win hackathons, and teach people things along the way."}
        </motion.p>

        {/* Links */}
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-300 hover:border-foreground/30 hover:text-foreground"
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        {/* Skills ticker */}
        <motion.div
          className="mt-12 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            "C++",
            "Python",
            "Arduino",
            "ESP32",
            "AutoCAD",
            "Fusion 360",
            "KiCad",
            "Final Cut Pro",
            "Adobe PS",
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors duration-500 hover:border-foreground/30 hover:text-foreground"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </header>

      {/* Project Gallery - visible in light mode */}
      <AnimatePresence>
        {isLight && (
          <motion.section
            className="mx-auto max-w-5xl px-6 pb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-2 font-serif text-3xl font-bold text-foreground">
              Project Gallery
            </h2>
            <p className="mb-10 text-sm text-muted-foreground">
              A few things I have built and shipped.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project, i) => (
                <ProjectCard key={project.title} {...project} index={i} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Awards & Experience - always visible */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <motion.h2
          className="mb-8 font-serif text-3xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Awards & Recognition
        </motion.h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              award: "Gen AI Award",
              event: "UTRA Hacks",
              detail: "Top 7 / 350",
            },
            {
              award: "Top 10 Finalist",
              event: "Hack Club Undercity",
              detail: "Jul 2025",
            },
            {
              award: "2nd Place",
              event: "Hack The Ridge",
              detail: "Dec 2024",
            },
            {
              award: "Distinction (Top 25%)",
              event: "Canadian Computing Competition",
              detail: "CCC",
            },
            {
              award: "Ontario Scholar Award",
              event: "York Mills CI",
              detail: "Graduated 2025",
            },
            {
              award: "Computer Engineering Distinction",
              event: "York Mills CI",
              detail: "Award",
            },
          ].map((item, i) => (
            <motion.div
              key={item.event}
              className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.detail}
              </span>
              <span className="font-serif text-base font-bold text-foreground">
                {item.award}
              </span>
              <span className="text-sm text-muted-foreground">
                {item.event}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <motion.h2
          className="mb-8 font-serif text-3xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>
        <div className="flex flex-col gap-6">
          {[
            {
              role: "President",
              org: "York Mills Technology Council",
              time: "Sep 2023 - Jun 2025",
              detail:
                "Led cross-functional teams and secured admin approval for school-wide technical events. Planned and emceed CETA, a TDSB board-wide robotics competition.",
            },
            {
              role: "Technical Engineer & Team Manager",
              org: "York Mills Robotics Team",
              time: "Sep 2024 - Jun 2025",
              detail:
                "Built and programmed autonomous routines for competition robots. Managed team logistics and scheduling.",
            },
            {
              role: "Spotlight Lead / Video Streaming Lead",
              org: "YM Tech Crew",
              time: "Oct 2023 - Jun 2025",
              detail:
                "Trained junior members on safe equipment operation. Contributed over 100 hours per event managing spotlighting and live streaming.",
            },
            {
              role: "Tutor, TA & Instructor",
              org: "Academic & Community Support",
              time: "Jan 2023 - Present",
              detail:
                "Tutored Math and Python; served as TA for high school programming courses. Certified CSIA Level 1 Ski Instructor.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.role}
              className="flex flex-col gap-1 rounded-lg border border-border bg-card p-5 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-serif text-base font-bold text-foreground">
                  {item.role}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{item.org}</span>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <StatusFooter />
    </div>
  )
}
