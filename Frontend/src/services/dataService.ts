import axios from 'axios';
import { BookingRequest, EmergencyAlert, TrafficData, TrafficSignal, Vehicle } from '../types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const mapTrafficSignal = (signal: any): TrafficSignal => ({
  id: signal.id.toString(),
  intersection: signal.signalLocation || 'Unknown intersection',
  status: 'active',
  currentPhase: signal.status?.toLowerCase() || 'red',
  timing: {
    red: 60,
    yellow: 5,
    green: 45,
  },
  location: {
    lat: 28.6139,
    lng: 77.2090,
  },
});

const mapEmergency = (emergency: any): EmergencyAlert => ({
  id: emergency.id.toString(),
  type: emergency.severity === 'HIGH' ? 'fire' : emergency.severity === 'MEDIUM' ? 'ambulance' : 'police',
  description: emergency.description || 'Emergency reported',
  location: emergency.location || 'Unknown location',
  priority: emergency.severity?.toLowerCase() || 'medium',
  timestamp: emergency.timestamp || new Date().toISOString(),
  status: emergency.status === 'RESOLVED' ? 'resolved' : 'active',
});

const mapVehicle = (vehicle: any): Vehicle => ({
  id: vehicle.id.toString(),
  type: vehicle.model?.toLowerCase().includes('ambulance')
    ? 'ambulance'
    : vehicle.model?.toLowerCase().includes('fire')
    ? 'fire'
    : vehicle.model?.toLowerCase().includes('police')
    ? 'police'
    : 'private',
  location: {
    lat: 28.6139,
    lng: 77.2090,
  },
  status: vehicle.status?.toLowerCase().includes('avail') ? 'available' : 'busy',
  driver: `${vehicle.make || ''} ${vehicle.model || ''}`.trim() || 'Unknown Driver',
});

const mapBooking = (booking: any): BookingRequest => ({
  id: booking.id.toString(),
  userId: booking.user?.id?.toString() || 'guest',
  vehicleType: booking.vehicle?.make?.toLowerCase().includes('ambulance') ? 'emergency' : 'private',
  pickup: {
    lat: 28.6139,
    lng: 77.2090,
    address: booking.origin || 'Unknown pickup',
  },
  destination: {
    lat: 28.6129,
    lng: 77.2295,
    address: booking.destination || 'Unknown destination',
  },
  urgency: booking.status === 'IN_PROGRESS' ? 'high' : 'medium',
  status: booking.status?.toLowerCase() as BookingRequest['status'] || 'pending',
  assignedVehicle: booking.vehicle?.id?.toString(),
  estimatedArrival: booking.startTime ? new Date(booking.startTime).toLocaleTimeString() : 'TBD',
  createdAt: booking.startTime || new Date().toISOString(),
});

export const dataService = {
  getTrafficData: async (): Promise<TrafficData> => {
    const [vehiclesRes, signalsRes, emergenciesRes] = await Promise.all([
      apiClient.get('/vehicles'),
      apiClient.get('/traffic-signals'),
      apiClient.get('/emergencies'),
    ]);

    const vehicles = vehiclesRes.data.map(mapVehicle);
    const emergencies = emergenciesRes.data.map(mapEmergency);
    const signals = signalsRes.data.map(mapTrafficSignal);

    return {
      activeVehicles: vehicles.length,
      emergencyVehicles: emergencies.filter((item) => item.status === 'active').length,
      trafficSignals: signals.length,
      incidents: emergencies.length,
    };
  },

  getTrafficSignals: async (): Promise<TrafficSignal[]> => {
    const response = await apiClient.get('/traffic-signals');
    return response.data.map(mapTrafficSignal);
  },

  getEmergencyAlerts: async (): Promise<EmergencyAlert[]> => {
    const response = await apiClient.get('/emergencies');
    return response.data.map(mapEmergency);
  },

  getVehicles: async (): Promise<Vehicle[]> => {
    const response = await apiClient.get('/vehicles');
    return response.data.map(mapVehicle);
  },

  getBookings: async (): Promise<BookingRequest[]> => {
    const response = await apiClient.get('/bookings');
    return response.data.map(mapBooking);
  },
  createBooking: async (payload: { origin: string; destination: string; status?: string; startTime?: string }): Promise<BookingRequest> => {
    const body = {
      origin: payload.origin,
      destination: payload.destination,
      status: payload.status || 'PENDING',
      startTime: payload.startTime || new Date().toISOString().slice(0, 19),
    };
    const response = await apiClient.post('/bookings', body);
    return mapBooking(response.data);
  },
};
