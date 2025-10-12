using System.ComponentModel.DataAnnotations;

namespace Fesnuk.API.DTO.Auth
{
    public class LoginRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}