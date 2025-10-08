import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Download, Play, Pause, Eye, EyeOff } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  showTraffic?: boolean;
  showHeatmap?: boolean;
  className?: string;
  title?: string;
  showControls?: boolean;
}

interface City {
  name: string;
  center: [number, number];
  zoom: number;
}

const cities: City[] = [
  { name: 'New Delhi', center: [28.6139, 77.2090], zoom: 12 },
  { name: 'Bangalore', center: [12.9716, 77.5946], zoom: 12 },
  { name: 'Chennai', center: [13.0827, 80.2707], zoom: 12 },
  { name: 'Mumbai', center: [19.0760, 72.8777], zoom: 12 }
];

const trafficSignals = [
  { id: 1, position: [28.6139, 77.2090], status: 'green', intersection: 'Connaught Place' },
  { id: 2, position: [28.6129, 77.2295], status: 'red', intersection: 'India Gate' },
  { id: 3, position: [28.6169, 77.2065], status: 'yellow', intersection: 'Parliament House' },
  { id: 4, position: [28.5355, 77.3910], status: 'green', intersection: 'Noida Sector 18' },
  { id: 5, position: [28.4595, 77.0266], status: 'red', intersection: 'Cyber City Gurgaon' }
];

const heatmapData = [
  [28.6139, 77.2090, 0.8], // Connaught Place - High traffic
  [28.6129, 77.2295, 0.6], // India Gate - Medium traffic
  [28.6169, 77.2065, 0.9], // Parliament House - Very high traffic
  [28.5355, 77.3910, 0.7], // Noida - High traffic
  [28.4595, 77.0266, 0.8], // Gurgaon - High traffic
  [28.6304, 77.2177, 0.5], // Karol Bagh - Medium traffic
  [28.6692, 77.2265, 0.4], // Civil Lines - Low-medium traffic
  [28.5706, 77.3272, 0.6], // Laxmi Nagar - Medium traffic
];

// Ambulance route points
const ambulanceRoute = [
  [28.6139, 77.2090], // Start at Connaught Place
  [28.6150, 77.2100],
  [28.6160, 77.2120],
  [28.6170, 77.2140],
  [28.6180, 77.2160],
  [28.6190, 77.2180],
  [28.6200, 77.2200],
  [28.6210, 77.2220],
  [28.6220, 77.2240],
  [28.6230, 77.2260],
  [28.6240, 77.2280],
  [28.6129, 77.2295], // End at India Gate
];

export const LeafletMap: React.FC<LeafletMapProps> = ({ 
  showTraffic = false, 
  showHeatmap = false, 
  className = '',
  title = 'Smart Traffic Dashboard',
  showControls = true
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const heatmapLayerRef = useRef<any>(null);
  const ambulanceMarkerRef = useRef<L.Marker | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [heatmapVisible, setHeatmapVisible] = useState(showHeatmap);
  const [ambulancePosition, setAmbulancePosition] = useState(0);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(selectedCity.center, selectedCity.zoom);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add traffic signals
    trafficSignals.forEach(signal => {
      const color = signal.status === 'green' ? '#10B981' : 
                   signal.status === 'red' ? '#EF4444' : '#F59E0B';
      
      const signalIcon = L.divIcon({
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        className: 'custom-signal-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker(signal.position as [number, number], { icon: signalIcon })
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center; padding: 8px;">
            <h4 style="margin: 0 0 8px 0; color: #1F2937;">${signal.intersection}</h4>
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
              <div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="color: #374151; font-weight: 600; text-transform: capitalize;">${signal.status} Light</span>
            </div>
            <p style="margin: 0; color: #6B7280; font-size: 12px;">Traffic Signal ID: ${signal.id}</p>
          </div>
        `);
    });

    // Add ambulance marker
    const ambulanceIcon = L.divIcon({
      html: `<div style="font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🚑</div>`,
      className: 'ambulance-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const ambulanceMarker = L.marker(ambulanceRoute[0] as [number, number], { icon: ambulanceIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; padding: 8px;">
          <h4 style="margin: 0 0 8px 0; color: #1F2937;">Emergency Vehicle</h4>
          <p style="margin: 0; color: #EF4444; font-weight: 600;">🚨 Priority Route Active</p>
          <p style="margin: 4px 0 0 0; color: #6B7280; font-size: 12px;">En route to India Gate</p>
        </div>
      `);
    
    ambulanceMarkerRef.current = ambulanceMarker;

    // Initialize heatmap
    if (window.L && (window.L as any).heatLayer) {
      const heatLayer = (window.L as any).heatLayer(heatmapData, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        gradient: {
          0.0: 'blue',
          0.2: 'cyan',
          0.4: 'lime',
          0.6: 'yellow',
          0.8: 'orange',
          1.0: 'red'
        }
      });
      heatmapLayerRef.current = heatLayer;
      
      if (heatmapVisible) {
        heatLayer.addTo(map);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedCity]);

  // Load leaflet.heat plugin
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/leaflet.heat@0.2.0/dist/leaflet-heat.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Handle heatmap toggle
  useEffect(() => {
    if (heatmapLayerRef.current && mapInstanceRef.current) {
      if (heatmapVisible) {
        heatmapLayerRef.current.addTo(mapInstanceRef.current);
      } else {
        mapInstanceRef.current.removeLayer(heatmapLayerRef.current);
      }
    }
  }, [heatmapVisible]);

  // Ambulance animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulating && ambulanceMarkerRef.current) {
      interval = setInterval(() => {
        setAmbulancePosition(prev => {
          const nextPos = (prev + 1) % ambulanceRoute.length;
          const newLatLng = ambulanceRoute[nextPos] as [number, number];
          ambulanceMarkerRef.current?.setLatLng(newLatLng);
          return nextPos;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating]);

  const handleDownloadCSV = () => {
    const csvData = trafficSignals.map(signal => 
      `${signal.intersection},${signal.status},${signal.position[0]},${signal.position[1]}`
    ).join('\n');
    const header = 'Intersection,Status,Latitude,Longitude\n';
    const blob = new Blob([header + csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'traffic_signals_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`${className} relative`}>
      {/* Control Panel */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg space-y-3 min-w-[250px]">
          {/* Simulation Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                isSimulating 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isSimulating ? 'Stop' : 'Start'}
            </button>
            <span className="text-sm text-gray-600">Simulation</span>
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City View</label>
            <select 
              value={selectedCity.name}
              onChange={(e) => {
                const city = cities.find(c => c.name === e.target.value);
                if (city) setSelectedCity(city);
              }}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {cities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* Heatmap Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Heatmap</span>
            <button
              onClick={() => setHeatmapVisible(!heatmapVisible)}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                heatmapVisible 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {heatmapVisible ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
              {heatmapVisible ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownloadCSV}
            className="w-full flex items-center justify-center px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CSV
          </button>
        </div>
      )}

      {/* Status Indicators */}
      <div className="absolute top-4 left-4 z-[1000] bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isSimulating ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>Simulation: {isSimulating ? 'Active' : 'Stopped'}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-blue-400" />
            <span>Signals: {trafficSignals.length} Active</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">🚑</span>
            <span>Emergency: {isSimulating ? 'En Route' : 'Standby'}</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px] rounded-lg overflow-hidden"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default LeafletMap;