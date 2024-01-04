using LaSonda.Application.Features.DataProcess.CommonModelVm;
using MediatR;

namespace LaSonda.Application.Features.DataProcess.Queries.GetMonitoringResultByIdCheck
{
    public class GetMonitoringResultByIdCheckQuery: IRequest<v_REP_MonitoringResultVm>
    {
        public int IdCheck { get; set; }

        public GetMonitoringResultByIdCheckQuery(int idCheck)
        {
            IdCheck = idCheck;
        }
    }
}
