"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: "/luxury-car-side-profile-motion.jpg", title: "Aerodynamic Excellence" },
  { src: "/luxury-car-dashboard.png", title: "Cockpit Design" },
  { src: "/luxury-car-rear-view-lights.jpg", title: "Signature Lighting" },
  { src: "/model1.webp", title: "Rear View" },
]

export function ImmersiveGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const panels = gsap.utils.toArray<HTMLElement>(".gallery-panel")

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (sectionRef.current?.offsetWidth || 0) * panels.length,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (panels.length - 1))
            setActiveIndex(index)
          },
        },
      })

      // Animate title
      gsap.from(".gallery-title", {
        scrollTrigger: {
          trigger: ".gallery-title",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-muted/20">
      {/* Fixed Title */}
      <div className="gallery-title absolute top-20 left-4 lg:left-8 z-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-sm font-medium text-primary tracking-[0.3em] uppercase">Gallery</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-bold">Design Details</h2>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-20 left-4 lg:left-8 z-10 flex items-center gap-3">
        {galleryImages.map((_, index) => (
          <div
            key={index}
            className={`h-1 transition-all duration-300 ${
              index === activeIndex ? "w-16 bg-primary" : "w-8 bg-foreground/20"
            }`}
          />
        ))}
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex h-full">
        {galleryImages.map((image, index) => (
          <div key={index} className="gallery-panel flex-shrink-0 w-full h-full relative">
            <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-8">
              <div className="relative w-full max-w-6xl aspect-[16/10]">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover rounded-sm"
                />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-display text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
