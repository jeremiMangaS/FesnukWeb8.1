import axios from 'axios';
import axiosInstance from '@/lib/axios'; 
import {Post} from '@/types/post';

interface RawPostDto {
  postId: string;
  mediaUrl: string;
  caption?: string;
  createdAt: string;
  userid: string;
  username: string;
  userProfilePictureUrl?: string;
}

const API_URL = 'https://localhost:7270/api';

// Create Axios
const customAxiosInstance = axios.create({
  baseURL: API_URL,
});

// Token for every Request
customAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const postService = {
    createPost: async (formData : FormData) : Promise<any> => {
        const response = await customAxiosInstance.post('posts', formData);
        return response.data;
    },
    
    getUserPosts: async (username: string): Promise<Post[]> => {
      const response = await axiosInstance.get<RawPostDto[]>(`/users/${username}/posts`);
      
      const transformedPosts = response.data.map(rawPost => {
      return {
        postId: rawPost.postId,
        mediaUrl: rawPost.mediaUrl,
        caption: rawPost.caption,
        createdAt: rawPost.createdAt,
        user: {
          userId: rawPost.userid,
          username: rawPost.username,
          userProfilePictureUrl: rawPost.userProfilePictureUrl,
        }
      };
    }); return transformedPosts;
    },
    
};