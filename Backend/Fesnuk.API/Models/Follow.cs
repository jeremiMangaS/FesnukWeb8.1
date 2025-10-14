using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fesnuk.API.Models
{
    public class Follow
    {
        [Required]
        public Guid FollowerId { get; set; }
        
        [Required]
        public Guid FollowingId { get; set; }

        [ForeignKey("FollowerId")]
        public virtual User Follower { get; set; }

        [ForeignKey("FollowingId")]
        public virtual User Following { get; set; }
    }
}