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
  Loader
} from 'lucide-react';
import { 
  predictiveMaintenanceWorkflow,
  intelligentRouteOptimizationWorkflow,
  emergencyResponseWorkflow,
  AgentWorkflowResult
} from '../lib/aiAgent';
import { initializeDatabase } from '../lib/tidb';

const TiDBAIAgent: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [workflowResults, setWorkflowResults] = useState<Record<string, AgentWorkflowResult>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const workflows = [
    {
      id: 'predictive_maintenance',
      title: 'Predictive Maintenance Agent',
      description: 'Multi-step AI workflow using TiDB vector search to predict vehicle maintenance needs',
      icon: Truck,
      color: 'blue',
      steps: [
        'Ingest vehicle telemetry data into TiDB Serverless',
        'Generate vector embeddings for vehicle characteristics',
        'Search similar vehicle patterns using vector search',
        'Chain LLM calls for AI maintenance analysis',
        'Create maintenance events and schedule actions'
      ]
    },
    {
      id: 'route_optimization',
      title: 'Intelligent Route Optimization',
      description: 'AI-powered route planning using historical data and vector similarity search',
      icon: MapPin,
      color: 'green',
      steps: [
        'Collect route and traffic data in TiDB',
        'Index route characteristics with vector embeddings',
        'Search similar successful routes using TiDB vector search',
        'Chain LLM calls for route optimization analysis',
        'Update systems with optimized route recommendations'
      ]
    },
    {
      id: 'emergency_response',
      title: 'Emergency Response Coordinator',
      description: 'Automated emergency response using vector search for similar incident analysis',
      icon: Shield,
      color: 'red',
      steps: [
        'Log emergency event in TiDB with vector embedding',
        'Search similar emergency cases using vector similarity',
        'Chain LLM calls for response strategy generation',
        'Dispatch nearest available vehicles automatically',
        'Coordinate complete multi-step emergency response'
      ]
    }
  ];

  const handleInitializeDatabase = async () => {
    setIsInitializing(true);
    try {
      await initializeDatabase();
      setIsInitialized(true);
    } catch (error) {
      console.error('Database initialization failed:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleRunWorkflow = async (workflowId: string) => {
    setActiveWorkflow(workflowId);
    
    try {
      let result: AgentWorkflowResult;
      
      switch (workflowId) {
        case 'predictive_maintenance':
          result = await predictiveMaintenanceWorkflow('TRK-001');
          break;
        case 'route_optimization':
          result = await intelligentRouteOptimizationWorkflow(
            'New York Distribution Center',
            'Boston Medical Hub',
            'truck'
          );
          break;
        case 'emergency_response':
          result = await emergencyResponseWorkflow(
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
          steps: [],
          recommendations: [],
          data: {},
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }));
    } finally {
      setActiveWorkflow(null);
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
          <p className="text-gray-400">Multi-step agentic solutions powered by TiDB Serverless vector search</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-orange-900/30 px-4 py-2 rounded-lg">
            <Database className="text-orange-400" size={20} />
            <span className="text-orange-400 font-medium">TiDB Serverless</span>
          </div>
          {!isInitialized && (
            <button 
              onClick={handleInitializeDatabase}
              disabled={isInitializing}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {isInitializing ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Initializing...</span>
                </>
              ) : (
                <>
                  <Database size={20} />
                  <span>Initialize TiDB</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Database Status */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">TiDB Serverless Integration Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`rounded-lg p-4 border ${isInitialized ? 'bg-green-900/20 border-green-500/30' : 'bg-gray-700/30 border-gray-600'}`}>
            <div className="flex items-center justify-between mb-2">
              <Database className={isInitialized ? 'text-green-400' : 'text-gray-400'} size={20} />
              {isInitialized ? (
                <CheckCircle className="text-green-400" size={16} />
              ) : (
                <Clock className="text-gray-400" size={16} />
              )}
            </div>
            <h4 className="text-white font-medium">Database</h4>
            <p className={`text-sm ${isInitialized ? 'text-green-400' : 'text-gray-400'}`}>
              {isInitialized ? 'Connected' : 'Not Initialized'}
            </p>
          </div>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Search className="text-purple-400" size={20} />
              <CheckCircle className="text-purple-400" size={16} />
            </div>
            <h4 className="text-white font-medium">Vector Search</h4>
            <p className="text-purple-400 text-sm">Ready</p>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Brain className="text-blue-400" size={20} />
              <CheckCircle className="text-blue-400" size={16} />
            </div>
            <h4 className="text-white font-medium">AI Models</h4>
            <p className="text-blue-400 text-sm">OpenAI GPT-4</p>
          </div>
          
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="text-yellow-400" size={20} />
              <TrendingUp className="text-yellow-400" size={16} />
            </div>
            <h4 className="text-white font-medium">Workflows</h4>
            <p className="text-yellow-400 text-sm">3 Active</p>
          </div>
        </div>
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
                    disabled={!isInitialized || isRunning}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      !isInitialized 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : isRunning
                        ? 'bg-yellow-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>Run Workflow</span>
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
                        {result.success ? 'Workflow Completed' : 'Workflow Failed'}
                      </span>
                    </div>
                    
                    {result.success && (
                      <>
                        <div className="mb-3">
                          <h5 className="text-white font-medium text-sm mb-2">Execution Steps:</h5>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {result.steps.map((step, index) => (
                              <div key={index} className="text-xs text-gray-400">{step}</div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-white font-medium text-sm mb-2">Recommendations:</h5>
                          <div className="space-y-1">
                            {result.recommendations.slice(0, 3).map((rec, index) => (
                              <div key={index} className="text-xs text-blue-400">{rec}</div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {result.error && (
                      <div className="text-xs text-red-400 mt-2">
                        Error: {result.error}
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
        <h3 className="text-lg font-semibold text-white mb-4">Technical Architecture</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">TiDB Serverless Features</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={14} />
                <span className="text-gray-300">Vector search with VECTOR(1536) columns</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={14} />
                <span className="text-gray-300">Cosine similarity search (VEC_COSINE_DISTANCE)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={14} />
                <span className="text-gray-300">JSON metadata storage and indexing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={14} />
                <span className="text-gray-300">Real-time data ingestion and querying</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">AI Integration</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-blue-400" size={14} />
                <span className="text-gray-300">OpenAI GPT-4 for analysis and recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-blue-400" size={14} />
                <span className="text-gray-300">Text-embedding-3-small for vector generation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-blue-400" size={14} />
                <span className="text-gray-300">Multi-step agentic workflow orchestration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-blue-400" size={14} />
                <span className="text-gray-300">Chained LLM calls for complex reasoning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiDBAIAgent;