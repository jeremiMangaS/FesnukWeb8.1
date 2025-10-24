"use client"

import React, {useState, FormEvent, ChangeEvent} from 'react';
import {postService} from '@/services/postService';
import axios from 'axios';  

const CreatePostForm = () => {
    // useState
    const [caption, setCaption] = useState('');
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setMediaFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!mediaFile) {
            setError("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('MediaFile', mediaFile);
        formData.append('Caption', caption);

        try {
            await postService.createPost(formData);
            alert('Post created successfully!');
            // Reset form
            setCaption('');
            setMediaFile(null);
            setPreview(null);
        } catch (err) {
            console.error('Detailed Axios Error:', err); 
            if (axios.isAxiosError(err) && err.response) {
                const serverMessage = err.response.data;
                console.error('Server Response Data:', serverMessage);
                
                setError(`Upload failed: ${serverMessage}`);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

     return (
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What's happening?"
                    className="w-full bg-transparent text-white p-2 focus:outline-none"
                />
                <input 
                    type="file"
                    accept="image/*,video/*" 
                    onChange={handleFileChange}
                    className="my-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {preview && (
                    <div className="mt-2">
                        <img src={preview} alt="Preview" className="max-h-60 rounded-lg" />
                    </div>
                )}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button 
                    type="submit" 
                    disabled={loading || !mediaFile}
                    className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePostForm;