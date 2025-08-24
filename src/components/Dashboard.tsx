import React, { useState } from 'react';
import { 
  Truck, 
  Plane, 
  Package, 
  MapPin, 
  BarChart3, 
  Users, 
  Clock,
  TrendingUp,
  AlertTriangle,
  Battery,
  Zap,
  Globe,
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import Sidebar from './Sidebar';
import MapView from './MapView';
import StatsCards from './StatsCards';
import FleetStatus from './FleetStatus';
import InventoryOverview from './InventoryOverview';
import AIInsights from './AIInsights';
import RoutePlanning from './RoutePlanning';
import DroneOperations from './DroneOperations';
import AIAutomation from './AIAutomation';
import Settings from './Settings';
import AuthModal from './AuthModal';
import TiDBAIAgent from './TiDBAIAgent';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Route optimization completed - 15% efficiency gain', type: 'success', time: '2 min ago' },
    { id: 2, message: 'Drone DRN-007 battery low - returning to base', type: 'warning', time: '5 min ago' },
    { id: 3, message: 'Medical supplies delivery completed successfully', type: 'info', time: '8 min ago' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    setUser({
      name: email === 'demo@logiflow.com' ? 'Demo User' : email.split('@')[0],
      email: email
    });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveView('overview');
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  // Show authentication modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Truck className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">LogiFlow AI</h1>
          <p className="text-xl text-gray-400 mb-8">Intelligent Logistics Management Platform</p>
          <div className="space-y-4">
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
            <p className="text-gray-500 text-sm">
              Experience the future of logistics management with AI-powered automation
            </p>
          </div>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 shadow-lg border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">LogiFlow AI</h1>
              <p className="text-gray-400 text-sm">Intelligent Logistics Management Platform</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search vehicles, routes, inventory..."
                  className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500 w-64"
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors relative"
                >
                  <Bell size={20} className="text-gray-400" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{notifications.length}</span>
                    </div>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-gray-700">
                      <h3 className="text-white font-medium">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-700 hover:bg-gray-700/50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-white text-sm">{notification.message}</p>
                              <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                            </div>
                            <button
                              onClick={() => clearNotification(notification.id)}
                              className="text-gray-400 hover:text-white ml-2"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 bg-green-900/30 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">AI Online</span>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users size={20} />
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {activeView === 'overview' && (
            <div className="p-6 space-y-6">
              <StatsCards />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <MapView />
                </div>
                <div className="space-y-6">
                  <FleetStatus />
                  <AIInsights />
                </div>
              </div>
              
              <InventoryOverview />
            </div>
          )}
          
          {activeView === 'fleet' && (
            <div className="p-6">
              <FleetStatus expanded />
            </div>
          )}
          
          {activeView === 'inventory' && (
            <div className="p-6">
              <InventoryOverview expanded />
            </div>
          )}
          
          {activeView === 'analytics' && (
            <div className="p-6">
              <AIInsights expanded />
            </div>
          )}
          
          {activeView === 'routes' && (
            <div className="p-6">
              <RoutePlanning />
            </div>
          )}
          
          {activeView === 'drones' && (
            <div className="p-6">
              <DroneOperations />
            </div>
          )}
          
          {activeView === 'automation' && (
            <div className="p-6">
              <AIAutomation />
            </div>
          )}
          
          {activeView === 'tidb-agent' && (
            <div className="p-6">
              <TiDBAIAgent />
            </div>
          )}
          
          {activeView === 'settings' && (
            <div className="p-6">
              <Settings />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;