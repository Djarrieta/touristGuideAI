"use client"

import { useState, useCallback, useRef } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const containerStyle = {
  width: "100%",
  height: "600px",
}

const center = {
  lat: 6.556244, 
  lng: -75.826732
}

interface MarkerData {
  id: string
  position: {
    lat: number
    lng: number
  }
  title: string
  description: string
}

export default function MapComponent() {
  const [markers] = useState<MarkerData[]>([
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
  ])
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = null
  }, [])


  const centerOnMarker = (marker: MarkerData) => {
    if (mapRef.current) {
      mapRef.current.panTo(marker.position)
      mapRef.current.setZoom(15)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                      styles: [
                        {
                          featureType: "poi",
                          elementType: "labels",
                          stylers: [{ visibility: "off" }],
                        },
                      ],
                    }}
                  >
                    {markers.map((marker) => (
                      <Marker
                        key={marker.id}
                        position={marker.position}
                        onClick={() => setSelectedMarker(marker)}
                      />
                    ))}

                    {selectedMarker && (
                      <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
                        <div className="p-2">
                          <h3 className="font-semibold text-lg text-gray-800" >{selectedMarker.title}</h3>
                          <p className="text-sm text-gray-600">{selectedMarker.description}</p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Places List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Places ({markers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {markers.map((marker) => (
                    <div
                      key={marker.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => centerOnMarker(marker)}
                    >
                      <h4 className="font-medium">{marker.title}</h4>
                      <p className="text-sm text-muted-foreground">{marker.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {marker.position.lat.toFixed(4)}, {marker.position.lng.toFixed(4)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
