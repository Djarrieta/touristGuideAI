"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const VISITED_KEY = "visitedPlaces";
const LAST_SELECTED_KEY = "lastSelectedPlace";

function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function useVisitedPlaces() {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);

  // Load from localStorage once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedVisited = safeParseJSON<string[]>(
      window.localStorage.getItem(VISITED_KEY),
      []
    );
    const storedLast = safeParseJSON<string | null>(
      window.localStorage.getItem(LAST_SELECTED_KEY),
      null
    );
    setVisited(new Set(storedVisited));
    setLastSelectedId(storedLast);
  }, []);

  // Persist visited whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(VISITED_KEY, JSON.stringify([...visited]));
  }, [visited]);

  // Persist last selected whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (lastSelectedId === null) {
      window.localStorage.removeItem(LAST_SELECTED_KEY);
    } else {
      window.localStorage.setItem(
        LAST_SELECTED_KEY,
        JSON.stringify(lastSelectedId)
      );
    }
  }, [lastSelectedId]);

  const markVisited = useCallback((id: string) => {
    setVisited((prev) => new Set(prev).add(id));
  }, []);

  const isVisited = useCallback(
    (id: string) => {
      return visited.has(id);
    },
    [visited]
  );

  const clearVisited = useCallback(() => {
    setVisited(new Set());
  }, []);

  const setLastSelected = useCallback((id: string | null) => {
    setLastSelectedId(id);
  }, []);

  const visitedIds = useMemo(() => [...visited], [visited]);

  return {
    visitedIds,
    isVisited,
    markVisited,
    clearVisited,
    lastSelectedId,
    setLastSelected,
  } as const;
}
