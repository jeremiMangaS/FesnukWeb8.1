using Fesnuk.API.Data;
using Fesnuk.API.DTOs.Posts;
using Fesnuk.API.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Fesnuk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
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

        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _context.Posts.Include(post => post.User)
            .OrderByDescending(post => post.CreatedAt).Select(post => new PostResponseDto
            {
                PostId = post.PostId,
                MediaUrl = post.MediaUrl,
                Caption = post.Caption,
                CreatedAt = post.CreatedAt,
                Userid = post.User.UserId,
                Username = post.User.Username,
                UserProfilePictureUrl = post.User.ProfilePictureUrl
            }).ToListAsync();

            return Ok(posts);
        }
    }
}