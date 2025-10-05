'use client'

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Download, Share2, Check, Eye, X, Sparkles, CheckCircle2, Menu } from "lucide-react"
import Link from "next/link"

const carModels = [
  {
    id: "aventador",
    name: "Aventador SVJ",
    series: "Aventador Series",
    category: "V12 Hypercar",
    price: 517770,
    specs: { horsepower: 770, topSpeed: 217, acceleration: "2.8s", engine: "6.5L V12" },
    description: "The ultimate expression of Lamborghini's naturally aspirated V12 engine.",
    images: {
      front: "/aven1.png",
      side: "/lamo2.jpg",
      rear: "/lamo3.jpg"
    }
  },
  {
    id: "huracan",
    name: "Huracán STO",
    series: "Huracán Series",
    category: "V10 Supercar",
    price: 327838,
    specs: { horsepower: 640, topSpeed: 193, acceleration: "3.0s", engine: "5.2L V10" },
    description: "Super Trofeo Omologata: race-bred technology for the road.",
    images: {
      front: "/hur1.png",
      side: "/hur2.jpg",
      rear: "/hur3.png"
    }
  },
  {
    id: "revuelto",
    name: "Revuelto",
    series: "Revuelto Series",
    category: "V12 Hybrid",
    price: 608358,
    specs: { horsepower: 1001, topSpeed: 217, acceleration: "2.5s", engine: "V12 Hybrid" },
    description: "The first high-performance hybrid super sports car in Lamborghini's history.",
    images: {
      front: "/ruv1.png",
      side: "/ruv2.png",
      rear: "/ruv3.png"
    }
  },
  {
    id: "urus",
    name: "Urus Performante",
    series: "Urus Series",
    category: "Super SUV",
    price: 260000,
    specs: { horsepower: 666, topSpeed: 190, acceleration: "3.3s", engine: "4.0L V8 Twin-Turbo" },
    description: "The world's first Super Sport Utility Vehicle.",
    images: {
      front: "/urus1.png",
      side: "/urus2.png",
      rear: "/urus3.png"
    }
  }
]

const exteriorColors = [
  { id: "giallo-orion", name: "Giallo Orion", hex: "#FFD700", price: 0 },
  { id: "arancio-borealis", name: "Arancio Borealis", hex: "#FF6B00", price: 12800 },
  { id: "verde-mantis", name: "Verde Mantis", hex: "#3FFF00", price: 12800 },
  { id: "blu-nethuns", name: "Blu Nethuns", hex: "#0095FF", price: 12800 },
  { id: "rosso-mars", name: "Rosso Mars", hex: "#DC143C", price: 12800 },
  { id: "nero-aldebaran", name: "Nero Aldebaran", hex: "#0B0B0B", price: 0 },
  { id: "bianco-icarus", name: "Bianco Icarus", hex: "#F8F8F8", price: 8500 },
  { id: "grigio-titans", name: "Grigio Titans", hex: "#52595D", price: 8500 },
]

const wheelOptions = [
  { id: "dione", name: "Dione Forged", size: '20"', price: 8500, icon: "⭕" },
  { id: "taigete", name: "Taigete Carbon", size: '21"', price: 15200, icon: "⚫" },
  { id: "leirion", name: "Leirion Gloss", size: '20"', price: 11000, icon: "🔘" },
  { id: "dianthus", name: "Dianthus Black", size: '21"', price: 13500, icon: "⚙️" },
]

const interiorOptions = [
  { id: "nero-ade", name: "Nero Ade", material: "Alcantara/Leather", color: "#1a1a1a", price: 0 },
  { id: "rosso-alala", name: "Rosso Alala", material: "Premium Leather", color: "#8B0000", price: 14500 },
  { id: "bianco-leda", name: "Bianco Leda", material: "Luxury Leather", color: "#F5F5DC", price: 14500 },
  { id: "arancio", name: "Arancio", material: "Carbon/Leather", color: "#FF6B00", price: 18900 },
]

