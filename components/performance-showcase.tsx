"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const specs = [
  { label: "Max Power", value: 1015, unit: "CV", duration: 2 },
  { label: "Max Torque", value: 1725, unit: "Nm", duration: 2.2 },
  { label: "Top Speed", value: 350, unit: "km/h", duration: 2.5 },
  { label: "0-100 km/h", value: 2.5, unit: "s", duration: 1.8, decimals: 1 },
]

export function PerformanceShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.from(".perf-title", {
        scrollTrigger: {
          trigger: ".perf-title",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Animate image with scale
      gsap.from(".perf-image", {
        scrollTrigger: {
          trigger: ".perf-image",
          start: "top 75%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })

      // Counter animations
      countersRef.current.forEach((counter, index) => {
        if (!counter) return

        const spec = specs[index]
        const endValue = spec.value
        const decimals = spec.decimals || 0

        gsap.from(counter, {
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
          textContent: 0,
          duration: spec.duration,
          ease: "power2.out",
          snap: { textContent: decimals === 0 ? 1 : 0.1 },
          onUpdate: () => {
            const value = gsap.getProperty(counter, "textContent") as number
            counter.textContent = value.toFixed(decimals)
          },
        })
      })

      // Parallax effect on image
      gsap.to(".perf-image-inner", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -80,
        ease: "none",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="perf-title">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium text-primary tracking-[0.3em] uppercase">Performance</span>
            </div>

            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 text-balance">
              Pure
              <br />
              <span className="text-primary">Adrenaline</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Engineering excellence meets raw power. Every component optimized for maximum performance and driving
              pleasure.
            </p>

            {/* Animated Specs */}
            <div className="grid grid-cols-2 gap-8">
              {specs.map((spec, index) => (
                <div key={spec.label} className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span
                      ref={(el) => {
                        countersRef.current[index] = el
                      }}
                      className="font-display text-5xl font-bold text-primary"
                    >
                      {spec.value}
                    </span>
                    <span className="text-2xl font-bold text-primary">{spec.unit}</span>
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="perf-image relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <div className="perf-image-inner relative w-full h-full">
                <Image
                  src="https://res.cloudinary.com/dfsruso6z/image/upload/v1759274985/Lucid_Origin_a_highperformance_sports_car_engine_in_4k_resolut_1_orn2e3.jpg"
                  alt="Performance engine"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
