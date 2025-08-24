import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Wifi,
  Monitor,
  Palette,
  Globe,
  Key,
  Download,
  Upload,
  RefreshCw,
  Save,
  AlertTriangle,
  CheckCircle,
  Brain,
  Zap,
  Lock
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true
  });
  const [aiSettings, setAiSettings] = useState({
    autoOptimization: true,
    learningMode: 'adaptive',
    confidenceThreshold: 85,
    modelVersion: 'sea-lion-v3.2.1'
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'ai', label: 'AI & Automation', icon: Brain },
    { id: 'data', label: 'Data & Backup', icon: Database },
    { id: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Configure your logistics management platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">General Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Company Name</label>
                    <input 
                      type="text" 
                      defaultValue="LogiFlow Logistics"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Time Zone</label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC-8 (Pacific Time)</option>
                        <option>UTC+0 (GMT)</option>
                        <option>UTC+8 (Singapore Time)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Language</label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Chinese</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Default Dashboard View</label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                      <option>Overview</option>
                      <option>Fleet Management</option>
                      <option>Route Planning</option>
                      <option>Analytics</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Dark Mode</h4>
                      <p className="text-gray-400 text-sm">Use dark theme for the interface</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                      <User size={32} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Profile Picture</h4>
                      <p className="text-gray-400 text-sm">Upload a new profile picture</p>
                      <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Upload Image
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">First Name</label>
                      <input 
                        type="text" 
                        defaultValue="John"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Last Name</label>
                      <input 
                        type="text" 
                        defaultValue="Doe"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="john.doe@logiflow.com"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      defaultValue="+1 (555) 123-4567"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Job Title</label>
                    <input 
                      type="text" 
                      defaultValue="Logistics Manager"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Notification Channels</h4>
                    
                    {[
                      { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                      { key: 'push', label: 'Push Notifications', description: 'Browser and mobile push notifications' },
                      { key: 'sms', label: 'SMS Notifications', description: 'Text message notifications for critical alerts' },
                      { key: 'alerts', label: 'System Alerts', description: 'In-app system alerts and warnings' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <h5 className="text-white font-medium">{item.label}</h5>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Alert Types</h4>
                    
                    {[
                      'Vehicle breakdowns and maintenance alerts',
                      'Route optimization suggestions',
                      'Inventory low stock warnings',
                      'Emergency and priority deliveries',
                      'Weather and traffic updates',
                      'AI automation status changes'
                    ].map((alert, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{alert}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-green-400" size={24} />
                      <div>
                        <h4 className="text-green-400 font-medium">Security Status: Good</h4>
                        <p className="text-gray-400 text-sm">Your account is secure with current settings</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-4">Password & Authentication</h4>
                    <div className="space-y-4">
                      <button className="w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-3 text-left transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-white font-medium">Change Password</h5>
                            <p className="text-gray-400 text-sm">Last changed 3 months ago</p>
                          </div>
                          <Key className="text-gray-400" size={20} />
                        </div>
                      </button>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-white font-medium">Two-Factor Authentication</h5>
                          <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-4">Session Management</h4>
                    <div className="space-y-3">
                      {[
                        { device: 'Chrome on Windows', location: 'New York, US', current: true },
                        { device: 'Safari on iPhone', location: 'New York, US', current: false },
                        { device: 'Chrome on Android', location: 'Boston, US', current: false }
                      ].map((session, index) => (
                        <div key={index} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="text-white font-medium">{session.device}</h5>
                              <p className="text-gray-400 text-sm">{session.location}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {session.current && (
                                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Current</span>
                              )}
                              {!session.current && (
                                <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Settings */}
            {activeTab === 'ai' && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">AI & Automation Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Brain className="text-purple-400" size={24} />
                      <div>
                        <h4 className="text-purple-400 font-medium">SEA-LION AI Engine</h4>
                        <p className="text-gray-400 text-sm">Advanced AI models for logistics optimization</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-4">AI Configuration</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-white font-medium">Auto-Optimization</h5>
                          <p className="text-gray-400 text-sm">Allow AI to automatically optimize routes and schedules</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={aiSettings.autoOptimization}
                            onChange={(e) => setAiSettings(prev => ({ ...prev, autoOptimization: e.target.checked }))}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">Learning Mode</label>
                        <select 
                          value={aiSettings.learningMode}
                          onChange={(e) => setAiSettings(prev => ({ ...prev, learningMode: e.target.value }))}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="adaptive">Adaptive Learning</option>
                          <option value="conservative">Conservative</option>
                          <option value="aggressive">Aggressive</option>
                          <option value="manual">Manual Override</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Confidence Threshold: {aiSettings.confidenceThreshold}%
                        </label>
                        <input 
                          type="range" 
                          min="50" 
                          max="99" 
                          value={aiSettings.confidenceThreshold}
                          onChange={(e) => setAiSettings(prev => ({ ...prev, confidenceThreshold: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Conservative</span>
                          <span>Aggressive</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">AI Model Version</label>
                        <select 
                          value={aiSettings.modelVersion}
                          onChange={(e) => setAiSettings(prev => ({ ...prev, modelVersion: e.target.value }))}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="sea-lion-v3.2.1">SEA-LION v3.2.1 (Latest)</option>
                          <option value="sea-lion-v3.1.0">SEA-LION v3.1.0 (Stable)</option>
                          <option value="sea-lion-v3.0.5">SEA-LION v3.0.5 (Legacy)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-4">Automation Rules</h4>
                    <div className="space-y-3">
                      {[
                        'Automatic route optimization',
                        'Predictive maintenance scheduling',
                        'Dynamic inventory rebalancing',
                        'Emergency response protocols',
                        'Energy consumption optimization'
                      ].map((rule, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-300">{rule}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data & Backup */}
            {activeTab === 'data' && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Data & Backup Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-4">Data Export</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <Download size={20} />
                        <span>Export All Data</span>
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <Upload size={20} />
                        <span>Import Data</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-4">Backup Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-white font-medium">Automatic Backups</h5>
                          <p className="text-gray-400 text-sm">Automatically backup data daily</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">Backup Frequency</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">Retention Period</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                          <option>30 days</option>
                          <option>90 days</option>
                          <option>1 year</option>
                          <option>Forever</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-4">Data Usage</h4>
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-white">2.4TB</p>
                          <p className="text-gray-400 text-sm">Total Storage</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-400">1.8TB</p>
                          <p className="text-gray-400 text-sm">Used</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-400">0.6TB</p>
                          <p className="text-gray-400 text-sm">Available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">System Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-4">System Information</h4>
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Platform Version</p>
                          <p className="text-white font-medium">LogiFlow v2.1.3</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Last Update</p>
                          <p className="text-white font-medium">March 15, 2024</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">System Status</p>
                          <p className="text-green-400 font-medium">Operational</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Uptime</p>
                          <p className="text-white font-medium">99.9%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-4">Performance</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-white font-medium">Performance Monitoring</h5>
                          <p className="text-gray-400 text-sm">Monitor system performance and usage</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-white font-medium">Error Reporting</h5>
                          <p className="text-gray-400 text-sm">Automatically report system errors</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-4">Maintenance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <RefreshCw size={20} />
                        <span>Clear Cache</span>
                      </button>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <Download size={20} />
                        <span>Download Logs</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="border-t border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Changes are saved automatically</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Save size={20} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;