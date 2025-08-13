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

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    >
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
          styles: generateMapStyles(),
        }}
      >
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
