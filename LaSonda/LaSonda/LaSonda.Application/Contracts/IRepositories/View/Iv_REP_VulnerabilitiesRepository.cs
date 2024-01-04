using LaSonda.Application.Contracts.IRepositories.Common;
using LaSonda.Domain.Models.View;

namespace LaSonda.Application.Contracts.IRepositories.View
{
    public interface Iv_REP_VulnerabilitiesRepository : IBaseSimpleRepository<v_REP_Vulnerabilities>
    {
        Task<IEnumerable<v_REP_Vulnerabilities>> GetAllVulnerabilities();
    }
}
