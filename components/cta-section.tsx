"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="cta-content max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 justify-center">
            <div className="h-px w-12 bg-primary-foreground/50" />
            <span className="text-sm font-medium tracking-[0.3em] uppercase opacity-80">Get Started</span>
            <div className="h-px w-12 bg-primary-foreground/50" />
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 text-balance">
            Configure Your Dream Machine
          </h2>

          <p className="text-xl leading-relaxed mb-12 opacity-90 max-w-2xl mx-auto">
            Build your perfect supercar with our advanced configurator. Choose from millions of combinations to create
            something truly unique.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/configurator'}>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent px-8 h-14 text-base font-semibold"
            >
              Start Configuring
            </Button>
            </Link>
            <Link href={'/testdrive'}>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent px-8 h-14 text-base font-semibold"
            >
              Schedule Test Drive
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
