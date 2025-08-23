import Link from "next/link"
import { Metadata } from "next"
import { MapPin, Navigation, Star, Users, Camera, Coffee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Guía Turística - Descubre Lugares Asombrosos a Tu Alrededor",
  description: "Explora el mundo con nuestra guía turística interactiva. Encuentra restaurantes, atracciones, parques y eventos cerca de tu ubicación con recomendaciones personalizadas y navegación GPS en tiempo real.",
  keywords: ["guía turística", "viajes", "lugares", "mapa", "atracciones", "restaurantes", "GPS", "navegación", "explorar", "descubrir"],
  authors: [{ name: "Equipo de Guía Turística" }],
  creator: "Guía Turística",
  publisher: "Guía Turística",
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
    title: "Guía Turística - Descubre Lugares Asombrosos a Tu Alrededor",
    description: "Tu compañero de viaje perfecto para explorar nuevos destinos con mapas interactivos y recomendaciones personalizadas.",
    url: 'https://touristguide.com',
    siteName: 'Guía Turística',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Guía Turística - Mapa Interactivo para Viajeros',
    }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Guía Turística - Descubre Lugares Asombrosos a Tu Alrededor",
    description: "Tu compañero de viaje perfecto para explorar nuevos destinos con mapas interactivos y recomendaciones personalizadas.",
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
      <section className="bg-gradient-to-br from-background to-muted py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mx-auto mb-8 p-4 bg-primary rounded-full w-fit">
            <MapPin className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {"Guía Turística"}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {"Descubre lugares asombrosos a tu alrededor con nuestro mapa interactivo y recomendaciones personalizadas."}
            {"Tu compañero de viaje perfecto para explorar nuevos destinos."}
          </p>
          <Link href="/map">
            <Button size="lg" className="text-lg px-8 py-3">
              <Navigation className="w-5 h-5 mr-2" />
              {"Comenzar a Explorar"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {"¿Por Qué Elegir Guía Turística?"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {"Hacemos que explorar nuevos lugares sea fácil, seguro y emocionante con tecnología de punta y conocimientos locales."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-secondary rounded-full w-fit">
                  <Navigation className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>{"Descubrimiento Basado en la Ubicación"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {"Encuentra lugares asombrosos cerca de tu ubicación actual con integración GPS precisa y recomendaciones en tiempo real."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent rounded-full w-fit">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>{"Recomendaciones Seleccionadas"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {"Obtén sugerencias personalizadas basadas en los favoritos locales, lugares de moda y joyas ocultas en tu área."}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>{"Impulsado por la Comunidad"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {"Descubre lugares amados por los lugareños y otros viajeros. Reseñas reales de personas reales que han estado allí."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {"Explora Categorías Populares"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {"Lo que sea que estés buscando, te ayudaremos a encontrarlo"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-lg shadow hover:shadow-md transition-shadow">
              <Coffee className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">{"Restaurantes"}</h3>
              <p className="text-sm text-muted-foreground mt-1">{"Cafeterías y Comedores"}</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow hover:shadow-md transition-shadow">
              <Camera className="w-12 h-12 text-destructive mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">{"Atracciones"}</h3>
              <p className="text-sm text-muted-foreground mt-1">{"Vistas y Monumentos"}</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow hover:shadow-md transition-shadow">
              <MapPin className="w-12 h-12 text-chart-5 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">{"Parques"}</h3>
              <p className="text-sm text-muted-foreground mt-1">{"Naturaleza y Recreación"}</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow hover:shadow-md transition-shadow">
              <Users className="w-12 h-12 text-chart-4 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">{"Eventos"}</h3>
              <p className="text-sm text-muted-foreground mt-1">{"Actividades y Espectáculos"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {"¿Listo para Explorar?"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {"Comienza tu aventura hoy y descubre lugares asombrosos que no sabías que existían."}
          </p>
          <Link href="/map">
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary bg-primary-foreground hover:bg-muted text-lg px-8 py-3">
              <MapPin className="w-5 h-5 mr-2" />
              {"Abrir Mapa Interactivo"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-foreground text-background">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="text-xl font-bold">{"Guía Turística"}</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            {"Tu compañero de confianza para descubrir lugares asombrosos alrededor del mundo."}
          </p>
          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              {"© 2024 Guía Turística. Hecho con ❤️ para viajeros."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
