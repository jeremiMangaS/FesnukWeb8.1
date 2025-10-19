import React from 'react';
import VideoCard from '@/components/features/video/VideoCard';

const YounukHomePage = () => {
  const videos = [
    {
      title: 'Building a Full-Stack App with Next.js 14 - Complete Tutorial',
      channel: 'Tech Academy',
      views: '125K views',
      uploadTime: '2 days ago',
      duration: '45:32'
    },
    {
      title: 'Beautiful Indonesia - Cinematic Travel Vlog 4K',
      channel: 'Travel Explorer',
      views: '89K views',
      uploadTime: '1 week ago',
      duration: '28:15'
    },
    {
      title: 'Advanced TypeScript Patterns You Should Know',
      channel: 'Code Master',
      views: '67K views',
      uploadTime: '3 days ago',
      duration: '32:48'
    },
    {
      title: 'Modern Web Design Trends 2025 - UI/UX Masterclass',
      channel: 'Design Studio',
      views: '234K views',
      uploadTime: '5 days ago',
      duration: '1:12:20'
    },
    {
      title: 'React 19 New Features - Everything You Need to Know',
      channel: 'Frontend Dev',
      views: '156K views',
      uploadTime: '4 days ago',
      duration: '38:45'
    },
    {
      title: 'Amazing Nature Documentary - Wildlife in 8K',
      channel: 'Nature Films',
      views: '892K views',
      uploadTime: '2 weeks ago',
      duration: '52:30'
    },
    {
      title: 'Database Design Best Practices for Scalable Apps',
      channel: 'Backend Pro',
      views: '45K views',
      uploadTime: '1 day ago',
      duration: '41:18'
    },
    {
      title: 'Cooking Indonesian Traditional Food - Step by Step',
      channel: 'Culinary Journey',
      views: '178K views',
      uploadTime: '6 days ago',
      duration: '25:42'
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Recommended</h1>
        <p className="text-gray-400 text-sm">Videos picked for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors border border-gray-800">
          Load More Videos
        </button>
      </div>
    </div>
  );
};

export default YounukHomePage;