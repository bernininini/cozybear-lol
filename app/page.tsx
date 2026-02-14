"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LightSwitch } from "@/components/light-switch"
import { GalleryWall } from "@/components/gallery-wall"
import { PortraitFrame } from "@/components/portrait-frame"
import { WeatherTicker } from "@/components/weather-ticker"
import { Github, Linkedin, Mail } from "lucide-react"

const projects = [
  {
    title: "BayLee",
    subtitle: "Gen AI Award @ UTRA Hacks (Top 7/350)",
    description:
      "AI-powered health assistant robot. Python, Vercel AI SDK, Redis microservices, and OpenAI Whisper for voice control.",
    tags: ["Python", "AI SDK", "Redis", "Whisper"],
    image: "/images/project-baylee.jpg",
    date: "Feb 2025",
  },
  {
    title: "Snow Pea",
    subtitle: "Top 10 Finalist @ Hack Club Undercity",
    description:
      "Integrated hardware and software systems with collaborative GitHub workflows. Selected as a Top 10 finalist.",
    tags: ["Hardware", "Full Stack", "GitHub"],
    image: "/images/project-snowpea.jpg",
    date: "Jul 2025",
  },
  {
    title: "Neo=Alert",
    subtitle: "2nd Place @ Hack The Ridge",
    description:
      "Medical alert platform using a custom ML model to detect bradycardia in infants.",
    tags: ["Machine Learning", "Healthcare", "Python"],
    image: "/images/project-neoalert.jpg",
    date: "Dec 2024",
  },
  {
    title: "Bean Cake",
    subtitle: "Personal Project",
    description:
      "High-speed tank-drive spy robot with real-time camera streaming. Chassis designed in Fusion 360, powered by ESP32 and Arduino.",
    tags: ["ESP32", "Arduino", "Fusion 360", "Robotics"],
    image: "/images/project-beancake.jpg",
    date: "Aug 2025",
  },
]

const awards = [
  { title: "Gen AI Award", event: "UTRA Hacks", detail: "Top 7 / 350" },
  { title: "Top 10 Finalist", event: "Hack Club Undercity", detail: "Jul 2025" },
  { title: "2nd Place", event: "Hack The Ridge", detail: "Dec 2024" },
  { title: "3rd Place", event: "Scrapyard Toronto", detail: "2025" },
  { title: "Distinction (Top 25%)", event: "Canadian Computing Competition", detail: "CCC" },
  { title: "Ontario Scholar Award", event: "York Mills CI", detail: "2025" },
  { title: "Computer Engineering Distinction", event: "York Mills CI", detail: "Award" },
]

const experience = [
  {
    role: "President",
    org: "York Mills Technology Council",
    time: "Sep 2023 -- Jun 2025",
    detail: "Led cross-functional teams and secured admin approval for school-wide technical events. Planned and emceed CETA, a TDSB board-wide robotics competition.",
  },
  {
    role: "Technical Engineer & Team Manager",
    org: "York Mills Robotics Team",
    time: "Sep 2024 -- Jun 2025",
    detail: "Built and programmed autonomous routines for competition robots. Managed team logistics and scheduling.",
  },
  {
    role: "Spotlight Lead / Video Streaming Lead",
    org: "YM Tech Crew",
    time: "Oct 2023 -- Jun 2025",
    detail: "Trained junior members on safe equipment operation. Contributed over 100 hours per event managing spotlighting and live streaming.",
  },
  {
    role: "Tutor, TA & Instructor",
    org: "Academic & Community Support",
    time: "Jan 2023 -- Present",
    detail: "Tutored Math and Python; served as TA for high school programming courses. Certified CSIA Level 1 Ski Instructor.",
  },
]

const skills = [
  "C++", "Python", "Arduino", "ESP32", "STM32",
  "AutoCAD", "Fusion 360", "SketchUp", "KiCad",
  "Final Cut Pro", "Adobe PS",
]

