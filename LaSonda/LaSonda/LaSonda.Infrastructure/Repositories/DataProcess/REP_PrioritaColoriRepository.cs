using LaSonda.Application.Contracts.IRepositories.IRepositoryDataProcess;
using LaSonda.Domain.Models.DataProcess;
using LaSonda.Infrastructure.Repositories.Common;
using LaSonda.Infrastructure.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Infrastructure.Repositories.DataProcess
{
    public class REP_PrioritaColoriRepository : BaseCompleteRepository<REP_PrioritaColori>, IREP_PrioritaColoriRepository
    {
        public REP_PrioritaColoriRepository(LaSondaDbContext context) : base(context)
        {

        }
    }
}
