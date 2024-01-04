using LaSonda.Domain.Models.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntranetSopran.Infrastructure.Service
{
    public class IntranetSopranDbContext : DbContext
    {
        public IntranetSopranDbContext(DbContextOptions<IntranetSopranDbContext> options) : base(options)
        {

        }

        public virtual DbSet<ToolUser> ToolUser { get; set; }

        public virtual DbSet<ToolRole> ToolRole { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToolRole>()
                .HasKey(a => new { a.ID });

            modelBuilder.Entity<ToolUser>()
                .HasOne<ToolRole>(s => s.ToolRole)
                .WithMany(g => g.ToolUsers)
                .HasForeignKey(s => s.IdRole);
        }
    }
}
