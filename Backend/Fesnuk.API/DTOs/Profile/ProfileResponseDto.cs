namespace Fesnuk.API.DTOs.Profile
{
    public class ProfileResponseDto
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? FullName { get; set; }
        public string? Bio { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public bool IsPrivate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}