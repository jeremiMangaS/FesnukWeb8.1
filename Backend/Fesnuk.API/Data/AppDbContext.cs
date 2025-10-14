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
        public DbSet<Follow> Follows { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Follow>().HasKey(f => new { f.FollowerId, f.FollowingId });

            // 1 follower -> many following
            modelBuilder.Entity<Follow>().HasOne(f => f.Follower).WithMany().HasForeignKey(f => f.FollowerId).OnDelete(DeleteBehavior.Restrict);
            // 1 following -> many follower
            modelBuilder.Entity<Follow>().HasOne(f => f.Following).WithMany().HasForeignKey(f => f.FollowingId).OnDelete(DeleteBehavior.Restrict);

        }
    }
}