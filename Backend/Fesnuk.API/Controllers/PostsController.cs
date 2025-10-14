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

        [HttpGet("{username}/posts")]
        public async Task<IActionResult> GetUserPosts(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(data => data.Username.ToLower() == username.ToLower());
            if (user == null) return NotFound("User not found.");

            var posts = await _context.Posts.Where(post => post.UserId == user.UserId)
            .OrderByDescending(post => post.CreatedAt).Select(post => new PostResponseDto
            {
                PostId = post.PostId,
                MediaUrl = post.MediaUrl,
                Caption = post.Caption,
                CreatedAt = post.CreatedAt,
                Userid = post.UserId,
                Username = user.Username,
                UserProfilePictureUrl = user.ProfilePictureUrl
            }).ToListAsync();
            
            return Ok(posts);
        }

        [HttpDelete("{postId}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(Guid postId)
        {
            var loggedInUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(loggedInUserIdString)) return Unauthorized();
            var loggedInUserId = new Guid(loggedInUserIdString);

            var post = await _context.Posts.FindAsync(postId);
            if (post == null) return NotFound();

            if (post.UserId != loggedInUserId) return Forbid();

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}