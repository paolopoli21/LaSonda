using LaSonda.Application.Contracts.IRepositories.View;
using LaSonda.Domain.Models.View;
using LaSonda.Infrastructure.Repositories.Common;
using LaSonda.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;

namespace LaSonda.Infrastructure.Repositories.View
{
    public class v_REP_VulnerabilitiesRepository : BaseSimpleRepository<v_REP_Vulnerabilities>, Iv_REP_VulnerabilitiesRepository
    {
        public v_REP_VulnerabilitiesRepository(LaSondaDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<v_REP_Vulnerabilities>> GetAllVulnerabilities()
        {
            return await _Context.v_REP_Vulnerabilities
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
