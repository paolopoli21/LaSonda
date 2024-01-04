using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Application.Features.DataProcess.CommonModelVm;
using LaSonda.Domain.Models.DataProcess;
using MediatR;

namespace LaSonda.Application.Features.DataProcess.Queries.GetMonitoringResultList
{
    public class GetMonitoringResultHandler : IRequestHandler<GetMonitoringResultList, List<v_REP_MonitoringResultVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetMonitoringResultHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<v_REP_MonitoringResultVm>> Handle(GetMonitoringResultList request, CancellationToken cancellationToken)
        {
            var monitoringResultList = await _unitOfWork.Repository<v_REP_MonitoringResult>().GetAllAsync();
            if (monitoringResultList == null)
            {
                throw new NotFoundExceptionGetList("v_REP_MonitoringResult");
            }
            return _mapper.Map<List<v_REP_MonitoringResultVm>>(monitoringResultList);
        }
    }
}
