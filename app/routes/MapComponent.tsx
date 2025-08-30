'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// WARNING: This exposes your API key in client-side code
const LOCATIONIQ_API_KEY = 'pk.your_api_key_here'; // Replace with your actual key

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapComponent() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);
      
      L.tileLayer(
        `https://{s}.tile.locationiq.com/v3/streets/{z}/{x}/{y}.png?key=${LOCATIONIQ_API_KEY}`,
        {
          attribution: '© <a href="https://www.locationiq.com/attribution">LocationIQ</a>',
          maxZoom: 18
        }
      ).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map when coordinates change
  useEffect(() => {
    if (coordinates && mapRef.current) {
      mapRef.current.setView([coordinates.lat, coordinates.lon], 15);
      
      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = L.marker([coordinates.lat, coordinates.lon], { icon: DefaultIcon })
        .addTo(mapRef.current)
        .bindPopup(address || `Location: ${coordinates.lat}, ${coordinates.lon}`);
    }
  }, [coordinates, address]);

  const handleGeocode = async () => {
    if (!address) {
      setError('Please enter an address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(address)}&format=json`
      );

      if (response.data && response.data.length > 0) {
        const firstResult = response.data[0];
        setCoordinates({
          lat: parseFloat(firstResult.lat),
          lon: parseFloat(firstResult.lon)
        });
      } else {
        setError('No results found for this address');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Failed to geocode address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="map-container" style={{ width: '100%', height: '500px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address (e.g., 1600 Amphitheatre Parkway)"
          style={{ flex: 1, padding: '8px' }}
        />
        <button 
          onClick={handleGeocode} 
          disabled={loading}
          style={{ padding: '8px 16px', background: '#0078a8', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {loading ? 'Searching...' : 'Find on Map'}
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {coordinates && (
        <div style={{ marginBottom: '10px' }}>
          <p>Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lon.toFixed(6)}</p>
        </div>
      )}

      <div 
        ref={mapContainerRef} 
        style={{ width: '100%', height: '400px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    </div>
  );
}