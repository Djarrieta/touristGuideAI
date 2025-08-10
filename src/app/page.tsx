import Link from "next/link"
import { Metadata } from "next"
import { MapPin, Navigation, Star, Users, Camera, Coffee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Tourist Guide - Discover Amazing Places Around You",
  description: "Explore the world with our interactive tourist guide. Find restaurants, attractions, parks, and events near your location with personalized recommendations and real-time GPS navigation.",
  keywords: ["tourist guide", "travel", "places", "map", "attractions", "restaurants", "GPS", "navigation", "explore", "discover"],
  authors: [{ name: "Tourist Guide Team" }],
  creator: "Tourist Guide",
  publisher: "Tourist Guide",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://touristguide.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Tourist Guide - Discover Amazing Places Around You",
    description: "Your perfect travel companion for exploring new destinations with interactive maps and personalized recommendations.",
    url: 'https://touristguide.com',
    siteName: 'Tourist Guide',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Tourist Guide - Interactive Map for Travelers',
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tourist Guide - Discover Amazing Places Around You",
    description: "Your perfect travel companion for exploring new destinations with interactive maps and personalized recommendations.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// This is now a server-side page for better SEO
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mx-auto mb-8 p-4 bg-blue-600 rounded-full w-fit">
            <MapPin className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Tourist Guide
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing places around you with our interactive map and personalized recommendations. 
            Your perfect travel companion for exploring new destinations.
          </p>
          <Link href="/map">
            <Button size="lg" className="text-lg px-8 py-3">
              <Navigation className="w-5 h-5 mr-2" />
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tourist Guide?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make exploring new places easy, safe, and exciting with cutting-edge technology and local insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                  <Navigation className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Location-Based Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find amazing places near your current location with precise GPS integration and real-time recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Curated Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get personalized suggestions based on local favorites, trending spots, and hidden gems in your area.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Discover places loved by locals and fellow travelers. Real reviews from real people who've been there.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Popular Categories
            </h2>
            <p className="text-lg text-gray-600">
              Whatever you're looking for, we'll help you find it
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <Coffee className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Restaurants</h3>
              <p className="text-sm text-gray-600 mt-1">Cafes & Dining</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <Camera className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Attractions</h3>
              <p className="text-sm text-gray-600 mt-1">Sights & Landmarks</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <MapPin className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Parks</h3>
              <p className="text-sm text-gray-600 mt-1">Nature & Recreation</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Events</h3>
              <p className="text-sm text-gray-600 mt-1">Activities & Shows</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your adventure today and discover amazing places you never knew existed.
          </p>
          <Link href="/map">
            <Button size="lg" variant="outline" className="text-blue-600 bg-white hover:bg-gray-100 text-lg px-8 py-3">
              <MapPin className="w-5 h-5 mr-2" />
              Open Interactive Map
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <h3 className="text-xl font-bold">Tourist Guide</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Your trusted companion for discovering amazing places around the world.
          </p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-sm text-gray-500">
              © 2024 Tourist Guide. Made with ❤️ for travelers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
