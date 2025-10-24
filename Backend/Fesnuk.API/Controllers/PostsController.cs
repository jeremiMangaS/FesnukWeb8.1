using Fesnuk.API.Data;
using Fesnuk.API.DTOs.Posts;
using Fesnuk.API.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Fesnuk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Cloudinary _cloudinary;
        public PostsController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            Account account = new Account(
                configuration["Cloudinary:CloudName"],
                configuration["Cloudinary:ApiKey"],
                configuration["Cloudinary:ApiSecret"]
            );
            _cloudinary = new Cloudinary(account);
        }

        [HttpPost]
        [Authorize] // Change the FormBody to FormForm
        public async Task<IActionResult> CreatePost([FromForm] CreatePostRequestDto requestDto)
        {
            var useridString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(useridString)) return Unauthorized();

            var userId = new Guid(useridString);
            string mediaUrl;

            if (requestDto.MediaFile != null && requestDto.MediaFile.Length > 0)
            {
                using (var stream = requestDto.MediaFile.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(requestDto.MediaFile.FileName, stream),
                        Folder = "fesnuk_posts"
                    };
                    var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                    if (uploadResult.Error != null) return BadRequest(uploadResult.Error.Message);
                    mediaUrl = uploadResult.SecureUrl.ToString();
                }
            }
            else return BadRequest("Media file is required");

            var newPost = new Post
            {
                UserId = userId,
                // MediaUrl = requestDto.MediaUrl,
                MediaUrl = mediaUrl,
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
        

        // DEBUGING
        [HttpGet("{postId}")]
        public async Task<IActionResult> GetPostById(Guid postId)
        {
            var post = await _context.Posts.Include(p => p.User).Where(p => p.PostId == postId).Select(p => new PostResponseDto
            {
                PostId = p.PostId,
                MediaUrl = p.MediaUrl,
                Caption = p.Caption,
                CreatedAt = p.CreatedAt,
                Userid = p.User.UserId,
                Username = p.User.Username,
                UserProfilePictureUrl = p.User.ProfilePictureUrl
            }).FirstOrDefaultAsync();
            if (post == null) return NotFound("Post not found");
            return Ok(post);
        }
    }
}