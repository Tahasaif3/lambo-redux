"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const newsItems = [
  {
    id: 1,
    title: "The New Era of Hybrid Performance",
    category: "Innovation",
    date: "March 15, 2025",
    image: "/carbon-fiber-hypercar-aerodynamic.jpg",
    excerpt: "Discover how our latest hybrid technology is redefining supercar performance.",
  },
  {
    id: 2,
    title: "Racing Heritage Meets Modern Design",
    category: "Design",
    date: "March 10, 2025",
    image: "/most expensive lamborghini-1.webp",
    excerpt: "A look at how our racing DNA influences every design decision.",
  },
  {
    id: 3,
    title: "Exclusive Track Day Experience",
    category: "Events",
    date: "March 5, 2025",
    image: "/luxury-car-side-profile-motion.jpg",
    excerpt: "Join us for an unforgettable day pushing our vehicles to their limits.",
  },
]

export function LatestNews() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".news-header", {
        scrollTrigger: {
          trigger: ".news-header",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".news-item", {
        scrollTrigger: {
          trigger: ".news-grid",
          start: "top 70%",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="news-header flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium text-primary tracking-[0.3em] uppercase">Latest</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold">News & Updates</h2>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group mt-6 md:mt-0"
          >
            <span>View All News</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="news-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="news-item group">
              <Link href={`/news/${item.id}`} className="block">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider">
                    <span className="text-primary">{item.category}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{item.excerpt}</p>

                  <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors pt-2">
                    <span>Read More</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
