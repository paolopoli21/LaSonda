using System.ComponentModel.DataAnnotations;

namespace LaSonda.Domain.Models.User
{
    public class ToolUser
    {
        [Key]
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        [Required]
        public int IdRole { get; set; }

        public virtual ToolRole ToolRole { get; set; }
    }
}
