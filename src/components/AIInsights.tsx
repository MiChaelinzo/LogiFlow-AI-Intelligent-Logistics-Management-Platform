import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  Brain, 
  Target,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';

interface AIInsightsProps {
  expanded?: boolean;
}

const AIInsights: React.FC<AIInsightsProps> = ({ expanded = false }) => {
  const [insights, setInsights] = React.useState([
    {
      id: 1,
      type: 'optimization',
      title: 'Route Optimization Opportunity',
      description: 'AI detected 15% efficiency gain by rerouting 3 trucks through Highway 285',
      impact: 'Save $2,400/day',
      confidence: 94,
      action: 'Apply Route',
      priority: 'high',
      applied: false
    },
    {
      id: 2,
      type: 'prediction',
      title: 'Demand Forecast Alert',
      description: 'Medical supplies demand expected to increase 40% next week in Sector 7',
      impact: 'Prevent stockouts',
      confidence: 87,
      action: 'Increase Stock',
      priority: 'medium',
      applied: false
    },
    {
      id: 3,
      type: 'maintenance',
      title: 'Predictive Maintenance',
      description: 'Truck Alpha-3 shows early battery degradation patterns. Service recommended',
      impact: 'Prevent 2-day downtime',
      confidence: 91,
      action: 'Schedule Service',
      priority: 'high',
      applied: false
    },
    {
      id: 4,
      type: 'cost',
      title: 'Energy Cost Optimization',
      description: 'Switch charging schedule to off-peak hours for 12% cost reduction',
      impact: 'Save $1,800/month',
      confidence: 96,
      action: 'Update Schedule',
      priority: 'medium',
      applied: false
    }
  ]);

  const handleApplyInsight = (id: number) => {
    setInsights(prev => prev.map(insight => 
      insight.id === id ? { ...insight, applied: true } : insight
    ));
  };

  const handleDismissInsight = (id: number) => {
    setInsights(prev => prev.filter(insight => insight.id !== id));
  };
  const metrics = [
    {
      title: 'AI Decisions Today',
      value: '1,247',
      change: '+18%',
      icon: Brain,
      color: 'purple'
    },
    {
      title: 'Cost Savings',
      value: '$45.2K',
      change: '+24%',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Efficiency Gain',
      value: '94.2%',
      change: '+8.1%',
      icon: Target,
      color: 'blue'
    },
    {
      title: 'Predictions Made',
      value: '856',
      change: '+12%',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <Target size={16} className="text-blue-400" />;
      case 'prediction':
        return <TrendingUp size={16} className="text-purple-400" />;
      case 'maintenance':
        return <AlertCircle size={16} className="text-orange-400" />;
      case 'cost':
        return <DollarSign size={16} className="text-green-400" />;
      default:
        return <Brain size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="text-yellow-400" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-white">AI Insights</h3>
              <p className="text-sm text-gray-400">Intelligent analytics and recommendations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-yellow-900/30 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-400 text-sm font-medium">AI Active</span>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-b border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <Icon size={18} className={`text-${metric.color}-400`} />
                    <span className="text-green-400 text-xs font-medium">{metric.change}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{metric.value}</h4>
                  <p className="text-gray-400 text-xs">{metric.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="p-4">
        <div className="space-y-4">
          {insights.slice(0, expanded ? insights.length : 3).map((insight) => (
            <div
              key={insight.id}
              className={`bg-gray-700/30 rounded-lg p-4 border transition-all duration-200 ${
                insight.applied ? 'border-green-500 bg-green-900/20' : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    {getTypeIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{insight.title}</h4>
                    <p className="text-gray-400 text-sm">{insight.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                    {insight.priority}
                  </span>
                  <button
                    onClick={() => handleDismissInsight(insight.id)}
                    className="p-1 hover:bg-gray-600 rounded transition-colors"
                  >
                    <X size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-gray-400 text-xs">Impact</p>
                    <p className="text-green-400 text-sm font-medium">{insight.impact}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-xs">Confidence</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-400 transition-all duration-300"
                          style={{ width: `${insight.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-blue-400 text-sm font-medium">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
                
                {insight.applied ? (
                  <div className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg flex items-center space-x-2">
                    <CheckCircle2 size={16} />
                    <span>Applied</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleApplyInsight(insight.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle2 size={16} />
                    <span>{insight.action}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {!expanded && (
          <div className="mt-4 text-center">
            <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors">
              View All AI Insights →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;