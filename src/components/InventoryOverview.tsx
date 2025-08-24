import React from 'react';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface InventoryOverviewProps {
  expanded?: boolean;
}

const InventoryOverview: React.FC<InventoryOverviewProps> = ({ expanded = false }) => {
  const inventoryData = [
    {
      id: 'ELEC-001',
      name: 'Consumer Electronics',
      category: 'Electronics',
      quantity: 1247,
      reserved: 89,
      available: 1158,
      location: 'Warehouse A-1',
      status: 'optimal',
      turnover: 94,
      value: 2450000
    },
    {
      id: 'MED-007',
      name: 'Medical Supplies',
      category: 'Healthcare',
      quantity: 892,
      reserved: 156,
      available: 736,
      location: 'Cold Storage B',
      status: 'low',
      turnover: 87,
      value: 1890000
    },
    {
      id: 'FOOD-023',
      name: 'Perishable Goods',
      category: 'Food & Beverage',
      quantity: 2341,
      reserved: 234,
      available: 2107,
      location: 'Refrigerated C-2',
      status: 'critical',
      turnover: 98,
      value: 890000
    },
    {
      id: 'AUTO-445',
      name: 'Automotive Parts',
      category: 'Automotive',
      quantity: 567,
      reserved: 45,
      available: 522,
      location: 'Warehouse D-3',
      status: 'optimal',
      turnover: 76,
      value: 3200000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'text-green-400 bg-green-400/10';
      case 'low':
        return 'text-orange-400 bg-orange-400/10';
      case 'critical':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'low':
        return <AlertTriangle size={16} className="text-orange-400" />;
      case 'critical':
        return <AlertTriangle size={16} className="text-red-400" />;
      default:
        return <Clock size={16} className="text-gray-400" />;
    }
  };

  const totalValue = inventoryData.reduce((sum, item) => sum + item.value, 0);
  const totalItems = inventoryData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="text-green-400" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-white">Inventory Overview</h3>
              <p className="text-sm text-gray-400">Real-time stock monitoring and analytics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-right">
              <p className="text-gray-400">Total Value</p>
              <p className="text-white font-semibold">${(totalValue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Total Items</p>
              <p className="text-white font-semibold">{totalItems.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle size={20} className="text-green-400" />
              <span className="text-green-400 text-sm font-medium">+5.2%</span>
            </div>
            <h4 className="text-2xl font-bold text-white">89%</h4>
            <p className="text-gray-400 text-sm">Stock Levels</p>
          </div>
          
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp size={20} className="text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">+12.8%</span>
            </div>
            <h4 className="text-2xl font-bold text-white">92%</h4>
            <p className="text-gray-400 text-sm">Turnover Rate</p>
          </div>
          
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle size={20} className="text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">-2</span>
            </div>
            <h4 className="text-2xl font-bold text-white">3</h4>
            <p className="text-gray-400 text-sm">Low Stock Alerts</p>
          </div>
          
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 size={20} className="text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">+8.1%</span>
            </div>
            <h4 className="text-2xl font-bold text-white">$8.4M</h4>
            <p className="text-gray-400 text-sm">Inventory Value</p>
          </div>
        </div>
        
        {/* Inventory Table */}
        <div className="space-y-4">
          {inventoryData.slice(0, expanded ? inventoryData.length : 4).map((item) => (
            <div
              key={item.id}
              className="bg-gray-700/30 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium mb-1">{item.name}</h4>
                  <p className="text-gray-400 text-sm">{item.category} • {item.id}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    <span className="capitalize">{item.status}</span>
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Total Quantity</p>
                  <p className="text-white font-semibold">{item.quantity.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Available</p>
                  <p className="text-green-400 font-semibold">{item.available.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Reserved</p>
                  <p className="text-orange-400 font-semibold">{item.reserved.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Location</p>
                  <p className="text-white text-sm">{item.location}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Turnover Rate</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-400 transition-all duration-300"
                        style={{ width: `${item.turnover}%` }}
                      ></div>
                    </div>
                    <span className="text-blue-400 text-sm font-medium">{item.turnover}%</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Value</p>
                  <p className="text-white font-semibold">${(item.value / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!expanded && (
          <div className="mt-4 text-center">
            <button className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
              View Full Inventory Report →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryOverview;