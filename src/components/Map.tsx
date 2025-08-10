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
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            // Keep road labels visible for street names
            {
              featureType: "road",
              elementType: "labels",
              stylers: [{ visibility: "on" }],
            },
            // Keep administrative labels (city, country names)
            {
              featureType: "administrative",
              elementType: "labels",
              stylers: [{ visibility: "on" }],
            },
            // Keep water labels
            {
              featureType: "water",
              elementType: "labels",
              stylers: [{ visibility: "on" }],
            },
          ],
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
