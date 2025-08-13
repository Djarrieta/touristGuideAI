"use client";

import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { MarkerData } from "./Map";
import { useUserLocation } from "./Map/useUserLocation";
import { cn } from "@/lib/utils";
import { getDistanceMeters, isWithinMeters } from "@/lib/utils";

interface PlacesListProps {
  markers: MarkerData[];
  onPlaceClick: (marker: MarkerData) => void;
}

export default function PlacesList({ markers, onPlaceClick }: PlacesListProps) {
  const { location } = useUserLocation();
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
          {markers.map((marker) => {
            const canSelect = location
              ? isWithinMeters(location, marker.position, 10)
              : true;
            const distance = location
              ? Math.round(getDistanceMeters(location, marker.position))
              : null;
            return (
              <div
                key={marker.id}
                className={cn(
                  "p-3 border rounded-lg transition-colors",
                  canSelect
                    ? "hover:bg-muted/50 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                )}
                onClick={() => canSelect && onPlaceClick(marker)}
                aria-disabled={!canSelect}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium">{marker.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {marker.description}
                    </p>
                  </div>
                  {distance !== null && (
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        canSelect
                          ? "bg-green-100 text-green-800"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {distance} m
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {marker.position.lat.toFixed(4)},{" "}
                  {marker.position.lng.toFixed(4)}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
