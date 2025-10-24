// Match with Backend DTOs

export interface PostAuthor
{
    userId: string;
    username: string;
    userProfilePictureUrl?: string;
}

export interface Post
{
    postId: string;
    mediaUrl: string;
    caption?: string;
    createdAt: string;
    user: PostAuthor;
}

export interface CreatePostData
{
    mediaFile: File;
    caption?: string;
}