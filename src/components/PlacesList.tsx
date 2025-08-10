"use client"

import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import type { MarkerData } from "./Map"

interface PlacesListProps {
  markers: MarkerData[]
  onPlaceClick: (marker: MarkerData) => void
}

export default function PlacesList({ markers, onPlaceClick }: PlacesListProps) {
  return (
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
              onClick={() => onPlaceClick(marker)}
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
  )
}
