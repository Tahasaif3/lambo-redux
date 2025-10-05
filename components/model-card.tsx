import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { CarModel } from "@/lib/models-data"

interface ModelCardProps {
  model: CarModel
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={model.image || "/placeholder.svg"}
          alt={model.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground">
            {model.category.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Series */}
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">{model.series}</div>

        {/* Name */}
        <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {model.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{model.description}</p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-border">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Power</div>
            <div className="font-display text-lg font-semibold">{model.specs.horsepower} HP</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">0-60 MPH</div>
            <div className="font-display text-lg font-semibold">{model.specs.acceleration}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Top Speed</div>
            <div className="font-display text-lg font-semibold">{model.specs.topSpeed} MPH</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Starting at</div>
            <div className="font-display text-lg font-semibold">${(model.price / 1000000).toFixed(1)}M</div>
          </div>
        </div>

        {/* CTA */}
        <Link href={`/models/${model.id}`}>
          <Button
            variant="ghost"
            className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            View Details
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
