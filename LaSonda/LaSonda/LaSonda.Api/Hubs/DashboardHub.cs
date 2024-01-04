using LaSonda.Api.SignalR;
using LaSonda.Infrastructure.Repositories.DataProcess;
using Microsoft.AspNetCore.SignalR;

namespace LaSonda.Api.Hubs
{
    public class DashboardHub : Hub
    {
        PrioritaColoriRepository prioritaColoriRepository;

        MonitoringsSignalrRepository monitoringsSignalrRepository;

        public DashboardHub(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("ConnectionStringLaSonda");
            prioritaColoriRepository = new PrioritaColoriRepository(connectionString);
            monitoringsSignalrRepository = new MonitoringsSignalrRepository(connectionString);
        }

        public async Task SendPrioritaColori()
        {
            var prioritaColoriList = prioritaColoriRepository.GetPrioritaColoriList();
            await Clients.All.SendAsync("getprioritacolorihub", prioritaColoriList);
        }

        //public async Task SendMonitorings()
        //{
        //    var monitoringList = monitoringsSignalrRepository.GetMonitoringList();
        //    await Clients.All.SendAsync("getmonitoringhub", monitoringList);
            
        //}

        public async Task SendMonitorings()
        {
            var monitoringList = monitoringsSignalrRepository?.GetMonitoringList();
            if (monitoringList != null && Clients != null)
            {
                await Clients.All.SendAsync("getmonitoringhub", monitoringList);
            }
        }
    }
}
