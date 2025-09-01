import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Route, 
  Clock, 
  Fuel,
  TrendingUp,
  Zap,
  CheckCircle,
  AlertTriangle,
  Plus,
  Trash2,
  Play,
  Brain
} from 'lucide-react';

const RoutePlanning: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [optimizationMode, setOptimizationMode] = useState('time');

  const routes = [
    {
      id: 'RT-001',
      name: 'Downtown Express',
      status: 'active',
      distance: '45.2 km',
      estimatedTime: '2h 15m',
      fuelCost: '$28.50',
      stops: 8,
      efficiency: 94,
      aiOptimized: true,
      vehicles: ['TRK-001', 'TRK-003'],
      waypoints: [
        { name: 'Warehouse A', type: 'depot', eta: '09:00', status: 'completed' },
        { name: 'Downtown Mall', type: 'delivery', eta: '09:45', status: 'completed' },
        { name: 'Office Complex B', type: 'delivery', eta: '10:30', status: 'in-progress' },
        { name: 'Residential Area C', type: 'delivery', eta: '11:15', status: 'pending' },
        { name: 'Industrial Zone D', type: 'pickup', eta: '12:00', status: 'pending' }
      ]
    },
    {
      id: 'RT-002',
      name: 'Suburban Circuit',
      status: 'optimizing',
      distance: '67.8 km',
      estimatedTime: '3h 45m',
      fuelCost: '$42.30',
      stops: 12,
      efficiency: 87,
      aiOptimized: false,
      vehicles: ['TRK-002', 'DRN-007'],
      waypoints: [
        { name: 'Warehouse B', type: 'depot', eta: '08:30', status: 'pending' },
        { name: 'Suburb Mall A', type: 'delivery', eta: '09:30', status: 'pending' },
        { name: 'Residential Complex', type: 'delivery', eta: '10:45', status: 'pending' },
        { name: 'Shopping Center', type: 'delivery', eta: '11:30', status: 'pending' }
      ]
    },
    {
      id: 'RT-003',
      name: 'Emergency Medical',
      status: 'priority',
      distance: '23.1 km',
      estimatedTime: '45m',
      fuelCost: '$15.20',
      stops: 3,
      efficiency: 98,
      aiOptimized: true,
      vehicles: ['DRN-012', 'DRN-015'],
      waypoints: [
        { name: 'Medical Depot', type: 'depot', eta: '14:00', status: 'pending' },
        { name: 'Hospital A', type: 'delivery', eta: '14:20', status: 'pending' },
        { name: 'Clinic B', type: 'delivery', eta: '14:35', status: 'pending' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'optimizing':
        return 'text-blue-400 bg-blue-400/10';
      case 'priority':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getWaypointStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-blue-400';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Route Planning</h1>
          <p className="text-gray-400">AI-powered route optimization with TiDB Serverless intelligence</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-blue-900/30 px-4 py-2 rounded-lg">
            <Brain className="text-blue-400" size={20} />
            <span className="text-blue-400 font-medium">TiDB Serverless AI</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus size={20} />
            <span>New Route</span>
          </button>
        </div>
      </div>

      {/* Optimization Controls */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">TiDB Serverless AI Optimization</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Optimization Mode</h4>
            <select 
              value={optimizationMode}
              onChange={(e) => setOptimizationMode(e.target.value)}
              className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="time">Minimize Time</option>
              <option value="fuel">Minimize Fuel</option>
              <option value="distance">Minimize Distance</option>
              <option value="cost">Minimize Cost</option>
              <option value="emissions">Minimize Emissions</option>
            </select>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Vehicle Type</h4>
            <select className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
              <option value="all">All Vehicles</option>
              <option value="trucks">Trucks Only</option>
              <option value="drones">Drones Only</option>
              <option value="electric">Electric Only</option>
            </select>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Priority Level</h4>
            <select className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
              <option value="standard">Standard</option>
              <option value="express">Express</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Zap size={16} />
              <span>Optimize Routes</span>
            </button>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Brain className="text-blue-400" size={20} />
            <h4 className="text-blue-400 font-medium">TiDB Serverless AI Recommendations</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Potential Savings</p>
              <p className="text-green-400 font-semibold">$2,340/day</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Time Reduction</p>
              <p className="text-blue-400 font-semibold">18% faster</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Fuel Efficiency</p>
              <p className="text-orange-400 font-semibold">+15% improvement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Active Routes</h3>
          
          {routes.map((route) => (
            <div
              key={route.id}
              className={`bg-gray-800 rounded-xl border transition-all duration-200 cursor-pointer ${
                selectedRoute === route.id ? 'border-blue-500' : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium mb-1">{route.name}</h4>
                    <p className="text-gray-400 text-sm">{route.id}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {route.aiOptimized && (
                      <div className="p-1 bg-blue-600 rounded">
                        <Brain size={12} className="text-white" />
                      </div>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                      {route.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Distance</p>
                    <p className="text-white font-semibold">{route.distance}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Est. Time</p>
                    <p className="text-white font-semibold">{route.estimatedTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Fuel Cost</p>
                    <p className="text-white font-semibold">{route.fuelCost}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Efficiency</p>
                    <p className="text-green-400 font-semibold">{route.efficiency}%</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    {route.stops} stops • {route.vehicles.length} vehicles
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                      <Play size={14} className="text-white" />
                    </button>
                    <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                      <Trash2 size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
              
              {selectedRoute === route.id && (
                <div className="border-t border-gray-700 p-4">
                  <h5 className="text-white font-medium mb-3">Route Waypoints</h5>
                  <div className="space-y-2">
                    {route.waypoints.map((waypoint, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            waypoint.status === 'completed' ? 'bg-green-400' :
                            waypoint.status === 'in-progress' ? 'bg-blue-400' : 'bg-gray-400'
                          }`}></div>
                          <div>
                            <p className="text-white text-sm">{waypoint.name}</p>
                            <p className="text-gray-400 text-xs">{waypoint.type}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className={`text-sm font-medium ${getWaypointStatusColor(waypoint.status)}`}>
                            {waypoint.eta}
                          </p>
                          <p className="text-gray-400 text-xs capitalize">{waypoint.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Route Visualization */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Route Visualization</h3>
            <p className="text-gray-400 text-sm">Interactive route mapping and optimization</p>
          </div>
          
          <div className="p-4">
            <div className="h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg relative overflow-hidden">
              {/* Simulated Map */}
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
                  <linearGradient id="optimizedRoute" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#10B981" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                <path 
                  d="M 50 50 Q 150 30 250 80 T 400 120 Q 450 140 500 100" 
                  stroke="url(#optimizedRoute)" 
                  strokeWidth="4" 
                  fill="none"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                />
              </svg>
              
              {/* Waypoint Markers */}
              {[
                { x: 10, y: 15, type: 'depot' },
                { x: 30, y: 25, type: 'delivery' },
                { x: 50, y: 35, type: 'pickup' },
                { x: 70, y: 30, type: 'delivery' },
                { x: 85, y: 25, type: 'depot' }
              ].map((point, index) => (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <div className={`p-2 rounded-full shadow-lg ${
                    point.type === 'depot' ? 'bg-blue-600' :
                    point.type === 'delivery' ? 'bg-green-600' : 'bg-orange-600'
                  }`}>
                    <MapPin size={12} className="text-white" />
                  </div>
                </div>
              ))}
              
              <div className="absolute bottom-4 left-4 bg-gray-900/80 rounded-lg p-3">
                <div className="text-xs text-white space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span>Depot</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span>Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <span>Pickup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePlanning;