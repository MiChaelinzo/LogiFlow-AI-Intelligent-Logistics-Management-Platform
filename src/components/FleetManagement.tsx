import React, { useState } from 'react';
import { 
  Truck, 
  Plane, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  MapPin,
  Battery,
  Fuel,
  Calendar,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  type: 'truck' | 'drone';
  status: string;
  battery: number;
  location: string;
  driver?: string;
  driverPhone?: string;
  driverEmail?: string;
  capacity: string;
  fuelType: string;
  lastMaintenance: string;
  nextMaintenance: string;
  licensePlate?: string;
  model: string;
  year: number;
}

const FleetManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    type: 'truck',
    status: 'idle',
    battery: 100,
    fuelType: 'electric'
  });

  const handleAddVehicle = () => {
    if (!formData.name || !formData.model) return;
    
    const newVehicle: Vehicle = {
      id: `${formData.type?.toUpperCase()}-${String(vehicles.length + 1).padStart(3, '0')}`,
      name: formData.name!,
      type: formData.type as 'truck' | 'drone',
      status: formData.status || 'idle',
      battery: formData.battery || 100,
      location: formData.location || 'Base Station',
      driver: formData.driver,
      driverPhone: formData.driverPhone,
      driverEmail: formData.driverEmail,
      capacity: formData.capacity || '2.5T',
      fuelType: formData.fuelType || 'electric',
      lastMaintenance: formData.lastMaintenance || new Date().toISOString().split('T')[0],
      nextMaintenance: formData.nextMaintenance || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      licensePlate: formData.licensePlate,
      model: formData.model!,
      year: formData.year || new Date().getFullYear()
    };

    setVehicles([...vehicles, newVehicle]);
    setShowAddModal(false);
    setFormData({ type: 'truck', status: 'idle', battery: 100, fuelType: 'electric' });
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setShowAddModal(true);
  };

  const handleUpdateVehicle = () => {
    if (!editingVehicle || !formData.name || !formData.model) return;
    
    const updatedVehicle: Vehicle = {
      ...editingVehicle,
      ...formData as Vehicle
    };

    setVehicles(vehicles.map(v => v.id === editingVehicle.id ? updatedVehicle : v));
    setShowAddModal(false);
    setEditingVehicle(null);
    setFormData({ type: 'truck', status: 'idle', battery: 100, fuelType: 'electric' });
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'idle':
        return 'text-blue-400 bg-blue-400/10';
      case 'maintenance':
        return 'text-orange-400 bg-orange-400/10';
      case 'offline':
        return 'text-red-400 bg-red-400/10';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Fleet Management</h1>
          <p className="text-gray-400">Add and manage your vehicle fleet</p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Truck className="text-blue-400" size={24} />
            <span className="text-blue-400 text-sm font-medium">
              {vehicles.filter(v => v.type === 'truck').length}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {vehicles.filter(v => v.type === 'truck').length}
          </h3>
          <p className="text-gray-400 text-sm">Trucks</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Plane className="text-purple-400" size={24} />
            <span className="text-purple-400 text-sm font-medium">
              {vehicles.filter(v => v.type === 'drone').length}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {vehicles.filter(v => v.type === 'drone').length}
          </h3>
          <p className="text-gray-400 text-sm">Drones</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="text-green-400" size={24} />
            <span className="text-green-400 text-sm font-medium">
              {vehicles.filter(v => v.status === 'active').length}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {vehicles.filter(v => v.status === 'active').length}
          </h3>
          <p className="text-gray-400 text-sm">Active</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="text-orange-400" size={24} />
            <span className="text-orange-400 text-sm font-medium">
              {vehicles.filter(v => v.status === 'maintenance').length}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {vehicles.filter(v => v.status === 'maintenance').length}
          </h3>
          <p className="text-gray-400 text-sm">Maintenance</p>
        </div>
      </div>

      {/* Vehicle List */}
      {vehicles.length === 0 ? (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
          <Truck size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Vehicles Added Yet</h3>
          <p className="text-gray-400 mb-6">Start building your fleet by adding your first vehicle</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
          >
            <Plus size={20} />
            <span>Add Your First Vehicle</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
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
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Edit size={14} className="text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} className="text-white" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Model</p>
                  <p className="text-white text-sm">{vehicle.model} ({vehicle.year})</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Capacity</p>
                  <p className="text-white text-sm">{vehicle.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Location</p>
                  <p className="text-white text-sm">{vehicle.location}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Fuel Type</p>
                  <p className="text-white text-sm capitalize">{vehicle.fuelType}</p>
                </div>
              </div>

              {vehicle.driver && (
                <div className="mb-4 p-3 bg-gray-700/30 rounded-lg">
                  <p className="text-gray-400 text-xs mb-2">Driver Information</p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <User size={14} className="text-gray-400" />
                      <span className="text-white text-sm">{vehicle.driver}</span>
                    </div>
                    {vehicle.driverPhone && (
                      <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-gray-400" />
                        <span className="text-white text-sm">{vehicle.driverPhone}</span>
                      </div>
                    )}
                    {vehicle.driverEmail && (
                      <div className="flex items-center space-x-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-white text-sm">{vehicle.driverEmail}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

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
                
                <div className="text-right text-sm">
                  <p className="text-gray-400">Next Maintenance</p>
                  <p className="text-white">{new Date(vehicle.nextMaintenance).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingVehicle(null);
                    setFormData({ type: 'truck', status: 'idle', battery: 100, fuelType: 'electric' });
                  }}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Vehicle Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Alpha Freight 1"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Vehicle Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'truck' | 'drone' })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="truck">Truck</option>
                    <option value="drone">Drone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Model *</label>
                  <input
                    type="text"
                    value={formData.model || ''}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Tesla Semi, DJI Matrice"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Year</label>
                  <input
                    type="number"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="2024"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Capacity</label>
                  <input
                    type="text"
                    value={formData.capacity || ''}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 2.5T, 5kg"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">License Plate</label>
                  <input
                    type="text"
                    value={formData.licensePlate || ''}
                    onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g., ABC-1234"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="idle">Idle</option>
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Fuel Type</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="electric">Electric</option>
                    <option value="diesel">Diesel</option>
                    <option value="gasoline">Gasoline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Current Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Main Warehouse, Charging Station A"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Battery Level (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.battery || 100}
                  onChange={(e) => setFormData({ ...formData, battery: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span className="text-white font-medium">{formData.battery}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Driver Information */}
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-white font-medium mb-4">Driver Information (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Driver Name</label>
                    <input
                      type="text"
                      value={formData.driver || ''}
                      onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.driverPhone || ''}
                      onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.driverEmail || ''}
                      onChange={(e) => setFormData({ ...formData, driverEmail: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
              </div>

              {/* Maintenance Dates */}
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-white font-medium mb-4">Maintenance Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Last Maintenance</label>
                    <input
                      type="date"
                      value={formData.lastMaintenance || ''}
                      onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Next Maintenance</label>
                    <input
                      type="date"
                      value={formData.nextMaintenance || ''}
                      onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700">
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingVehicle(null);
                    setFormData({ type: 'truck', status: 'idle', battery: 100, fuelType: 'electric' });
                  }}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Save size={20} />
                  <span>{editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;