import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Zap, AlertTriangle } from 'lucide-react';
import { loadGoogleMapsScript, isGoogleMapsAvailable } from '../../utils/googleMapsLoader';

interface GoogleMapProps {
  showTraffic?: boolean;
  showHeatmap?: boolean;
  className?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ 
  showTraffic = false, 
  showHeatmap = false, 
  className = '' 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      if (!mapRef.current) return;

      try {
        setIsLoading(true);
        setHasError(false);

        // Load Google Maps script
        await loadGoogleMapsScript();

        // Check if component is still mounted and Google Maps is available
        if (!isMounted || !isGoogleMapsAvailable()) {
          throw new Error('Google Maps not available');
        }

        // Wait a bit for Google Maps to fully initialize
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!isMounted || !mapRef.current) return;

        // Initialize map centered on New Delhi
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 28.6139, lng: 77.2090 },
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: true
        });

        if (!isMounted) return;

        setMap(mapInstance);

        // Add traffic layer if requested
        if (showTraffic) {
          const trafficLayer = new google.maps.TrafficLayer();
          trafficLayer.setMap(mapInstance);
        }

        // Add sample markers for key locations
        const locations = [
          { lat: 28.6139, lng: 77.2090, title: 'Connaught Place', info: 'Central Business District', type: 'business' },
          { lat: 28.6129, lng: 77.2295, title: 'India Gate', info: 'National Monument', type: 'monument' },
          { lat: 28.6169, lng: 77.2065, title: 'Parliament House', info: 'Government Building', type: 'government' },
          { lat: 28.5355, lng: 77.3910, title: 'Noida', info: 'IT Hub', type: 'business' },
          { lat: 28.4595, lng: 77.0266, title: 'Gurgaon', info: 'Financial Center', type: 'business' }
        ];

        locations.forEach(location => {
          const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: mapInstance,
            title: location.title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: location.type === 'business' ? '#4F46E5' : 
                        location.type === 'monument' ? '#DC2626' : '#059669',
              fillOpacity: 0.8,
              strokeColor: '#FFFFFF',
              strokeWeight: 2
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; color: #1F2937; font-size: 16px; font-weight: bold;">${location.title}</h3>
                <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 14px;">${location.info}</p>
                <div style="display: flex; align-items: center; color: #059669; font-size: 12px;">
                  <span style="width: 8px; height: 8px; background: #059669; border-radius: 50%; margin-right: 6px;"></span>
                  Traffic: Normal
                </div>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });
        });

        if (isMounted) {
          setIsLoading(false);
        }

      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
    };
  }, [showTraffic, showHeatmap]);

  if (isLoading) {
    return (
      <div className={`w-full h-full min-h-[400px] ${className} rounded-lg overflow-hidden relative bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Google Maps...</p>
          <p className="text-gray-500 text-sm mt-2">Connecting to traffic data...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`w-full h-full min-h-[400px] ${className} rounded-lg overflow-hidden relative bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center`}>
        <div className="text-center p-8">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Map Connection Error</h3>
          <p className="text-gray-600 mb-6">Unable to load Google Maps. Please check your connection.</p>
          
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2 text-green-500" />
              Traffic Status (Fallback)
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <div className="font-medium text-gray-800">Light Traffic</div>
                <div className="text-green-600">65% of routes</div>
              </div>
              
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <div className="font-medium text-gray-800">Moderate</div>
                <div className="text-yellow-600">25% of routes</div>
              </div>
              
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
                <div className="font-medium text-gray-800">Heavy Traffic</div>
                <div className="text-red-600">10% of routes</div>
              </div>
              
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
                <div className="font-medium text-gray-800">Active Signals</div>
                <div className="text-blue-600">89 intersections</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full min-h-[400px] ${className} rounded-lg overflow-hidden relative`}>
      <div ref={mapRef} className="w-full h-full" />
      {showTraffic && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700 font-medium">Traffic Layer Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;