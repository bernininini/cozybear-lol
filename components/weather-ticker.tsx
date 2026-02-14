"use client"

import { useEffect, useState } from "react"

interface CityWeather {
  city: string
  temp: string
  condition: string
}

export function WeatherTicker() {
  const [weather, setWeather] = useState<CityWeather[]>([
    { city: "TORONTO", temp: "--", condition: "loading" },
    { city: "EDMONTON", temp: "--", condition: "loading" },
  ])

  useEffect(() => {
    async function fetchWeather() {
      try {
        const cities = [
          { name: "TORONTO", lat: 43.65, lon: -79.38 },
          { name: "EDMONTON", lat: 53.55, lon: -113.49 },
        ]

        const results = await Promise.all(
          cities.map(async (city) => {
            try {
              const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code`
              )
              const data = await res.json()
              const temp = Math.round(data.current.temperature_2m)
              const code = data.current.weather_code
              const condition = getCondition(code)
              return { city: city.name, temp: `${temp}C`, condition }
            } catch {
              return { city: city.name, temp: "--", condition: "unavailable" }
            }
          })
        )
        setWeather(results)
      } catch {
        /* keep defaults */
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 300000)
    return () => clearInterval(interval)
  }, [])

  function getCondition(code: number): string {
    if (code === 0) return "clear"
    if (code <= 3) return "cloudy"
    if (code <= 49) return "foggy"
    if (code <= 69) return "rainy"
    if (code <= 79) return "snowy"
    if (code <= 99) return "stormy"
    return "unknown"
  }

  const tickerText = weather
    .map((w) => `${w.city} ; ${w.temp} ${w.condition}`)
    .join("   ///   ")

  const repeated = `${tickerText}   ///   ${tickerText}   ///   ${tickerText}   ///   ${tickerText}`

  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full overflow-hidden border-t border-border bg-background/80 backdrop-blur-sm transition-colors duration-500">
      <div className="animate-ticker flex whitespace-nowrap py-2.5">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground text-glow-subtle">
          {repeated}
        </span>
      </div>
    </footer>
  )
}
