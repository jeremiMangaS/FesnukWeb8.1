'use client';

import React from 'react';
import { User, PlusSquare } from 'lucide-react';

const StoryNav = () => {
  const stories = [
    { id: 1, username: 'Your Story', hasStory: false, isOwn: true },
    { id: 2, username: 'alex_photo', hasStory: true, isOwn: false },
    { id: 3, username: 'sarah.design', hasStory: true, isOwn: false },
    { id: 4, username: 'travel_max', hasStory: true, isOwn: false },
    { id: 5, username: 'food_lover', hasStory: true, isOwn: false },
    { id: 6, username: 'tech_news', hasStory: true, isOwn: false },
    { id: 7, username: 'art_daily', hasStory: true, isOwn: false },
  ];

  return (
    <div className="bg-black border-b border-gray-800 px-6 py-4">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0">
            <div className={`relative ${story.hasStory ? 'p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 rounded-full' : ''}`}>
              <div className={`w-16 h-16 rounded-full bg-gray-800 border-2 ${story.isOwn ? 'border-gray-700' : 'border-black'} flex items-center justify-center overflow-hidden`}>
                <User className="w-8 h-8 text-gray-600" />
              </div>
              {story.isOwn && (
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 border-black">
                  <PlusSquare className="w-3 h-3 text-black" />
                </div>
              )}
            </div>
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors max-w-[64px] truncate">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryNav;