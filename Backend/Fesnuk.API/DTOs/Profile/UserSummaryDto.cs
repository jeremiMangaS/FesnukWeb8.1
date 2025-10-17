namespace Fesnuk.API.DTOs.Profile
{
    public class UserSummaryDto
    {
        public Guid UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string? FullName { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }
}