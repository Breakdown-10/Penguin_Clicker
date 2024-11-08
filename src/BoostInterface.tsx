import React from 'react';

interface BoostInterfaceProps {
  onClose: () => void;
  currentEnergy: number;
  maxEnergy: number;
  fullEnergyRefillsLeft: number;
  timeUntilNextRefill: string;
  multitapLevel: number;
  energyLimitLevel: number;
  onRefillEnergy: () => void;
  onUpgradeMultitap: () => void;
  onUpgradeEnergyLimit: () => void;
}

const BoostInterface: React.FC<BoostInterfaceProps> = ({
  onClose,
  currentEnergy,
  maxEnergy,
  fullEnergyRefillsLeft,
  timeUntilNextRefill,
  multitapLevel,
  energyLimitLevel,
  onRefillEnergy,
  onUpgradeMultitap,
  onUpgradeEnergyLimit,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50">
      <div className="h-full max-w-xl mx-auto flex flex-col p-4">
        {/* Header with energy display */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="text-blue-400">⚡</div>
            <div className="text-white">{`${currentEnergy}/${maxEnergy}`}</div>
          </div>
          <button onClick={onClose} className="text-gray-400">
            Close
          </button>
        </div>

        {/* Free daily boosters section */}
        <div className="bg-[#1d2025] rounded-lg p-4 mb-4">
          <h3 className="text-white mb-4">Free daily boosters</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-yellow-400">⚡</div>
              <div className="text-white">Full energy</div>
              <div className="text-gray-400">{`${fullEnergyRefillsLeft}/6 available`}</div>
            </div>
            <button 
  className={`px-4 py-2 rounded-lg ${
    fullEnergyRefillsLeft > 0 && (!timeUntilNextRefill || timeUntilNextRefill === '')
      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
      : 'bg-gray-600 text-gray-400'
  }`}
  onClick={onRefillEnergy}
  disabled={fullEnergyRefillsLeft === 0 || (timeUntilNextRefill && timeUntilNextRefill !== '') ? true : false}
>
  {fullEnergyRefillsLeft > 0 
    ? (timeUntilNextRefill && timeUntilNextRefill !== '' 
        ? timeUntilNextRefill 
        : 'Refill')
    : 'No refills left'}
</button>
          </div>
        </div>

        {/* Boosters section */}
        <div className="bg-[#1d2025] rounded-lg p-4">
          <h3 className="text-white mb-4">Boosters</h3>
          
          {/* Multitap upgrade */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="text-blue-400">👆</div>
              <div>
                <div className="text-white">Multitap</div>
                <div className="text-gray-400">{`Level ${multitapLevel}/15`}</div>
              </div>
            </div>
            <button 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-2 rounded-lg text-white"
              onClick={onUpgradeMultitap}
            >
              Upgrade
            </button>
          </div>

          {/* Energy limit upgrade */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-green-400">🔋</div>
              <div>
                <div className="text-white">Energy limit</div>
                <div className="text-gray-400">{`Level ${energyLimitLevel}/15`}</div>
              </div>
            </div>
            <button 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-2 rounded-lg text-white"
              onClick={onUpgradeEnergyLimit}
            >
              Upgrade
            </button>
          </div>
        </div>

        <button 
          className="mt-auto bg-[#1d2025] text-white py-3 rounded-lg"
          onClick={onClose}
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};

export default BoostInterface;