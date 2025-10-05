"use client"

import { useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { BrandTimeline } from "@/components/brand-timeline"
import { CraftsmanshipSection } from "@/components/craftsmanship-section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Award, Zap, Target, Users } from "lucide-react"
import { StatsSection } from "@/components/stats"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function StoryPage() {
  const heroRef = useRef<HTMLElement>(null)

  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing the boundaries of automotive engineering with cutting-edge technology and design.",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Every component meticulously crafted to deliver unparalleled performance and reliability.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "A relentless pursuit of perfection in every vehicle we create.",
    },
    {
      icon: Users,
      title: "Heritage",
      description: "Decades of racing legacy and automotive passion driving us forward.",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-content > *", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Mission section animation
      gsap.from(".mission-section", {
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 85%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Values grid animation
      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: ".values-section",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Timeline + Craftsmanship fade in
      gsap.from(".timeline-section", {
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 85%",
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
      })

      gsap.from(".craftsmanship-section", {
        scrollTrigger: {
          trigger: ".craftsmanship-section",
          start: "top 85%",
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
      })

      // Stats section animation
      gsap.from(".stats-section", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        duration: 1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={heroRef} className="min-h-screen bg-background overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <Image
          src="/about.jpg"
          alt="Brand heritage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/50" />

        <div className="relative h-full container mx-auto px-4 lg:px-8 flex flex-col justify-center max-w-3xl">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium text-primary tracking-wider uppercase">Our Story</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-balance">
              Crafting Dreams
              <br />
              <span className="text-primary">Since 1963</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              For over six decades, we've been at the forefront of automotive excellence, creating vehicles that
              transcend mere transportation to become works of art.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-24 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Driven by
              <br />
              Passion & Purpose
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our mission has always been clear: to create the world's most extraordinary automobiles. Each vehicle we
              produce represents the culmination of decades of racing heritage, engineering innovation, and an unwavering
              commitment to excellence.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From the drawing board to the open road, every decision is guided by our passion for performance and our
              dedication to pushing the boundaries of what's possible in automotive design.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Explore Our Heritage
            </Button>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src="/about.png" alt="Heritage racing" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-24 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="value-card text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <div className="timeline-section">
        <BrandTimeline />
      </div>

      {/* Craftsmanship Section */}
      <div className="craftsmanship-section">
        <CraftsmanshipSection />
      </div>

      {/* Stats Section */}
      <section className="stats-section py-10 bg-card/30">
        <StatsSection />
      </section>
    </main>
  )
}
