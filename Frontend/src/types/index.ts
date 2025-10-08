export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'operator' | 'citizen';
}

export interface TrafficData {
  activeVehicles: number;
  emergencyVehicles: number;
  trafficSignals: number;
  incidents: number;
}

export interface EmergencyAlert {
  id: string;
  type: 'ambulance' | 'fire' | 'police';
  description: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  status: 'active' | 'resolved';
}

export interface TrafficSignal {
  id: string;
  intersection: string;
  status: 'active' | 'maintenance' | 'offline';
  currentPhase: 'red' | 'yellow' | 'green';
  timing: {
    red: number;
    yellow: number;
    green: number;
  };
  location: {
    lat: number;
    lng: number;
  };
}

export interface Vehicle {
  id: string;
  type: 'ambulance' | 'fire' | 'police' | 'private';
  location: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'busy' | 'maintenance';
  driver: string;
}

export interface BookingRequest {
  id: string;
  userId: string;
  vehicleType: 'emergency' | 'private';
  pickup: {
    lat: number;
    lng: number;
    address: string;
  };
  destination: {
    lat: number;
    lng: number;
    address: string;
  };
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  assignedVehicle?: string;
  estimatedArrival?: string;
  createdAt: string;
  amount?: number;
}

export interface RouteRecommendation {
  id: string;
  distance: string;
  duration: string;
  traffic: 'light' | 'moderate' | 'heavy';
  path: google.maps.LatLng[];
  alerts: string[];
}