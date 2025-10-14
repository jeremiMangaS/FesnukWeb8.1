using Fesnuk.API.Data;
using Fesnuk.API.DTOs.Posts;
using Fesnuk.API.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Fesnuk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostRequestDto requestDto)
        {
            var useridString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(useridString)) return Unauthorized();

            var userId = new Guid(useridString);
            var newPost = new Post
            {
                UserId = userId,
                MediaUrl = requestDto.MediaUrl,
                Caption = requestDto.Caption
            };

            await _context.Posts.AddAsync(newPost);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreatePost), new { id = newPost.PostId }, newPost);
        }
    }
}