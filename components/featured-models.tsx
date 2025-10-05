"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Image from "next/image"

const cars = [
  {
    id: 1,
    name: "APEX GT-R",
    tagline: "YOU CAN'T HIDE WHO YOU ARE",
    image: "/model1.webp",
    specs: { power: "1015 HP", speed: "350+ km/h", acceleration: "2.5s" },
    color: "#1a1a2e",
  },
  {
    id: 2,
    name: "VELOCITY X",
    tagline: "PURE ADRENALINE UNLEASHED",
    image: "/model2.webp",
    specs: { power: "840 HP", speed: "330 km/h", acceleration: "2.8s" },
    color: "#16213e",
  },
  {
    id: 3,
    name: "PHANTOM ELITE",
    tagline: "ELEGANCE MEETS PERFORMANCE",
    image: "/model3.webp",
    specs: { power: "750 HP", speed: "310 km/h", acceleration: "3.2s" },
    color: "#0f3460",
  },
]

export default function CarSwiperHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(0)

  const goToNext = () => {
    if (isAnimating) return
    setDirection(1)
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % cars.length)
  }

  const goToPrev = () => {
    if (isAnimating) return
    setDirection(-1)
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length)
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const currentCar = cars[currentIndex]

  return (
    <div
      className="relative h-screen w-full overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: currentCar.color }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

   

      {/* Car name watermark */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <h2
          className="text-[12rem] font-black text-white/5 whitespace-nowrap tracking-wider transition-opacity duration-700"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? `translateX(${direction * 100}px)` : "translateX(0)",
            transition: "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        >
          {currentCar.name}
        </h2>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Tagline */}
        <div className="text-center mb-8 overflow-hidden">
          <h1
            className="text-5xl md:text-7xl font-black text-white tracking-wider px-4 transition-all duration-700"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? `translateY(${direction * 50}px)` : "translateY(0)",
              transition: "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            {currentCar.tagline}
          </h1>
        </div>

        {/* Car image */}
        <div className="relative w-full max-w-6xl h-[400px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute w-full h-full flex items-center justify-center"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating
                ? `translateX(${direction * 100}%) scale(0.8)`
                : "translateX(0) scale(1)",
              transition: "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            <Image
              src={currentCar.image}
              alt={currentCar.name}
              width={900}
              height={400}
              priority
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Car name */}
        <div className="mt-8 overflow-hidden">
          <h3
            className="text-4xl md:text-6xl font-bold text-white tracking-[0.2em] transition-all duration-700"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? `translateY(${-direction * 30}px)` : "translateY(0)",
              transition: "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            {currentCar.name}
          </h3>
        </div>

        {/* Specs */}
        <div
          className="flex gap-12 mt-8 transition-all duration-700"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "scale(0.9)" : "scale(1)",
            transition: "all 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.2s",
          }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{currentCar.specs.power}</div>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Power</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{currentCar.specs.speed}</div>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Top Speed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{currentCar.specs.acceleration}</div>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1">0-100 km/h</div>
          </div>
        </div>

        {/* CTA Button
        <button
          className="mt-12 px-8 py-4 border-2 border-white text-white font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 group"
          style={{
            opacity: isAnimating ? 0 : 1,
            transition: "opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.3s",
          }}
        >
          EXPLORE MODEL
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button> */}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        disabled={isAnimating}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-40 w-16 h-16 border-2 border-white/30 hover:border-white hover:bg-white/10 text-white transition-all duration-300 flex items-center justify-center group disabled:opacity-50"
        style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 50%, 100% 100%, 25% 100%, 50% 50%)" }}
      >
        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        disabled={isAnimating}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-40 w-16 h-16 border-2 border-white/30 hover:border-white hover:bg-white/10 text-white transition-all duration-300 flex items-center justify-center group disabled:opacity-50"
        style={{ clipPath: "polygon(0% 0%, 75% 0%, 50% 50%, 75% 100%, 0% 100%, 25% 50%)" }}
      >
        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-40">
        {cars.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentIndex) {
                setDirection(index > currentIndex ? 1 : -1)
                setIsAnimating(true)
                setCurrentIndex(index)
              }
            }}
            disabled={isAnimating}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-12 h-1.5 bg-white"
                : "w-8 h-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-8 text-white/60 text-xs tracking-widest">
        {String(currentIndex + 1).padStart(2, "0")} / {String(cars.length).padStart(2, "0")}
      </div>
    </div>
  )
}
