import React from 'react';
import { LogOut, User } from 'lucide-react';
import { User as UserType } from '../../types';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
  liveStatus?: 'live' | 'mock';
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, liveStatus = 'live' }) => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-700 p-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back, {user.name}</h2>
        <p className="text-purple-100">Dashboard Overview</p>
      </div>
      
      <div className="flex items-center space-x-4">
        {/** Live data indicator */}
        <div className="flex items-center mr-4">
          <span
            className={`w-3 h-3 rounded-full mr-2 inline-block ${liveStatus === 'live' ? 'bg-green-400' : 'bg-yellow-400'}`}
          />
          <span className="text-white text-sm">{liveStatus === 'live' ? 'Live' : 'Mock'}</span>
        </div>
        <div className="flex items-center space-x-2 text-white">
          <User className="w-5 h-5" />
          <span>{user.email}</span>
        </div>
        
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-white"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};