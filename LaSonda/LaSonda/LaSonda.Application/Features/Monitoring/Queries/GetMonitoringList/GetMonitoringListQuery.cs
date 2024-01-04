using LaSonda.Application.Features.Monitoring.Queries.CommonModelVm;
using MediatR;

namespace LaSonda.Application.Features.Monitoring.Queries.GetMonitoringList
{
    public class GetMonitoringListQuery : IRequest<List<MonitoringAllProcessVm>>
    {

    }
}
