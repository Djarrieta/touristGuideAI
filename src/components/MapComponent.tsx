"use client"

import { useState, useCallback, useRef } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Plus, Trash2 } from "lucide-react"

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
  const [markers, setMarkers] = useState<MarkerData[]>([
    {
      id: "1",
      position: { lat: 6.556991, lng: -75.825779 },
      title: "Igleasia principal",
      description: "The Big Apple",
    },
  ])
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)
  const [newMarker, setNewMarker] = useState({ title: "", description: "" })
  const [isAddingMarker, setIsAddingMarker] = useState(false)
  const mapRef = useRef<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = null
  }, [])

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (isAddingMarker && event.latLng) {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()

        if (newMarker.title.trim()) {
          const marker: MarkerData = {
            id: Date.now().toString(),
            position: { lat, lng },
            title: newMarker.title,
            description: newMarker.description,
          }

          setMarkers((prev) => [...prev, marker])
          setNewMarker({ title: "", description: "" })
          setIsAddingMarker(false)
        }
      }
    },
    [isAddingMarker, newMarker],
  )

  const deleteMarker = (id: string) => {
    setMarkers((prev) => prev.filter((marker) => marker.id !== id))
    setSelectedMarker(null)
  }

  const centerOnMarker = (marker: MarkerData) => {
    if (mapRef.current) {
      mapRef.current.panTo(marker.position)
      mapRef.current.setZoom(15)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Tourist Guide - Interactive Map</h1>
          <p className="text-muted-foreground">
            Discover amazing places! Click on markers to view details, or add new places by clicking on the map.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={handleMapClick}
                    options={{
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
                          <h3 className="font-semibold text-lg">{selectedMarker.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{selectedMarker.description}</p>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMarker(selectedMarker.id)}
                            className="text-xs"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add Marker Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Place
                </CardTitle>
                <CardDescription>Fill in the details and click on the map to place a marker</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Place Name</Label>
                  <Input
                    id="title"
                    value={newMarker.title}
                    onChange={(e) => setNewMarker((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter place name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newMarker.description}
                    onChange={(e) => setNewMarker((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter description"
                  />
                </div>
                <Button
                  onClick={() => setIsAddingMarker(!isAddingMarker)}
                  variant={isAddingMarker ? "destructive" : "default"}
                  className="w-full"
                  disabled={!newMarker.title.trim()}
                >
                  {isAddingMarker ? "Cancel Adding" : "Enable Adding Mode"}
                </Button>
                {isAddingMarker && (
                  <p className="text-sm text-muted-foreground">Click anywhere on the map to place your marker</p>
                )}
              </CardContent>
            </Card>

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
