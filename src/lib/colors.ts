export const THEME_COLORS = {
  // Base
  background: '#f4f1e8',
  foreground: '#3e2723',
  // Card
  card: '#f0ead6',
  cardForeground: '#3e2723',
  // Primary
  primary: '#b8860b',
  primaryForeground: '#f4f1e8',
  // Secondary
  secondary: '#d2b48c',
  secondaryForeground: '#3e2723',
  // Muted
  muted: '#e6dcc6',
  mutedForeground: '#5d4037',
  // Accent
  accent: '#d2b48c',
  // Destructive
  destructive: '#b8441f',
  destructiveForeground: '#f4f1e8',
  // Border
  border: '#c19a6b',

  // Semantic
  success: '#2f6f4e',
  successLight: '#dbeee4',
  info: '#2c4f66',
  infoLight: '#7fb3d1',

  // Chart/Accent Colors
  chart1: '#b8860b',
  chart2: '#b8441f',
  chart3: '#3e2723',
  chart4: '#c19a6b',
  chart5: '#d2b48c',

  // Map Colors
  mapBackground: '#f4f1e8',
  landscape: '#f0ead6',
  water: '#7fb3d1',
  waterLabels: '#2c4f66',
  highway: '#b8860b',
  highwayStroke: '#8b6914',
  arterial: '#e8e8e8',
  arterialStroke: '#a0522d',
  localRoad: '#ffffff',
  localRoadStroke: '#c19a6b',
  roadLabels: '#3e2723',
  roadLabelsStroke: '#f4f1e8',
  adminLabels: '#3e2723',
  adminLabelsStroke: '#f4f1e8',
  adminBoundaries: '#cd853f',
  buildings: '#ede0d3',
  naturalLandscape: '#e8dcc0',
  naturalLandcover: '#d7c7a8',
  terrain: '#e6d7c3',
} as const;

/**
 * Generate Google Maps styles using the colonial color palette
 * This function creates the map styling configuration dynamically
 */
export function generateMapStyles(): google.maps.MapTypeStyle[] {
  return [
    // Overall map background
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.mapBackground }],
    },
    // Water features
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.water }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: THEME_COLORS.waterLabels }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: THEME_COLORS.roadLabelsStroke }, { weight: 2 }],
    },
    // Landscape/terrain
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.landscape }],
    },
    // Roads
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.highway }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: THEME_COLORS.highwayStroke }, { weight: 2 }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.arterial }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.stroke",
      stylers: [{ color: THEME_COLORS.arterialStroke }, { weight: 1 }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.localRoad }],
    },
    {
      featureType: "road.local",
      elementType: "geometry.stroke",
      stylers: [{ color: THEME_COLORS.localRoadStroke }, { weight: 0.5 }],
    },
    // Labels
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        { color: THEME_COLORS.roadLabels },
        { "font-family": "serif" },
        { "font-size": "12px" },
        { "font-weight": "normal" }
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [{ color: THEME_COLORS.roadLabelsStroke }, { weight: 3 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: THEME_COLORS.adminBoundaries }, { weight: 1.5 }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: THEME_COLORS.adminLabels }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.stroke",
      stylers: [{ color: THEME_COLORS.adminLabelsStroke }, { weight: 3 }],
    },
    // Built environment
    {
      featureType: "landscape.man_made",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.buildings }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.naturalLandscape }],
    },
    {
      featureType: "landscape.natural.landcover",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.naturalLandcover }],
    },
    {
      featureType: "landscape.natural.terrain",
      elementType: "geometry",
      stylers: [{ color: THEME_COLORS.terrain }],
    },
    // Hide POIs
    ...[
      "poi",
      "poi.business", 
      "poi.attraction",
      "poi.park",
      "poi.school",
      "poi.medical",
      "poi.government",
      "poi.place_of_worship",
      "poi.sports_complex",
      "transit"
    ].map(featureType => ({
      featureType,
      elementType: "all" as const,
      stylers: [{ visibility: "off" as const }],
    }))
  ]
}