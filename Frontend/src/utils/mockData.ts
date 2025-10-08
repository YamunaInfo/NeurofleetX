import { TrafficData, EmergencyAlert, TrafficSignal, Vehicle, BookingRequest } from '../types';

export const mockTrafficData: TrafficData = {
  activeVehicles: 247,
  emergencyVehicles: 2,
  trafficSignals: 2,
  incidents: 3
};

export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: '1',
    type: 'ambulance',
    description: 'Emergency vehicle en route to hospital',
    location: 'Hospital District',
    priority: 'high',
    timestamp: '2025-01-15T10:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    type: 'fire',
    description: 'Fire truck responding to emergency call',
    location: 'Downtown Fire Station',
    priority: 'medium',
    timestamp: '2025-01-15T10:25:00Z',
    status: 'active'
  }
];

export const mockTrafficSignals: TrafficSignal[] = [
  {
    id: '1',
    intersection: 'Main St & 1st Ave',
    status: 'active',
    currentPhase: 'green',
    timing: { red: 60, yellow: 5, green: 45 },
    location: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: '2',
    intersection: 'Broadway & 42nd St',
    status: 'active',
    currentPhase: 'red',
    timing: { red: 45, yellow: 5, green: 50 },
    location: { lat: 28.6129, lng: 77.2295 }
  },
  {
    id: '3',
    intersection: 'Park Ave & 59th St',
    status: 'maintenance',
    currentPhase: 'yellow',
    timing: { red: 50, yellow: 5, green: 40 },
    location: { lat: 28.6169, lng: 77.2065 }
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    type: 'ambulance',
    location: { lat: 28.6139, lng: 77.2090 },
    status: 'available',
    driver: 'Dr. Smith'
  },
  {
    id: '2',
    type: 'fire',
    location: { lat: 28.6129, lng: 77.2295 },
    status: 'busy',
    driver: 'Fire Chief Johnson'
  },
  {
    id: '3',
    type: 'police',
    location: { lat: 28.6169, lng: 77.2065 },
    status: 'available',
    driver: 'Officer Brown'
  }
];

export const mockBookings: BookingRequest[] = [
  {
    id: '1',
    userId: 'user1',
    vehicleType: 'emergency',
    pickup: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Connaught Place, New Delhi'
    },
    destination: {
      lat: 28.6129,
      lng: 77.2295,
      address: 'India Gate, New Delhi'
    },
    urgency: 'high',
    status: 'assigned',
    assignedVehicle: '1',
    estimatedArrival: '10 minutes',
    createdAt: '2025-01-15T10:30:00Z'
  }
];

export const trafficAnalyticsData = {
  hourlyVolume: [
    { time: '6AM', cars: 250, trucks: 180, motorcycles: 120 },
    { time: '9AM', cars: 480, trucks: 350, motorcycles: 240 },
    { time: '12PM', cars: 380, trucks: 290, motorcycles: 200 },
    { time: '3PM', cars: 420, trucks: 320, motorcycles: 220 },
    { time: '6PM', cars: 520, trucks: 390, motorcycles: 280 },
    { time: '9PM', cars: 280, trucks: 220, motorcycles: 140 }
  ],
  speedVsVolume: [
    { time: '00:00', speed: 65, volume: 120 },
    { time: '04:00', speed: 70, volume: 80 },
    { time: '08:00', speed: 35, volume: 450 },
    { time: '12:00', speed: 40, volume: 380 },
    { time: '16:00', speed: 32, volume: 520 },
    { time: '20:00', speed: 45, volume: 280 }
  ]
};