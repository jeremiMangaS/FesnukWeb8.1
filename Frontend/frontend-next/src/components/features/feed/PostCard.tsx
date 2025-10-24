"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/post';
import { formatDistanceToNowStrict } from 'date-fns';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!post) return null;
  
  const timeAgo = formatDistanceToNowStrict(new Date(post.createdAt));

  const handlePostClick = () => {
    router.push(`/post/${post.postId}`);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Edit post:', post.postId);
    setShowMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete post:', post.postId);
    setShowMenu(false);
  };

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden border-b border-neutral-800">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-700 overflow-hidden flex-shrink-0">
              {post.user.userProfilePictureUrl ? (
                <img src={post.user.userProfilePictureUrl} alt={post.user.username} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-500">
                  <span className="text-white font-bold text-sm">{post.user.username[0].toUpperCase()}</span>
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{post.user.username}</p>
              <p className="text-neutral-500 text-xs">{timeAgo} ago</p>
            </div>
          </div>
          <div className="relative">
            <button onClick={handleMenuClick} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5 text-white" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-10 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-50 min-w-[150px]">
                <button onClick={handleEdit} className="w-full px-4 py-3 text-left text-white hover:bg-neutral-800 transition-colors text-sm">
                  Edit
                </button>
                <button onClick={handleDelete} className="w-full px-4 py-3 text-left text-red-500 hover:bg-neutral-800 transition-colors text-sm">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="w-full aspect-square bg-neutral-900" onClick={handlePostClick}>
          <img src={post.mediaUrl} alt={`Post by ${post.user.username}`} className="w-full h-full object-cover" />
        </div>

        {/* Actions */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button onClick={() => setLiked(!liked)} className="hover:opacity-70 transition-opacity">
                <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
              <button onClick={handlePostClick} className="hover:opacity-70 transition-opacity">
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
              <button className="hover:opacity-70 transition-opacity">
                <Send className="w-6 h-6 text-white" />
              </button>
            </div>
            <button onClick={() => setSaved(!saved)} className="hover:opacity-70 transition-opacity">
              <Bookmark className={`w-6 h-6 ${saved ? 'fill-white text-white' : 'text-white'}`} />
            </button>
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="text-white text-sm">
              <span className="font-semibold mr-2">{post.user.username}</span>
              <span>{post.caption}</span>
            </div>
          )}
        </div>
      </div>




      {/* Desktop */}
      <div className="hidden lg:block border-b border-neutral-800 hover:bg-neutral-900/30 transition-colors cursor-pointer" onClick={handlePostClick}>
        <div className="flex gap-4 p-6">
          <div className="w-[400px] h-[400px] flex-shrink-0 bg-neutral-900 rounded-lg overflow-hidden">
            <img src={post.mediaUrl} alt={`Post by ${post.user.username}`} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden flex-shrink-0">
                  {post.user.userProfilePictureUrl ? (
                    <img src={post.user.userProfilePictureUrl} alt={post.user.username} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500">
                      <span className="text-white font-bold">{post.user.username[0].toUpperCase()}</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-white">{post.user.username}</p>
                  <p className="text-neutral-500 text-sm">{timeAgo} ago</p>
                </div>
              </div>
              <div className="relative">
                <button onClick={handleMenuClick} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-white" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-10 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-50 min-w-[150px]">
                    <button onClick={handleEdit} className="w-full px-4 py-3 text-left text-white hover:bg-neutral-800 transition-colors">
                      Edit
                    </button>
                    <button onClick={handleDelete} className="w-full px-4 py-3 text-left text-red-500 hover:bg-neutral-800 transition-colors">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Caption */}
            <div className="flex-1 mb-4">
              {post.caption && (
                <p className="text-white text-[15px] leading-relaxed">{post.caption}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
              <div className="flex items-center gap-6">
                <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className="flex items-center gap-2 hover:opacity-70 transition-opacity group">
                  <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-neutral-400 group-hover:text-red-500'}`} />
                  <span className="text-neutral-400 text-sm">Like</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); handlePostClick(); }} className="flex items-center gap-2 hover:opacity-70 transition-opacity group">
                  <MessageCircle className="w-6 h-6 text-neutral-400 group-hover:text-blue-500" />
                  <span className="text-neutral-400 text-sm">Comment</span>
                </button>
                <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 hover:opacity-70 transition-opacity group">
                  <Send className="w-6 h-6 text-neutral-400 group-hover:text-green-500" />
                  <span className="text-neutral-400 text-sm">Share</span>
                </button>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} className="hover:opacity-70 transition-opacity">
                <Bookmark className={`w-6 h-6 ${saved ? 'fill-white text-white' : 'text-neutral-400'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;