function App() {
  const [step, setStep] = useState(1)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedColor, setSelectedColor] = useState("giallo-orion")
  const [selectedWheels, setSelectedWheels] = useState("dione")
  const [selectedInterior, setSelectedInterior] = useState("nero-ade")
  const [viewAngle] = useState<"front" | "side" | "rear">("side")
  const [isAnimating, setIsAnimating] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const carImageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const currentModel = carModels.find(m => m.id === selectedModel)
  const currentColor = exteriorColors.find(c => c.id === selectedColor)
  const currentWheels = wheelOptions.find(w => w.id === selectedWheels)
  const currentInterior = interiorOptions.find(i => i.id === selectedInterior)

  const totalPrice =
    (currentModel?.price || 0) +
    (currentColor?.price || 0) +
    (currentWheels?.price || 0) +
    (currentInterior?.price || 0)

  useEffect(() => {
    if (!carImageRef.current) return

    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 600)
    return () => clearTimeout(timer)
  }, [viewAngle, selectedModel, selectedColor])

  useEffect(() => {
    if (!contentRef.current) return
    contentRef.current.style.opacity = '0'
    contentRef.current.style.transform = 'translateY(20px)'

    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        contentRef.current.style.opacity = '1'
        contentRef.current.style.transform = 'translateY(0)'
      }
    })
  }, [step])

  const handleNext = () => {
    if (step < 4) {
      setStep(s => s + 1)
    } else {
      setShowPopup(true)
    }
  }

  const handleSaveBuild = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${currentColor?.hex}20 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${currentColor?.hex}15 0%, transparent 50%)`,
            transition: 'background-image 0.8s ease'
          }}
        />
      </div>

      <header className="relative border-b border-zinc-800/50 bg-zinc-900/80 backdrop-blur-2xl top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/">
            <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-yellow-500 transition-colors group" >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </button>
            </Link>
            <div className="h-6 sm:h-8 w-px bg-zinc-800" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-xl tracking-tight">Lamborghini Configurator</h1>
                <Sparkles size={14} className="text-yellow-500 hidden sm:block" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-1">
                  {[1,2,3,4].map(s => (
                    <div
                      key={s}
                      className={`h-1 w-6 sm:w-8 rounded-full transition-all duration-300 ${
                        s <= step ? 'bg-yellow-500' : 'bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-zinc-500 hidden sm:block">
                  {step === 1 ? "Model" : step === 2 ? "Exterior" : step === 3 ? "Wheels" : "Interior"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-right hidden md:block">
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Total</div>
              <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ${totalPrice.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 sm:hidden hover:bg-zinc-800 rounded-xl transition-all"
            >
              <Menu size={20} />
            </button>
            <button className="p-2 sm:p-2.5 hover:bg-zinc-800 rounded-xl transition-all hover:scale-110 hidden sm:block">
              <Share2 size={20} />
            </button>
            <button className="px-3 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-xl hover:shadow-orange-500/50 transition-all flex items-center gap-2 hover:scale-105 text-sm">
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="sm:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Total Price</span>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <button className="w-full py-2.5 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all">
              <Share2 size={18} />
              <span>Share Configuration</span>
            </button>
          </div>
        )}
      </header>

      <div className="relative flex flex-col lg:grid lg:grid-cols-[1fr,500px] min-h-[calc(100vh-89px)]">
        <div className="relative flex items-center justify-center p-4 sm:p-6 lg:p-16 order-2 lg:order-1">
          {currentModel ? (
            <div className="w-full max-w-6xl space-y-4 sm:space-y-6">
              <div
                ref={carImageRef}
                className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden group"
                style={{
                  background: `radial-gradient(ellipse at center, ${currentColor?.hex}20, transparent 70%)`,
                  boxShadow: `0 25px 50px -12px ${currentColor?.hex}40`,
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="relative w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center rounded-2xl shadow-inner overflow-hidden">
                  {currentModel && (
                    <img
                      src={currentModel.images.front}
                      alt={`${currentModel.name} - Front View`}
                      className={`object-contain w-full h-full transition-all duration-700 ${
                        isAnimating ? "scale-90 opacity-60" : "scale-100 opacity-100"
                      }`}
                    />
                  )}
                </div>

                <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex items-center gap-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2">
                  <Eye size={14} className="text-yellow-500" />
                  <span className="text-xs font-medium">360° View</span>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-yellow-500/30 transition-all">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-3">
                  <div>
                    <div className="text-xs text-yellow-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-2 flex-wrap">
                      <span>{currentModel.series}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      <span>{currentModel.category}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">{currentModel.name}</h2>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl">{currentModel.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-zinc-800">
                  {[
                    { label: "Power", value: `${currentModel.specs.horsepower} HP`, highlight: true },
                    { label: "0-60 MPH", value: currentModel.specs.acceleration, highlight: false },
                    { label: "Top Speed", value: `${currentModel.specs.topSpeed} MPH`, highlight: false },
                    { label: "Engine", value: currentModel.specs.engine, highlight: false },
                  ].map((spec, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-zinc-500 mb-1 sm:mb-2">{spec.label}</div>
                      <div className={`text-base sm:text-lg lg:text-xl font-bold ${spec.highlight ? 'text-yellow-500' : ''}`}>
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-md animate-pulse py-8 sm:py-0">
              <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-6xl sm:text-8xl border border-yellow-500/20">
                🏎️
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Choose Your Lamborghini
              </h3>
              <p className="text-zinc-500 text-base sm:text-lg">Select from our exclusive collection</p>
            </div>
          )}
        </div>

        <div className="border-t lg:border-t-0 lg:border-l border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl overflow-y-auto order-1 lg:order-2 max-h-[60vh] lg:max-h-none">
          <div ref={contentRef} className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {step === 1 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Select Your Model</h2>
                <p className="text-zinc-500 mb-6 sm:mb-8 text-sm sm:text-base">Four icons of Italian excellence</p>
                <div className="space-y-3">
                  {carModels.map(model => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all text-left group hover:scale-[1.02] ${
                        selectedModel === model.id
                          ? "border-yellow-500 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 shadow-2xl shadow-yellow-500/20"
                          : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex-1">
                          <div className="text-xs text-yellow-500 font-bold uppercase tracking-wider mb-1 sm:mb-2">
                            {model.series}
                          </div>
                          <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">{model.name}</h3>
                          <p className="text-xs text-zinc-500 leading-relaxed hidden sm:block">{model.description}</p>
                        </div>
                        {selectedModel === model.id && (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Check size={14} className="text-black sm:w-4 sm:h-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-zinc-800">
                        <div className="flex gap-3 sm:gap-6 text-xs text-zinc-400 font-medium">
                          <span>{model.specs.horsepower} HP</span>
                          <span className="hidden sm:inline">{model.specs.acceleration}</span>
                          <span>{model.specs.topSpeed} MPH</span>
                        </div>
                        <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                          ${(model.price / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Exterior Color</h2>
                <p className="text-zinc-500 mb-6 sm:mb-8 text-sm sm:text-base">Iconic Lamborghini paint</p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
                  {exteriorColors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`group relative aspect-square rounded-xl sm:rounded-2xl border-2 transition-all hover:scale-110 ${
                        selectedColor === color.id
                          ? "border-yellow-500 ring-2 sm:ring-4 ring-yellow-500/30 scale-110 shadow-2xl"
                          : "border-zinc-800 hover:border-zinc-600"
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        boxShadow: selectedColor === color.id ? `0 20px 40px ${color.hex}60` : 'none'
                      }}
                    >
                      {selectedColor === color.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">
                            <Check size={16} className="text-black sm:w-5 sm:h-5" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg sm:text-xl mb-1">{currentColor?.name}</div>
                      <div className="text-sm text-zinc-500">Premium Finish</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        {currentColor?.price === 0 ? "Standard" : `+$${currentColor?.price.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Wheel Selection</h2>
                <p className="text-zinc-500 mb-6 sm:mb-8 text-sm sm:text-base">Performance engineering</p>
                <div className="space-y-3">
                  {wheelOptions.map(wheel => (
                    <button
                      key={wheel.id}
                      onClick={() => setSelectedWheels(wheel.id)}
                      className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all text-left hover:scale-[1.02] ${
                        selectedWheels === wheel.id
                          ? "border-yellow-500 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 shadow-2xl shadow-yellow-500/20"
                          : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-5">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-3xl sm:text-4xl border border-zinc-700 shadow-xl">
                            {wheel.icon}
                          </div>
                          <div>
                            <div className="font-bold text-base sm:text-lg mb-1">{wheel.name}</div>
                            <div className="text-xs sm:text-sm text-zinc-500">{wheel.size} • Forged Aluminum</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="text-right">
                            <div className="font-bold text-base sm:text-xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                              +${wheel.price.toLocaleString()}
                            </div>
                          </div>
                          {selectedWheels === wheel.id && (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                              <Check size={14} className="text-black sm:w-4 sm:h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Interior Finish</h2>
                <p className="text-zinc-500 mb-6 sm:mb-8 text-sm sm:text-base">Handcrafted luxury</p>
                <div className="space-y-3">
                  {interiorOptions.map(interior => (
                    <button
                      key={interior.id}
                      onClick={() => setSelectedInterior(interior.id)}
                      className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all text-left hover:scale-[1.02] ${
                        selectedInterior === interior.id
                          ? "border-yellow-500 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 shadow-2xl shadow-yellow-500/20"
                          : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-5">
                          <div
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl border-2 border-zinc-700 shadow-xl"
                            style={{ backgroundColor: interior.color }}
                          >
                            💺
                          </div>
                          <div>
                            <div className="font-bold text-base sm:text-lg mb-1">{interior.name}</div>
                            <div className="text-xs sm:text-sm text-zinc-500">{interior.material}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="text-right">
                            <div className="font-bold text-base sm:text-xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                              {interior.price === 0 ? "Standard" : `+$${interior.price.toLocaleString()}`}
                            </div>
                          </div>
                          {selectedInterior === interior.id && (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                              <Check size={14} className="text-black sm:w-4 sm:h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-zinc-800 gap-3">
              <button
                onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-zinc-800 hover:bg-zinc-800 hover:border-yellow-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !selectedModel) ||
                  (step === 2 && !selectedColor) ||
                  (step === 3 && !selectedWheels) ||
                  (step === 4 && !selectedInterior)
                }
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:shadow-2xl hover:shadow-orange-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
              >
                {step === 4 ? "Complete Build" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-500/40 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 animate-pulse" />

            <div className="relative p-5 sm:p-6">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-800 hover:bg-yellow-500 text-white hover:text-black transition-all flex items-center justify-center hover:rotate-90 hover:scale-110"
              >
                <X size={16} />
              </button>

              <div className="text-center mb-4 sm:mb-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl sm:text-3xl shadow-2xl shadow-yellow-500/50">
                  🏆
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                  Configuration Complete!
                </h2>
                <p className="text-zinc-400 text-sm">
                  Your dream Lamborghini is ready
                </p>
              </div>

              <div className="bg-zinc-900/60 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 space-y-2.5 sm:space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Model</span>
                  <span className="font-medium text-yellow-400">{currentModel?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Exterior</span>
                  <span className="font-medium" style={{ color: currentColor?.hex }}>
                    {currentColor?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Wheels</span>
                  <span className="font-medium text-zinc-200">{currentWheels?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Interior</span>
                  <span className="font-medium text-zinc-200">{currentInterior?.name}</span>
                </div>
                <div className="flex justify-between text-base pt-2 sm:pt-3 border-t border-zinc-800">
                  <span className="text-zinc-300 font-medium">Total Price</span>
                  <span className="font-bold text-yellow-400">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button onClick={handleSaveBuild} className="w-full px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-all hover:scale-105 active:scale-95 text-sm sm:text-base">
                  Save Build
                </button>
                <button className="w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-all hover:scale-105 active:scale-95 text-sm sm:text-base">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-[calc(100vw-2rem)]">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
            <CheckCircle2 size={20} className="flex-shrink-0" />
            <span>Build saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
