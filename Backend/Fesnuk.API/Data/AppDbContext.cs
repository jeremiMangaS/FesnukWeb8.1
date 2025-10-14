using System.Security.Cryptography.X509Certificates;
using Fesnuk.API.Models; // For User model
using Microsoft.EntityFrameworkCore;

namespace Fesnuk.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}