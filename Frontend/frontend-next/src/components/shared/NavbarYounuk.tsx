'use client';

import React, { useState } from 'react';
import { Search, Bell, User, Video } from 'lucide-react';

const NavbarYounuk = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-black border-b border-gray-800 z-40 flex items-center px-6">
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos..."
            className="w-full bg-gray-900 text-white px-4 py-2.5 pl-10 rounded-full border border-gray-800 focus:outline-none focus:border-gray-600 transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <Video className="w-6 h-6 text-gray-300" />
        </button>

        <button className="relative p-2 hover:bg-gray-900 rounded-full transition-colors">
          <Bell className="w-6 h-6 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
          <User className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default NavbarYounuk;