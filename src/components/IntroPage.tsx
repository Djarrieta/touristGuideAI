"use client"

import { useState } from "react"
import { MapPin, Navigation, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

interface IntroPageProps {
  onLocationGranted: () => void
  onLocationDenied: () => void
}

export default function IntroPage({ onLocationGranted, onLocationDenied }: IntroPageProps) {
  const [isRequesting, setIsRequesting] = useState(false)

  const requestLocation = async () => {
    setIsRequesting(true)

    if (!navigator.geolocation) {
      onLocationDenied()
      return
    }

    try {
      await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000,
          }
        )
      })
      
      onLocationGranted()
    } catch (error) {
      console.warn('Location permission denied:', error)
      onLocationDenied()
    } finally {
      setIsRequesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Tourist Guide</CardTitle>
          <p className="text-muted-foreground mt-2">
            Welcome! Let's help you explore amazing places around you.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Navigation className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900">Location Access</h3>
                <p className="text-sm text-blue-700 mt-1">
                  We'll request access to your location to show nearby places and provide personalized recommendations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <AlertCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-900">Your Privacy</h3>
                <p className="text-sm text-green-700 mt-1">
                  Your location data is only used to center the map and is not stored or shared.
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
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Requesting Location...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Allow Location Access
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            You can change this permission anytime in your browser settings.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
