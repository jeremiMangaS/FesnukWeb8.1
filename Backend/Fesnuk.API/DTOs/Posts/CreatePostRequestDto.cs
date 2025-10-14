using System.ComponentModel.DataAnnotations;

namespace Fesnuk.API.DTOs.Posts
{
    public class CreatePostRequestDto
    {
        [Required]
        [Url]
        public string MediaUrl { get; set; }
        [MaxLength(2200)]
        public string? Caption { get; set; }
    }
}