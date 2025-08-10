"use client"

import { useCallback, useRef } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { useUserLocation } from "../hooks/useUserLocation"

const containerStyle = {
  width: "100%",
  height: "600px",
}

// Default fallback coordinates (Medellín, Colombia)
const defaultCenter = {
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

interface MapProps {
  markers: MarkerData[]
  selectedMarker: MarkerData | null
  onMarkerClick: (marker: MarkerData) => void
  onCloseInfoWindow: () => void
  onMapLoad?: (map: google.maps.Map) => void
}

export default function Map({ 
  markers, 
  selectedMarker, 
  onMarkerClick, 
  onCloseInfoWindow,
  onMapLoad 
}: MapProps) {
  const mapRef = useRef<google.maps.Map | null>(null)
  
  // Get user's current location using custom hook (silent mode)
  const { location: userLocation } = useUserLocation()

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
    onMapLoad?.(map)
  }, [onMapLoad])

  const onUnmount = useCallback(() => {
    mapRef.current = null
  }, [])

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultCenter}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            // Overall map background - aged parchment/paper color
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#f4f1e8" }],
            },
            // Water areas - vintage blue-green like old maps
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#7fb3d1" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#2c4f66" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f4f1e8" }, { weight: 2 }],
            },
            // Landscape/terrain - warm aged paper tone
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f0ead6" }],
            },
            // Main roads - colonial brick/terracotta
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#b8860b" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#8b6914" }, { weight: 2 }],
            },
            // Arterial roads - aged stone color
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#d2b48c" }],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry.stroke",
              stylers: [{ color: "#a0522d" }, { weight: 1 }],
            },
            // Local roads - pale colonial stone
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [{ color: "#e6dcc6" }],
            },
            {
              featureType: "road.local",
              elementType: "geometry.stroke",
              stylers: [{ color: "#c19a6b" }, { weight: 0.5 }],
            },
            // Road labels - deep colonial brown with serif font
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [
                { color: "#5d4037" },
                { "font-family": "serif" },
                { "font-size": "12px" },
                { "font-weight": "normal" }
              ],
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f4f1e8" }, { weight: 3 }],
            },
            // Administrative boundaries - colonial gold
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#cd853f" }, { weight: 1.5 }],
            },
            // Administrative labels - rich Spanish brown
            {
              featureType: "administrative",
              elementType: "labels.text.fill",
              stylers: [{ color: "#3e2723" }],
            },
            {
              featureType: "administrative",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f4f1e8" }, { weight: 3 }],
            },
            // Building outlines - adobe/clay color
            {
              featureType: "landscape.man_made",
              elementType: "geometry",
              stylers: [{ color: "#ede0d3" }],
            },
            // Natural features - vintage green like old vegetation on maps
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [{ color: "#e8dcc0" }],
            },
            // Parks and natural areas - faded colonial green
            {
              featureType: "landscape.natural.landcover",
              elementType: "geometry",
              stylers: [{ color: "#d7c7a8" }],
            },
            // Add vintage terrain effect
            {
              featureType: "landscape.natural.terrain",
              elementType: "geometry",
              stylers: [{ color: "#e6d7c3" }],
            },
            // Hide all points of interest
            {
              featureType: "poi",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            // Hide business places
            {
              featureType: "poi.business",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            // Hide tourist attractions
            {
              featureType: "poi.attraction",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            // Hide parks
            {
              featureType: "poi.park",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            // Hide schools
            {
              featureType: "poi.school",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            // Hide medical facilities
            {
              featureType: "poi.medical",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            // Hide government buildings
            {
              featureType: "poi.government",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            // Hide places of worship
            {
              featureType: "poi.place_of_worship",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            // Hide sports complexes
            {
              featureType: "poi.sports_complex",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            // Hide transit stations
            {
              featureType: "transit",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
          ]
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => onMarkerClick(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow position={selectedMarker.position} onCloseClick={onCloseInfoWindow}>
            <div className="p-2">
              <h3 className="font-semibold text-lg text-gray-800">{selectedMarker.title}</h3>
              <p className="text-sm text-gray-600">{selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export type { MarkerData }
