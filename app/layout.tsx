import type React from "react"
import "./globals.css"
import { Playfair_Display, JetBrains_Mono } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Bernice Qiu",
  description: "CS Student, Builder, AV Enthusiast",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable}`}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  )
}
