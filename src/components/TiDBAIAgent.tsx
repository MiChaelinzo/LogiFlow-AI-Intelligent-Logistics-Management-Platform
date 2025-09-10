import React, { useState } from 'react';
import { 
  Brain, 
  Database, 
  Zap, 
  Play,
  CheckCircle,
  AlertTriangle,
  Clock,
  Truck,
  MapPin,
  Shield,
  TrendingUp,
  Search,
  Loader,
  Settings,
  Wifi,
  Activity
} from 'lucide-react';
import { realTimeAgent, WorkflowResult } from '../lib/realTimeAgent';
import { createTables, testConnection, getConnection } from '../lib/database';
import { aiService } from '../lib/aiService';

const TiDBAIAgent: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [workflowResults, setWorkflowResults] = useState<Record<string, WorkflowResult>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [realTimeEvents, setRealTimeEvents] = useState<any[]>([]);
  const [monitoringActive, setMonitoringActive] = useState(false);

  const workflows = [
    {
      id: 'predictive_maintenance',
      title: 'Predictive Maintenance Agent',
      description: 'Real-time AI workflow using TiDB Serverless vector search for predictive maintenance',
      icon: Truck,
      color: 'blue',
      steps: [
        'Collect real vehicle telemetry from TiDB Serverless',
        'TiDB vector search for similar vehicle patterns',
        'GPT-4 maintenance analysis with chained reasoning',
        'Create maintenance event in TiDB with vector indexing',
        'Generate actionable recommendations with confidence scores'
      ]
    },
    {
      id: 'route_optimization',
      title: 'Intelligent Route Optimization',
      description: 'Real-time route optimization using TiDB vector search and live traffic data',
      icon: MapPin,
      color: 'green',
      steps: [
        'Generate route data with TiDB Serverless integration',
        'Create vector embeddings for route characteristics',
        'GPT-4 route optimization with real-time analysis',
        'Save optimization results to TiDB with vector indexing',
        'Deploy optimized routes with performance tracking'
      ]
    },
    {
      id: 'emergency_response',
      title: 'Emergency Response Coordinator',
      description: 'Real-time emergency coordination with TiDB vector search and automated dispatch',
      icon: Shield,
      color: 'red',
      steps: [
        'Log emergency event in TiDB Serverless with vector embedding',
        'Vector search for similar emergency patterns in TiDB',
        'Generate AI emergency response strategy with GPT-4',
        'Dispatch emergency vehicles with real-time coordination',
        'Complete multi-step emergency response workflow'
      ]
    }
  ];

  // Check connection status on component mount
  React.useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    setConnectionStatus('connecting');
    try {
      const isConnected = await testConnection();
      setConnectionStatus(isConnected ? 'connected' : 'error');
      setIsInitialized(isConnected);
    } catch (error) {
      setConnectionStatus('error');
      setIsInitialized(false);
    }
  };

  const handleInitializeDatabase = async () => {
    setIsInitializing(true);
    setConnectionStatus('connecting');
    
    try {
      await createTables();
      setIsInitialized(true);
      setConnectionStatus('connected');
      console.log('✅ TiDB Serverless database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      setConnectionStatus('error');
      setIsInitialized(false);
    } finally {
      setIsInitializing(false);
    }
  };

  const startRealTimeMonitoring = () => {
    if (monitoringActive) return;
    
    setMonitoringActive(true);
    const stopMonitoring = realTimeAgent.startMonitoring((event) => {
      setRealTimeEvents(prev => [event, ...prev.slice(0, 9)]);
    });

    // Store cleanup function
    return stopMonitoring;
  };
  const handleRunWorkflow = async (workflowId: string) => {
    setActiveWorkflow(workflowId);
    
    try {
      let result: WorkflowResult;
      
      switch (workflowId) {
        case 'predictive_maintenance':
          result = await realTimeAgent.runPredictiveMaintenanceWorkflow('TRK-001');
          break;
        case 'route_optimization':
          result = await realTimeAgent.runRouteOptimizationWorkflow(
            'New York Distribution Center',
            'Boston Medical Hub'
          );
          break;
        case 'emergency_response':
          result = await realTimeAgent.runEmergencyResponseWorkflow(
            'Medical Emergency - Critical Supplies Needed',
            'Downtown Medical Center, Emergency Bay 3'
          );
          break;
        default:
          throw new Error('Unknown workflow');
      }
      
      setWorkflowResults(prev => ({ ...prev, [workflowId]: result }));
    } catch (error) {
      console.error(`Workflow ${workflowId} failed:`, error);
      setWorkflowResults(prev => ({ 
        ...prev, 
        [workflowId]: {
          success: false,
          workflowId,
          steps: [{
            step: 1,
            name: 'Workflow execution',
            status: 'failed',
            timestamp: new Date(),
            error: error instanceof Error ? error.message : 'Unknown error'
          }],
          recommendations: [],
          data: {},
          executionTime: 0,
          confidence: 0
        }
      }));
    } finally {
      setActiveWorkflow(null);
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-900/30 border-green-500/30 text-green-400';
      case 'connecting':
        return 'bg-yellow-900/30 border-yellow-500/30 text-yellow-400';
      case 'error':
        return 'bg-red-900/30 border-red-500/30 text-red-400';
      default:
        return 'bg-gray-700/30 border-gray-600 text-gray-400';
    }
  };

  const getWorkflowColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      green: 'bg-green-500/10 text-green-400 border-green-500/20',
      red: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">TiDB AI Agent Workflows</h1>
          <p className="text-gray-400">Real-time multi-step AI agents powered by TiDB Serverless vector search</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${getConnectionStatusColor()}`}>
            <Database className="text-orange-400" size={20} />
            <span className="font-medium">
              TiDB {connectionStatus === 'connected' ? 'Connected' : 
                    connectionStatus === 'connecting' ? 'Connecting...' :
                    connectionStatus === 'error' ? 'Error' : 'Disconnected'}
            </span>
            {connectionStatus === 'connecting' && <Loader size={16} className="animate-spin" />}
          </div>
          
          <button
            onClick={checkConnectionStatus}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            title="Test Connection"
          >
            <Wifi size={16} className="text-gray-400" />
          </button>
          
          {!isInitialized && (
            <button 
              onClick={handleInitializeDatabase}
              disabled={isInitializing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {isInitializing ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Initializing...</span>
                </>
              ) : (
                <>
                  <Database size={20} />
                  <span>Setup Database</span>
                </>
              )}
            </button>
          )}
          
          {isInitialized && (
            <button
              onClick={startRealTimeMonitoring}
              disabled={monitoringActive}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {monitoringActive ? (
                <>
                  <Activity size={20} className="animate-pulse" />
                  <span>Monitoring...</span>
                </>
              ) : (
                <>
                  <Activity size={20} />
                  <span>Start Monitoring</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Database Status */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Real TiDB Serverless Integration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className={`rounded-lg p-4 border ${connectionStatus === 'connected' ? 'bg-green-900/20 border-green-500/30' : 'bg-gray-700/30 border-gray-600'}`}>
            <div className="flex items-center justify-between mb-2">
              <Database className={connectionStatus === 'connected' ? 'text-green-400' : 'text-gray-400'} size={20} />
              {connectionStatus === 'connected' ? (
                <CheckCircle className="text-green-400" size={16} />
              ) : connectionStatus === 'connecting' ? (
                <Loader className="text-yellow-400 animate-spin" size={16} />
              ) : (
                <AlertTriangle className="text-red-400" size={16} />
              )}
            </div>
            <h4 className="text-white font-medium">Connection</h4>
            <p className={`text-sm ${connectionStatus === 'connected' ? 'text-green-400' : 'text-gray-400'}`}>
              {connectionStatus === 'connected' ? 'Live' : 
               connectionStatus === 'connecting' ? 'Connecting' :
               connectionStatus === 'error' ? 'Failed' : 'Offline'}
            </p>
          </div>
          
          <div className={`rounded-lg p-4 border ${isInitialized ? 'bg-purple-900/20 border-purple-500/30' : 'bg-gray-700/30 border-gray-600'}`}>
            <div className="flex items-center justify-between mb-2">
              <Search className={isInitialized ? 'text-purple-400' : 'text-gray-400'} size={20} />
              {isInitialized ? (
                <CheckCircle className="text-purple-400" size={16} />
              ) : (
                <Clock className="text-gray-400" size={16} />
              )}
            </div>
            <h4 className="text-white font-medium">Vector Search</h4>
            <p className={`text-sm ${isInitialized ? 'text-purple-400' : 'text-gray-400'}`}>
              {isInitialized ? 'Active' : 'Pending'}
            </p>
          </div>
          
          <div className={`rounded-lg p-4 border ${aiService.isReady() ? 'bg-blue-900/20 border-blue-500/30' : 'bg-gray-700/30 border-gray-600'}`}>
            <div className="flex items-center justify-between mb-2">
              <Brain className={aiService.isReady() ? 'text-blue-400' : 'text-gray-400'} size={20} />
              {aiService.isReady() ? (
                <CheckCircle className="text-blue-400" size={16} />
              ) : (
                <AlertTriangle className="text-gray-400" size={16} />
              )}
            </div>
            <h4 className="text-white font-medium">AI Models</h4>
            <p className={`text-sm ${aiService.isReady() ? 'text-blue-400' : 'text-gray-400'}`}>
              {aiService.isReady() ? 'GPT-4 Ready' : 'Not Configured'}
            </p>
          </div>
          
          <div className={`rounded-lg p-4 border ${monitoringActive ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-gray-700/30 border-gray-600'}`}>
            <div className="flex items-center justify-between mb-2">
              <Activity className={monitoringActive ? 'text-yellow-400' : 'text-gray-400'} size={20} />
              {monitoringActive ? (
                <Activity className="text-yellow-400 animate-pulse" size={16} />
              ) : (
                <Clock className="text-gray-400" size={16} />
              )}
            </div>
            <h4 className="text-white font-medium">Monitoring</h4>
            <p className={`text-sm ${monitoringActive ? 'text-yellow-400' : 'text-gray-400'}`}>
              {monitoringActive ? 'Live' : 'Inactive'}
            </p>
          </div>
          
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="text-orange-400" size={20} />
              <span className="text-orange-400 text-sm">{Object.keys(workflowResults).length}</span>
            </div>
            <h4 className="text-white font-medium">Workflows</h4>
            <p className="text-orange-400 text-sm">Executed</p>
          </div>
        </div>
        
        {/* Real-time Events */}
        {realTimeEvents.length > 0 && (
          <div className="mt-6 bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <h4 className="text-white font-medium mb-3">Real-time Events</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {realTimeEvents.map((event, index) => (
                <div key={index} className="text-sm">
                  <span className="text-blue-400">{event.type}:</span>
                  <span className="text-gray-300 ml-2">{event.vehicle}</span>
                  <span className="text-gray-500 ml-2 text-xs">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Agent Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => {
          const Icon = workflow.icon;
          const result = workflowResults[workflow.id];
          const isRunning = activeWorkflow === workflow.id;
          
          return (
            <div key={workflow.id} className="bg-gray-800 rounded-xl border border-gray-700">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg border ${getWorkflowColor(workflow.color)}`}>
                    <Icon size={24} />
                  </div>
                  
                  <button
                    onClick={() => handleRunWorkflow(workflow.id)}
                    disabled={connectionStatus !== 'connected' || isRunning}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      connectionStatus !== 'connected'
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : isRunning
                        ? 'bg-yellow-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        <span>Executing...</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>Execute</span>
                      </>
                    )}
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{workflow.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{workflow.description}</p>
                
                <div className="space-y-2 mb-4">
                  <h4 className="text-white font-medium text-sm">Workflow Steps:</h4>
                  {workflow.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2 text-xs">
                      <span className="text-gray-500 mt-1">{index + 1}.</span>
                      <span className="text-gray-400">{step}</span>
                    </div>
                  ))}
                </div>
                
                {result && (
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      {result.success ? (
                        <CheckCircle className="text-green-400" size={16} />
                      ) : (
                        <AlertTriangle className="text-red-400" size={16} />
                      )}
                      <span className={`text-sm font-medium ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                        {result.success ? 'Execution Completed' : 'Execution Failed'}
                      </span>
                      <span className="text-gray-400 text-xs">
                        ({result.executionTime}ms)
                      </span>
                    </div>
                    
                    {result.success && (
                      <>
                        <div className="mb-3">
                          <h5 className="text-white font-medium text-sm mb-2">Real Execution Steps:</h5>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {result.steps.map((step, index) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                {step.status === 'completed' ? (
                                  <CheckCircle className="text-green-400" size={12} />
                                ) : step.status === 'failed' ? (
                                  <AlertTriangle className="text-red-400" size={12} />
                                ) : (
                                  <Loader className="text-yellow-400 animate-spin" size={12} />
                                )}
                                <span className="text-gray-400">{step.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-white font-medium text-sm mb-2">AI Recommendations:</h5>
                          <div className="space-y-1">
                            {result.recommendations.slice(0, 3).map((rec, index) => (
                              <div key={index} className="text-xs text-blue-400">{rec}</div>
                            ))}
                          </div>
                          
                          <div className="mt-2 text-xs text-gray-500">
                            Confidence: {result.confidence.toFixed(1)}%
                          </div>
                        </div>
                      </>
                    )}
                    
                    {!result.success && result.steps.length > 0 && (
                      <div className="text-xs text-red-400 mt-2">
                        Error: {result.steps.find(s => s.status === 'failed')?.error || 'Unknown error'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Architecture */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Real Technical Implementation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Live TiDB Serverless Features</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className={connectionStatus === 'connected' ? 'text-green-400' : 'text-gray-400'} size={14} />
                <span className="text-gray-300">Real VECTOR(1536) columns with live data</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className={connectionStatus === 'connected' ? 'text-green-400' : 'text-gray-400'} size={14} />
                <span className="text-gray-300">Live VEC_COSINE_DISTANCE queries</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className={connectionStatus === 'connected' ? 'text-green-400' : 'text-gray-400'} size={14} />
                <span className="text-gray-300">Real-time JSON metadata storage</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className={monitoringActive ? 'text-green-400' : 'text-gray-400'} size={14} />
                <span className="text-gray-300">Live data streaming and ingestion</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Live AI Integration</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className={aiService.isReady() ? 'text-blue-400' : 'text-gray-400'} size={14} />
                <span className="text-gray-300">Real OpenAI GPT-4 API integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className={aiService.isReady() ? 'text-blue-400' : 'text-gray-400'} size={14} />
                <span className="text-gray-300">Live text-embedding-3-small generation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className={Object.keys(workflowResults).length > 0 ? 'text-blue-400' : 'text-gray-400'} size={14} />
                <span className="text-gray-300">Real multi-step workflow execution</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className={Object.keys(workflowResults).length > 0 ? 'text-blue-400' : 'text-gray-400'} size={14} />
                <span className="text-gray-300">Live chained LLM reasoning</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Configuration Status */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <h4 className="text-blue-400 font-medium mb-2">Configuration Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">TiDB Serverless:</p>
              <p className={connectionStatus === 'connected' ? 'text-green-400' : 'text-red-400'}>
                {connectionStatus === 'connected' ? '✅ Connected and operational' : '❌ Configure credentials in .env'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">OpenAI API:</p>
              <p className={aiService.isReady() ? 'text-green-400' : 'text-red-400'}>
                {aiService.isReady() ? '✅ API key configured' : '❌ Add VITE_OPENAI_API_KEY to .env'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiDBAIAgent;