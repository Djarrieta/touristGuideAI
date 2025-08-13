// Centralized constants for map behaviors and defaults

export const DEFAULT_ZOOM = 15;
export const CENTER_ON_USER_ZOOM = 20;
export const MARKER_FOCUS_ZOOM = 20;

// Default map center (falls back when user location is unavailable)
export const DEFAULT_CENTER = {
	lat: 39.0201344,
	lng: -77.4144,
} as const;

// Distance in meters within which a marker can be selected
export const MARKER_SELECT_RADIUS_METERS = 10 as const;
