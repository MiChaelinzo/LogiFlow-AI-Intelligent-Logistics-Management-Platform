import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  Package, 
  Plane, 
  Navigation,
  Maximize2,
  Filter,
  RefreshCw,
  Zap
} from 'lucide-react';

const MapView: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [mapFilter, setMapFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRouteOptimization, setShowRouteOptimization] = useState(false);

  const vehicles = [
    { id: '1', type: 'truck', lat: 40.7128, lng: -74.0060, status: 'en-route', name: 'Truck Alpha-1' },
    { id: '2', type: 'drone', lat: 40.7589, lng: -73.9851, status: 'delivering', name: 'Drone Beta-7' },
    { id: '3', type: 'truck', lat: 40.6892, lng: -74.0445, status: 'loading', name: 'Truck Gamma-3' },
    { id: '4', type: 'drone', lat: 40.7505, lng: -73.9934, status: 'returning', name: 'Drone Delta-2' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleOptimizeRoutes = () => {
    setShowRouteOptimization(true);
    setTimeout(() => setShowRouteOptimization(false), 3000);
  };
  const getVehicleIcon = (type: string) => {
    return type === 'truck' ? Truck : Plane;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'en-route': 'text-blue-400',
      'delivering': 'text-green-400',
      'loading': 'text-orange-400',
      'returning': 'text-purple-400'
    };
    return colors[status as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MapPin className="text-blue-400" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-white">Live Fleet Tracking</h3>
            <p className="text-sm text-gray-400">Real-time vehicle locations and routes</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={mapFilter}
            onChange={(e) => setMapFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Vehicles</option>
            <option value="truck">Trucks Only</option>
            <option value="drone">Drones Only</option>
          </select>
          <button 
            onClick={handleRefresh}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={`text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleOptimizeRoutes}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Zap size={16} className="text-white" />
          </button>
          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Maximize2 size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="relative">
        {showRouteOptimization && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg z-10 flex items-center space-x-2">
            <Zap size={16} />
            <span>AI optimizing routes...</span>
          </div>
        )}
        
        {/* Simulated Map Background */}
        <div className="h-80 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                 `,
                 backgroundSize: '20px 20px'
               }}>
          </div>
          
          {/* Route Lines */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            <path 
              d="M 50 50 Q 200 20 350 80 T 600 120" 
              stroke="url(#routeGradient)" 
              strokeWidth="3" 
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
            <path 
              d="M 100 200 Q 250 180 400 220 T 550 250" 
              stroke="url(#routeGradient)" 
              strokeWidth="3" 
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </svg>
          
          {/* Vehicle Markers */}
          {vehicles.filter(v => mapFilter === 'all' || v.type === mapFilter).map((vehicle, index) => {
            const Icon = getVehicleIcon(vehicle.type);
            return (
              <div
                key={vehicle.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                  selectedVehicle === vehicle.id ? 'scale-125 z-10' : ''
                }`}
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${30 + index * 15}%`
                }}
                onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
              >
                <div className="relative">
                  <div className={`p-3 rounded-full bg-gray-800 border-2 ${
                    vehicle.type === 'truck' ? 'border-blue-500' : 'border-purple-500'
                  } shadow-lg`}>
                    <Icon size={20} className={getStatusColor(vehicle.status)} />
                  </div>
                  
                  {/* Pulse Animation */}
                  <div className={`absolute inset-0 rounded-full animate-ping ${
                    vehicle.type === 'truck' ? 'bg-blue-500' : 'bg-purple-500'
                  } opacity-20`}></div>
                  
                  {/* Vehicle Info Popup */}
                  {selectedVehicle === vehicle.id && (
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-xl min-w-48">
                      <div className="text-white text-sm font-medium mb-1">{vehicle.name}</div>
                      <div className="text-gray-400 text-xs mb-2">
                        Status: <span className={getStatusColor(vehicle.status)}>{vehicle.status}</span>
                      </div>
                      <div className="text-gray-400 text-xs">
                        ETA: {Math.floor(Math.random() * 45 + 15)} minutes
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors">
                          Track
                        </button>
                        <button className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors">
                          Contact
                        </button>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Warehouse/Depot Markers */}
          <div className="absolute top-4 left-4">
            <div className="p-2 bg-green-600 rounded-lg shadow-lg">
              <Package size={16} className="text-white" />
            </div>
            <div className="text-xs text-white mt-1">Main Depot</div>
          </div>
          
          <div className="absolute bottom-4 right-4">
            <div className="p-2 bg-orange-600 rounded-lg shadow-lg">
              <Package size={16} className="text-white" />
            </div>
            <div className="text-xs text-white mt-1">Hub Center</div>
          </div>
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="p-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
            <Navigation size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400">Trucks: {vehicles.filter(v => v.type === 'truck').length} active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400">Drones: {vehicles.filter(v => v.type === 'drone').length} active</span>
            </div>
          </div>
          <span className="text-gray-400">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;