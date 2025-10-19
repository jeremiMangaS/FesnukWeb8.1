import React from 'react';
import RightSidebar from '@/components/shared/RightSidebar';
import StoryNav from '@/components/features/feed/StoryNav';
import PostCard from '@/components/features/feed/PostCard';

const MainPage = () => {
  const posts = [
    {
      username: 'alex_photo',
      timeAgo: '2 hours ago',
      caption: 'Beautiful sunset at the beach Perfect moment captured!',
      likes: 2847,
      comments: 156
    },
    {
      username: 'sarah.design',
      timeAgo: '5 hours ago',
      caption: 'New design project completed! What do you think?',
      likes: 1923,
      comments: 89
    },
    {
      username: 'travel_max',
      timeAgo: '8 hours ago',
      caption: 'Exploring hidden gems in Bali #TravelLife #Indonesia',
      likes: 4521,
      comments: 234
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="ml-64 mr-80">
        <StoryNav />

        <div className="max-w-2xl mx-auto py-8 px-4">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}

          <div className="flex justify-center py-8">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Load More Posts
            </button>
          </div>
        </div>
      </div>

      <RightSidebar />
    </div>
  );
};

export default MainPage;