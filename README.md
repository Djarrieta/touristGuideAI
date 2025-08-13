# Tourist Guide

An interactive, location-aware tourist guide built with Next.js, React, TypeScript, Tailwind CSS, and the Google Maps JavaScript API.

## Overview

The app helps users discover nearby points of interest with an interactive map and a curated list of places. It requests geolocation permission to center the map, displays markers (mock data by default), and reads out place details using the Web Speech API (Spanish, es-CO).

## Features

- Interactive Google Map with custom styling
- Geolocation permission flow (intro → granted/denied states)
- Auto-centering to user location or a default center (Rionegro, Colombia)
- Sidebar list of places synchronized with map markers
- Click a place or marker to pan/zoom, open an info window, and play text-to-speech
- Responsive UI with cards/buttons (Tailwind + shadcn-style components)

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- @react-google-maps/api for Google Maps integration
- Tailwind CSS v4 for styling
- Lucide React for icons

## Project Structure

```
src/
  app/
    layout.tsx            # Root layout (App Router)
    page.tsx              # Marketing homepage (server component)
    map/
      page.tsx            # Main map experience (client components)
  components/
    IntroPage.tsx         # Geolocation intro/permission request (client)
    LocationDenied.tsx    # Fallback screen when permission is denied (client)
    PlacesList.tsx        # Sidebar listing of places (client)
    Map/
      index.tsx           # Google Map wrapper with markers and InfoWindow (client)
      useUserLocation.ts  # Hook to get current user location (client)
    ui/
      button.tsx          # UI primitives
      card.tsx            # UI primitives
  lib/
    colors.ts             # Map style generator
    speech.ts             # Web Speech API helper (es-CO)
    utils.ts              # Shared utilities
public/                   # Static assets
```

Key modules:

- `src/app/map/page.tsx`: Orchestrates the map page, manages markers, selection, and speech.
- `src/components/Map/index.tsx`: Loads and renders Google Map, applies styles, handles markers & InfoWindow.
- `src/components/Map/useUserLocation.ts`: Geolocation with sensible defaults and error handling.
- `src/lib/speech.ts`: Text-to-speech helper (Spanish, es-CO).

## Setup

### Prerequisites

- Node.js 18+
- A Google Maps JavaScript API key with Maps JavaScript API enabled

### Install dependencies

```bash
npm install
# or
pnpm install
# or
bun install
```

### Configure environment

Create a `.env.local` file in the project root with your API key:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### Run in development

The dev server is configured to run on port 3005.

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3005

### Production build

```bash
npm run build
npm start
```

## How it works

1. Home (`/`) introduces the app and links to `/map`.
2. `/map` shows an intro asking for geolocation permission.
   - Granted: centers the map on the user; shows markers and list.
   - Denied: renders a friendly fallback with retry.
3. Clicking a list item or marker pans/zooms the map, opens an info window, and uses speech synthesis to announce the place in Spanish.

Notes:

- Markers are mocked in `src/app/map/page.tsx` and located around Rionegro, Colombia. Replace with real data as needed.
- Speech synthesis requires a browser with `window.speechSynthesis` support.

## Scripts

- `dev`: Start Next.js dev server on port 3005
- `build`: Build for production
- `start`: Start production server
- `lint`: Lint the codebase

## Configuration

- Port (dev): defined in `package.json` as `next dev --turbopack -p 3005`.
- Google Maps: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` must be present at runtime (client-exposed).
