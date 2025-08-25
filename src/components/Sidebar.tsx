import React from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  BarChart3, 
  MapPin, 
  Settings,
  Plane,
  Zap,
  Database,
  Plus
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'fleet', label: 'Fleet Management', icon: Truck },
    { id: 'fleet-management', label: 'Add Vehicles', icon: Plus },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'analytics', label: 'AI Analytics', icon: BarChart3 },
    { id: 'routes', label: 'Route Planning', icon: MapPin },
    { id: 'drones', label: 'Drone Operations', icon: Plane },
    { id: 'automation', label: 'AI Automation', icon: Zap },
    { id: 'tidb-agent', label: 'TiDB AI Agent', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Truck className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">LogiFlow</h2>
            <p className="text-xs text-gray-400">AI Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">System Status</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Active Vehicles</span>
              <span className="text-green-400">24/25</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">AI Efficiency</span>
              <span className="text-blue-400">94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;