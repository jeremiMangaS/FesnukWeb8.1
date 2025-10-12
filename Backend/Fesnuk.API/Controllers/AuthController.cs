using Fesnuk.API.Data;
using Fesnuk.API.DTOs.Auth;
using Fesnuk.API.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fesnuk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterRequestDto requestDto)
        {
            // For showing error by the same Username and Email
            if (await _context.Users.AnyAsync(u => u.Username.ToLower() == requestDto.Username.ToLower()))
            {
                return BadRequest("Username already exists.");
            }
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == requestDto.Email.ToLower()))
            {
                return BadRequest("Email is already registered.");
            }

            // For hashing password
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(requestDto.Password);

            // Making new object from DTO data
            var newUser = new User
            {
                Username = requestDto.Username,
                Email = requestDto.Email,
                PasswordHash = passwordHash
            };

            // Save to Database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new { id = newUser.UserId }, newUser);
        }
    }
}