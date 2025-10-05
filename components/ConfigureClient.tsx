"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Check, Download, Share2, X, ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"

const exteriorColors = [
  { name: "Midnight Black", hex: "#0a0a0a", premium: false },
  { name: "Arctic White", hex: "#f8f8f8", premium: false },
  { name: "Racing Red", hex: "#c41e3a", premium: false },
  { name: "Ocean Blue", hex: "#1e3a8a", premium: true },
  { name: "Champagne Gold", hex: "#d4af37", premium: true },
  { name: "Carbon Graphite", hex: "#2d3436", premium: true },
]

const interiorOptions = [
  { name: "Black Leather", price: 0, image: "/int1.jpg" },
  { name: "Tan Leather", price: 2500, image: "/int2.jpg" },
  { name: "Red Racing Leather", price: 3500, image: "/int3.jpg" },
  { name: "Alcantara Carbon", price: 5000, image: "/int4.jpg" },
]

const wheels = [
  { name: '19" Sport Alloy', price: 0, image: "/sport.webp" },
  { name: '20" Performance', price: 3000, image: "/wheel4.webp" },
  { name: '21" Carbon Fiber', price: 8000, image: "/carbon.avif" },
  { name: '22" Forged Diamond', price: 12000, image: "/forged.png" },
]

const packages = [
  { name: "Sport Package", price: 15000, features: ["Adaptive Suspension", "Sport Exhaust", "Performance Brakes", "Launch Control"] },
  { name: "Luxury Package", price: 12000, features: ["Premium Sound System", "Massage Seats", "Ambient Lighting", "Panoramic Roof"] },
  { name: "Tech Package", price: 10000, features: ["360° Camera", "Head-Up Display", "Adaptive Cruise", "Night Vision"] },
  { name: "Carbon Package", price: 25000, features: ["Carbon Fiber Body Kit", "Carbon Fiber Interior", "Carbon Ceramic Brakes", "CF Wheels"] },
]

