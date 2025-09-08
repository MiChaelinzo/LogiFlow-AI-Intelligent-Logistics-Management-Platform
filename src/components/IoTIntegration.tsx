import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Thermometer, 
  Battery, 
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Radio,
  Smartphone,
  Truck,
  Plane,
  Package,
  Zap,
  Database,
  Signal,
  Eye,
  Shield
} from 'lucide-react';

const IoTIntegration: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  const [iotDevices, setIoTDevices] = useState([
    {
      id: 'IOT-TRK-001',
      name: 'Truck Alpha-1 Sensors',
      type: 'vehicle',
      vehicle: 'TRK-001',
      status: 'online',
      lastSeen: new Date(),
      sensors: {
        temperature: { value: 23.5, unit: '°C', status: 'normal' },
        humidity: { value: 45, unit: '%', status: 'normal' },
        vibration: { value: 2.1, unit: 'g', status: 'normal' },
        fuel: { value: 78, unit: '%', status: 'normal' },
        tire_pressure: { value: 32.5, unit: 'PSI', status: 'normal' },
        engine_temp: { value: 87, unit: '°C', status: 'normal' }
      },
      location: { lat: 40.7128, lng: -74.0060 },
      battery: 89,
      signalStrength: 95
    },
    {
      id: 'IOT-DRN-007',
      name: 'Drone Beta-7 Telemetry',
      type: 'drone',
      vehicle: 'DRN-007',
      status: 'online',
      lastSeen: new Date(Date.now() - 30000),
      sensors: {
        altitude: { value: 120, unit: 'm', status: 'normal' },
        speed: { value: 45, unit: 'km/h', status: 'normal' },
        battery_temp: { value: 35, unit: '°C', status: 'warning' },
        motor_rpm: { value: 3200, unit: 'RPM', status: 'normal' },
        gps_accuracy: { value: 2.1, unit: 'm', status: 'normal' },
        wind_speed: { value: 8, unit: 'km/h', status: 'normal' }
      },
      location: { lat: 40.7589, lng: -73.9851 },
      battery: 67,
      signalStrength: 87
    },
    {
      id: 'IOT-WH-A1',
      name: 'Warehouse A Environmental',
      type: 'warehouse',
      vehicle: null,
      status: 'online',
      lastSeen: new Date(Date.now() - 60000),
      sensors: {
        temperature: { value: 18.2, unit: '°C', status: 'normal' },
        humidity: { value: 52, unit: '%', status: 'normal' },
        air_quality: { value: 85, unit: 'AQI', status: 'good' },
        occupancy: { value: 12, unit: 'people', status: 'normal' },
        light_level: { value: 450, unit: 'lux', status: 'normal' },
        noise_level: { value: 42, unit: 'dB', status: 'normal' }
      },
      location: { lat: 40.6892, lng: -74.0445 },
      battery: 100,
      signalStrength: 98
    },
    {
      id: 'IOT-PKG-001',
      name: 'Smart Package Tracker',
      type: 'package',
      vehicle: 'TRK-003',
      status: 'offline',
      lastSeen: new Date(Date.now() - 300000),
      sensors: {
        temperature: { value: 22.1, unit: '°C', status: 'normal' },
        shock: { value: 1.2, unit: 'g', status: 'normal' },
        tilt: { value: 5, unit: '°', status: 'normal' },
        light: { value: 12, unit: 'lux', status: 'normal' },
        pressure: { value: 1013, unit: 'hPa', status: 'normal' },
        opened: { value: 0, unit: 'times', status: 'secure' }
      },
      location: { lat: 40.7505, lng: -73.9934 },
      battery: 23,
      signalStrength: 45
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIoTDevices(prev => prev.map(device => ({
        ...device,
        sensors: Object.fromEntries(
          Object.entries(device.sensors).map(([key, sensor]: [string, any]) => [
            key,
            {
              ...sensor,
              value: sensor.value + (Math.random() - 0.5) * (sensor.value * 0.1)
            }
          ])
        ),
        battery: Math.max(0, device.battery - Math.random() * 0.5),
        signalStrength: Math.max(0, Math.min(100, device.signalStrength + (Math.random() - 0.5) * 10))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-400 bg-green-400/10';
      case 'offline':
        return 'text-red-400 bg-red-400/10';
      case 'warning':
        return 'text-orange-400 bg-orange-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'good':
      case 'secure':
        return 'text-green-400';
      case 'warning':
        return 'text-orange-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'vehicle':
        return Truck;
      case 'drone':
        return Plane;
      case 'warehouse':
        return Package;
      case 'package':
        return Package;
      default:
        return Wifi;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">IoT Integration</h1>
          <p className="text-gray-400">Real-time sensor data and device management for smart logistics</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            connectionStatus === 'connected' ? 'bg-green-900/30' : 'bg-red-900/30'
          }`}>
            <Wifi className={connectionStatus === 'connected' ? 'text-green-400' : 'text-red-400'} size={20} />
            <span className={`font-medium ${connectionStatus === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
              {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Zap size={16} />
            <span>Add Device</span>
          </button>
        </div>
      </div>

      {/* IoT Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Wifi className="text-blue-400" size={24} />
            <span className="text-green-400 text-sm font-medium">+2</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {iotDevices.filter(d => d.status === 'online').length}
          </h3>
          <p className="text-gray-400 text-sm">Online Devices</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-green-400" size={24} />
            <span className="text-green-400 text-sm font-medium">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">2.4M</h3>
          <p className="text-gray-400 text-sm">Data Points/Day</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Database className="text-purple-400" size={24} />
            <span className="text-purple-400 text-sm font-medium">TiDB</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">847GB</h3>
          <p className="text-gray-400 text-sm">Sensor Data</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="text-orange-400" size={24} />
            <span className="text-orange-400 text-sm font-medium">-1</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">3</h3>
          <p className="text-gray-400 text-sm">Alerts Active</p>
        </div>
      </div>

      {/* Device List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Connected Devices</h3>
          
          {iotDevices.map((device) => {
            const DeviceIcon = getDeviceIcon(device.type);
            const isSelected = selectedDevice === device.id;
            
            return (
              <div
                key={device.id}
                className={`bg-gray-800 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected ? 'border-blue-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedDevice(isSelected ? null : device.id)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-700 rounded-lg">
                        <DeviceIcon size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{device.name}</h4>
                        <p className="text-gray-400 text-sm">{device.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                        {device.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Battery</p>
                      <div className="flex items-center space-x-2">
                        <Battery size={14} className={device.battery > 30 ? 'text-green-400' : 'text-red-400'} />
                        <span className="text-white text-sm">{Math.round(device.battery)}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Signal</p>
                      <div className="flex items-center space-x-2">
                        <Signal size={14} className={device.signalStrength > 50 ? 'text-green-400' : 'text-orange-400'} />
                        <span className="text-white text-sm">{Math.round(device.signalStrength)}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Last Seen</p>
                      <p className="text-white text-sm">
                        {Math.round((Date.now() - device.lastSeen.getTime()) / 60000)}m ago
                      </p>
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="border-t border-gray-700 p-4">
                    <h5 className="text-white font-medium mb-3">Sensor Readings</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(device.sensors).map(([key, sensor]: [string, any]) => (
                        <div key={key} className="bg-gray-700/30 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-400 text-sm capitalize">
                              {key.replace('_', ' ')}
                            </span>
                            <span className={`text-xs font-medium ${getSensorStatusColor(sensor.status)}`}>
                              {sensor.status}
                            </span>
                          </div>
                          <p className="text-white font-semibold">
                            {typeof sensor.value === 'number' ? sensor.value.toFixed(1) : sensor.value} {sensor.unit}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Real-time Monitoring */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Real-time Sensor Feed</h3>
              <p className="text-gray-400 text-sm">Live data streaming from IoT devices</p>
            </div>
            
            <div className="p-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {iotDevices.filter(d => d.status === 'online').map((device) => (
                  <div key={device.id} className="bg-gray-700/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{device.name}</span>
                      <span className="text-gray-400 text-xs">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(device.sensors).slice(0, 3).map(([key, sensor]: [string, any]) => (
                        <div key={key}>
                          <span className="text-gray-400">{key}: </span>
                          <span className="text-white">
                            {typeof sensor.value === 'number' ? sensor.value.toFixed(1) : sensor.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Device Management */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Device Management</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="text-blue-400" size={20} />
                  <h4 className="text-blue-400 font-medium">Security Status</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Encrypted Connections</span>
                    <span className="text-green-400">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Device Authentication</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Integrity</span>
                    <span className="text-green-400">Verified</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Database className="text-purple-400" size={20} />
                  <h4 className="text-purple-400 font-medium">TiDB Integration</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Ingestion Rate</span>
                    <span className="text-white">2.4M/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Storage Used</span>
                    <span className="text-white">847GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Query Performance</span>
                    <span className="text-green-400">1.2ms avg</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm transition-colors">
                  Sync All Devices
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm transition-colors">
                  Update Firmware
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTIntegration;