import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Overview } from './components/Dashboard/Overview';
import { TrafficMonitor } from './components/Dashboard/TrafficMonitor';
import { Emergency } from './components/Dashboard/Emergency';
import { TrafficSignals } from './components/Dashboard/TrafficSignals';
import { Analytics } from './components/Dashboard/Analytics';
import { VehicleBooking } from './components/Dashboard/VehicleBooking';
import { DigitalTwin } from './components/Dashboard/DigitalTwin';
import { UserProfile } from './components/Dashboard/UserProfile';
import { authService } from './services/authService';
import { User } from './types';
import { 
  mockTrafficData, 
  mockEmergencyAlerts, 
  mockTrafficSignals 
} from './utils/mockData';
import { Settings, Activity } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.login(email, password);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const user = await authService.signup(email, password, name);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setActiveSection('overview');
  };

  if (!user) {
    if (authMode === 'login') {
      return (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthMode('signup')}
          loading={loading}
        />
      );
    } else {
      return (
        <SignupForm
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthMode('login')}
          loading={loading}
        />
      );
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview data={mockTrafficData} />;
      case 'digital-twin':
        return <DigitalTwin />;
      case 'traffic-monitor':
        return <TrafficMonitor />;
      case 'emergency':
        return <Emergency alerts={mockEmergencyAlerts} />;
      case 'traffic-signals':
        return <TrafficSignals signals={mockTrafficSignals} />;
      case 'analytics':
        return <Analytics />;
      case 'vehicle-booking':
        return <VehicleBooking />;
      case 'profile':
        return <UserProfile user={user} />;
      case 'ai-control':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Settings className="w-8 h-8 mr-3 text-purple-400" />
              AI Control Center
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Activity className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-800">AI Performance Metrics</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Traffic Flow Optimization</span>
                    <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-medium text-white">
                      Optimal
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Signal Timing Efficiency</span>
                    <span className="text-blue-600 font-bold">92%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Congestion Reduction</span>
                    <span className="text-green-600 font-bold">15%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Emergency Response Time</span>
                    <span className="text-blue-600 font-bold">2.3 min</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Settings className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-800">Learning Models Status</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-800 font-medium">Traffic Pattern Recognition</span>
                      <span className="text-green-600 text-sm font-medium">Active</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">85% accuracy</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-800 font-medium">Emergency Route Optimization</span>
                      <span className="text-green-600 text-sm font-medium">Active</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">78% accuracy</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-800 font-medium">Predictive Analytics</span>
                      <span className="text-yellow-600 text-sm font-medium">Training</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">65% accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Overview data={mockTrafficData} />;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <div className="flex h-screen">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={user} onLogout={handleLogout} />
          
          <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;