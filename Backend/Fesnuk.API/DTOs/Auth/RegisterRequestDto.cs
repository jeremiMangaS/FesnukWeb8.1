using System.ComponentModel.DataAnnotations;

namespace Fesnuk.API.DTOs.Auth
{
    public class RegisterRequestDto
    {
        [Required]
        [MaxLength(30)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}