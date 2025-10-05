"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function RevealText() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return

      const words = textRef.current.querySelectorAll(".word")

      gsap.from(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
        opacity: 0.2,
        stagger: 0.1,
        ease: "none",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const text =
    "Every curve tells a story. Every detail demands perfection. This is more than engineering. This is art in motion."
  const words = text.split(" ")

  return (
    <section ref={sectionRef} className="py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 ref={textRef} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight">
          {words.map((word, index) => (
            <span key={index} className="word inline-block mr-3 md:mr-4">
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}
