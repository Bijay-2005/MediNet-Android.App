import { useState, useEffect, useRef } from "react";
import { MapPin, ChevronDown, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface LocationSelectorProps {
  onLocationChange?: (location: { name: string; coordinates?: [number, number] }) => void;
}

const LocationSelector = ({ onLocationChange }: LocationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Set Location");
  const [manualLocation, setManualLocation] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [mapboxToken] = useState("pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTJuNjMyMDkwb3FwMmxzZnU4ZnNwajdkIn0.UUP_8WzUKYqT8fVHtFUi8w");

  // Initialize Mapbox access token
  useEffect(() => {
    if (mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
    }
  }, [mapboxToken]);

  const detectLocation = () => {
    setIsDetecting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocoding with Mapbox
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}&types=locality,place`
            );
            
            if (response.ok) {
              const data = await response.json();
              const placeName = data.features[0]?.place_name || `Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
              
              setCurrentLocation(placeName.split(',')[0]);
              onLocationChange?.({
                name: placeName.split(',')[0],
                coordinates: [longitude, latitude]
              });
            } else {
              setCurrentLocation(`Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
              onLocationChange?.({
                name: `Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
                coordinates: [longitude, latitude]
              });
            }
          } catch (error) {
            console.error('Error fetching location name:', error);
            setCurrentLocation(`Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
            onLocationChange?.({
              name: `Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
              coordinates: [longitude, latitude]
            });
          } finally {
            setIsDetecting(false);
            setIsOpen(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsDetecting(false);
          // Fallback to manual entry
        }
      );
    } else {
      setIsDetecting(false);
    }
  };

  const handleManualLocation = () => {
    if (manualLocation.trim()) {
      setCurrentLocation(manualLocation.trim());
      onLocationChange?.({ name: manualLocation.trim() });
      setManualLocation("");
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent rounded-lg px-3 py-2 transition-colors">
          <MapPin className="w-4 h-4 text-primary" />
          <div className="text-left">
            <div className="text-xs text-muted-foreground">Location</div>
            <div className="text-sm font-medium text-foreground">
              {currentLocation}
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <h4 className="font-medium">Set Your Location</h4>
          
          {/* Auto Detect */}
          <Button
            onClick={detectLocation}
            disabled={isDetecting}
            className="w-full justify-start"
            variant="outline"
          >
            <Navigation className="w-4 h-4 mr-2" />
            {isDetecting ? "Detecting..." : "Use Current Location"}
          </Button>
          
          {/* Manual Entry */}
          <div className="space-y-2">
            <Input
              placeholder="Enter location manually"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleManualLocation()}
            />
            <Button
              onClick={handleManualLocation}
              disabled={!manualLocation.trim()}
              className="w-full"
              size="sm"
            >
              Set Location
            </Button>
          </div>
          
          {/* Popular Locations */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Popular Locations</div>
            <div className="space-y-1">
              {["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"].map((city) => (
                <Button
                  key={city}
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setCurrentLocation(city);
                    onLocationChange?.({ name: city });
                    setIsOpen(false);
                  }}
                >
                  <MapPin className="w-3 h-3 mr-2" />
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector