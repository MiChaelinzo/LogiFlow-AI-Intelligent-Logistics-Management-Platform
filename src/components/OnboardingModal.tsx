import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  CheckCircle, 
  ArrowRight,
  Plus,
  MapPin,
  Users,
  Package,
  Zap
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Welcome to LogiFlow AI! 🚀',
      description: 'Your intelligent logistics management platform powered by TiDB Serverless and AI agents.',
      content: (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Truck className="text-white" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Get Started in 3 Easy Steps</h3>
          <p className="text-gray-400 mb-6">
            Let's set up your logistics operation with AI-powered automation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700/30 rounded-lg p-4">
              <Plus className="text-blue-400 mx-auto mb-2" size={24} />
              <h4 className="text-white font-medium mb-1">Add Vehicles</h4>
              <p className="text-gray-400 text-sm">Build your fleet</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <MapPin className="text-green-400 mx-auto mb-2" size={24} />
              <h4 className="text-white font-medium mb-1">Set Locations</h4>
              <p className="text-gray-400 text-sm">Configure warehouses</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <Zap className="text-yellow-400 mx-auto mb-2" size={24} />
              <h4 className="text-white font-medium mb-1">Enable AI</h4>
              <p className="text-gray-400 text-sm">Activate automation</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Add Your First Vehicle 🚛',
      description: 'Start by adding vehicles to your fleet. You can add trucks, drones, or any delivery vehicles.',
      content: (
        <div className="py-6">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Plus className="text-blue-400" size={24} />
              <h4 className="text-blue-400 font-medium">Quick Add Vehicle</h4>
            </div>
            <p className="text-gray-300 mb-4">
              Go to <strong>Fleet Management → Add Vehicles</strong> to start building your fleet.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-gray-300">Add vehicle details (name, type, model)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-gray-300">Set current location and status</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-gray-300">Assign drivers (optional)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-gray-300">Configure maintenance schedule</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h5 className="text-white font-medium mb-2">Supported Vehicle Types:</h5>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Truck className="text-blue-400" size={16} />
                <span className="text-gray-300">Trucks & Vans</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="text-purple-400" size={16} />
                <span className="text-gray-300">Delivery Drones</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Explore AI Features 🤖',
      description: 'Discover the powerful AI automation features that will optimize your logistics operations.',
      content: (
        <div className="py-6">
          <div className="space-y-4">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Zap className="text-purple-400" size={20} />
                <h4 className="text-purple-400 font-medium">TiDB AI Agent</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Multi-step AI workflows for predictive maintenance, route optimization, and emergency response.
              </p>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="text-blue-400" size={20} />
                <h4 className="text-blue-400 font-medium">Smart Route Planning</h4>
              </div>
              <p className="text-gray-300 text-sm">
                AI-powered route optimization that saves time, fuel, and costs automatically.
              </p>
            </div>
            
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="text-green-400" size={20} />
                <h4 className="text-green-400 font-medium">Fleet Analytics</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Real-time insights and predictive analytics for your entire fleet operation.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-sm">
              💡 <strong>Pro Tip:</strong> Start with adding a few vehicles, then explore the TiDB AI Agent section to see advanced automation in action!
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{currentStepData.title}</h2>
              <p className="text-gray-400 text-sm mt-1">{currentStepData.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-gray-400 text-sm">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;