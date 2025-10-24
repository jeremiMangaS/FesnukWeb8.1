using System.ComponentModel.DataAnnotations;

namespace Fesnuk.API.DTOs.Posts
{
    public class CreatePostRequestDto
    {
        [Required]
        public IFormFile MediaFile { get; set; }
        [MaxLength(2200)]
        public string? Caption { get; set; }
    }
}