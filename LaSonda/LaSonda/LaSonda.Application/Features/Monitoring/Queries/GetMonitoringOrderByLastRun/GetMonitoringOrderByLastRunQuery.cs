using LaSonda.Application.Features.Monitoring.Queries.CommonModelVm;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Application.Features.Monitoring.Queries.GetMonitoringOrderByLastRun
{
    public class GetMonitoringOrderByLastRunQuery : IRequest<List<MonitoringAllProcessVm>>
    {
    }
}
