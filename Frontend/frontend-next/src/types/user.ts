// Match with backend DTOs

export interface User {
  userId: string;
  username: string;
  email: string;
  phoneNumber?: string;
  fullName?: string;
  bio?: string;
  profilePictureUrl?: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface ProfileResponse {
  userId: string;
  username: string;
  email: string;
  phoneNumber?: string;
  fullName?: string;
  bio?: string;
  profilePictureUrl?: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface PublicProfileResponse {
  userId: string;
  username: string;
  fullName?: string;
  bio?: string;
  profilePictureUrl?: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  bio?: string;
  isPrivate?: boolean;
}

export interface UserSummary {
  userId: string;
  username: string;
  fullName?: string;
  profilePictureUrl?: string;
}