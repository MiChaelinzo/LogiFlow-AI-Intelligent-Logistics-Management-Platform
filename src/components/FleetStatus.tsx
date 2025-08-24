import React from 'react';
import { 
  Truck, 
  Plane, 
  Battery, 
  Navigation, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Fuel,
  Play,
  Pause,
  MapPin,
  Phone
} from 'lucide-react';

interface FleetStatusProps {
  expanded?: boolean;
}

const FleetStatus: React.FC<FleetStatusProps> = ({ expanded = false }) => {
  const [fleetData, setFleetData] = React.useState([
    {
      id: 'TRK-001',
      type: 'truck',
      name: 'Alpha Freight 1',
      status: 'en-route',
      battery: 85,
      location: 'Route 95, Mile 127',
      eta: '2:30 PM',
      cargo: 'Electronics (2.4T)',
      efficiency: 94
    },
    {
      id: 'DRN-007',
      type: 'drone',
      name: 'Sky Courier 7',
      status: 'delivering',
      battery: 67,
      location: 'Downtown Sector 3',
      eta: '1:45 PM',
      cargo: 'Medical Supplies (5kg)',
      efficiency: 98
    },
    {
      id: 'TRK-003',
      type: 'truck',
      name: 'Beta Transport 3',
      status: 'charging',
      battery: 23,
      location: 'Charging Station A',
      eta: '4:15 PM',
      cargo: 'Consumer Goods (3.1T)',
      efficiency: 89
    },
    {
      id: 'DRN-012',
      type: 'drone',
      name: 'Swift Delivery 12',
      status: 'maintenance',
      battery: 100,
      location: 'Service Bay 2',
      eta: 'Tomorrow 9:00 AM',
      cargo: 'None',
      efficiency: 85
    }
  ]);

  const handleVehicleAction = (vehicleId: string, action: string) => {
    setFleetData(prev => prev.map(vehicle => {
      if (vehicle.id === vehicleId) {
        switch (action) {
          case 'start':
            return { ...vehicle, status: 'en-route' };
          case 'pause':
            return { ...vehicle, status: 'paused' };
          case 'return':
            return { ...vehicle, status: 'returning' };
          default:
            return vehicle;
        }
      }
      return vehicle;
    }));
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en-route':
        return <Navigation size={16} className="text-blue-400" />;
      case 'delivering':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'charging':
        return <Battery size={16} className="text-orange-400" />;
      case 'maintenance':
        return <AlertTriangle size={16} className="text-red-400" />;
      case 'paused':
        return <Pause size={16} className="text-yellow-400" />;
      case 'returning':
        return <Navigation size={16} className="text-purple-400" />;
      default:
        return <Clock size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-route':
        return 'text-blue-400 bg-blue-400/10';
      case 'delivering':
        return 'text-green-400 bg-green-400/10';
      case 'charging':
        return 'text-orange-400 bg-orange-400/10';
      case 'maintenance':
        return 'text-red-400 bg-red-400/10';
      case 'paused':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'returning':
        return 'text-purple-400 bg-purple-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-400';
    if (battery > 30) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Truck className="text-blue-400" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-white">Fleet Status</h3>
            <p className="text-sm text-gray-400">Real-time vehicle monitoring</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {fleetData.slice(0, expanded ? fleetData.length : 3).map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    {vehicle.type === 'truck' ? (
                      <Truck size={20} className="text-blue-400" />
                    ) : (
                      <Plane size={20} className="text-purple-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{vehicle.name}</h4>
                    <p className="text-gray-400 text-sm">{vehicle.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(vehicle.status)}`}>
                    {getStatusIcon(vehicle.status)}
                    <span className="capitalize">{vehicle.status}</span>
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Location</p>
                  <p className="text-white text-sm">{vehicle.location.address}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">ETA</p>
                  <p className="text-white text-sm">{vehicle.eta}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-400 text-xs mb-1">Cargo</p>
                <p className="text-white text-sm">{vehicle.cargo.type}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Battery size={16} className={getBatteryColor(vehicle.battery)} />
                  <span className={`text-sm font-medium ${getBatteryColor(vehicle.battery)}`}>
                    {vehicle.battery}%
                  </span>
                  <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        vehicle.battery > 60 ? 'bg-green-400' : 
                        vehicle.battery > 30 ? 'bg-orange-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${vehicle.battery}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleVehicleAction(vehicle.id, 'start')}
                    className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    title="Start/Resume"
                  >
                    <Play size={14} className="text-white" />
                  </button>
                  <button
                    onClick={() => handleVehicleAction(vehicle.id, 'pause')}
                    className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                    title="Pause"
                  >
                    <Pause size={14} className="text-white" />
                  </button>
                  <button
                    onClick={() => handleVehicleAction(vehicle.id, 'return')}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    title="Return to Base"
                  >
                    <MapPin size={14} className="text-white" />
                  </button>
                  <button className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors" title="Contact Driver">
                    <Phone size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!expanded && fleetData.length > 3 && (
          <div className="mt-4 text-center">
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              View All {fleetData.length} Vehicles →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FleetStatus;