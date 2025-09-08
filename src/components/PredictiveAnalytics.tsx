import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Database,
  Activity,
  Calendar,
  DollarSign,
  Truck,
  Package,
  MapPin,
  Battery
} from 'lucide-react';

const PredictiveAnalytics: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('demand_forecast');
  const [timeHorizon, setTimeHorizon] = useState('7d');
  const [isTraining, setIsTraining] = useState(false);

  const [predictions, setPredictions] = useState({
    demandForecast: [
      { date: '2024-12-16', demand: 1247, confidence: 94, category: 'Medical' },
      { date: '2024-12-17', demand: 1389, confidence: 91, category: 'Medical' },
      { date: '2024-12-18', demand: 1156, confidence: 89, category: 'Medical' },
      { date: '2024-12-19', demand: 1445, confidence: 92, category: 'Medical' },
      { date: '2024-12-20', demand: 1678, confidence: 88, category: 'Medical' }
    ],
    maintenancePredictions: [
      { vehicle: 'TRK-001', component: 'Brake Pads', probability: 87, daysUntil: 5, cost: 450 },
      { vehicle: 'TRK-003', component: 'Battery', probability: 92, daysUntil: 12, cost: 1200 },
      { vehicle: 'DRN-007', component: 'Propellers', probability: 76, daysUntil: 18, cost: 320 },
      { vehicle: 'TRK-005', component: 'Transmission', probability: 68, daysUntil: 25, cost: 2800 }
    ],
    routeOptimization: [
      { route: 'Downtown-Medical', improvement: 15, savings: 240, confidence: 94 },
      { route: 'Industrial-Residential', improvement: 22, savings: 380, confidence: 89 },
      { route: 'Airport-Downtown', improvement: 8, savings: 120, confidence: 96 }
    ]
  });

  const models = [
    { id: 'demand_forecast', name: 'Demand Forecasting', icon: TrendingUp, accuracy: 94.2 },
    { id: 'maintenance_prediction', name: 'Maintenance Prediction', icon: AlertTriangle, accuracy: 91.7 },
    { id: 'route_optimization', name: 'Route Optimization', icon: MapPin, accuracy: 96.8 },
    { id: 'inventory_planning', name: 'Inventory Planning', icon: Package, accuracy: 89.3 },
    { id: 'energy_consumption', name: 'Energy Consumption', icon: Battery, accuracy: 92.5 }
  ];

  const handleTrainModel = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      // Simulate model improvement
      setPredictions(prev => ({
        ...prev,
        demandForecast: prev.demandForecast.map(p => ({
          ...p,
          confidence: Math.min(99, p.confidence + Math.random() * 3)
        }))
      }));
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Predictive Analytics</h1>
          <p className="text-gray-400">Advanced ML models powered by TiDB Serverless for logistics forecasting</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="1d">Next 24 Hours</option>
            <option value="7d">Next 7 Days</option>
            <option value="30d">Next 30 Days</option>
            <option value="90d">Next 90 Days</option>
          </select>
          
          <button
            onClick={handleTrainModel}
            disabled={isTraining}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            {isTraining ? (
              <>
                <Activity size={16} className="animate-spin" />
                <span>Training...</span>
              </>
            ) : (
              <>
                <Brain size={16} />
                <span>Train Models</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Model Selection */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">ML Model Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {models.map((model) => {
            const Icon = model.icon;
            const isSelected = selectedModel === model.id;
            
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isSelected 
                    ? 'border-purple-500 bg-purple-900/20' 
                    : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon size={20} className={isSelected ? 'text-purple-400' : 'text-gray-400'} />
                  <span className={`text-sm font-medium ${
                    model.accuracy > 95 ? 'text-green-400' :
                    model.accuracy > 90 ? 'text-blue-400' : 'text-orange-400'
                  }`}>
                    {model.accuracy}%
                  </span>
                </div>
                <h4 className="text-white font-medium text-sm mb-1">{model.name}</h4>
                <p className="text-gray-400 text-xs">Accuracy</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Predictions Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand Forecasting */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Demand Forecasting</h3>
            <div className="flex items-center space-x-2 bg-green-900/30 px-3 py-2 rounded-lg">
              <TrendingUp className="text-green-400" size={16} />
              <span className="text-green-400 text-sm">+23% trend</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {predictions.demandForecast.map((forecast, index) => (
              <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">
                    {new Date(forecast.date).toLocaleDateString()}
                  </span>
                  <span className="text-blue-400 text-sm">{forecast.confidence}% confidence</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{forecast.demand.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">{forecast.category} deliveries</p>
                  </div>
                  
                  <div className="w-16 h-2 bg-gray-600 rounded-full">
                    <div 
                      className="h-2 bg-blue-400 rounded-full transition-all duration-300"
                      style={{ width: `${forecast.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Predictions */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Maintenance Predictions</h3>
            <div className="flex items-center space-x-2 bg-orange-900/30 px-3 py-2 rounded-lg">
              <AlertTriangle className="text-orange-400" size={16} />
              <span className="text-orange-400 text-sm">4 alerts</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {predictions.maintenancePredictions.map((prediction, index) => (
              <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-white font-medium">{prediction.vehicle}</h4>
                    <p className="text-gray-400 text-sm">{prediction.component}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    prediction.probability > 85 ? 'bg-red-400/10 text-red-400' :
                    prediction.probability > 70 ? 'bg-orange-400/10 text-orange-400' :
                    'bg-yellow-400/10 text-yellow-400'
                  }`}>
                    {prediction.probability}% risk
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-400">
                      <Clock size={14} className="inline mr-1" />
                      {prediction.daysUntil} days
                    </span>
                    <span className="text-gray-400">
                      <DollarSign size={14} className="inline mr-1" />
                      ${prediction.cost}
                    </span>
                  </div>
                  
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Schedule →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Route Optimization Insights */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Route Optimization Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {predictions.routeOptimization.map((route, index) => (
            <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{route.route}</h4>
                <span className="text-green-400 text-sm">{route.confidence}% confidence</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Improvement</span>
                  <span className="text-green-400 font-semibold">+{route.improvement}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Daily Savings</span>
                  <span className="text-blue-400 font-semibold">${route.savings}</span>
                </div>
              </div>
              
              <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                Apply Optimization
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Model Training Progress</h3>
          
          <div className="space-y-4">
            {models.map((model, index) => (
              <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{model.name}</span>
                  <span className="text-gray-400 text-sm">
                    {isTraining && selectedModel === model.id ? 'Training...' : 'Ready'}
                  </span>
                </div>
                
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isTraining && selectedModel === model.id ? 'bg-purple-400' : 'bg-green-400'
                    }`}
                    style={{ width: `${model.accuracy}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>Accuracy: {model.accuracy}%</span>
                  <span>Last trained: 2h ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Prediction Impact</h3>
          
          <div className="space-y-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-green-400 font-medium">Cost Savings</h4>
                <DollarSign className="text-green-400" size={20} />
              </div>
              <p className="text-2xl font-bold text-white mb-1">$127,400</p>
              <p className="text-gray-400 text-sm">Saved this month through predictions</p>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-blue-400 font-medium">Efficiency Gain</h4>
                <Target className="text-blue-400" size={20} />
              </div>
              <p className="text-2xl font-bold text-white mb-1">+18.7%</p>
              <p className="text-gray-400 text-sm">Overall operational efficiency</p>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-purple-400 font-medium">Downtime Prevented</h4>
                <CheckCircle className="text-purple-400" size={20} />
              </div>
              <p className="text-2xl font-bold text-white mb-1">47 hours</p>
              <p className="text-gray-400 text-sm">Vehicle downtime avoided</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;