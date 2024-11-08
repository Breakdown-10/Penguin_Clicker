import React, { useState, useEffect } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, hamsterCoin, mainCharacter } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Mine from './icons/Mine';
import Friends from './icons/Friends';
import Coins from './icons/Coins';
import InviteFriends from './InviteFriends';
import EarnCoins from './EarnCoins';
import MineInterface from './MineInterface';
import AirdropTasks from './AirdropTasks';
import BoostInterface from './BoostInterface';

const App: React.FC = () => {
  const levelNames = [
    "Bronze",    // From 0 to 4999 coins
    "Silver",    // From 5000 coins to 24,999 coins
    "Gold",      // From 25,000 coins to 99,999 coins
    "Platinum",  // From 100,000 coins to 999,999 coins
    "Diamond",   // From 1,000,000 coins to 2,000,000 coins
    "Epic",      // From 2,000,000 coins to 10,000,000 coins
    "Legendary", // From 10,000,000 coins to 50,000,000 coins
    "Master",    // From 50,000,000 coins to 100,000,000 coins
    "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
    "Lord"       // From 1,000,000,000 coins to ∞
  ];

  const levelMinPoints = [
    0,        // Bronze
    5000,     // Silver
    25000,    // Gold
    100000,   // Platinum
    1000000,  // Diamond
    2000000,  // Epic
    10000000, // Legendary
    50000000, // Master
    100000000,// GrandMaster
    1000000000// Lord
  ];

  const resetGame = () => {
    // Reset all state variables
    setPoints(0);
    setCurrentDay(1);
    setLevelIndex(0);
    setCurrentEnergy(1000);
    setMaxEnergy(1000);
    setMultitapLevel(1);
    setPointsToAdd(1); 
    setEnergyLimitLevel(1);
    setFullEnergyRefillsLeft(6);
    setLastRefillTime(null);
    setLastClaimTime(null);
    setClaimTimeLeft('');
    setCanClaim(true);
    setProfitPerHour(0);
  
    // Clear localStorage
    localStorage.clear();
    
    // Set default values in localStorage
    localStorage.setItem('currentEnergy', '1000');
    localStorage.setItem('maxEnergy', '1000');
    localStorage.setItem('multitapLevel', '1');
    localStorage.setItem('pointsToAdd', '1'); 
    localStorage.setItem('energyLimitLevel', '1');
    localStorage.setItem('fullEnergyRefillsLeft', '6');
    localStorage.setItem('hamsterGameFriends', '[]');
    localStorage.setItem('completedTasks', '[]');
    localStorage.setItem('points', '0');
    localStorage.setItem('profitPerHour', '0');
  
    // Reload the page to ensure all components get fresh state
    window.location.reload();
  };

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints) : 0;
  });
  const [currentDay, setCurrentDay] = useState(1);
  const [dailyRewards, setDailyRewards] = useState([500, 800, 1000, 1500, 2000, 2500, 3000, 5000, 100, 200]);
  const [showDailyRewardModal, setShowDailyRewardModal] = useState(false);
  const [showAirdropModal, setShowAirdropModal] = useState(false);
  const [lastClaimTime, setLastClaimTime] = useState<number | null>(null);
const [claimTimeLeft, setClaimTimeLeft] = useState<string>('');
const [canClaim, setCanClaim] = useState(true);

const [currentEnergy, setCurrentEnergy] = useState(1000);
const [maxEnergy, setMaxEnergy] = useState(1000);
const [multitapLevel, setMultitapLevel] = useState(1);
const [energyLimitLevel, setEnergyLimitLevel] = useState(1);
const [pointsToAdd, setPointsToAdd] = useState(1);
const [fullEnergyRefillsLeft, setFullEnergyRefillsLeft] = useState(6);
const [lastRefillTime, setLastRefillTime] = useState<number | null>(null);
const [showBoostModal, setShowBoostModal] = useState(false);
const [timeUntilNextRefill, setTimeUntilNextRefill] = useState('');

