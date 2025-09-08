import React from 'react';
import { 
  Truck, 
  Package, 
  Clock, 
  TrendingUp, 
  Plane, 
  MapPin,
  Zap,
  DollarSign
} from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Active Vehicles',
      value: '847',
      change: '+12%',
      changeType: 'positive',
      icon: Truck,
      color: 'blue'
    },
    {
      title: 'Deliveries Today',
      value: '2,341',
      change: '+8%',
      changeType: 'positive',
      icon: Package,
      color: 'green'
    },
    {
      title: 'Avg Delivery Time',
      value: '2.4h',
      change: '-15%',
      changeType: 'positive',
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'Drone Operations',
      value: '156',
      change: '+24%',
      changeType: 'positive',
      icon: Plane,
      color: 'purple'
    },
    {
      title: 'AI Optimizations',
      value: '1,234',
      change: '+31%',
      changeType: 'positive',
      icon: Zap,
      color: 'yellow'
    },
    {
      title: 'Cost Savings',
      value: '$45.2K',
      change: '+18%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Vector Searches',
      value: '2.1K',
      change: '+42%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Data Processed',
      value: '847GB',
      change: '+28%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'cyan'
    },
    {
      title: 'Carbon Offset',
      value: '2.1T',
      change: '+45%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Blockchain Txns',
      value: '15.8K',
      change: '+67%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'IoT Devices',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      title: 'ML Accuracy',
      value: '96.8%',
      change: '+3.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'blue'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      green: 'bg-green-500/10 text-green-400 border-green-500/20',
      orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
                <Icon size={24} />
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;