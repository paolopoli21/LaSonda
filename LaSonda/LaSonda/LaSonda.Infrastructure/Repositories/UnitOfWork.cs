using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Contracts.IRepositories.Common;
using LaSonda.Application.Contracts.IRepositories.IBackupSql;
using LaSonda.Application.Contracts.IRepositories.IRepositoryDataProcess;
using LaSonda.Application.Contracts.IRepositories.IRepositoryMonitoring;
using LaSonda.Application.Contracts.IRepositories.View;
using LaSonda.Infrastructure.Repositories.BackupSql;
using LaSonda.Infrastructure.Repositories.Common;
using LaSonda.Infrastructure.Repositories.DataProcess;
using LaSonda.Infrastructure.Repositories.Monitoring;
using LaSonda.Infrastructure.Repositories.View;
using LaSonda.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace LaSonda.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private Hashtable _repositories;
        private readonly LaSondaDbContext _context;

        private Iv_REP_MonitoringResultRepository _monitoringResultRepository;

        private IMonitoringAllProcessRepository _monitoringAllProcessRepository;

        public Iv_REP_MonitoringResultRepository MonitoringResultRepository => _monitoringResultRepository ??= new v_REP_MonitoringResultRepository(_context);
        public IMonitoringAllProcessRepository MonitoringAllProcessRepository => _monitoringAllProcessRepository ??= new MonitoringAllProcessRepository(_context);

        private Iv_BackupList_AllServerRepository _backupListAllServerRepository;
        public Iv_BackupList_AllServerRepository Iv_BackupList_AllServerRepository => _backupListAllServerRepository ??= new v_BackupList_AllServerRepository(_context);

        private Iv_REP_VulnerabilitiesRepository _v_REP_VulnerabilitiesRepository;
        public Iv_REP_VulnerabilitiesRepository Iv_REP_VulnerabilitiesRepository => _v_REP_VulnerabilitiesRepository ??= new v_REP_VulnerabilitiesRepository(_context);

        public LaSondaDbContext LaSondaDbContext => _context;
        public UnitOfWork(LaSondaDbContext context)
        {
            _context = context;
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IBaseCompleteRepository<TEntity> Repository<TEntity>() where TEntity : class
        {
            if (_repositories == null)
            {
                _repositories = new Hashtable();
            }

            var type = typeof(TEntity).Name;

            if (!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(BaseCompleteRepository<>);

                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);
                _repositories.Add(type, repositoryInstance);
            }

            return (IBaseCompleteRepository<TEntity>)_repositories[type];

        }
    }
}
