"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

const stats = [
  { value: 60, suffix: "+", label: "Years of Excellence" },
  { value: 250, suffix: "+", label: "Racing Victories" },
  { value: 50000, suffix: "+", label: "Vehicles Produced" },
  { value: 120, suffix: "+", label: "Countries Worldwide" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (inView) {
      const start = performance.now()
      const duration = 2000
      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - start) / duration, 1)
        setCount(Math.floor(progress * value))
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }
  }, [inView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-5xl md:text-6xl font-bold text-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
