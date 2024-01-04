using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public interface IDbContext<TEntity> : IDisposable
{
    DbSet<TEntity> Set<TEntity>() where TEntity : class;

    //object Entry<TEntity>(TEntity entity) where TEntity : EntityEntry;

    EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;

    //Task<int> SaveChangesAsync();

    protected void OnModelCreating(ModelBuilder modelBuilder);
}

