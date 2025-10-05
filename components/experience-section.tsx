"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to(".parallax-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        ease: "none",
      })

      // Animate content
      gsap.from(".experience-content > *", {
        scrollTrigger: {
          trigger: ".experience-content",
          start: "top 75%",
        },
        x: -60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax-image relative w-full h-[120%]">
          <Image src="/luxury-car-factory-craftsmanship.jpg" alt="Craftsmanship" fill className="object-cover" />
          <div className="absolute inset-0 bg-background/90" />
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <div className="experience-content">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium text-primary tracking-[0.3em] uppercase">Experience</span>
            </div>

            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 text-balance">
              Crafted for
              <br />
              <span className="text-primary">Perfection</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Every detail is meticulously engineered. From the roar of the engine to the touch of premium materials,
              experience automotive artistry at its finest.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <div className="font-display text-4xl font-bold text-primary mb-2">60+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Years of Heritage</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Hand Assembled</div>
              </div>
            </div>

            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Discover Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
