using Fesnuk.API.Data;
using Fesnuk.API.DTOs.Profile;
using Fesnuk.API.DTOs.Posts;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Fesnuk.API.Models;

namespace Fesnuk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserByName(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
            if (user == null) return NotFound();
            var followersCount = await _context.Follows.CountAsync(f => f.FollowingId == user.UserId);
            var followingCount = await _context.Follows.CountAsync(f => f.FollowerId == user.UserId);
            var responseDto = new PublicProfileResponseDto
            {
                UserId = user.UserId,
                Username = user.Username,
                FullName = user.FullName,
                Bio = user.Bio,
                ProfilePictureUrl = user.ProfilePictureUrl,
                IsPrivate = user.IsPrivate,
                CreatedAt = user.CreatedAt,

                FollowersCount = followersCount,
                FollowingCount = followingCount
            };

            return Ok(responseDto);
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

        [HttpPost("{username}/follow")]
        [Authorize]
        public async Task<IActionResult> FollowUser(string username)
        {
            var loggedInUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var loggedInUserId = new Guid(loggedInUserIdString);
            var userToFollow = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

            if (userToFollow == null) return NotFound("User to follow not found");
            if (userToFollow.UserId == loggedInUserId) return BadRequest("You cannot follow yourself.");

            var alreadyFollowing = await _context.Follows.AnyAsync(f => f.FollowerId == loggedInUserId && f.FollowingId == userToFollow.UserId);

            if (alreadyFollowing) return BadRequest("You are already following this user.");

            var newFollow = new Follow
            {
                FollowerId = loggedInUserId,
                FollowingId = userToFollow.UserId
            };

            await _context.Follows.AddAsync(newFollow);
            await _context.SaveChangesAsync();

            return Ok("Successfully followed user");
        }

        [HttpDelete("{username}/follow")]
        [Authorize]
        public async Task<IActionResult> UnfollowUser(string username)
        {
            var loggedInUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var loggedInUserId = new Guid(loggedInUserIdString);
            var userToUnfollow = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

            if (userToUnfollow == null) return NotFound("User to unfollow not found");

            var followRelationship = await _context.Follows.FirstOrDefaultAsync(f => f.FollowerId == loggedInUserId && f.FollowingId == userToUnfollow.UserId);

            if (followRelationship == null) return Ok("You were not following this user");

            _context.Follows.Remove(followRelationship);
            await _context.SaveChangesAsync();

            return Ok("Successfully unfollowed user");
        }

        [HttpGet("{username}/following")]
        public async Task<IActionResult> GetFollowing(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
            if (user == null) return NotFound("User not found.");

            var followingList = await _context.Follows.Where(f => f.FollowerId == user.UserId).Select(f => f.Following).Select(followedUser => new UserSummaryDto
            {
                UserId = followedUser.UserId,
                Username = followedUser.Username,
                FullName = followedUser.FullName,
                ProfilePictureUrl = followedUser.ProfilePictureUrl
            }).ToListAsync();

            return Ok(followingList);
        }

        [HttpGet("{username}/followers")]
        public async Task<IActionResult> GetFollowers(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
            if (user == null) return NotFound("User not found");

            var followerList = await _context.Follows.Where(f => f.FollowingId == user.UserId).Select(f => f.Follower).Select(followerUser => new UserSummaryDto
            {
                UserId = followerUser.UserId,
                Username = followerUser.Username,
                FullName = followerUser.FullName,
                ProfilePictureUrl = followerUser.ProfilePictureUrl
            }).ToListAsync();

            return Ok(followerList);
        }
    }
}