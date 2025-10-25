'use client';

import React from 'react';
import {User} from 'lucide-react';
import SearchBar from './SearchBar';

const RightSidebar = () => {
  const suggestions = [
    { username: 'designpro', mutual: 3 },
    { username: 'photo_art', mutual: 7 },
    { username: 'creative_mind', mutual: 2 },
    { username: 'digital_nomad', mutual: 5 },
  ];

  return (
    // <div className="sticky right-0 top-0 h-screen w-80 p-6 border-l border-neutral-800 hidden lg:block">
    
    <div className="fixed right-0 top-0 h-screen w-80 bg-black border-l border-gray-800 p-6">

      <div className="pb-5">
        <SearchBar />
      </div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
          <User className="w-8 h-8 text-gray-600" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Username</p>
          <p className="text-gray-500 text-xs">user_name</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-semibold">Suggested for you</h3>
          <button className="text-white text-xs font-semibold hover:text-gray-400 transition-colors">
            See All
          </button>
        </div>

        <div className="space-y-4">
          {suggestions.map((user, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{user.username}</p>
                <p className="text-gray-500 text-xs">Followed by {user.mutual} others</p>
              </div>
              <button className="text-white text-xs font-semibold hover:text-gray-400 transition-colors flex-shrink-0">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="text-gray-600 text-xs space-y-1">
          <p>About · Help · Press · API · Jobs · Privacy</p>
          <p>Terms · Locations · Language · Meta Verified</p>
          <p className="mt-4">© 2025 FESNUK FROM INDONESIA</p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;