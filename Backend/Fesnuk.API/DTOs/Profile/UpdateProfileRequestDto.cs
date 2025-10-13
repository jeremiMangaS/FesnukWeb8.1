using System.ComponentModel.DataAnnotations;

namespace Fesnuk.API.DTOs.Profile
{
    public class UpdateProfilRequestDto
    {
        [MaxLength(50)]
        public string? FullName { get; set; }
        [MaxLength(200)]
        public string? Bio { get; set; }
        public bool? IsPrivate { get; set; }
    }
}