"use client"

import { useState } from "react"
import Image from "next/image"
import type { CarModel } from "@/lib/models-data"

interface ModelGalleryProps {
  model: CarModel
}

export function ModelGallery({ model }: ModelGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)

  const galleryImages = [
    { src: model.image, alt: `${model.name} exterior` },
    {
      src: "/luxury-car-dashboard.png",
      alt: `${model.name} interior`,
    },
    {
      src: "/luxury-car-side-profile-motion.jpg",
      alt: `${model.name} side view`,
    },
    {
      src: "/luxury-car-rear-view-lights.jpg",
      alt: `${model.name} rear view`,
    },
    {
      src: "/luxury-car-wheel-rim-detail.jpg",
      alt: `${model.name} wheel detail`,
    },
  ]

  return (
    <section className="py-24 container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
        <p className="text-muted-foreground text-lg">Every angle tells a story of perfection</p>
      </div>

      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6 bg-muted">
        <Image
          src={galleryImages[activeImage].src || "/placeholder.svg"}
          alt={galleryImages[activeImage].alt}
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-4">
        {galleryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`relative aspect-video rounded overflow-hidden transition-all ${
              activeImage === index
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}
