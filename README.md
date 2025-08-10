# Tourist Guide - Interactive Map

A modern, interactive tourist guide application built with Next.js, React, TypeScript, and Google Maps API.

## Features

- 🗺️ Interactive Google Maps integration
- 📍 Add custom markers by clicking on the map
- 🏷️ Manage places with names and descriptions
- 🎯 Click on markers to view details
- 🗑️ Delete unwanted markers
- 📱 Responsive design for all devices
- 🌙 Dark mode support
- ✨ Modern UI with shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Maps API Key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your Google Maps API Key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
   - Create a new project or select an existing one
   - Enable the Maps JavaScript API
   - Create an API Key
   - Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   - Add your API key to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **View Places**: The map loads with some default tourist attractions
2. **Add New Places**: 
   - Fill in the place name and description in the sidebar
   - Click "Enable Adding Mode"
   - Click anywhere on the map to place a marker
3. **View Details**: Click on any marker to see its information
4. **Navigate**: Click on places in the sidebar to center the map on them
5. **Delete Places**: Click the delete button in the info window to remove markers

## Technologies Used

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Google Maps API** - Interactive maps
- **@react-google-maps/api** - React Google Maps integration
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Customization

### Changing Default Location
Edit the `center` object in `src/components/MapComponent.tsx`:
```typescript
const center = {
  lat: 40.7128,  // Your latitude
  lng: -74.006,  // Your longitude
}
```

### Adding Default Markers
Modify the initial `markers` state in `MapComponent.tsx`:
```typescript
const [markers, setMarkers] = useState<MarkerData[]>([
  {
    id: "1",
    position: { lat: YOUR_LAT, lng: YOUR_LNG },
    title: "Your Place",
    description: "Your description",
  },
  // Add more markers...
])
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
