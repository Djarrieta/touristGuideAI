"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useVisitedPlaces } from "./useVisitedPlaces";

type VisitedPlacesContextValue = ReturnType<typeof useVisitedPlaces>;

const VisitedPlacesContext = createContext<VisitedPlacesContextValue | null>(
  null
);

export function VisitedPlacesProvider({ children }: { children: ReactNode }) {
  const value = useVisitedPlaces();
  return (
    <VisitedPlacesContext.Provider value={value}>
      {children}
    </VisitedPlacesContext.Provider>
  );
}

export function useVisitedPlacesContext() {
  const ctx = useContext(VisitedPlacesContext);
  if (!ctx) {
    throw new Error(
      "useVisitedPlacesContext must be used within a VisitedPlacesProvider"
    );
  }
  return ctx;
}
