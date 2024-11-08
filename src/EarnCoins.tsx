// EarnCoins.tsx
import React, { useState } from 'react';
import { dollarCoin } from './images';

interface Task {
  id: string;
  icon: string;
  title: string;
  reward: number;
  color: string;
  link: string;
  completed?: boolean;
}

interface EarnCoinsProps {
    onClose: () => void;
    addCoins: (amount: number) => void;
  }

export const EarnCoins: React.FC<EarnCoinsProps> = ({ onClose, addCoins  }) => {
  // Load completed tasks from localStorage
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const tasks: Task[] = [
    {
      id: '1',
      icon: '🎥',
      title: '5 richest teen on the world',
      reward: 10000,
      color: 'from-red-500 to-red-700',
      link: 'https://www.youtube.com/watch?v=your-video-id'
    },
    {
      id: '2',
      icon: '▶️',
      title: 'Watch Dolphin Game Video',
      reward: 25000,
      color: 'from-red-600 to-red-800',
      link: 'https://www.youtube.com/watch?v=your-video-id-2'
    },
    {
      id: '3',
      icon: '📘',
      title: 'Follow us on Facebook',
      reward: 100000,
      color: 'from-blue-500 to-blue-700',
      link: 'https://www.facebook.com/your-page'
    },
    {
      id: '4',
      icon: '📸',
      title: 'Follow us on Instagram',
      reward: 100000,
      color: 'from-purple-500 to-pink-500',
      link: 'https://www.instagram.com/your-profile'
    },
    {
      id: '5',
      icon: '💼',
      title: 'Follow us on LinkedIn',
      reward: 50000,
      color: 'from-blue-600 to-blue-800',
      link: 'https://www.linkedin.com/company/your-company'
    },
    {
      id: '6',
      icon: '✈️',
      title: 'Join our Telegram',
      reward: 75000,
      color: 'from-blue-400 to-blue-600',
      link: 'https://t.me/your-channel'
    }
  ];

  const handleTaskClick = (task: Task) => {
    // Check if task is already completed
    if (completedTasks.includes(task.id)) {
      alert('You have already completed this task!');
      return;
    }

    // Open link in new window
    const newWindow = window.open(task.link, '_blank');

    // If popup was blocked, alert user
    if (!newWindow) {
      alert('Please allow popups to complete this task');
      return;
    }

    // Add event listener for when user returns to mark task as complete
    window.addEventListener('focus', () => {
      const confirmComplete = window.confirm('Did you complete the task?');
      if (confirmComplete) {
        completeTask(task);
      }
    }, { once: true });
  };

  const completeTask = (task: Task) => {
    const newCompletedTasks = [...completedTasks, task.id];
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
    
    // Add rewards to user's coins
    addCoins(task.reward);
    
    alert(`Congratulations! You earned ${task.reward.toLocaleString()} coins!`);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
      <div className="max-w-xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between p-4">
          <button onClick={onClose} className="text-white">Cancel</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col p-4">
          <h1 className="text-white text-2xl text-center mb-2">Earn More Coins</h1>
          <p className="text-gray-400 text-center mb-6">Complete the task and earn more coins</p>

          {/* Central Circle */}
          {/* ... (same as before) ... */}

          {/* Tasks Grid */}
          <div className="grid grid-cols-2 gap-4 overflow-y-auto">
            {tasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => !isCompleted && handleTaskClick(task)}
                  className={`bg-[#272a2f] rounded-lg p-4 flex flex-col items-center 
                    ${isCompleted ? 'opacity-50' : 'hover:scale-105'} 
                    transition-transform cursor-pointer`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${task.color} 
                    flex items-center justify-center mb-2 relative`}
                  >
                    <span className="text-2xl">{task.icon}</span>
                    {isCompleted && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl 
                        flex items-center justify-center">
                        <span className="text-green-400 text-2xl">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white text-sm text-center mb-2">{task.title}</p>
                  <div className="flex items-center gap-1">
                    <img src={dollarCoin} alt="coin" className="w-4 h-4" />
                    <span className="text-white">+{task.reward.toLocaleString()}</span>
                  </div>
                  {isCompleted && (
                    <span className="text-green-400 text-xs mt-2">Completed</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnCoins;