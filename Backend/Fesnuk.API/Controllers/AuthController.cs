using Fesnuk.API.Data;
using Fesnuk.API.DTO.Auth;
using Fesnuk.API.DTOs.Auth;
using Fesnuk.API.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System;
using Fesnuk.APi.DTOs.Auth;

namespace Fesnuk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto requestDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == requestDto.Email.ToLower());

            if (user == null || !BCrypt.Net.BCrypt.Verify(requestDto.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid Email or Password.");
            }

            var token = GenerateJwtToken(user);

            return Ok(new LoginResponseDto
            {
                UserId = user.UserId,
                Username = user.Username,
                Token = token
            });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwt:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddDays(1);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}