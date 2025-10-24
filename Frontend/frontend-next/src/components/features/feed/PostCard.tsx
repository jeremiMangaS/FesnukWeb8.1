import React from 'react';
import { Post } from '@/types/post';
import { formatDistanceToNowStrict } from 'date-fns';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  if (!post) return null;
  const timeAgo = formatDistanceToNowStrict(new Date(post.createdAt));

  return (
    <div className="border-b border-neutral-800 p-4 flex gap-4 transition-colors hover:bg-neutral-900/50">
      <div className="w-10">
        <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden">
          {post.user.userProfilePictureUrl ? (
            <img src={post.user.userProfilePictureUrl} alt={post.user.username} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-500">
              <span className="text-white font-bold">{post.user.username[0].toUpperCase()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-white hover:underline cursor-pointer">
            {post.user.username}
          </span>
          <span className="text-neutral-500 text-sm">· {timeAgo}</span>
        </div>

        {post.caption && <p className="text-white mb-2">{post.caption}</p>}

        <div className="rounded-2xl border border-neutral-800 overflow-hidden">
          <img src={post.mediaUrl} alt={`Post by ${post.user.username}`} className="w-full h-auto" />
        </div>

        <div className="flex justify-between items-center mt-3 text-neutral-500">
        </div>
      </div>
    </div>
  );
};

export default PostCard;