import React, { useState } from 'react';
import { 
  Brain, 
  Zap, 
  Settings, 
  TrendingUp,
  Target,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Edit,
  Trash2,
  Activity,
  BarChart3,
  Cpu,
  Database
} from 'lucide-react';

const AIAutomation: React.FC = () => {
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null);
  const [aiMode, setAiMode] = useState('adaptive');

  const automations = [
    {
      id: 'AUTO-001',
      name: 'Dynamic Route Optimization',
      description: 'Continuously optimizes delivery routes based on real-time traffic, weather, and demand patterns',
      status: 'active',
      model: 'SEA-LION-Route-v2.1',
      efficiency: 94,
      savings: '$2,340/day',
      triggers: ['Traffic Update', 'Weather Change', 'New Order'],
      lastRun: '2 minutes ago',
      nextRun: 'Continuous',
      actions: 847,
      successRate: 98.2
    },
    {
      id: 'AUTO-002',
      name: 'Predictive Maintenance',
      description: 'Analyzes vehicle telemetry to predict maintenance needs and prevent breakdowns',
      status: 'active',
      model: 'SEA-LION-Predict-v1.8',
      efficiency: 91,
      savings: '$1,890/week',
      triggers: ['Sensor Data', 'Mileage Threshold', 'Performance Drop'],
      lastRun: '15 minutes ago',
      nextRun: 'Every hour',
      actions: 234,
      successRate: 96.7
    },
    {
      id: 'AUTO-003',
      name: 'Inventory Rebalancing',
      description: 'Automatically redistributes inventory across warehouses based on demand forecasting',
      status: 'paused',
      model: 'SEA-LION-Inventory-v3.0',
      efficiency: 87,
      savings: '$980/day',
      triggers: ['Stock Level', 'Demand Spike', 'Seasonal Pattern'],
      lastRun: '2 hours ago',
      nextRun: 'Paused',
      actions: 156,
      successRate: 94.1
    },
    {
      id: 'AUTO-004',
      name: 'Emergency Response',
      description: 'Automatically dispatches emergency vehicles and reroutes traffic during critical situations',
      status: 'standby',
      model: 'SEA-LION-Emergency-v1.5',
      efficiency: 99,
      savings: 'Critical Response',
      triggers: ['Emergency Alert', 'Medical Request', 'Disaster Event'],
      lastRun: '3 days ago',
      nextRun: 'On demand',
      actions: 12,
      successRate: 100
    },
    {
      id: 'AUTO-005',
      name: 'Energy Optimization',
      description: 'Optimizes charging schedules and energy consumption across the entire fleet',
      status: 'active',
      model: 'SEA-LION-Energy-v2.3',
      efficiency: 92,
      savings: '$1,560/month',
      triggers: ['Battery Level', 'Energy Prices', 'Grid Load'],
      lastRun: '5 minutes ago',
      nextRun: 'Every 10 minutes',
      actions: 423,
      successRate: 97.8
    }
  ];

  const aiMetrics = [
    {
      title: 'AI Decisions/Hour',
      value: '2,847',
      change: '+18%',
      icon: Brain,
      color: 'purple'
    },
    {
      title: 'Automation Success',
      value: '97.2%',
      change: '+2.1%',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Cost Savings',
      value: '$45.2K',
      change: '+24%',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Processing Speed',
      value: '1.2ms',
      change: '-15%',
      icon: Zap,
      color: 'yellow'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'paused':
        return 'text-orange-400 bg-orange-400/10';
      case 'standby':
        return 'text-blue-400 bg-blue-400/10';
      case 'error':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play size={16} className="text-green-400" />;
      case 'paused':
        return <Pause size={16} className="text-orange-400" />;
      case 'standby':
        return <Clock size={16} className="text-blue-400" />;
      case 'error':
        return <AlertTriangle size={16} className="text-red-400" />;
      default:
        return <Clock size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Automation</h1>
          <p className="text-gray-400">Advanced SEA-LION AI models powering intelligent logistics automation</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-purple-900/30 px-4 py-2 rounded-lg">
            <Brain className="text-purple-400" size={20} />
            <span className="text-purple-400 font-medium">SEA-LION AI</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus size={20} />
            <span>New Automation</span>
          </button>
        </div>
      </div>

      {/* AI Control Center */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">SEA-LION AI Control Center</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">AI Mode</h4>
            <select 
              value={aiMode}
              onChange={(e) => setAiMode(e.target.value)}
              className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="adaptive">Adaptive Learning</option>
              <option value="conservative">Conservative</option>
              <option value="aggressive">Aggressive Optimization</option>
              <option value="maintenance">Maintenance Mode</option>
            </select>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Model Version</h4>
            <div className="flex items-center space-x-2">
              <Cpu size={16} className="text-purple-400" />
              <span className="text-white">SEA-LION v3.2.1</span>
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Training Status</h4>
            <div className="flex items-center space-x-2">
              <Activity size={16} className="text-green-400" />
              <span className="text-green-400">Continuous Learning</span>
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">System Health</h4>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-green-400">Optimal</span>
            </div>
          </div>
        </div>

        {/* AI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {aiMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <Icon size={20} className={`text-${metric.color}-400`} />
                  <span className="text-green-400 text-sm font-medium">{metric.change}</span>
                </div>
                <h4 className="text-2xl font-bold text-white">{metric.value}</h4>
                <p className="text-gray-400 text-sm">{metric.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Automation Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Active Automations</h3>
          
          {automations.map((automation) => (
            <div
              key={automation.id}
              className={`bg-gray-800 rounded-xl border transition-all duration-200 cursor-pointer ${
                selectedAutomation === automation.id ? 'border-purple-500' : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedAutomation(selectedAutomation === automation.id ? null : automation.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Brain size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{automation.name}</h4>
                      <p className="text-gray-400 text-sm">{automation.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(automation.status)}`}>
                      {getStatusIcon(automation.status)}
                      <span className="capitalize">{automation.status}</span>
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">{automation.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">AI Model</p>
                    <p className="text-white text-sm font-medium">{automation.model}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Success Rate</p>
                    <p className="text-green-400 text-sm font-medium">{automation.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Savings</p>
                    <p className="text-blue-400 text-sm font-medium">{automation.savings}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Actions</p>
                    <p className="text-white text-sm font-medium">{automation.actions}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-gray-400">Last run: <span className="text-white">{automation.lastRun}</span></p>
                    <p className="text-gray-400">Next run: <span className="text-white">{automation.nextRun}</span></p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                      <Play size={14} className="text-white" />
                    </button>
                    <button className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
                      <Pause size={14} className="text-white" />
                    </button>
                    <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      <Edit size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
              
              {selectedAutomation === automation.id && (
                <div className="border-t border-gray-700 p-4 space-y-4">
                  {/* Triggers */}
                  <div>
                    <h5 className="text-white font-medium mb-3">Automation Triggers</h5>
                    <div className="flex flex-wrap gap-2">
                      {automation.triggers.map((trigger, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Performance Chart */}
                  <div>
                    <h5 className="text-white font-medium mb-3">Performance Metrics</h5>
                    <div className="h-32 bg-gray-700/30 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 size={32} className="text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">Performance Chart</p>
                        <p className="text-gray-500 text-xs">Efficiency: {automation.efficiency}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Model Management */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">SEA-LION Model Management</h3>
              <p className="text-gray-400 text-sm">Monitor and manage AI model performance</p>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Brain className="text-purple-400" size={24} />
                    <div>
                      <h4 className="text-white font-medium">SEA-LION Core</h4>
                      <p className="text-gray-400 text-sm">v3.2.1 • Production</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">97.8%</p>
                    <p className="text-gray-400 text-xs">Accuracy</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Inference Time</p>
                    <p className="text-white font-medium">1.2ms</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Memory Usage</p>
                    <p className="text-white font-medium">2.1GB</p>
                  </div>
                  <div>
                    <p className="text-gray-400">GPU Utilization</p>
                    <p className="text-white font-medium">78%</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-white font-medium">Specialized Models</h4>
                
                {[
                  { name: 'Route Optimizer', version: 'v2.1', status: 'Active', accuracy: '94.2%' },
                  { name: 'Demand Predictor', version: 'v1.8', status: 'Active', accuracy: '91.7%' },
                  { name: 'Maintenance Predictor', version: 'v1.5', status: 'Training', accuracy: '89.3%' },
                  { name: 'Energy Optimizer', version: 'v2.3', status: 'Active', accuracy: '96.1%' }
                ].map((model, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-white font-medium">{model.name}</h5>
                        <p className="text-gray-400 text-sm">{model.version} • {model.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-medium">{model.accuracy}</p>
                        <p className="text-gray-400 text-xs">Accuracy</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training & Optimization */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Model Training</h3>
              <p className="text-gray-400 text-sm">Continuous learning and optimization</p>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Database className="text-blue-400" size={20} />
                    <div>
                      <h4 className="text-white font-medium">Training Data</h4>
                      <p className="text-gray-400 text-sm">Real-time data ingestion</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 font-semibold">2.4TB</p>
                    <p className="text-gray-400 text-xs">Processed Today</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="text-gray-400 text-xs mt-1">Training Progress: 78%</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  Start Training
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors">
                  Export Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAutomation;