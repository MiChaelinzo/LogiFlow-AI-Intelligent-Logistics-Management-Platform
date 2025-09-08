import React, { useState } from 'react';
import { 
  Leaf, 
  TrendingDown, 
  Target, 
  Award,
  BarChart3,
  Zap,
  Truck,
  Plane,
  Factory,
  Recycle,
  Sun,
  Wind,
  Battery,
  TreePine,
  Globe,
  CheckCircle
} from 'lucide-react';

const CarbonTracking: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [offsetGoal, setOffsetGoal] = useState(100);

  const carbonData = {
    totalEmissions: 2847.5, // kg CO2
    monthlyReduction: -18.7,
    offsetPercentage: 67,
    carbonNeutralDate: '2025-08-15',
    breakdown: {
      vehicles: { amount: 1890.2, percentage: 66.4, trend: -12.3 },
      warehouses: { amount: 567.8, percentage: 19.9, trend: -8.1 },
      packaging: { amount: 234.1, percentage: 8.2, trend: -15.6 },
      shipping: { amount: 155.4, percentage: 5.5, trend: -22.1 }
    }
  };

  const offsetProjects = [
    {
      id: 'FOREST-001',
      name: 'Amazon Rainforest Protection',
      type: 'forestry',
      location: 'Brazil',
      offsetAmount: 1200,
      cost: 24.50,
      certification: 'VCS',
      impact: 'Protects 50 hectares of rainforest',
      status: 'active'
    },
    {
      id: 'SOLAR-002',
      name: 'Solar Farm Development',
      type: 'renewable',
      location: 'California, USA',
      offsetAmount: 800,
      cost: 18.75,
      certification: 'Gold Standard',
      impact: '2MW solar capacity added',
      status: 'active'
    },
    {
      id: 'WIND-003',
      name: 'Wind Energy Project',
      type: 'renewable',
      location: 'Texas, USA',
      offsetAmount: 600,
      cost: 15.20,
      certification: 'CDM',
      impact: '1.5MW wind capacity',
      status: 'pending'
    }
  ];

  const sustainabilityMetrics = [
    { label: 'Electric Vehicle %', value: 78, target: 85, icon: Battery },
    { label: 'Renewable Energy %', value: 92, target: 100, icon: Sun },
    { label: 'Recycled Packaging %', value: 67, target: 80, icon: Recycle },
    { label: 'Route Efficiency', value: 94, target: 95, icon: Target }
  ];

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'forestry':
        return TreePine;
      case 'renewable':
        return Sun;
      case 'wind':
        return Wind;
      default:
        return Leaf;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
        return 'text-orange-400 bg-orange-400/10';
      case 'completed':
        return 'text-blue-400 bg-blue-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Carbon Tracking & Sustainability</h1>
          <p className="text-gray-400">Monitor and reduce your logistics carbon footprint with AI-powered insights</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Leaf size={16} />
            <span>Purchase Offsets</span>
          </button>
        </div>
      </div>

      {/* Carbon Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Globe className="text-blue-400" size={24} />
            <span className="text-red-400 text-sm font-medium">
              {carbonData.totalEmissions.toLocaleString()} kg
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">CO₂ Emissions</h3>
          <p className="text-gray-400 text-sm">Total this month</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown className="text-green-400" size={24} />
            <span className="text-green-400 text-sm font-medium">
              {carbonData.monthlyReduction}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Reduction</h3>
          <p className="text-gray-400 text-sm">vs last month</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <TreePine className="text-green-400" size={24} />
            <span className="text-green-400 text-sm font-medium">
              {carbonData.offsetPercentage}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Offset</h3>
          <p className="text-gray-400 text-sm">Carbon neutral goal</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="text-yellow-400" size={24} />
            <span className="text-yellow-400 text-sm font-medium">8 months</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Net Zero</h3>
          <p className="text-gray-400 text-sm">Target date</p>
        </div>
      </div>

      {/* Emissions Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Emissions Breakdown</h3>
          
          <div className="space-y-4">
            {Object.entries(carbonData.breakdown).map(([category, data]) => (
              <div key={category} className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {category === 'vehicles' && <Truck size={16} className="text-blue-400" />}
                    {category === 'warehouses' && <Factory size={16} className="text-orange-400" />}
                    {category === 'packaging' && <Recycle size={16} className="text-green-400" />}
                    {category === 'shipping' && <Plane size={16} className="text-purple-400" />}
                    <span className="text-white font-medium capitalize">{category}</span>
                  </div>
                  <span className={`text-sm font-medium ${data.trend < 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {data.trend > 0 ? '+' : ''}{data.trend}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-white">{data.amount} kg</span>
                  <span className="text-gray-400 text-sm">{data.percentage}%</span>
                </div>
                
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="h-2 bg-blue-400 rounded-full transition-all duration-300"
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sustainability Metrics</h3>
          
          <div className="space-y-4">
            {sustainabilityMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const progress = (metric.value / metric.target) * 100;
              
              return (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon size={16} className="text-green-400" />
                      <span className="text-white font-medium">{metric.label}</span>
                    </div>
                    <span className="text-gray-400 text-sm">Target: {metric.target}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-white">{metric.value}%</span>
                    <span className={`text-sm font-medium ${
                      metric.value >= metric.target ? 'text-green-400' : 'text-orange-400'
                    }`}>
                      {metric.value >= metric.target ? 'Target Met' : 'In Progress'}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progress >= 100 ? 'bg-green-400' : 'bg-orange-400'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Carbon Offset Projects */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Carbon Offset Projects</h3>
          <div className="flex items-center space-x-2 bg-green-900/30 px-3 py-2 rounded-lg">
            <TreePine className="text-green-400" size={16} />
            <span className="text-green-400 text-sm">
              {offsetProjects.reduce((sum, p) => sum + p.offsetAmount, 0).toLocaleString()} kg CO₂ offset
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {offsetProjects.map((project) => {
            const ProjectIcon = getProjectIcon(project.type);
            
            return (
              <div key={project.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <ProjectIcon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{project.name}</h4>
                      <p className="text-gray-400 text-sm">{project.location}</p>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">CO₂ Offset</span>
                    <span className="text-green-400 font-semibold">{project.offsetAmount} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Cost per ton</span>
                    <span className="text-white">${project.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Certification</span>
                    <span className="text-blue-400">{project.certification}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{project.impact}</p>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm transition-colors">
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">AI Sustainability Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="text-green-400" size={20} />
              <h4 className="text-green-400 font-medium">Route Optimization</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              AI identified 3 route improvements that could reduce emissions by 340 kg CO₂ monthly
            </p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-sm">Potential savings: $2,400/month</span>
              <button className="text-green-400 hover:text-green-300 text-sm">Apply →</button>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Battery className="text-blue-400" size={20} />
              <h4 className="text-blue-400 font-medium">Fleet Electrification</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Replace 5 diesel trucks with electric vehicles to reduce emissions by 1,200 kg CO₂ monthly
            </p>
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-sm">ROI: 18 months</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Plan →</button>
            </div>
          </div>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Recycle className="text-purple-400" size={20} />
              <h4 className="text-purple-400 font-medium">Packaging Optimization</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Switch to biodegradable packaging to reduce carbon footprint by 15% and improve brand image
            </p>
            <div className="flex items-center justify-between">
              <span className="text-purple-400 text-sm">Cost increase: 8%</span>
              <button className="text-purple-400 hover:text-purple-300 text-sm">Evaluate →</button>
            </div>
          </div>
          
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Sun className="text-orange-400" size={20} />
              <h4 className="text-orange-400 font-medium">Renewable Energy</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Install solar panels at 2 warehouses to achieve 100% renewable energy and save $18,000 annually
            </p>
            <div className="flex items-center justify-between">
              <span className="text-orange-400 text-sm">Payback: 4.2 years</span>
              <button className="text-orange-400 hover:text-orange-300 text-sm">Quote →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonTracking;