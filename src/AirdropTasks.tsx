import React from 'react';
import { penguinairdrop } from './images';

interface AirdropTasksProps {
  onClose: () => void;
}

const AirdropTasks: React.FC<AirdropTasksProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50">
      <div className="h-full max-w-xl mx-auto flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <button onClick={onClose} className="text-gray-400">
            Cancel
          </button>
          <h2 className="text-white text-lg font-bold">Airdrop Tasks</h2>
          <div className="w-12"></div> {/* Spacer for alignment */}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Hamster character container with animated glow effect */}
          <div className="relative w-48 h-48 mb-8">
            <div className="absolute inset-0 bg-blue-500 opacity-20 blur-xl rounded-full animate-pulse"></div>
            <div className="relative w-full h-full">
              {/* Replace with your hamster character image */}
              <img 
                src={penguinairdrop}
                alt="cute penguin" 
                className="w-full h-full object-contain animate-float"
              />
            </div>
            {/* Ripple effect */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8">
              <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-full animate-ripple"></div>
            </div>
          </div>

          <p className="text-white text-center mb-8">
            The testing is now ongoing. Tasks will be engaged soon, compatible with your first trade
          </p>

          {/* Connect wallet button */}
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold">
            Connect your TON wallet
          </button>
        </div>

        {/* Bottom navigation - reuse your existing bottom nav */}
        <div className="bg-[#283b3e] rounded-3xl mx-4 mb-4">
          {/* Your existing bottom navigation */}
        </div>
      </div>
    </div>
  );
};

export default AirdropTasks;