"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api"

interface Location {
  id: string
  name: string
  address: string
  position: { lat: number; lng: number }
  description: string
}

interface DealerMapProps {
  locations: Location[]
  selectedDealerId?: string | null
}

export function DealerMap({ locations, selectedDealerId }: DealerMapProps) {
  const [selected, setSelected] = useState<Location | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), [])
  const defaultCenter = useMemo(() => ({ lat: 34.0522, lng: -118.2437 }), [])

  // Handle selected dealer change
  useEffect(() => {
    if (selectedDealerId && mapRef.current) {
      const dealer = locations.find(d => d.id === selectedDealerId)
      if (dealer) {
        mapRef.current.panTo(dealer.position)
        mapRef.current.setZoom(12)
        setSelected(dealer)
      }
    }
  }, [selectedDealerId, locations])

  const renderedMarkers = useMemo(
    () =>
      locations.map((loc) => (
        <Marker key={loc.id} position={loc.position} onClick={() => setSelected(loc)} />
      )),
    [locations]
  )

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        <p className="text-sm text-muted-foreground">Loading map…</p>
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={8}
      onLoad={(map) => { mapRef.current = map }}
    >
      {renderedMarkers}

      {selected && (
        <InfoWindow
          position={selected.position}
          onCloseClick={() => setSelected(null)}
        >
          <div className="max-w-[200px]">
            <h3 className="font-bold text-black text-sm">{selected.name}</h3>
            <p className="text-xs text-muted-foreground">{selected.address}</p>
            <p className="text-xs text-muted-foreground mt-1">{selected.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}
