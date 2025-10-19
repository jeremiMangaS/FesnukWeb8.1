'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Settings, Bookmark, PlayCircle, TrendingUp, History, Clock, ThumbsUp } from 'lucide-react';

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('home');
  
  const currentMode = pathname.startsWith('/younuk') ? 'younuk' : 'fesnuk';

  const fesnukMenuItems = [
    { id: 'home', icon: Home, label: 'Home', badge: null, path: '/' },
    { id: 'search', icon: Search, label: 'Search', badge: null, path: '/search' },
    { id: 'explore', icon: Compass, label: 'Explore', badge: null, path: '/explore' },
    { id: 'reels', icon: Film, label: 'Reels', badge: null, path: '/reels' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', badge: 5, path: '/messages' },
    { id: 'notifications', icon: Heart, label: 'Notifications', badge: 12, path: '/notifications' },
    { id: 'create', icon: PlusSquare, label: 'Create', badge: null, path: '/create' },
    { id: 'profile', icon: User, label: 'Profile', badge: null, path: '/profile' },
  ];

  const younukMenuItems = [
    { id: 'home', icon: Home, label: 'Home', badge: null, path: '/younuk' },
    { id: 'trending', icon: TrendingUp, label: 'Trending', badge: null, path: '/younuk/trending' },
    { id: 'subscriptions', icon: PlayCircle, label: 'Subscriptions', badge: 3, path: '/younuk/subscriptions' },
    { id: 'library', icon: Bookmark, label: 'Library', badge: null, path: '/younuk/library' },
    { id: 'history', icon: History, label: 'History', badge: null, path: '/younuk/history' },
    { id: 'liked', icon: ThumbsUp, label: 'Liked Videos', badge: null, path: '/younuk/liked' },
    { id: 'watch-later', icon: Clock, label: 'Watch Later', badge: null, path: '/younuk/watch-later' },
    { id: 'upload', icon: PlusSquare, label: 'Upload Video', badge: null, path: '/younuk/upload' },
  ];

  const currentMenuItems = currentMode === 'fesnuk' ? fesnukMenuItems : younukMenuItems;

  const bottomMenuItems = [
    { id: 'saved', icon: Bookmark, label: 'Saved', badge: null, path: currentMode === 'fesnuk' ? '/saved' : '/younuk/saved' },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null, path: currentMode === 'fesnuk' ? '/settings' : '/younuk/settings' },
  ];

  const handleModeSwitch = (mode: 'fesnuk' | 'younuk') => {
    if (mode === 'younuk') {
      router.push('/younuk');
    } else {
      router.push('/');
    }
    setActiveMenu('home');
  };

  const handleMenuClick = (item: any) => {
    setActiveMenu(item.id);
    router.push(item.path);
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-gray-800 flex flex-col z-50">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-white tracking-wider">
          {currentMode === 'fesnuk' ? 'FESNUK' : 'YOUNUK'}
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          {currentMode === 'fesnuk' ? 'Social Redefined' : 'Video Redefined'}
        </p>
      </div>

      <div className="px-3 py-4 border-b border-gray-800">
        <div className="bg-gray-900 rounded-lg p-1 flex gap-1">
          <button
            onClick={() => handleModeSwitch('fesnuk')}
            className={`flex-1 py-2.5 px-3 rounded-md font-semibold text-xs transition-all duration-200 ${
              currentMode === 'fesnuk'
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-400 hover:text-white'
            }`}
          >
          Fesnuk
          </button>
          <button
            onClick={() => handleModeSwitch('younuk')}
            className={`flex-1 py-2.5 px-3 rounded-md font-semibold text-xs transition-all duration-200 ${
              currentMode === 'younuk'
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-400 hover:text-white'
            }`}
          >
          Younuk
          </button>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500">
            {currentMode === 'fesnuk' 
              ? 'Photos & Short Videos' 
              : 'Long-form Videos'}
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
        {currentMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
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
              onClick={() => handleMenuClick(item)}
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin: 4px 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          transition: background 0.2s;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
      `}</style>
    </div>
  );
};

export default LeftSidebar;