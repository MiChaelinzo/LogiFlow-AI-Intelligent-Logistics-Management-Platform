import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Brain,
  Database,
  Zap,
  Target,
  DollarSign,
  Clock,
  Truck,
  Plane
} from 'lucide-react';

const AdvancedAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsType, setAnalyticsType] = useState('performance');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const performanceMetrics = [
    { label: 'Fleet Efficiency', value: 94.2, change: +8.1, target: 95 },
    { label: 'Delivery Success Rate', value: 98.7, change: +2.3, target: 99 },
    { label: 'Fuel Efficiency', value: 87.5, change: +12.4, target: 90 },
    { label: 'AI Decision Accuracy', value: 96.8, change: +4.2, target: 97 },
    { label: 'Route Optimization', value: 91.3, change: +15.7, target: 92 },
    { label: 'Maintenance Prediction', value: 89.6, change: +6.8, target: 90 }
  ];

  const costAnalysis = [
    { category: 'Fuel Costs', current: 45200, previous: 52800, savings: 7600 },
    { category: 'Maintenance', current: 23400, previous: 28900, savings: 5500 },
    { category: 'Labor Costs', current: 67800, previous: 71200, savings: 3400 },
    { category: 'Insurance', current: 12300, previous: 12800, savings: 500 },
    { category: 'Vehicle Depreciation', current: 34500, previous: 36200, savings: 1700 }
  ];

  const aiInsights = [
    {
      type: 'prediction',
      title: 'Demand Surge Predicted',
      description: 'TiDB AI predicts 35% increase in medical deliveries next week',
      confidence: 94,
      impact: 'High',
      action: 'Increase medical drone fleet by 3 units'
    },
    {
      type: 'optimization',
      title: 'Route Efficiency Opportunity',
      description: 'Vector search identified optimal route patterns for Sector 7',
      confidence: 91,
      impact: 'Medium',
      action: 'Apply new routing algorithm'
    },
    {
      type: 'maintenance',
      title: 'Predictive Maintenance Alert',
      description: 'Similar vehicle patterns suggest brake service needed',
      confidence: 87,
      impact: 'High',
      action: 'Schedule maintenance for 3 vehicles'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getMetricColor = (value: number, target: number) => {
    if (value >= target) return 'text-green-400';
    if (value >= target * 0.9) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Advanced Analytics</h1>
          <p className="text-gray-400">Deep insights powered by TiDB Serverless AI and vector search</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <RefreshCw size={16} className={`text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Analytics Type Selector */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          {[
            { id: 'performance', label: 'Performance', icon: BarChart3 },
            { id: 'costs', label: 'Cost Analysis', icon: DollarSign },
            { id: 'ai', label: 'AI Insights', icon: Brain },
            { id: 'predictive', label: 'Predictive', icon: Target }
          ].map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setAnalyticsType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  analyticsType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Icon size={16} />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Performance Analytics */}
      {analyticsType === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
            
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{metric.label}</h4>
                    <span className={`text-sm font-medium ${metric.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl font-bold ${getMetricColor(metric.value, metric.target)}`}>
                      {metric.value}%
                    </span>
                    <span className="text-gray-400 text-sm">Target: {metric.target}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        metric.value >= metric.target ? 'bg-green-400' :
                        metric.value >= metric.target * 0.9 ? 'bg-orange-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.min(metric.value, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Fleet Distribution</h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-600"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56 * 0.7} ${2 * Math.PI * 56}`}
                      className="text-blue-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">847</p>
                      <p className="text-gray-400 text-xs">Total Vehicles</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck size={16} className="text-blue-400" />
                    <span className="text-gray-300">Trucks</span>
                  </div>
                  <span className="text-white font-medium">592 (70%)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Plane size={16} className="text-purple-400" />
                    <span className="text-gray-300">Drones</span>
                  </div>
                  <span className="text-white font-medium">255 (30%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cost Analysis */}
      {analyticsType === 'costs' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Cost Analysis & Savings</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Monthly Cost Breakdown</h4>
              
              {costAnalysis.map((cost, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-white font-medium">{cost.category}</h5>
                    <span className="text-green-400 text-sm font-medium">
                      -${cost.savings.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Current</span>
                    <span className="text-white font-semibold">${cost.current.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Previous</span>
                    <span className="text-gray-400">${cost.previous.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <h4 className="text-green-400 font-medium mb-4">Total Monthly Savings</h4>
              
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-green-400 mb-2">
                  ${costAnalysis.reduce((sum, cost) => sum + cost.savings, 0).toLocaleString()}
                </p>
                <p className="text-gray-400">Saved this month through AI optimization</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Annual Projection</span>
                  <span className="text-green-400 font-semibold">
                    ${(costAnalysis.reduce((sum, cost) => sum + cost.savings, 0) * 12).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ROI on AI Investment</span>
                  <span className="text-green-400 font-semibold">340%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights */}
      {analyticsType === 'ai' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">TiDB AI Performance Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Brain className="text-purple-400" size={20} />
                  <span className="text-green-400 text-sm">+18%</span>
                </div>
                <h4 className="text-2xl font-bold text-white">1,247</h4>
                <p className="text-gray-400 text-sm">AI Decisions Today</p>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Database className="text-blue-400" size={20} />
                  <span className="text-green-400 text-sm">+24%</span>
                </div>
                <h4 className="text-2xl font-bold text-white">856</h4>
                <p className="text-gray-400 text-sm">Vector Searches</p>
              </div>
              
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="text-orange-400" size={20} />
                  <span className="text-green-400 text-sm">+12%</span>
                </div>
                <h4 className="text-2xl font-bold text-white">423</h4>
                <p className="text-gray-400 text-sm">Automations Run</p>
              </div>
              
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Target className="text-green-400" size={20} />
                  <span className="text-green-400 text-sm">+8%</span>
                </div>
                <h4 className="text-2xl font-bold text-white">96.8%</h4>
                <p className="text-gray-400 text-sm">AI Accuracy</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-medium">Recent AI Insights</h4>
              
              {aiInsights.map((insight, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="text-white font-medium mb-1">{insight.title}</h5>
                      <p className="text-gray-400 text-sm">{insight.description}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-blue-400 font-semibold">{insight.confidence}%</p>
                      <p className="text-gray-400 text-xs">Confidence</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      insight.impact === 'High' ? 'bg-red-400/10 text-red-400' :
                      insight.impact === 'Medium' ? 'bg-orange-400/10 text-orange-400' :
                      'bg-green-400/10 text-green-400'
                    }`}>
                      {insight.impact} Impact
                    </span>
                    
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      {insight.action} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Predictive Analytics */}
      {analyticsType === 'predictive' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Demand Forecasting</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Next 7 Days Prediction</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Medical Deliveries</span>
                    <span className="text-white">+35% ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">E-commerce Packages</span>
                    <span className="text-white">+12% ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Food Delivery</span>
                    <span className="text-white">-8% ↘</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-medium mb-2">Maintenance Predictions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle size={14} className="text-orange-400" />
                    <span className="text-gray-300">TRK-001: Brake service in 5 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle size={14} className="text-orange-400" />
                    <span className="text-gray-300">DRN-007: Battery replacement in 12 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-blue-400" />
                    <span className="text-gray-300">TRK-003: Routine service in 18 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Optimization Opportunities</h3>
            
            <div className="space-y-4">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Route Optimization</h4>
                <p className="text-gray-300 text-sm mb-3">
                  TiDB vector search identified 3 route improvements that could save $2,400 daily
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                  Apply Optimizations
                </button>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2">Fleet Rebalancing</h4>
                <p className="text-gray-300 text-sm mb-3">
                  AI suggests moving 2 drones to Sector 7 for 20% efficiency gain
                </p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  Implement Changes
                </button>
              </div>
              
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-400 font-medium mb-2">Energy Optimization</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Switch to off-peak charging for 12% cost reduction
                </p>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg transition-colors">
                  Update Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalytics;