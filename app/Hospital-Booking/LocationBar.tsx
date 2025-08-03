import { useState, useEffect } from "react";
import { MapPin, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LocationBarProps {
  onLocationChange?: (location: { lat: number; lng: number } | null) => void;
  isActive?: boolean;
}

export const LocationBar = ({ onLocationChange, isActive }: LocationBarProps) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    // Check permission status
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setHasPermission(result.state === 'granted');
      });
    }
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLocation);
        setLoading(false);
        setHasPermission(true);
        onLocationChange?.(newLocation);
      },
      (error) => {
        setLoading(false);
        setHasPermission(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information unavailable");
            break;
          case error.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("An unknown error occurred");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  const clearLocation = () => {
    setLocation(null);
    setError(null);
    onLocationChange?.(null);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 p-4 bg-card rounded-2xl border border-border shadow-card">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Getting location...</span>
              </div>
            ) : location ? (
              <div>
                <p className="text-sm font-medium text-foreground">Location enabled</p>
                <p className="text-xs text-muted-foreground truncate">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-foreground">Find nearby hospitals</p>
                <p className="text-xs text-muted-foreground">Tap to use your location</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {location && isActive && (
            <Badge variant="default" className="text-xs">
              Active
            </Badge>
          )}
          
          {location ? (
            <Button
              variant="outline"
              size="sm"
              onClick={clearLocation}
              className="h-8 px-3 text-xs"
            >
              Clear
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={getCurrentLocation}
              disabled={loading}
              className="h-8 px-3 text-xs"
            >
              {loading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                "Get Location"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};