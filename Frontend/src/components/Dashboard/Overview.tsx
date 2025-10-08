import React from 'react';
import { Car, AlertTriangle, Activity, MapPin } from 'lucide-react';
import { TrafficData } from '../../types';
import { LeafletMap } from '../Maps/LeafletMap';

interface OverviewProps {
  data: TrafficData;
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  const stats = [
    {
      title: 'Emergency',
      value: data.emergencyVehicles,
      subtitle: 'Active vehicles',
      color: 'bg-red-500',
      icon: AlertTriangle
    },
    {
      title: 'Active Vehicles',
      value: data.activeVehicles,
      subtitle: 'In network',
      color: 'bg-blue-500',
      icon: Car
    },
    {
      title: 'Traffic Signals',
      value: data.trafficSignals,
      subtitle: 'Active signals',
      color: 'bg-green-500',
      icon: Activity
    },
    {
      title: 'Incidents',
      value: data.incidents,
      subtitle: 'Active incidents',
      color: 'bg-orange-500',
      icon: AlertTriangle
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">City Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.color} rounded-2xl p-6 text-white`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{stat.title}</h3>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-sm opacity-90">{stat.subtitle}</p>
                </div>
                <Icon className="w-8 h-8 opacity-80" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Live Traffic Map
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View larger map
              </button>
            </div>
            <div className="h-96 rounded-xl overflow-hidden">
              <LeafletMap showTraffic={true} showHeatmap={false} showControls={false} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Activity className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">AI Efficiency</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Traffic Flow</span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-medium text-white">
                  Optimal
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Signal Timing</span>
                <span className="text-gray-800 font-bold">92%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Optimization Level</span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-medium text-white">
                  High
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};