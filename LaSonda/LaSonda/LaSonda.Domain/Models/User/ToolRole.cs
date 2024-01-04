namespace LaSonda.Domain.Models.User
{
    public class ToolRole
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<ToolUser> ToolUsers { get; set; }
    }
}
