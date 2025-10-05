"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, User, Mail, Phone, CheckCircle2, Car, Gauge } from "lucide-react"
import { carModels } from "@/lib/models-data"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
]

const dealers = [
  { id: "1", name: "Beverly Hills Showroom", address: "9876 Sunset Boulevard, Beverly Hills, CA 90210", distance: "2.3 mi" },
  { id: "2", name: "Manhattan Flagship", address: "1234 Park Avenue, New York, NY 10021", distance: "4.1 mi" },
  { id: "3", name: "Miami Beach Gallery", address: "5678 Ocean Drive, Miami Beach, FL 33139", distance: "6.8 mi" },
  { id: "4", name: "Dubai Marina Center", address: "Sheikh Zayed Road, Dubai Marina, UAE", distance: "8.2 mi" },
]

export default function TestDrivePage() {
  const [step, setStep] = useState(1)
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedDealer, setSelectedDealer] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    comments: ""
  })
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()
  
  // Refs for animation targets
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const dealerCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const timeSlotRefs = useRef<(HTMLButtonElement | null)[]>([])

  const selectedCar = carModels.find(m => m.id === selectedModel)

  // Initialize animations
  useEffect(() => {
    if (typeof window === "undefined") return
    
    // Header entrance animation
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    
    // Progress indicator animation
    if (progressRef.current) {
      gsap.from(progressRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.2,
        ease: "power2.out"
      })
    }
    
    // Step content entrance
    if (stepRefs.current[step - 1]) {
      gsap.fromTo(stepRefs.current[step - 1], 
        { opacity: 0, x: step === 1 ? 0 : (step > 1 ? 50 : -50) }, 
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      )
    }
    
    // Cleanup function
    return () => {
      gsap.killTweensOf([
        headerRef.current, 
        progressRef.current, 
        ...stepRefs.current
      ])
    }
  }, [step])

  // Animate step transitions
  useEffect(() => {
    if (stepRefs.current[step - 1]) {
      // Reset previous animations
      gsap.set(stepRefs.current[step - 1], { opacity: 0, x: step > 1 ? 50 : -50 })
      
      // Animate new step
      gsap.to(stepRefs.current[step - 1], {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out"
      })
    }
  }, [step])

  // Animate car model selection
  useEffect(() => {
    if (selectedModel && carCardRefs.current.length > 0) {
      const selectedIndex = carModels.findIndex(m => m.id === selectedModel)
      if (carCardRefs.current[selectedIndex]) {
        gsap.to(carCardRefs.current[selectedIndex], {
          scale: 1.03,
          borderColor: "#3b82f6",
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }
  }, [selectedModel])

  // Animate dealer selection
  useEffect(() => {
    if (selectedDealer && dealerCardRefs.current.length > 0) {
      const selectedIndex = dealers.findIndex(d => d.id === selectedDealer)
      if (dealerCardRefs.current[selectedIndex]) {
        gsap.to(dealerCardRefs.current[selectedIndex], {
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.05)",
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }
  }, [selectedDealer])

  // Animate time slot selection
  useEffect(() => {
    if (selectedTime && timeSlotRefs.current.length > 0) {
      const selectedIndex = timeSlots.findIndex(t => t === selectedTime)
      if (timeSlotRefs.current[selectedIndex]) {
        gsap.to(timeSlotRefs.current[selectedIndex], {
          backgroundColor: "#3b82f6",
          color: "white",
          borderColor: "#3b82f6",
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }
  }, [selectedTime])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    setSubmitted(true)
    

  }

  const isStepComplete = (stepNum: number) => {
    switch(stepNum) {
      case 1: return selectedModel !== ""
      case 2: return selectedDealer !== ""
      case 3: return selectedDate !== "" && selectedTime !== ""
      case 4: return formData.firstName && formData.lastName && formData.email && formData.phone
      default: return false
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
            <CheckCircle2 size={48} className="text-primary relative z-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Test Drive Confirmed!
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Your test drive has been successfully scheduled. We've sent a confirmation email to <span className="font-semibold text-primary">{formData.email}</span>.
          </p>
          
          <div className="bg-card border border-border rounded-xl p-8 mb-10 text-left shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Car className="text-primary" />
              Appointment Details
            </h2>
            <div className="space-y-7">
              {/* Selected Car */}
              <div className="flex items-start gap-5 p-4 rounded-lg bg-accent/30 border border-accent/20">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Car className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">{selectedCar?.name}</p>
                  <p className="text-sm text-muted-foreground mb-3">{selectedCar?.series}</p>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      <Gauge className="text-primary" size={16} />
                      <span className="text-sm">{selectedCar?.specs.horsepower} HP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-primary" size={16} />
                      <span className="text-sm">0-60: {selectedCar?.specs.acceleration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="text-primary" size={16} />
                      <span className="text-sm">{selectedCar?.specs.topSpeed} mph</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="text-primary" size={16} />
                      <span className="text-sm">{selectedCar?.specs.engine}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dealer */}
              <div className="flex items-start gap-5 p-4 rounded-lg bg-accent/30 border border-accent/20">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">{dealers.find(d => d.id === selectedDealer)?.name}</p>
                  <p className="text-sm text-muted-foreground">{dealers.find(d => d.id === selectedDealer)?.address}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-start gap-5 p-4 rounded-lg bg-accent/30 border border-accent/20">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Calendar className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">{selectedDate}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock size={16} />
                    {selectedTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                setSubmitted(false)
                setStep(1)
                setSelectedModel("")
                setSelectedDealer("")
                setSelectedDate("")
                setSelectedTime("")
                setFormData({ firstName: "", lastName: "", email: "", phone: "", experience: "", comments: "" })
              }}
              className="px-6 py-3.5 rounded-lg border border-border hover:bg-accent transition-colors font-medium"
            >
              Schedule Another
            </button>
            <button className="px-6 py-3.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2">
              <Calendar size={18} />
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/70 backdrop-blur-xl sticky top-0 z-10" ref={headerRef}>
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <button 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Models
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
              <span className="text-sm font-medium text-primary tracking-wider uppercase px-3 py-1 bg-primary/10 rounded-full">
                Experience Excellence
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Schedule Your Test Drive
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Book a personalized test drive experience with one of our expert consultants
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-12" ref={progressRef}>
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((num, idx) => (
                <div key={num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-300 ${
                      step > num 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : step === num
                        ? "border-primary bg-transparent text-primary shadow-lg"
                        : "border-border/50 bg-card text-muted-foreground"
                    }`}>
                      {step > num ? <CheckCircle2 size={20} /> : num}
                    </div>
                    <span className={`text-xs mt-3 font-medium transition-colors duration-300 ${
                      step >= num ? "text-foreground" : "text-muted-foreground/70"
                    }`}>
                      {["Select Model", "Choose Location", "Pick Date & Time", "Your Details"][num - 1]}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className={`h-1 flex-1 mx-2 rounded-full transition-all duration-500 ${
                      step > num ? "bg-primary" : "bg-border/30"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl">
            {/* Step 1: Select Model */}
            <div 
            //@ts-expect-error:error
              ref={el => stepRefs.current[0] = el}
              className={`transition-opacity duration-500 ${step === 1 ? 'block' : 'hidden'}`}
            >
              <h2 className="text-2xl font-bold mb-6">Select Your Model</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {carModels.map((model, index) => (
                  <div 
                    key={model.id}
                    //@ts-expect-error:error
                    ref={el => carCardRefs.current[index] = el}
                    className="overflow-hidden rounded-xl border-2 border-border/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <button
                      onClick={() => setSelectedModel(model.id)}
                      className="w-full text-left"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div>
                            <h3 className="font-bold text-lg text-white">{model.name}</h3>
                            <p className="text-sm text-primary/90">{model.series}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-1">{model.name}</h3>
                        <p className="text-sm text-primary mb-3">{model.series}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {model.description}
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Dealer */}
            <div 
              //@ts-expect-error:error
              ref={el => stepRefs.current[1] = el}
              className={`transition-opacity duration-500 ${step === 2 ? 'block' : 'hidden'}`}
            >
              <h2 className="text-2xl font-bold mb-6">Choose Your Location</h2>
              <div className="space-y-4">
                {dealers.map((dealer, index) => (
                  <div 
                    key={dealer.id}
                    //@ts-expect-error:error
                    ref={el => dealerCardRefs.current[index] = el}
                    className="overflow-hidden rounded-xl border-2 border-border/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <button
                      onClick={() => setSelectedDealer(dealer.id)}
                      className="w-full p-5 text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{dealer.name}</h3>
                          <div className="flex items-start gap-3 text-muted-foreground mb-3">
                            <MapPin size={18} className="mt-1 flex-shrink-0 text-primary" />
                            <p className="text-sm">{dealer.address}</p>
                          </div>
                          <p className="text-sm text-primary font-medium">{dealer.distance} away</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          selectedDealer === dealer.id
                            ? "border-primary bg-primary"
                            : "border-border/50"
                        }`}>
                          {selectedDealer === dealer.id && <CheckCircle2 size={14} className="text-primary-foreground" />}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Date & Time */}
            <div 
            //@ts-expect-error:error
              ref={el => stepRefs.current[2] = el}
              className={`transition-opacity duration-500 ${step === 3 ? 'block' : 'hidden'}`}
            >
              <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium mb-3">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border/50 bg-background/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3">Preferred Time</label>
                  <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
                    {timeSlots.map((time, index) => (
                      <button
                        key={time}
                      //@ts-expect-error:error
                        ref={el => timeSlotRefs.current[index] = el}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                          selectedTime === time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/50 hover:border-primary/70 hover:bg-accent/30"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Personal Information */}
            <div 
              //@ts-expect-error:error
              ref={el => stepRefs.current[3] = el}
              className={`transition-opacity duration-500 ${step === 4 ? 'block' : 'hidden'}`}
            >
              <h2 className="text-2xl font-bold mb-6">Your Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border/50 bg-background/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border/50 bg-background/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border/50 bg-background/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border/50 bg-background/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Driving Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-xl border border-border/50 bg-background/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgMTIgOCI+PHBhdGggZD0iTTAuOTQgMGgxMC4xMmMuMzQgMCAuNjIuMjguNjIuNjJ2MS43NmMuMCAuMzQtLjI4LjYyLS42Mi42MkguOTRjLS4zNCAwLS42Mi0uMjgtLjYyLS42MlYuNjJjMC0uMzQuMjgtLjYyLjYyLS42MnptNS4wNiA2LjQybC00LjUtNC41Yy0uMjgtLjI4LS43My0uMjgtMS4wMSAwbC0uNjMuNjNjLS4yOC4yOC0uMjguNzMgMCAxLjAxbDUuMDEgNS4wMWMuMjguMjguNzMgLjI4IDEuMDEgMGw1LjAxLTUuMDFjLjI4LS4yOC4yOC0uNzMgMC0xLjAxbC0uNjMtLjYzYy0uMjgtLjI4LS43My0uMjgtMS4wMSAweiIgZmlsbD0iIzY0NzQ4QiIvPjwvc3ZnPg==')] bg-no-repeat bg-[right_1rem_center]"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">New to Performance Vehicles</option>
                    <option value="intermediate">Some Performance Experience</option>
                    <option value="advanced">Experienced Driver</option>
                    <option value="professional">Professional/Track Experience</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Comments</label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => setFormData({...formData, comments: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl border border-border/50 bg-background/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Any specific questions or requirements?"
                  />
                </div>

                <div className="bg-accent/30 rounded-xl p-4 text-sm text-muted-foreground border border-accent/20">
                  <p>By submitting this form, you agree to be contacted by our team regarding your test drive appointment.</p>
                </div>
              </form>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-border/30">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-3.5 rounded-xl border border-border/50 hover:bg-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Back
              </button>
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepComplete(step)}
                  className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
                >
                  Continue
                  <ArrowLeft className="rotate-180" size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepComplete(step)}
                  className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
                >
                  Confirm Booking
                  <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}