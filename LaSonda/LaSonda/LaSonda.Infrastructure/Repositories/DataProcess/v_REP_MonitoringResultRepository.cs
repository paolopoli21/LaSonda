using LaSonda.Application.Contracts.IRepositories.IRepositoryDataProcess;
using LaSonda.Domain.Models.DataProcess;
using LaSonda.Domain.Models.Monitoring;
using LaSonda.Infrastructure.Repositories.Common;
using LaSonda.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Infrastructure.Repositories.DataProcess
{
    public class v_REP_MonitoringResultRepository :  BaseSimpleRepository<v_REP_MonitoringResult>, Iv_REP_MonitoringResultRepository
    {
        public v_REP_MonitoringResultRepository(LaSondaDbContext context) : base(context)
        {
           
        }

        public async Task<v_REP_MonitoringResult> Getv_REP_MonitoringResultByIdCheck(int idCheck)
        {
            return await _Context.RepMonitoringResult.SingleOrDefaultAsync(x => x.IDCheck == idCheck);
        }
    }
}