useEffect(() => {
  // Load saved states from localStorage
  const savedStates = {
    currentEnergy: parseInt(localStorage.getItem('currentEnergy') || '1000'),
    maxEnergy: parseInt(localStorage.getItem('maxEnergy') || '1000'),
    multitapLevel: parseInt(localStorage.getItem('multitapLevel') || '1'),
    pointsToAdd: parseInt(localStorage.getItem('pointsToAdd') || '1'), 
    energyLimitLevel: parseInt(localStorage.getItem('energyLimitLevel') || '1'),
    fullEnergyRefillsLeft: parseInt(localStorage.getItem('fullEnergyRefillsLeft') || '6'),
    lastRefillTime: localStorage.getItem('lastRefillTime'),
  };

  setCurrentEnergy(savedStates.currentEnergy);
  setMaxEnergy(savedStates.maxEnergy);
  setMultitapLevel(savedStates.multitapLevel);
  setPointsToAdd(savedStates.pointsToAdd); 
  setEnergyLimitLevel(savedStates.energyLimitLevel);
  setFullEnergyRefillsLeft(savedStates.fullEnergyRefillsLeft);
  if (savedStates.lastRefillTime) {
    setLastRefillTime(parseInt(savedStates.lastRefillTime));
  }

  // Energy regeneration every 3 seconds
  const energyTimer = setInterval(() => {
    setCurrentEnergy(prev => {
      if (prev < maxEnergy) {
        const newEnergy = Math.min(prev + 5, maxEnergy); // Increase by 5 every 10 seconds
        localStorage.setItem('currentEnergy', newEnergy.toString());
        return newEnergy;
      }
      return prev;
    });
  }, 10000); 

  // Refill cooldown timer
  const refillTimer = setInterval(() => {
    if (lastRefillTime) {
      const now = Date.now();
      const timeSinceLastRefill = now - lastRefillTime;
      if (timeSinceLastRefill >= 1200000) { // 20 minutes in milliseconds
        setTimeUntilNextRefill('');
      } else {
        const timeLeft = Math.ceil((1200000 - timeSinceLastRefill) / 1000);
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        setTimeUntilNextRefill(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }
  }, 1000);

  return () => {
    clearInterval(energyTimer);
    clearInterval(refillTimer);
  };
}, [maxEnergy, lastRefillTime]);


const formatTimeLeft = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
    
const claimDailyReward = () => {
  if (currentDay <= 10 && canClaim) {
    setPoints(points + dailyRewards[currentDay - 1]);
    setCurrentDay(currentDay + 1);
    setLastClaimTime(Date.now());
    setCanClaim(false);
    
    // Store the claim data in localStorage
    localStorage.setItem('lastClaimTime', Date.now().toString());
    localStorage.setItem('currentDay', (currentDay + 1).toString());
  }
};
  useEffect(() => {
    setDailyRewards([500, 800, 1000, 1500, 2000, 2500, 3000, 5000, 100, 200]); // Set daily rewards based on some logic
 }, []);
 useEffect(() => {
  // Load saved data from localStorage
  const savedClaimTime = localStorage.getItem('lastClaimTime');
  const savedCurrentDay = localStorage.getItem('currentDay');
  
  if (savedClaimTime) {
    setLastClaimTime(parseInt(savedClaimTime));
  }
  if (savedCurrentDay) {
    setCurrentDay(parseInt(savedCurrentDay));
  }

  const timer = setInterval(() => {
    if (lastClaimTime) {
      const now = Date.now();
      const timeDiff = now - lastClaimTime;
      const timeLeft = 24 * 60 * 60 * 1000 - timeDiff; // 24 hours in milliseconds

      if (timeLeft <= 0) {
        setCanClaim(true);
        setClaimTimeLeft('');
      } else {
        setCanClaim(false);
        setClaimTimeLeft(formatTimeLeft(timeLeft));
      }
    }
  }, 1000);

  return () => clearInterval(timer);
}, [lastClaimTime]);

const addCoins = (amount: number) => {
  setPoints(prev => {
    const newPoints = prev + amount;
    localStorage.setItem('points', newPoints.toString());
    return newPoints;
  });
};
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
 // const pointsToAdd = 11;
 const [profitPerHour, setProfitPerHour] = useState(() => {
  const savedProfit = localStorage.getItem('profitPerHour');
  return savedProfit ? parseInt(savedProfit) : 0;
});

  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showEarnModal, setShowEarnModal] = useState(false);
  const [showMineModal, setShowMineModal] = useState(false);

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentEnergy <= 0) return;
  
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    
    setCurrentEnergy(prev => {
      const newEnergy = Math.max(0, prev - multitapLevel);
      localStorage.setItem('currentEnergy', newEnergy.toString());
      return newEnergy;
    });
  
    const addedPoints = pointsToAdd * multitapLevel;
    setPoints(prev => prev + addedPoints);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  
    setTimeout(() => {
      card.style.transform = '';
    }, 100);
  };
  
  const handleRefillEnergy = () => {
    if (fullEnergyRefillsLeft > 0 && (!lastRefillTime || Date.now() - lastRefillTime >= 1200000)) {
      const newEnergy = maxEnergy;
      setCurrentEnergy(newEnergy);
      localStorage.setItem('currentEnergy', newEnergy.toString());
      
      setFullEnergyRefillsLeft(prev => {
        const newRefills = prev - 1;
        localStorage.setItem('fullEnergyRefillsLeft', newRefills.toString());
        return newRefills;
      });
      
      setLastRefillTime(Date.now());
      localStorage.setItem('lastRefillTime', Date.now().toString());
      setTimeUntilNextRefill('20:00');
    }
  };
  
  const handleUpgradeMultitap = () => {
    if (multitapLevel < 15) {
      setMultitapLevel(prev => {
        const newLevel = prev + 1;
        setPointsToAdd(newLevel); // Update points to add
        localStorage.setItem('multitapLevel', newLevel.toString());
        localStorage.setItem('pointsToAdd', newLevel.toString()); // Save pointsToAdd
        return newLevel;
      });
    }
  };
  
  const handleUpgradeEnergyLimit = () => {
    if (energyLimitLevel < 15) {
      setEnergyLimitLevel(prev => {
        const newLevel = prev + 1;
        const newMaxEnergy = 1000 + (newLevel - 1) * 500;
        setMaxEnergy(newMaxEnergy);
        localStorage.setItem('energyLimitLevel', newLevel.toString());
        localStorage.setItem('maxEnergy', newMaxEnergy.toString());
        return newLevel;
      });
    }
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex, levelMinPoints, levelNames.length]);

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setPoints(prevPoints => {
        const newPoints = prevPoints + pointsPerSecond;
        localStorage.setItem('points', newPoints.toString());
        return newPoints;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour]);

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl"> 
        <div className="px-4 z-10">
         <div className="flex items-center space-x-2 pt-6 justify-center">
           <div className="p-1 rounded-lg bg-[#1d2025]">
             <Hamster size={24} className="text-[#d4d4d4]" />
           </div>
           <div>
             <p className="text-lg">Taha (CEO)</p>
           </div>
         </div>

        </div>

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[28px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 custom-gradient rounded-t-[26px]">
          <div className="flex items-center justify-between top-4 left-4 space-x-4 mt-1">
          <div className="flex items-center mt-5 pentagon-border">
  <div className="flex-1 text-center">
    <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
    <div className="flex items-center justify-center space-x-1">
      <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
      <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
      <Info size={20} className="text-[#43433b]" />
    </div>
  </div>
  <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
  <Settings className="text-white" />
  <button 
      onClick={resetGame}
      className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md"
    >
      Reset
    </button>
</div>
<div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center mt-5 w-64">
  <div>
    <div className="flex justify-between">
      <p className="text-md">{levelNames[levelIndex]}</p>
      <p className="text-md">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
    </div>
    <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
      <div className="w-full h-2 bg-[#43433b] rounded-full">
        <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
      </div>
    </div>
  </div>
</div>
</div>
<div className="px-4 mt-16 flex justify-between gap-2">
  <div 
    className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative"
    onClick={() => setShowDailyRewardModal(true)}
  >
    <div className="dot"></div>
    <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
    <p className="text-[10px] text-center text-white mt-1">Daily reward</p>
    <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyRewardTimeLeft}</p>
  </div>
  {showDailyRewardModal && (
  <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
    <div className="bg-[#1d1d1d] rounded-2xl p-6 w-11/12 max-w-md relative">
      {/* Close button */}
      <button 
        onClick={() => setShowDailyRewardModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="text-center mb-6">
        <h3 className="text-white text-xl font-bold">Daily reward</h3>
        <p className="text-gray-400 text-sm mt-2">
          Claim coins for daily game entry without missing days. The "Claim" button needs to be pressed daily; otherwise the day counter will reset.
        </p>
      </div>
      
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={`bg-[#272a2f] rounded-lg p-3 aspect-square flex flex-col items-center justify-center relative ${
              index + 1 <= currentDay ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <span className="text-[#85827d] text-xs mb-1">DAY {index + 1}</span>
            <img src={dollarCoin} alt="Coin" className="w-8 h-8 mb-1" />
            <span className="text-white text-xs">
              {dailyRewards[index].toLocaleString()}
            </span>
            {index + 1 < currentDay && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-green-500">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {currentDay <= 10 && (
        <button
          className={`w-full px-4 py-3 rounded-xl text-white font-bold text-lg ${
            canClaim 
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 cursor-pointer' 
              : 'bg-gray-600 cursor-not-allowed'
          }`}
          onClick={claimDailyReward}
          disabled={!canClaim}
        >
          {canClaim 
            ? 'Claim' 
            : `Claim In ${claimTimeLeft}`}
        </button>
      )}
    </div>
  </div>
)}
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily cipher</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyCipherTimeLeft}</p>
              </div>
<div 
  className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative"
  onClick={() => setShowMineModal(true)}
>
  <div className="dot"></div>
  <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
  <p className="text-[10px] text-center text-white mt-1">Daily combo</p>
  <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyComboTimeLeft}</p>
</div>
            </div>

<div className="px-4 mt-4 flex justify-center">
  <div className="rounded-rect-outer" onClick={handleCardClick}>
    <div className="rounded-rect-inner flex flex-col">
      <div className="px-4 py-2 flex items-center space-x-2">
        <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
        <p className="text-4xl text-white">{points.toLocaleString()}</p>
      </div>
      <img src={mainCharacter} alt="Main Character" className="w-full h-full" />
    </div>
  </div>
            </div>
          </div>
          <div className="px-4 mt-4 flex justify-center relative">
  <button 
    onClick={() => setShowBoostModal(true)}
    className="absolute top-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold"
  >
    <div className="text-yellow-400">⚡</div>
    <span>{`${currentEnergy}/${maxEnergy}`}</span>
  </button>
  </div>
        </div>
      </div>
      

      {/* Bottom fixed div */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#283b3e] flex justify-around items-center z-50 rounded-3xl text-xs">
        <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
          <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Exchange</p>
        </div>
        <div 
  className="text-center text-[#85827d] w-1/5"
  onClick={() => setShowMineModal(true)}
>
  <Mine className="w-8 h-8 mx-auto" />
  <p className="mt-1">Mine</p>
</div>
        <div 
  className="text-center text-[#85827d] w-1/5"
  onClick={() => setShowFriendsModal(true)}
>
  <Friends className="w-8 h-8 mx-auto" />
  <p className="mt-1">Friends</p>
</div>
<div 
  className="text-center text-[#85827d] w-1/5"
  onClick={() => setShowEarnModal(true)}
>
  <Coins className="w-8 h-8 mx-auto" />
  <p className="mt-1">Earn</p>
</div>
<div 
  className="text-center text-[#85827d] w-1/5"
  onClick={() => setShowAirdropModal(true)}
>
  <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
  <p className="mt-1">Airdrop</p>
</div>
      </div>

      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
       {showFriendsModal && (
        <InviteFriends onClose={() => setShowFriendsModal(false)} />
      )}
    {showEarnModal && (
      <EarnCoins 
        onClose={() => setShowEarnModal(false)}
        addCoins={addCoins}
      />
    )}
 {showMineModal && (
  <MineInterface
    onClose={() => setShowMineModal(false)}
    updateProfitPerHour={(profit) => {
      setProfitPerHour(prev => {
        const newProfit = prev + profit;
        localStorage.setItem('profitPerHour', newProfit.toString());
        return newProfit;
      });
    }}
    currentProfitPerHour={profitPerHour}
    points={points}
    setPoints={(newPoints) => {
      setPoints(newPoints);
      localStorage.setItem('points', newPoints.toString());
    }}
  />
)}
  {showAirdropModal && (
  <AirdropTasks onClose={() => setShowAirdropModal(false)} />
)}
{showBoostModal && (
  <BoostInterface
    onClose={() => setShowBoostModal(false)}
    currentEnergy={currentEnergy}
    maxEnergy={maxEnergy}
    fullEnergyRefillsLeft={fullEnergyRefillsLeft}
    timeUntilNextRefill={timeUntilNextRefill}
    multitapLevel={multitapLevel}
    energyLimitLevel={energyLimitLevel}
    onRefillEnergy={handleRefillEnergy}
    onUpgradeMultitap={handleUpgradeMultitap}
    onUpgradeEnergyLimit={handleUpgradeEnergyLimit}
  />
)}
    </div>
  );
};

export default App;
