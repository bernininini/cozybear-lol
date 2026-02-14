"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
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
    subtitle: "Participant @ Hack Club Undercity",
    description:
      "Integrated hardware and software systems with collaborative GitHub workflows.",
    tags: ["Hardware", "Full Stack", "GitHub"],
    image: "/images/project-snowpea.jpg",
    date: "Jul 2025",
  },
  {
    title: "Neo=Alert",
    subtitle: "Participant @ Hack The Ridge",
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
  { title: "Participant", event: "Hack Club Undercity", detail: "Jul 2025" },
  { title: "Participant", event: "Hack The Ridge", detail: "Dec 2024" },
  { title: "Participant", event: "Scrapyard Toronto", detail: "2025" },
  { title: "Distinction (Top 25%)", event: "Canadian Computing Competition", detail: "CCC" },
  { title: "Ontario Scholar Award", event: "York Mills CI", detail: "2025" },
  { title: "Computer Engineering Distinction", event: "York Mills CI", detail: "Award" },
]

const experience = [
  {
    role: "Co-President",
    org: "York Mills Technology Council",
    time: "Sep 2023 -- Jun 2025",
    detail:
      "Led cross-functional teams and secured admin approval for school-wide technical events. Planned and emceed CETA, a TDSB board-wide robotics competition.",
  },
  {
    role: "Skiing Instructor",
    org: "CSIA Level 1 Certified",
    time: "Sep 2024 -- Jun 2025",
    detail:
      "Taught skiing to kids and seniors. Focused on safety, proper technique, and building confidence on the slopes.",
  },
  {
    role: "Tutor, TA & Instructor",
    org: "Academic & Community Support",
    time: "Jan 2023 -- Present",
    detail:
      "Tutored Math and Python; served as TA for high school programming courses. CPR and First Aid certified.",
  },
]

const skills = [
  "C++",
  "Python",
  "Arduino",
  "ESP32",
  "STM32",
  "AutoCAD",
  "Fusion 360",
  "SketchUp",
  "KiCad",
  "Final Cut Pro",
  "Adobe PS",
]

const links = [
  { label: "GitHub", href: "https://github.com/bernininini", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/bernice-qiu", icon: Linkedin },
  { label: "Email", href: "mailto:berniceqiu31@gmail.com", icon: Mail },
]

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

const countryMaps = [
  { name: "Canada", image: "/images/map-canada.jpg" },
  { name: "USA", image: "/images/map-usa.jpg" },
  { name: "Japan", image: "/images/map-japan.jpg" },
  { name: "Taiwan", image: "/images/map-taiwan.jpg" },
  { name: "China", image: "/images/map-china.jpg" },
  { name: "Hong Kong", image: "/images/map-hongkong.jpg" },
  { name: "Indonesia", image: "/images/map-indonesia.jpg" },
  { name: "Thailand", image: "/images/map-thailand.jpg" },
  { name: "Malaysia", image: "/images/map-malaysia.jpg" },
]

/* Fixed background 3D spinning carousel of country maps */
function SpinningCarousel() {
  const total = countryMaps.length
  const angleStep = 360 / total
  const radius = 340 // translateZ distance

  return (
    <div className="carousel-bg" aria-hidden="true">
      <div className="carousel-scene">
        <div className="carousel-ring">
          {countryMaps.map((c, i) => (
            <div
              key={c.name}
              className="carousel-card"
              style={{
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={c.image}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
              <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] uppercase tracking-widest text-white/70">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [isLight, setIsLight] = useState(false)
  const [titleHovered, setTitleHovered] = useState(false)

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
    }
  }, [isLight])

  const titleLetters = "Bernice Qiu".split("")

  return (
    <div className="relative min-h-screen pb-12 transition-colors duration-500">
      {/* 3D spinning country maps -- fixed background layer */}
      <SpinningCarousel />

      {/* All content above the carousel */}
      <div className="relative z-10">
      <LightSwitch isLight={isLight} onToggle={() => setIsLight((p) => !p)} />

      {/* === HERO === */}
      <header className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <motion.h1
          className="font-serif text-5xl font-black leading-tight text-foreground sm:text-6xl lg:text-8xl cursor-default"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onMouseEnter={() => setTitleHovered(true)}
          onMouseLeave={() => setTitleHovered(false)}
        >
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block text-glow"
              animate={
                titleHovered
                  ? {
                      y: [0, -12, 0],
                      textShadow: [
                        "0 0 10px rgba(var(--glow-rgb), 0.6), 0 0 30px rgba(var(--glow-rgb), 0.3)",
                        "0 0 20px rgba(var(--glow-rgb), 1), 0 0 60px rgba(var(--glow-rgb), 0.6), 0 0 100px rgba(var(--glow-rgb), 0.3)",
                        "0 0 10px rgba(var(--glow-rgb), 0.6), 0 0 30px rgba(var(--glow-rgb), 0.3)",
                      ],
                    }
                  : { y: 0 }
              }
              transition={{
                duration: 0.5,
                delay: i * 0.04,
                ease: "easeInOut",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ML Honours Stream, CS @ UAlberta
        </motion.p>

        <motion.p
          className="mt-10 max-w-xl text-sm leading-relaxed text-foreground/70 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {"I\u2019m Bernice (but you can call me "}
          <span className="font-serif italic text-foreground text-glow-subtle">Berni</span>
          {" or "}
          <span className="font-serif italic text-foreground text-glow-subtle">Bean</span>
          {"). I\u2019m obsessed with CS, cool UI, and building things that move. I build robots, participate in hackathons, and teach people things along the way."}
        </motion.p>

        <motion.div
          className="mt-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:border-foreground/30 hover:text-foreground hover:box-glow"
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </header>

      {/* === SKILLS WALL === */}
      <GalleryWall title="Skills" subtitle="tools of the trade" index={0}>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, i) => (
            <AnimatedSection key={skill} delay={i * 0.04}>
              <motion.span
                className="border-2 border-[var(--frame-color)] bg-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:border-[var(--frame-highlight)] hover:text-glow-subtle hover:box-glow box-glow inline-block"
                whileHover={{ scale: 1.08, y: -2 }}
              >
                {skill}
              </motion.span>
            </AnimatedSection>
          ))}
        </div>
      </GalleryWall>

      {/* === PROJECTS WALL === */}
      <GalleryWall title="Projects" subtitle="things I built and shipped" index={1}>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <PortraitFrame
              key={project.title}
              index={i}
              image={project.image}
              alt={project.title}
            >
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
                    className="border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
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
              program: "B.Sc. Computing Science, ML Honours Stream",
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
      </div>{/* end z-10 wrapper */}
    </div>
  )
}
