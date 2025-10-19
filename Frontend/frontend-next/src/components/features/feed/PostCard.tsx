'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, User } from 'lucide-react';

interface PostCardProps {
  username: string;
  timeAgo: string;
  caption: string;
  likes: number;
  comments: number;
}

const PostCard: React.FC<PostCardProps> = ({ username, timeAgo, caption, likes, comments }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-black border border-gray-800 rounded-xl mb-6 overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{username}</p>
            <p className="text-gray-500 text-xs">{timeAgo}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="w-full aspect-square bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-gray-700 text-6xl">📷</div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="transition-transform hover:scale-110"
            >
              <Heart 
                className={`w-6 h-6 ${isLiked ? 'fill-red-600 text-red-600' : 'text-white'}`} 
              />
            </button>
            <button className="transition-transform hover:scale-110">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <button className="transition-transform hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="transition-transform hover:scale-110"
          >
            <Bookmark 
              className={`w-6 h-6 ${isSaved ? 'fill-white text-white' : 'text-white'}`} 
            />
          </button>
        </div>

        <p className="text-white font-semibold text-sm mb-2">{likes.toLocaleString()} likes</p>

        <p className="text-white text-sm">
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </p>

        <button className="text-gray-500 text-sm mt-2 hover:text-gray-400 transition-colors">
          View all {comments} comments
        </button>

        <div className="mt-3 pt-3 border-t border-gray-800">
          <input 
            type="text" 
            placeholder="Add a comment..."
            className="w-full bg-transparent text-white text-sm placeholder-gray-600 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;