'use client';

import React from 'react';
import { User, Eye } from 'lucide-react';

interface VideoCardProps {
  title: string;
  channel: string;
  views: string;
  uploadTime: string;
  duration: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, channel, views, uploadTime, duration }) => {
  return (
    <div className="bg-black rounded-xl overflow-hidden cursor-pointer group">
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-700 text-6xl">▶</div>
        </div>
        
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-white text-xs font-semibold">
          {duration}
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
      </div>

      <div className="p-3 flex gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-gray-600" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-gray-300 transition-colors mb-1">
            {title}
          </h3>
          
          <p className="text-gray-400 text-xs mb-1">{channel}</p>
          
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{views}</span>
            </div>
            <span>•</span>
            <span>{uploadTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;