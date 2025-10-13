using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;

using Fesnuk.API.Data;
using Fesnuk.API.Models;


namespace Fesnuk.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetMyProfile()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();
            
            var userId = new Guid(userIdString);
            var user = await _context.Users.FindAsync(userId);

            if (user == null) return NotFound("User not found.");

            return Ok(user);
        }
    }
}