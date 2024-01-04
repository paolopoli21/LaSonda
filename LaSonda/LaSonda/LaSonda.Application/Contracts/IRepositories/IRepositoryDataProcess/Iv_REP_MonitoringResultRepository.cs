using LaSonda.Application.Contracts.IRepositories.Common;
using LaSonda.Domain.Models.DataProcess;

namespace LaSonda.Application.Contracts.IRepositories.IRepositoryDataProcess
{
    public interface Iv_REP_MonitoringResultRepository : IBaseSimpleRepository<v_REP_MonitoringResult>
    {
        Task<v_REP_MonitoringResult> Getv_REP_MonitoringResultByIdCheck(int idCheck);
    }
}
