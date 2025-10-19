'use client';

import React, { useState } from 'react';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Settings, Bookmark } from 'lucide-react';

const LeftSidebar = () => {
  const [activeMenu, setActiveMenu] = useState('home');
  
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', badge: null },
    { id: 'search', icon: Search, label: 'Search', badge: null },
    { id: 'explore', icon: Compass, label: 'Explore', badge: null },
    { id: 'reels', icon: Film, label: 'Reels', badge: null },
    { id: 'messages', icon: MessageCircle, label: 'Messages', badge: 5 },
    { id: 'notifications', icon: Heart, label: 'Notifications', badge: 12 },
    { id: 'create', icon: PlusSquare, label: 'Create', badge: null },
    { id: 'profile', icon: User, label: 'Profile', badge: null },
  ];

  const bottomMenuItems = [
    { id: 'saved', icon: Bookmark, label: 'Saved', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-white tracking-wider">FESNUK</h1>
        <p className="text-xs text-gray-400 mt-1">Social Redefined</p>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg mb-1 transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-white text-black' 
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-base ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-auto bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-800">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg mb-1 transition-all duration-200 ${
                isActive 
                  ? 'bg-white text-black' 
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-base ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;