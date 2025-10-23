"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { profileService } from '@/services/profileService';
import { ProfileResponse } from '@/types/user';
import ProfileHeader from '@/components/features/profile/ProfileHeader';

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'media' | 'likes'>('posts');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileService.getMyProfile();
      setProfile(data);
    } catch (err: any) {
      console.error('Error loading profile:', err);
      if (err.response?.status === 401) {
        router.push('/auth');
      } else {
        setError('Failed to load profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    router.push('/profile/edit');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen ml-0 lg:ml-64">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-neutral-700 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen ml-0 lg:ml-64">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Error Loading Profile</h2>
          <p className="text-neutral-400 mb-6">{error}</p>
          <button
            onClick={loadProfile}
            className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="flex-1 min-h-screen ml-0 lg:ml-64 border-x border-neutral-800">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-800">
        <div className="flex items-center gap-8 px-4 h-[53px]">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-900 transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-white leading-6">{profile.fullName || profile.username}</h1>
            <p className="text-xs text-neutral-500">0 posts</p>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <ProfileHeader profile={profile} onEditClick={handleEditClick} />

      {/* Navigation */}
      <div className="border-b border-neutral-800 sticky top-[53px] bg-black z-40">
        <div className="flex">
          {(['posts', 'replies', 'media', 'likes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-[15px] font-semibold transition-colors relative ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-neutral-500 hover:bg-neutral-900/50'
              }`}
            >
              <span className="capitalize">{tab}</span>
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Section */}
      {/* Still empty until next deploy */}
      <div className="py-16 px-6 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-900 flex items-center justify-center">
            <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No posts yet</h3>
          <p className="text-neutral-500">When you post something, it will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;