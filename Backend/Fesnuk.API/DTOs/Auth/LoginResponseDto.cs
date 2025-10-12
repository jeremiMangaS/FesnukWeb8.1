namespace Fesnuk.APi.DTOs.Auth
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public Guid UserId { get; set; }
    }
}

// Data for client if the login phase is success