"use client";

import { useState } from "react";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface IntroPageProps {
  onLocationGranted: () => void;
  onLocationDenied: () => void;
}

export default function IntroPage({
  onLocationGranted,
  onLocationDenied,
}: IntroPageProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const requestLocation = async () => {
    setIsRequesting(true);

    if (!navigator.geolocation) {
      onLocationDenied();
      return;
    }

    try {
      await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        });
      });

      onLocationGranted();
    } catch (error) {
  console.warn("Permiso de ubicación denegado:", error);
      onLocationDenied();
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary rounded-full w-fit">
            <MapPin className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Guía Turística</CardTitle>
          <p className="text-muted-foreground mt-2">
            ¡Bienvenido! Te ayudaremos a explorar lugares increíbles a tu alrededor.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-accent rounded-lg border border-border">
              <Navigation className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Acceso a la ubicación</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Solicitaremos acceso a tu ubicación para mostrar lugares cercanos
                  y ofrecer recomendaciones personalizadas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg border border-border">
              <AlertCircle className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-secondary-foreground">Tu privacidad</h3>
                <p className="text-sm text-secondary-foreground mt-1">
                  Tu ubicación solo se usa para centrar el mapa y no se almacena ni comparte.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={requestLocation}
            disabled={isRequesting}
            className="w-full"
            size="lg"
          >
            {isRequesting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
        Solicitando ubicación...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
        Permitir acceso a la ubicación
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
      Puedes cambiar este permiso en cualquier momento en la configuración de tu navegador.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
