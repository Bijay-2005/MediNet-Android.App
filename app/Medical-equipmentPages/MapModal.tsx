import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Search, Crosshair, Map } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Note: In a real app, you would get this token from environment variables
// For demo purposes, we'll show a placeholder input
const MAPBOX_TOKEN_PLACEHOLDER = 'pk.e77e4870e052f64efdbb2b9a4f935949';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
}

export const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  useEffect(() => {
    // In a real app, you would load Mapbox GL JS here if token is available
    if (isOpen && mapboxToken && mapContainer.current && !map.current) {
      // This is where you would initialize the Mapbox map
      // For demo purposes, we'll show a placeholder
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isOpen, mapboxToken]);

  const handleCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setSelectedLocation(locationString);
          toast({
            title: "Location Found",
            description: "Current location detected successfully",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your current location",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive",
      });
    }
  };

  const handleManualLocation = () => {
    if (manualAddress.trim()) {
      setSelectedLocation(manualAddress.trim());
      toast({
        title: "Location Set",
        description: `Location set to: ${manualAddress.trim()}`,
      });
    }
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      onClose();
      toast({
        title: "Location Confirmed",
        description: "Delivery location has been updated",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Delivery Location
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4">
          {/* Mapbox Token Input (for demo) */}
          {!mapboxToken && (
            <div className="bg-muted/50 p-4 rounded-lg border border-dashed">
              <h3 className="font-medium mb-2">Mapbox Integration</h3>
              <p className="text-sm text-muted-foreground mb-3">
                To use the interactive map, please enter your Mapbox access token:
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your Mapbox token..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (mapboxToken) {
                      toast({
                        title: "Token Set",
                        description: "Mapbox integration ready",
                      });
                    }
                  }}
                >
                  Connect
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Get your token from{' '}
                <a
                  href="https://mapbox.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
          )}

          {/* Location Options */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Auto Location */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Crosshair className="h-4 w-4 text-primary" />
                  <h3 className="font-medium text-sm">Auto Location</h3>
                </div>
                <Button
                  onClick={handleCurrentLocation}
                  variant="outline"
                  className="w-full justify-start h-12"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Use Current Location
                </Button>
              </div>

              {/* Manual Entry */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-medium text-sm">Manual Entry</h3>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter address manually..."
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleManualLocation()}
                  />
                  <Button onClick={handleManualLocation} variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Location Presets */}
            <div className="space-y-3">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <Map className="h-4 w-4 text-primary" />
                Quick Locations
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Home', 'Work', 'Hospital', 'Clinic'].map((preset) => (
                  <Badge
                    key={preset}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => {
                      setManualAddress(preset);
                      setSelectedLocation(preset);
                      toast({
                        title: "Location Set",
                        description: `Location set to: ${preset}`,
                      });
                    }}
                  >
                    {preset}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Selected Location Display */}
            {selectedLocation && (
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary">Selected Location:</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedLocation}</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    ✓ Selected
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Map Container */}
          <div className="flex-1 bg-muted rounded-lg overflow-hidden relative">
            <div ref={mapContainer} className="w-full h-full" />
            
            {/* Map Placeholder */}
            {!mapboxToken && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Interactive map will appear here</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect your Mapbox token to enable map features
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmLocation}
            disabled={!selectedLocation}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Confirm Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};