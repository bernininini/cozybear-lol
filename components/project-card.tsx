"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  link?: string
  index: number
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  link,
  index,
}: ProjectCardProps) {
  return (
    <motion.a
      href={link || "#"}
      target={link ? "_blank" : undefined}
      rel={link ? "noopener noreferrer" : undefined}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-serif text-lg font-bold text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground transition-colors duration-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}
