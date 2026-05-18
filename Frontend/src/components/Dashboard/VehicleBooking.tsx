import React, { useState, useEffect } from 'react';
import { Car, MapPin, Clock, User, Plus, Navigation, IndianRupee, X } from 'lucide-react';
import { BookingRequest, Vehicle } from '../../types';
import { dataService } from '../../services/dataService';
import { mockBookings, mockVehicles } from '../../utils/mockData';

interface VehicleBookingProps {
  bookings?: BookingRequest[];
  vehicles?: Vehicle[];
}

interface NewBookingFormProps {
  onClose: () => void;
  onBookingCreated: (newBooking: BookingRequest) => void;
}

const NewBookingForm: React.FC<NewBookingFormProps> = ({ onClose, onBookingCreated }) => {
  const [formData, setFormData] = useState({
    vehicleType: 'emergency',
    pickupAddress: '',
    destinationAddress: '',
    urgency: 'medium'
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const pickupTrim = formData.pickupAddress.trim();
    const destTrim = formData.destinationAddress.trim();
    if (!pickupTrim || !destTrim) {
      setError('Please enter both pickup and destination addresses.');
      return;
    }
    setSubmitting(true);
    const basePrice = formData.vehicleType === 'emergency' ? 150 : 50;
    const urgencyMultiplier = {
      low: 1,
      medium: 1.2,
      high: 1.5,
      critical: 2
    }[formData.urgency as 'low' | 'medium' | 'high' | 'critical'];
    const totalAmount = Math.round(basePrice * urgencyMultiplier);
    try {
      // format startTime as LocalDateTime-like string (YYYY-MM-DDTHH:mm:ss)
      const dt = new Date();
      const startTime = dt.toISOString().slice(0, 19);
      const created = await dataService.createBooking({
        origin: pickupTrim,
        destination: destTrim,
        status: 'PENDING',
        startTime,
      });
      const formattedCreated: BookingRequest = {
        ...created,
        vehicleType: formData.vehicleType as 'emergency' | 'private',
        urgency: formData.urgency as 'low' | 'medium' | 'high' | 'critical',
      };
      onBookingCreated(formattedCreated);
      onClose();
      setFormData({ vehicleType: 'emergency', pickupAddress: '', destinationAddress: '', urgency: 'medium' });
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAmount = () => {
    const basePrice = formData.vehicleType === 'emergency' ? 150 : 50;
    const urgencyMultiplier = {
      low: 1,
      medium: 1.2,
      high: 1.5,
      critical: 2
    }[formData.urgency as 'low' | 'medium' | 'high' | 'critical'];
    return Math.round(basePrice * urgencyMultiplier);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">New Booking Request</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-400 bg-red-900/20 p-2 rounded">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Type</label>
            <select 
              value={formData.vehicleType}
              onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
            >
              <option value="emergency">Emergency</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
            <input
              type="text"
              value={formData.pickupAddress}
              onChange={(e) => setFormData({...formData, pickupAddress: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
              placeholder="Enter pickup address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
            <input
              type="text"
              value={formData.destinationAddress}
              onChange={(e) => setFormData({...formData, destinationAddress: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
              placeholder="Enter destination address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Urgency Level</label>
            <select 
              value={formData.urgency}
              onChange={(e) => setFormData({...formData, urgency: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <IndianRupee className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-gray-300">Estimated Amount</span>
              </div>
              <span className="text-green-400 font-bold text-lg">₹{calculateAmount()}</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Base: ₹{formData.vehicleType === 'emergency' ? '150' : '50'} + {formData.urgency} priority
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 ${submitting ? 'bg-blue-400 cursor-wait' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-lg transition-colors`}
            >
              {submitting ? 'Booking...' : 'Book Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const VehicleBooking: React.FC<VehicleBookingProps> = ({ bookings: propBookings, vehicles: propVehicles }) => {
  const [bookings, setBookings] = useState<BookingRequest[]>(propBookings && propBookings.length ? propBookings : mockBookings);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>(propVehicles && propVehicles.length ? propVehicles : mockVehicles);

  useEffect(() => {
    if (propBookings && propBookings.length) {
      setBookings(propBookings);
    }
  }, [propBookings]);

  useEffect(() => {
    if (propVehicles && propVehicles.length) {
      setVehicles(propVehicles);
    }
  }, [propVehicles]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'text-blue-400';
      case 'in-progress': return 'text-yellow-400';
      case 'completed': return 'text-green-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <Car className="w-8 h-8 mr-3 text-blue-400" />
          Vehicle Booking & Smart Routes
        </h2>
        
        <button 
          onClick={() => setShowNewBooking(true)}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Active Bookings</h3>
            
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-gray-50 rounded-xl p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Car className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">
                          {booking.vehicleType === 'emergency' ? 'Emergency' : 'Private'} Booking
                        </h4>
                        <p className="text-gray-600">ID: {booking.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`${getUrgencyColor(booking.urgency)} px-3 py-1 rounded-full text-sm font-medium text-white`}>
                        {booking.urgency}
                      </span>
                      <span className={`capitalize font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-green-400" />
                      <div>
                        <p className="text-sm text-gray-500">Pickup</p>
                        <p className="text-gray-800">{booking.pickup.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Navigation className="w-4 h-4 mr-2 text-red-400" />
                      <div>
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="text-gray-800">{booking.destination.address}</p>
                      </div>
                    </div>
                  </div>

                  {booking.amount && (
                    <div className="flex items-center justify-between mb-4 bg-green-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <IndianRupee className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-gray-700 font-medium">Total Amount</span>
                      </div>
                      <span className="text-green-600 font-bold text-lg">₹{booking.amount}</span>
                    </div>
                  )}

                  {booking.assignedVehicle && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-gray-800 font-medium">Vehicle Assigned</p>
                            <p className="text-gray-600 text-sm">Vehicle ID: {booking.assignedVehicle}</p>
                          </div>
                        </div>
                        {booking.estimatedArrival && (
                          <div className="flex items-center text-green-400">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="font-medium">ETA: {booking.estimatedArrival}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Car className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Available Vehicles</h3>
            </div>
            
            <div className="space-y-3">
              {vehicles.filter(v => v.status === 'available').map((vehicle) => (
                <div key={vehicle.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-800 font-medium capitalize">{vehicle.type}</span>
                    <span className="bg-green-500 px-2 py-1 rounded-full text-xs text-white">
                      Available
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{vehicle.driver}</p>
                  <p className="text-gray-500 text-xs">2.3 km away</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Navigation className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Route Optimization</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Optimal Route</span>
                  <span className="text-green-400 text-sm">12 min</span>
                </div>
                <p className="text-gray-800 font-medium">Via Ring Road</p>
                <p className="text-gray-500 text-sm">Light traffic, fastest route</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Alternative</span>
                  <span className="text-yellow-400 text-sm">18 min</span>
                </div>
                <p className="text-gray-800 font-medium">Via Main Street</p>
                <p className="text-gray-500 text-sm">Moderate traffic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewBooking && (
        <NewBookingForm 
          onClose={() => setShowNewBooking(false)} 
          onBookingCreated={(newBooking) => setBookings(prev => [...prev.filter(b => b.id !== newBooking.id), newBooking])} 
        />
      )}
    </div>
  );
};