using LaSonda.Application.Contracts.IRepositories.Common;
using LaSonda.Application.Contracts.IRepositories.IBackupSql;
using LaSonda.Application.Contracts.IRepositories.IRepositoryDataProcess;
using LaSonda.Application.Contracts.IRepositories.IRepositoryMonitoring;
using LaSonda.Application.Contracts.IRepositories.View;

namespace LaSonda.Application.Contracts.IRepositories
{
    public interface IUnitOfWork: IDisposable
    {
        Iv_REP_MonitoringResultRepository MonitoringResultRepository { get; }
        IMonitoringAllProcessRepository MonitoringAllProcessRepository { get; }
        Iv_BackupList_AllServerRepository Iv_BackupList_AllServerRepository { get; }
        Iv_REP_VulnerabilitiesRepository Iv_REP_VulnerabilitiesRepository { get; }
        IBaseCompleteRepository<TEntity> Repository<TEntity>() where TEntity : class;

        Task<int> Complete();
    }
}
