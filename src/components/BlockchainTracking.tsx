import React, { useState } from 'react';
import { 
  Shield, 
  Link, 
  CheckCircle, 
  Clock,
  Package,
  Truck,
  MapPin,
  Eye,
  Copy,
  ExternalLink,
  Hash,
  Database,
  Lock,
  Verified,
  AlertTriangle,
  Activity
} from 'lucide-react';

const BlockchainTracking: React.FC = () => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [networkStatus, setNetworkStatus] = useState('connected');

  const shipments = [
    {
      id: 'SHP-001',
      trackingId: '0x1a2b3c4d5e6f7890abcdef1234567890',
      product: 'Medical Equipment',
      origin: 'Manufacturing Plant A',
      destination: 'Hospital Network B',
      status: 'in_transit',
      currentLocation: 'Distribution Center C',
      estimatedDelivery: '2024-12-18T14:30:00Z',
      blockchainEvents: [
        {
          timestamp: '2024-12-15T08:00:00Z',
          event: 'shipment_created',
          location: 'Manufacturing Plant A',
          blockHash: '0xabc123...',
          txHash: '0x789def...',
          verified: true
        },
        {
          timestamp: '2024-12-15T10:30:00Z',
          event: 'quality_verified',
          location: 'Quality Control Lab',
          blockHash: '0xdef456...',
          txHash: '0x123abc...',
          verified: true
        },
        {
          timestamp: '2024-12-15T14:15:00Z',
          event: 'shipped',
          location: 'Logistics Hub A',
          blockHash: '0x456789...',
          txHash: '0xabc789...',
          verified: true
        },
        {
          timestamp: '2024-12-16T09:45:00Z',
          event: 'checkpoint_passed',
          location: 'Distribution Center C',
          blockHash: '0x789abc...',
          txHash: '0xdef123...',
          verified: true
        }
      ],
      smartContract: '0x742d35Cc6634C0532925a3b8D0C9e3e7C8B4c8d2',
      temperature: { min: 2, max: 8, current: 4.2, compliant: true },
      custody: [
        { entity: 'MedTech Manufacturing', role: 'producer', verified: true },
        { entity: 'ColdChain Logistics', role: 'transporter', verified: true },
        { entity: 'Regional Distribution', role: 'handler', verified: true }
      ]
    },
    {
      id: 'SHP-002',
      trackingId: '0x9f8e7d6c5b4a39281726354849576869',
      product: 'Pharmaceutical Supplies',
      origin: 'Pharma Lab X',
      destination: 'Pharmacy Chain Y',
      status: 'delivered',
      currentLocation: 'Pharmacy Chain Y',
      estimatedDelivery: '2024-12-16T16:00:00Z',
      blockchainEvents: [
        {
          timestamp: '2024-12-14T07:00:00Z',
          event: 'shipment_created',
          location: 'Pharma Lab X',
          blockHash: '0x111222...',
          txHash: '0x333444...',
          verified: true
        },
        {
          timestamp: '2024-12-16T15:45:00Z',
          event: 'delivered',
          location: 'Pharmacy Chain Y',
          blockHash: '0x555666...',
          txHash: '0x777888...',
          verified: true
        }
      ],
      smartContract: '0x8f7e6d5c4b3a29180f1e2d3c4b5a6978',
      temperature: { min: 15, max: 25, current: 22.1, compliant: true },
      custody: [
        { entity: 'PharmaCorp Inc', role: 'producer', verified: true },
        { entity: 'SecureTransport Ltd', role: 'transporter', verified: true }
      ]
    }
  ];

  const blockchainMetrics = {
    totalTransactions: 15847,
    verifiedShipments: 2341,
    smartContracts: 47,
    networkUptime: 99.97,
    gasUsed: 2.4,
    averageConfirmation: 12
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-400 bg-green-400/10';
      case 'in_transit':
        return 'text-blue-400 bg-blue-400/10';
      case 'pending':
        return 'text-orange-400 bg-orange-400/10';
      case 'failed':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blockchain Supply Chain Tracking</h1>
          <p className="text-gray-400">Immutable, transparent tracking with smart contracts and decentralized verification</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            networkStatus === 'connected' ? 'bg-green-900/30' : 'bg-red-900/30'
          }`}>
            <Shield className={networkStatus === 'connected' ? 'text-green-400' : 'text-red-400'} size={20} />
            <span className={`font-medium ${networkStatus === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
              Blockchain {networkStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Package size={16} />
            <span>Create Shipment</span>
          </button>
        </div>
      </div>

      {/* Blockchain Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-blue-400" size={20} />
            <span className="text-green-400 text-sm">+12%</span>
          </div>
          <h3 className="text-xl font-bold text-white">{blockchainMetrics.totalTransactions.toLocaleString()}</h3>
          <p className="text-gray-400 text-sm">Total Transactions</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Verified className="text-green-400" size={20} />
            <span className="text-green-400 text-sm">+8%</span>
          </div>
          <h3 className="text-xl font-bold text-white">{blockchainMetrics.verifiedShipments.toLocaleString()}</h3>
          <p className="text-gray-400 text-sm">Verified Shipments</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Database className="text-purple-400" size={20} />
            <span className="text-purple-400 text-sm">Active</span>
          </div>
          <h3 className="text-xl font-bold text-white">{blockchainMetrics.smartContracts}</h3>
          <p className="text-gray-400 text-sm">Smart Contracts</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Shield className="text-green-400" size={20} />
            <span className="text-green-400 text-sm">Stable</span>
          </div>
          <h3 className="text-xl font-bold text-white">{blockchainMetrics.networkUptime}%</h3>
          <p className="text-gray-400 text-sm">Network Uptime</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="text-orange-400" size={20} />
            <span className="text-orange-400 text-sm">ETH</span>
          </div>
          <h3 className="text-xl font-bold text-white">{blockchainMetrics.gasUsed}</h3>
          <p className="text-gray-400 text-sm">Gas Used (ETH)</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-blue-400" size={20} />
            <span className="text-blue-400 text-sm">sec</span>
          </div>
          <h3 className="text-xl font-bold text-white">{blockchainMetrics.averageConfirmation}</h3>
          <p className="text-gray-400 text-sm">Avg Confirmation</p>
        </div>
      </div>

      {/* Shipment Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Tracked Shipments</h3>
          
          {shipments.map((shipment) => {
            const isSelected = selectedShipment === shipment.id;
            
            return (
              <div
                key={shipment.id}
                className={`bg-gray-800 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected ? 'border-blue-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedShipment(isSelected ? null : shipment.id)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <Package size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{shipment.product}</h4>
                        <p className="text-gray-400 text-sm">{shipment.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Origin</p>
                      <p className="text-white text-sm">{shipment.origin}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Destination</p>
                      <p className="text-white text-sm">{shipment.destination}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Current Location</p>
                      <p className="text-white text-sm">{shipment.currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Temperature</p>
                      <p className={`text-sm font-medium ${shipment.temperature.compliant ? 'text-green-400' : 'text-red-400'}`}>
                        {shipment.temperature.current}°C
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Hash size={14} className="text-gray-400" />
                      <span className="text-gray-400 text-sm font-mono">
                        {truncateHash(shipment.trackingId)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(shipment.trackingId);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy size={12} />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-400" />
                      <span className="text-green-400 text-sm">{shipment.blockchainEvents.length} events</span>
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="border-t border-gray-700 p-4">
                    <div className="space-y-4">
                      {/* Blockchain Events */}
                      <div>
                        <h5 className="text-white font-medium mb-3">Blockchain Event History</h5>
                        <div className="space-y-2">
                          {shipment.blockchainEvents.map((event, index) => (
                            <div key={index} className="bg-gray-700/30 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <CheckCircle size={14} className="text-green-400" />
                                  <span className="text-white font-medium capitalize">
                                    {event.event.replace('_', ' ')}
                                  </span>
                                </div>
                                <span className="text-gray-400 text-xs">
                                  {new Date(event.timestamp).toLocaleString()}
                                </span>
                              </div>
                              
                              <p className="text-gray-400 text-sm mb-2">{event.location}</p>
                              
                              <div className="flex items-center space-x-4 text-xs">
                                <div className="flex items-center space-x-1">
                                  <span className="text-gray-400">Block:</span>
                                  <span className="text-blue-400 font-mono">{truncateHash(event.blockHash)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="text-gray-400">Tx:</span>
                                  <span className="text-purple-400 font-mono">{truncateHash(event.txHash)}</span>
                                </div>
                                <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                                  <ExternalLink size={10} />
                                  <span>View</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Custody Chain */}
                      <div>
                        <h5 className="text-white font-medium mb-3">Custody Chain</h5>
                        <div className="space-y-2">
                          {shipment.custody.map((custodian, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                              <div>
                                <p className="text-white font-medium">{custodian.entity}</p>
                                <p className="text-gray-400 text-sm capitalize">{custodian.role}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {custodian.verified ? (
                                  <CheckCircle size={16} className="text-green-400" />
                                ) : (
                                  <AlertTriangle size={16} className="text-orange-400" />
                                )}
                                <span className={`text-sm ${custodian.verified ? 'text-green-400' : 'text-orange-400'}`}>
                                  {custodian.verified ? 'Verified' : 'Pending'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Smart Contract Details */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Smart Contract Status</h3>
              <p className="text-gray-400 text-sm">Automated compliance and verification</p>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Lock className="text-green-400" size={20} />
                  <h4 className="text-green-400 font-medium">Contract Security</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Audit Status</span>
                    <span className="text-green-400">Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Multi-sig Required</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Immutable Records</span>
                    <span className="text-green-400">Enabled</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Database className="text-blue-400" size={20} />
                  <h4 className="text-blue-400 font-medium">Contract Performance</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Execution Success</span>
                    <span className="text-white">99.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gas Efficiency</span>
                    <span className="text-white">Optimized</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Auto-compliance</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Network Status */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Network Status</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <p className="text-gray-400 text-sm mb-1">Block Height</p>
                  <p className="text-white font-semibold">18,547,892</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <p className="text-gray-400 text-sm mb-1">Network Hash Rate</p>
                  <p className="text-white font-semibold">847 TH/s</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <p className="text-gray-400 text-sm mb-1">Pending Transactions</p>
                  <p className="text-white font-semibold">23,456</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <p className="text-gray-400 text-sm mb-1">Gas Price</p>
                  <p className="text-white font-semibold">15 Gwei</p>
                </div>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2">Consensus Status</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Network Consensus</span>
                  <span className="text-green-400 text-sm">100% Synchronized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainTracking;