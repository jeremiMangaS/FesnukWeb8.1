using System;

namespace Fesnuk.API.DTOs.Posts
{
    public class PostResponseDto
    {
        // Post
        public Guid PostId { get; set; }
        public string MediaUrl { get; set; }
        public string? Caption { get; set; }
        public DateTime CreatedAt { get; set; }

        // User
        public Guid Userid { get; set; }
        public string Username { get; set; }
        public string? UserProfilePictureUrl { get; set; }
    }
}