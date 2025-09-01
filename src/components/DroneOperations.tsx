import React, { useState } from 'react';
import { 
  Plane, 
  Battery, 
  Navigation, 
  Wind,
  Thermometer,
  Eye,
  Radio,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Zap,
  Brain,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const DroneOperations: React.FC = () => {
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);
  const [operationMode, setOperationMode] = useState('autonomous');

  const drones = [
    {
      id: 'DRN-001',
      name: 'Sky Courier Alpha',
      status: 'active',
      mission: 'Medical Delivery',
      battery: 87,
      altitude: '120m',
      speed: '45 km/h',
      location: { lat: 40.7128, lng: -74.0060, address: 'Downtown Medical Center' },
      weather: { temp: 22, wind: 8, visibility: 'Good' },
      cargo: { type: 'Medical Supplies', weight: '2.3kg', value: '$1,200' },
      eta: '14:25',
      flightTime: '00:18:42',
      range: '8.2km',
      aiPilot: true,
      sensors: {
        camera: 'Active',
        lidar: 'Active',
        gps: 'Strong Signal',
        collision: 'Clear'
      }
    },
    {
      id: 'DRN-007',
      name: 'Swift Delivery Beta',
      status: 'charging',
      mission: 'Standby',
      battery: 23,
      altitude: '0m',
      speed: '0 km/h',
      location: { lat: 40.7589, lng: -73.9851, address: 'Charging Station B' },
      weather: { temp: 22, wind: 8, visibility: 'Good' },
      cargo: { type: 'None', weight: '0kg', value: '$0' },
      eta: 'Charging',
      flightTime: '00:00:00',
      range: '12.5km',
      aiPilot: true,
      sensors: {
        camera: 'Standby',
        lidar: 'Standby',
        gps: 'Strong Signal',
        collision: 'Clear'
      }
    },
    {
      id: 'DRN-012',
      name: 'Cargo Hawk Gamma',
      status: 'maintenance',
      mission: 'Service Required',
      battery: 100,
      altitude: '0m',
      speed: '0 km/h',
      location: { lat: 40.6892, lng: -74.0445, address: 'Service Bay 3' },
      weather: { temp: 22, wind: 8, visibility: 'Good' },
      cargo: { type: 'None', weight: '0kg', value: '$0' },
      eta: 'Tomorrow 09:00',
      flightTime: '00:00:00',
      range: '15.8km',
      aiPilot: false,
      sensors: {
        camera: 'Offline',
        lidar: 'Calibrating',
        gps: 'Strong Signal',
        collision: 'Testing'
      }
    },
    {
      id: 'DRN-015',
      name: 'Emergency Response Delta',
      status: 'returning',
      mission: 'Emergency Delivery Complete',
      battery: 34,
      altitude: '95m',
      speed: '52 km/h',
      location: { lat: 40.7505, lng: -73.9934, address: 'En route to Base' },
      weather: { temp: 22, wind: 8, visibility: 'Good' },
      cargo: { type: 'Empty', weight: '0kg', value: '$0' },
      eta: '15:10',
      flightTime: '01:23:15',
      range: '3.1km',
      aiPilot: true,
      sensors: {
        camera: 'Active',
        lidar: 'Active',
        gps: 'Strong Signal',
        collision: 'Clear'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'charging':
        return 'text-orange-400 bg-orange-400/10';
      case 'maintenance':
        return 'text-red-400 bg-red-400/10';
      case 'returning':
        return 'text-blue-400 bg-blue-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-400';
    if (battery > 30) return 'text-orange-400';
    return 'text-red-400';
  };

  const getSensorStatus = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-400';
      case 'Strong Signal':
        return 'text-green-400';
      case 'Clear':
        return 'text-green-400';
      case 'Standby':
        return 'text-orange-400';
      case 'Calibrating':
        return 'text-orange-400';
      case 'Testing':
        return 'text-orange-400';
      case 'Offline':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Drone Operations</h1>
          <p className="text-gray-400">Advanced autonomous drone fleet management with TiDB Serverless AI</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-purple-900/30 px-4 py-2 rounded-lg">
            <Brain className="text-purple-400" size={20} />
            <span className="text-purple-400 font-medium">TiDB AI Autopilot</span>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plane size={20} />
            <span>Deploy Drone</span>
          </button>
        </div>
      </div>

      {/* Control Center */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Mission Control Center</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Operation Mode</h4>
            <select 
              value={operationMode}
              onChange={(e) => setOperationMode(e.target.value)}
              className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="autonomous">Autonomous</option>
              <option value="assisted">AI Assisted</option>
              <option value="manual">Manual Control</option>
              <option value="emergency">Emergency Mode</option>
            </select>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Weather Status</h4>
            <div className="flex items-center space-x-2">
              <Thermometer size={16} className="text-blue-400" />
              <span className="text-white">22°C</span>
              <Wind size={16} className="text-green-400" />
              <span className="text-white">8 km/h</span>
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Airspace Status</h4>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-green-400">Clear</span>
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Emergency Protocol</h4>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors">
              Emergency Land All
            </button>
          </div>
        </div>

        {/* Fleet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Plane className="text-green-400" size={20} />
              <span className="text-green-400 text-sm font-medium">+2</span>
            </div>
            <h4 className="text-2xl font-bold text-white">12</h4>
            <p className="text-gray-400 text-sm">Active Drones</p>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Navigation className="text-blue-400" size={20} />
              <span className="text-blue-400 text-sm font-medium">+5</span>
            </div>
            <h4 className="text-2xl font-bold text-white">47</h4>
            <p className="text-gray-400 text-sm">Missions Today</p>
          </div>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Brain className="text-purple-400" size={20} />
              <span className="text-purple-400 text-sm font-medium">98%</span>
            </div>
            <h4 className="text-2xl font-bold text-white">AI</h4>
            <p className="text-gray-400 text-sm">Autopilot Success</p>
          </div>
          
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Battery className="text-orange-400" size={20} />
              <span className="text-orange-400 text-sm font-medium">85%</span>
            </div>
            <h4 className="text-2xl font-bold text-white">Avg</h4>
            <p className="text-gray-400 text-sm">Battery Level</p>
          </div>
        </div>
      </div>

      {/* Drone Fleet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Active Fleet</h3>
          
          {drones.map((drone) => (
            <div
              key={drone.id}
              className={`bg-gray-800 rounded-xl border transition-all duration-200 cursor-pointer ${
                selectedDrone === drone.id ? 'border-purple-500' : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedDrone(selectedDrone === drone.id ? null : drone.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Plane size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{drone.name}</h4>
                      <p className="text-gray-400 text-sm">{drone.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {drone.aiPilot && (
                      <div className="p-1 bg-purple-600 rounded">
                        <Brain size={12} className="text-white" />
                      </div>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(drone.status)}`}>
                      {drone.status}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-400 text-xs mb-1">Current Mission</p>
                  <p className="text-white font-medium">{drone.mission}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Battery</p>
                    <div className="flex items-center space-x-2">
                      <Battery size={14} className={getBatteryColor(drone.battery)} />
                      <span className={`text-sm font-medium ${getBatteryColor(drone.battery)}`}>
                        {drone.battery}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Altitude</p>
                    <p className="text-white font-semibold">{drone.altitude}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Speed</p>
                    <p className="text-white font-semibold">{drone.speed}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-gray-400">ETA: <span className="text-white">{drone.eta}</span></p>
                    <p className="text-gray-400">Range: <span className="text-white">{drone.range}</span></p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                      <Play size={14} className="text-white" />
                    </button>
                    <button className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
                      <Pause size={14} className="text-white" />
                    </button>
                    <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      <RotateCcw size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
              
              {selectedDrone === drone.id && (
                <div className="border-t border-gray-700 p-4 space-y-4">
                  {/* Detailed Info */}
                  <div>
                    <h5 className="text-white font-medium mb-3">Detailed Information</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Location</p>
                        <p className="text-white text-sm">{drone.location.address}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Flight Time</p>
                        <p className="text-white text-sm">{drone.flightTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Cargo</p>
                        <p className="text-white text-sm">{drone.cargo.type} ({drone.cargo.weight})</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Cargo Value</p>
                        <p className="text-white text-sm">{drone.cargo.value}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sensor Status */}
                  <div>
                    <h5 className="text-white font-medium mb-3">Sensor Status</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Eye size={14} className="text-gray-400" />
                          <span className="text-gray-400 text-sm">Camera</span>
                        </div>
                        <span className={`text-sm font-medium ${getSensorStatus(drone.sensors.camera)}`}>
                          {drone.sensors.camera}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Radio size={14} className="text-gray-400" />
                          <span className="text-gray-400 text-sm">LiDAR</span>
                        </div>
                        <span className={`text-sm font-medium ${getSensorStatus(drone.sensors.lidar)}`}>
                          {drone.sensors.lidar}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Navigation size={14} className="text-gray-400" />
                          <span className="text-gray-400 text-sm">GPS</span>
                        </div>
                        <span className={`text-sm font-medium ${getSensorStatus(drone.sensors.gps)}`}>
                          {drone.sensors.gps}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield size={14} className="text-gray-400" />
                          <span className="text-gray-400 text-sm">Collision</span>
                        </div>
                        <span className={`text-sm font-medium ${getSensorStatus(drone.sensors.collision)}`}>
                          {drone.sensors.collision}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Live Feed & Controls */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Live Drone Feed</h3>
              <p className="text-gray-400 text-sm">Real-time camera and telemetry data</p>
            </div>
            
            <div className="p-4">
              <div className="h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg relative overflow-hidden mb-4">
                {/* Simulated Camera Feed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Eye size={48} className="text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-400">Live Camera Feed</p>
                    <p className="text-gray-500 text-sm">DRN-001 • 1920x1080</p>
                  </div>
                </div>
                
                {/* HUD Overlay */}
                <div className="absolute top-4 left-4 bg-black/50 rounded px-2 py-1 text-green-400 text-xs font-mono">
                  ALT: 120m | SPD: 45km/h | BAT: 87%
                </div>
                
                <div className="absolute top-4 right-4 bg-black/50 rounded px-2 py-1 text-green-400 text-xs font-mono">
                  GPS: LOCKED | 14:23:45
                </div>
                
                <div className="absolute bottom-4 left-4 bg-black/50 rounded px-2 py-1 text-green-400 text-xs font-mono">
                  MISSION: MEDICAL DELIVERY
                </div>
              </div>
              
              {/* Camera Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors">
                    Zoom In
                  </button>
                  <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors">
                    Zoom Out
                  </button>
                  <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors">
                    Night Vision
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 text-sm">Recording</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Planning */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Mission Planning</h3>
              <p className="text-gray-400 text-sm">AI-powered mission optimization</p>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Mission Type</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                  <option>Medical Delivery</option>
                  <option>Package Delivery</option>
                  <option>Surveillance</option>
                  <option>Emergency Response</option>
                  <option>Inspection</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Destination</label>
                <input 
                  type="text" 
                  placeholder="Enter destination address"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Priority</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                    <option>Standard</option>
                    <option>High</option>
                    <option>Emergency</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Drone</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                    <option>Auto-Select</option>
                    <option>DRN-001</option>
                    <option>DRN-007</option>
                    <option>DRN-012</option>
                  </select>
                </div>
              </div>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Zap size={20} />
                <span>Launch Mission</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneOperations;