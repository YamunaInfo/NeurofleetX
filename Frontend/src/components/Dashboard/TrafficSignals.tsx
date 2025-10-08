import React, { useState } from 'react';
import { Activity, Settings, Clock } from 'lucide-react';
import { TrafficSignal } from '../../types';

interface TrafficSignalsProps {
  signals: TrafficSignal[];
}

export const TrafficSignals: React.FC<TrafficSignalsProps> = ({ signals }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<TrafficSignal | null>(null);
  const [configTiming, setConfigTiming] = useState({ red: 60, yellow: 5, green: 45 });

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const handleOptimizeAll = () => {
    setIsOptimizing(true);
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      alert('All traffic signals have been optimized for current traffic conditions!');
    }, 3000);
  };

  const handleConfigure = (signal: TrafficSignal) => {
    setSelectedSignal(signal);
    setConfigTiming(signal.timing);
    setShowConfigModal(true);
  };

  const handleSaveConfig = () => {
    if (selectedSignal) {
      // Here you would typically update the signal configuration
      console.log(`Updated timing for ${selectedSignal.intersection}:`, configTiming);
      alert(`Traffic signal timing updated for ${selectedSignal.intersection}`);
      setShowConfigModal(false);
      setSelectedSignal(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <Activity className="w-8 h-8 mr-3 text-green-400" />
          Traffic Signals Control
        </h2>
        
        <button 
          onClick={handleOptimizeAll}
          disabled={isOptimizing}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center"
        >
          {isOptimizing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Optimizing...
            </>
          ) : (
            'Optimize All'
          )}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {signals.map((signal) => (
            <div key={signal.id} className="bg-gray-50 rounded-2xl p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{signal.intersection}</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    signal.status === 'active' ? 'bg-green-500' :
                    signal.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className={`w-3 h-3 rounded-full ${
                    signal.currentPhase === 'green' ? 'bg-green-500' :
                    signal.currentPhase === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Status:</span>
                    <span className={`capitalize font-medium ${getStatusColor(signal.status)}`}>
                      {signal.status}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Current Phase:</span>
                    <span className="text-gray-800 font-bold capitalize">{signal.currentPhase}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center mb-3">
                    <Clock className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-600 text-sm">Timing Configuration</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="text-red-400 font-medium">Red</div>
                      <div className="text-gray-800">{signal.timing.red}s</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-400 font-medium">Yellow</div>
                      <div className="text-gray-800">{signal.timing.yellow}s</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-medium">Green</div>
                      <div className="text-gray-800">{signal.timing.green}s</div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleConfigure(signal)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && selectedSignal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Configure Signal</h3>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800">{selectedSignal.intersection}</h4>
              <p className="text-gray-600 text-sm">Adjust timing for optimal traffic flow</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Red Light (seconds)</label>
                <input
                  type="number"
                  value={configTiming.red}
                  onChange={(e) => setConfigTiming({...configTiming, red: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  min="10"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yellow Light (seconds)</label>
                <input
                  type="number"
                  value={configTiming.yellow}
                  onChange={(e) => setConfigTiming({...configTiming, yellow: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  min="3"
                  max="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Green Light (seconds)</label>
                <input
                  type="number"
                  value={configTiming.green}
                  onChange={(e) => setConfigTiming({...configTiming, green: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  min="15"
                  max="90"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-6">
              <button
                onClick={() => setShowConfigModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConfig}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};