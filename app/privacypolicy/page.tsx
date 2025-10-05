"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Shield, FileText, Cookie, Check, X, ChevronRight, Download } from "lucide-react"

export default function LegalPages() {
  const [activeTab, setActiveTab] = useState("privacy")
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true
  })
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && contentRef.current) {
      const gsap = window.gsap
      gsap.from(contentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      })
    }
  }, [activeTab])

  const tabs = [
    { id: "privacy", label: "Privacy Policy", icon: Shield },
    { id: "terms", label: "Terms of Service", icon: FileText },
    { id: "cookies", label: "Cookie Settings", icon: Cookie }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <ArrowLeft size={20} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
              <span className="text-zinc-400 group-hover:text-white transition-colors">Back to Home</span>
            </a>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="font-black text-xl text-black">S</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg">SUPERCAR</div>
                <div className="text-[8px] uppercase tracking-[0.3em] text-zinc-500">Luxury Motors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-20 container mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-500"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-yellow-500 font-medium">Legal Information</span>
            <div className="h-px w-12 bg-gradient-to-r from-yellow-500 to-transparent"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Legal Center</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Your privacy and trust matter to us. Review our policies and manage your preferences.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex gap-2 bg-zinc-900/50 backdrop-blur-sm p-2 rounded-2xl border border-zinc-800">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div ref={contentRef} className="bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 md:p-12">
            
            {/* Privacy Policy */}
            {activeTab === "privacy" && (
              <div className="space-y-8">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                    <Shield size={32} className="text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Privacy Policy</h2>
                    <p className="text-zinc-400">Last updated: October 2024</p>
                  </div>
                </div>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Introduction
                  </h3>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    At SUPERCAR Luxury Motors, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or interact with our services.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    By using our website or services, you consent to the data practices described in this policy. We encourage you to review this policy periodically as it may be updated from time to time.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Information We Collect
                  </h3>
                  <div className="space-y-4">
                    <div className="pl-6 border-l-2 border-yellow-500/30">
                      <h4 className="font-semibold text-lg mb-2">Personal Information</h4>
                      <p className="text-zinc-300 leading-relaxed">
                        We may collect personal information such as your name, email address, phone number, and mailing address when you configure vehicles, request test drives, sign up for newsletters, or contact our dealers.
                      </p>
                    </div>
                    <div className="pl-6 border-l-2 border-yellow-500/30">
                      <h4 className="font-semibold text-lg mb-2">Usage Data</h4>
                      <p className="text-zinc-300 leading-relaxed">
                        We automatically collect information about your device, browsing actions, and patterns. This includes IP address, browser type, pages visited, time spent on pages, and other diagnostic data.
                      </p>
                    </div>
                    <div className="pl-6 border-l-2 border-yellow-500/30">
                      <h4 className="font-semibold text-lg mb-2">Vehicle Preferences</h4>
                      <p className="text-zinc-300 leading-relaxed">
                        When you use our configurator, we store your vehicle customization choices, saved configurations, and preferences to enhance your experience.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    How We Use Your Information
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "To provide and maintain our services",
                      "To process your vehicle configuration requests and quotes",
                      "To communicate with you about products, services, and promotions",
                      "To improve our website and user experience",
                      "To analyze usage trends and optimize our offerings",
                      "To comply with legal obligations and protect our rights"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-zinc-300">
                        <Check size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Data Security
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Your Rights
                  </h3>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    You have the right to access, update, or delete your personal information. You may also opt-out of marketing communications at any time. To exercise these rights, please contact us at privacy@supercar.com.
                  </p>
                </section>
              </div>
            )}

            {/* Terms of Service */}
            {activeTab === "terms" && (
              <div className="space-y-8">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                    <FileText size={32} className="text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Terms of Service</h2>
                    <p className="text-zinc-400">Last updated: October 2024</p>
                  </div>
                </div>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Agreement to Terms
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    By accessing and using the SUPERCAR Luxury Motors website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Use of Services
                  </h3>
                  <div className="space-y-4">
                    <div className="pl-6 border-l-2 border-yellow-500/30">
                      <h4 className="font-semibold text-lg mb-2">Permitted Use</h4>
                      <p className="text-zinc-300 leading-relaxed">
                        You may use our website for lawful purposes only. You agree not to use our services to transmit harmful content, violate intellectual property rights, or engage in any fraudulent activities.
                      </p>
                    </div>
                    <div className="pl-6 border-l-2 border-yellow-500/30">
                      <h4 className="font-semibold text-lg mb-2">Account Responsibility</h4>
                      <p className="text-zinc-300 leading-relaxed">
                        If you create an account, you are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Vehicle Configurations & Pricing
                  </h3>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    Vehicle configurations, specifications, and prices displayed on our website are for informational purposes only and are subject to change. Final pricing and availability must be confirmed with an authorized dealer.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    Images and descriptions are representative and may not reflect the exact vehicle or configuration. Actual vehicles may vary in appearance and features.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Intellectual Property
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    All content on this website, including text, graphics, logos, images, and software, is the property of SUPERCAR Luxury Motors and is protected by international copyright and trademark laws. Unauthorized use is prohibited.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Limitation of Liability
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    SUPERCAR Luxury Motors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or services. Our total liability shall not exceed the amount paid by you, if any, for accessing our services.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Modifications
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    We reserve the right to modify or replace these Terms at any time. Continued use of our services following any changes constitutes acceptance of those changes.
                  </p>
                </section>
              </div>
            )}

            {/* Cookie Settings */}
            {activeTab === "cookies" && (
              <div className="space-y-8">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                    <Cookie size={32} className="text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Cookie Settings</h2>
                    <p className="text-zinc-400">Manage your cookie preferences</p>
                  </div>
                </div>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    About Cookies
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Cookies are small text files stored on your device that help us provide and improve our services. We use different types of cookies for various purposes. You can manage your cookie preferences below.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ChevronRight size={20} className="text-yellow-500" />
                    Cookie Categories
                  </h3>
                  <div className="space-y-4">
                    {/* Necessary Cookies */}
                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2">Necessary Cookies</h4>
                          <p className="text-zinc-400 text-sm">
                            Essential for the website to function properly. These cannot be disabled.
                          </p>
                        </div>
                        <div className="ml-4">
                          <div className="w-12 h-7 bg-yellow-500 rounded-full flex items-center px-1">
                            <div className="w-5 h-5 bg-black rounded-full ml-auto"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-zinc-500">
                        Always Active
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2">Analytics Cookies</h4>
                          <p className="text-zinc-400 text-sm">
                            Help us understand how visitors interact with our website by collecting anonymous data.
                          </p>
                        </div>
                        <button
                          onClick={() => setCookieSettings({...cookieSettings, analytics: !cookieSettings.analytics})}
                          className="ml-4"
                        >
                          <div className={`w-12 h-7 rounded-full flex items-center px-1 transition-all ${
                            cookieSettings.analytics ? "bg-yellow-500" : "bg-zinc-700"
                          }`}>
                            <div className={`w-5 h-5 bg-black rounded-full transition-all ${
                              cookieSettings.analytics ? "ml-auto" : "ml-0"
                            }`}></div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2">Marketing Cookies</h4>
                          <p className="text-zinc-400 text-sm">
                            Used to deliver personalized advertisements and track campaign effectiveness.
                          </p>
                        </div>
                        <button
                          onClick={() => setCookieSettings({...cookieSettings, marketing: !cookieSettings.marketing})}
                          className="ml-4"
                        >
                          <div className={`w-12 h-7 rounded-full flex items-center px-1 transition-all ${
                            cookieSettings.marketing ? "bg-yellow-500" : "bg-zinc-700"
                          }`}>
                            <div className={`w-5 h-5 bg-black rounded-full transition-all ${
                              cookieSettings.marketing ? "ml-auto" : "ml-0"
                            }`}></div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Preference Cookies */}
                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2">Preference Cookies</h4>
                          <p className="text-zinc-400 text-sm">
                            Remember your settings and preferences for a personalized experience.
                          </p>
                        </div>
                        <button
                          onClick={() => setCookieSettings({...cookieSettings, preferences: !cookieSettings.preferences})}
                          className="ml-4"
                        >
                          <div className={`w-12 h-7 rounded-full flex items-center px-1 transition-all ${
                            cookieSettings.preferences ? "bg-yellow-500" : "bg-zinc-700"
                          }`}>
                            <div className={`w-5 h-5 bg-black rounded-full transition-all ${
                              cookieSettings.preferences ? "ml-auto" : "ml-0"
                            }`}></div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="pt-6 border-t border-zinc-800 flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all">
                    Save Preferences
                  </button>
                  <button className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all">
                    Reset to Default
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Questions About Our Policies?</h3>
            <p className="text-zinc-400 mb-6">
              Our team is here to help. Contact us for any clarifications or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@supercar.com"
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all font-medium"
              >
                legal@supercar.com
              </a>
              <a
                href="/dealers"
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}