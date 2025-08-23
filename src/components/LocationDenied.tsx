"use client"

import { MapPin, RefreshCw, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

interface LocationDeniedProps {
  onRetry: () => void
}

export default function LocationDenied({ onRetry }: LocationDeniedProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-destructive rounded-full w-fit">
            <MapPin className="w-8 h-8 text-destructive-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">{"Se Necesita Acceso a la Ubicación"}</CardTitle>
          <p className="text-muted-foreground mt-2">
            {"Lo sentimos, pero necesitamos acceso a la ubicación para ofrecerte la mejor experiencia turística."}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">{"¿Por qué necesitamos esto?"}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{"• Mostrar lugares cerca de tu ubicación actual"}</li>
                <li>{"• Proporcionar direcciones precisas"}</li>
                <li>{"• Recomendaciones personalizadas"}</li>
              </ul>
            </div>

            <div className="p-4 bg-accent rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                {"Cómo habilitar la ubicación:"}
              </h3>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>{"1. Haz clic en el ícono de ubicación en la barra de direcciones de tu navegador"}</li>
                                <li>2. Selecciona &quot;Permitir&quot; para el acceso a la ubicación</li>
                <li>3. Actualiza la página o haz clic en &quot;Intentar de Nuevo&quot; a continuación</li>
              </ol>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onRetry}
              className="w-full"
              size="lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar de Nuevo
            </Button>
            
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Actualizar Página
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            {"No te preocupes, tu privacidad es importante para nosotros. Los datos de ubicación solo se utilizan para mejorar tu experiencia y nunca se almacenan."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
