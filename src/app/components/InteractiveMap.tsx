import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Vite
// Define custom icon to avoid path issues
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  territoryName: string;
  territoryBoundary?: [number, number][];
  height?: string;
}

export function InteractiveMap({
  center = [46.2044, 6.1432], // Geneva coordinates
  zoom = 13,
  territoryName,
  territoryBoundary,
  height = '400px'
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add territory boundary if provided
    if (territoryBoundary && territoryBoundary.length > 0) {
      const polygon = L.polygon(territoryBoundary, {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.2,
        weight: 3,
      }).addTo(map);

      // Fit map to polygon bounds
      map.fitBounds(polygon.getBounds(), { padding: [50, 50] });

      // Add popup to polygon
      polygon.bindPopup(`<b>${territoryName}</b><br>Périmètre géographique officiel`);
    } else {
      // Add default boundary for Geneva (approximate)
      const genevaBoundary: [number, number][] = [
        [46.2357, 6.1003],
        [46.2357, 6.1860],
        [46.1731, 6.1860],
        [46.1731, 6.1003],
      ];

      const polygon = L.polygon(genevaBoundary, {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.2,
        weight: 3,
      }).addTo(map);

      map.fitBounds(polygon.getBounds(), { padding: [50, 50] });
      polygon.bindPopup(`<b>${territoryName}</b><br>Périmètre géographique officiel`);
    }

    // Add center marker
    L.marker(center)
      .addTo(map)
      .bindPopup(`<b>${territoryName}</b><br>Centre du territoire`)
      .openPopup();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, territoryName, territoryBoundary]);

  return (
    <div
      ref={mapRef}
      style={{ height, width: '100%' }}
      className="rounded-lg border-2 border-blue-200 shadow-sm z-0"
    />
  );
}