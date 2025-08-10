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
            // Overall map background - light neutral tone
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }],
            },
            // Water areas - soft blue
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#a8d5e5" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#2c5f7a" }],
            },
            // Landscape/terrain - warm light gray
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f9f9f9" }],
            },
            // Main roads - modern blue
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#4a90e2" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#3a7bc8" }, { weight: 1 }],
            },
            // Arterial roads - medium gray-blue
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#e8e8e8" }],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry.stroke",
              stylers: [{ color: "#d0d0d0" }],
            },
            // Local roads - light gray
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }],
            },
            {
              featureType: "road.local",
              elementType: "geometry.stroke",
              stylers: [{ color: "#e0e0e0" }],
            },
            // Road labels - dark gray for readability
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#333333" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#ffffff" }, { weight: 2 }],
            },
            // Administrative boundaries - subtle
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#c0c0c0" }, { weight: 0.5 }],
            },
            // Administrative labels - elegant dark blue
            {
              featureType: "administrative",
              elementType: "labels.text.fill",
              stylers: [{ color: "#2c3e50" }],
            },
            {
              featureType: "administrative",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#ffffff" }, { weight: 1 }],
            },
            // Building outlines - very subtle
            {
              featureType: "landscape.man_made",
              elementType: "geometry",
              stylers: [{ color: "#f0f0f0" }],
            },
            // Natural features - soft green tones
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [{ color: "#f5f7f5" }],
            },
            // Parks (even though hidden, style for consistency)
            {
              featureType: "landscape.natural.landcover",
              elementType: "geometry",
              stylers: [{ color: "#e8f5e8" }],
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
