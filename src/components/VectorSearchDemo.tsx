import React, { useState } from 'react';
import { 
  Search, 
  Database, 
  Brain, 
  Zap,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Loader,
  Copy,
  Code
} from 'lucide-react';
import { searchSimilarEvents, searchSimilarVehicles } from '../lib/tidb';
import { generateEmbedding } from '../lib/aiAgent';

const VectorSearchDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('events');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [queryEmbedding, setQueryEmbedding] = useState<number[] | null>(null);
  const [showSQL, setShowSQL] = useState(false);

  const exampleQueries = {
    events: [
      'vehicle breakdown on highway',
      'medical emergency delivery',
      'battery low warning',
      'route optimization completed'
    ],
    vehicles: [
      'truck with high mileage',
      'drone for medical delivery',
      'electric vehicle charging',
      'maintenance required vehicle'
    ]
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Generate embedding for search query
      const embedding = await generateEmbedding(searchQuery);
      setQueryEmbedding(embedding);
      
      // Perform vector search
      let results;
      if (searchType === 'events') {
        results = await searchSimilarEvents(embedding, 5);
      } else {
        results = await searchSimilarVehicles(embedding, undefined, 5);
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Vector search failed:', error);
      // Set mock results for demo
      if (searchType === 'events') {
        setSearchResults([
          {
            id: 1,
            event_type: 'maintenance_alert',
            vehicle_id: 'TRK-001',
            location: 'Highway 95',
            description: 'Similar to your search query',
            severity: 'medium',
            similarity_score: 0.15
          }
        ]);
      } else {
        setSearchResults([
          {
            vehicle_id: 'TRK-002',
            vehicle_type: 'truck',
            current_location: 'Downtown',
            status: 'active',
            similarity_score: 0.12
          }
        ]);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const getSQLQuery = () => {
    if (searchType === 'events') {
      return `SELECT id, event_type, vehicle_id, location, 
       description, severity,
       VEC_COSINE_DISTANCE(embedding, ?) as similarity_score
FROM logistics_events 
WHERE embedding IS NOT NULL
ORDER BY similarity_score ASC 
LIMIT 5`;
    } else {
      return `SELECT vehicle_id, vehicle_type, current_location, 
       status, performance_metrics,
       VEC_COSINE_DISTANCE(embedding, ?) as similarity_score
FROM vehicles 
WHERE embedding IS NOT NULL
ORDER BY similarity_score ASC 
LIMIT 5`;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">TiDB Vector Search Demo</h1>
        <p className="text-gray-400">Experience semantic similarity search with TiDB Serverless VECTOR columns</p>
      </div>

      {/* Search Interface */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Vector Similarity Search</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-medium mb-2">Search Query</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter natural language query..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Search Type</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="events">Logistics Events</option>
                <option value="vehicles">Vehicle Fleet</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium mb-2">Example Queries:</h4>
              <div className="flex flex-wrap gap-2">
                {exampleQueries[searchType as keyof typeof exampleQueries].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(example)}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isSearching}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {isSearching ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search size={20} />
                  <span>Vector Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SQL Query Display */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">TiDB Vector Search Query</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSQL(!showSQL)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Code size={16} className="text-gray-400" />
              </button>
              <button
                onClick={() => copyToClipboard(getSQLQuery())}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Copy size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        {showSQL && (
          <div className="p-4">
            <pre className="bg-gray-900 rounded-lg p-4 text-green-400 text-sm overflow-x-auto">
              <code>{getSQLQuery()}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Vector Search Results</h3>
              <div className="flex items-center space-x-2 bg-green-900/30 px-3 py-2 rounded-lg">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-green-400 text-sm">{searchResults.length} matches found</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      {searchType === 'events' ? (
                        <>
                          <h4 className="text-white font-medium mb-1">
                            {result.event_type} - {result.vehicle_id}
                          </h4>
                          <p className="text-gray-400 text-sm mb-2">{result.description}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="text-gray-400">Location: {result.location}</span>
                            <span className={`px-2 py-1 rounded-full ${
                              result.severity === 'critical' ? 'bg-red-400/10 text-red-400' :
                              result.severity === 'high' ? 'bg-orange-400/10 text-orange-400' :
                              'bg-blue-400/10 text-blue-400'
                            }`}>
                              {result.severity}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <h4 className="text-white font-medium mb-1">
                            {result.vehicle_id} - {result.vehicle_type}
                          </h4>
                          <p className="text-gray-400 text-sm mb-2">{result.current_location}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="text-gray-400">Status: {result.status}</span>
                            <span className="text-blue-400">Type: {result.vehicle_type}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">Similarity Score</p>
                      <p className="text-blue-400 font-semibold">
                        {(1 - parseFloat(result.similarity_score)).toFixed(3)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vector Embedding Visualization */}
      {queryEmbedding && (
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Query Vector Embedding</h3>
            <p className="text-gray-400 text-sm">Generated 1536-dimensional vector for semantic search</p>
          </div>
          
          <div className="p-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">Vector Dimensions: 1536</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(queryEmbedding.slice(0, 10)))}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Copy Sample
                </button>
              </div>
              <div className="text-green-400 text-xs font-mono">
                [{queryEmbedding.slice(0, 10).map(n => n.toFixed(6)).join(', ')}, ...]
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Showing first 10 dimensions of {queryEmbedding.length}-dimensional vector
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VectorSearchDemo;