"use client";

import IntroPage from "@/components/IntroPage";
import LocationDenied from "@/components/LocationDenied";
import Map, { type MarkerData } from "@/components/Map";
import {
  VisitedPlacesProvider,
  useVisitedPlacesContext,
} from "@/components/Map/VisitedPlacesContext";
import PlacesList from "@/components/PlacesList";
import { MARKER_FOCUS_ZOOM } from "@/lib/constants";
import { speak } from "@/lib/speech";
import { useRef, useState } from "react";

const mockMarkers: MarkerData[] = [
  {
    id: "1",
    position: { lat: 6.1458, lng: -75.3739 },
    title: "Parque Principal de Rionegro (Parque de la Libertad)",
    description:
      "El corazón de la ciudad, un lugar histórico y de encuentro. Aquí se encuentra la estatua ecuestre de José María Córdova y la Concatedral de San Nicolás El Magno.",
  },
  {
    id: "2",
    position: { lat: 6.1459, lng: -75.3741 },
    title: "Concatedral de San Nicolás El Magno",
    description:
      "Una imponente iglesia con un gran valor histórico y artístico. Es una de las sedes de la Diócesis de Sonsón-Rionegro y alberga la tumba de Juan del Corral.",
  },
  {
    id: "3",
    position: { lat: 6.1455, lng: -75.3743 },
    title: "Museo Histórico Casa de la Convención de Rionegro",
    description:
      "Un museo fundamental en la historia de Colombia, ya que en este lugar se firmó la Constitución de 1863, que dio origen a los Estados Unidos de Colombia. El museo conserva documentos y objetos de esa época.",
  },
  {
    id: "4",
    position: { lat: 6.1453, lng: -75.3729 },
    title: "Museo de Artes de Rionegro (MAR)",
    description:
      "Un espacio cultural que promueve el arte local y nacional. Ubicado en la antigua sacristía de la Catedral de San Nicolás, ofrece exposiciones de arte religioso y contemporáneo.",
  },
  {
    id: "5",
    position: { lat: 6.1264, lng: -75.4087 },
    title: "Tutucán (Parque Comfama Rionegro)",
    description:
      "Un popular parque temático que recrea un típico pueblo antioqueño con sus costumbres, arquitectura y gastronomía. Ideal para pasar un día en familia con diversas actividades y espectáculos.",
  },
  {
    id: "6",
    position: { lat: 6.1287, lng: -75.4082 },
    title: "Iglesia de San Antonio de Pereira",
    description:
      "Ubicada en el corregimiento del mismo nombre, esta iglesia es el centro de un pueblo conocido por sus dulces tradicionales y un ambiente pintoresco.",
  },
  {
    id: "7",
    position: { lat: 6.1451, lng: -75.3736 },
    title: "Museo Militar El Cóndor",
    description:
      "Un museo dedicado a la historia militar de Colombia, con colecciones de armamento, uniformes y otros objetos relacionados con las Fuerzas Armadas.",
  },
  {
    id: "8",
    position: { lat: 6.1459, lng: -75.3741 },
    title: "Plaza de la Libertad (Parque Principal)",
    description:
      "El corazón de la ciudad, un lugar histórico y de encuentro. Aquí se encuentra la estatua ecuestre de José María Córdova y la Concatedral de San Nicolás El Magno.",
  },
  {
    id: "9",
    position: { lat: 6.55624, lng: -75.82777 },
    title: "Centro Histórico de Santa Fe de Antioquia",
    description:
      "Pasea por sus calles empedradas y admira la arquitectura colonial. Toda esta zona es un Monumento Nacional de Colombia.",
  },
  {
    id: "10",
    position: { lat: 6.556633, lng: -75.826727 },
    title: "Catedral Basílica Metropolitana de la Inmaculada Concepción",
    description:
      "La iglesia principal y más grande de la ciudad. Su construcción de ladrillo y un estilo neoclásico y barroco la convierten en un punto de referencia cultural e histórico.",
  },
  {
    id: "11",
    position: { lat: 6.556944, lng: -75.828611 },
    title: "Puente de Occidente",
    description:
      "Un impresionante puente colgante declarado Monumento Nacional. Cruza el río Cauca y es un símbolo de la ingeniería del siglo XIX.",
  },
  {
    id: "12",
    position: { lat: 6.55734, lng: -75.82664 },
    title: "Museo Juan del Corral",
    description:
      "Ubicado en una antigua villa, este museo gratuito exhibe artefactos de las comunidades indígenas y objetos de la época colonial.",
  },
  {
    id: "13",
    position: { lat: 6.556275, lng: -75.827011 },
    title: "Plaza Bolívar (Plaza Mayor)",
    description:
      "La principal plaza de la ciudad, un lugar ideal para sentir el pulso de Santa Fe de Antioquia. Está rodeada por la Catedral y otros edificios históricos.",
  },
  {
    id: "14",
    position: { lat: 6.558055, lng: -75.828055 },
    title: "Iglesia de Santa Bárbara",
    description:
      "La iglesia más antigua de la ciudad, conocida como 'la abuela de las iglesias'. Su fachada de piedra y ladrillo tiene un estilo barroco popular único.",
  },
  {
    id: "15",
    position: { lat: 6.55833, lng: -75.82917 },
    title: "Museo de Arte Religioso Francisco Cristóbal Toro",
    description:
      "Situado cerca de la Iglesia de Santa Bárbara, este museo alberga una valiosa colección de arte sacro y objetos de la Semana Santa.",
  },
  {
    id: "16",
    position: { lat: 6.55639, lng: -75.82806 },
    title: "Iglesia de Nuestra Señora de Chiquinquirá",
    description:
      "También conocida como 'La Chinca', es una hermosa iglesia de estilo neoclásico con detalles barrocos, ubicada en una plazuela tranquila.",
  },
  {
    id: "17",
    position: { lat: 6.5566, lng: -75.8266 },
    title: "Hotel Mariscal Robledo",
    description:
      "Famoso por su encanto colonial, es uno de los hoteles más emblemáticos. Puedes explorar su vestíbulo y patio para apreciar su arquitectura.",
  },
  {
    id: "18",
    position: { lat: 6.55627, lng: -75.82705 },
    title: "Iglesia de Jesús Nazareno",
    description:
      "Conocida popularmente como la 'Iglesia de Mi Padre Jesús', este templo de estilo neoclásico sirvió como cementerio de sacerdotes durante la colonia.",
  },
  {
    id: "19",
    position: { lat: 6.55743, lng: -75.82823 },
    title: "Iglesia de San Pedro Claver",
    description:
      "Ubicada en la parte alta de la ciudad, esta iglesia destaca por su estilo neoclásico y por albergar una importante imagen de San Pedro Claver.",
  },
  {
    id: "20",
    position: { lat: 39.0201344, lng: -77.41441 },
    title: "Quiosco de café",
    description: "Un pequeño quiosco a tu lado para un espresso rápido.",
  },
  {
    id: "21",
    position: { lat: 39.02014, lng: -77.4144 },
    title: "Banco del parque",
    description: "Un banco cómodo a pocos pasos.",
  },
  // Slightly farther but still near (~20-40 m)
  {
    id: "22",
    position: { lat: 39.0202, lng: -77.41435 },
    title: "Señal de información",
    description: "Panel de información local cercano.",
  },
  // Farther away (~60-120 m)
  {
    id: "23",
    position: { lat: 39.0207, lng: -77.4141 },
    title: "Parque infantil",
    description: "Pequeño parque infantil un poco más adelante.",
  },
  // Clearly far (~300-500 m)
  {
    id: "24",
    position: { lat: 39.0225, lng: -77.413 },
    title: "Centro Comunitario",
    description: "Un lugar más grande a un corto paseo.",
  },
];

