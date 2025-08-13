"use client";

import { CheckCircle2, Clock, MapPin, RotateCcw, Ruler } from "lucide-react";
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
                  "p-3 border rounded-lg transition-colors bg-card",
                  canSelect
                    ? "hover:bg-muted/50 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                )}
                onClick={() => canSelect && onPlaceClick(marker)}
                aria-disabled={!canSelect}
              >
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-semibold leading-tight text-base">
                    {marker.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {marker.description}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {marker.position.lat.toFixed(4)},{" "}
                    {marker.position.lng.toFixed(4)}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    {distance !== null && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                          canSelect
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-primary/5 text-muted-foreground border-primary/20"
                        )}
                      >
                        <Ruler className="w-3 h-3" /> {distance} m
                      </span>
                    )}
                    {visited && (
                      <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium bg-green-50 text-green-700 border-green-200">
                        <CheckCircle2 className="w-3 h-3" /> visited
                      </span>
                    )}
                    {isLastSelected && (
                      <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-700 border-blue-200">
                        <Clock className="w-3 h-3" /> last
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
