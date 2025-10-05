"use client"

import { useState } from "react"
import Image from "next/image"
import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConfiguratorPreviewProps {
  selectedModel: string
  selectedColor: string
  selectedWheels: string
}

export function ConfiguratorPreview({ selectedModel, selectedColor, selectedWheels }: ConfiguratorPreviewProps) {
  const [viewAngle, setViewAngle] = useState<"front" | "side" | "rear">("side")

  const getCarImage = () => {
    // In a real app, this would dynamically load different images based on selections
    if (selectedColor === "racing-yellow") {
      return "/yellow-supercar-racing.jpg"
    } else if (selectedColor === "carbon-silver") {
      return "/silver-grand-tourer-side-view.jpg"
    }
    return "/black-hypercar-front-view.jpg"
  }

  return (
    <div className="relative bg-gradient-to-br from-background via-muted/20 to-background min-h-[600px] lg:min-h-screen flex items-center justify-center p-8">
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Car Preview */}
      <div className="relative w-full max-w-4xl">
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
          <Image src={getCarImage() || "/placeholder.svg"} alt="Car preview" fill className="object-contain" priority />
        </div>

        {/* View Angle Selector */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full p-2">
          <Button
            size="sm"
            variant={viewAngle === "front" ? "default" : "ghost"}
            onClick={() => setViewAngle("front")}
            className={viewAngle === "front" ? "bg-primary text-primary-foreground" : ""}
          >
            Front
          </Button>
          <Button
            size="sm"
            variant={viewAngle === "side" ? "default" : "ghost"}
            onClick={() => setViewAngle("side")}
            className={viewAngle === "side" ? "bg-primary text-primary-foreground" : ""}
          >
            Side
          </Button>
          <Button
            size="sm"
            variant={viewAngle === "rear" ? "default" : "ghost"}
            onClick={() => setViewAngle("rear")}
            className={viewAngle === "rear" ? "bg-primary text-primary-foreground" : ""}
          >
            Rear
          </Button>
        </div>

        {/* 360 Rotate Button */}
        <Button
          size="icon"
          variant="outline"
          className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm border-border"
        >
          <RotateCw size={18} />
        </Button>
      </div>

      {/* Info Badge */}
      <div className="absolute top-8 left-8 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4">
        <div className="text-xs text-muted-foreground mb-1">Current Selection</div>
        <div className="font-display text-lg font-bold">Thunder S9</div>
        <div className="text-sm text-muted-foreground capitalize">{selectedColor.replace("-", " ")}</div>
      </div>
    </div>
  )
}
