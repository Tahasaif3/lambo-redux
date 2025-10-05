"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  Eye,
  Share2,
  Link,
} from "lucide-react"
import { useRouter } from "next/navigation"

const brochures = [
  {
    id: "1",
    title: "2025 Full Collection",
    description: "Complete overview of all our models with detailed specifications",
    pages: 84,
    size: "12.5 MB",
    image: "/broch1.webp",
    file: "/brochures/brochure1.pdf",
    category: "Collection",
  },
  {
    id: "2",
    title: "Hypercar Series",
    description: "In-depth look at our flagship hypercar lineup",
    pages: 32,
    size: "8.2 MB",
    image: "/broch2.webp",
    file: "/brochures/brochure2.pdf",
    category: "Series",
  },
  {
    id: "3",
    title: "Supercar Range",
    description: "Explore our high-performance supercar collection",
    pages: 28,
    size: "7.1 MB",
    image: "/broch3.jpeg",
    file: "/brochures/brochure3.pdf",
    category: "Series",
  },
  {
    id: "4",
    title: "Grand Tourer Edition",
    description: "Luxury and comfort in our grand touring models",
    pages: 24,
    size: "6.8 MB",
    image: "/broch4.jpg",
    file: "/brochures/brochure4.pdf",
    category: "Series",
  },
  {
    id: "5",
    title: "Customization Guide",
    description: "Personalization options and bespoke services",
    pages: 40,
    size: "9.3 MB",
    image: "/lam.webp",
    file: "/brochures/brochure3.pdf",
    category: "Guide",
  },
  {
    id: "6",
    title: "Heritage & Innovation",
    description: "Our story, racing legacy, and future vision",
    pages: 56,
    size: "15.7 MB",
    image: "/lam2.webp",
    file: "/brochures/brochure4.pdf",
    category: "Brand",
  },
]

export default function BrochurePage() {
  const router = useRouter()
  const [selectedBrochures, setSelectedBrochures] = useState<string[]>([])

  const toggleBrochure = (id: string) => {
    setSelectedBrochures((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  // 🔹 Trigger download directly
  const handleDownload = () => {
    const selected = brochures.filter((b) => selectedBrochures.includes(b.id))
    selected.forEach((brochure) => {
      const link = document.createElement("a")
      link.href = brochure.file
      link.download = brochure.title + ".pdf"
      link.click()
    })
  }

  const totalSize = brochures
    .filter((b) => selectedBrochures.includes(b.id))
    .reduce((sum, b) => sum + parseFloat(b.size), 0)
    .toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8 py-6">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => router.back()}>
          <ArrowLeft size={16} />
          Back to Models
        </button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium text-primary tracking-wider uppercase">
                Digital Library
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Download Brochures
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access detailed information about our complete range of vehicles
            </p>
          </div>

          {/* Brochure Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {brochures.map((brochure) => (
              <div
                key={brochure.id}
                className={`group relative rounded-lg border-2 overflow-hidden transition-all hover:scale-105 cursor-pointer ${
                  selectedBrochures.includes(brochure.id)
                    ? "border-primary bg-accent"
                    : "border-border bg-card hover:border-primary/50"
                }`}
                onClick={() => toggleBrochure(brochure.id)}
              >
                {/* Selection circle */}
                <div
                  className={`absolute top-4 right-4 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedBrochures.includes(brochure.id)
                      ? "border-primary bg-primary"
                      : "border-border bg-card"
                  }`}
                >
                  {selectedBrochures.includes(brochure.id) && (
                    <CheckCircle2
                      size={14}
                      className="text-primary-foreground"
                    />
                  )}
                </div>

                {/* Image */}
                <div className="aspect-[3/4] relative">
                  <Image
                    src={brochure.image}
                    alt={brochure.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {brochure.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{brochure.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {brochure.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{brochure.pages} pages</span>
                    <span>{brochure.size}</span>
                  </div>
                </div>

                {/* Hover actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    {/* Preview PDF */}
                    <a
                      href={brochure.file}
                      target="_blank"
                      className="flex-1 py-2 px-3 bg-card border border-border rounded-lg text-sm hover:bg-accent transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye size={14} />
                      Preview
                    </a>
                    {/* Share */}
                    <button className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom selection bar */}
          {selectedBrochures.length > 0 && (
            <div className="fixed bottom-0 inset-x-0 bg-card border-t border-border shadow-2xl z-50">
              <div className="container mx-auto px-4 lg:px-8 py-6">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                  <div>
                    <p className="font-semibold text-lg mb-1">
                      {selectedBrochures.length}{" "}
                      {selectedBrochures.length === 1 ? "brochure" : "brochures"}{" "}
                      selected
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total size: {totalSize} MB
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedBrochures([])}
                      className="px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                      Clear Selection
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <Download size={18} />
                      Download Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
