import { useState, useEffect } from 'react'

interface LocationCoords {
  lat: number
  lng: number
}

interface UseUserLocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
}

interface UseUserLocationReturn {
  location: LocationCoords | null
  loading: boolean
  error: GeolocationPositionError | null
  refetch: () => void
}

const defaultOptions: UseUserLocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 300000, // 5 minutes cache
}

export function useUserLocation(options: UseUserLocationOptions = {}): UseUserLocationReturn {
  const [location, setLocation] = useState<LocationCoords | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<GeolocationPositionError | null>(null)

  const mergedOptions = { ...defaultOptions, ...options }

  const getCurrentPosition = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      const geolocationError = {
        code: 0,
        message: 'Geolocation is not supported by this browser',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError
      
      setError(geolocationError)
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setError(null)
        setLoading(false)
      },
      (error) => {
        console.warn('Geolocation error:', error)
        setError(error)
        setLoading(false)
      },
      mergedOptions
    )
  }

  useEffect(() => {
    getCurrentPosition()
  }, [])

  return {
    location,
    loading,
    error,
    refetch: getCurrentPosition,
  }
}
