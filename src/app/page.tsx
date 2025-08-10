"use client"

import { useState, useRef } from "react"
import Map, { type MarkerData } from "@/components/Map"
import PlacesList from "@/components/PlacesList"

const mockMarkers: MarkerData[] = [
  {
    id: "1",
    position: { lat: 6.556991, lng: -75.825779 },
    title: "Igleasia principal",
    description: "The Big Apple 1",
  },
  {
    id: "2",
    position: { lat: 6.554982, lng: -75.825780 },
    title: "Igleasia principal 2",
    description: "The Big Apple 2",
  },
]

export default function Home() {
  const [markers] = useState<MarkerData[]>(mockMarkers)
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker)
  }

  const handleCloseInfoWindow = () => {
    setSelectedMarker(null)
  }

  const handlePlaceClick = (marker: MarkerData) => {
    if (mapRef.current) {
      mapRef.current.panTo(marker.position)
      mapRef.current.setZoom(15)
    }
    setSelectedMarker(marker)
  }

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <Map
              markers={markers}
              selectedMarker={selectedMarker}
              onMarkerClick={handleMarkerClick}
              onCloseInfoWindow={handleCloseInfoWindow}
              onMapLoad={handleMapLoad}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PlacesList
              markers={markers}
              onPlaceClick={handlePlaceClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