export default function PremiumGSAPConfigurator({ model = { name: "Thunder S9", price: 1800000 } }) {
  const basePrice = model.price
  const [selectedColor, setSelectedColor] = useState(exteriorColors[0])
  const [selectedInterior, setSelectedInterior] = useState(interiorOptions[0])
  const [selectedWheels, setSelectedWheels] = useState(wheels[0])
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("exterior")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const carPreviewRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)

  const packagesTotal = packages.filter(p => selectedPackages.includes(p.name)).reduce((sum, p) => sum + p.price, 0)
  const totalPrice = basePrice + selectedInterior.price + selectedWheels.price + packagesTotal

  const togglePackage = (packageName: string) => {
    setSelectedPackages(prev => prev.includes(packageName) ? prev.filter(p => p !== packageName) : [...prev, packageName])
  }

  const submitQuote = () => {
    toast.success("Quote request submitted! Our team will contact you soon.", { duration: 4000, position: "top-center" })
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap
      gsap.from(".header-animate", { y: -100, opacity: 0, duration: 0.8, ease: "power3.out" })
      gsap.from(".car-preview", { scale: 0.9, opacity: 0, duration: 1, ease: "power2.out", delay: 0.2 })
      gsap.from(".sidebar-animate", { x: 100, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.3 })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && optionsRef.current) {
      const gsap = window.gsap
      gsap.from(optionsRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      })
    }
  }, [activeTab])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && carPreviewRef.current) {
      const gsap = window.gsap
      gsap.from(carPreviewRef.current, {
        scale: 0.95,
        duration: 0.6,
        ease: "power2.out"
      })
    }
  }, [selectedColor])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && priceRef.current) {
      const gsap = window.gsap
      gsap.from(priceRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(2)"
      })
    }
  }, [totalPrice])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <Toaster />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

      {/* Header */}
      <div className="header-animate fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-6">
              <div className="text-right hidden md:block">
                <div className="text-xs text-white/50 uppercase tracking-wider">Total Price</div>
                <div ref={priceRef} className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                  ${(totalPrice / 1000000).toFixed(2)}M
                </div>
              </div>
              <button className="p-2.5 hover:bg-white/10 rounded-lg transition-all hover:scale-105">
                <Share2 size={20} />
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2">
                <Download size={18} />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 container mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-[1fr,420px] gap-8">
          {/* Main Content */}
          <div>
              <Link href="/models" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-black">Back to Models</span>
            </Link>
            {/* Title */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-transparent"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-medium">Configure</span>
              </div>
              <h1 className="text-5xl font-bold mb-2">{model.name}</h1>
              <p className="text-white/60">Craft your perfect machine</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {[
                { id: "exterior", label: "Exterior", icon: "🎨" },
                { id: "interior", label: "Interior", icon: "💺" },
                { id: "wheels", label: "Wheels", icon: "⚙️" },
                { id: "packages", label: "Packages", icon: "✨" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg shadow-amber-500/30"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Car Preview */}
            <div ref={carPreviewRef} className="car-preview relative mb-8 rounded-2xl overflow-hidden" style={{ 
              background: `radial-gradient(circle at center, ${selectedColor.hex}40 0%, transparent 70%)` 
            }}>
              <div className="aspect-[16/9] relative bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm border border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center">
                    <div 
                      className="w-80 h-40 mx-auto mb-6 rounded-2xl shadow-2xl transition-all duration-700 relative"
                      style={{ 
                        backgroundColor: selectedColor.hex,
                        boxShadow: `0 25px 50px -12px ${selectedColor.hex}80`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedColor.hex }}></div>
                      <span className="text-sm font-medium">{selectedColor.name}</span>
                      {selectedColor.premium && (
                        <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full flex items-center gap-1">
                          <Sparkles size={10} />
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Options Content */}
            <div ref={optionsRef}>
              {/* Exterior Colors */}
              {activeTab === "exterior" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span>🎨</span>
                    <span>Exterior Paint</span>
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {exteriorColors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative p-5 rounded-xl transition-all ${
                          selectedColor.name === color.name
                            ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-2 border-amber-500 scale-105"
                            : "bg-white/5 border-2 border-white/10 hover:border-white/30 hover:scale-102"
                        }`}
                      >
                        <div 
                          className="w-full aspect-square rounded-xl mb-4 shadow-xl transition-transform group-hover:scale-105"
                          style={{ 
                            backgroundColor: color.hex,
                            boxShadow: `0 10px 30px ${color.hex}60`
                          }}
                        ></div>
                        <p className="font-semibold text-sm">{color.name}</p>
                        {color.premium && (
                          <span className="text-xs text-amber-400 flex items-center gap-1 mt-1">
                            <Sparkles size={10} />
                            Premium
                          </span>
                        )}
                        {selectedColor.name === color.name && (
                          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center">
                            <Check size={14} className="text-black" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interior */}
              {activeTab === "interior" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span>💺</span>
                    <span>Interior Finish</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {interiorOptions.map(interior => (
                      <button
                        key={interior.name}
                        onClick={() => setSelectedInterior(interior)}
                        className={`group relative p-5 rounded-xl transition-all text-left ${
                          selectedInterior.name === interior.name
                            ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-2 border-amber-500 scale-102"
                            : "bg-white/5 border-2 border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="aspect-video w-full rounded-lg mb-4 overflow-hidden">
                          <img src={interior.image} alt={interior.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <p className="font-semibold mb-1">{interior.name}</p>
                        <p className="text-amber-400 font-bold">
                          {interior.price === 0 ? "Included" : `+$${interior.price.toLocaleString()}`}
                        </p>
                        {selectedInterior.name === interior.name && (
                          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center">
                            <Check size={14} className="text-black" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Wheels */}
              {activeTab === "wheels" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span>⚙️</span>
                    <span>Performance Wheels</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {wheels.map(wheel => (
                      <button
                        key={wheel.name}
                        onClick={() => setSelectedWheels(wheel)}
                        className={`group relative p-5 rounded-xl transition-all text-left ${
                          selectedWheels.name === wheel.name
                            ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-2 border-amber-500 scale-102"
                            : "bg-white/5 border-2 border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="aspect-square w-full rounded-full mb-4 overflow-hidden">
                          <img src={wheel.image} alt={wheel.name} className="w-full h-full object-cover group-hover:rotate-180 transition-transform duration-700" />
                        </div>
                        <p className="font-semibold mb-1">{wheel.name}</p>
                        <p className="text-amber-400 font-bold">
                          {wheel.price === 0 ? "Included" : `+$${wheel.price.toLocaleString()}`}
                        </p>
                        {selectedWheels.name === wheel.name && (
                          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center">
                            <Check size={14} className="text-black" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Packages */}
              {activeTab === "packages" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span>✨</span>
                    <span>Enhancement Packages</span>
                  </h2>
                  <div className="space-y-4">
                    {packages.map(pkg => (
                      <button
                        key={pkg.name}
                        onClick={() => togglePackage(pkg.name)}
                        className={`w-full p-6 rounded-xl transition-all text-left ${
                          selectedPackages.includes(pkg.name)
                            ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-2 border-amber-500"
                            : "bg-white/5 border-2 border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                            <p className="text-amber-400 font-bold">+${pkg.price.toLocaleString()}</p>
                          </div>
                          <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedPackages.includes(pkg.name) ? "border-amber-500 bg-amber-500" : "border-white/30"
                          }`}>
                            {selectedPackages.includes(pkg.name) && <Check size={14} className="text-black" />}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {pkg.features.map(feature => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-white/70">
                              <Check size={12} className="text-amber-400" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-animate lg:sticky lg:top-24 h-fit">
            <div className="bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <span>Configuration</span>
                <ChevronRight size={20} className="text-amber-500" />
              </h3>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between py-2">
                  <span className="text-white/60">Base Price</span>
                  <span className="font-semibold">${basePrice.toLocaleString()}</span>
                </div>
                {selectedInterior.price > 0 && (
                  <div className="flex justify-between py-2 border-t border-white/10">
                    <span className="text-white/60">Interior</span>
                    <span className="font-semibold text-amber-400">+${selectedInterior.price.toLocaleString()}</span>
                  </div>
                )}
                {selectedWheels.price > 0 && (
                  <div className="flex justify-between py-2 border-t border-white/10">
                    <span className="text-white/60">Wheels</span>
                    <span className="font-semibold text-amber-400">+${selectedWheels.price.toLocaleString()}</span>
                  </div>
                )}
                {selectedPackages.length > 0 && (
                  <div className="flex justify-between py-2 border-t border-white/10">
                    <span className="text-white/60">Packages ({selectedPackages.length})</span>
                    <span className="font-semibold text-amber-400">+${packagesTotal.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-white/20 pt-6 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-white/60 uppercase tracking-wider">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 font-bold hover:scale-105 transition-all shadow-lg shadow-amber-500/30"
                >
                  Request Quote
                </button>
                <button className="w-full py-4 rounded-xl border-2 border-white/20 hover:bg-white/10 transition-all font-semibold">
                  Schedule Test Drive
                </button>
              </div>

              <p className="text-xs text-white/40 mt-6 text-center">
                * Final pricing may vary by location and dealer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Your Configuration</h2>
                <p className="text-white/60">{model.name}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: selectedColor.hex }}></div>
                  <div>
                    <p className="text-sm text-white/60">Exterior</p>
                    <p className="font-semibold text-lg">{selectedColor.name}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-white/60 mb-2">Interior</p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{selectedInterior.name}</p>
                  {selectedInterior.price > 0 && <p className="text-amber-400">+${selectedInterior.price.toLocaleString()}</p>}
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-white/60 mb-2">Wheels</p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{selectedWheels.name}</p>
                  {selectedWheels.price > 0 && <p className="text-amber-400">+${selectedWheels.price.toLocaleString()}</p>}
                </div>
              </div>

              {selectedPackages.length > 0 && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-white/60 mb-3">Packages</p>
                  <div className="space-y-2">
                    {packages.filter(p => selectedPackages.includes(p.name)).map(pkg => (
                      <div key={pkg.name} className="flex justify-between">
                        <span className="font-medium">{pkg.name}</span>
                        <span className="text-amber-400">+${pkg.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-6 bg-gradient-to-r from-amber-500/20 to-yellow-600/10 rounded-xl border border-amber-500/50">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Price</span>
                  <span className="text-3xl font-bold text-amber-400">${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={submitQuote}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 font-bold hover:scale-105 transition-all"
              >
                Submit Quote Request
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-4 rounded-xl border-2 border-white/20 hover:bg-white/10 transition-all font-semibold"
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}