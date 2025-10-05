"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/luxury-supercar-driving-on-mountain-road-cinematic.jpg" alt="Luxury supercar" fill className="object-cover" priority />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-3xl pt-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium text-primary tracking-wider uppercase">Performance Redefined</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance mb-6">
            Beyond Speed.
            <br />
            <span className="text-primary">Beyond Limits.</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            Experience the pinnacle of automotive engineering. Where raw power meets refined elegance, and every detail
            is crafted for perfection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold"
            >
              Explore Models
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/20 text-foreground hover:bg-foreground/10 text-base font-semibold bg-transparent"
            >
              Configure Yours
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50">
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">0-60</div>
              <div className="text-sm text-muted-foreground">2.8 seconds</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">217</div>
              <div className="text-sm text-muted-foreground">MPH Top Speed</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">800</div>
              <div className="text-sm text-muted-foreground">Horsepower</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <ChevronDown size={20} className="animate-bounce group-hover:text-primary transition-colors" />
      </button>
    </section>
  )
}
