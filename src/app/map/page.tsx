"use client"

import IntroPage from "@/components/IntroPage"
import LocationDenied from "@/components/LocationDenied"
import Map, { type MarkerData } from "@/components/Map"
import PlacesList from "@/components/PlacesList"
import { useRef, useState } from "react"

const mockMarkers: MarkerData[] = [
  {
    id: "1",
    position: { lat: 6.1550, lng: -75.3739 },
    title: "Parque Principal de Rionegro",
    description: "El corazón de la ciudad, rodeado de historia y comercio.",
  },
  {
    id: "2",
    position: { lat: 6.1545, lng: -75.3742 },
    title: "Museo de Arte Religioso",
    description: "Conserva una importante colección de arte religioso de la región.",
  },
  {
    id: "3",
    position: { lat: 6.1555, lng: -75.3735 },
    title: "Catedral San Nicolás el Magno",
    description: "Imponente catedral de estilo neoclásico.",
  },
  {
    id: "4",
    position: { lat: 6.1520, lng: -75.3750 },
    title: "Puente Mejía",
    description: "Histórico puente de calicanto sobre el río Negro.",
  },
  {
    id: "5",
    position: { lat: 6.1333, lng: -75.4000 },
    title: "Tutucán",
    description: "Réplica de un pueblo tradicional antioqueño.",
  },
]

type LocationState = 'intro' | 'granted' | 'denied'

export default function MapPage() {
  const [markers] = useState<MarkerData[]>(mockMarkers)
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)
  const [locationState, setLocationState] = useState<LocationState>('intro')
  const mapRef = useRef<google.maps.Map | null>(null)

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

  // Show intro page initially
  if (locationState === 'intro') {
    return (
      <IntroPage 
        onLocationGranted={()=>setLocationState('granted')}
        onLocationDenied={()=>setLocationState('denied')}
      />
    )
  }

  // Show sorry message if location denied
  if (locationState === 'denied') {
    return (
      <LocationDenied 
        onRetry={()=>  setLocationState('intro')}
      />
    )
  }

  // Show main app if location granted
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <Map
              markers={markers}
              selectedMarker={selectedMarker}
              onMarkerClick={setSelectedMarker}
              onCloseInfoWindow={()=>setSelectedMarker(null)}
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
