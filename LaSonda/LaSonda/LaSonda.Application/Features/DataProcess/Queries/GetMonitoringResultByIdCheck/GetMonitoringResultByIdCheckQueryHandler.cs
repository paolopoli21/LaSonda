using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Application.Features.DataProcess.CommonModelVm;
using LaSonda.Domain.Models.DataProcess;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Application.Features.DataProcess.Queries.GetMonitoringResultByIdCheck
{
    public class GetMonitoringResultByIdCheckQueryHandler : IRequestHandler<GetMonitoringResultByIdCheckQuery, v_REP_MonitoringResultVm>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetMonitoringResultByIdCheckQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<v_REP_MonitoringResultVm> Handle(GetMonitoringResultByIdCheckQuery request, CancellationToken cancellationToken)
        {
            var monitoringResult = await _unitOfWork.MonitoringResultRepository.Getv_REP_MonitoringResultByIdCheck(request.IdCheck);
            if (monitoringResult == null)
            {
                throw new NotFoundExceptionGetList("v_REP_MonitoringResult");
            }
            return _mapper.Map<v_REP_MonitoringResultVm>(monitoringResult);
        }
    }
}
