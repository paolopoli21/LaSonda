using LaSonda.Application.Contracts.IRepositories.IRepositoryMonitoring;
using LaSonda.Domain.Models.Monitoring;
using LaSonda.Infrastructure.Repositories.Common;
using LaSonda.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;

namespace LaSonda.Infrastructure.Repositories.Monitoring
{
    public class MonitoringAllProcessRepository : BaseSimpleRepository<MonitoringAllProcess>, IMonitoringAllProcessRepository
    {

        public MonitoringAllProcessRepository(LaSondaDbContext context) : base(context)
        {
            _Context.Database.SetCommandTimeout(300);
        }

        public async Task<List<MonitoringAllProcess>> GetMonitoringsOrderByLastRun()
        {
            var monitorings = await _Context.Monitorings
                .AsNoTracking()
                .ToListAsync();
            //var monitoringListOrderByLasRun = monitorings.OrderBy(x => Convert.ToDateTime(x.LastRun)).ToList();
            //var monitoringListOrderByLasRun = monitorings;
            //return monitoringListOrderByLasRun;
            return monitorings;
        }
    }
}
