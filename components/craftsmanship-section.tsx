'use client'

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function CraftsmanshipSection() {
  const craftAreas = [
    {
      title: "Hand-Stitched Interiors",
      description: "Every interior is meticulously crafted by master artisans using the finest materials.",
      image: "/interior.jpg",
    },
    {
      title: "Carbon Fiber Mastery",
      description: "Advanced composite materials shaped with precision for optimal performance.",
      image: "/machine.jpg",
    },
    {
      title: "Engine Assembly",
      description: "Each engine is hand-assembled by a single technician, ensuring perfection.",
      image: "/cc-engine-cover-150820210540-420x230.jpg",
    },
  ]

  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      )
    })
  }, [])

  return (
    <section className="py-24 container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="h-px w-12 bg-primary" />
          <span className="text-sm font-medium text-primary tracking-wider uppercase">Craftsmanship</span>
          <div className="h-px w-12 bg-primary" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">The Art of Perfection</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Where traditional craftsmanship meets cutting-edge technology
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {craftAreas.map((area, index) => (
          <Card
            key={index}
            className="overflow-hidden bg-card border-border group hover:border-primary/50 transition-all"
            ref={(el) => {
              if (el) cardsRef.current[index] = el
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={area.image || "/placeholder.svg"}
                alt={area.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {area.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{area.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
