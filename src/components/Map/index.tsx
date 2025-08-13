"use client";

import { useCallback, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useUserLocation } from "./useUserLocation";
import { isWithinMeters } from "../../lib/utils";
import { generateMapStyles } from "../../lib/colors";
import { CENTER_ON_USER_ZOOM, DEFAULT_ZOOM } from "@/lib/constants";
import { Button } from "../ui/button";
import { LocateFixed } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "600px",
};

export const defaultCenter = {
  lat: 39.0201344,
  lng: -77.4144,
};

interface MarkerData {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  description: string;
  // computed at render-time; optional extra props consumers may use
  disabled?: boolean;
}

interface MapProps {
  markers: MarkerData[];
  selectedMarker: MarkerData | null;
  onMarkerClick: (marker: MarkerData) => void;
  onCloseInfoWindow: () => void;
  onMapLoad?: (map: google.maps.Map) => void;
}

export default function Map({
  markers,
  selectedMarker,
  onMarkerClick,
  onCloseInfoWindow,
  onMapLoad,
}: MapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);

  // Get user's current location using custom hook (silent mode)
  const { location: userLocation } = useUserLocation();

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      onMapLoad?.(map);
    },
    [onMapLoad]
  );

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const centerOnUser = useCallback(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.panTo(userLocation);
      // Optionally adjust zoom when centering
      const currentZoom = mapRef.current.getZoom?.();
      if (!currentZoom || currentZoom < DEFAULT_ZOOM) {
        mapRef.current.setZoom(CENTER_ON_USER_ZOOM);
      }
    }
  }, [userLocation]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultCenter}
        zoom={DEFAULT_ZOOM}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: generateMapStyles(),
        }}
      >
        {/* Overlay control: center map on user's location */}
        <div style={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}>
          <Button
            size="icon"
            variant="secondary"
            onClick={centerOnUser}
            disabled={!userLocation}
            aria-label="Center on my location"
            title="Center on my location"
          >
            <LocateFixed className="h-5 w-5" />
          </Button>
        </div>
        {userLocation && (
          <Marker
            position={userLocation}
            title="Your location"
            icon="/user-location.svg"
            zIndex={999}
          />
        )}

        {markers.map((marker) => {
          const canSelect = userLocation
            ? isWithinMeters(userLocation, marker.position, 10)
            : true; // if no location yet, allow selection

          return (
            <Marker
              key={marker.id}
              position={marker.position}
              onClick={() => canSelect && onMarkerClick(marker)}
              // visually indicate disabled by reducing opacity
              opacity={canSelect ? 1 : 0.5}
              zIndex={canSelect ? 1 : 0}
            />
          );
        })}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={onCloseInfoWindow}
          >
            <div className="p-2 space-y-2">
              <h3 className="font-semibold text-lg text-foreground">
                {selectedMarker.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedMarker.description}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export type { MarkerData };
