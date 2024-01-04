using AutoMapper;
using LaSonda.Application.Features.BackupSql.Queries.GetvBackupListAllServer;
using LaSonda.Application.Features.DataProcess.CommonModelVm;
using LaSonda.Application.Features.DataProcess.Queries.GetDataProcessList;
using LaSonda.Application.Features.DataProcess.Queries.GetPrioritaColoreList;
using LaSonda.Application.Features.Monitoring.Queries.CommonModelVm;
using LaSonda.Application.Features.User.CommonModelVm;
using LaSonda.Application.Features.Vulnerabilities.Queries.GetRepVulnerabilities;
using LaSonda.Domain.Models.BackupSql;
using LaSonda.Domain.Models.DataProcess;
using LaSonda.Domain.Models.Monitoring;
using LaSonda.Domain.Models.User;
using LaSonda.Domain.Models.View;

namespace LaSonda.Application.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<MonitoringAllProcess, MonitoringAllProcessVm>();
            CreateMap<v_REP_MonitoringProcedure, v_REP_MonitoringProcedureVm>();
            CreateMap<v_REP_MonitoringResult, v_REP_MonitoringResultVm>();
            CreateMap<v_REP_Vulnerabilities, v_REP_VulnerabilitiesVm>();
            CreateMap<ToolUser, ToolUserVm>();
            CreateMap<REP_PrioritaColori, REP_PrioritaColoriVm>();
            CreateMap<v_BackupList_AllServer, v_BackupList_AllServerVm>();
        }
    }
}
