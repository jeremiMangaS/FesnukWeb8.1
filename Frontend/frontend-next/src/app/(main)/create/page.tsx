"use client";

import CreatePostForm from "@/components/features/post/CreatePostForm";

const CreatePostPage = () => {
  return (
    <div className="border-l border-r border-neutral-800 w-full max-w-2xl mx-auto">
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-neutral-800 p-4">
        <h1 className="text-xl font-bold text-white">Create a New Post</h1>
      </div>

      <div className="p-4">
        <CreatePostForm />
      </div>
    </div>
  );
};

export default CreatePostPage;