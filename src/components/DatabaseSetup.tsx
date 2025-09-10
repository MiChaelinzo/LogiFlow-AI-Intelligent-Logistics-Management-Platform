import React, { useState } from 'react';
import { 
  Database, 
  Key, 
  Server, 
  CheckCircle, 
  AlertTriangle,
  Copy,
  Eye,
  EyeOff,
  Save,
  TestTube,
  Loader,
  ExternalLink
} from 'lucide-react';
import { initializeConnection, createTables, testConnection, DatabaseConfig } from '../lib/database';

const DatabaseSetup: React.FC = () => {
  const [config, setConfig] = useState<DatabaseConfig>({
    host: '',
    username: '',
    password: '',
    database: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTestConnection = async () => {
    if (!config.host || !config.username || !config.password || !config.database) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    setIsTesting(true);
    setErrorMessage('');
    
    try {
      // Initialize connection with provided config
      initializeConnection(config);
      
      // Test the connection
      const isConnected = await testConnection();
      
      if (isConnected) {
        setConnectionStatus('success');
        
        // Create tables if connection successful
        await createTables();
        
      } else {
        setConnectionStatus('error');
        setErrorMessage('Connection test failed');
      }
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Connection failed');
    } finally {
      setIsTesting(false);
    }
  };

  const copyEnvTemplate = () => {
    const envTemplate = `# TiDB Serverless Configuration
VITE_TIDB_HOST=${config.host}
VITE_TIDB_USERNAME=${config.username}
VITE_TIDB_PASSWORD=${config.password}
VITE_TIDB_DATABASE=${config.database}

# OpenAI Configuration (Optional)
VITE_OPENAI_API_KEY=your-openai-api-key`;

    navigator.clipboard.writeText(envTemplate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">TiDB Serverless Setup</h1>
        <p className="text-gray-400">Connect your TiDB Serverless database to enable real AI workflows</p>
      </div>

      {/* Setup Instructions */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-blue-400 font-semibold mb-4">Quick Setup Guide</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
            <div>
              <p className="text-white font-medium">Create TiDB Cloud Account</p>
              <p className="text-gray-400">Sign up at <a href="https://tidbcloud.com" target="_blank" className="text-blue-400 hover:text-blue-300">tidbcloud.com</a></p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
            <div>
              <p className="text-white font-medium">Create Serverless Cluster</p>
              <p className="text-gray-400">Choose the free tier for development</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">3</span>
            <div>
              <p className="text-white font-medium">Get Connection Details</p>
              <p className="text-gray-400">Copy host, username, password, and database name</p>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Database Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              TiDB Host *
            </label>
            <input
              type="text"
              value={config.host}
              onChange={(e) => setConfig(prev => ({ ...prev, host: e.target.value }))}
              placeholder="your-cluster.clusters.tidb-cloud.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Username *
              </label>
              <input
                type="text"
                value={config.username}
                onChange={(e) => setConfig(prev => ({ ...prev, username: e.target.value }))}
                placeholder="your-username"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Database Name *
              </label>
              <input
                type="text"
                value={config.database}
                onChange={(e) => setConfig(prev => ({ ...prev, database: e.target.value }))}
                placeholder="your-database-name"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={config.password}
                onChange={(e) => setConfig(prev => ({ ...prev, password: e.target.value }))}
                placeholder="your-password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-400" size={16} />
                <span className="text-red-400 text-sm">{errorMessage}</span>
              </div>
            </div>
          )}

          {connectionStatus === 'success' && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-green-400 text-sm">Successfully connected to TiDB Serverless!</span>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <button
              onClick={handleTestConnection}
              disabled={isTesting || !config.host || !config.username || !config.password || !config.database}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {isTesting ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Testing Connection...</span>
                </>
              ) : (
                <>
                  <TestTube size={20} />
                  <span>Test & Connect</span>
                </>
              )}
            </button>

            <button
              onClick={copyEnvTemplate}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Copy size={20} />
              <span>Copy .env Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* Environment Variables Guide */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Environment Variables</h3>
        
        <div className="bg-gray-900 rounded-lg p-4">
          <pre className="text-green-400 text-sm">
{`# Add these to your .env file:
VITE_TIDB_HOST=your-cluster.clusters.tidb-cloud.com
VITE_TIDB_USERNAME=your-username  
VITE_TIDB_PASSWORD=your-password
VITE_TIDB_DATABASE=your-database-name

# Optional: OpenAI for AI features
VITE_OPENAI_API_KEY=your-openai-api-key`}
          </pre>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="text-yellow-400 mt-0.5" size={16} />
            <div>
              <p className="text-yellow-400 font-medium text-sm">Important:</p>
              <p className="text-gray-300 text-sm">
                After adding credentials to .env, restart the development server for changes to take effect.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Enabled */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Features Enabled with Real TiDB</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-white font-medium">Database Features</h4>
            {[
              'Real VECTOR(1536) columns for semantic search',
              'Live VEC_COSINE_DISTANCE similarity queries',
              'JSON metadata storage and indexing',
              'Real-time data ingestion and streaming',
              'Multi-table joins with vector operations'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={14} />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <h4 className="text-white font-medium">AI Workflows</h4>
            {[
              'Real predictive maintenance with TiDB data',
              'Live route optimization using vector search',
              'Emergency response with similarity matching',
              'Multi-step AI agent orchestration',
              'Continuous learning and model improvement'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="text-blue-400" size={14} />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSetup;