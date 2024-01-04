using LaSonda.Application.Contracts.IRepositories.Common;
using LaSonda.Domain.Models.Monitoring;


namespace LaSonda.Application.Contracts.IRepositories.IRepositoryMonitoring
{
    public interface IMonitoringAllProcessRepository : IBaseSimpleRepository<MonitoringAllProcess>
    {
        Task <List<MonitoringAllProcess>>  GetMonitoringsOrderByLastRun();
    }
}
