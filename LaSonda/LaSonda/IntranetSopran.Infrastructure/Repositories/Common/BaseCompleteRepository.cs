using IntranetSopran.Infrastructure.Service;
using LaSonda.Application.Contracts.IRepositories.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntranetSopran.Infrastructure.Repositories.Common
{
    public class BaseCompleteRepository<TEntity> : BaseSimpleRepository<TEntity>,
        IBaseCompleteRepository<TEntity> where TEntity : class
    {

        public BaseCompleteRepository(IntranetSopranDbContext context) : base(context)
        {
        }


        public async Task<TEntity> AddAsync(TEntity entity)
        {
            await _Context.Set<TEntity>().AddAsync(entity);
            await _Context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            _Context.Set<TEntity>().Attach(entity);
            _Context.Entry(entity).State = EntityState.Modified;
            await _Context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> DeleteAsync(TEntity entity)
        {
            _Context.Set<TEntity>().Remove(entity);
            await _Context.SaveChangesAsync();
            return entity;
        }

        Task IBaseCompleteRepository<TEntity>.DeleteAsync(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public void AddEntity(TEntity entity)
        {
            _Context.Set<TEntity>().Attach(entity);
            _Context.Set<TEntity>().Add(entity);
        }

        public void UpdateEntity(TEntity entity)
        {
            _Context.Set<TEntity>().Attach(entity);
            _Context.Entry(entity).State = EntityState.Modified;
        }

        public void DeleteEntity(TEntity entity)
        {
            _Context.Set<TEntity>().Remove(entity);
        }
    }
}
