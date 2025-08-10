/**
 * Colonial Theme Color Palette
 * Centralized color definitions for consistent theming across components and map
 */
export const PALETTE = {
  parchment: '#f4f1e8', // Aged parchment
  deepBrown: '#3e2723', // Deep colonial brown
  agedPaper: '#f0ead6', // Warm aged paper
  gold: '#b8860b', // Colonial gold
  warmStone: '#d2b48c', // Warm stone
  paleStone: '#e6dcc6', // Pale colonial stone
  mediumBrown: '#5d4037', // Medium brown
  agedStone: '#d2b48c', // Aged stone
  redClay: '#b8441f', // Colonial red clay
  warmBeige: '#c19a6b', // Warm beige
  lightTerracotta: '#f3e6d3', // Light terracotta
  mediumTerracotta: '#d4a574', // Medium terracotta
  warmSageLight: '#e8e2d6', // Warm sage light
  deepSage: '#8b8264', // Deeper sage green
  darkSage: '#5d5a47', // Dark sage
  vintageBlueGreen: '#7fb3d1', // Vintage blue-green
  deepColonialBlue: '#2c4f66', // Deep colonial blue
  darkerGold: '#8b6914', // Darker gold
  lightStone: '#e8e8e8', // Light stone
  siennaBrown: '#a0522d', // Sienna brown
  white: '#ffffff', // White
  colonialGold: '#cd853f', // Colonial gold boundaries
  adobeClay: '#ede0d3', // Adobe/clay color
  vintageEarth: '#e8dcc0', // Vintage earth tone
  fadedColonialGreen: '#d7c7a8', // Faded colonial green
  vintageTerrain: '#e6d7c3', // Vintage terrain
} as const;

export const THEME_COLORS = {
  // Base
  background: PALETTE.parchment,
  foreground: PALETTE.deepBrown,
  // Card
  card: PALETTE.agedPaper,
  cardForeground: PALETTE.deepBrown,
  // Primary
  primary: PALETTE.gold,
  primaryForeground: PALETTE.parchment,
  // Secondary
  secondary: PALETTE.warmStone,
  secondaryForeground: PALETTE.deepBrown,
  // Muted
  muted: PALETTE.paleStone,
  mutedForeground: PALETTE.mediumBrown,
  // Accent
  accent: PALETTE.agedStone,
  // Destructive
  destructive: PALETTE.redClay,
  destructiveForeground: PALETTE.parchment,
  // Border
  border: PALETTE.warmBeige,

  // Chart/Accent Colors
  chart1: PALETTE.gold,
  chart2: PALETTE.redClay,
  chart3: PALETTE.deepBrown,
  chart4: PALETTE.warmBeige,
  chart5: PALETTE.warmStone,

  // Map Colors
  mapBackground: PALETTE.parchment,
  landscape: PALETTE.agedPaper,
  water: PALETTE.vintageBlueGreen,
  waterLabels: PALETTE.deepColonialBlue,
  highway: PALETTE.gold,
  highwayStroke: PALETTE.darkerGold,
  arterial: PALETTE.lightStone,
  arterialStroke: PALETTE.siennaBrown,
  localRoad: PALETTE.white,
  localRoadStroke: PALETTE.warmBeige,
  roadLabels: PALETTE.deepBrown,
  roadLabelsStroke: PALETTE.parchment,
  adminLabels: PALETTE.deepBrown,
  adminLabelsStroke: PALETTE.parchment,
  adminBoundaries: PALETTE.colonialGold,
  buildings: PALETTE.adobeClay,
  naturalLandscape: PALETTE.vintageEarth,
  naturalLandcover: PALETTE.fadedColonialGreen,
  terrain: PALETTE.vintageTerrain,
} as const;

/**
 * HSL values for Tailwind CSS custom properties
 */
export const PALETTE_HSL = {
  parchment: '46 27% 94%',
  deepBrown: '16 35% 15%',
  agedPaper: '47 33% 91%',
  gold: '43 89% 38%',
  warmStone: '39 39% 69%',
  paleStone: '44 24% 84%',
  mediumBrown: '16 12% 30%',
  agedStone: '39 39% 69%',
  redClay: '14 89% 42%',
  warmBeige: '34 29% 58%',
  lightTerracotta: '43 45% 88%',
  mediumTerracotta: '43 35% 70%',
  warmSageLight: '34 35% 85%',
  deepSage: '34 45% 45%',
  darkSage: '34 55% 25%',
  vintageBlueGreen: '202 45% 65%',
  deepColonialBlue: '205 40% 29%',
  darkerGold: '43 75% 31%',
  lightStone: '0 0% 91%',
  siennaBrown: '25 57% 40%',
  white: '0 0% 100%',
  colonialGold: '30 63% 52%',
  adobeClay: '33 43% 88%',
  vintageEarth: '44 38% 83%',
  fadedColonialGreen: '45 38% 75%',
  vintageTerrain: '39 38% 83%',
} as const;

export const THEME_HSL = {
  background: PALETTE_HSL.parchment,
  foreground: PALETTE_HSL.deepBrown,
  card: PALETTE_HSL.agedPaper,
  cardForeground: PALETTE_HSL.deepBrown,
  primary: PALETTE_HSL.gold,
  primaryForeground: PALETTE_HSL.parchment,
  secondary: PALETTE_HSL.warmStone,
  secondaryForeground: PALETTE_HSL.deepBrown,
  muted: PALETTE_HSL.paleStone,
  mutedForeground: PALETTE_HSL.mediumBrown,
  accent: PALETTE_HSL.agedStone,
  destructive: PALETTE_HSL.redClay,
  destructiveForeground: PALETTE_HSL.parchment,
  border: PALETTE_HSL.warmBeige,
  chart1: PALETTE_HSL.gold,
  chart2: PALETTE_HSL.redClay,
  chart3: PALETTE_HSL.deepBrown,
  chart4: PALETTE_HSL.warmBeige,
  chart5: PALETTE_HSL.warmStone,
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
