"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"

interface ContactFormProps {
  selectedDealer?: string | null
}

export function ContactForm({ selectedDealer }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <Card className="p-10 bg-gradient-to-br from-background/90 to-background/60 border border-border/50 shadow-2xl backdrop-blur-xl rounded-2xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h3 className="font-display text-3xl font-bold tracking-tight mb-2">Request Information</h3>
        <p className="text-muted-foreground text-sm">
          Our team will contact you shortly to provide details or schedule a private consultation.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Names */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
            <Input
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="bg-background/70 border-border/50 rounded-xl focus:ring-2 focus:ring-primary transition"
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
            <Input
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="bg-background/70 border-border/50 rounded-xl focus:ring-2 focus:ring-primary transition"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-background/70 border-border/50 rounded-xl focus:ring-2 focus:ring-primary transition"
            placeholder="john.doe@email.com"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-background/70 border-border/50 rounded-xl focus:ring-2 focus:ring-primary transition"
            placeholder="+1 (234) 567-890"
          />
        </div>

        {/* Interest Select */}
        <div className="space-y-2">
          <Label htmlFor="interest" className="text-sm font-medium">I'm Interested In *</Label>
          <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
            <SelectTrigger className="bg-background/70 border-border/50 rounded-xl focus:ring-2 focus:ring-primary transition">
              <SelectValue placeholder="Choose an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="test-drive">Schedule a Test Drive</SelectItem>
              <SelectItem value="purchase">Purchase Inquiry</SelectItem>
              <SelectItem value="configurator">Custom Configuration</SelectItem>
              <SelectItem value="service">Service & Maintenance</SelectItem>
              <SelectItem value="general">General Information</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
          <Textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-background/70 border-border/50 rounded-xl focus:ring-2 focus:ring-primary transition resize-none"
            placeholder="Tell us about your interests and specific questions..."
          />
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground leading-relaxed">
          By submitting this form, you agree to our{" "}
          <a href="/privacy" className="underline hover:text-primary">privacy policy</a> and consent to be contacted by our team.
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Send size={18} className="mr-2" />
          Send Message
        </Button>
      </form>
    </Card>
  )
}
