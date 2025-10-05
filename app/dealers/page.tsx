"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navigation } from "@/components/navigation"
import { DealerLocator } from "@/components/dealer-locator"
import { ContactForm } from "@/components/contact-form"
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { SmoothScrollWrapper } from "@/components/smooth-scroll-wrapper"

gsap.registerPlugin(ScrollTrigger)

export default function DealersPage() {
  const [selectedDealer, setSelectedDealer] = useState<string | null>(null)

  // refs
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const locatorRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section (page load)
      gsap.from(".hero-content > *", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      })

      // Dealer Locator
      gsap.from(locatorRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: locatorRef.current,
          start: "top 80%",
        },
      })

      // Contact cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".contact-card")
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        })
      }

      // Contact form
      gsap.from(formRef.current, {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} className="min-h-screen bg-background">
      <SmoothScrollWrapper>
        <Navigation />

        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-16 container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl hero-content">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium text-primary tracking-wider uppercase">
                Find Us
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Visit Our
              <br />
              <span className="text-primary">Showrooms</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience our vehicles in person at one of our exclusive dealerships worldwide. 
              Schedule a private viewing or test drive today.
            </p>
          </div>
        </section>

        {/* Dealer Locator */}
        <div ref={locatorRef}>
          <DealerLocator onDealerSelect={setSelectedDealer} />
        </div>

        {/* Contact Section */}
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div ref={cardsRef}>
                <h2 className="font-display text-4xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Have questions? Our team of specialists is ready to assist you with any inquiries about our vehicles,
                  services, or to schedule a personalized consultation.
                </p>

                <div className="space-y-6">
                  <Card className="contact-card p-6 bg-card border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-muted-foreground text-sm mb-2">Monday - Friday, 9AM - 6PM EST</p>
                        <a href="tel:+18005551234" className="text-primary hover:underline">
                          +1 (800) 555-1234
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="contact-card p-6 bg-card border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground text-sm mb-2">We'll respond within 24 hours</p>
                        <a href="mailto:contact@supercar.com" className="text-primary hover:underline">
                          contact@supercar.com
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="contact-card p-6 bg-card border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Headquarters</h3>
                        <p className="text-muted-foreground text-sm">
                          1234 Performance Drive
                          <br />
                          Los Angeles, CA 90210
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="contact-card p-6 bg-card border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                        <div className="text-muted-foreground text-sm space-y-1">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p>Saturday: 10:00 AM - 4:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div ref={formRef}>
                <ContactForm selectedDealer={selectedDealer} />
              </div>
            </div>
          </div>
        </section>
      </SmoothScrollWrapper>
    </main>
  )
}
