/**
 * Colonial Theme Color Palette
 * Centralized color definitions for consistent theming across components and map
 */

export const COLONIAL_COLORS = {
  // Base Colors
  background: '#f4f1e8', // Aged parchment
  foreground: '#3e2723', // Deep colonial brown
  
  // Card Colors  
  card: '#f0ead6', // Warm aged paper
  cardForeground: '#3e2723', // Colonial brown text
  
  // Primary Colors (Colonial Gold/Terracotta)
  primary: '#b8860b', // Colonial gold
  primaryForeground: '#f4f1e8', // Parchment for contrast
  
  // Secondary Colors (Warm Stone)
  secondary: '#d2b48c', // Warm stone
  secondaryForeground: '#3e2723', // Deep brown
  
  // Utility Colors
  muted: '#e6dcc6', // Pale colonial stone
  mutedForeground: '#5d4037', // Medium brown
  accent: '#d2b48c', // Aged stone
  destructive: '#b8441f', // Colonial red clay
  destructiveForeground: '#f4f1e8', // Parchment
  border: '#c19a6b', // Warm beige
  
  // Extended Colonial Palette
  colonialAccentLight: '#f3e6d3', // Light terracotta
  colonialAccentBorder: '#d4a574', // Medium terracotta
  colonialSuccessLight: '#e8e2d6', // Warm sage light
  colonialSuccess: '#8b8264', // Deeper sage green
  colonialSuccessDark: '#5d5a47', // Dark sage
  
  // Chart/Accent Colors
  chart1: '#b8860b', // Terracotta gold
  chart2: '#b8441f', // Colonial red
  chart3: '#3e2723', // Deep brown
  chart4: '#c19a6b', // Warm beige
  chart5: '#d2b48c', // Stone tan
} as const

/**
 * Google Maps specific color mapping
 * These hex colors correspond to our colonial theme
 */
export const MAP_COLORS = {
  // Map Background & Terrain
  mapBackground: COLONIAL_COLORS.background,
  landscape: COLONIAL_COLORS.card,
  
  // Water Features
  water: '#7fb3d1', // Vintage blue-green
  waterLabels: '#2c4f66', // Deep colonial blue
  
  // Roads
  highway: COLONIAL_COLORS.primary, // Colonial gold
  highwayStroke: '#8b6914', // Darker gold
  arterial: '#e8e8e8', // Light stone
  arterialStroke: '#a0522d', // Sienna brown
  localRoad: '#ffffff', // White
  localRoadStroke: COLONIAL_COLORS.border, // Warm beige
  
  // Labels & Text
  roadLabels: COLONIAL_COLORS.foreground, // Deep brown
  roadLabelsStroke: COLONIAL_COLORS.background, // Parchment outline
  adminLabels: COLONIAL_COLORS.foreground, // Deep brown
  adminLabelsStroke: COLONIAL_COLORS.background, // Parchment outline
  adminBoundaries: '#cd853f', // Colonial gold boundaries
  
  // Built Environment
  buildings: '#ede0d3', // Adobe/clay color
  naturalLandscape: '#e8dcc0', // Vintage earth tone
  naturalLandcover: '#d7c7a8', // Faded colonial green
  terrain: '#e6d7c3', // Vintage terrain
} as const

/**
 * HSL values for Tailwind CSS custom properties
 */
export const HSL_COLORS = {
  background: '46 27% 94%',
  foreground: '16 35% 15%',
  card: '47 33% 91%',
  cardForeground: '16 35% 15%',
  primary: '43 89% 38%',
  primaryForeground: '46 27% 94%',
  secondary: '39 39% 69%',
  secondaryForeground: '16 35% 15%',
  muted: '44 24% 84%',
  mutedForeground: '16 12% 30%',
  accent: '39 39% 69%',
  destructive: '14 89% 42%',
  destructiveForeground: '46 27% 94%',
  border: '34 29% 58%',
  colonialAccentLight: '43 45% 88%',
  colonialAccentBorder: '43 35% 70%',
  colonialSuccessLight: '34 35% 85%',
  colonialSuccess: '34 45% 45%',
  colonialSuccessDark: '34 55% 25%',
  chart1: '43 89% 38%',
  chart2: '14 89% 42%',
  chart3: '16 35% 15%',
  chart4: '34 29% 58%',
  chart5: '39 39% 75%',
} as const

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
      stylers: [{ color: MAP_COLORS.mapBackground }],
    },
    // Water features
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: MAP_COLORS.water }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: MAP_COLORS.waterLabels }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: MAP_COLORS.roadLabelsStroke }, { weight: 2 }],
    },
    // Landscape/terrain
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: MAP_COLORS.landscape }],
    },
    // Roads
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: MAP_COLORS.highway }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: MAP_COLORS.highwayStroke }, { weight: 2 }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: MAP_COLORS.arterial }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.stroke",
      stylers: [{ color: MAP_COLORS.arterialStroke }, { weight: 1 }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: MAP_COLORS.localRoad }],
    },
    {
      featureType: "road.local",
      elementType: "geometry.stroke",
      stylers: [{ color: MAP_COLORS.localRoadStroke }, { weight: 0.5 }],
    },
    // Labels
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        { color: MAP_COLORS.roadLabels },
        { "font-family": "serif" },
        { "font-size": "12px" },
        { "font-weight": "normal" }
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [{ color: MAP_COLORS.roadLabelsStroke }, { weight: 3 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: MAP_COLORS.adminBoundaries }, { weight: 1.5 }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: MAP_COLORS.adminLabels }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.stroke",
      stylers: [{ color: MAP_COLORS.adminLabelsStroke }, { weight: 3 }],
    },
    // Built environment
    {
      featureType: "landscape.man_made",
      elementType: "geometry",
      stylers: [{ color: MAP_COLORS.buildings }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: MAP_COLORS.naturalLandscape }],
    },
    {
      featureType: "landscape.natural.landcover",
      elementType: "geometry",
      stylers: [{ color: MAP_COLORS.naturalLandcover }],
    },
    {
      featureType: "landscape.natural.terrain",
      elementType: "geometry",
      stylers: [{ color: MAP_COLORS.terrain }],
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