const links = [
  { label: "GitHub", href: "https://github.com/bernininini", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/bernice-qiu", icon: Linkedin },
  { label: "Email", href: "mailto:berniceqiu31@gmail.com", icon: Mail },
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
    <div className="relative min-h-screen pb-12 transition-colors duration-500">
      <LightSwitch isLight={isLight} onToggle={() => setIsLight((p) => !p)} />

      {/* === HERO === */}
      <header className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 py-20">
        <motion.p
          className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground text-glow-subtle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Making ideas click
        </motion.p>

        <motion.h1
          className="font-serif text-5xl font-black leading-tight text-foreground text-glow sm:text-6xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Bernice Qiu
        </motion.h1>

        <motion.p
          className="mt-3 text-sm text-muted-foreground text-glow-subtle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {"CS Student @ UAlberta \u2014 transferring to UofT 2029"}
        </motion.p>

        <motion.p
          className="mt-8 max-w-xl text-sm leading-relaxed text-foreground/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {"I\u2019m Bernice (but you can call me "}
          <span className="font-serif italic text-foreground text-glow-subtle">Berni</span>
          {" or "}
          <span className="font-serif italic text-foreground text-glow-subtle">Bean</span>
          {"). I\u2019m obsessed with CS, cool UI, and live event AV tech. I build robots, win hackathons, and teach people things along the way."}
        </motion.p>

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
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-300 hover:border-foreground/30 hover:text-foreground hover:box-glow"
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </header>

      {/* === SKILLS WALL === */}
      <GalleryWall title="Skills" subtitle="tools of the trade" index={0}>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="rounded-lg border-2 border-[var(--frame-color)] bg-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:border-[var(--frame-highlight)] hover:text-glow-subtle hover:box-glow box-glow"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ scale: 1.08, y: -2 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </GalleryWall>

      {/* === PROJECTS WALL === */}
      <GalleryWall title="Projects" subtitle="things I built and shipped" index={1}>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <PortraitFrame key={project.title} index={i} image={project.image} alt={project.title}>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg font-bold text-foreground text-glow-subtle">
                  {project.title}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {project.date}
                </span>
              </div>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {project.subtitle}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/60">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </PortraitFrame>
          ))}
        </div>
      </GalleryWall>

      {/* === AWARDS WALL === */}
      <GalleryWall title="Awards" subtitle="recognition" index={2}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((item, i) => (
            <PortraitFrame key={item.event + item.title} index={i}>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.detail}
              </span>
              <h3 className="mt-1 font-serif text-base font-bold text-foreground text-glow-subtle">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.event}</p>
            </PortraitFrame>
          ))}
        </div>
      </GalleryWall>

      {/* === EXPERIENCE WALL === */}
      <GalleryWall title="Experience" subtitle="where I have worked" index={3}>
        <div className="grid gap-5 sm:grid-cols-2">
          {experience.map((item, i) => (
            <PortraitFrame key={item.role} index={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-base font-bold text-foreground text-glow-subtle">
                  {item.role}
                </h3>
                <span className="text-[10px] text-muted-foreground">{item.time}</span>
              </div>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {item.org}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/60">{item.detail}</p>
            </PortraitFrame>
          ))}
        </div>
      </GalleryWall>

      {/* === EDUCATION WALL === */}
      <GalleryWall title="Education" subtitle="where I have studied" index={4}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              school: "University of Toronto",
              program: "B.Sc. with Honours (Transferring)",
              time: "Expected 2029",
              location: "Toronto, ON",
            },
            {
              school: "University of Alberta",
              program: "B.Sc. Computing Science (AI Option)",
              time: "2025 -- 2026",
              location: "Edmonton, AB",
            },
            {
              school: "York Mills Collegiate Institute",
              program: "OSSD; Ontario Scholar Award",
              time: "Graduated 2025",
              location: "Toronto, ON",
            },
          ].map((item, i) => (
            <PortraitFrame key={item.school} index={i}>
              <h3 className="font-serif text-base font-bold text-foreground text-glow-subtle">
                {item.school}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{item.program}</p>
              <div className="mt-2 flex items-baseline justify-between text-[10px] text-muted-foreground/70">
                <span>{item.location}</span>
                <span>{item.time}</span>
              </div>
            </PortraitFrame>
          ))}
        </div>
      </GalleryWall>

      {/* Spacer for ticker */}
      <div className="h-16" />

      {/* === ROLLING WEATHER TICKER === */}
      <WeatherTicker />
    </div>
  )
}
