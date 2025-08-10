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
          <CardTitle className="text-2xl font-bold text-destructive">Location Access Needed</CardTitle>
          <p className="text-muted-foreground mt-2">
            We're sorry, but we need location access to provide the best tourist experience.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Why do we need this?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Show places near your current location</li>
                <li>• Provide accurate directions</li>
                <li>• Personalized recommendations</li>
              </ul>
            </div>

            <div className="p-4 bg-colonial-accent-light rounded-lg border border-colonial-accent-border">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                How to enable location:
              </h3>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Click on the location icon in your browser's address bar</li>
                <li>2. Select "Allow" for location access</li>
                <li>3. Refresh the page or click "Try Again" below</li>
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
              Try Again
            </Button>
            
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Don't worry - your privacy is important to us. Location data is only used to enhance your experience and is never stored.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
