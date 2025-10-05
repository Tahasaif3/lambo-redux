"use client"

import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ConfiguratorOptionsProps {
  selectedModel: string
  selectedColor: string
  selectedWheels: string
  selectedInterior: string
  onModelChange: (model: string) => void
  onColorChange: (color: string) => void
  onWheelsChange: (wheels: string) => void
  onInteriorChange: (interior: string) => void
}

export function ConfiguratorOptions({
  selectedColor,
  selectedWheels,
  selectedInterior,
  onColorChange,
  onWheelsChange,
  onInteriorChange,
}: ConfiguratorOptionsProps) {
  const exteriorColors = [
    { id: "jet-black", name: "Jet Black", hex: "#0B0B0B", price: 0 },
    { id: "carbon-silver", name: "Carbon Silver", hex: "#C6C6C6", price: 5000 },
    { id: "racing-yellow", name: "Racing Yellow", hex: "#F4C542", price: 8000 },
    { id: "midnight-blue", name: "Midnight Blue", hex: "#1a2332", price: 8000 },
    { id: "crimson-red", name: "Crimson Red", hex: "#8B0000", price: 8000 },
    { id: "pearl-white", name: "Pearl White", hex: "#F8F8F8", price: 7000 },
  ]

  const wheelOptions = [
    { id: "forged-titanium", name: "Forged Titanium", size: '20"', price: 15000 },
    { id: "carbon-fiber", name: "Carbon Fiber", size: '21"', price: 25000 },
    { id: "diamond-cut", name: "Diamond Cut", size: '20"', price: 18000 },
  ]

  const interiorOptions = [
    { id: "carbon-leather", name: "Carbon & Leather", material: "Alcantara/Leather", price: 12000 },
    { id: "full-leather", name: "Full Leather", material: "Premium Leather", price: 8000 },
    { id: "racing-alcantara", name: "Racing Alcantara", material: "Alcantara", price: 15000 },
  ]

  return (
    <div className="border-l border-border bg-card/30">
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-6 space-y-8">
          {/* Exterior Color */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Exterior Color</h3>
            <div className="grid grid-cols-3 gap-3">
              {exteriorColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => onColorChange(color.id)}
                  className={`relative aspect-square rounded-lg border-2 transition-all ${
                    selectedColor === color.id ? "border-primary ring-2 ring-primary/20" : "border-border"
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor === color.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Check size={16} className="text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-3 text-sm">
              <div className="font-medium capitalize">{selectedColor.replace("-", " ")}</div>
              <div className="text-muted-foreground">
                +${exteriorColors.find((c) => c.id === selectedColor)?.price.toLocaleString() || 0}
              </div>
            </div>
          </div>

          {/* Wheels */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Wheels</h3>
            <div className="space-y-3">
              {wheelOptions.map((wheel) => (
                <Card
                  key={wheel.id}
                  onClick={() => onWheelsChange(wheel.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedWheels === wheel.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{wheel.name}</div>
                      <div className="text-sm text-muted-foreground">{wheel.size}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">+${wheel.price.toLocaleString()}</div>
                      {selectedWheels === wheel.id && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-1 ml-auto">
                          <Check size={12} className="text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Interior */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Interior</h3>
            <div className="space-y-3">
              {interiorOptions.map((interior) => (
                <Card
                  key={interior.id}
                  onClick={() => onInteriorChange(interior.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedInterior === interior.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{interior.name}</div>
                      <div className="text-sm text-muted-foreground">{interior.material}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">+${interior.price.toLocaleString()}</div>
                      {selectedInterior === interior.id && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-1 ml-auto">
                          <Check size={12} className="text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Summary */}
          <Card className="p-6 bg-card border-primary/20">
            <h3 className="font-display text-lg font-bold mb-4">Configuration Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Price</span>
                <span className="font-semibold">$1,800,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exterior Color</span>
                <span className="font-semibold">
                  +${exteriorColors.find((c) => c.id === selectedColor)?.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wheels</span>
                <span className="font-semibold">
                  +${wheelOptions.find((w) => w.id === selectedWheels)?.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interior</span>
                <span className="font-semibold">
                  +${interiorOptions.find((i) => i.id === selectedInterior)?.price.toLocaleString()}
                </span>
              </div>
              <div className="pt-3 mt-3 border-t border-border flex justify-between">
                <span className="font-display font-bold">Total</span>
                <span className="font-display text-xl font-bold text-primary">
                  $
                  {(
                    1800000 +
                    (exteriorColors.find((c) => c.id === selectedColor)?.price || 0) +
                    (wheelOptions.find((w) => w.id === selectedWheels)?.price || 0) +
                    (interiorOptions.find((i) => i.id === selectedInterior)?.price || 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