type LocationState = "intro" | "granted" | "denied";

function MapContent() {
  const [markers] = useState<MarkerData[]>(mockMarkers);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [locationState, setLocationState] = useState<LocationState>("intro");
  const mapRef = useRef<google.maps.Map | null>(null);
  const { markVisited, setLastSelected } = useVisitedPlacesContext();

  const handleMarkerClick = (marker: MarkerData) => {
    if (mapRef.current) {
      mapRef.current.panTo(marker.position);
      mapRef.current.setZoom(MARKER_FOCUS_ZOOM);
    }
    setSelectedMarker(marker);
    // Persist selection and mark as visited
    markVisited(marker.id);
    setLastSelected(marker.id);
    speak(marker.title + ". " + marker.description);
  };

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  // Show intro page initially
  if (locationState === "intro") {
    return (
      <IntroPage
        onLocationGranted={() => setLocationState("granted")}
        onLocationDenied={() => setLocationState("denied")}
      />
    );
  }

  // Show sorry message if location denied
  if (locationState === "denied") {
    return <LocationDenied onRetry={() => setLocationState("intro")} />;
  }

  // Show main app if location granted
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <Map
              markers={markers}
              selectedMarker={selectedMarker}
              onMarkerClick={handleMarkerClick}
              onCloseInfoWindow={() => {
                setSelectedMarker(null);
                setLastSelected(null);
              }}
              onMapLoad={handleMapLoad}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PlacesList markers={markers} onPlaceClick={handleMarkerClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <VisitedPlacesProvider>
      <MapContent />
    </VisitedPlacesProvider>
  );
}
