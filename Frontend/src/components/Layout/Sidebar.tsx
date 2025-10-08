import React from 'react';
import { BarChart3, MapPin, AlertTriangle, Activity, Settings, Car, Users, Cuboid as Cube, User } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'traffic-monitor', label: 'Traffic Monitor', icon: MapPin },
  { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
  { id: 'traffic-signals', label: 'Traffic Signals', icon: Activity },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'digital-twin', label: 'Digital Twin', icon: Cube },
  { id: 'vehicle-booking', label: 'Vehicle Booking', icon: Car },
  { id: 'ai-control', label: 'AI Control', icon: Settings },
  { id: 'profile', label: 'User Profile', icon: User }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-80 bg-gray-900/90 backdrop-blur-sm h-full p-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">Neuro-Adaptive</h1>
          <p className="text-gray-300 text-sm">Traffic Dashboard</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};