import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onLocationSelect: (location: string) => void
}

export function LocationModal({ isOpen, onClose, onLocationSelect }: LocationModalProps) {
  const [manualAddress, setManualAddress] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentLocation, setCurrentLocation] = useState<string | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const getCurrentLocation = () => {
    setIsGettingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          // Using LocationIQ reverse geocoding API
          // Note: In a real app, you'd need to add your LocationIQ API key
          try {
            const response = await fetch(
              `https://eu1.locationiq.com/v1/reverse.php?key=pk.e77e4870e052f64efdbb2b9a4f935949&lat=${latitude}&lon=${longitude}&format=json`
            )
            const data = await response.json()
            const address = `${data.display_name}`
            setCurrentLocation(address)
          } catch (error) {
            // Fallback to coordinates if API fails
            setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
          }
          setIsGettingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setCurrentLocation("Unable to get location")
          setIsGettingLocation(false)
        }
      )
    } else {
      setCurrentLocation("Geolocation not supported")
      setIsGettingLocation(false)
    }
  }

  const handleLocationSelect = (location: string) => {
    onLocationSelect(location)
    onClose()
  }

  const commonLocations = [
    "Mumbai, Maharashtra",
    "Delhi, India",
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
    "Hyderabad, Telangana",
    "Pune, Maharashtra"
  ]

  const filteredLocations = commonLocations.filter(location =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Select Location
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for your city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <Label className="text-sm font-medium">Popular Locations</Label>
              {filteredLocations.map((location) => (
                <Button
                  key={location}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handleLocationSelect(location)}
                >
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-left">{location}</span>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="current" className="space-y-4">
            <div className="text-center space-y-4">
              <Button 
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                variant="default"
                className="w-full gap-2"
              >
                <Navigation className="h-4 w-4" />
                {isGettingLocation ? "Getting Location..." : "Use Current Location"}
              </Button>
              
              {currentLocation && (
                <div className="space-y-3">
                  <Badge variant="outline" className="w-full p-3 justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    {currentLocation}
                  </Badge>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleLocationSelect(currentLocation)}
                  >
                    Select This Location
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="address">Enter Address Manually</Label>
              <Input
                id="address"
                placeholder="Enter your complete address..."
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
              />
              <Button
                variant="default"
                className="w-full"
                disabled={!manualAddress.trim()}
                onClick={() => handleLocationSelect(manualAddress)}
              >
                Save Address
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}