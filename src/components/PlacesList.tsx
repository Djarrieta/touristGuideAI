"use client";

import { CheckCircle2, Clock, MapPin, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { MarkerData } from "./Map";
import { useUserLocation } from "./Map/useUserLocation";
import { cn } from "@/lib/utils";
import { getDistanceMeters, isWithinMeters } from "@/lib/utils";
import { Button } from "./ui/button";
import { useVisitedPlacesContext } from "./Map/VisitedPlacesContext";

interface PlacesListProps {
  markers: MarkerData[];
  onPlaceClick: (marker: MarkerData) => void;
}

export default function PlacesList({ markers, onPlaceClick }: PlacesListProps) {
  const { location } = useUserLocation();
  const { isVisited, lastSelectedId, clearVisited } = useVisitedPlacesContext();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Places ({markers.length})
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearVisited}
            title="Clear visited"
          >
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>
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
            const visited = isVisited(marker.id);
            const isLastSelected = lastSelectedId === marker.id;
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
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{marker.title}</h4>
                      {visited && (
                        <span className="inline-flex items-center text-green-700 bg-green-100 border border-green-200 text-[10px] px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> visited
                        </span>
                      )}
                      {isLastSelected && (
                        <span className="inline-flex items-center text-blue-700 bg-blue-100 border border-blue-200 text-[10px] px-1.5 py-0.5 rounded">
                          <Clock className="w-3 h-3 mr-1" /> last
                        </span>
                      )}
                    </div>
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
