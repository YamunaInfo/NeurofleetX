import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { EmergencyAlert } from '../../types';
import { LeafletMap } from '../Maps/LeafletMap';

interface EmergencyProps {
  alerts: EmergencyAlert[];
}

export const Emergency: React.FC<EmergencyProps> = ({ alerts }) => {
  const [showNewEmergencyForm, setShowNewEmergencyForm] = useState(false);
  const [newEmergency, setNewEmergency] = useState({
    type: 'ambulance',
    description: '',
    location: '',
    priority: 'medium'
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ambulance': return '🚑';
      case 'fire': return '🚒';
      case 'police': return '🚔';
      default: return '🚨';
    }
  };

  const handleSubmitEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New Emergency Vehicle Added:', newEmergency);
    alert(`Emergency ${newEmergency.type} has been dispatched to ${newEmergency.location}`);
    setShowNewEmergencyForm(false);
    setNewEmergency({
      type: 'ambulance',
      description: '',
      location: '',
      priority: 'medium'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <AlertTriangle className="w-8 h-8 mr-3 text-red-400" />
          Emergency Management
        </h2>
        
        <button 
          onClick={() => setShowNewEmergencyForm(true)}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium transition-colors"
        >
          New Emergency
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Active Alerts</h3>
          
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-gray-50 rounded-xl p-6 border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 capitalize">{alert.type}</h4>
                      <p className="text-gray-600">{alert.description}</p>
                    </div>
                  </div>
                  <span className={`${getPriorityColor(alert.priority)} px-3 py-1 rounded-full text-sm font-medium text-white`}>
                    {alert.priority}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-500 text-sm space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{alert.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Emergency Routes</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View larger map
            </button>
          </div>
          
          <div className="h-96 rounded-xl overflow-hidden mb-4">
            <LeafletMap showTraffic={true} showHeatmap={false} showControls={false} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h4 className="text-gray-800 font-medium mb-2">Connaught Place</h4>
              <p className="text-blue-300 text-sm">ETA: 8 minutes</p>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4">
              <h4 className="text-gray-800 font-medium mb-2">India Gate</h4>
              <p className="text-green-300 text-sm">Clear Route</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Emergency Form Modal */}
      {showNewEmergencyForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add Emergency Vehicle</h3>
              <button 
                onClick={() => setShowNewEmergencyForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitEmergency} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <select 
                  value={newEmergency.type}
                  onChange={(e) => setNewEmergency({...newEmergency, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="ambulance">🚑 Ambulance</option>
                  <option value="fire">🚒 Fire Truck</option>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={newEmergency.description}
                  onChange={(e) => setNewEmergency({...newEmergency, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Emergency description"
                  required
                />
              </div>
                  <option value="police">🚔 Police</option>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newEmergency.location}
                  onChange={(e) => setNewEmergency({...newEmergency, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Emergency location"
                  required
                />
              </div>
                </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select 
                  value={newEmergency.priority}
                  onChange={(e) => setNewEmergency({...newEmergency, priority: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewEmergencyForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
                >
                  Dispatch Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};