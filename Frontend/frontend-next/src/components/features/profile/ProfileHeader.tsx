import React from 'react';
import { ProfileResponse } from '@/types/user';

interface ProfileHeaderProps {
  profile: ProfileResponse;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onEditClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-black">
      {/* Cover main Image */}
      <div className="h-[200px] bg-gradient-to-br from-neutral-800 via-neutral-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.05),transparent_60%)]"></div>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="relative -mt-[67px]">
            <div className="w-[134px] h-[134px] rounded-full border-4 border-black bg-neutral-800 overflow-hidden">
              {profile.profilePictureUrl ? (
                <img 
                  src={profile.profilePictureUrl} 
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-5xl font-bold text-white">
                    {profile.fullName?.[0]?.toUpperCase() || profile.username[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onEditClick}
            className="mt-3 px-4 py-2 bg-transparent border border-neutral-600 text-white text-[15px] font-bold rounded-full hover:bg-neutral-900 transition-colors"
          >
            Edit profile
          </button>
        </div>

        {/* Name & Username */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-white leading-6 mb-0.5">
            {profile.fullName || profile.username}
          </h2>
          <p className="text-[15px] text-neutral-500">
            @{profile.username}
          </p>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-[15px] text-white leading-5 mb-3">
            {profile.bio}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-neutral-500 text-[15px] mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Joined {formatDate(profile.createdAt)}</span>
          </div>

          {profile.isPrivate && (
            <div className="flex items-center gap-1">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Private</span>
            </div>
          )}
        </div>

        {/* Following & Followers */}
        <div className="flex items-center gap-5">
          <button className="group flex items-center gap-1 hover:underline transition-all">
            <span className="text-white font-bold text-[14px]">0</span>
            <span className="text-neutral-500 text-[14px] group-hover:text-neutral-400">Following</span>
          </button>
          <button className="group flex items-center gap-1 hover:underline transition-all">
            <span className="text-white font-bold text-[14px]">0</span>
            <span className="text-neutral-500 text-[14px] group-hover:text-neutral-400">Followers</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;