"use client"

import { useEffect, useRef } from "react"
import React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ModelDetailWrapper({ children }: { children: React.ReactNode }) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const sections = sectionRefs.current

    sections.forEach((el, idx) => {
      if (!el) return
      let animation: gsap.TweenVars = { opacity: 1, y: 0, duration: 1, ease: "power3.out" }

      switch (idx) {
        case 0: // Hero
          gsap.fromTo(el, { opacity: 0, y: 60 }, animation)
          break
        case 1: // Specs
          gsap.fromTo(el, { opacity: 0, y: 50 }, {
            ...animation,
            scrollTrigger: { trigger: el, start: "top 85%" }
          })
          break
        case 2: // Engineering
          gsap.fromTo(el, { opacity: 0, x: -80 }, {
            opacity: 1, x: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" }
          })
          break
        case 3: // Gallery
          gsap.fromTo(el, { opacity: 0, y: 60 }, {
            ...animation,
            scrollTrigger: { trigger: el, start: "top 80%" }
          })
          break
        case 4: // Features (stagger cards)
          const cards = el.querySelectorAll(".feature-card")
          gsap.fromTo(cards, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" }
          })
          break
        case 5: // CTA
          gsap.fromTo(el, { opacity: 0, scale: 0.9 }, {
            opacity: 1, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" }
          })
          break
      }
    })
  }, [])

  return (
    <div>
      {React.Children.toArray(children).map((child, idx) => (
        <div
          key={idx}
          //@ts-expect-error:error
          ref={(el) => (sectionRefs.current[idx] = el)}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
