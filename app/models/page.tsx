"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { ModelCard } from "@/components/model-card"
import { carModels } from "@/lib/models-data"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

type FilterCategory = "all" | "hypercar" | "supercar" | "grand-tourer"

export default function ModelsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
  const pageRef = useRef<HTMLDivElement>(null)

  const filteredModels =
    activeFilter === "all"
      ? carModels
      : carModels.filter((model) => model.category === activeFilter)

  const filters: { label: string; value: FilterCategory }[] = [
    { label: "All Models", value: "all" },
    { label: "Hypercars", value: "hypercar" },
    { label: "Supercars", value: "supercar" },
    { label: "Grand Tourers", value: "grand-tourer" },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero section
      gsap.from(".hero-content > *", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      })

      // Animate filter buttons
      gsap.from(".filter-buttons button", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      })

      // Animate cards
      gsap.from(".model-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 1,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} className="min-h-screen bg-background">
      <Navigation />

    {/* Hero Section */}
<section className="relative pt-32 pb-16 container mx-auto px-4 lg:px-8 overflow-hidden">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src="/model.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Dark Overlay for readability */}
  <div className="absolute inset-0 bg-black/50 z-0" />

  {/* Hero Content */}
  <div className="relative max-w-3xl hero-content z-10">
    <div className="inline-flex items-center gap-2 mb-6">
      <div className="h-px w-12 bg-primary" />
      <span className="text-sm font-medium text-primary tracking-wider uppercase">
        Our Collection
      </span>
    </div>
    <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
      Engineered for
      <br />
      <span className="text-primary">Excellence</span>
    </h1>
    <p className="text-lg text-muted-foreground leading-relaxed">
      Explore our complete range of extraordinary vehicles. Each model
      represents the perfect fusion of cutting-edge technology,
      uncompromising performance, and timeless design.
    </p>
  </div>
</section>


      {/* Filter Section */}
      <section className="pb-12 container mx-auto px-4 lg:px-8">
        <div className="filter-buttons flex flex-wrap gap-3">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.value)}
              className={
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border hover:border-primary/50"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          Showing {filteredModels.length}{" "}
          {filteredModels.length === 1 ? "model" : "models"}
        </div>
      </section>

      {/* Models Grid */}
      <section className="pb-24 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model) => (
            <div key={model.id} className="model-card">
              <ModelCard model={model} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
