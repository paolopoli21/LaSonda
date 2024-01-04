using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using LaSonda.Domain.Common;


namespace LaSonda.Application.Contracts.IRepositories.Common
{
    public interface IBaseCompleteRepository<T> : IBaseSimpleRepository<T>
    {
        Task<T> AddAsync(T entity);

        Task<T> UpdateAsync(T entity);

        Task DeleteAsync(T entity);

        void AddEntity(T entity);

        void UpdateEntity(T entity);

        void DeleteEntity(T entity);
    }
}
