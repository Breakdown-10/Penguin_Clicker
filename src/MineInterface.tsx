// MineInterface.tsx
import React, { useState, useEffect } from 'react';
import { dollarCoin } from './images';
import { questionmark } from './images';
import { 
  btcIcon, ethIcon} from './images';
 

interface MineProps {
  onClose: () => void;
  updateProfitPerHour: (profit: number) => void;
  currentProfitPerHour: number;
  points: number;
  setPoints: (newPoints: number) => void; // Make sure this prop is properly passed
}

interface TeamMember {
  id: string;
  title: string;
  coins: number;
  coinsPerHour: number;
  upgradeCost: number;
  level: number;
  new?: boolean;
  multiplier?: number;
  category: string;
  image: string;
}

export const MineInterface: React.FC<MineProps> = ({ 
  onClose, 
  updateProfitPerHour,
  currentProfitPerHour,
  points,
  setPoints
}) => {
  const [activeCategory, setActiveCategory] = useState('Market');
  const [dailyComboMembers, setDailyComboMembers] = useState<TeamMember[]>([]);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [upgradedMembers, setUpgradedMembers] = useState<string[]>([]);
  const [revealedMembers, setRevealedMembers] = useState<string[]>([]);
  const [lastClaimDate, setLastClaimDate] = useState<string>('');
  const [todayCombo, setTodayCombo] = useState<TeamMember[]>([]);
  const [lastRevealDate, setLastRevealDate] = useState<string>('');

  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const difference = midnight.getTime() - now.getTime();
  
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const categories = ['Market', 'PR&Team', 'Legal', 'Web 3', 'Specials'];

  const teamMembersByCategory = {
    'Market': [
      { id: 'btc', title: 'BTC', coins: 116190, coinsPerHour: 1612, upgradeCost: 500, level: 1, multiplier: 1.5, category: 'Market',  image: btcIcon },
      { id: 'eth', title: 'ETH', coins: 156120, coinsPerHour: 1610, upgradeCost: 300, level: 1, multiplier: 1.3, category: 'Market',  image: ethIcon},
      { id: 'gamefi', title: 'GameFi Tokens', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.4, category: 'Market', image: btcIcon },
      { id: 'web3', title: 'Web3 Integrations', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Market', image: btcIcon },
      { id: 'meme', title: 'MemeCoins', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Market', image: btcIcon },
      { id: 'p2p', title: 'P2P Trading', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Market', image: btcIcon }
    ],
    'PR&Team': [
      { id: 'ceo', title: 'CEO', coins: 116190, coinsPerHour: 1612, upgradeCost: 500, level: 1, multiplier: 1.5, category: 'PR&Team', image: btcIcon },
      { id: 'marketing', title: 'Marketing', coins: 156120, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.3, category: 'PR&Team', image: btcIcon },
      { id: 'it', title: 'IT Team', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.4, category: 'PR&Team', image: btcIcon },
      { id: 'support', title: 'Support Team', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'PR&Team', image: btcIcon },
      { id: 'influencers', title: 'Influencers', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'PR&Team', image: btcIcon},
      { id: 'partnership', title: 'Partnership Program', coins: 161000, coinsPerHour: 1610, upgradeCost: 161000, level: 1, multiplier: 1.2, category: 'PR&Team', image: btcIcon },
      { id: 'product', title: 'Product Team', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'PR&Team', image: btcIcon }
    ],
    'Legal': [
      { id: 'kyc', title: 'KYC', coins: 116190, coinsPerHour: 1612, upgradeCost: 500, level: 1, multiplier: 1.5, category: 'Legal', image: btcIcon },
      { id: 'kyb', title: 'KYB', coins: 156120, coinsPerHour: 1610, upgradeCost: 300, level: 1, multiplier: 1.3, category: 'Legal', image: btcIcon},
      { id: 'sec', title: 'SEC Transparency', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.4, category: 'Legal', image: btcIcon },
      { id: 'uae', title: 'License UAE', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Legal', image: btcIcon },
      { id: 'europe', title: 'License Europe', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Legal', image: btcIcon },
      { id: 'asia', title: 'License Asia', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Legal', image: btcIcon },
      { id: 'australia', title: 'License Australia', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Legal', image: btcIcon }
    ],
    'Web 3': [
      { id: 'dex', title: 'DEX', coins: 116190, coinsPerHour: 1612, upgradeCost: 500, level: 1, multiplier: 1.5, category: 'Web 3', image: btcIcon },
      { id: 'oracle', title: 'Oracle', coins: 156120, coinsPerHour: 1610, upgradeCost: 300, level: 1, multiplier: 1.3, category: 'Web 3', image: btcIcon },
      { id: 'grant', title: 'Grant for Developers', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.4, category: 'Web 3', image: btcIcon },
      { id: 'farming', title: 'Crypto Farming', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Web 3', image: btcIcon },
      { id: 'nft', title: 'NFT Metaverse', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Web 3', image: btcIcon }
    ],
    'Specials': [
      { id: 'telegram', title: '5M Telegram Channel', coins: 116190, coinsPerHour: 1612, upgradeCost: 300, level: 1, multiplier: 1.5, category: 'Specials', image: btcIcon },
      { id: 'yacht', title: 'Penguins Yacht', coins: 156120, coinsPerHour: 1610, upgradeCost: 300, level: 1, multiplier: 1.3, category: 'Specials', image: btcIcon },
      { id: 'leaders', title: 'TG Leaders', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.4, category: 'Specials', image: btcIcon },
      { id: 'premarket', title: 'Premarket Launch', coins: 161000, coinsPerHour: 1610, upgradeCost: 500, level: 1, multiplier: 1.2, category: 'Specials', image: btcIcon }
    ]
  };

  const [teamMembers, setTeamMembers] = useState<{ [key: string]: TeamMember[] }>(teamMembersByCategory);

  const dailyComboReward = 5000000;

  useEffect(() => {
    console.log('Current revealed members:', revealedMembers);
    console.log('Current daily combo:', dailyComboMembers);
    console.log('Saved combo in localStorage:', localStorage.getItem('todayCombo'));
    console.log('Saved revealed in localStorage:', localStorage.getItem('revealedMembers'));
  }, [revealedMembers, dailyComboMembers]);

  useEffect(() => {
    // Load saved team members from localStorage
    const savedTeamMembers = localStorage.getItem('teamMembers');
    if (savedTeamMembers) {
      setTeamMembers(JSON.parse(savedTeamMembers));
    }

    const savedUpgradedMembers = localStorage.getItem('upgradedMembers');
    if (savedUpgradedMembers) {
      setUpgradedMembers(JSON.parse(savedUpgradedMembers));
    }
  }, []);
  
  // Save upgraded members whenever they change
  useEffect(() => {
    localStorage.setItem('upgradedMembers', JSON.stringify(upgradedMembers));
  }, [upgradedMembers]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedLastClaimDate = localStorage.getItem('lastClaimDate');
    const savedRevealedMembers = localStorage.getItem('revealedMembers');
    const savedTodayCombo = localStorage.getItem('todayCombo');
    const savedHasClaimed = localStorage.getItem('hasClaimed');
    const savedLastRevealDate = localStorage.getItem('lastRevealDate');
    
    // Check if it's a new day
    if (!savedLastClaimDate || savedLastClaimDate !== today) {
      // It's a new day, reset everything
      generateDailyCombo();
      setHasClaimed(false);
      setRevealedMembers([]);
      setLastRevealDate('');
      localStorage.setItem('hasClaimed', 'false');
      localStorage.setItem('revealedMembers', JSON.stringify([]));
      localStorage.setItem('lastRevealDate', '');
    } else {
      // Same day, load saved states
      if (savedTodayCombo) {
        const combo = JSON.parse(savedTodayCombo);
        setTodayCombo(combo);
        setDailyComboMembers(combo);
      }
      
      if (savedRevealedMembers) {
        setRevealedMembers(JSON.parse(savedRevealedMembers));
      }
      
      if (savedLastRevealDate) {
        setLastRevealDate(savedLastRevealDate);
      }
      
      setHasClaimed(savedHasClaimed === 'true');
      setLastClaimDate(savedLastClaimDate);
    }
  }, []);
  

  // Generate daily combo based on date
  const generateDailyCombo = () => {
    const today = new Date().toISOString().split('T')[0];
    const allMembers = Object.values(teamMembersByCategory).flat();
    
    const seed = today.split('-').reduce((acc, val) => acc + parseInt(val), 0);
    const shuffled = [...allMembers].sort((a, b) => {
      const randomA = Math.sin(seed * allMembers.indexOf(a)) * 10000;
      const randomB = Math.sin(seed * allMembers.indexOf(b)) * 10000;
      return randomA - randomB;
    });
    
    const newCombo = shuffled.slice(0, 3);
    
    // Reset everything for new day
    setTodayCombo(newCombo);
    setDailyComboMembers(newCombo);
    setRevealedMembers([]);
    setHasClaimed(false);
    
    // Save new state to localStorage
    localStorage.setItem('todayCombo', JSON.stringify(newCombo));
    localStorage.setItem('revealedMembers', JSON.stringify([]));
    localStorage.setItem('hasClaimed', 'false');
    localStorage.removeItem('lastClaimDate');
  };

  

  const handleUpgrade = (memberId: string, category: string) => {
    if (teamMembers[category]) {
      const member = teamMembers[category].find(m => m.id === memberId);
      if (member && points >= member.upgradeCost) {
        // Deduct points first
        const newPoints = points - member.upgradeCost;
        setPoints(newPoints);
        
        setTeamMembers(prevMembers => {
          const updatedMembers = {
            ...prevMembers,
            [category]: prevMembers[category].map(m => {
              if (m.id === memberId) {
                const newLevel = m.level + 1;
                const multiplier = m.multiplier || 1.2;
                const newCoinsPerHour = Math.floor(m.coinsPerHour * multiplier);
                const newUpgradeCost = Math.floor(m.upgradeCost * multiplier);
                
                // Calculate and update profit per hour
                const profitIncrease = newCoinsPerHour - m.coinsPerHour;
                updateProfitPerHour(profitIncrease);
  
                // Check if this member is part of today's combo
                if (todayCombo.some(comboMember => comboMember.id === memberId) && 
                    !revealedMembers.includes(memberId)) {
                  const newRevealedMembers = [...revealedMembers, memberId];
                  setRevealedMembers(newRevealedMembers);
                  localStorage.setItem('revealedMembers', JSON.stringify(newRevealedMembers));
                }
  
                if (!upgradedMembers.includes(memberId)) {
                  const newUpgradedMembers = [...upgradedMembers, memberId];
                  setUpgradedMembers(newUpgradedMembers);
                  localStorage.setItem('upgradedMembers', JSON.stringify(newUpgradedMembers));
                }
  
                return {
                  ...m,
                  level: newLevel,
                  coinsPerHour: newCoinsPerHour,
                  upgradeCost: newUpgradeCost,
                };
              }
              return m;
            })
          };
          
          localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
          return updatedMembers;
        });
  
        localStorage.setItem('points', newPoints.toString());
      } else {
        alert('Not enough points for upgrade!');
      }
    }
  };
  
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we need to generate new combo
    if (!todayCombo.length || today !== lastClaimDate?.split('T')[0]) {
      generateDailyCombo();
      setRevealedMembers([]);
      localStorage.setItem('revealedMembers', JSON.stringify([]));
    }
  }, []);

  const checkDailyCombo = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (hasClaimed && lastClaimDate === today) {
      alert('You have already claimed today\'s reward!');
      return;
    }
  
    const comboIds = todayCombo.map(m => m.id);
    const hasAllUpgrades = comboIds.every(id => upgradedMembers.includes(id));
  
    if (hasAllUpgrades) {
      // Update points
      const newPoints = points + dailyComboReward;
      setPoints(newPoints);
      
      // Save claim status
      setLastClaimDate(today);
      setHasClaimed(true);
      setLastRevealDate(today);
      
      // Reveal all combo members
      const newRevealedMembers = todayCombo.map(m => m.id);
      setRevealedMembers(newRevealedMembers);
      
      // Save all states to localStorage
      localStorage.setItem('points', JSON.stringify(newPoints));
      localStorage.setItem('lastClaimDate', today);
      localStorage.setItem('hasClaimed', 'true');
      localStorage.setItem('revealedMembers', JSON.stringify(newRevealedMembers));
      localStorage.setItem('todayCombo', JSON.stringify(todayCombo));
      localStorage.setItem('lastRevealDate', today);
  
      alert(`Congratulations! You've claimed ${dailyComboReward.toLocaleString()} points!`);
    } else {
      // Reveal only upgraded members
      const newlyRevealed = comboIds.filter(id => 
        upgradedMembers.includes(id) && !revealedMembers.includes(id)
      );
      
      if (newlyRevealed.length > 0) {
        const updatedRevealedMembers = [...revealedMembers, ...newlyRevealed];
        setRevealedMembers(updatedRevealedMembers);
        setLastRevealDate(today);
        localStorage.setItem('revealedMembers', JSON.stringify(updatedRevealedMembers));
        localStorage.setItem('lastRevealDate', today);
      }
      
      alert('Keep upgrading team members to reveal the combination!');
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
      <div className="max-w-xl mx-auto h-full flex flex-col bg-gradient-to-b from-[#272a2f] to-[#1a1c1f] overflow-y-auto">
        {/* Header */}
        <div className="p-4 flex items-center justify-between sticky top-0 bg-[#272a2f] z-10">
          <button onClick={onClose} className="text-white">Cancel</button>
          
          <div className="flex items-center space-x-2">
            <span className="text-white">Points: {points.toLocaleString()}</span>
          </div>
        </div>

        {/* Main Stats */}
        <div className="p-4">
          <div className="text-center mb-4">
            <div className="flex justify-center items-center gap-2">
              <span className="text-gray-400">Profit per hour</span>
              <div className="flex items-center">
                <img src={dollarCoin} alt="coin" className="w-4 h-4" />
                <span className="text-white">+{currentProfitPerHour.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Daily Combo */}
          <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-white">Daily combo</h3>
      <span className="text-gray-400">{timeLeft}</span>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {dailyComboMembers.map((member, index) => (
        <div 
          key={index} 
          className="bg-[#272a2f] rounded-lg p-4 aspect-square relative"
        >
          <img 
            src={revealedMembers.includes(member.id) ? member.image : questionmark} 
            alt={revealedMembers.includes(member.id) ? member.title : "Mystery member"} 
            className="w-full h-full object-contain transition-all duration-300" 
          />
          <div className="absolute bottom-0 left-2 right-2 text-center">
            <span className="text-white text-xs">
              {revealedMembers.includes(member.id) ? member.title : ''}
            </span>
          </div>
        </div>
      ))}
    </div>
    <button 
      onClick={checkDailyCombo}
      className={`w-full mt-4 bg-gradient-to-r from-[#90ef89] to-[#dd6e6e] px-4 py-2 rounded-lg text-white 
        ${hasClaimed && lastClaimDate === new Date().toISOString().split('T')[0] ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={hasClaimed && lastClaimDate === new Date().toISOString().split('T')[0]}
    >
      {hasClaimed && lastClaimDate === new Date().toISOString().split('T')[0] 
        ? 'Claimed' 
        : `Claim (${dailyComboReward.toLocaleString()})`}
    </button>
  </div>

          {/* Categories */}
          <div className="flex justify-between mb-6 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  category === activeCategory ? 'bg-[#90ef89] text-black' : 'text-gray-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-2 gap-4">
  {teamMembers[activeCategory]?.map((member) => (
    <div key={member.id} className="bg-[#272a2f] rounded-lg p-4 relative">
      {/* Add image display */}
      <div className="w-16 h-16 mb-2 mx-auto">
        <img 
          src={member.image} 
          alt={member.title} 
          className="w-full h-full object-contain"
        />
      </div>
      {member.new && (
        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          New
        </span>
      )}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-white">{member.title}</h4>
        <span className="text-gray-400">Lvl {member.level}</span>
      </div>
      <div className="flex items-center gap-1 mb-2">
        <img src={dollarCoin} alt="coin" className="w-4 h-4" />
        <span className="text-white">+{member.coinsPerHour.toLocaleString()}/hour</span>
      </div>
      <button 
        className="w-full bg-gradient-to-r from-[#90ef89] to-[#dd6e6e] px-4 py-2 rounded-lg text-white"
        onClick={() => handleUpgrade(member.id, activeCategory)}
        disabled={points < member.upgradeCost}
      >
        Upgrade ({member.upgradeCost.toLocaleString()})
      </button>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  );
};

export default MineInterface;