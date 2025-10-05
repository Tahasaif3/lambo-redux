'use client'

import { useState, useEffect } from "react"
import { Menu, X, Search, User, Eye, EyeOff, ArrowRight, ChevronRight } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Auth submitted:", { authMode, formData })
    setIsAuthOpen(false)
    setFormData({ name: "", email: "", password: "", confirmPassword: "" })
  }

  const navLinks = [
    { name: "Models", href: "/models", description: "Explore our hypercar collection", icon: "🏎️", color: "from-red-500 to-red-700" },
    { name: "Configurator", href: "/configurator", description: "Build your dream car", icon: "🎨", color: "from-blue-500 to-blue-700" },
    { name: "Story", href: "/story", description: "Our heritage and vision", icon: "📖", color: "from-green-500 to-green-700" },
    { name: "Dealers", href: "/dealers", description: "Find a showroom near you", icon: "📍", color: "from-purple-500 to-purple-700" },
    { name: "News", href: "/news", description: "Latest updates and events", icon: "📰", color: "from-yellow-500 to-yellow-700" }
  ]

  return (
 <div>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/95 backdrop-blur-xl border-b border-zinc-800/50 shadow-2xl" : "bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 sm:gap-3 group relative z-10">
              <div className="relative">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
                  <span className="font-black text-lg sm:text-2xl text-black">S</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-base sm:text-xl tracking-tight text-white">SUPERCAR</div>
                <div className="text-[7px] sm:text-[9px] uppercase tracking-[0.3em] text-zinc-400">Luxury Motors</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-all duration-200 hidden sm:block"
                onClick={() => {}}
              >
                <Search size={20} />
              </button>
              <button 
                onClick={() => setIsAuthOpen(true)} 
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-all duration-200 hidden sm:block"
              >
                <User size={20} />
              </button>
              <a 
                href="/configurator" 
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-200 hidden md:block"
              >
                Build Yours
              </a>
              <button 
                onClick={() => { 
                  setIsMenuOpen(!isMenuOpen)
                  setIsAuthOpen(false)
                }} 
                className="p-2 text-white hover:bg-zinc-900 rounded-lg transition-all duration-200 lg:hidden"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Side Panel */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        <div className={`absolute inset-y-0 right-0 w-full sm:w-96 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="relative border-b border-zinc-800/50">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-500/5" />
            <div className="relative px-5 py-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <span className="font-black text-lg text-black">S</span>
                </div>
                <div>
                  <div className="font-bold text-base text-white">SUPERCAR</div>
                  <div className="text-[7px] uppercase tracking-[0.3em] text-zinc-400">Luxury Motors</div>
                </div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="h-[calc(100%-73px)] overflow-y-auto">
            <div className="px-5 py-6 space-y-6">
              <a
                href="/configurator"
                onClick={() => setIsMenuOpen(false)}
                className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 p-[2px] shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
              >
                <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[14px] px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-black font-bold text-base mb-0.5">Build Your Dream Car</div>
                      <div className="text-black/70 text-xs font-medium">Customize every detail</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-all duration-200">
                      <ArrowRight size={18} className="text-black" />
                    </div>
                  </div>
                </div>
              </a>

              <div>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-1 h-5 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">Explore</h3>
                </div>
                <div className="space-y-2">
                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                        <div className="relative flex items-center gap-3 p-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-yellow-400 transition-colors duration-200">
                              {item.name}
                            </div>
                            <div className="text-zinc-400 text-xs truncate">
                              {item.description}
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-1 h-5 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">Quick Access</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { 
                      setIsMenuOpen(false)
                      setIsAuthOpen(true)
                    }}
                    className="group relative overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                    <div className="relative p-4 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                        <User size={20} className="text-yellow-400" />
                      </div>
                      <div className="text-white text-xs font-semibold">Account</div>
                      <div className="text-zinc-500 text-[10px]">Sign in</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="group relative overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                    <div className="relative p-4 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                        <Search size={20} className="text-yellow-400" />
                      </div>
                      <div className="text-white text-xs font-semibold">Search</div>
                      <div className="text-zinc-500 text-[10px]">Find cars</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-4 pb-2">
                <div className="px-4 py-3 rounded-xl bg-zinc-900/30 border border-zinc-800/50 text-center">
                  <div className="text-zinc-400 text-xs mb-1">Experience automotive excellence</div>
                  <div className="text-zinc-600 text-[10px]">© 2025 Supercar Luxury Motors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Dialog */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => setIsAuthOpen(false)} 
          />
          <div className="relative w-full sm:max-w-md bg-gradient-to-br from-zinc-900 to-black border-t sm:border border-zinc-800 sm:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />
            
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-12 h-1 bg-zinc-700 rounded-full" />
            </div>

            <div className="p-5 sm:p-8">
              <button 
                onClick={() => setIsAuthOpen(false)} 
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200 z-10"
              >
                <X size={20} />
              </button>

              <div className="mb-6 pr-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {authMode === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-zinc-400 text-sm">
                  {authMode === "login" 
                    ? "Sign in to access your exclusive automotive experience" 
                    : "Join the elite community of automotive enthusiasts"}
                </p>
              </div>

              <div className="flex gap-2 mb-6 bg-zinc-800 rounded-xl overflow-hidden p-1">
                <button 
                  onClick={() => setAuthMode("login")} 
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${authMode === "login" ? "bg-zinc-700 text-white shadow-lg" : "text-zinc-400"}`}
                >
                  Login
                </button>
                <button 
                  onClick={() => setAuthMode("signup")} 
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${authMode === "signup" ? "bg-zinc-700 text-white shadow-lg" : "text-zinc-400"}`}
                >
                  Sign Up
                </button>
              </div>

              <div className="space-y-3">
                {authMode === "signup" && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-all duration-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {authMode === "signup" && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  />
                )}
              </div>

              <button 
                onClick={handleAuthSubmit}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-200"
              >
                {authMode === "login" ? "Login" : "Sign Up"} <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}