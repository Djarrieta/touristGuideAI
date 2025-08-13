"use client";

import IntroPage from "@/components/IntroPage";
import LocationDenied from "@/components/LocationDenied";
import Map, { type MarkerData } from "@/components/Map";
import { MARKER_FOCUS_ZOOM } from "@/lib/constants";
import PlacesList from "@/components/PlacesList";
import { speak } from "@/lib/speech";
import { useRef, useState } from "react";

// User-provided current location: 39.0201344, -77.4144 (used for mock data proximity)
const mockMarkers: MarkerData[] = [
  // Within ~5-10 meters
  {
    id: "1",
    position: { lat: 39.0201344, lng: -77.41441 },
    title: "Coffee Kiosk",
    description: "A tiny kiosk right next to you for a quick espresso.",
  },
  {
    id: "2",
    position: { lat: 39.02014, lng: -77.4144 },
    title: "Park Bench",
    description: "A comfy bench within a few steps.",
  },
  // Slightly farther but still near (~20-40 m)
  {
    id: "3",
    position: { lat: 39.0202, lng: -77.41435 },
    title: "Info Sign",
    description: "Local information board nearby.",
  },
  // Farther away (~60-120 m)
  {
    id: "4",
    position: { lat: 39.0207, lng: -77.4141 },
    title: "Playground",
    description: "Small playground a bit down the path.",
  },
  // Clearly far (~300-500 m)
  {
    id: "5",
    position: { lat: 39.0225, lng: -77.413 },
    title: "Community Center",
    description: "Larger venue a short walk away.",
  },
];

type LocationState = "intro" | "granted" | "denied";

export default function MapPage() {
  const [markers] = useState<MarkerData[]>(mockMarkers);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [locationState, setLocationState] = useState<LocationState>("intro");
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMarkerClick = (marker: MarkerData) => {
    if (mapRef.current) {
      mapRef.current.panTo(marker.position);
      mapRef.current.setZoom(MARKER_FOCUS_ZOOM);
    }
    setSelectedMarker(marker);
    speak(marker.title + ". " + marker.description);
  };

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  // Show intro page initially
  if (locationState === "intro") {
    return (
      <IntroPage
        onLocationGranted={() => setLocationState("granted")}
        onLocationDenied={() => setLocationState("denied")}
      />
    );
  }

  // Show sorry message if location denied
  if (locationState === "denied") {
    return <LocationDenied onRetry={() => setLocationState("intro")} />;
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
              onMarkerClick={handleMarkerClick}
              onCloseInfoWindow={() => setSelectedMarker(null)}
              onMapLoad={handleMapLoad}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PlacesList markers={markers} onPlaceClick={handleMarkerClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
