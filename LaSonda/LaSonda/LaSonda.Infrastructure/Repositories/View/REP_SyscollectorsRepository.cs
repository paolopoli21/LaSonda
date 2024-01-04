using LaSonda.Application.Contracts.IRepositories.Common;
using LaSonda.Application.Contracts.IRepositories.View;
using LaSonda.Domain.Models.View;
using LaSonda.Infrastructure.Repositories.Common;
using LaSonda.Infrastructure.Service;

namespace LaSonda.Infrastructure.Repositories.View
{
    public class REP_SyscollectorsRepository : BaseSimpleRepository<REP_Syscollectors>, IREP_SyscollectorsRepository
    {
        public REP_SyscollectorsRepository(LaSondaDbContext context) : base(context)
        {
        }
    }
}
