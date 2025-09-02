import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Zap, 
  Database, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  Brain,
  BarChart3,
  RefreshCw
} from 'lucide-react';

const RealTimeMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState({
    tidbConnections: 47,
    vectorQueries: 1234,
    aiDecisions: 856,
    dataIngested: 2.4,
    responseTime: 1.2,
    uptime: 99.97
  });

  const [systemHealth, setSystemHealth] = useState([
    { component: 'TiDB Serverless', status: 'healthy', latency: '1.2ms', uptime: '99.97%' },
    { component: 'Vector Search', status: 'healthy', latency: '0.8ms', uptime: '99.99%' },
    { component: 'AI Models', status: 'healthy', latency: '245ms', uptime: '99.95%' },
    { component: 'WebSocket', status: 'healthy', latency: '12ms', uptime: '99.98%' }
  ]);

  const [realtimeEvents, setRealtimeEvents] = useState([
    { id: 1, type: 'vector_search', message: 'Similar vehicle pattern found for TRK-001', timestamp: new Date(), severity: 'info' },
    { id: 2, type: 'ai_decision', message: 'Route optimization completed - 15% efficiency gain', timestamp: new Date(Date.now() - 30000), severity: 'success' },
    { id: 3, type: 'maintenance', message: 'Predictive maintenance scheduled for DRN-007', timestamp: new Date(Date.now() - 60000), severity: 'warning' },
    { id: 4, type: 'emergency', message: 'Emergency response activated - vehicles dispatched', timestamp: new Date(Date.now() - 120000), severity: 'critical' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        tidbConnections: prev.tidbConnections + Math.floor(Math.random() * 5 - 2),
        vectorQueries: prev.vectorQueries + Math.floor(Math.random() * 10),
        aiDecisions: prev.aiDecisions + Math.floor(Math.random() * 3),
        dataIngested: prev.dataIngested + Math.random() * 0.1,
        responseTime: Math.max(0.5, prev.responseTime + (Math.random() - 0.5) * 0.2)
      }));

      // Add new event occasionally
      if (Math.random() < 0.3) {
        const eventTypes = ['vector_search', 'ai_decision', 'maintenance', 'optimization'];
        const messages = [
          'Vector similarity search completed for route analysis',
          'AI agent workflow executed successfully',
          'Maintenance prediction updated for fleet vehicle',
          'Route optimization improved delivery efficiency'
        ];
        
        const newEvent = {
          id: Date.now(),
          type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date(),
          severity: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)] as 'info' | 'success' | 'warning'
        };

        setRealtimeEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400 bg-green-400/10';
      case 'warning':
        return 'text-orange-400 bg-orange-400/10';
      case 'critical':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-orange-400';
      case 'critical':
        return 'text-red-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Real-Time Monitoring</h1>
        <p className="text-gray-400">Live TiDB Serverless performance and AI agent activity monitoring</p>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Database className="text-orange-400" size={20} />
            <TrendingUp className="text-green-400" size={16} />
          </div>
          <h3 className="text-2xl font-bold text-white">{metrics.tidbConnections}</h3>
          <p className="text-gray-400 text-sm">TiDB Connections</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-purple-400" size={20} />
            <TrendingUp className="text-green-400" size={16} />
          </div>
          <h3 className="text-2xl font-bold text-white">{metrics.vectorQueries.toLocaleString()}</h3>
          <p className="text-gray-400 text-sm">Vector Queries</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Brain className="text-blue-400" size={20} />
            <TrendingUp className="text-green-400" size={16} />
          </div>
          <h3 className="text-2xl font-bold text-white">{metrics.aiDecisions}</h3>
          <p className="text-gray-400 text-sm">AI Decisions</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <HardDrive className="text-green-400" size={20} />
            <TrendingUp className="text-green-400" size={16} />
          </div>
          <h3 className="text-2xl font-bold text-white">{metrics.dataIngested.toFixed(1)}TB</h3>
          <p className="text-gray-400 text-sm">Data Ingested</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="text-yellow-400" size={20} />
            <TrendingUp className="text-green-400" size={16} />
          </div>
          <h3 className="text-2xl font-bold text-white">{metrics.responseTime.toFixed(1)}ms</h3>
          <p className="text-gray-400 text-sm">Response Time</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-400" size={20} />
            <TrendingUp className="text-green-400" size={16} />
          </div>
          <h3 className="text-2xl font-bold text-white">{metrics.uptime}%</h3>
          <p className="text-gray-400 text-sm">Uptime</p>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Health Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemHealth.map((component, index) => (
            <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{component.component}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                  {component.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Latency</span>
                  <span className="text-white">{component.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-green-400">{component.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Live Event Stream</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Live</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {realtimeEvents.map((event) => (
                <div key={event.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(event.severity).replace('text-', 'bg-')}`}></div>
                      <span className="text-white text-sm font-medium capitalize">{event.type.replace('_', ' ')}</span>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {event.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{event.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
          </div>
          
          <div className="p-4">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">TiDB Query Performance</span>
                  <span className="text-green-400 text-sm">{metrics.responseTime.toFixed(1)}ms avg</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Vector Search Accuracy</span>
                  <span className="text-blue-400 text-sm">96.8%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '96.8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">AI Model Confidence</span>
                  <span className="text-purple-400 text-sm">94.2%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">System Efficiency</span>
                  <span className="text-orange-400 text-sm">97.1%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full" style={{ width: '97.1%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;