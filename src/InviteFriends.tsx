// InviteFriends.tsx
import React, { useState, useEffect } from 'react';
import { dollarCoin } from './images';

interface Friend {
  id: string;
  name: string;
  rank: number;
  coins: number;
  timestamp: number;
}

interface InviteFriendsProps {
  onClose: () => void;
}

export const InviteFriends: React.FC<InviteFriendsProps> = ({ onClose }) => {
  // Load friends from localStorage on component mount
  const [friends, setFriends] = useState<Friend[]>(() => {
    const savedFriends = localStorage.getItem('hamsterGameFriends');
    return savedFriends ? JSON.parse(savedFriends) : [];
  });

  // Save friends to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hamsterGameFriends', JSON.stringify(friends));
  }, [friends]);

  const addFriend = () => {
    const newFriend: Friend = {
      id: Date.now().toString(),
      name: `Friend ${friends.length + 1}`, // Incremental names
      rank: Math.floor(Math.random() * 5) + 1, // Random rank 1-5
      coins: Math.floor(Math.random() * 900000) + 100000, // Random coins
      timestamp: Date.now()
    };

    setFriends(prevFriends => [...prevFriends, newFriend]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
      <div className="max-w-xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between p-4">
          <button onClick={onClose} className="text-white">Cancel</button>
        </div>

        {/* Content Area - Made Scrollable */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4">
            <h1 className="text-white text-2xl text-center mb-4">Invite Friends!</h1>
            <p className="text-gray-400 text-center mb-6">You and your friend will receive bonuses</p>

            {/* Regular Invite */}
            <div className="bg-[#272a2f] rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <img src={dollarCoin} alt="coin" className="w-4 h-4" />
                    <span className="text-white">+10,000 for you and your friend</span>
                  </div>
                </div>
                <button 
                  className="bg-gradient-to-r from-[#90ef89] to-[#dd6e6e] px-4 py-2 rounded-full text-white"
                  onClick={addFriend}
                >
                  Invite a friend
                </button>
              </div>
            </div>

            {/* Premium Invite */}
            <div className="bg-[#272a2f] rounded-lg p-4 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <img src={dollarCoin} alt="coin" className="w-4 h-4" />
                    <span className="text-white">+10,000 for you and your friend</span>
                  </div>
                  <span className="text-sm text-gray-400">with Telegram Premium</span>
                </div>
                <button 
                  className="bg-gradient-to-r from-[#90ef89] to-[#dd6e6e] px-4 py-2 rounded-full text-white"
                  onClick={addFriend}
                >
                  Premium Invite
                </button>
              </div>
            </div>

            <h2 className="text-yellow-400 text-xl mb-4">More Bonuses</h2>
          </div>

          {/* Scrollable Friends List */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="space-y-3">
              {friends.length === 0 ? (
                <div className="bg-[#272a2f] rounded-lg p-4 text-center text-gray-400">
                  You haven't invited anyone yet
                </div>
              ) : (
                friends
                  .sort((a, b) => b.timestamp - a.timestamp) // Sort by newest first
                  .map(friend => (
                    <div 
                      key={friend.id} 
                      className="bg-[#272a2f] rounded-lg p-4 flex justify-between items-center animate-slideIn"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                        <div>
                          <p className="text-white">{friend.name}</p>
                          <p className="text-gray-400">Rank {friend.rank}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={dollarCoin} alt="coin" className="w-4 h-4" />
                        <span className="text-white">+{friend.coins.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;