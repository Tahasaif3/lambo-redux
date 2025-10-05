import { Card } from "@/components/ui/card"
import type { CarModel } from "@/lib/models-data"
import { Gauge, Zap, Wind, Cog } from "lucide-react"

interface ModelSpecsProps {
  model: CarModel
}

export function ModelSpecs({ model }: ModelSpecsProps) {
  const specs = [
    {
      icon: Zap,
      label: "Power",
      value: `${model.specs.horsepower} HP`,
      description: "Maximum horsepower",
    },
    {
      icon: Gauge,
      label: "Acceleration",
      value: model.specs.acceleration,
      description: "0-60 MPH",
    },
    {
      icon: Wind,
      label: "Top Speed",
      value: `${model.specs.topSpeed} MPH`,
      description: "Maximum velocity",
    },
    {
      icon: Cog,
      label: "Engine",
      value: model.specs.engine,
      description: "Powertrain",
    },
  ]

  return (
    <section className="py-24 container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Technical Specifications</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Engineered for performance, designed for perfection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {specs.map((spec, index) => {
          const Icon = spec.icon
          return (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon size={24} className="text-primary" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-2">{spec.label}</div>
              <div className="font-display text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                {spec.value}
              </div>
              <div className="text-sm text-muted-foreground">{spec.description}</div>
            </Card>
          )
        })}
      </div>

      {/* Additional Specs Table */}
      <div className="mt-16 max-w-4xl mx-auto">
        <Card className="p-8 bg-card border-border">
          <h3 className="font-display text-2xl font-bold mb-6">Complete Specifications</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Starting Price</span>
              <span className="font-semibold">${(model.price / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Category</span>
              <span className="font-semibold capitalize">{model.category.replace("-", " ")}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Transmission</span>
              <span className="font-semibold">8-Speed Dual-Clutch</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Drive Type</span>
              <span className="font-semibold">All-Wheel Drive</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Weight</span>
              <span className="font-semibold">3,200 lbs</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Fuel Economy</span>
              <span className="font-semibold">15/22 MPG</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
