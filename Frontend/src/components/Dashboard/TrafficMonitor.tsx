import React, { useState } from 'react';
import { LeafletMap } from '../Maps/LeafletMap';
import { MapPin, Navigation, Zap } from 'lucide-react';

export const TrafficMonitor: React.FC = () => {
  const [viewMode, setViewMode] = useState<'live' | 'historical'>('live');
  const [showTraffic, setShowTraffic] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showIncidents, setShowIncidents] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <MapPin className="w-8 h-8 mr-3 text-blue-400" />
          Traffic Monitor
        </h2>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => setViewMode('live')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'live' 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            Live View
          </button>
          <button 
            onClick={() => setViewMode('historical')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'historical' 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            Historical
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Real-Time Traffic Map</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowTraffic(!showTraffic)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    showTraffic ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  Traffic
                </button>
                <button 
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    showHeatmap ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  Heatmap
                </button>
                <button 
                  onClick={() => setShowIncidents(!showIncidents)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    showIncidents ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  Incidents
                </button>
              </div>
            </div>
            <div className="h-[500px] rounded-xl overflow-hidden">
              <LeafletMap showTraffic={showTraffic} showHeatmap={showHeatmap} showControls={false} />
            </div>
            
            {viewMode === 'historical' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Historical Data View</h4>
                <p className="text-gray-600 text-sm">Showing traffic patterns from the past 24 hours</p>
                <div className="mt-2 flex space-x-4 text-sm">
                  <span className="text-blue-600">Peak Hours: 8-10 AM, 6-8 PM</span>
                  <span className="text-green-600">Low Traffic: 11 PM - 6 AM</span>
                </div>
              </div>
            )}
            
            {showIncidents && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Active Incidents</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-red-600">🚧 Road Construction - Ring Road</span>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-600">⚠️ Minor Accident - Main Street</span>
                    <span className="text-sm text-gray-500">45 minutes ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Navigation className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Route Optimization</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Route A → B</span>
                  <span className="text-green-400 text-sm">Optimal</span>
                </div>
                <p className="text-gray-800 font-medium">15 min</p>
                <p className="text-gray-500 text-sm">Light traffic</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Route C → D</span>
                  <span className="text-yellow-400 text-sm">Moderate</span>
                </div>
                <p className="text-gray-800 font-medium">22 min</p>
                <p className="text-gray-500 text-sm">Heavy traffic</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">System Status</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Network Health</span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm text-white">98.5%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Response Time</span>
                <span className="text-blue-600 font-medium">{"< 100ms"}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Sensors</span>
                <span className="text-gray-800 font-medium">247/250</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};