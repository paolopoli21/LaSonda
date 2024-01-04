using IntranetSopran.Infrastructure.Service;
using LaSonda.Application.Contracts.IRepositories.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IntranetSopran.Infrastructure.Repositories.Common
{
    public class BaseSimpleRepository<TEntity> : IBaseSimpleRepository<TEntity> where TEntity : class
    {
        protected readonly IntranetSopranDbContext _Context;

        public BaseSimpleRepository(IntranetSopranDbContext context)
        {
            _Context = context;
        }

        public async Task<IReadOnlyList<TEntity>> GetAllAsync()
        {
            return await _Context.Set<TEntity>().ToListAsync();
        }

        public async Task<IReadOnlyList<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _Context.Set<TEntity>().Where(predicate).ToListAsync();
        }

        public async Task<IReadOnlyList<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, string includeString = null, bool disableTracking = true)
        {
            IQueryable<TEntity> query = _Context.Set<TEntity>();
            if (disableTracking)
            {
                query = query.AsNoTracking();
            }
            if (!string.IsNullOrWhiteSpace(includeString))
            {
                query = query.Include(includeString);
            }
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            return await query.ToListAsync();
        }

        public async Task<IReadOnlyList<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, List<Expression<Func<TEntity, object>>> includes = null, bool disableTracking = true)
        {
            IQueryable<TEntity> query = _Context.Set<TEntity>();
            if (disableTracking)
            {
                query = query.AsNoTracking();
            }
            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            return await query.ToListAsync();
        }

    }
}
