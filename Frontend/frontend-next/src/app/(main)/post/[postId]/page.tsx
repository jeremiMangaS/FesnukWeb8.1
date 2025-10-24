"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { postService } from '@/services/postService';
import { Post } from '@/types/post';
import { formatDistanceToNowStrict } from 'date-fns';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ArrowLeft } from 'lucide-react';

const PostDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const postId = params.postId as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const postData = await postService.getPostById(postId);
      setPost(postData);
    } catch (err: any) {
      console.error('Error loading post:', err);
      setError('Failed to load post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    console.log('Edit post:', postId);
    setShowMenu(false);
  };

  const handleDelete = () => {
    console.log('Delete post:', postId);
    setShowMenu(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      console.log('Comment submitted:', commentText);
      setCommentText('');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen ml-0 lg:ml-64">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-neutral-700 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-500">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen ml-0 lg:ml-64">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Post Not Found</h2>
          <p className="text-neutral-400 mb-6">{error || 'The post you are looking for does not exist.'}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const timeAgo = formatDistanceToNowStrict(new Date(post.createdAt));

  return (
    <div className="flex-1 min-h-screen ml-0 lg:ml-64 border-x border-neutral-800">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-800">
        <div className="flex items-center gap-8 px-4 h-[53px]">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-900 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white leading-6">Post</h1>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
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
            <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
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

        <div className="w-full aspect-square bg-neutral-900">
          <img src={post.mediaUrl} alt={`Post by ${post.user.username}`} className="w-full h-full object-cover" />
        </div>

        <div className="p-4 border-b border-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button onClick={() => setLiked(!liked)} className="hover:opacity-70 transition-opacity">
                <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
              <button className="hover:opacity-70 transition-opacity">
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
            <div className="text-white">
              <span className="font-bold mr-2">{post.user.username}</span>
              <span>{post.caption}</span>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="p-4">
          <h3 className="text-white font-bold mb-4">Comments</h3>
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <p className="text-neutral-500">No comments yet</p>
            <p className="text-neutral-600 text-sm mt-1">Be the first to comment</p>
          </div>
        </div>

        {/* Comment Input */}
        <div className="sticky bottom-0 bg-black border-t border-neutral-800 p-4">
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-neutral-900 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex gap-8">
            <div className="w-[500px] h-[500px] flex-shrink-0 bg-neutral-900 rounded-lg overflow-hidden">
              <img src={post.mediaUrl} alt={`Post by ${post.user.username}`} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col border border-neutral-800 rounded-lg bg-black">
              <div className="flex items-center justify-between p-4 border-b border-neutral-800">
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
                  <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
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
              {post.caption && (
                <div className="p-4 border-b border-neutral-800">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden flex-shrink-0">
                      {post.user.userProfilePictureUrl ? (
                        <img src={post.user.userProfilePictureUrl} alt={post.user.username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-500">
                          <span className="text-white font-bold">{post.user.username[0].toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-bold mr-2">{post.user.username}</span>
                        {post.caption}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                  <p className="text-neutral-500 text-lg font-semibold">No comments yet</p>
                  <p className="text-neutral-600 text-sm mt-2">Be the first to comment on this post</p>
                </div>
              </div>

              <div className="border-t border-neutral-800 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setLiked(!liked)} className="hover:opacity-70 transition-opacity">
                      <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                    <button className="hover:opacity-70 transition-opacity">
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

                {/* Comment Input */}
                <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent text-white border-t border-neutral-800 py-3 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="text-blue-500 font-semibold hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;