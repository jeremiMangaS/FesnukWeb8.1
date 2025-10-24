namespace Fesnuk.API.DTOs.Profile
{
    public class PublicProfileResponseDto
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string? FullName { get; set; }
        public string? Bio { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public bool IsPrivate { get; set; }
        public DateTime CreatedAt { get; set; }

        // For following and follower count
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}