import axios from 'axios';
import { UserSummary, ProfileResponse, UpdateProfileRequest } from '@/types/user';

const API_URL = 'https://localhost:7270/api';

// Create Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Token for every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const profileService = {
  // Get current user profile
  getMyProfile: async (): Promise<ProfileResponse> => {
    const response = await axiosInstance.get<ProfileResponse>('/profile/user');
    return response.data;
  },

  // Update Profile
  updateProfile: async (data: UpdateProfileRequest): Promise<void> => {
    await axiosInstance.put('/profile', data);
  },

  // Search
  searchUsers : async (query : string) : Promise<UserSummary[]> => {
    if (!query) return [];
    const response = await axiosInstance.get<UserSummary[]>(`/users/search`, {
      params : {query}
    });
    return response.data;
  },
};