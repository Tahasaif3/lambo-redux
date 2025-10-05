"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import gsap from "gsap"

export function VideoHero() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content on load
      gsap.from(".hero-content > *", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      })

      // Animate scroll indicator
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />

      {/* Content */}
      <div ref={contentRef} className="relative h-full container mx-auto px-4 lg:px-8">
        <div className="hero-content flex flex-col justify-center h-full max-w-4xl pt-20 mt-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-16 bg-primary" />
            <span className="text-md font-medium text-primary tracking-[0.3em] uppercase">Temerario</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-2xl md:text-8xl lg:text-6xl font-bold tracking-tighter text-balance mb-8 leading-[0.9]">
            BEYOND
            <br />
            <span className="text-primary">IMAGINATION</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-12 max-w-2xl font-light">
            The future of performance. Where hybrid technology meets pure adrenaline.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold px-8 h-14"
            >
              Discover More
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/30 text-foreground hover:bg-foreground/10 text-base font-semibold bg-transparent px-8 h-14"
            >
              Configure
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/30">
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">920</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">CV Power</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">2.7</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">0-100 km/h</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">340</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">km/h Max</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground/60 hover:text-foreground transition-colors group"
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
        <ChevronDown size={24} className="group-hover:text-primary transition-colors" />
      </button>
    </section>
  )
}
