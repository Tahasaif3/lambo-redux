"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Navigation, Clock, Star, ChevronRight, Search } from "lucide-react"
import { DealerMap } from "./dealermap"

interface DealerLocatorProps {
  onDealerSelect: (dealerId: string) => void
}

export function DealerLocator({ onDealerSelect }: DealerLocatorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null)

  const dealers = [
    {
      id: "la-downtown",
      name: "Los Angeles Downtown",
      address: "1234 Performance Drive, Los Angeles, CA 90210",
      phone: "+1 (310) 555-0100",
      distance: "2.3 miles",
      position: { lat: 34.0522, lng: -118.2437 },
      description: "Premium showroom in downtown LA",
      rating: 4.8,
      hours: "Mon-Sat: 9AM-8PM"
    },
    {
      id: "beverly-hills",
      name: "Beverly Hills Showroom",
      address: "9876 Rodeo Drive, Beverly Hills, CA 90212",
      phone: "+1 (310) 555-0200",
      distance: "5.7 miles",
      position: { lat: 34.0736, lng: -118.4004 },
      description: "Luxury vehicles in Beverly Hills",
      rating: 4.9,
      hours: "Mon-Sat: 9AM-8PM"
    },
    {
      id: "newport-beach",
      name: "Newport Beach",
      address: "456 Pacific Coast Highway, Newport Beach, CA 92660",
      phone: "+1 (949) 555-0300",
      distance: "42.1 miles",
      position: { lat: 33.6189, lng: -117.9289 },
      description: "Coastal location with full service",
      rating: 4.7,
      hours: "Mon-Sat: 9AM-7PM"
    },
    {
      id: "san-diego",
      name: "San Diego Gaslamp",
      address: "789 Fifth Avenue, San Diego, CA 92101",
      phone: "+1 (619) 555-0400",
      distance: "120.5 miles",
      position: { lat: 32.7157, lng: -117.1611 },
      description: "Downtown San Diego dealership",
      rating: 4.6,
      hours: "Mon-Sat: 9AM-7PM"
    },
  ]

  const handleDealerClick = (dealerId: string) => {
    setSelectedDealerId(dealerId)
    onDealerSelect(dealerId)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Find Your Nearest Dealer
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover authorized dealerships near you for the ultimate automotive experience
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,450px] gap-8">
          {/* Map */}
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[700px] rounded-2xl overflow-hidden shadow-2xl border border-border/50 backdrop-blur">
            <DealerMap
              locations={dealers.map((d) => ({
                id: d.id,
                name: d.name,
                address: d.address,
                position: d.position,
                description: d.description,
              }))}
              selectedDealerId={selectedDealerId}
            />
          </div>

          {/* Dealer List */}
          <div className="flex flex-col">
            {/* Search Box */}
            <div className="mb-6 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Search by city, zip code, or dealer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base bg-card border-2 border-border/50 focus:border-primary rounded-xl shadow-lg transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3 ml-1">
                {dealers.length} dealers found near you
              </p>
            </div>

            {/* Dealer Cards */}
            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {dealers.map((dealer) => (
                <Card
                  key={dealer.id}
                  className={`group relative p-6 bg-card border-2 transition-all duration-300 cursor-pointer overflow-hidden rounded-xl
                    ${selectedDealerId === dealer.id 
                      ? 'border-primary shadow-xl shadow-primary/20 scale-[1.02]' 
                      : 'border-border/50 hover:border-primary/50 hover:shadow-lg'
                    }`}
                  onClick={() => handleDealerClick(dealer.id)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    selectedDealerId === dealer.id ? 'opacity-100' : ''
                  }`} />
                  
                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {dealer.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                            <Star size={14} className="fill-primary text-primary" />
                            <span className="text-sm font-semibold text-primary">{dealer.rating}</span>
                          </div>
                          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {dealer.distance}
                          </span>
                        </div>
                      </div>
                      <ChevronRight 
                        className={`text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all ${
                          selectedDealerId === dealer.id ? 'text-primary translate-x-1' : ''
                        }`} 
                        size={24} 
                      />
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                        <span className="leading-relaxed">{dealer.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <Phone size={18} className="flex-shrink-0 text-primary" />
                        <a 
                          href={`tel:${dealer.phone}`} 
                          className="hover:text-primary transition-colors font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {dealer.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Clock size={18} className="flex-shrink-0 text-primary" />
                        <span>{dealer.hours}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-2 border-border group-hover:border-primary/50 bg-transparent hover:bg-primary/5 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Navigation size={16} className="mr-2" />
                        Directions
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Contact
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}