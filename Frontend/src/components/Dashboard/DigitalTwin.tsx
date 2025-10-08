import React, { useState } from 'react';
import { Cuboid as Cube, Play, Pause, RotateCcw, Settings, Zap, AlertTriangle, Car, BarChart3, Cloud, Sun, CloudRain, CloudSnow, Eye, Monitor, Cpu, Activity } from 'lucide-react';

export const DigitalTwin: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('normal');
  const [simulationSpeed, setSimulationSpeed] = useState('1x');
  const [weatherCondition, setWeatherCondition] = useState('clear');

  const scenarios = [
    { 
      id: 'normal', 
      name: 'Normal Traffic Flow', 
      description: 'Standard city traffic patterns with regular flow',
      color: 'bg-green-500'
    },
    { 
      id: 'rush-hour', 
      name: 'Rush Hour Peak', 
      description: 'High volume traffic simulation during peak hours',
      color: 'bg-orange-500'
    },
    { 
      id: 'emergency', 
      name: 'Emergency Response', 
      description: 'Emergency vehicle routing and traffic management',
      color: 'bg-red-500'
    },
    { 
      id: 'roadblock', 
      name: 'Road Closure', 
      description: 'Construction or accident scenario with detours',
      color: 'bg-yellow-500'
    },
    { 
      id: 'weather', 
      name: 'Weather Impact', 
      description: 'Rain/snow traffic effects and visibility issues',
      color: 'bg-blue-500'
    }
  ];

  const simulationMetrics = [
    { label: 'Traffic Flow Rate', value: '85%', color: 'text-green-400', trend: '+2.3%' },
    { label: 'Average Speed', value: '42 km/h', color: 'text-blue-400', trend: '-1.2%' },
    { label: 'Congestion Level', value: 'Moderate', color: 'text-yellow-400', trend: '+5.1%' },
    { label: 'Emergency Response Time', value: '4.2 min', color: 'text-purple-400', trend: '-0.8%' }
  ];

  const weatherOptions = [
    { id: 'clear', name: 'Clear', icon: Sun, color: 'text-yellow-500' },
    { id: 'light-rain', name: 'Light Rain', icon: CloudRain, color: 'text-blue-500' },
    { id: 'heavy-rain', name: 'Heavy Rain', icon: CloudRain, color: 'text-blue-700' },
    { id: 'snow', name: 'Snow', icon: CloudSnow, color: 'text-gray-400' },
    { id: 'fog', name: 'Fog', icon: Cloud, color: 'text-gray-500' }
  ];

  const predictions = [
    {
      id: 1,
      type: 'warning',
      message: 'Traffic buildup expected at Main St intersection in 15 minutes',
      confidence: '87%',
      time: '15 min'
    },
    {
      id: 2,
      type: 'critical',
      message: 'Potential congestion at Ring Road due to weather conditions',
      confidence: '92%',
      time: '8 min'
    },
    {
      id: 3,
      type: 'info',
      message: 'Optimal flow maintained on Highway 1 corridor',
      confidence: '95%',
      time: 'Now'
    },
    {
      id: 4,
      type: 'warning',
      message: 'Emergency vehicle routing may be affected by construction',
      confidence: '78%',
      time: '25 min'
    }
  ];

  const getPredictionColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getCurrentScenario = () => scenarios.find(s => s.id === selectedScenario);
  const getCurrentWeather = () => weatherOptions.find(w => w.id === weatherCondition);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <Cube className="w-8 h-8 mr-3 text-cyan-400" />
          Digital Twin Simulation Dashboard
        </h2>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isSimulating 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isSimulating ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isSimulating ? 'Pause' : 'Start'} Simulation
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center">
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Digital Twin Simulation - 3D City Model</h3>
              <div className="flex space-x-2">
                <button className="bg-blue-500 px-3 py-1 rounded-lg text-white text-sm flex items-center">
                  <Cube className="w-4 h-4 mr-1" />
                  3D Model
                </button>
                <button className="bg-purple-500 px-3 py-1 rounded-lg text-white text-sm flex items-center">
                  <Monitor className="w-4 h-4 mr-1" />
                  Simulation
                </button>
                <button className="bg-green-500 px-3 py-1 rounded-lg text-white text-sm flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  Analytics
                </button>
              </div>
            </div>
            
            <div className="h-[500px] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl relative overflow-hidden">
              {/* 3D Digital Twin Visualization */}
              <div className="w-full h-full flex items-center justify-center relative">
                {/* 3D City Grid Animation */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 gap-2 h-full p-8">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div
                        key={i}
                        className={`bg-gradient-to-t from-blue-400 to-cyan-300 rounded-sm ${
                          // Different building types with varied colors
                          i % 6 === 0 ? 'bg-gradient-to-t from-red-400 to-pink-300' :
                          i % 6 === 1 ? 'bg-gradient-to-t from-blue-400 to-cyan-300' :
                          i % 6 === 2 ? 'bg-gradient-to-t from-green-400 to-emerald-300' :
                          i % 6 === 3 ? 'bg-gradient-to-t from-yellow-400 to-amber-300' :
                          i % 6 === 4 ? 'bg-gradient-to-t from-purple-400 to-violet-300' :
                          'bg-gradient-to-t from-orange-400 to-orange-300'
                        } rounded-sm ${isSimulating ? 'animate-pulse' : ''
                        }`}
                        style={{
                          height: `${Math.random() * 60 + 20}%`,
                          animationDelay: `${i * 0.1}s`,
                          opacity: isSimulating ? Math.random() * 0.8 + 0.4 : 0.6
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Central 3D Model Display */}
                <div className="text-center z-10">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className={`w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center ${
                      isSimulating ? 'animate-spin' : 'animate-pulse'
                    }`} style={{ animationDuration: '8s' }}>
                      <Cube className="w-16 h-16 text-white" />
                    </div>
                    {isSimulating && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-2">
                    Virtual City Model
                  </h4>
                  <p className="text-cyan-200 mb-4">
                    {isSimulating ? 'Running Traffic Simulation' : 'Digital Twin Ready'}
                  </p>
                  
                  {/* 3D Model Stats */}
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-red-300 text-sm">🏢 Buildings</div>
                      <div className="text-white font-bold text-lg">2,847</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-blue-300 text-sm">🛣️ Road Network</div>
                      <div className="text-white font-bold text-lg">156 km</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-purple-300 text-sm">🚦 Intersections</div>
                      <div className="text-white font-bold text-lg">89</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-green-300 text-sm">📡 Sensors</div>
                      <div className="text-white font-bold text-lg">247</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Data Points */}
                {isSimulating && (
                  <>
                    <div className="absolute top-20 left-20 bg-red-500/90 backdrop-blur-sm rounded-lg p-2 text-white text-xs animate-bounce shadow-lg border border-red-400">
                      🚑 Emergency Route
                    </div>
                    <div className="absolute top-32 right-24 bg-yellow-500/90 backdrop-blur-sm rounded-lg p-2 text-white text-xs animate-bounce shadow-lg border border-yellow-400" style={{ animationDelay: '0.5s' }}>
                      🚦 Signal Optimization
                    </div>
                    <div className="absolute bottom-32 left-32 bg-blue-500/90 backdrop-blur-sm rounded-lg p-2 text-white text-xs animate-bounce shadow-lg border border-blue-400" style={{ animationDelay: '1s' }}>
                      📊 Traffic Analysis
                    </div>
                    <div className="absolute bottom-20 right-20 bg-green-500/90 backdrop-blur-sm rounded-lg p-2 text-white text-xs animate-bounce shadow-lg border border-green-400" style={{ animationDelay: '1.5s' }}>
                      🎯 Route Optimization
                    </div>
                  </>
                )}
              </div>
              
              {/* Simulation Status Overlay */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span className="text-sm font-medium">Digital Twin Engine</span>
                </div>
                {isSimulating && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <span className="text-green-400 text-sm">Processing: {simulationSpeed}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 mb-2">
                  <Monitor className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-sm">Virtual Entities: 1,247</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-sm">Simulated Events: 3</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                  <span className="text-sm">Model Accuracy: 94.2%</span>
                </div>
              </div>
              
              {/* Scenario and Weather Info */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white z-10">
                <div className="text-sm space-y-1">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${getCurrentScenario()?.color}`}></span>
                    <span>Scenario: <span className="text-cyan-400 font-medium">{getCurrentScenario()?.name}</span></span>
                  </div>
                  <div className="flex items-center">
                    {(() => {
                      const currentWeather = getCurrentWeather();
                      const WeatherIcon = currentWeather?.icon;
                      return currentWeather && WeatherIcon && <WeatherIcon className={`w-4 h-4 mr-2 ${currentWeather.color}`} />;
                    })()}
                    <span>Weather: <span className="text-blue-400 font-medium">{getCurrentWeather()?.name}</span></span>
                  </div>
                  <div>Time: <span className="text-green-400 font-medium">14:32:15</span></div>
                  <div>Speed: <span className="text-yellow-400 font-medium">{simulationSpeed}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Scenario Control */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Scenario Control</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Active Scenario</label>
                <select 
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                >
                  {scenarios.map(scenario => (
                    <option key={scenario.id} value={scenario.id}>
                      {scenario.name}
                    </option>
                  ))}
                </select>
                <p className="text-gray-500 text-xs mt-1">
                  {getCurrentScenario()?.description}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Simulation Speed</label>
                <div className="grid grid-cols-4 gap-2">
                  {['0.5x', '1x', '2x', '4x'].map(speed => (
                    <button
                      key={speed}
                      onClick={() => setSimulationSpeed(speed)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        simulationSpeed === speed
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weather Conditions</label>
                <select 
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                >
                  {weatherOptions.map(weather => (
                    <option key={weather.id} value={weather.id}>
                      {weather.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Live Metrics */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Live Metrics</h3>
            </div>
            
            <div className="space-y-4">
              {simulationMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-600 text-sm">{metric.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold ${metric.color}`}>{metric.value}</span>
                      <span className={`text-xs ${metric.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive Analytics */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Predictive Analytics</h3>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {predictions.map((prediction) => (
                <div key={prediction.id} className={`border rounded-lg p-3 ${getPredictionColor(prediction.type)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium">{prediction.message}</p>
                    <span className="text-xs bg-white/50 px-2 py-1 rounded-full">
                      {prediction.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs opacity-75">Confidence: {prediction.confidence}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      prediction.type === 'critical' ? 'bg-red-200' :
                      prediction.type === 'warning' ? 'bg-yellow-200' : 'bg-green-200'
                    }`}>
                      {prediction.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};