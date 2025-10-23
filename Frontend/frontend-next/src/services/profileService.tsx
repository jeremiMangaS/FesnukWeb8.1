import axios from 'axios';
import { ProfileResponse, UpdateProfileRequest } from '@/types/user';

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
};